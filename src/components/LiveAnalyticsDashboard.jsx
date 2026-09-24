import React, { useState, useEffect, useMemo } from 'react';
import {
  getSavedResponses,
  fetchCloudResponses,
  calculateAggregatedStats,
  subscribeRealtimeUpdates,
  clearAllResponses,
  generateSampleResponses,
  saveStudentResponse,
  getCloudSyncUrl
} from '../utils/storage';
import { exportSurveyPDFBackup } from '../utils/pdfExport';
import CloudSyncModal from './CloudSyncModal';
import {
  BarChart3,
  Users,
  QrCode,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  Star,
  Trash2,
  Download,
  AlertTriangle,
  FileText,
  X,
  Compass,
  Layers,
  PieChart as PieIcon,
  Activity,
  HeartHandshake,
  Coffee,
  PlusCircle,
  RefreshCw,
  Globe2,
  Settings
} from 'lucide-react';

export default function LiveAnalyticsDashboard({ onOpenQR }) {
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('overview'); // 'overview' | 'radar' | 'heatmap' | 'loyalty' | 'table'

  const loadData = () => {
    const data = getSavedResponses();
    setResponses(data);
    setStats(calculateAggregatedStats(data));
  };

  const syncCloud = async (showSpinner = false) => {
    if (showSpinner) setIsSyncingCloud(true);
    try {
      const cloudData = await fetchCloudResponses();
      if (Array.isArray(cloudData)) {
        if (cloudData.length > responses.length && responses.length > 0) {
          setPulse(true);
          setTimeout(() => setPulse(false), 2500);
        }
        setResponses(cloudData);
        setStats(calculateAggregatedStats(cloudData));
      }
    } catch (e) {
      console.warn("Cloud sync error:", e);
    } finally {
      if (showSpinner) setIsSyncingCloud(false);
    }
  };

  useEffect(() => {
    // 1. Initial local load
    loadData();

    // 2. Fetch latest from Cloud immediately on mount
    syncCloud();

    // 3. Subscribe to cross-tab / real-time updates
    const unsubscribe = subscribeRealtimeUpdates(() => {
      loadData();
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    });

    // 4. Poll Cloud Database every 3.5 seconds so presenter's laptop auto-updates live from mobile scans!
    const pollTimer = setInterval(() => {
      syncCloud(false);
    }, 3500);

    return () => {
      unsubscribe();
      clearInterval(pollTimer);
    };
  }, []);

  const handleSimulateBatch = async () => {
    setIsSyncingCloud(true);
    await generateSampleResponses(12);
    loadData();
    setIsSyncingCloud(false);
    setPulse(true);
    setTimeout(() => setPulse(false), 2000);
  };

  const handleExportPDFOnly = async () => {
    setIsExportingPDF(true);
    await exportSurveyPDFBackup(responses, stats);
    setIsExportingPDF(false);
  };

  const handleExportPDFAndClear = async () => {
    setIsExportingPDF(true);
    await exportSurveyPDFBackup(responses, stats);
    setIsExportingPDF(false);
    await clearAllResponses();
    loadData();
    setShowClearModal(false);
  };

  const handleClearDirectly = async () => {
    await clearAllResponses();
    loadData();
    setShowClearModal(false);
  };

  // Color palette for charts
  const brandColors = {
    'Highlands Coffee': '#DC2626',
    'Phúc Long': '#059669',
    'The Coffee House': '#D97706',
    'Katinat': '#0284C7',
    'Starbucks': '#047857',
    'Cà phê vỉa hè / Khác': '#7C3AED',
    'Cà phê vỉa hè': '#7C3AED'
  };

  // Radar Chart calculation (9 axes)
  const radarData = useMemo(() => {
    if (!stats || !stats.likertAverages) return null;
    const factors = Object.keys(stats.likertAverages);
    const count = factors.length;
    if (count === 0) return null;

    const size = 320;
    const center = size / 2;
    const maxRadius = center - 50;

    const points = factors.map((factor, i) => {
      const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
      const score = parseFloat(stats.likertAverages[factor]) || 0;
      const normalizedScore = Math.min(Math.max(score / 5, 0), 1);
      const r = normalizedScore * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      // Outer axis coordinate for labels
      const labelR = maxRadius + 28;
      const lx = center + labelR * Math.cos(angle);
      const ly = center + labelR * Math.sin(angle);

      return { factor, score, x, y, lx, ly, angle };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return { size, center, maxRadius, points, polygonPoints };
  }, [stats]);

  if (!stats) return null;

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top Banner & Control Bar */}
      <div className="vhu-card vhu-card-gold" style={{
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.4rem 1.8rem',
        border: '2px solid #FFC700',
        background: 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E6 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#002B80', letterSpacing: '-0.01em' }}>
              TỔNG HỢP & PHÂN TÍCH MARKETING REAL-TIME
            </h2>
            <button
              onClick={() => setShowCloudModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: getCloudSyncUrl() ? '#E0F2FE' : '#FEF3C7',
                color: getCloudSyncUrl() ? '#0284C7' : '#B45309',
                fontSize: '0.8rem',
                fontWeight: 800,
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                border: `1px solid ${getCloudSyncUrl() ? '#BAE6FD' : '#FDE68A'}`,
                cursor: 'pointer'
              }}
              title="Bấm để cấu hình kết nối Cloud Database"
            >
              <Globe2 size={13} /> {getCloudSyncUrl() ? '🟢 Cloud Real-Time Đang Bật' : '⚙️ Cấu Hình Realtime Cloud'}
            </button>
            {pulse && (
              <span style={{ background: '#10B981', color: '#FFF', fontSize: '0.82rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '999px', animation: 'pulseGlow 1s infinite' }}>
                ⚡ Vừa có lượt nộp mới!
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.92rem', color: '#0055D4', fontWeight: 700, marginTop: '0.25rem' }}>
            Hệ thống tự động đồng bộ thời gian thực từ mã QR Khảo sát Sinh viên VHU
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="control-btn"
            onClick={() => syncCloud(true)}
            disabled={isSyncingCloud}
            style={{ background: '#FFFFFF', color: '#0066FF', borderColor: '#0066FF', fontSize: '0.88rem', padding: '0.5rem 0.85rem' }}
            title="Đồng bộ ngay dữ liệu mới nhất từ Cloud"
          >
            <RefreshCw size={16} className={isSyncingCloud ? 'animate-spin' : ''} style={{ animation: isSyncingCloud ? 'spin 1s linear infinite' : 'none' }} /> {isSyncingCloud ? 'Đang đồng bộ...' : 'Làm mới Cloud'}
          </button>

          <button className="control-btn control-btn-primary" onClick={onOpenQR} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            <QrCode size={18} /> Mở Mã QR Live
          </button>

          <button
            className="control-btn"
            onClick={handleSimulateBatch}
            style={{ background: '#0284C7', color: '#FFF', borderColor: '#0284C7', fontSize: '0.88rem', padding: '0.5rem 0.95rem' }}
            title="Tự động tạo 12 bài khảo sát mẫu thực tế để thuyết trình"
          >
            <Sparkles size={16} /> +12 Bài Mẫu Thuyết Trình
          </button>
          
          <button
            className="control-btn"
            onClick={handleExportPDFOnly}
            disabled={isExportingPDF || responses.length === 0}
            style={{ background: '#059669', color: '#FFF', borderColor: '#059669', fontSize: '0.88rem', padding: '0.5rem 0.95rem' }}
            title="Tải xuống bản PDF Backup dữ liệu khảo sát"
          >
            <Download size={16} /> {isExportingPDF ? 'Đang tạo...' : 'Xuất PDF Backup'}
          </button>

          <button
            className="control-btn"
            onClick={() => setShowClearModal(true)}
            style={{ background: 'rgba(208, 0, 0, 0.08)', color: '#D00000', borderColor: '#FCA5A5', fontSize: '0.88rem', padding: '0.5rem 0.85rem' }}
            title="Xóa dữ liệu khảo sát"
          >
            <Trash2 size={16} /> Xóa Dữ Liệu
          </button>
        </div>
      </div>

      {/* Top 4 KPI Highlight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.15rem', marginBottom: '1.5rem' }}>
        <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #0066FF' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: '#F0F7FF', color: '#0066FF' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '2.0rem', fontWeight: 900, color: '#002B80', lineHeight: 1.1 }}>{stats.totalCount}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginTop: '0.2rem' }}>Tổng Lượt Sinh Viên Tham Gia</div>
          </div>
        </div>

        <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #FF8800' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: '#FFF9E8', color: '#FF8800' }}>
            <Award size={28} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FF8800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {Object.keys(stats.brandCounts).length > 0
                ? Object.keys(stats.brandCounts).sort((a,b) => stats.brandCounts[b] - stats.brandCounts[a])[0]
                : 'Chưa có'}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginTop: '0.2rem' }}>Thương Hiệu Được Yêu Thích Nhất</div>
          </div>
        </div>

        <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #10B981' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: '#F0FDF4', color: '#10B981' }}>
            <DollarSign size={28} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {Object.keys(stats.spendingCounts).length > 0
                ? Object.keys(stats.spendingCounts).sort((a,b) => stats.spendingCounts[b] - stats.spendingCounts[a])[0]
                : 'Chưa có'}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginTop: '0.2rem' }}>Mức Chi Tiêu Phổ Biến / Lần</div>
          </div>
        </div>

        <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #8B5CF6' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: '#F5F3FF', color: '#8B5CF6' }}>
            <Star size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#8B5CF6', lineHeight: 1.1 }}>
              {stats.likertAverages['Giá cả'] || '0.0'} <span style={{ fontSize: '0.95rem', color: '#94A3B8' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginTop: '0.2rem' }}>Độ Nhạy Yếu Tố Giá Cả</div>
          </div>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="vhu-card" style={{ background: '#FFFFFF', padding: '3.5rem 2rem', textAlign: 'center', marginBottom: '1.5rem', borderRadius: '20px' }}>
          <div style={{ width: '75px', height: '75px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <FileText size={38} color="#0066FF" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#002B80', marginBottom: '0.5rem' }}>
            HỆ THỐNG ĐANG SẴN SÀNG NHẬN BÀI KHẢO SÁT
          </h3>
          <p style={{ fontSize: '1.02rem', color: '#64748B', maxWidth: '620px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
            Bạn có thể bấm <strong>"Mở Mã QR Live"</strong> để sinh viên trong lớp quét mã nộp bài, hoặc bấm nút <strong>"+12 Bài Mẫu Thuyết Trình"</strong> để nạp ngay dữ liệu sinh động phục vụ phần báo cáo trước thầy cô!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="control-btn control-btn-primary" onClick={onOpenQR} style={{ fontSize: '0.95rem', padding: '0.65rem 1.4rem' }}>
              <QrCode size={18} /> Hiện Mã QR Sinh Viên Quét
            </button>
            <button className="control-btn" onClick={handleSimulateBatch} style={{ background: '#0284C7', color: '#FFF', fontSize: '0.95rem', padding: '0.65rem 1.4rem' }}>
              <Sparkles size={18} /> Tạo 12 Bài Mẫu Thuyết Trình
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation Tabs for Deep-Dive Analysis */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            overflowX: 'auto',
            paddingBottom: '0.35rem'
          }}>
            <button
              onClick={() => setActiveViewTab('overview')}
              className={`control-btn ${activeViewTab === 'overview' ? 'control-btn-primary' : ''}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <BarChart3 size={16} /> 1. Thị Phần & Tần Suất
            </button>
            <button
              onClick={() => setActiveViewTab('radar')}
              className={`control-btn ${activeViewTab === 'radar' ? 'control-btn-primary' : ''}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <Compass size={16} /> 2. Mạng Nhện Radar 9 Yếu Tố
            </button>
            <button
              onClick={() => setActiveViewTab('heatmap')}
              className={`control-btn ${activeViewTab === 'heatmap' ? 'control-btn-primary' : ''}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <Layers size={16} /> 3. Ma Trận Phân Tích Chéo (Cross-Tab)
            </button>
            <button
              onClick={() => setActiveViewTab('loyalty')}
              className={`control-btn ${activeViewTab === 'loyalty' ? 'control-btn-primary' : ''}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <HeartHandshake size={16} /> 4. Lòng Trung Thành & Lý Do Chuyển Đổi
            </button>
            <button
              onClick={() => setActiveViewTab('table')}
              className={`control-btn ${activeViewTab === 'table' ? 'control-btn-primary' : ''}`}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <FileText size={16} /> 5. Danh Sách Chi Tiết ({responses.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW & MARKET SHARE */}
          {activeViewTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Brand Share */}
              <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#002B80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={22} color="#0066FF" /> Thị Phần Thương Hiệu Sinh Viên Lựa Chọn (Q5)
                  </h3>
                  <span style={{ fontSize: '0.8rem', background: '#F0F7FF', color: '#0066FF', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 800 }}>
                    N = {stats.totalCount}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {Object.entries(stats.brandCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([brand, count]) => {
                      const percent = Math.round((count / stats.totalCount) * 100);
                      const barColor = brandColors[brand] || '#0088FF';
                      return (
                        <div key={brand}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.35rem', color: '#0F172A' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: barColor }} />
                              {brand}
                            </span>
                            <span style={{ color: barColor }}>{count} SV ({percent}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '14px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${barColor}, #60A5FA)`,
                              borderRadius: '999px',
                              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Spending Breakdown */}
              <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#002B80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={22} color="#10B981" /> Phân Khúc Mức Chi Tiêu / Lần Mua (Q3)
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {Object.entries(stats.spendingCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([spend, count]) => {
                      const percent = Math.round((count / stats.totalCount) * 100);
                      return (
                        <div key={spend}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.35rem', color: '#0F172A' }}>
                            <span>💰 {spend}</span>
                            <span style={{ color: '#059669' }}>{count} lượt ({percent}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '14px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #10B981, #34D399)',
                              borderRadius: '999px',
                              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RADAR SPIDER CHART FOR 9 LIKERT FACTORS */}
          {activeViewTab === 'radar' && (
            <div className="vhu-card" style={{ background: '#FFFFFF', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#002B80', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Compass size={24} color="#FF8800" /> BIỂU ĐỒ MẠNG NHỆN RADAR: 9 YẾU TỐ TÁC ĐỘNG ĐẾN LỰA CHỌN (Q8)
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '0.25rem' }}>
                  Thang đo Likert từ 1.0 (Hoàn toàn không quan trọng) đến 5.0 (Rất quan trọng)
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                {/* SVG Radar Graphic */}
                {radarData && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg width={radarData.size} height={radarData.size} style={{ overflow: 'visible' }}>
                      {/* Concentric Polygons (Levels 1 to 5) */}
                      {[1, 2, 3, 4, 5].map(level => {
                        const r = (level / 5) * radarData.maxRadius;
                        const levelPoints = radarData.points.map(p => {
                          const lx = radarData.center + r * Math.cos(p.angle);
                          const ly = radarData.center + r * Math.sin(p.angle);
                          return `${lx},${ly}`;
                        }).join(' ');
                        return (
                          <polygon
                            key={level}
                            points={levelPoints}
                            fill={level === 5 ? 'rgba(0, 102, 255, 0.02)' : 'none'}
                            stroke="#CBD5E1"
                            strokeWidth={level === 5 ? '1.5' : '1'}
                            strokeDasharray={level < 5 ? '3 3' : 'none'}
                          />
                        );
                      })}

                      {/* Axes spokes */}
                      {radarData.points.map((p, idx) => {
                        const ex = radarData.center + radarData.maxRadius * Math.cos(p.angle);
                        const ey = radarData.center + radarData.maxRadius * Math.sin(p.angle);
                        return (
                          <line
                            key={idx}
                            x1={radarData.center}
                            y1={radarData.center}
                            x2={ex}
                            y2={ey}
                            stroke="#E2E8F0"
                            strokeWidth="1.2"
                          />
                        );
                      })}

                      {/* Radar Filled Data Area */}
                      <polygon
                        points={radarData.polygonPoints}
                        fill="rgba(0, 102, 255, 0.25)"
                        stroke="#0066FF"
                        strokeWidth="3"
                      />

                      {/* Data Vertex Dots */}
                      {radarData.points.map((p, idx) => (
                        <circle
                          key={idx}
                          cx={p.x}
                          cy={p.y}
                          r="5"
                          fill="#FF8800"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Axis Labels */}
                      {radarData.points.map((p, idx) => (
                        <text
                          key={idx}
                          x={p.lx}
                          y={p.ly}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="11"
                          fontWeight="800"
                          fill="#002B80"
                        >
                          {p.factor} ({p.score})
                        </text>
                      ))}
                    </svg>
                  </div>
                )}

                {/* Score Breakdown Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#002B80', marginBottom: '0.5rem' }}>
                    Xếp hạng độ ưu tiên của Sinh viên (Điểm trung bình):
                  </h4>
                  {Object.entries(stats.likertAverages)
                    .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                    .map(([factor, score], idx) => {
                      const scoreNum = parseFloat(score);
                      const percent = Math.round((scoreNum / 5.0) * 100);
                      const isTop3 = idx < 3;
                      return (
                        <div key={factor} style={{ background: isTop3 ? '#FFFDF5' : '#F8FAFC', padding: '0.65rem 0.95rem', borderRadius: '10px', border: isTop3 ? '1.5px solid #FFC700' : '1px solid #E2E8F0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                            <span style={{ color: isTop3 ? '#FF8800' : '#002B80' }}>
                              #{idx + 1}. {factor} {isTop3 && '⭐'}
                            </span>
                            <span style={{ color: '#0066FF', fontWeight: 900 }}>{score} / 5.0</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: isTop3 ? 'linear-gradient(90deg, #FFC700, #FF8800)' : 'linear-gradient(90deg, #0088FF, #00D2FF)',
                              borderRadius: '999px'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CROSS-TABULATION MATRIX (HEATMAP) */}
          {activeViewTab === 'heatmap' && (
            <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={22} color="#0055D4" /> MA TRẬN PHÂN TÍCH CHÉO: MỨC CHI TIÊU VS THƯƠNG HIỆU (CROSS-TAB)
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Mối tương quan giữa khả năng chi trả của sinh viên và thương hiệu cà phê lựa chọn
                </p>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.92rem' }}>
                  <thead>
                    <tr style={{ background: '#002B80', color: '#FFFFFF' }}>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Phân Khúc Chi Tiêu (Q3)</th>
                      {['Highlands Coffee', 'Phúc Long', 'The Coffee House', 'Katinat', 'Starbucks', 'Cà phê vỉa hè'].map(b => (
                        <th key={b} style={{ padding: '0.85rem 0.5rem', fontWeight: 800 }}>{b}</th>
                      ))}
                      <th style={{ padding: '0.85rem 0.75rem', background: '#001A4D' }}>Tổng Lượt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Dưới 30.000 đồng', 'Từ 30.000 – dưới 50.000 đồng', 'Từ 50.000 – dưới 70.000 đồng', 'Trên 70.000 đồng'].map((spend, rowIdx) => {
                      const rowData = stats.crossTabSpendingBrand[spend] || {};
                      const rowTotal = Object.values(rowData).reduce((acc, c) => acc + c, 0);
                      return (
                        <tr key={spend} style={{ borderBottom: '1px solid #E2E8F0', background: rowIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 800, color: '#002B80' }}>{spend}</td>
                          {['Highlands Coffee', 'Phúc Long', 'The Coffee House', 'Katinat', 'Starbucks', 'Cà phê vỉa hè'].map(brand => {
                            const val = rowData[brand] || 0;
                            // Heatmap opacity
                            const intensity = rowTotal > 0 ? val / rowTotal : 0;
                            const bg = val > 0 ? `rgba(0, 102, 255, ${0.1 + intensity * 0.7})` : 'transparent';
                            const textCol = intensity > 0.4 ? '#002B80' : '#475569';
                            return (
                              <td key={brand} style={{ padding: '0.85rem 0.5rem', background: bg, color: textCol, fontWeight: val > 0 ? 900 : 500 }}>
                                {val > 0 ? `${val} SV` : '—'}
                              </td>
                            );
                          })}
                          <td style={{ padding: '0.85rem 0.75rem', fontWeight: 900, color: '#FF8800', background: '#FFFDF5' }}>
                            {rowTotal} SV
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LOYALTY & CHURN REASONS */}
          {activeViewTab === 'loyalty' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Switching Reasons (Q11) */}
              <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.6rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#DC2626', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={22} color="#DC2626" /> Lý Do Khiến Sinh Viên Đổi Sang Quán Khác (Q11)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {Object.entries(stats.switchReasons)
                    .sort((a, b) => b[1] - a[1])
                    .map(([reason, count]) => {
                      const percent = Math.round((count / stats.totalCount) * 100);
                      return (
                        <div key={reason}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.3rem', color: '#0F172A' }}>
                            <span>⚠️ {reason}</span>
                            <span style={{ color: '#DC2626' }}>{count} ({percent}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '12px', background: '#FEE2E2', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #EF4444, #F87171)',
                              borderRadius: '999px'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Loyalty Style (Q12) */}
              <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.6rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#002B80', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HeartHandshake size={22} color="#0055D4" /> Mức Độ Gắn Kết & Thói Quen Tiêu Dùng (Q12)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {Object.entries(stats.loyaltyDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .map(([loyalty, count]) => {
                      const percent = Math.round((count / stats.totalCount) * 100);
                      return (
                        <div key={loyalty}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.3rem', color: '#0F172A' }}>
                            <span>☕ {loyalty}</span>
                            <span style={{ color: '#0066FF' }}>{count} ({percent}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '12px', background: '#F0F7FF', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #0088FF, #60A5FA)',
                              borderRadius: '999px'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT DETAILED RESPONSES TABLE */}
          {activeViewTab === 'table' && (
            <div className="vhu-card" style={{ background: '#FFFFFF', padding: '1.6rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#002B80', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={22} color="#0055D4" /> Bảng Dữ Liệu Khảo Sát Thời Gian Thực ({responses.length} sinh viên)
                </h3>
                <button
                  onClick={handleExportPDFOnly}
                  className="control-btn"
                  style={{ background: '#059669', color: '#FFF', fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                >
                  <Download size={15} /> Tải Báo Cáo PDF
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                  <thead>
                    <tr style={{ background: '#F0F7FF', color: '#002B80', fontWeight: 900, borderBottom: '2px solid #0088FF' }}>
                      <th style={{ padding: '0.75rem 0.85rem' }}>STT</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>Họ và Tên Sinh Viên</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>MSSV</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>Thương Hiệu Ưa Thích (Q5)</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>Chi Tiêu (Q3)</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>Tần Suất (Q1)</th>
                      <th style={{ padding: '0.75rem 0.85rem' }}>Thời Gian Nộp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((r, idx) => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF' }}>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 800, color: '#64748B' }}>#{idx + 1}</td>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 800, color: '#0F172A' }}>{r.studentName}</td>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 700, color: '#0066FF' }}>{r.mssv}</td>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 700, color: brandColors[r.answers?.[5]] || '#FF8800' }}>
                          {r.answers ? (r.answers[5] || '—') : '—'}
                        </td>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 600 }}>{r.answers ? (r.answers[3] || '—') : '—'}</td>
                        <td style={{ padding: '0.75rem 0.85rem', fontWeight: 600 }}>{r.answers ? (r.answers[1] || '—') : '—'}</td>
                        <td style={{ padding: '0.75rem 0.85rem', fontSize: '0.82rem', color: '#64748B' }}>
                          {new Date(r.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Clear Data & Backup Confirmation Modal */}
      {showClearModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div className="vhu-card slide-animated" style={{ background: '#FFFFFF', maxWidth: '620px', width: '100%', padding: '2rem', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
            <button
              onClick={() => setShowClearModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: '#D00000', marginBottom: '1rem' }}>
              <div style={{ background: '#FEE2E2', padding: '0.65rem', borderRadius: '50%', display: 'flex' }}>
                <AlertTriangle size={32} color="#D00000" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                XÁC NHẬN XÓA TOÀN BỘ DỮ LIỆU
              </h3>
            </div>

            <p style={{ fontSize: '1.0rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Bạn đang chuẩn bị <strong style={{ color: '#D00000' }}>xóa sạch toàn bộ {responses.length} lượt khảo sát</strong> khỏi hệ thống.
            </p>

            <div style={{ background: '#F0FDF4', border: '1.5px solid #10B981', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.35rem' }}>
                <Download size={18} /> Khuyến nghị an toàn dữ liệu:
              </div>
              <p style={{ fontSize: '0.92rem', color: '#064E3B', margin: 0, lineHeight: 1.45 }}>
                Tải file <strong>PDF Backup</strong> lưu giữ thông tin chi tiết bài khảo sát trước khi tiến hành xóa sạch cơ sở dữ liệu.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                className="control-btn"
                onClick={handleExportPDFAndClear}
                disabled={isExportingPDF}
                style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: '#FFF', fontSize: '1.05rem', padding: '0.85rem 1.25rem', justifyContent: 'center', fontWeight: 800 }}
              >
                <Download size={20} /> {isExportingPDF ? 'Đang xuất PDF & Xóa...' : '1. Tải PDF Backup & Xóa Dữ Liệu'}
              </button>

              <button
                className="control-btn"
                onClick={handleClearDirectly}
                style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5', fontSize: '0.98rem', padding: '0.75rem 1.25rem', justifyContent: 'center', fontWeight: 700 }}
              >
                <Trash2 size={18} /> 2. Xóa Sạch Dữ Liệu Ngay (Đã Backup)
              </button>

              <button
                className="control-btn"
                onClick={() => setShowClearModal(false)}
                style={{ background: 'transparent', color: '#64748B', fontSize: '0.95rem', padding: '0.5rem', justifyContent: 'center' }}
              >
                Hủy thao tác
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cloud Sync Configuration Modal */}
      {showCloudModal && (
        <CloudSyncModal onClose={() => { setShowCloudModal(false); syncCloud(true); }} />
      )}
    </div>
  );
}
