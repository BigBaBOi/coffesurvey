import React from 'react';

export default function SlideControls({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  isPlaying,
  setIsPlaying,
  showNotes,
  setShowNotes,
  showThumbnails,
  setShowThumbnails
}) {
  const slideNum = currentIndex + 1;

  // Create dot indicators
  const dots = Array.from({ length: totalSlides }, (_, i) => i);

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <footer style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {/* Left: Slide number + title indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            padding: '0.3rem 0.7rem',
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--color-text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {String(slideNum).padStart(2, '0')} / {totalSlides}
          </span>
          <button
            className={`control-btn ${showNotes ? 'control-btn-primary' : ''}`}
            onClick={() => setShowNotes(!showNotes)}
            title="Ghi chú người thuyết trình (Phím N)"
            id="btn-toggle-notes"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>notes</span>
            <span>Ghi chú (N)</span>
          </button>
        </div>

        {/* Center: Navigation island */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--color-surface-card)',
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <button
            style={{
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: currentIndex === 0 ? 'transparent' : 'rgba(0, 97, 154, 0.08)',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              color: currentIndex === 0 ? 'var(--color-outline-variant)' : 'var(--color-primary)',
              opacity: currentIndex === 0 ? 0.35 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'all 0.15s ease'
            }}
            onClick={onPrev}
            disabled={currentIndex === 0}
            title="Slide trước (Phím ←)"
            id="btn-prev"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chevron_left</span>
            <span className="hidden-mobile">Trước</span>
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 0.25rem' }}>
            {dots.map((i) => (
              <button
                key={i}
                className={`slide-indicator-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => onSelectSlide(i)}
                title={`Slide ${i + 1}`}
                id={`slide-dot-${i + 1}`}
              />
            ))}
          </div>

          <button
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: currentIndex === totalSlides - 1
                ? 'linear-gradient(135deg, #FF8800, #E65100)'
                : 'var(--color-primary-container)',
              cursor: 'pointer',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: currentIndex === totalSlides - 1 ? '0 2px 8px rgba(255,136,0,0.4)' : 'none',
              transition: 'all 0.15s ease'
            }}
            onClick={onNext}
            title={currentIndex === totalSlides - 1 ? "Xem Kết Quả Khảo Sát (Phím →)" : "Slide tiếp (Phím →)"}
            id="btn-next"
          >
            <span>{currentIndex === totalSlides - 1 ? "Xem Kết Quả" : "Tiếp"}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
              {currentIndex === totalSlides - 1 ? 'bar_chart' : 'chevron_right'}
            </span>
          </button>
        </div>

        {/* Right: View + Autoplay controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className={`control-btn ${showThumbnails ? 'control-btn-primary' : ''}`}
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="Mục lục slide"
            id="btn-slide-list"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>view_carousel</span>
            <span>Danh sách slide</span>
          </button>

          <button
            className="control-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Dừng Tự Động' : 'Tự Động Trình Chiếu'}
            id="btn-autoplay"
            style={isPlaying ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : {}}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Dừng' : 'Tự Chạy'}</span>
          </button>

          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}
            className="hidden-mobile">
            Phím tắt: [←] [→]
          </span>
        </div>
      </footer>
    </div>
  );
}
