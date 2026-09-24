import React from 'react';

export default function HeaderNav({ activeTab, setActiveTab, isDark, setIsDark, toggleFullscreen, onOpenQR }) {
  return (
    <header className="vhu-navbar">
      {/* Brand Identity */}
      <div className="vhu-brand">
        <div style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: 'var(--color-primary-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(11,122,192,0.3)',
          flexShrink: 0
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-on-primary)', fontSize: '1.1rem' }}>local_cafe</span>
        </div>
        <div className="vhu-brand-text">
          <h1>ĐẠI HỌC VĂN HIẾN</h1>
          <p>MARKETING CĂN BẢN · NHÓM 3</p>
        </div>

        {/* Research topic pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-academic-blue-subtle)',
          border: '1px solid var(--color-border-accent)',
          marginLeft: '0.5rem'
        }} className="hidden-mobile">
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Đề Tài Nghiên Cứu Và Xây Dựng Bảng Câu Hỏi
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>•</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Hành vi người tiêu dùng Gen Z</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'slides' ? 'active' : ''}`}
          onClick={() => setActiveTab('slides')}
          id="nav-tab-slides"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>view_carousel</span>
          <span>Slide 16:9</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
          id="nav-tab-analytics"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>bar_chart</span>
          <span>Kết Quả Real-Time</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'survey' ? 'active' : ''}`}
          onClick={() => setActiveTab('survey')}
          id="nav-tab-survey"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>assignment</span>
          <span>Bảng Hỏi 15 Câu</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
          id="nav-tab-team"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>groups</span>
          <span>Phân Công Nhóm</span>
        </button>
      </nav>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <button
          className="nav-action-btn"
          onClick={() => setActiveTab('slides')} // open drawer via slides tab
          title="Danh sách 13 Slide"
          style={{ display: 'none' }} // hidden, accessed via slide controls
        >
          <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>format_list_bulleted</span>
        </button>

        <button
          className="nav-action-btn primary"
          onClick={onOpenQR}
          title="Mở Mã QR Khảo Sát Trực Tiếp"
          id="btn-open-qr"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>qr_code_2</span>
          <span>Mã QR Live</span>
        </button>

        <button
          className="nav-action-btn"
          onClick={toggleFullscreen}
          title="Toàn Màn Hình (F)"
          id="btn-fullscreen"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>fullscreen</span>
        </button>
      </div>
    </header>
  );
}
