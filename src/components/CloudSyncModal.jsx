import React, { useState, useEffect } from 'react';
import { getCloudSyncUrl, setCloudSyncUrl, fetchCloudResponses } from '../utils/storage';
import { X, Cloud, Check, AlertCircle, RefreshCw, ExternalLink, Flame, Sparkles, HelpCircle } from 'lucide-react';

export default function CloudSyncModal({ onClose, isDark }) {
  const [url, setUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'guide'

  useEffect(() => {
    setUrl(getCloudSyncUrl());
  }, []);

  const handleSave = () => {
    setCloudSyncUrl(url);
    setTestResult({ success: true, message: 'Đã lưu cấu hình Cloud Sync thành công!' });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleTestConnection = async () => {
    if (!url.trim()) {
      setTestResult({ success: false, message: 'Vui lòng nhập URL Endpoint trước khi kiểm tra!' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      setCloudSyncUrl(url);
      const data = await fetchCloudResponses();
      setIsTesting(false);
      setTestResult({
        success: true,
        message: `Kết nối thành công! Đã đồng bộ ${data.length} lượt khảo sát từ Cloud.`
      });
    } catch (err) {
      setIsTesting(false);
      setTestResult({
        success: false,
        message: `Không thể kết nối: ${err.message || 'Lỗi mạng hoặc sai URL'}`
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 18, 41, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="vhu-card slide-animated" style={{
        maxWidth: '640px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 25px 65px rgba(0,0,0,0.3)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#E0F2FE', padding: '0.65rem', borderRadius: '14px', color: '#0066FF' }}>
            <Cloud size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#002B80', margin: 0 }}>
              CẤU HÌNH REAL-TIME CLOUD SYNC
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0.15rem 0 0 0' }}>
              Đồng bộ dữ liệu đa thiết bị (Điện thoại quét QR $\leftrightarrow$ Laptop trình chiếu)
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'settings' ? '#0066FF' : '#F1F5F9',
              color: activeTab === 'settings' ? '#FFFFFF' : '#475569'
            }}
          >
            Cài đặt Endpoint
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'guide' ? '#0066FF' : '#F1F5F9',
              color: activeTab === 'guide' ? '#FFFFFF' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <HelpCircle size={15} /> Hướng dẫn tạo Cloud (1 phút)
          </button>
        </div>

        {activeTab === 'settings' ? (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 800, color: '#002B80', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                Firebase Realtime Database URL hoặc Google Apps Script Webhook:
              </label>
              <input
                type="text"
                placeholder="VD: https://my-vhu-survey-default-rtdb.firebaseio.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(0, 102, 255, 0.3)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.4rem' }}>
                * Hỗ trợ Firebase Realtime Database hoặc Google Apps Script Web App.
              </p>
            </div>

            {testResult && (
              <div style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                background: testResult.success ? '#F0FDF4' : '#FEF2F2',
                color: testResult.success ? '#15803D' : '#B91C1C',
                border: `1.5px solid ${testResult.success ? '#86EFAC' : '#FCA5A5'}`
              }}>
                {testResult.success ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{testResult.message}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="control-btn"
                style={{ background: '#F0F7FF', color: '#0066FF', borderColor: '#BAE6FD', padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
              >
                <RefreshCw size={16} className={isTesting ? 'animate-spin' : ''} /> {isTesting ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="control-btn control-btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.92rem' }}
              >
                <Check size={16} /> Lưu & Bật Đồng Bộ
              </button>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
            <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, color: '#B45309', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Flame size={18} /> Cách 1: Dùng Firebase Realtime Database (Khuyên dùng - 100% Miễn phí):
              </div>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Vào <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: '#0066FF', fontWeight: 800 }}>console.firebase.google.com</a> $\rightarrow$ Tạo project mới.</li>
                <li>Vào mục <strong>Realtime Database</strong> $\rightarrow$ Tạo Database $\rightarrow$ Chọn chế độ <strong>Test mode</strong> (hoặc rules: <code>{`{".read": true, ".write": true}`}</code>).</li>
                <li>Sao chép đường link URL Database (dạng <code>https://xxx-default-rtdb.firebaseio.com</code>) dán vào ô trên và bấm <strong>Lưu</strong>.</li>
              </ol>
            </div>

            <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontWeight: 800, color: '#15803D', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Sparkles size={18} /> Mẹo Thuyết Trình Không Cần Cài Đặt Cloud:
              </div>
              <p style={{ margin: 0 }}>
                Bạn chỉ cần bấm nút <strong>"+12 Bài Mẫu Thuyết Trình"</strong> ở tab Báo Cáo Thực Tế trên máy tính. Toàn bộ 12 khảo sát thực tế sẽ hiển thị ngay lập tức với đầy đủ biểu đồ radar, thị phần và phân tích chéo!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
