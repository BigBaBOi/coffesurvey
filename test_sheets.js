/**
 * test_sheets.js — Kiểm tra kết nối Google Sheets
 * Chạy: node test_sheets.js
 */

const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbzOYD2e5U1zsxOV9lQ60B-QLJmYtfWNxeTui9-QqB-sy-75pEOSbOvoC3LxkNlLRtacoQ/exec';

// ─── Dữ liệu mẫu ngẫu nhiên ────────────────────────────────────────────────

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSubset(arr, min = 1, max = 3) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  const count = min + Math.floor(Math.random() * (max - min + 1));
  return shuffled.slice(0, count);
}

const names = [
  'Tran Van An', 'Le Thi Bich', 'Nguyen Minh Cuong', 'Pham Quynh Dung',
  'Vu Duc Em', 'Dang Ngoc Phuong', 'Bui Gia Hung', 'Huynh Bao Khanh',
];

const brands       = ['Highlands Coffee', 'Phuc Long', 'The Coffee House', 'Katinat', 'Starbucks', 'Ca phe via he'];
const spendings    = ['Duoi 30.000 dong', 'Tu 30.000 - duoi 50.000 dong', 'Tu 50.000 - duoi 70.000 dong', 'Tren 70.000 dong'];
const frequencies  = ['Hang ngay', '3-5 lan/tuan', '1-2 lan/tuan', 'It hon 1 lan/tuan'];
const loyalties    = ['Thuong chon thuong hieu quen thuoc', 'Thich thu thuong hieu moi', 'Linh hoat tuy theo ban be'];
const reasons      = ['Gia cao hon', 'Chat luong ca phe giam', 'Khong gian quan khong phu hop', 'Thai do phuc vu kem'];
const channels     = ['Mang xa hoi (Facebook, TikTok...)', 'Ban be, nguoi than gioi thieu', 'Di ngang qua thay quan', 'Bien quang cao, KOLs'];
const factors      = ['Gia ca', 'Chat luong ca phe', 'Huong vi', 'Muc do noi tieng thuong hieu', 'Khong gian quan', 'Vi tri cua hang', 'Chat luong phuc vu', 'Khuyen mai / Uu dai', 'Su da dang menu'];

function generateSample() {
  const name  = randomPick(names);
  const brand = randomPick(brands.slice(0, 5));
  const likert = {};
  factors.forEach(f => { likert[f] = 3 + Math.floor(Math.random() * 3); });

  return {
    id:          'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp:   new Date().toISOString(),
    studentName: name,
    mssv:        '251A' + (300000 + Math.floor(Math.random() * 9999)),
    answers: {
      1:  randomPick(frequencies),
      2:  ['Mua truc tiep tai quan / cua hang'],
      3:  randomPick(spendings),
      4:  randomSubset(brands, 2, 3),
      5:  brand,
      6:  randomSubset(channels, 1, 2),
      7:  ['Gia ca', 'Huong vi'],
      8:  likert,
      10: 'Ca phe ngon, khong gian thoang mat.',
      11: randomSubset(reasons, 1, 2),
      12: randomPick(loyalties),
      13: randomPick(['4 - Muon', '5 - Rat muon']),
      14: '18-20 tuoi',
      15: '2 - 4 trieu dong',
    },
  };
}

// ─── Test POST ───────────────────────────────────────────────────────────────

async function testPost(sample) {
  console.log('\n====================================================');
  console.log('[POST] Gui bai khao sat mau len Google Sheets...');
  console.log('   Sinh vien : ' + sample.studentName + ' (' + sample.mssv + ')');
  console.log('   Thuong hieu: ' + sample.answers[5]);
  console.log('   Thoi gian  : ' + sample.timestamp);

  try {
    const res = await fetch(GOOGLE_SHEET_API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        studentName: sample.studentName,
        mssv:        sample.mssv,
        timestamp:   sample.timestamp,
        answers:     sample.answers,
      }),
      redirect: 'follow',
    });

    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (_) {}

    if (json && json.status === 'success') {
      console.log('OK - POST thanh cong! Response:', JSON.stringify(json));
      return true;
    } else if (res.ok) {
      console.log('OK - POST thanh cong! Body:', text.slice(0, 200));
      return true;
    } else {
      console.error('FAIL - POST that bai. HTTP Status:', res.status);
      console.error('Body:', text.slice(0, 400));
      return false;
    }
  } catch (err) {
    console.error('FAIL - Loi ket noi POST:', err.message);
    return false;
  }
}

// ─── Test GET ────────────────────────────────────────────────────────────────

async function testGet(expectedName) {
  console.log('\n====================================================');
  console.log('[GET] Keo toan bo du lieu tu Google Sheets...');

  try {
    const res = await fetch(GOOGLE_SHEET_API + '?action=getAll', {
      method:  'GET',
      headers: { 'Accept': 'application/json' },
      redirect: 'follow',
    });

    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (_) {}

    if (!res.ok || !json) {
      console.error('FAIL - GET that bai. HTTP Status:', res.status);
      console.error('Body:', text.slice(0, 400));
      console.log('');
      console.log('>>> Nguyen nhan co the:');
      console.log('    1. Apps Script chua co ham doGet(e)');
      console.log('    2. Deploy chua cap nhat sau khi them doGet');
      console.log('    3. URL sai hoac het han');
      return;
    }

    if (json.status === 'error') {
      console.error('FAIL - Apps Script bao loi:', json.message);
      return;
    }

    const data = json.data || [];
    console.log('OK - GET thanh cong! Tong so bai trong Sheet: ' + data.length);

    if (data.length > 0) {
      console.log('\n--- 5 bai gan nhat ---');
      const recent = data.slice(-5).reverse();
      recent.forEach(function(r, i) {
        const ts = r.timestamp ? new Date(r.timestamp).toLocaleString('vi-VN') : '?';
        console.log((i + 1) + '. ' + r.studentName + ' (' + r.mssv + ') | ' + (r.answers && r.answers[5] ? r.answers[5] : '?') + ' | ' + ts);
      });

      const found = data.find(function(r) { return r.studentName === expectedName; });
      if (found) {
        console.log('\n>>> XAC NHAN: Bai cua "' + expectedName + '" DA CO trong Sheet!');
        console.log('    Ket noi POST + GET deu hoat dong chinh xac.');
      } else {
        console.log('\n>>> CANH BAO: Bai cua "' + expectedName + '" chua thay trong du lieu GET.');
        console.log('    POST co the da thanh cong nhung doGet chua doc duoc dong moi nhat.');
        console.log('    Kiem tra lai ham doGet trong Apps Script.');
      }
    } else {
      console.log('Sheet dang trong — hay kiem tra Apps Script co ham doGet tra { data: [...] } khong.');
    }
  } catch (err) {
    console.error('FAIL - Loi ket noi GET:', err.message);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('VHU Survey - Kiem tra ket noi Google Sheets');
  console.log('Endpoint: ' + GOOGLE_SHEET_API.slice(0, 70) + '...');

  const sample = generateSample();

  const postOk = await testPost(sample);

  if (postOk) {
    console.log('\nCho 2 giay de Google Sheets ghi du lieu...');
    await new Promise(function(r) { setTimeout(r, 2000); });
    await testGet(sample.studentName);
  } else {
    console.log('\nPOST that bai. Kiem tra lai:');
    console.log('  1. Apps Script da Deploy voi "Anyone" access chua?');
    console.log('  2. URL trong file co dung khong?');
    console.log('  3. Script co ham doPost(e) chua?');
  }

  console.log('\n====================================================');
  console.log('Kiem tra xong!');
}

main();
