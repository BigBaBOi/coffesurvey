const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/AKfycbzOYD2e5U1zsxOV9lQ60B-QLJmYtfWNxeTui9-QqB-sy-75pEOSbOvoC3LxkNlLRtacoQ/exec';

const answers = {
  "1": "Hằng ngày",
  "2": ["Mua trực tiếp tại cửa hàng/quán cà phê"],
  "3": "Dưới 30.000 đồng",
  "4": ["Highlands Coffee", "The Coffee House", "Phúc Long", "Trung Nguyên Legend / E-Coffee", "Starbucks", "Katinat", "Cộng Cà Phê"],
  "5": "Quán cà phê độc lập/cà phê vỉa hè/cà phê gần trường",
  "6": ["Bạn bè/người thân giới thiệu", "Nhìn thấy cửa hàng khi đi trên đường"],
  "7": ["Chất lượng cà phê", "Hương vị", "Chất lượng phục vụ"],
  "8": {
    "Giá cả": 3,
    "Chất lượng cà phê": 5,
    "Hương vị": 5,
    "Mức độ nổi tiếng của thương hiệu": 2,
    "Không gian quán": 3,
    "Vị trí cửa hàng": 2,
    "Chất lượng phục vụ": 5,
    "Khuyến mãi/ưu đãi": 1,
    "Sự đa dạng của menu": 2
  },
  "9": "Ít ảnh hưởng",
  "10": "Ngon thì mua",
  "11": ["Chất lượng phục vụ không tốt", "Chất lượng hoặc hương vị không còn phù hợp"],
  "12": "Thường chọn thương hiệu quen thuộc",
  "13": "5 - Rất muốn",
  "14": "24–26 tuổi",
  "15": "Từ 8 triệu đồng trở lên"
};

async function test() {
  console.log('Sending complex answer set...');
  const postRes = await fetch(GOOGLE_SHEET_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentName: 'Đoàn Văn Quang Đại',
      mssv: '235A010001',
      timestamp: new Date().toISOString(),
      answers: answers
    })
  });
  console.log('POST status:', postRes.status, await postRes.text());

  console.log('Waiting 3 seconds...');
  await new Promise(r => setTimeout(r, 3000));

  console.log('Fetching GET...');
  const getRes = await fetch(GOOGLE_SHEET_API + '?action=getAll');
  const json = await getRes.json();
  console.log('GET count:', json.data ? json.data.length : 0);
  console.log('GET data:', JSON.stringify(json, null, 2));
}

test().catch(console.error);
