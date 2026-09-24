import React from 'react';
import { TEAM_ROLES } from '../data/slidesData';
import { Users, Presentation, GraduationCap, Award } from 'lucide-react';

export default function TeamAllocationModal({ isDark, onSelectSlide }) {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1.75rem 1.25rem' }}>
      {/* Header Banner */}
      <div className="vhu-card vhu-card-gold" style={{ marginBottom: '1.75rem', textAlign: 'center', padding: '2rem 1.5rem' }}>
        <img src="/vhu-logo.svg" alt="VHU Logo" style={{ width: '70px', height: '70px', marginBottom: '0.75rem' }} />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#002B80' }}>
          DANH SÁCH NHÓM 3 & PHÂN CÔNG THUYẾT TRÌNH
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.1rem', color: '#0055D4', fontWeight: 800 }}>
            📚 Môn: Marketing Căn Bản
          </span>
          <span style={{ fontSize: '1.1rem', color: '#D00000', fontWeight: 800 }}>
            👩‍🏫 GVHD: ThS. Phạm Phương Mai
          </span>
        </div>
      </div>

      {/* 6 Team Members Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.35rem' }}>
        {TEAM_ROLES.map((role, idx) => (
          <div key={idx} className="vhu-card slide-animated" style={{ background: '#FFFFFF', borderTop: `6px solid ${role.color}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', boxShadow: '0 8px 25px rgba(0,50,150,0.15)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80' }}>{role.person}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 900, background: '#FFC700', color: '#002B80', padding: '0.35rem 0.75rem', borderRadius: '999px', boxShadow: '0 2px 8px rgba(255,199,0,0.4)' }}>
                  MSSV: {role.mssv}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <Award size={20} color={role.color} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: role.color }}>
                  {role.title} ({role.slides})
                </h3>
              </div>

              <p style={{ fontSize: '1.02rem', opacity: 0.9, lineHeight: 1.55, color: '#334155', fontWeight: 600 }}>
                {role.tasks}
              </p>
            </div>

            <button
              className="control-btn control-btn-primary"
              onClick={() => {
                const firstSlideIndex = idx === 0 ? 0 : idx === 1 ? 0 : idx === 2 ? 3 : idx === 3 ? 3 : idx === 4 ? 4 : 10;
                onSelectSlide(firstSlideIndex);
              }}
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', fontSize: '1.0rem', padding: '0.7rem' }}
            >
              <Presentation size={18} /> Xem Chi Tiết Slide ({role.slides})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
