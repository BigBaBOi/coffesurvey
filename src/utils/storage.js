// Helper module for real-time survey data management & cross-device cloud sync

const STORAGE_KEY = 'vhu_survey_responses_v1';
const CLOUD_URL_KEY = 'vhu_cloud_sync_endpoint_url_v1';
const CHANNEL_NAME = 'vhu_survey_realtime';
const EVENT_NAME = 'vhu_survey_updated';

// Default clean storage (0 initial demo responses)
const INITIAL_SEED_RESPONSES = [];

// Memory fallback if localStorage is unavailable
let memoryStore = null;

// Get configured Cloud Sync URL
export function getCloudSyncUrl() {
  if (typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(CLOUD_URL_KEY);
      if (saved && saved.trim()) return saved.trim();
    } catch (e) {}
  }
  return '';
}

// Set or update Cloud Sync URL
export function setCloudSyncUrl(url) {
  const cleanUrl = (url || '').trim();
  if (typeof localStorage !== 'undefined') {
    try {
      if (cleanUrl) {
        localStorage.setItem(CLOUD_URL_KEY, cleanUrl);
      } else {
        localStorage.removeItem(CLOUD_URL_KEY);
      }
    } catch (e) {}
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'CLOUD_CONFIG_CHANGED' } }));
  }
}

// Initialize / Read LocalStorage
export function getSavedResponses() {
  if (typeof localStorage === 'undefined') {
    return memoryStore || [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_RESPONSES));
      return INITIAL_SEED_RESPONSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading responses from localStorage:", e);
    return memoryStore || [];
  }
}

// Fetch responses from global Cloud database and merge with local data
export async function fetchCloudResponses() {
  const cloudUrl = getCloudSyncUrl();
  if (!cloudUrl) return getSavedResponses();

  try {
    const isFirebase = cloudUrl.includes('firebasedatabase.app') || cloudUrl.includes('firebaseio.com');
    const fetchUrl = isFirebase && !cloudUrl.endsWith('.json') ? `${cloudUrl.replace(/\/$/, '')}/surveys.json` : cloudUrl;

    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!res.ok) return getSavedResponses();
    const json = await res.json();
    
    let cloudList = [];
    if (Array.isArray(json)) {
      cloudList = json;
    } else if (json && typeof json === 'object') {
      if (Array.isArray(json.data?.surveyList)) {
        cloudList = json.data.surveyList;
      } else if (Array.isArray(json.surveys)) {
        cloudList = json.surveys;
      } else {
        // Firebase object format: { "-Nxxxx": { ...entry }, "-Nyyyy": { ...entry } }
        cloudList = Object.entries(json).map(([k, v]) => ({
          ...v,
          id: v.id || k
        }));
      }
    }

    if (Array.isArray(cloudList) && cloudList.length > 0) {
      const localList = getSavedResponses();
      const mergedMap = new Map();
      
      localList.forEach(item => {
        if (item && (item.id || item.timestamp)) {
          mergedMap.set(item.id || `${item.studentName}_${item.mssv}_${item.timestamp}`, item);
        }
      });

      cloudList.forEach(item => {
        if (item && (item.id || item.timestamp)) {
          mergedMap.set(item.id || `${item.studentName}_${item.mssv}_${item.timestamp}`, item);
        }
      });

      const merged = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      memoryStore = merged;
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch (e) {}
      }

      if (merged.length !== localList.length && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'CLOUD_SYNCED', count: merged.length } }));
      }

      return merged;
    }
  } catch (err) {
    console.warn("Cloud sync network notice:", err.message);
  }
  return getSavedResponses();
}

// Save a new student response & sync both locally and to Cloud
export async function saveStudentResponse(studentName, mssv, answers) {
  const responses = getSavedResponses();
  const newEntry = {
    id: 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    timestamp: new Date().toISOString(),
    studentName: (studentName || 'Sinh viên VHU').trim(),
    mssv: (mssv || '251A' + Math.floor(100000 + Math.random() * 900000)).trim(),
    answers
  };

  const updated = [newEntry, ...responses];
  memoryStore = updated;
  
  // 1. Instant local persistence
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    }
  }

  // 2. Broadcast immediately in current tab & across tabs
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'NEW_RESPONSE', data: newEntry } }));
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'NEW_RESPONSE', data: newEntry });
      channel.close();
    } catch (err) {}
  }

  // 3. Sync to Cloud endpoint if configured
  const cloudUrl = getCloudSyncUrl();
  if (cloudUrl) {
    try {
      const isFirebase = cloudUrl.includes('firebasedatabase.app') || cloudUrl.includes('firebaseio.com');
      const postUrl = isFirebase && !cloudUrl.endsWith('.json') ? `${cloudUrl.replace(/\/$/, '')}/surveys.json` : cloudUrl;

      await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
    } catch (cloudErr) {
      console.warn("Cloud push notice:", cloudErr);
    }
  }

  return newEntry;
}

// Completely wipe all survey responses (Local + Cloud)
export async function clearAllResponses() {
  memoryStore = [];
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'CLEAR_ALL_DATA' } }));
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'CLEAR_ALL_DATA' });
      channel.close();
    } catch (err) {}
  }

  const cloudUrl = getCloudSyncUrl();
  if (cloudUrl) {
    try {
      const isFirebase = cloudUrl.includes('firebasedatabase.app') || cloudUrl.includes('firebaseio.com');
      const deleteUrl = isFirebase && !cloudUrl.endsWith('.json') ? `${cloudUrl.replace(/\/$/, '')}/surveys.json` : cloudUrl;
      
      if (isFirebase) {
        await fetch(deleteUrl, { method: 'DELETE' });
      } else {
        await fetch(deleteUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'clear' })
        });
      }
    } catch (e) {}
  }

  return [];
}

// Reset data back to clean empty state
export function resetResponses() {
  return clearAllResponses();
}

// Listen to real-time broadcasts across tabs, current tab & cloud
export function subscribeRealtimeUpdates(callback) {
  let channel = null;

  // 1. BroadcastChannel listener
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        callback(event.data);
      };
    } catch (e) {}
  }

  // 2. Storage event listener (other tabs on same origin)
  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY || event.key === CLOUD_URL_KEY) {
      callback({ type: 'STORAGE_CHANGED' });
    }
  };

  // 3. Custom in-tab event listener (same tab / cloud sync)
  const handleCustomEvent = (event) => {
    callback(event.detail || { type: 'LOCAL_UPDATE' });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_NAME, handleCustomEvent);
  }

  return () => {
    if (channel) channel.close();
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustomEvent);
    }
  };
}

// Generate realistic demo student survey responses for live testing/presentation
export async function generateSampleResponses(count = 12) {
  const sampleStudents = [
    { name: 'Trần Văn Hoàng', mssv: '251A301124' },
    { name: 'Lê Thị Thu Thảo', mssv: '251A140231' },
    { name: 'Nguyễn Minh Quân', mssv: '251A010892' },
    { name: 'Phạm Quỳnh Như', mssv: '241A040319' },
    { name: 'Vũ Đức Thành', mssv: '251A301455' },
    { name: 'Đặng Ngọc Ánh', mssv: '251A010678' },
    { name: 'Bùi Gia Huy', mssv: '251A140188' },
    { name: 'Huỳnh Bảo Ngọc', mssv: '241A040512' },
    { name: 'Ngô Quốc Bảo', mssv: '251A301901' },
    { name: 'Đỗ Thùy Trang', mssv: '251A010334' },
    { name: 'Dương Kiến Quốc', mssv: '251A140772' },
    { name: 'Hoàng Minh Châu', mssv: '241A040823' }
  ];

  const brands = ['Highlands Coffee', 'Phúc Long', 'The Coffee House', 'Katinat', 'Starbucks', 'Cà phê vỉa hè'];
  const spendings = ['Dưới 30.000 đồng', 'Từ 30.000 – dưới 50.000 đồng', 'Từ 50.000 – dưới 70.000 đồng', 'Trên 70.000 đồng'];
  const frequencies = ['Hằng ngày', '3–5 lần/tuần', '1–2 lần/tuần', 'Ít hơn 1 lần/tuần'];
  const loyaltyOptions = ['Thường chọn thương hiệu quen thuộc', 'Thích thử thương hiệu mới', 'Linh hoạt tùy theo bạn bè'];
  const reasonsList = ['Giá cao hơn', 'Chất lượng cà phê giảm', 'Không gian quán không phù hợp', 'Thái độ phục vụ kém', 'Thương hiệu đối thủ có khuyến mãi tốt hơn'];
  const channelsList = ['Mạng xã hội (Facebook, TikTok...)', 'Bạn bè, người thân giới thiệu', 'Đi ngang qua thấy quán', 'Biển quảng cáo, KOLs'];
  const factorsList = ['Giá cả', 'Chất lượng cà phê', 'Hương vị', 'Mức độ nổi tiếng thương hiệu', 'Không gian quán', 'Vị trí cửa hàng', 'Chất lượng phục vụ', 'Khuyến mãi / Ưu đãi', 'Sự đa dạng menu'];

  const generated = [];
  const selectedCount = Math.min(count, sampleStudents.length);

  for (let i = 0; i < selectedCount; i++) {
    const student = sampleStudents[i];
    const preferredBrand = brands[i % (brands.length - 1)];
    const likertScores = {};
    factorsList.forEach(f => {
      likertScores[f] = Math.floor(Math.random() * 2) + 4; // 4 or 5
    });
    likertScores['Giá cả'] = 5;
    likertScores['Hương vị'] = 5;
    likertScores['Không gian quán'] = i % 2 === 0 ? 5 : 4;

    generated.push({
      id: 'seed_' + (Date.now() + i) + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date(Date.now() - (selectedCount - i) * 1000 * 120).toISOString(),
      studentName: student.name,
      mssv: student.mssv,
      answers: {
        1: frequencies[i % frequencies.length],
        2: ['Mua trực tiếp tại quán / cửa hàng'],
        3: spendings[i % spendings.length],
        4: ['Highlands Coffee', 'Phúc Long', preferredBrand],
        5: preferredBrand,
        6: [channelsList[i % channelsList.length]],
        7: ['Giá cả', 'Hương vị'],
        8: likertScores,
        10: 'Không gian yên tĩnh, cà phê đậm đà và giá cả phù hợp túi tiền sinh viên VHU.',
        11: [reasonsList[i % reasonsList.length]],
        12: loyaltyOptions[i % loyaltyOptions.length],
        13: '5 - Rất muốn',
        14: '18–20 tuổi',
        15: '2 - 4 triệu đồng'
      }
    });
  }

  const current = getSavedResponses();
  const merged = [...generated, ...current];
  memoryStore = merged;
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'BATCH_ADDED' } }));
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'BATCH_ADDED' });
      channel.close();
    } catch (e) {}
  }

  // Push samples to Cloud endpoint if configured
  const cloudUrl = getCloudSyncUrl();
  if (cloudUrl) {
    try {
      const isFirebase = cloudUrl.includes('firebasedatabase.app') || cloudUrl.includes('firebaseio.com');
      const postUrl = isFirebase && !cloudUrl.endsWith('.json') ? `${cloudUrl.replace(/\/$/, '')}/surveys.json` : cloudUrl;

      for (const item of generated) {
        await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }
    } catch (e) {}
  }

  return generated;
}

// Aggregate responses into real-time visual statistics
export function calculateAggregatedStats(responses) {
  const totalCount = Array.isArray(responses) ? responses.length : 0;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      brandCounts: {},
      spendingCounts: {},
      frequencyCounts: {},
      likertAverages: {
        'Giá cả': '0.0',
        'Chất lượng cà phê': '0.0',
        'Hương vị': '0.0',
        'Không gian quán': '0.0',
        'Vị trí cửa hàng': '0.0',
        'Chất lượng phục vụ': '0.0',
        'Khuyến mãi / Ưu đãi': '0.0',
        'Mức độ nổi tiếng thương hiệu': '0.0',
        'Sự đa dạng menu': '0.0'
      },
      switchReasons: {},
      loyaltyDistribution: {},
      channelReach: {},
      crossTabSpendingBrand: {}
    };
  }

  // Question 5: Top Selected Coffee Brands
  const brandCounts = {};
  // Question 3: Average Spending per visit
  const spendingCounts = {};
  // Question 1: Frequency
  const frequencyCounts = {};
  // Question 8: Likert Matrix Average Ratings
  const likertSums = {};
  const likertCounts = {};
  // Question 11: Switch Reasons
  const switchReasons = {};
  // Question 12: Loyalty Types
  const loyaltyDistribution = {};
  // Question 6: Channel Reach
  const channelReach = {};
  // Cross-Tab: Spending vs Brand
  const crossTabSpendingBrand = {};

  responses.forEach(r => {
    const a = r?.answers;
    if (!a) return;
    
    // Brand (Q5)
    if (a[5]) {
      brandCounts[a[5]] = (brandCounts[a[5]] || 0) + 1;
    }

    // Spending (Q3)
    if (a[3]) {
      spendingCounts[a[3]] = (spendingCounts[a[3]] || 0) + 1;

      // Cross-Tab
      if (a[5]) {
        if (!crossTabSpendingBrand[a[3]]) {
          crossTabSpendingBrand[a[3]] = {};
        }
        crossTabSpendingBrand[a[3]][a[5]] = (crossTabSpendingBrand[a[3]][a[5]] || 0) + 1;
      }
    }

    // Frequency (Q1)
    if (a[1]) {
      frequencyCounts[a[1]] = (frequencyCounts[a[1]] || 0) + 1;
    }

    // Likert Matrix (Q8)
    if (a[8] && typeof a[8] === 'object') {
      Object.entries(a[8]).forEach(([factor, score]) => {
        likertSums[factor] = (likertSums[factor] || 0) + Number(score);
        likertCounts[factor] = (likertCounts[factor] || 0) + 1;
      });
    }

    // Channels (Q6)
    if (Array.isArray(a[6])) {
      a[6].forEach(ch => {
        channelReach[ch] = (channelReach[ch] || 0) + 1;
      });
    }

    // Switch Reasons (Q11)
    if (Array.isArray(a[11])) {
      a[11].forEach(reason => {
        switchReasons[reason] = (switchReasons[reason] || 0) + 1;
      });
    }

    // Loyalty (Q12)
    if (a[12]) {
      loyaltyDistribution[a[12]] = (loyaltyDistribution[a[12]] || 0) + 1;
    }
  });

  // Calculate Likert Averages out of 5.0
  const likertAverages = {};
  const defaultFactors = [
    'Giá cả',
    'Chất lượng cà phê',
    'Hương vị',
    'Không gian quán',
    'Vị trí cửa hàng',
    'Chất lượng phục vụ',
    'Khuyến mãi / Ưu đãi',
    'Mức độ nổi tiếng thương hiệu',
    'Sự đa dạng menu'
  ];

  defaultFactors.forEach(factor => {
    if (likertCounts[factor]) {
      likertAverages[factor] = (likertSums[factor] / likertCounts[factor]).toFixed(1);
    } else {
      likertAverages[factor] = '0.0';
    }
  });

  return {
    totalCount,
    brandCounts,
    spendingCounts,
    frequencyCounts,
    likertAverages,
    switchReasons,
    loyaltyDistribution,
    channelReach,
    crossTabSpendingBrand
  };
}
