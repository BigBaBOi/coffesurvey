import React from 'react';

export default function SpeakerNotes({ slide, onClose }) {
  if (!slide) return null;

  return (
    <div className="speaker-notes-panel">
      <div className="speaker-notes-header">
        <div className="speaker-notes-header-title">
          <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>speaker_notes</span>
          Ghi Chú Diễn Giả (Presenter Notes) — {slide.slideNum}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {slide.speaker && (
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-dynamic-orange-subtle)' }}>
              🎤 {slide.speaker}
            </span>
          )}
          {slide.duration && (
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>schedule</span>
              {slide.duration}
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '0.72rem',
              padding: '0.2rem 0.4rem',
              borderRadius: 'var(--radius-sm)',
              transition: 'color 0.15s'
            }}
            title="Đóng ghi chú [N]"
          >
            Đóng [N]
          </button>
        </div>
      </div>
      <p className="speaker-notes-body">{slide.notes}</p>
    </div>
  );
}
