import React, { useState } from 'react';
import { SURVEY_QUESTIONS } from '../data/surveyData';
import { saveStudentResponse } from '../utils/storage';
import confetti from 'canvas-confetti';
import { CheckCircle, HelpCircle, Send, RotateCcw, ChevronLeft, ChevronRight, Award, User, IdCard, BarChart2 } from 'lucide-react';

export default function InteractiveSurvey({ isDark, onNavigateToAnalytics }) {
  const [studentName, setStudentName] = useState('Sinh viên VHU');
  const [mssv, setMssv] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = SURVEY_QUESTIONS[currentStep];

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

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const studentMssv = mssv.trim() || ('251A' + Math.floor(100000 + Math.random() * 900000));
    const name = studentName.trim() || 'Sinh viên VHU';
    
    // Save to real-time storage so it updates the Live Analytics Dashboard!
    saveStudentResponse(name, studentMssv, answers);
    setIsSubmitted(true);
    
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const resetSurvey = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  const completedCount = Object.keys(answers).length;
  const progressPercent = Math.round((completedCount / SURVEY_QUESTIONS.length) * 100);

  const cardBg = isDark ? 'rgba(15, 32, 60, 0.95)' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';

  return (
    <div style={{ width: '100%', maxWidth: '980px', margin: '0 auto', padding: '1.75rem 1.25rem' }}>
      {/* Header Banner */}
      <div className="vhu-card vhu-card-gold" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1.75rem' }}>
        <img src="/vhu-logo.svg" alt="VHU" style={{ width: '60px', height: '60px', marginBottom: '0.6rem' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: isDark ? '#FFFFFF' : '#002962' }}>
          BẢNG CÂU HỎI NGHIÊN CỨU THỰC TẾ (15 CÂU)
        </h2>
        <p style={{ fontSize: '0.95rem', color: isDark ? '#FFB703' : '#E85D04', fontWeight: 700, marginTop: '0.2rem' }}>
          Trường Đại Học Văn Hiến • Khoa Marketing • Đề tài: Thương hiệu Cà phê Sinh viên
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem', color: textColor }}>
          <span>Tiến trình hoàn thành: {completedCount} / 15 câu</span>
          <span style={{ color: '#F48C06' }}>{progressPercent}%</span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #F48C06, #FFB703)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {!isSubmitted ? (
        <div className="vhu-card slide-animated" style={{ background: cardBg, padding: '2rem' }}>
          {/* Question Part Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span className="slide-badge-pill">{currentQ.part}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#F48C06' }}>Câu {currentStep + 1} / 15</span>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: isDark ? '#FFFFFF' : '#002962', marginBottom: '0.4rem', lineHeight: 1.35 }}>
            {currentQ.question}
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', fontStyle: 'italic', fontWeight: 600, marginBottom: '1.35rem' }}>
            *{currentQ.instruction}
          </p>

          {/* Options Renderer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {/* Single Choice */}
            {currentQ.type === 'single' && currentQ.options.map((opt, i) => {
              const selected = answers[currentQ.id] === opt;
              return (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    background: selected ? (isDark ? 'rgba(244, 140, 6, 0.25)' : 'rgba(0, 41, 98, 0.1)') : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                    border: selected ? '2.5px solid #F48C06' : '1.5px solid rgba(226, 232, 240, 0.6)',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: selected ? 800 : 600,
                    color: selected ? (isDark ? '#FFB703' : '#002962') : textColor
                  }}
                >
                  <input
                    type="radio"
                    name={`q_${currentQ.id}`}
                    value={opt}
                    checked={selected}
                    onChange={() => handleOptionChange(currentQ.id, opt, false)}
                    style={{ accentColor: '#F48C06', width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}

            {/* Multiple Choice */}
            {currentQ.type === 'multiple' && currentQ.options.map((opt, i) => {
              const selectedList = answers[currentQ.id] || [];
              const selected = selectedList.includes(opt);
              return (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    background: selected ? (isDark ? 'rgba(244, 140, 6, 0.25)' : 'rgba(0, 41, 98, 0.1)') : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                    border: selected ? '2.5px solid #F48C06' : '1.5px solid rgba(226, 232, 240, 0.6)',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: selected ? 800 : 600,
                    color: selected ? (isDark ? '#FFB703' : '#002962') : textColor
                  }}
                >
                  <input
                    type="checkbox"
                    value={opt}
                    checked={selected}
                    onChange={() => handleOptionChange(currentQ.id, opt, true)}
                    style={{ accentColor: '#F48C06', width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}

            {/* Likert Scale */}
            {currentQ.type === 'scale' && currentQ.options.map((opt, i) => {
              const selected = answers[currentQ.id] === opt;
              return (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    background: selected ? (isDark ? 'rgba(244, 140, 6, 0.25)' : 'rgba(0, 41, 98, 0.1)') : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                    border: selected ? '2.5px solid #F48C06' : '1.5px solid rgba(226, 232, 240, 0.6)',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: selected ? 800 : 600,
                    color: selected ? (isDark ? '#FFB703' : '#002962') : textColor
                  }}
                >
                  <input
                    type="radio"
                    name={`q_${currentQ.id}`}
                    value={opt}
                    checked={selected}
                    onChange={() => handleOptionChange(currentQ.id, opt, false)}
                    style={{ accentColor: '#F48C06', width: '22px', height: '22px', cursor: 'pointer' }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}

            {/* Matrix Likert */}
            {currentQ.type === 'matrix' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(5, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#F48C06' }}>
                  <div style={{ textAlign: 'left' }}>Yếu tố</div>
                  <div>1 (Rất thấp)</div>
                  <div>2</div>
                  <div>3 (TB)</div>
                  <div>4</div>
                  <div>5 (Rất cao)</div>
                </div>

                {currentQ.matrixItems.map((item, idx) => {
                  const currentMatrixVal = (answers[currentQ.id] || {})[item];
                  return (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(5, 1fr)', gap: '0.5rem', alignItems: 'center', background: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.98rem' }}>
                      <div style={{ fontWeight: 700, color: textColor }}>{item}</div>
                      {[1, 2, 3, 4, 5].map(val => (
                        <div key={val} style={{ textAlign: 'center' }}>
                          <input
                            type="radio"
                            name={`matrix_${currentQ.id}_${idx}`}
                            checked={currentMatrixVal === val}
                            onChange={() => handleMatrixChange(currentQ.id, item, val)}
                            style={{ accentColor: '#F48C06', width: '20px', height: '20px', cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Open Question */}
            {currentQ.type === 'open' && (
              <textarea
                rows={4}
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleOptionChange(currentQ.id, e.target.value, false)}
                placeholder={currentQ.placeholder}
                style={{
                  width: '100%',
                  padding: '1.15rem',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  border: '2px solid rgba(244, 140, 6, 0.5)',
                  fontSize: '1.05rem',
                  fontFamily: 'inherit',
                  lineHeight: 1.5
                }}
              />
            )}
          </div>

          {/* Survey Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid rgba(226, 232, 240, 0.2)', paddingTop: '1.25rem' }}>
            <button
              className="control-btn"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={20} /> Câu trước
            </button>

            {currentStep < SURVEY_QUESTIONS.length - 1 ? (
              <button
                className="control-btn control-btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Câu tiếp theo <ChevronRight size={20} />
              </button>
            ) : (
              <button
                className="control-btn control-btn-primary"
                onClick={handleSubmit}
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)', fontSize: '1.05rem' }}
              >
                <Send size={20} /> Nộp Bảng Khảo Sát Demo
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="vhu-card vhu-card-gold slide-animated" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '80px', height: '80px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <Award size={48} color="#FFF" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: isDark ? '#FFFFFF' : '#002962', marginBottom: '0.6rem' }}>
            CẢM ƠN BẠN ĐÃ HOÀN THÀNH KHẢO SÁT!
          </h3>
          <p style={{ fontSize: '1.05rem', color: isDark ? '#CBD5E1' : '#475569', maxWidth: '650px', margin: '0 auto 1.75rem auto', lineHeight: 1.5 }}>
            Dữ liệu khảo sát thử nghiệm của bạn đã được ghi nhận thành công cho bài nghiên cứu sinh viên Trường Đại học Văn Hiến.
          </p>

          <button
            className="control-btn control-btn-primary"
            onClick={resetSurvey}
            style={{ margin: '0 auto', fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
          >
            <RotateCcw size={20} /> Làm Lại Khảo Sát Demo
          </button>
        </div>
      )}
    </div>
  );
}
