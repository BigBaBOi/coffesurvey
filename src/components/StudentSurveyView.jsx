import React, { useState } from 'react';
import { SURVEY_QUESTIONS } from '../data/surveyData';
import { saveStudentResponse } from '../utils/storage';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, ChevronLeft, ChevronRight, User, IdCard, Award, Sparkles, Coffee } from 'lucide-react';

export default function StudentSurveyView() {
  const [studentName, setStudentName] = useState('');
  const [mssv, setMssv] = useState('');
  const [hasInfo, setHasInfo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = SURVEY_QUESTIONS[currentStep];

  const handleStartSurvey = (e) => {
    e.preventDefault();
    if (studentName.trim() && mssv.trim()) {
      setHasInfo(true);
    }
  };

  const handleOptionChange = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      const currentList = answers[questionId] || [];
      if (currentList.includes(value)) {
        setAnswers({
          ...answers,
          [questionId]: currentList.filter(item => item !== value)
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentList, value]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: value
      });
    }
  };

  const handleMatrixChange = (questionId, item, value) => {
    const currentMatrix = answers[questionId] || {};
    setAnswers({
      ...answers,
      [questionId]: {
        ...currentMatrix,
        [item]: value
      }
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save to real-time storage & cloud broadcast
      await saveStudentResponse(studentName, mssv, answers);
    } catch (err) {
      console.warn("Submit notice:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const completedCount = Object.keys(answers).length;
  const progressPercent = Math.round((completedCount / SURVEY_QUESTIONS.length) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 0%, #0077FF 0%, #0044CC 60%, #002B80 100%)',
      padding: '1.25rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        {/* Mobile Header Banner */}
        <div className="vhu-card vhu-card-gold" style={{ marginBottom: '1.25rem', textAlign: 'center', padding: '1.5rem 1rem' }}>
          <img src="/vhu-logo.svg" alt="VHU Logo" style={{ width: '65px', height: '65px', marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#002B80' }}>
            KHẢO SÁT THƯƠNG HIỆU CÀ PHÊ SINH VIÊN VHU
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#FF8800', fontWeight: 800, marginTop: '0.2rem' }}>
            Môn: Marketing Căn Bản • GVHD: ThS. Phạm Phương Mai • Nhóm 3
          </p>
        </div>

        {/* Step 0: Input Student Name & MSSV */}
        {!hasInfo && !isSubmitted && (
          <form onSubmit={handleStartSurvey} className="vhu-card slide-animated" style={{ background: '#FFFFFF', padding: '2rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ background: '#F0F7FF', color: '#0066FF', padding: '0.5rem 1.1rem', borderRadius: '999px', fontWeight: 900, fontSize: '0.95rem' }}>
                BƯỚC 1: XÁC NHẬN THÔNG TIN SINH VIÊN
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#002B80', marginBottom: '0.5rem' }}>
                <User size={20} color="#0066FF" /> Họ và tên sinh viên:
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '2px solid rgba(0,102,255,0.3)', fontSize: '1.05rem', fontWeight: 600, outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#002B80', marginBottom: '0.5rem' }}>
                <IdCard size={20} color="#0066FF" /> Mã số sinh viên (MSSV):
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 251A301120"
                value={mssv}
                onChange={(e) => setMssv(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '2px solid rgba(0,102,255,0.3)', fontSize: '1.05rem', fontWeight: 600, outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="control-btn control-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1.1rem' }}
            >
              Bắt đầu làm Khảo sát <ChevronRight size={22} />
            </button>
          </form>
        )}

        {/* Step 1: 15-Question Survey */}
        {hasInfo && !isSubmitted && (
          <div className="vhu-card slide-animated" style={{ background: '#FFFFFF', padding: '1.75rem 1.25rem' }}>
            {/* Progress */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.4rem', color: '#002B80' }}>
                <span>Sinh viên: {studentName} ({mssv})</span>
                <span style={{ color: '#FF8800' }}>{currentStep + 1} / 15</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E0F0FF', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #FFC700, #FF8800)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            <span className="slide-badge-pill" style={{ marginBottom: '0.75rem', background: '#0088FF', color: '#FFFFFF', fontSize: '0.88rem' }}>
              {currentQ.part}
            </span>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80', margin: '0.5rem 0 0.35rem 0', lineHeight: 1.35 }}>
              {currentQ.question}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', fontStyle: 'italic', fontWeight: 600, marginBottom: '1.25rem' }}>
              *{currentQ.instruction}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {currentQ.type === 'single' && currentQ.options.map((opt, i) => {
                const selected = answers[currentQ.id] === opt;
                return (
                  <label key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '10px',
                    background: selected ? 'rgba(0,102,255,0.1)' : '#F0F7FF', border: selected ? '2.5px solid #0066FF' : '1.5px solid rgba(0,102,255,0.2)',
                    cursor: 'pointer', fontSize: '1.02rem', fontWeight: selected ? 800 : 600, color: selected ? '#002B80' : '#0F172A'
                  }}>
                    <input type="radio" name={`q_${currentQ.id}`} checked={selected} onChange={() => handleOptionChange(currentQ.id, opt, false)} style={{ accentColor: '#0066FF', width: '20px', height: '20px' }} />
                    <span>{opt}</span>
                  </label>
                );
              })}

              {currentQ.type === 'multiple' && currentQ.options.map((opt, i) => {
                const selectedList = answers[currentQ.id] || [];
                const selected = selectedList.includes(opt);
                return (
                  <label key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '10px',
                    background: selected ? 'rgba(0,102,255,0.1)' : '#F0F7FF', border: selected ? '2.5px solid #0066FF' : '1.5px solid rgba(0,102,255,0.2)',
                    cursor: 'pointer', fontSize: '1.02rem', fontWeight: selected ? 800 : 600, color: selected ? '#002B80' : '#0F172A'
                  }}>
                    <input type="checkbox" checked={selected} onChange={() => handleOptionChange(currentQ.id, opt, true)} style={{ accentColor: '#0066FF', width: '20px', height: '20px' }} />
                    <span>{opt}</span>
                  </label>
                );
              })}

              {currentQ.type === 'scale' && currentQ.options.map((opt, i) => {
                const selected = answers[currentQ.id] === opt;
                return (
                  <label key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', borderRadius: '10px',
                    background: selected ? 'rgba(0,102,255,0.1)' : '#F0F7FF', border: selected ? '2.5px solid #0066FF' : '1.5px solid rgba(0,102,255,0.2)',
                    cursor: 'pointer', fontSize: '1.02rem', fontWeight: selected ? 800 : 600, color: selected ? '#002B80' : '#0F172A'
                  }}>
                    <input type="radio" name={`q_${currentQ.id}`} checked={selected} onChange={() => handleOptionChange(currentQ.id, opt, false)} style={{ accentColor: '#0066FF', width: '20px', height: '20px' }} />
                    <span>{opt}</span>
                  </label>
                );
              })}

              {currentQ.type === 'matrix' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(5, 1fr)', gap: '0.35rem', textAlign: 'center', fontWeight: 800, fontSize: '0.85rem', color: '#FF8800' }}>
                    <div style={{ textAlign: 'left' }}>Yếu tố</div>
                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
                  </div>
                  {currentQ.matrixItems.map((item, idx) => {
                    const matrixVal = (answers[currentQ.id] || {})[item];
                    return (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(5, 1fr)', gap: '0.35rem', alignItems: 'center', background: '#F0F7FF', padding: '0.55rem 0.65rem', borderRadius: '8px', fontSize: '0.92rem' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{item}</div>
                        {[1, 2, 3, 4, 5].map(val => (
                          <div key={val} style={{ textAlign: 'center' }}>
                            <input type="radio" name={`matrix_${currentQ.id}_${idx}`} checked={matrixVal === val} onChange={() => handleMatrixChange(currentQ.id, item, val)} style={{ accentColor: '#0066FF', width: '18px', height: '18px' }} />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.type === 'open' && (
                <textarea
                  rows={4}
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleOptionChange(currentQ.id, e.target.value, false)}
                  placeholder={currentQ.placeholder}
                  style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '2px solid rgba(0,102,255,0.3)', fontSize: '1.0rem', outline: 'none' }}
                />
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="control-btn"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft size={18} /> Câu trước
              </button>

              {currentStep < SURVEY_QUESTIONS.length - 1 ? (
                <button
                  className="control-btn control-btn-primary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Câu tiếp <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  className="control-btn control-btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <Send size={18} /> {isSubmitting ? 'Đang gửi lên hệ thống...' : 'Nộp Bài Khảo Sát'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Submission Success Confirmation */}
        {isSubmitted && (
          <div className="vhu-card vhu-card-gold slide-animated" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <div style={{ width: '80px', height: '80px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <Award size={48} color="#FFF" />
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#002B80', marginBottom: '0.5rem' }}>
              CẢM ƠN BẠN ĐÃ HOÀN THÀNH KHẢO SÁT!
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#334155', fontWeight: 700, marginBottom: '0.5rem' }}>
              Sinh viên: <strong style={{ color: '#0066FF' }}>{studentName}</strong> (MSSV: {mssv})
            </p>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Câu trả lời của bạn đã được ghi nhận và cập nhật thời gian thực vào bảng thống kê thuyết trình Nhóm 3.
            </p>

            <div style={{ background: '#FFFFFF', padding: '0.85rem 1.25rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#002B80', fontWeight: 800 }}>
              <Sparkles size={20} color="#FFC700" /> Kết quả đang được tổng hợp trực tiếp trên màn hình báo cáo!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
