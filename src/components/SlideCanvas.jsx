import React from 'react';
import {
  Coffee,
  Award,
  Sliders,
  Repeat,
  UserCheck,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles,
  BarChart3,
  Target,
  GraduationCap,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Users,
  Lightbulb,
  TrendingUp,
  Star
} from 'lucide-react';

export default function SlideCanvas({ slide, isDark, slideDirection = 'next' }) {
  const { slideNum, title, subtitle, category, content } = slide;

  const animClass = slideDirection === 'next' ? 'anim-slide-next' : 'anim-slide-prev';

  // Render slide content based on content.type
  const renderSlideBody = () => {
    switch (content.type) {
      case 'cover':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0.5rem 0' }}>
            {/* VHU Badge */}
            <div className="stagger-1" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '1rem',
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,43,128,0.06)',
              backdropFilter: 'blur(10px)',
              padding: '0.65rem 1.65rem',
              borderRadius: '999px',
              border: isDark ? '1.5px solid rgba(255,199,0,0.4)' : '1.5px solid rgba(0,43,128,0.15)',
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <img src="/vhu-logo.svg" alt="VHU Logo Official" className="floating-icon" style={{ width: '68px', height: '68px' }} />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '1.18rem', fontWeight: 900, color: isDark ? '#FFC700' : '#002B80', letterSpacing: '0.5px' }}>{content.university}</span>
                <p style={{ fontSize: '0.98rem', color: isDark ? '#CBD5E1' : '#475569', fontStyle: 'italic', fontWeight: 600 }}>"{content.motto}"</p>
              </div>
            </div>

            <h1 className="stagger-2" style={{
              fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
              fontWeight: 900,
              color: isDark ? '#FFFFFF' : '#002B80',
              marginBottom: '0.45rem',
              lineHeight: 1.25
            }}>
              {title}
            </h1>
            <p className="stagger-3" style={{
              fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)',
              fontWeight: 800,
              color: isDark ? '#FFC700' : '#D97706',
              maxWidth: '920px',
              marginBottom: '1.5rem',
              lineHeight: 1.45
            }}>
              ☕ {subtitle}
            </p>

            <div className="stagger-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', width: '100%', maxWidth: '940px', margin: '0 auto', textAlign: 'left' }}>
              <div className="vhu-card vhu-card-gold" style={{ padding: '1.15rem 1.45rem' }}>
                <p style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: '#002B80', fontWeight: 900, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={18} color="#FF8800" /> THÔNG TIN MÔN HỌC
                </p>
                <p style={{ fontWeight: 900, fontSize: '1.2rem', color: '#002B80', margin: '0.2rem 0' }}>{content.subject}</p>
                <p style={{ fontSize: '1.05rem', color: '#334155', fontWeight: 700 }}>👩‍🏫 {content.instructor}</p>
              </div>

              <div className="vhu-card" style={{ padding: '1.15rem 1.45rem', background: '#FFFFFF' }}>
                <p style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: '#0055D4', fontWeight: 900, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={18} color="#0055D4" /> THÔNG TIN NHÓM THUYẾT TRÌNH
                </p>
                <p style={{ fontWeight: 900, fontSize: '1.2rem', color: '#002B80', margin: '0.2rem 0' }}>{content.group}</p>
                <p style={{ fontSize: '1.05rem', color: '#334155', fontWeight: 700 }}>Thành viên: 6 Sinh viên VHU</p>
              </div>
            </div>

            <div className="stagger-5" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {content.members.map((m, idx) => (
                <span key={idx} style={{
                  fontSize: '0.9rem',
                  padding: '0.45rem 1.05rem',
                  borderRadius: '999px',
                  background: isDark ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  fontWeight: 800,
                  color: '#002B80',
                  border: isDark ? '1.5px solid #00D2FF' : '1.5px solid #0055D4'
                }}>
                  👤 {m.name} ({m.role})
                </span>
              ))}
            </div>
          </div>
        );

      case 'problem':
        return (
          <div className="slide-body-container">
            <div className="card-grid-2" style={{ alignItems: 'stretch' }}>
              {/* Context */}
              <div className="vhu-card stagger-1" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0055D4', fontWeight: 900, fontSize: '1.25rem', marginBottom: '0.85rem' }}>
                    <BookOpen size={28} color="#0066FF" />
                    <span>{content.contextTitle}</span>
                  </div>
                  <p style={{ fontSize: '1.18rem', lineHeight: 1.65, color: '#1E293B', fontWeight: 600 }}>
                    {content.contextText}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {content.highlights.map((h, i) => (
                    <div key={i} className={`stagger-${i+2}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.08rem', background: '#F0F7FF', padding: '0.75rem 1rem', borderRadius: '10px', borderLeft: '5px solid #0088FF', boxShadow: '0 2px 8px rgba(0,102,255,0.1)' }}>
                      <Coffee size={22} color="#FF8800" />
                      <strong style={{ color: '#002B80' }}>{h.title}:</strong> <span style={{ color: '#334155', fontWeight: 600 }}>{h.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Question */}
              <div className="vhu-card vhu-card-gold stagger-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D00000', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.15rem', marginBottom: '1.15rem' }}>
                  <HelpCircle size={32} color="#FF8800" className="floating-icon" />
                  <span>{content.questionTitle}</span>
                </div>
                <blockquote style={{
                  fontSize: '1.55rem',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: '#002B80',
                  borderLeft: '6px solid #FF8800',
                  paddingLeft: '1.35rem',
                  margin: 0
                }}>
                  "{content.questionText}"
                </blockquote>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', color: '#0044CC', fontWeight: 800, background: '#FFFFFF', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '2px solid #FFC700' }}>
                  <Sparkles size={24} color="#FFC700" /> Định hướng xây dựng 15 câu hỏi khảo sát thực tế
                </div>
              </div>
            </div>
          </div>
        );

      case 'objectives':
        return (
          <div className="slide-body-container">
            <div className="card-grid-5">
              {content.objectives.map((obj, index) => {
                const getIcon = (iconName) => {
                  switch (iconName) {
                    case 'Coffee': return <Coffee size={32} color="#FF8800" />;
                    case 'Award': return <Award size={32} color="#0066FF" />;
                    case 'Sliders': return <Sliders size={32} color="#0D9488" />;
                    case 'Repeat': return <Repeat size={32} color="#8B5CF6" />;
                    case 'UserCheck': return <UserCheck size={32} color="#E11D48" />;
                    default: return <Target size={32} color="#FF8800" />;
                  }
                };
                return (
                  <div key={obj.id} className={`vhu-card stagger-${index+1}`} style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem 1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '14px', background: '#F0F7FF' }}>
                          {getIcon(obj.icon)}
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#002B80', background: '#FFC700', padding: '0.35rem 0.75rem', borderRadius: '999px', boxShadow: '0 2px 8px rgba(255,199,0,0.5)' }}>
                          #0{obj.id}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80', marginBottom: '0.6rem' }}>
                        {obj.title}
                      </h4>
                      <p style={{ fontSize: '1.05rem', lineHeight: 1.55, color: '#334155', fontWeight: 600 }}>
                        {obj.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'methodology':
        return (
          <div className="slide-body-container">
            <div className="card-grid-2">
              <div className="vhu-card stagger-1" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0055D4', fontWeight: 900, fontSize: '1.25rem' }}>
                  <Users size={28} color="#0088FF" />
                  <span>Đối Tượng & Phương Pháp</span>
                </div>
                <div style={{ background: '#F0F7FF', padding: '1.15rem', borderRadius: '12px', borderLeft: '5px solid #0088FF' }}>
                  <p style={{ fontSize: '0.95rem', textTransform: 'uppercase', color: '#FF8800', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🎯 Khảo sát thực tế sinh viên
                  </p>
                  <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002B80', marginTop: '0.3rem' }}>{content.target}</p>
                </div>
                <div style={{ background: '#F0F7FF', padding: '1.15rem', borderRadius: '12px', borderLeft: '5px solid #0055D4' }}>
                  <p style={{ fontSize: '0.95rem', textTransform: 'uppercase', color: '#0055D4', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    📊 Phương pháp khoa học
                  </p>
                  <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002B80', marginTop: '0.3rem' }}>{content.method}</p>
                </div>
              </div>

              <div className="vhu-card vhu-card-gold stagger-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#002B80', fontWeight: 900, fontSize: '1.25rem' }}>
                  <BarChart3 size={28} color="#FF8800" />
                  <span>Cấu Trúc Bảng Hỏi chuẩn</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center', margin: '1rem 0' }}>
                  {content.stats.map((s, idx) => (
                    <div key={idx} className={`stagger-${idx+1}`} style={{ background: '#FFFFFF', padding: '0.85rem 0.5rem', borderRadius: '12px', border: '2px solid #FFC700', boxShadow: '0 4px 12px rgba(255,199,0,0.3)' }}>
                      <div style={{ fontSize: '2.0rem', fontWeight: 900, color: '#FF8800' }}>{s.value}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#002B80' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '1.05rem' }}>
                  {content.parts.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#FFFFFF', padding: '0.7rem 1rem', borderRadius: '10px', border: '1.5px solid rgba(0,85,212,0.2)' }}>
                      <strong style={{ color: '#002B80' }}>{p.part}: {p.name}</strong>
                      <span style={{ color: '#FF8800', fontWeight: 900 }}>{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'factors':
        return (
          <div className="slide-body-container">
            <div className="card-grid-5" style={{ gap: '1.15rem' }}>
              {content.categories.map((cat, idx) => (
                <div key={idx} className={`vhu-card stagger-${idx+1}`} style={{ background: '#FFFFFF', borderTop: `6px solid ${cat.color}`, padding: '1.5rem 1.25rem', boxShadow: '0 10px 30px rgba(0,50,150,0.2)' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: cat.color, marginBottom: '1.1rem', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {cat.name}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {cat.items.map((item, i) => (
                      <li key={i} style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0F172A', fontWeight: 700 }}>
                        <CheckCircle2 size={20} color={cat.color} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'design_flow':
        return (
          <div className="slide-body-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {content.steps.map((step, idx) => (
                <div key={idx} className={`vhu-card stagger-${idx+1}`} style={{ background: '#FFFFFF', position: 'relative', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FF8800', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {step.num}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80', marginBottom: '0.6rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.55, fontWeight: 600 }}>
                    {step.desc}
                  </p>
                  {idx < content.steps.length - 1 && (
                    <ArrowRight size={24} color="#FF8800" style={{ position: 'absolute', right: '-16px', top: '42%', zIndex: 5, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                  )}
                </div>
              ))}
            </div>

            <div className="vhu-card vhu-card-gold stagger-5" style={{ padding: '1.25rem 1.6rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <ShieldCheck size={32} color="#002B80" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#002B80' }}>
                {content.rule}
              </p>
            </div>
          </div>
        );

      case 'question_types':
        return (
          <div className="slide-body-container">
            <div className="card-grid-2">
              <div className="vhu-card stagger-1" style={{ background: '#FFFFFF', padding: '1.75rem' }}>
                <span className="slide-badge-pill" style={{ marginBottom: '1rem', background: '#0088FF', color: '#FFFFFF' }}>{content.type1.badge}</span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#002B80', marginBottom: '1rem' }}>
                  {content.type1.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {content.type1.options.map((opt, i) => (
                    <div key={i} style={{ fontSize: '1.1rem', fontWeight: 700, background: '#F0F7FF', padding: '0.75rem 1.15rem', borderRadius: '10px', color: '#0F172A', borderLeft: '4px solid #0088FF' }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="vhu-card stagger-2" style={{ background: '#FFFFFF', padding: '1.75rem' }}>
                <span className="slide-badge-pill" style={{ background: '#FF8800', color: '#FFFFFF', marginBottom: '1rem' }}>{content.type2.badge}</span>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#002B80', marginBottom: '1rem' }}>
                  {content.type2.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {content.type2.options.map((opt, i) => (
                    <div key={i} style={{ fontSize: '1.1rem', fontWeight: 700, background: '#FFF8E6', padding: '0.75rem 1.15rem', borderRadius: '10px', color: '#0F172A', borderLeft: '4px solid #FFC700' }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'likert_scale':
        return (
          <div className="slide-body-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {content.scaleMeaning.map((s, idx) => (
                <div key={s.val} className={`stagger-${idx+1}`} style={{
                  textAlign: 'center',
                  padding: '0.85rem 0.5rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '2.5px solid #00D2FF',
                  boxShadow: '0 6px 15px rgba(0,100,255,0.2)'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0055D4' }}>{s.val}</div>
                  <div style={{ fontSize: '1.0rem', fontWeight: 800, color: '#002B80' }}>{s.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '4px' }}>
                    {[...Array(s.val)].map((_, starI) => (
                      <Star key={starI} size={14} color="#FFC700" fill="#FFC700" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="vhu-card stagger-5" style={{ background: '#FFFFFF', padding: '1.5rem' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 900, color: '#002B80', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={22} color="#FF8800" /> 9 Yếu Tố Được Đánh Giá Qua Thang Đo Likert (Câu 8):
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {content.factorsToRate.map((factor, idx) => (
                  <div key={idx} style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#F0F7FF', padding: '0.65rem 1rem', borderRadius: '10px', color: '#0F172A' }}>
                    <CheckSquare size={22} color="#0088FF" /> {factor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'open_question':
        return (
          <div className="slide-body-container">
            <div className="vhu-card vhu-card-gold stagger-1" style={{ textAlign: 'center', padding: '2.75rem 2rem', marginBottom: '1.5rem' }}>
              <span className="slide-badge-pill" style={{ background: '#FF8800', color: '#FFFFFF', marginBottom: '1.15rem', fontSize: '1.05rem' }}>
                {content.qNumber}
              </span>
              <h3 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#002B80', margin: '0.5rem 0' }}>
                {content.question}
              </h3>
            </div>

            <div className="vhu-card stagger-2" style={{ background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
              <Lightbulb size={44} color="#FF8800" className="floating-icon" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '1.15rem', color: '#002B80' }}>MỤC ĐÍCH THIẾT KẾ CÂU HỎI MỞ:</strong>
                <p style={{ fontSize: '1.15rem', color: '#334155', marginTop: '0.4rem', lineHeight: 1.6, fontWeight: 600 }}>
                  {content.purpose}
                </p>
              </div>
            </div>
          </div>
        );

      case 'behavior_questions':
        return (
          <div className="slide-body-container">
            <div className="card-grid-3">
              {content.items.map((item, idx) => (
                <div key={idx} className={`vhu-card stagger-${idx+1}`} style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem' }}>
                  <div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#002B80', background: '#FFC700', padding: '0.35rem 0.85rem', borderRadius: '10px' }}>
                      {item.code}
                    </span>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#002B80', margin: '0.85rem 0 0.5rem 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '1.08rem', lineHeight: 1.6, color: '#334155', fontWeight: 600 }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.0rem', color: '#0055D4', fontWeight: 800 }}>
                    <TrendingUp size={20} color="#FF8800" /> Phân tích hành vi & ý định
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'personal_info':
        return (
          <div className="slide-body-container">
            <div className="card-grid-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {content.questions.map((q, idx) => (
                  <div key={idx} className={`vhu-card stagger-${idx+1}`} style={{ background: '#FFFFFF', padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#002B80', marginBottom: '0.75rem' }}>
                      {q.q}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {q.options.map((opt, i) => (
                        <span key={i} style={{ fontSize: '1.0rem', fontWeight: 700, background: '#F0F7FF', padding: '0.45rem 0.85rem', borderRadius: '8px', color: '#0F172A' }}>
                          • {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="vhu-card vhu-card-gold stagger-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.75rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#002B80', marginBottom: '1rem' }}>
                  {content.reasonTitle}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {content.reasons.map((r, i) => (
                    <li key={i} style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#002B80' }}>
                      <CheckCircle2 size={22} color="#FF8800" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'pretest':
        return (
          <div className="slide-body-container">
            <div className="card-grid-3">
              {content.steps.map((s, idx) => (
                <div key={s.step} className={`vhu-card stagger-${idx+1}`} style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', padding: '1.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#0066FF', color: '#FFFFFF', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,102,255,0.4)' }}>
                      {s.step}
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#002B80' }}>
                      {s.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: '1.08rem', color: '#334155', lineHeight: 1.55, fontWeight: 600 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="slide-body-container" style={{ justifyContent: 'center' }}>
            <div className="card-grid-2" style={{ alignItems: 'stretch', gap: '1.5rem' }}>
              <div className="vhu-card stagger-1" style={{ background: '#FFFFFF', padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#002B80', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Award size={28} color="#0088FF" /> ĐÁNH GIÁ CHUNG BẢNG CÂU HỎI:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.0rem' }}>
                  {content.summaryPoints.map((pt, idx) => (
                    <li key={idx} style={{ fontSize: '1.12rem', fontWeight: 700, display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#1E293B', lineHeight: 1.5 }}>
                      <CheckCircle2 size={24} color="#0088FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="vhu-card vhu-card-gold stagger-2" style={{ textAlign: 'center', padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/vhu-logo.svg" alt="VHU Logo Official" className="floating-icon" style={{ width: '85px', height: '85px', marginBottom: '1rem', filter: 'drop-shadow(0 0 12px rgba(0,85,212,0.4))' }} />
                <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#002B80', marginBottom: '0.35rem' }}>
                  {content.thankYou}
                </h3>
                <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#FF8800', fontWeight: 900, marginBottom: '1.5rem' }}>
                  "{content.slogan}"
                </p>
                <div style={{ width: '100%', background: '#FFFFFF', padding: '1.1rem 1.5rem', borderRadius: '14px', fontWeight: 900, color: '#002B80', fontSize: '1.15rem', border: '2px solid #FFC700', boxShadow: '0 6px 20px rgba(255,199,0,0.4)' }}>
                  Trân trọng cảm ơn GV. Phạm Phương Mai và các bạn đã chú ý theo dõi!
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`slide-aspect-wrapper ${isDark ? '' : 'theme-light'}`}>
      <div className={`slide-content-frame ${animClass}`} key={slide.id}>
        {content.type !== 'cover' && (
          <>
            {/* Slide Top Banner */}
            <div className="slide-top-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span className="slide-badge-pill">{category}</span>
              </div>

              <div className="slide-univ-tag">
                <GraduationCap size={20} color={isDark ? "#FFC700" : "#0055D4"} />
                <span>Marketing Căn Bản • Nhóm 3</span>
              </div>
            </div>

            {/* Slide Title */}
            <div>
              <h2 className="slide-main-title">{title}</h2>
              <p className="slide-main-subtitle">{subtitle}</p>
            </div>
          </>
        )}

        {/* Main Content Viewport */}
        {renderSlideBody()}

        {/* Slide Bottom Footer Bar */}
        <div className="slide-bottom-footer">
          <span>Trường Đại Học Văn Hiến (VHU) — Bài Thuyết Trình Marketing Căn Bản</span>
          <span style={{ fontWeight: 900, color: isDark ? '#FFC700' : '#0055D4', fontSize: '1.05rem' }}>{slideNum} / 13</span>
        </div>
      </div>
    </div>
  );
}
