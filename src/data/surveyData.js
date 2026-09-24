export const SURVEY_QUESTIONS = [
  {
    id: 1,
    part: "PHẦN A. THÓI QUEN SỬ DỤNG CÀ PHÊ",
    question: "Câu 1. Bạn thường uống hoặc mua cà phê với tần suất như thế nào?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Hằng ngày",
      "3–5 lần/tuần",
      "1–2 lần/tuần",
      "Ít hơn 1 lần/tuần",
      "Hiếm khi"
    ]
  },
  {
    id: 2,
    part: "PHẦN A. THÓI QUEN SỬ DỤNG CÀ PHÊ",
    question: "Câu 2. Bạn thường mua cà phê theo hình thức nào?",
    type: "multiple",
    instruction: "Có thể chọn nhiều đáp án.",
    options: [
      "Mua trực tiếp tại cửa hàng/quán cà phê",
      "Mua mang đi (take-away)",
      "Đặt qua ứng dụng giao đồ ăn (GrabFood, ShopeeFood,...)",
      "Mua tại cửa hàng tiện lợi/siêu thị",
      "Đặt qua website/fanpage của thương hiệu",
      "Khác"
    ]
  },
  {
    id: 3,
    part: "PHẦN A. THÓI QUEN SỬ DỤNG CÀ PHÊ",
    question: "Câu 3. Trung bình, bạn thường chi bao nhiêu tiền cho mỗi lần mua cà phê?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Dưới 30.000 đồng",
      "Từ 30.000 – dưới 50.000 đồng",
      "Từ 50.000 – dưới 70.000 đồng",
      "Từ 70.000 – dưới 100.000 đồng",
      "Từ 100.000 đồng trở lên"
    ]
  },
  {
    id: 4,
    part: "PHẦN B. NHẬN BIẾT VÀ LỰA CHỌN THƯƠNG HIỆU",
    question: "Câu 4. Bạn biết đến những thương hiệu cà phê nào dưới đây?",
    type: "multiple",
    instruction: "Có thể chọn nhiều đáp án.",
    options: [
      "Highlands Coffee",
      "The Coffee House",
      "Phúc Long",
      "Trung Nguyên Legend / E-Coffee",
      "Starbucks",
      "Katinat",
      "Cộng Cà Phê",
      "Quán cà phê độc lập/cà phê vỉa hè/cà phê gần trường",
      "Khác"
    ]
  },
  {
    id: 5,
    part: "PHẦN B. NHẬN BIẾT VÀ LỰA CHỌN THƯƠNG HIỆU",
    question: "Câu 5. Bạn thường lựa chọn thương hiệu cà phê nào nhất?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Highlands Coffee",
      "The Coffee House",
      "Phúc Long",
      "Trung Nguyên Legend / E-Coffee",
      "Starbucks",
      "Katinat",
      "Cộng Cà Phê",
      "Quán cà phê độc lập/cà phê vỉa hè/cà phê gần trường",
      "Khác"
    ]
  },
  {
    id: 6,
    part: "PHẦN B. NHẬN BIẾT VÀ LỰA CHỌN THƯƠNG HIỆU",
    question: "Câu 6. Bạn thường biết đến các thương hiệu cà phê thông qua những nguồn nào?",
    type: "multiple",
    instruction: "Có thể chọn nhiều đáp án.",
    options: [
      "Mạng xã hội (Facebook, TikTok, Instagram,...)",
      "KOLs/Influencer/người nổi tiếng",
      "Bạn bè/người thân giới thiệu",
      "Nhìn thấy cửa hàng khi đi trên đường",
      "Quảng cáo",
      "Chương trình khuyến mãi",
      "Ứng dụng giao đồ ăn",
      "Khác"
    ]
  },
  {
    id: 7,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 7. Những yếu tố nào ảnh hưởng đến quyết định lựa chọn thương hiệu cà phê của bạn?",
    type: "multiple",
    instruction: "Có thể chọn nhiều đáp án.",
    options: [
      "Giá cả",
      "Chất lượng cà phê",
      "Hương vị",
      "Mức độ nổi tiếng của thương hiệu",
      "Không gian quán",
      "Vị trí cửa hàng",
      "Chất lượng phục vụ",
      "Khuyến mãi/ưu đãi",
      "Sự đa dạng của menu",
      "Đánh giá trên mạng xã hội",
      "Bạn bè/người thân giới thiệu",
      "Khác"
    ]
  },
  {
    id: 8,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 8. Vui lòng đánh giá mức độ quan trọng của các yếu tố sau khi bạn lựa chọn thương hiệu cà phê.",
    type: "matrix",
    instruction: "Thang đo: 1 = Hoàn toàn không quan trọng; 5 = Rất quan trọng",
    matrixItems: [
      "Giá cả",
      "Chất lượng cà phê",
      "Hương vị",
      "Mức độ nổi tiếng của thương hiệu",
      "Không gian quán",
      "Vị trí cửa hàng",
      "Chất lượng phục vụ",
      "Khuyến mãi/ưu đãi",
      "Sự đa dạng của menu"
    ]
  },
  {
    id: 9,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 9. Giá cả ảnh hưởng như thế nào đến quyết định lựa chọn thương hiệu cà phê của bạn?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Hoàn toàn không ảnh hưởng",
      "Ít ảnh hưởng",
      "Bình thường",
      "Ảnh hưởng nhiều",
      "Ảnh hưởng rất nhiều"
    ]
  },
  {
    id: 10,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 10. Điều gì ở một thương hiệu cà phê khiến bạn tin tưởng và lựa chọn?",
    type: "open",
    instruction: "Vui lòng trả lời ngắn gọn (Câu hỏi mở).",
    placeholder: "Nhập ý kiến cá nhân của bạn về yếu tố tạo niềm tin..."
  },
  {
    id: 11,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 11. Điều gì có thể khiến bạn chuyển từ thương hiệu cà phê đang sử dụng sang một thương hiệu khác?",
    type: "multiple",
    instruction: "Có thể chọn nhiều đáp án.",
    options: [
      "Giá cao hơn",
      "Chất lượng hoặc hương vị không còn phù hợp",
      "Thương hiệu khác có giá tốt hơn",
      "Thương hiệu khác có khuyến mãi hấp dẫn hơn",
      "Thương hiệu khác có sản phẩm hấp dẫn hơn",
      "Vị trí cửa hàng không thuận tiện",
      "Không gian không phù hợp",
      "Chất lượng phục vụ không tốt",
      "Bạn bè/người thân giới thiệu thương hiệu khác",
      "Khác"
    ]
  },
  {
    id: 12,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 12. Bạn thường mua cà phê ở thương hiệu quen thuộc hay thích thử thương hiệu mới?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Luôn chọn thương hiệu quen thuộc",
      "Thường chọn thương hiệu quen thuộc",
      "Tùy vào từng thời điểm",
      "Thường thử thương hiệu mới",
      "Luôn thích thử thương hiệu mới"
    ]
  },
  {
    id: 13,
    part: "PHẦN C. CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN LỰA CHỌN",
    question: "Câu 13. Nếu thương hiệu cà phê bạn thường sử dụng tiếp tục duy trì chất lượng và mức giá hiện tại, mức độ bạn muốn tiếp tục mua trong thời gian tới là bao nhiêu?",
    type: "scale",
    instruction: "1 = Hoàn toàn không muốn; 5 = Rất muốn",
    options: ["1 - Hoàn toàn không", "2 - Không muốn", "3 - Trung lập", "4 - Muốn", "5 - Rất muốn"]
  },
  {
    id: 14,
    part: "PHẦN D. THÔNG TIN CÁ NHÂN",
    question: "Câu 14. Bạn thuộc nhóm tuổi nào?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Dưới 18 tuổi",
      "18–20 tuổi",
      "21–23 tuổi",
      "24–26 tuổi",
      "Trên 26 tuổi"
    ]
  },
  {
    id: 15,
    part: "PHẦN D. THÔNG TIN CÁ NHÂN",
    question: "Câu 15. Mức chi tiêu cá nhân trung bình hàng tháng của bạn khoảng bao nhiêu?",
    type: "single",
    instruction: "Vui lòng chọn 1 đáp án.",
    options: [
      "Dưới 2 triệu đồng",
      "Từ 2 – dưới 4 triệu đồng",
      "Từ 4 – dưới 6 triệu đồng",
      "Từ 6 – dưới 8 triệu đồng",
      "Từ 8 triệu đồng trở lên",
      "Không muốn trả lời"
    ]
  }
];
