export const SLIDES = [
  {
    id: 1,
    slideNum: "Slide 1",
    title: "BẢNG CÂU HỎI NGHIÊN CỨU",
    subtitle: "Nghiên cứu các yếu tố ảnh hưởng đến lựa chọn thương hiệu cà phê của sinh viên",
    category: "Trang Bìa",
    duration: "2 phút",
    notes: "Chào mừng Thầy/Cô và các bạn. Đây là đề tài nghiên cứu Marketing căn bản của Nhóm 3 sinh viên Trường Đại học Văn Hiến.",
    content: {
      type: "cover",
      subject: "Môn học: Marketing Căn Bản",
      university: "TRƯỜNG ĐẠI HỌC VĂN HIẾN (VHU)",
      motto: "Thành nhân trước thành danh",
      instructor: "Giảng viên hướng dẫn: GV. Phạm Phương Mai",
      group: "Nhóm nghiên cứu: Nhóm 3",
      members: [
        { name: "Đoàn Văn Quang Đại", mssv: "235A010001", role: "Thiết kế Slide" },
        { name: "Nguyễn Cao Đại", mssv: "251A301372", role: "Thuyết trình chính" },
        { name: "Lê Thiện Đức", mssv: "251A140324", role: "Nội dung Phần A" },
        { name: "Nguyễn Ngọc Diễm", mssv: "241A040178", role: "Nội dung Phần B" },
        { name: "Mai Hoàng Đức", mssv: "251A010423", role: "Nội dung Phần C" },
        { name: "Nguyễn Tiến Đạt", mssv: "251A301039", role: "Nội dung Phần D" }
      ]
    }
  },
  {
    id: 2,
    slideNum: "Slide 2",
    title: "VẤN ĐỀ NGHIÊN CỨU",
    subtitle: "Thực trạng hành vi tiêu dùng cà phê của giới trẻ sinh viên",
    category: "Đặt Vấn Đề",
    duration: "2.5 phút",
    notes: "Nêu bật tính cấp thiết: Sinh viên ngày nay có hàng loạt sự lựa chọn từ Highlands, Phúc Long, Katinat đến cà phê vỉa hè.",
    content: {
      type: "problem",
      contextTitle: "Thực Trạng & Bối Cảnh",
      contextText: "Sinh viên hiện nay đứng trước vô số lựa chọn thương hiệu cà phê với sự khác biệt rõ rệt về giá cả, hương vị, chất lượng sản phẩm, giá trị thương hiệu, không gian trải nghiệm, vị trí địa lý và vô vàn chương trình khuyến mãi hấp dẫn.",
      questionTitle: "CÂU HỎI NGHIÊN CỨU TRUNG TÂM",
      questionText: "Những yếu tố nào ảnh hưởng trực tiếp đến quyết định lựa chọn thương hiệu cà phê của sinh viên?",
      highlights: [
        { title: "Đa dạng lựa chọn", desc: "Thị trường F&B cạnh tranh khốc liệt" },
        { title: "Nhạy cảm về giá", desc: "Thu nhập & ngân sách sinh viên giới hạn" },
        { title: "Trải nghiệm không gian", desc: "Nhu cầu học tập & chạy deadline nhóm" }
      ]
    }
  },
  {
    id: 3,
    slideNum: "Slide 3",
    title: "MỤC TIÊU NGHIÊN CỨU",
    subtitle: "5 Mục tiêu cốt lõi của dự án khảo sát",
    category: "Mục Tiêu",
    duration: "2 phút",
    notes: "Đi qua 5 mục tiêu cụ thể từ thói quen, nhận biết, các yếu tố quyết định, lòng trung thành và đặc điểm cá nhân.",
    content: {
      type: "objectives",
      objectives: [
        { id: 1, icon: "Coffee", title: "Thói quen tiêu dùng", desc: "Tìm hiểu tần suất, hình thức mua và mức chi tiêu mua cà phê hàng tuần của sinh viên." },
        { id: 2, icon: "Award", title: "Nhận biết thương hiệu", desc: "Xác định top thương hiệu cà phê được sinh viên biết đến phổ biến & ưu tiên lựa chọn." },
        { id: 3, icon: "Sliders", title: "Các yếu tố ảnh hưởng", desc: "Xác định các yếu tố trọng yếu (giá, vị, không gian, vị trí, km...) tác động đến quyết định." },
        { id: 4, icon: "Repeat", title: "Lòng trung thành", desc: "Tìm hiểu mức độ gắn kết và khả năng chuyển đổi sang thương hiệu cà phê đối thủ." },
        { id: 5, icon: "UserCheck", title: "Đặc điểm cá nhân", desc: "Phân tích mối liên hệ giữa độ tuổi, thu nhập/chi tiêu hàng tháng với thói quen chọn cà phê." }
      ]
    }
  },
  {
    id: 4,
    slideNum: "Slide 4",
    title: "ĐỐI TƯỢNG VÀ PHƯƠNG PHÁP",
    subtitle: "Thiết kế nghiên cứu & Phương pháp thu thập dữ liệu",
    category: "Phương Pháp",
    duration: "2.5 phút",
    notes: "Giới thiệu mẫu sinh viên, phương pháp định lượng qua bảng hỏi 15 câu gồm 4 phần chính.",
    content: {
      type: "methodology",
      target: "Sinh viên đang theo học tại các trường Đại học (Phạm vi khảo sát VHU)",
      method: "Nghiên cứu định lượng - Khảo sát trực tuyến & trực tiếp bằng Bảng câu hỏi chuẩn hóa",
      stats: [
        { value: "15", label: "Câu hỏi tổng cộng" },
        { value: "04", label: "Phần nội dung" },
        { value: "05", label: "Thang đo Likert" },
        { value: "100%", label: "Tính bao quát" }
      ],
      parts: [
        { part: "Phần A", name: "Thói quen sử dụng", count: "3 câu (C1 - C3)" },
        { part: "Phần B", name: "Nhận biết & Lựa chọn", count: "3 câu (C4 - C6)" },
        { part: "Phần C", name: "Yếu tố ảnh hưởng", count: "7 câu (C7 - C13)" },
        { part: "Phần D", name: "Thông tin cá nhân", count: "2 câu (C14 - C15)" }
      ]
    }
  },
  {
    id: 5,
    slideNum: "Slide 5",
    title: "CÁC YẾU TỐ NGHIÊN CỨU DỰ KIẾN",
    subtitle: "Mô hình 5 nhóm yếu tố tác động đến quyết định mua",
    category: "Yếu Tố",
    duration: "3 phút",
    notes: "Phân nhóm 11 yếu tố thành 5 trụ cột: Sản phẩm, Giá trị, Thương hiệu, Trải nghiệm và Xã hội.",
    content: {
      type: "factors",
      categories: [
        { name: "1. Sản Phẩm", color: "#0066FF", items: ["Hương vị cà phê", "Chất lượng nguyên liệu", "Sự đa dạng của menu"] },
        { name: "2. Giá Trị", color: "#FF8800", items: ["Mức giá vừa túi tiền", "Chương trình khuyến mãi", "Voucher & ưu đãi"] },
        { name: "3. Thương Hiệu", color: "#002B80", items: ["Mức độ nổi tiếng", "Uy tín thương hiệu", "Đánh giá trên MXH"] },
        { name: "4. Trải Nghiệm", color: "#0D9488", items: ["Không gian & decor", "Vị trí thuận tiện", "Chất lượng phục vụ"] },
        { name: "5. Xã Hội", color: "#8B5CF6", items: ["Bạn bè giới thiệu", "Ảnh hưởng KOL/TikTok", "Xu hướng trào lưu"] }
      ]
    }
  },
  {
    id: 6,
    slideNum: "Slide 6",
    title: "THIẾT KẾ BẢNG CÂU HỎI",
    subtitle: "Luồng logic sắp xếp câu hỏi từ tổng quan đến chuyên sâu",
    category: "Bảng Hỏi",
    duration: "2.5 phút",
    notes: "Giải thích nguyên tắc dòng chảy câu hỏi: Dễ -> Thói quen -> Thương hiệu -> Trọng tâm -> Đánh giá hành vi -> Thông tin cá nhân cuối cùng.",
    content: {
      type: "design_flow",
      steps: [
        { num: "Phần A", title: "Thói Quen", desc: "Tần suất uống → Hình thức mua → Mức chi tiêu trung bình" },
        { num: "Phần B", title: "Nhận Biết", desc: "Danh sách thương hiệu biết → Thương hiệu chọn nhiều nhất → Nguồn thông tin" },
        { num: "Phần C", title: "Trọng Tâm", desc: "Yếu tố ảnh hưởng → Thang đo Likert → Độ nhạy giá → Trải nghiệm & Lòng trung thành" },
        { num: "Phần D", title: "Cá Nhân", desc: "Nhóm độ tuổi → Mức chi tiêu cá nhân hàng tháng" }
      ],
      rule: "Nguyên tắc: Câu dễ trả lời → Thói quen → Thương hiệu → Trọng tâm → Đánh giá hành vi → Thông tin cá nhân cuối cùng"
    }
  },
  {
    id: 7,
    slideNum: "Slide 7",
    title: "CÁC DẠNG CÂU HỎI SỬ DỤNG",
    subtitle: "Đa dạng loại hình câu hỏi đảm bảo dữ liệu chính xác",
    category: "Dạng Câu Hỏi",
    duration: "3 phút",
    notes: "Nêu ví dụ về câu hỏi đóng 1 lựa chọn và câu hỏi chọn nhiều lựa chọn trong bảng khảo sát.",
    content: {
      type: "question_types",
      type1: {
        badge: "Câu hỏi đóng - 1 lựa chọn",
        title: "Ví dụ: Tần suất uống cà phê?",
        options: ["○ Hằng ngày", "○ 3 - 5 lần/tuần", "○ 1 - 2 lần/tuần", "○ Ít hơn 1 lần/tuần", "○ Hiếm khi"]
      },
      type2: {
        badge: "Câu hỏi chọn nhiều đáp án (Multi-choice)",
        title: "Ví dụ: Thương hiệu bạn biết đến?",
        options: ["☑ Highlands Coffee", "☑ The Coffee House", "☑ Phúc Long", "☑ Starbucks", "☑ Katinat / Khác..."]
      }
    }
  },
  {
    id: 8,
    slideNum: "Slide 8",
    title: "THĂNG ĐO LIKERT 5 MỨC",
    subtitle: "Đo lường định lượng mức độ quan trọng của các yếu tố",
    category: "Thang Đo",
    duration: "3 phút",
    notes: "Giải thích cách áp dụng thang đo Likert 5 mức từ 1 (Hoàn toàn không quan trọng) đến 5 (Rất quan trọng).",
    content: {
      type: "likert_scale",
      scaleMeaning: [
        { val: 1, text: "Hoàn toàn không quan trọng" },
        { val: 2, text: "Không quan trọng" },
        { val: 3, text: "Bình thường" },
        { val: 4, text: "Quan trọng" },
        { val: 5, text: "Rất quan trọng" }
      ],
      factorsToRate: [
        "Giá cả", "Chất lượng cà phê", "Hương vị sản phẩm",
        "Mức độ nổi tiếng thương hiệu", "Không gian quán", "Vị trí cửa hàng",
        "Chất lượng phục vụ", "Khuyến mãi / Ưu đãi", "Sự đa dạng menu"
      ]
    }
  },
  {
    id: 9,
    slideNum: "Slide 9",
    title: "CÂU HỎI MỞ (QUALITATIVE INSIGHT)",
    subtitle: "Khai thác sâu tâm lý & niềm tin thương hiệu của người dùng",
    category: "Câu Hỏi Mở",
    duration: "2 phút",
    notes: "Giải thích vai trò của câu hỏi mở số 10 để lắng nghe ý kiến chân thực của sinh viên.",
    content: {
      type: "open_question",
      qNumber: "Câu 10 trong bảng khảo sát",
      question: "“Điều gì ở một thương hiệu cà phê khiến bạn tin tưởng và lựa chọn?”",
      purpose: "Cho phép người trả lời tự do đưa ra ý kiến cá nhân sâu sắc, giúp khám phá các góc nhìn mới ngoài các phương án định sẵn."
    }
  },
  {
    id: 10,
    slideNum: "Slide 10",
    title: "CÂU HỎI ĐÁNH GIÁ HÀNH VI & Ý ĐỊNH",
    subtitle: "Nghiên cứu lý do chuyển đổi & Ý định tiếp tục mua",
    category: "Hành Vi",
    duration: "2.5 phút",
    notes: "Phân tích các câu hỏi 11, 12, 13 đo lường lý do bỏ thương hiệu, thói quen thử mới và lòng trung thành.",
    content: {
      type: "behavior_questions",
      items: [
        {
          code: "Câu 11",
          title: "Lý do chuyển đổi thương hiệu",
          desc: "Đo lường yếu tố kích hoạt việc sinh viên bỏ thương hiệu cũ: Giá cao hơn, chất lượng giảm, phục vụ kém, hoặc đối thủ có ưu đãi tốt hơn."
        },
        {
          code: "Câu 12",
          title: "Xu hướng trải nghiệm mới",
          desc: "Phân loại khách hàng: Trung thành với thương hiệu quen thuộc hay luôn yêu thích trải nghiệm thương hiệu cà phê mới."
        },
        {
          code: "Câu 13",
          title: "Ý định tiếp tục mua (Likert 1-5)",
          desc: "Đo lường mức độ muốn tiếp tục mua nếu thương hiệu duy trì chất lượng & mức giá hiện tại."
        }
      ]
    }
  },
  {
    id: 11,
    slideNum: "Slide 11",
    title: "PHẦN THÔNG TIN CÁ NHÂN",
    subtitle: "Tại sao thông tin nhân khẩu học được đặt ở cuối?",
    category: "Cá Nhân",
    duration: "2 phút",
    notes: "Nêu lý do khoa học của việc đặt độ tuổi và chi tiêu ở cuối bảng hỏi.",
    content: {
      type: "personal_info",
      questions: [
        { q: "Câu 14: Độ tuổi", options: ["Dưới 18", "18–20 tuổi", "21–23 tuổi", "24–26 tuổi", "Trên 26 tuổi"] },
        { q: "Câu 15: Chi tiêu hàng tháng", options: ["Dưới 2tr", "2 - 4 triệu", "4 - 6 triệu", "6 - 8 triệu", "Trên 8 triệu"] }
      ],
      reasonTitle: "Ý NGHĨA THIẾT KẾ SCIENTIFIC",
      reasons: [
        "Tránh tạo cảm giác ngần ngại hay bị điều tra ngay từ đầu.",
        "Giúp người trả lời tập trung hoàn thành 100% phần nội dung nghiên cứu chính.",
        "Thông tin cá nhân ở cuối giúp phân loại nhóm đối tượng dễ dàng khi xử lý SPSS/Excel."
      ]
    }
  },
  {
    id: 12,
    slideNum: "Slide 12",
    title: "KIỂM NGHIỆM BẢNG CÂU HỎI (PRE-TEST)",
    subtitle: "Quy trình 6 bước đảm bảo độ tin cậy và giá trị bảng hỏi",
    category: "Kiểm Nghiệm",
    duration: "2.5 phút",
    notes: "Giới thiệu 6 bước khảo sát thử nghiệm trước khi tung bảng hỏi chính thức.",
    content: {
      type: "pretest",
      steps: [
        { step: 1, title: "Trả lời thử", desc: "Cho nhóm nhỏ sinh viên đọc & hoàn thành thử" },
        { step: 2, title: "Diễn đạt", desc: "Rà soát từ ngữ rõ ràng, chuẩn tiếng Việt" },
        { step: 3, title: "Phương án", desc: "Kiểm tra tính bao phủ của các lựa chọn" },
        { step: 4, title: "Rà soát lỗi", desc: "Loại bỏ câu hỏi trùng lặp hoặc gây hiểu nhầm" },
        { step: 5, title: "Đo thời gian", desc: "Đảm bảo thời gian làm bài từ 3 - 5 phút" },
        { step: 6, title: "Hoàn thiện", desc: "Chỉnh sửa bản chính thức phát hành rộng rãi" }
      ]
    }
  },
  {
    id: 13,
    slideNum: "Slide 13",
    title: "KẾT LUẬN & XIN CẢM ƠN",
    subtitle: "Tổng kết nghiên cứu & Mời đặt câu hỏi thảo luận",
    category: "Kết Luận",
    duration: "2 phút",
    notes: "Tóm tắt ưu điểm của bảng hỏi và gửi lời cảm ơn Thầy Cô & các bạn.",
    content: {
      type: "conclusion",
      summaryPoints: [
        "Bảng câu hỏi gồm 15 câu chuẩn mực, logic từ thói quen đến hành vi.",
        "Kết hợp linh hoạt các dạng câu hỏi: Đóng, Mở, Chọn nhiều & Likert 5 mức.",
        "Áp dụng quy trình kiểm nghiệm Pre-test kỹ lưỡng trước khi thu thập.",
        "Sẵn sàng triển khai khảo sát thu thập dữ liệu phục vụ báo cáo Marketing."
      ],
      thankYou: "TRƯỜNG ĐẠI HỌC VĂN HIẾN (VHU)",
      slogan: "Thành Nhân Trước Thành Danh",
      contact: "Trân trọng cảm ơn GV. Phạm Phương Mai và các bạn đã chú ý theo dõi!"
    }
  }
];

export const TEAM_ROLES = [
  {
    person: "Đoàn Văn Quang Đại",
    mssv: "235A010001",
    slides: "Tất cả Slide",
    title: "Phụ trách Thiết kế Slide",
    tasks: "Biên tập giao diện thuyết trình 16:9, thiết kế hiệu ứng, logo VHU và tổng hợp toàn bộ Slide bài thuyết trình.",
    color: "#0066FF"
  },
  {
    person: "Nguyễn Cao Đại",
    mssv: "251A301372",
    slides: "Slide 1 – 13",
    title: "Đại diện Thuyết trình chính",
    tasks: "Phụ trách thuyết trình toàn bộ bài báo cáo nghiên cứu trước GV. Phạm Phương Mai và tập thể lớp.",
    color: "#FF8800"
  },
  {
    person: "Lê Thiện Đức",
    mssv: "251A140324",
    slides: "Phần A (Slide 4, 6)",
    title: "Phụ trách Nội dung Phần A",
    tasks: "Xây dựng nhóm câu hỏi Thói quen sử dụng cà phê (Tần suất, hình thức mua, mức chi tiêu C1 - C3).",
    color: "#0D9488"
  },
  {
    person: "Nguyễn Ngọc Diễm",
    mssv: "241A040178",
    slides: "Phần B (Slide 4, 6)",
    title: "Phụ trách Nội dung Phần B",
    tasks: "Xây dựng nhóm câu hỏi Nhận biết & Lựa chọn thương hiệu (Nhận biết, ưu tiên chọn, nguồn thông tin C4 - C6).",
    color: "#E11D48"
  },
  {
    person: "Mai Hoàng Đức",
    mssv: "251A010423",
    slides: "Phần C (Slide 5, 7-10)",
    title: "Phụ trách Nội dung Phần C",
    tasks: "Thiết kế nhóm câu hỏi Trọng tâm nghiên cứu (Yếu tố ảnh hưởng, thang đo Likert, độ nhạy giá C7 - C13).",
    color: "#8B5CF6"
  },
  {
    person: "Nguyễn Tiến Đạt",
    mssv: "251A301039",
    slides: "Phần D (Slide 11)",
    title: "Phụ trách Nội dung Phần D",
    tasks: "Xây dựng nhóm câu hỏi Thông tin cá nhân (Nhóm độ tuổi, chi tiêu cá nhân hàng tháng C14 - C15).",
    color: "#0284C7"
  }
];
