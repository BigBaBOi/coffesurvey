import React, { useState, useEffect, useRef } from 'react';
import HeaderNav from './components/HeaderNav';
import SlideCanvas from './components/SlideCanvas';
import SlideControls from './components/SlideControls';
import SpeakerNotes from './components/SpeakerNotes';
import ThumbnailsDrawer from './components/ThumbnailsDrawer';
import InteractiveSurvey from './components/InteractiveSurvey';
import TeamAllocationModal from './components/TeamAllocationModal';
import LiveAnalyticsDashboard from './components/LiveAnalyticsDashboard';
import StudentSurveyView from './components/StudentSurveyView';
import QRCodeModal from './components/QRCodeModal';
import { SLIDES } from './data/slidesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'analytics' | 'survey' | 'team'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isDark, setIsDark] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStudentMode, setIsStudentMode] = useState(false);

  const containerRef = useRef(null);

  const currentSlide = SLIDES[currentIndex];

  // Check URL parameters on mount (e.g. ?mode=student when scanned from QR code)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'student' || params.get('survey') === 'true') {
      setIsStudentMode(true);
    }
  }, []);

  // Navigation handlers with direction state
  const handlePrev = () => {
    if (activeTab === 'analytics') {
      setActiveTab('slides');
      setCurrentIndex(SLIDES.length - 1);
      setSlideDirection('prev');
      return;
    }
    if (activeTab === 'slides') {
      setCurrentIndex((prev) => {
        if (prev > 0) {
          setSlideDirection('prev');
          return prev - 1;
        }
        return prev;
      });
    }
  };

  const handleNext = () => {
    if (activeTab === 'slides') {
      if (currentIndex < SLIDES.length - 1) {
        setSlideDirection('next');
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Hết slide chuyển ngay sang tab kết quả khảo sát Real-time
        setActiveTab('analytics');
      }
    }
  };

  const handleSelectSlide = (index) => {
    setSlideDirection(index >= currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setActiveTab('slides');
  };

  // Autoplay Timer
  useEffect(() => {
    let timer;
    if (isPlaying && activeTab === 'slides') {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= SLIDES.length - 1) {
            setIsPlaying(false);
            setActiveTab('analytics');
            return prev;
          }
          setSlideDirection('next');
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeTab]);

  // Keyboard Shortcuts listener (fix stale closure bug)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in survey inputs or in student mode
      if (isStudentMode || ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStudentMode, activeTab, currentIndex]);

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // If URL contains ?mode=student (from QR Code Scan), render ONLY Student Mobile Survey View
  if (isStudentMode) {
    return <StudentSurveyView />;
  }

  return (
    <div className="app-viewport">
      {/* Top Progress Bar (slide progress) */}
      {activeTab === 'slides' && (
        <div className="deck-progress-bar-track">
          <div
            className="deck-progress-bar-fill"
            style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
      )}

      {/* Navbar Header */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        toggleFullscreen={toggleFullscreen}
        onOpenQR={() => setShowQRModal(true)}
      />

      {/* Main Workspace */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'slides' && (
          <div
            ref={containerRef}
            className={`presentation-workspace ${isFullscreen ? 'fullscreen-mode' : ''}`}
          >
            {/* 16:9 Aspect Ratio Canvas with Slide Direction animation */}
            <SlideCanvas slide={currentSlide} isDark={isDark} slideDirection={slideDirection} />

            {/* Slide Navigation & Control Bar */}
            {!isFullscreen && (
              <>
                <SlideControls
                  currentIndex={currentIndex}
                  totalSlides={SLIDES.length}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSelectSlide={handleSelectSlide}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  showNotes={showNotes}
                  setShowNotes={setShowNotes}
                  showThumbnails={showThumbnails}
                  setShowThumbnails={setShowThumbnails}
                />

                {/* Speaker Notes - absolute inside the relative slide stage */}
                {showNotes && (
                  <SpeakerNotes
                    slide={currentSlide}
                    onClose={() => setShowNotes(false)}
                  />
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <LiveAnalyticsDashboard onOpenQR={() => setShowQRModal(true)} />
        )}

        {activeTab === 'survey' && (
          <InteractiveSurvey isDark={isDark} />
        )}

        {activeTab === 'team' && (
          <TeamAllocationModal isDark={isDark} onSelectSlide={handleSelectSlide} />
        )}
      </main>

      {/* QR Code Modal Popup */}
      {showQRModal && (
        <QRCodeModal
          isDark={isDark}
          onClose={() => setShowQRModal(false)}
        />
      )}

      {/* Thumbnails Modal Drawer */}
      {showThumbnails && (
        <ThumbnailsDrawer
          slides={SLIDES}
          currentIndex={currentIndex}
          onSelectSlide={handleSelectSlide}
          onClose={() => setShowThumbnails(false)}
          isDark={isDark}
        />
      )}
    </div>
  );
}
