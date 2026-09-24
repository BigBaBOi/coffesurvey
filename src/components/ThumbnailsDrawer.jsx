import React from 'react';

export default function ThumbnailsDrawer({ slides, currentIndex, onSelectSlide, onClose }) {
  return (
    <div className="thumbnails-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="thumbnails-drawer">
        {/* Header */}
        <div className="thumbnails-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>format_list_bulleted</span>
            <h3 style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)'
            }}>
              Mục Lục {slides.length} Slide Thuyết Trình
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-muted)',
              transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-container-high)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            id="drawer-close-btn"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
          </button>
        </div>

        {/* Slide List */}
        <div className="thumbnails-list">
          {slides.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                className={`thumbnail-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                id={`drawer-slide-${idx + 1}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
                  <span className={`thumb-num-badge`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="thumb-info">
                    <div className="thumb-title" style={{
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)'
                    }}>
                      {s.title}
                    </div>
                    {s.category && (
                      <div className="thumb-sub">{s.category}</div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {s.speaker && (
                    <span style={{
                      fontSize: '0.68rem',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: 500
                    }}>
                      {s.speaker}
                    </span>
                  )}
                  {isActive && (
                    <span style={{
                      fontSize: '0.68rem',
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: '0.2rem'
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>check_circle</span>
                      Đang xem
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
