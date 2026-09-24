// ============================================================
// VHU Survey Storage & Google Sheets Sync
// Dữ liệu lưu vào localStorage (local) + Google Sheets (cloud)
// ============================================================

const STORAGE_KEY = 'vhu_survey_responses_v1';
const CHANNEL_NAME = 'vhu_survey_realtime';
const EVENT_NAME = 'vhu_survey_updated';

// Google Apps Script Web App URL — thay bằng URL của bạn nếu cần
const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbx-BlYPN96Z9IjskeQI3jQfCYMl3FQEIfXN5-S8O1uTrcZ7eKWl0MiFaU6Zdg-fC27Ppw/exec';

// Memory fallback nếu localStorage không khả dụng (trình duyệt private)
let memoryStore = null;

// ─────────────────────────────────────────────────────────────
// LOCAL STORAGE HELPERS
// ─────────────────────────────────────────────────────────────

export function getSavedResponses() {
  if (typeof localStorage === 'undefined') {
    return memoryStore || [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('[VHU] Lỗi đọc localStorage:', e);
    return memoryStore || [];
  }
}

function persistLocal(list) {
  memoryStore = list;
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('[VHU] Lỗi ghi localStorage:', e);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// GOOGLE SHEETS SYNC
// Dùng mode: 'no-cors' vì Apps Script không trả CORS header
// đúng chuẩn khi bị gọi từ domain khác.
// Lưu ý: no-cors = không đọc được response, nhưng request VẪN GỬI ĐI.
// ─────────────────────────────────────────────────────────────

async function pushToGoogleSheets(entry) {
  if (!GOOGLE_SHEET_API) return;
  try {
    await fetch(GOOGLE_SHEET_API, {
      method: 'POST',
      mode: 'no-cors',           // ← Bắt buộc với Apps Script từ browser
      headers: {
        'Content-Type': 'text/plain', // no-cors chỉ cho phép simple headers
      },
      body: JSON.stringify({
        studentName: entry.studentName,
        mssv:        entry.mssv,
        timestamp:   entry.timestamp,
        answers:     entry.answers,
      }),
    });
    console.log('[VHU] ✅ Đã gửi lên Google Sheets:', entry.studentName);
  } catch (err) {
    console.warn('[VHU] ⚠️ Lỗi gửi Google Sheets:', err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// FETCH FROM GOOGLE SHEETS (để dashboard polling)
// Apps Script cần hỗ trợ GET và trả JSON với CORS header.
// Nếu chưa setup GET, hàm này chỉ trả dữ liệu local.
// ─────────────────────────────────────────────────────────────

export async function fetchCloudResponses() {
  if (!GOOGLE_SHEET_API) return getSavedResponses();

  try {
    // GET request để lấy tất cả responses từ Sheet
    const res = await fetch(`${GOOGLE_SHEET_API}?action=getAll`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) return getSavedResponses();

    const json = await res.json();

    // Apps Script trả về { data: [ ...entries ] }
    const cloudList = Array.isArray(json?.data) ? json.data
      : Array.isArray(json) ? json
      : null;

    if (!cloudList || cloudList.length === 0) return getSavedResponses();

    // Merge: ưu tiên cloud, tránh trùng theo id
    const localList = getSavedResponses();
    const mergedMap = new Map();
    localList.forEach(item => {
      if (item?.id) mergedMap.set(item.id, item);
    });
    cloudList.forEach(item => {
      if (item?.id) mergedMap.set(item.id, item);
    });

    const merged = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const localCount = localList.length;
    persistLocal(merged);

    // Phát sự kiện cập nhật nếu có dữ liệu mới
    if (merged.length !== localCount && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, {
        detail: { type: 'CLOUD_SYNCED', count: merged.length }
      }));
    }

    return merged;
  } catch (err) {
    // Lỗi thường gặp: CORS khi Apps Script chưa bật doGet, trả về local
    console.warn('[VHU] Cloud fetch (normal nếu chưa setup GET):', err.message);
    return getSavedResponses();
  }
}

// ─────────────────────────────────────────────────────────────
// SAVE STUDENT RESPONSE
// ─────────────────────────────────────────────────────────────

export async function saveStudentResponse(studentName, mssv, answers) {
  const responses = getSavedResponses();

  const newEntry = {
    id:          'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    timestamp:   new Date().toISOString(),
    studentName: (studentName || 'Sinh viên VHU').trim(),
    mssv:        (mssv || '').trim(),
    answers,
  };

  const updated = [newEntry, ...responses];
  persistLocal(updated);

  // Thông báo trong tab hiện tại
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, {
      detail: { type: 'NEW_RESPONSE', data: newEntry }
    }));
  }

  // Thông báo sang các tab khác cùng origin
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: 'NEW_RESPONSE', data: newEntry });
      ch.close();
    } catch (_) {}
  }

  // Đẩy lên Google Sheets (không chặn UI — fire and forget)
  pushToGoogleSheets(newEntry);

  return newEntry;
}

// ─────────────────────────────────────────────────────────────
// CLEAR ALL RESPONSES
// ─────────────────────────────────────────────────────────────

export async function clearAllResponses() {
  persistLocal([]);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, {
      detail: { type: 'CLEAR_ALL_DATA' }
    }));
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: 'CLEAR_ALL_DATA' });
      ch.close();
    } catch (_) {}
  }

  return [];
}

export function resetResponses() {
  return clearAllResponses();
}

// ─────────────────────────────────────────────────────────────
// REALTIME SUBSCRIPTION (cross-tab + same-tab)
// ─────────────────────────────────────────────────────────────

export function subscribeRealtimeUpdates(callback) {
  let channel = null;

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (e) => callback(e.data);
    } catch (_) {}
  }

  const handleStorage = (e) => {
    if (e.key === STORAGE_KEY) callback({ type: 'STORAGE_CHANGED' });
  };

  const handleCustom = (e) => callback(e.detail || { type: 'LOCAL_UPDATE' });

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_NAME, handleCustom);
  }

  return () => {
    if (channel) channel.close();
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustom);
    }
  };
}

// ─────────────────────────────────────────────────────────────
// GENERATE SAMPLE RESPONSES (dùng cho thuyết trình demo)
// ─────────────────────────────────────────────────────────────

export async function generateSampleResponses(count = 12) {
  const sampleStudents = [
    { name: 'Trần Văn Hoàng',   mssv: '251A301124' },
    { name: 'Lê Thị Thu Thảo', mssv: '251A140231' },
    { name: 'Nguyễn Minh Quân', mssv: '251A010892' },
    { name: 'Phạm Quỳnh Như',  mssv: '241A040319' },
    { name: 'Vũ Đức Thành',    mssv: '251A301455' },
    { name: 'Đặng Ngọc Ánh',   mssv: '251A010678' },
    { name: 'Bùi Gia Huy',     mssv: '251A140188' },
    { name: 'Huỳnh Bảo Ngọc',  mssv: '241A040512' },
    { name: 'Ngô Quốc Bảo',    mssv: '251A301901' },
    { name: 'Đỗ Thùy Trang',   mssv: '251A010334' },
    { name: 'Dương Kiến Quốc', mssv: '251A140772' },
    { name: 'Hoàng Minh Châu', mssv: '241A040823' },
  ];

  const brands     = ['Highlands Coffee', 'Phúc Long', 'The Coffee House', 'Katinat', 'Starbucks', 'Cà phê vỉa hè'];
  const spendings  = ['Dưới 30.000 đồng', 'Từ 30.000 – dưới 50.000 đồng', 'Từ 50.000 – dưới 70.000 đồng', 'Trên 70.000 đồng'];
  const freqs      = ['Hằng ngày', '3–5 lần/tuần', '1–2 lần/tuần', 'Ít hơn 1 lần/tuần'];
  const loyalties  = ['Thường chọn thương hiệu quen thuộc', 'Thích thử thương hiệu mới', 'Linh hoạt tùy theo bạn bè'];
  const reasons    = ['Giá cao hơn', 'Chất lượng cà phê giảm', 'Không gian quán không phù hợp', 'Thái độ phục vụ kém', 'Thương hiệu đối thủ có khuyến mãi tốt hơn'];
  const channels   = ['Mạng xã hội (Facebook, TikTok...)', 'Bạn bè, người thân giới thiệu', 'Đi ngang qua thấy quán', 'Biển quảng cáo, KOLs'];
  const factors    = ['Giá cả', 'Chất lượng cà phê', 'Hương vị', 'Mức độ nổi tiếng thương hiệu', 'Không gian quán', 'Vị trí cửa hàng', 'Chất lượng phục vụ', 'Khuyến mãi / Ưu đãi', 'Sự đa dạng menu'];

  const selectedCount = Math.min(count, sampleStudents.length);
  const generated = [];

  for (let i = 0; i < selectedCount; i++) {
    const student = sampleStudents[i];
    const brand   = brands[i % (brands.length - 1)];
    const likert  = {};
    factors.forEach(f => { likert[f] = Math.floor(Math.random() * 2) + 4; });
    likert['Giá cả']    = 5;
    likert['Hương vị']  = 5;
    likert['Không gian quán'] = i % 2 === 0 ? 5 : 4;

    generated.push({
      id:          'seed_' + (Date.now() + i) + '_' + Math.random().toString(36).substr(2, 4),
      timestamp:   new Date(Date.now() - (selectedCount - i) * 120000).toISOString(),
      studentName: student.name,
      mssv:        student.mssv,
      answers: {
        1:  freqs[i % freqs.length],
        2:  ['Mua trực tiếp tại quán / cửa hàng'],
        3:  spendings[i % spendings.length],
        4:  ['Highlands Coffee', 'Phúc Long', brand],
        5:  brand,
        6:  [channels[i % channels.length]],
        7:  ['Giá cả', 'Hương vị'],
        8:  likert,
        10: 'Không gian yên tĩnh, cà phê đậm đà và giá cả phù hợp túi tiền sinh viên VHU.',
        11: [reasons[i % reasons.length]],
        12: loyalties[i % loyalties.length],
        13: '5 - Rất muốn',
        14: '18–20 tuổi',
        15: '2 - 4 triệu đồng',
      },
    });
  }

  const current = getSavedResponses();
  const merged  = [...generated, ...current];
  persistLocal(merged);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: 'BATCH_ADDED' } }));
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: 'BATCH_ADDED' });
      ch.close();
    } catch (_) {}
  }

  return generated;
}

// ─────────────────────────────────────────────────────────────
// CALCULATE AGGREGATED STATS
// ─────────────────────────────────────────────────────────────

export function calculateAggregatedStats(responses) {
  const totalCount = Array.isArray(responses) ? responses.length : 0;
  const emptyLikert = {
    'Giá cả': '0.0', 'Chất lượng cà phê': '0.0', 'Hương vị': '0.0',
    'Không gian quán': '0.0', 'Vị trí cửa hàng': '0.0', 'Chất lượng phục vụ': '0.0',
    'Khuyến mãi / Ưu đãi': '0.0', 'Mức độ nổi tiếng thương hiệu': '0.0', 'Sự đa dạng menu': '0.0',
  };

  if (totalCount === 0) {
    return {
      totalCount: 0,
      brandCounts: {}, spendingCounts: {}, frequencyCounts: {},
      likertAverages: emptyLikert,
      switchReasons: {}, loyaltyDistribution: {}, channelReach: {}, crossTabSpendingBrand: {},
    };
  }

  const brandCounts = {}, spendingCounts = {}, frequencyCounts = {};
  const likertSums  = {}, likertCounts   = {};
  const switchReasons = {}, loyaltyDistribution = {}, channelReach = {}, crossTabSpendingBrand = {};

  responses.forEach(r => {
    const a = r?.answers;
    if (!a) return;

    // Q5 — Thương hiệu
    if (a[5]) brandCounts[a[5]] = (brandCounts[a[5]] || 0) + 1;

    // Q3 — Chi tiêu
    if (a[3]) {
      spendingCounts[a[3]] = (spendingCounts[a[3]] || 0) + 1;
      if (a[5]) {
        if (!crossTabSpendingBrand[a[3]]) crossTabSpendingBrand[a[3]] = {};
        crossTabSpendingBrand[a[3]][a[5]] = (crossTabSpendingBrand[a[3]][a[5]] || 0) + 1;
      }
    }

    // Q1 — Tần suất
    if (a[1]) frequencyCounts[a[1]] = (frequencyCounts[a[1]] || 0) + 1;

    // Q8 — Likert
    if (a[8] && typeof a[8] === 'object') {
      Object.entries(a[8]).forEach(([factor, score]) => {
        likertSums[factor]  = (likertSums[factor]  || 0) + Number(score);
        likertCounts[factor] = (likertCounts[factor] || 0) + 1;
      });
    }

    // Q6 — Kênh tiếp cận
    if (Array.isArray(a[6])) {
      a[6].forEach(ch => { channelReach[ch] = (channelReach[ch] || 0) + 1; });
    }

    // Q11 — Lý do chuyển đổi
    if (Array.isArray(a[11])) {
      a[11].forEach(r => { switchReasons[r] = (switchReasons[r] || 0) + 1; });
    }

    // Q12 — Loyalty
    if (a[12]) loyaltyDistribution[a[12]] = (loyaltyDistribution[a[12]] || 0) + 1;
  });

  const defaultFactors = Object.keys(emptyLikert);
  const likertAverages = {};
  defaultFactors.forEach(f => {
    likertAverages[f] = likertCounts[f]
      ? (likertSums[f] / likertCounts[f]).toFixed(1)
      : '0.0';
  });

  return {
    totalCount, brandCounts, spendingCounts, frequencyCounts,
    likertAverages, switchReasons, loyaltyDistribution, channelReach, crossTabSpendingBrand,
  };
}
