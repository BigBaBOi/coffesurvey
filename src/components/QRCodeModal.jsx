import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, Copy, Check, ExternalLink, QrCode, Globe, Edit3, RefreshCw } from 'lucide-react';

export default function QRCodeModal({ onClose, isDark }) {
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [isEditingDomain, setIsEditingDomain] = useState(false);

  // Auto-detect dynamic domain & path in real-time
  const defaultUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/$/, '');
    return `${origin}${pathname}/?mode=student`;
  }, []);

  // Compute the final QR URL
  const studentUrl = useMemo(() => {
    if (!customDomain.trim()) return defaultUrl;
    let url = customDomain.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    if (!url.includes('mode=student')) {
      url += url.includes('?') ? '&mode=student' : '?mode=student';
    }
    return url;
  }, [customDomain, defaultUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(studentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 18, 41, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="vhu-card vhu-card-gold slide-animated" style={{
        maxWidth: '540px',
        width: '100%',
        textAlign: 'center',
        padding: '2rem 1.75rem',
        borderRadius: '24px',
        position: 'relative',
        boxShadow: '0 25px 65px rgba(0, 80, 220, 0.6)',
        border: '3px solid #00D2FF'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 41, 98, 0.15)',
            border: 'none',
            color: '#002B80',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'inline-flex', padding: '0.65rem', borderRadius: '50%', background: '#0066FF', color: '#FFFFFF', marginBottom: '0.65rem' }}>
          <QrCode size={32} />
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#002B80', marginBottom: '0.25rem' }}>
          MÃ QR KHẢO SÁT REAL-TIME
        </h3>
        <p style={{ fontSize: '0.92rem', color: '#334155', fontWeight: 600, marginBottom: '1.25rem' }}>
          Sinh viên quét mã QR bằng camera điện thoại để vào làm bài khảo sát 15 câu
        </p>

        {/* QR Code Graphic Frame */}
        <div style={{
          background: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: '20px',
          display: 'inline-block',
          border: '3px solid #0088FF',
          boxShadow: '0 10px 30px rgba(0, 102, 255, 0.25)',
          marginBottom: '1.25rem'
        }}>
          <QRCodeSVG
            value={studentUrl}
            size={210}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/vhu-logo.svg",
              x: undefined,
              y: undefined,
              height: 42,
              width: 42,
              excavate: true,
            }}
          />
        </div>

        {/* Dynamic Domain Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F0F7FF',
          padding: '0.45rem 0.85rem',
          borderRadius: '10px',
          border: '1px solid #BAE6FD',
          marginBottom: '0.75rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#0055D4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Globe size={15} color="#0066FF" />
            <span>Tên miền: {customDomain ? 'Tùy chỉnh' : 'Tự động đồng bộ URL máy chủ'}</span>
          </div>
          <button
            onClick={() => setIsEditingDomain(!isEditingDomain)}
            style={{ border: 'none', background: 'transparent', color: '#0066FF', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Edit3 size={13} /> {isEditingDomain ? 'Đóng' : 'Đổi tên miền'}
          </button>
        </div>

        {/* Custom Domain Input (Optional) */}
        {isEditingDomain && (
          <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="VD: nhom3-marketing.vercel.app hoặc 192.168.1.10:5173"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1.5px solid #0066FF',
                fontSize: '0.85rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
            {customDomain && (
              <button
                onClick={() => setCustomDomain('')}
                style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
                title="Khôi phục URL gốc"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        )}

        {/* URL Box & Copy Button */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#FFFFFF', padding: '0.55rem 0.75rem', borderRadius: '12px', border: '1.5px solid rgba(0, 102, 255, 0.3)' }}>
          <input
            type="text"
            readOnly
            value={studentUrl}
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 700, color: '#002B80', outline: 'none' }}
          />
          <button
            onClick={handleCopyLink}
            className="control-btn control-btn-primary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
          </button>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a
            href={studentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 800, color: '#0066FF' }}
          >
            <ExternalLink size={16} /> Mở thử Khảo Sát Sinh Viên trong tab mới
          </a>
        </div>
      </div>
    </div>
  );
}
