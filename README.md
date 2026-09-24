# 🎓 Ứng Dụng Thuyết Trình 16:9 & Khảo Sát Real-Time - Đại Học Văn Hiến (VHU)

> **Đề Tài:** Nghiên cứu Thương hiệu Cà phê Sinh viên  
> **Đơn vị:** Trường Đại học Văn Hiến • Khoa Marketing • Bài thuyết trình Nhóm 3  

---

## 🌟 Giới Thiệu Tổng Quan

Ứng dụng web thuyết trình tương tác chuẩn tỷ lệ **16:9** kết hợp hệ thống **Khảo sát Real-Time** thời gian thực, được thiết kế chuyên nghiệp theo nhận diện thương hiệu **Trường Đại Học Văn Hiến (VHU)**. 

Hệ thống cho phép sinh viên trong lớp quét **Mã QR Live** trên màn hình bằng điện thoại thông minh để nộp bài khảo sát 15 câu trực tiếp. Kết quả sẽ tự động đồng bộ thời gian thực lên màn hình thuyết trình của nhóm.

---

## 🔥 Tính Năng Nổi Bật

1. **Slide Thuyết Trình Khung Hình 16:9 Chuẩn**:
   - Giao diện đẹp mắt, hiệu ứng chuyển trang mượt mà (Next/Prev, phím mũi tên).
   - Chế độ Toàn Màn Hình (**Fullscreen - Phím F**).
   - Ghi chú thuyết trình viên (**Speaker Notes - Phím N**).
   - Danh mục hình ảnh thu nhỏ các slide (**Thumbnails Drawer**).

2. **Khảo Sát Real-Time & Đồng Bộ Đa Thiết Bị**:
   - Sinh viên chỉ cần quét **Mã QR** để mở ngay giao diện khảo sát mobile mượt mà.
   - Sử dụng `BroadcastChannel` & `LocalStorage` giúp kết quả nhảy số thời gian thực mà không cần reload trang.

3. **Dashboard Thống Kê Trực Quan**:
   - Biểu đồ thương hiệu được chọn nhiều nhất (Highlands, Phúc Long, Katinat,...).
   - Thống kê điểm Likert trung bình của các yếu tố tác động (Giá cả, Hương vị, Không gian,...).
   - Bảng chi tiết danh sách sinh viên nộp bài theo thời gian thực.

4. **Sao Lưu PDF & Xóa Dữ Liệu An Toàn (PDF Backup & Clear)**:
   - **Tải PDF Backup:** Xuất báo cáo dữ liệu định dạng PDF chuyên nghiệp (`.pdf`) lưu lại toàn bộ bài khảo sát và chỉ số tổng quan.
   - **Quy trình Xóa dữ liệu an toàn:** Hộp thoại cảnh báo hỗ trợ tự động tải PDF Backup trước khi làm sạch cơ sở dữ liệu.

5. **Nhận Diện Thương Hiệu VHU Premium**:
   - Tông màu xanh hoàng gia VHU (`#002B80`) và vàng cam rực rỡ (`#E85D04` / `#FFC700`).
   - Chế độ Giao diện **Sáng / Tối (Light/Dark Mode)** linh hoạt.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu Cầu Hệ Thống
- **Node.js** v18.0.0 trở lên.
- **npm** v9.0.0 trở lên.

### Các Bước Thực Hiện

1. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
   Sau khi chạy, mở trình duyệt tại địa chỉ: `http://localhost:5173`

3. **Đóng gói dự án (Production Build):**
   ```bash
   npm run build
   ```

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
thuyettrinhbaivenha/
├── public/
│   └── vhu-logo.svg               # Logo chính thức Trường ĐH Văn Hiến
├── src/
│   ├── components/
│   │   ├── HeaderNav.jsx          # Thanh điều hướng Navbar chính
│   │   ├── SlideCanvas.jsx        # Khung hình Slide 16:9 & animation
│   │   ├── SlideControls.jsx      # Thanh công cụ điều khiển slide
│   │   ├── SpeakerNotes.jsx       # Ghi chú thuyết trình viên
│   │   ├── ThumbnailsDrawer.jsx   # Danh sách ảnh thu nhỏ slide
│   │   ├── InteractiveSurvey.jsx  # Bảng khảo sát 15 câu dành cho desktop
│   │   ├── StudentSurveyView.jsx   # Giao diện khảo sát mobile khi quét QR
│   │   ├── LiveAnalyticsDashboard.jsx # Dashboard tổng hợp kết quả Real-time & PDF Backup
│   │   ├── QRCodeModal.jsx        # Modal hiển thị Mã QR live
│   │   └── TeamAllocationModal.jsx# Modal phân công công việc Nhóm 3
│   ├── data/
│   │   ├── slidesData.js          # Nội dung 12 Slide thuyết trình
│   │   └── surveyData.js          # Chi tiết 15 câu hỏi khảo sát
│   ├── utils/
│   │   ├── storage.js             # Quản lý lưu trữ LocalStorage & BroadcastChannel Realtime
│   │   └── pdfExport.js           # Xuất báo cáo PDF Backup (html2canvas & jsPDF)
│   ├── App.jsx                    # Root Component chính
│   ├── main.jsx                   # Entry point React
│   └── index.css                  # Style CSS & VHU Design System
├── Bang_cau_hoi_thuong_hieu_ca_phe_va_suon_slide.md # Tài liệu gốc đề tài
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core**: React 19, Vite.
- **Icon Library**: `lucide-react`.
- **QR Code Generator**: `qrcode.react`.
- **PDF Export**: `jspdf`, `html2canvas`.
- **Confetti Effects**: `canvas-confetti`.

---

## 📜 Giấy Phép & Bản Quyền

Dự án phục vụ học tập và thuyết trình môn **Marketing Căn Bản** tại **Trường Đại Học Văn Hiến**.  
© 2026 Nhóm 3 • Khoa Marketing • VHU.
# cofesurvey
