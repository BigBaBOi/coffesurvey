import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Export current survey responses and analytics stats as a backup PDF report.
 */
export async function exportSurveyPDFBackup(responses = [], stats = null) {
  const printElement = document.createElement('div');
  printElement.id = 'vhu-pdf-print-root';
  printElement.style.position = 'absolute';
  printElement.style.left = '-9999px';
  printElement.style.top = '0';
  printElement.style.width = '820px';
  printElement.style.padding = '35px';
  printElement.style.background = '#FFFFFF';
  printElement.style.color = '#0F172A';
  printElement.style.fontFamily = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const dateStr = new Date().toLocaleString('vi-VN');
  const total = responses.length;

  const topBrand = stats && stats.brandCounts && Object.keys(stats.brandCounts).length > 0
    ? Object.keys(stats.brandCounts).sort((a,b) => stats.brandCounts[b] - stats.brandCounts[a])[0]
    : 'Chưa có';

  const topSpending = stats && stats.spendingCounts && Object.keys(stats.spendingCounts).length > 0
    ? Object.keys(stats.spendingCounts).sort((a,b) => stats.spendingCounts[b] - stats.spendingCounts[a])[0]
    : 'Chưa có';

  const likertPrice = stats && stats.likertAverages && stats.likertAverages['Giá cả']
    ? stats.likertAverages['Giá cả']
    : 'N/A';

  printElement.innerHTML = `
    <!-- Header -->
    <div style="border-bottom: 3px solid #002B80; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="font-size: 20px; color: #002B80; margin: 0 0 6px 0; font-weight: 900; letter-spacing: -0.5px;">TRƯỜNG ĐẠI HỌC VĂN HIẾN - KHOA MARKETING</h1>
        <h2 style="font-size: 15px; color: #E85D04; margin: 0; font-weight: 800;">DỮ LIỆU BACKUP KHẢO SÁT THƯƠNG HIỆU CÀ PHÊ SINH VIÊN</h2>
      </div>
      <div style="text-align: right; font-size: 11px; color: #475569; line-height: 1.4;">
        <div><strong>Ngày xuất file:</strong> ${dateStr}</div>
        <div><strong>Tổng bài khảo sát:</strong> <span style="color: #002B80; font-weight: bold;">${total} lượt</span></div>
        <div><strong>Đơn vị:</strong> Nhóm 3 - Marketing Căn Bản</div>
      </div>
    </div>

    <!-- Executive Summary Box -->
    <div style="background: #F0F7FF; border: 1.5px solid #0066FF; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
      <h3 style="font-size: 14px; color: #002B80; margin: 0 0 12px 0; font-weight: 800; display: flex; align-items: center; gap: 6px;">
        📌 TỔNG QUAN CHỈ SỐ KHẢO SÁT (EXECUTIVE SUMMARY)
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #1E293B;">
        <tr>
          <td style="padding: 6px 0; width: 50%;"><strong>• Tổng số bài làm sinh viên:</strong> ${total} bài</td>
          <td style="padding: 6px 0; width: 50%;"><strong>• Thương hiệu được chọn nhiều nhất:</strong> <span style="color: #E85D04; font-weight: bold;">${topBrand}</span></td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>• Mức chi tiêu phổ biến nhất:</strong> ${topSpending}</td>
          <td style="padding: 6px 0;"><strong>• Điểm coi trọng yếu tố Giá cả:</strong> <span style="color: #0066FF; font-weight: bold;">${likertPrice} / 5.0</span></td>
        </tr>
      </table>
    </div>

    <!-- Student Responses Detailed Table -->
    <h3 style="font-size: 14px; color: #002B80; margin: 0 0 12px 0; font-weight: 800;">
      📋 CHI TIẾT DANH SÁCH KHẢO SÁT SINH VIÊN DA ĐƯỢC LƯU BACKUP (${total} LƯỢT)
    </h3>
    ${
      total === 0 ? '<p style="font-size: 12px; color: #64748B; font-style: italic; padding: 10px; background: #F1F5F9; border-radius: 6px;">Không có dữ liệu bài khảo sát nào để lưu trữ.</p>' : `
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
        <thead>
          <tr style="background: #002B80; color: #FFFFFF; font-weight: bold;">
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1; text-align: center; width: 40px;">STT</th>
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1;">Họ và tên sinh viên</th>
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1; width: 100px;">MSSV</th>
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1;">Thương hiệu chọn (Q5)</th>
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1;">Mức chi tiêu (Q3)</th>
            <th style="padding: 8px 10px; border: 1px solid #CBD5E1; width: 130px;">Thời gian nộp</th>
          </tr>
        </thead>
        <tbody>
          ${responses.map((r, i) => `
            <tr style="background: ${i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0; text-align: center;">${i + 1}</td>
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0; font-weight: bold; color: #0F172A;">${r.studentName || 'Sinh viên'}</td>
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0; font-weight: 600; color: #0066FF;">${r.mssv || '—'}</td>
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0; font-weight: 600; color: #E85D04;">${r.answers ? (r.answers[5] || '—') : '—'}</td>
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0;">${r.answers ? (r.answers[3] || '—') : '—'}</td>
              <td style="padding: 7px 10px; border: 1px solid #E2E8F0; font-size: 10px; color: #64748B;">
                ${new Date(r.timestamp).toLocaleString('vi-VN')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      `
    }

    <!-- Footer -->
    <div style="margin-top: 35px; border-top: 1px solid #CBD5E1; padding-top: 12px; text-align: center; font-size: 10px; color: #64748B;">
      Hệ Thống Thuyết Trình & Khảo Sát Tương Tác VHU Coffee • Trường Đại Học Văn Hiến • Khoa Marketing
    </div>
  `;

  document.body.appendChild(printElement);

  try {
    const canvas = await html2canvas(printElement, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const filename = `VHU_Coffee_Survey_Backup_${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error("PDF generation error:", err);
    alert("Có lỗi khi tạo file PDF backup: " + err.message);
    return false;
  } finally {
    if (document.body.contains(printElement)) {
      document.body.removeChild(printElement);
    }
  }
}
