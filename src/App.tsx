import { useState, useEffect } from 'react';
import './App.css';
import { Bus, Map, Smartphone, Menu, X, Search, User, ChevronRight, Home, Bell, Clock, MessageSquare, Heart } from 'lucide-react';
import logoImg from './images/mytroskigo.png';
import heroBg from './images/mytroski_background.jpg';
import { supabase } from './supabaseClient';

const PhoneMockup = () => {
  return (
    <div className="phone-mockup light-ui">
      <div className="phone-notch"></div>
      <div className="phone-screen light-screen">
        <div className="light-scroll-content">
          {/* Top Header */}
          <div className="light-header">
            <div className="light-icon-btn"><Menu size={16} color="#64748B" /></div>
            <div className="light-header-right">
              <div className="light-icon-btn white-bg"><Bell size={16} color="#64748B" /></div>
              <div className="light-avatar">
                 <User size={16} color="#FFF" />
                 <span className="light-online-dot"></span>
              </div>
            </div>
          </div>

          {/* Welcome & Search */}
          <div className="light-search-section">
            <p className="light-subtitle">TRAVEL EASY, TRAVEL FAST</p>
            <div className="light-search-box">
              <div className="light-search-icon"><Search size={16} color="#3B82F6" /></div>
              <div className="light-search-text">
                <h4>Where are you going today?</h4>
                <p>TAP DESTINATION TO PLAN YOUR TRIP</p>
              </div>
            </div>
          </div>

          {/* Recent Journey */}
          <div className="light-section">
            <h3 className="light-section-title">Recent Journey</h3>
            <div className="light-empty-box">
              <p>Your recent trips will appear here</p>
            </div>
            <div className="light-alert-box">
              <div className="light-alert-left">
                <span className="light-dot"></span>
                <div className="light-alert-text">
                  <h4>Bra fie (@guesswork) • <span style={{color: '#3B82F6'}}>STATUS: ACTIVE</span></h4>
                  <p>Heavy rainfall</p>
                </div>
              </div>
              <ChevronRight size={16} color="#3B82F6" />
            </div>
          </div>

          {/* City Pulse */}
          <div className="light-section">
            <div className="light-section-header">
              <div>
                <h3 className="light-section-title">City Pulse</h3>
                <p className="light-section-subtitle">Stay informed with the latest city updates</p>
              </div>
              <div className="light-view-all">VIEW ALL <ChevronRight size={12} color="#3B82F6" /></div>
            </div>
            
            <div className="light-news-card" style={{ backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%), url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
               <div className="light-news-badge">COMMUNITY</div>
               <div className="light-news-content">
                 <h2>GPRTU ANNOUNCES FARE PRICES INCREASE</h2>
                 <p>Commercial Transport operators announce 20% increase in public transport fares</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="light-bottom-nav">
          <div className="light-nav-pill">
            <div className="light-nav-item active"><Home size={18} color="#FFF" /></div>
            <div className="light-nav-item"><Clock size={18} color="#9CA3AF" /></div>
            <div className="light-nav-item"><MessageSquare size={18} color="#9CA3AF" /></div>
            <div className="light-nav-item"><Heart size={18} color="#9CA3AF" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [pulseIndex, setPulseIndex] = useState(0);
  const [pulseNews, setPulseNews] = useState([
    { type: 'LIVE UPDATE', text: 'Heavy traffic building at Kaneshie due to roadworks. Delay ~25 mins.', typeColor: '#EF4444', url: '' },
    { type: 'COMMUNITY ALERT', text: 'GPRTU announces 20% increase in transport fares starting tomorrow.', typeColor: '#FBBF24', url: '' },
    { type: 'NEW ROUTE', text: 'New trotro station opened at Madina Zongo Junction. Routes active.', typeColor: '#3B82F6', url: '' }
  ]);

  useEffect(() => {
    const fetchPulses = async () => {
      try {
        const { data, error } = await supabase
          .from('city_pulses')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!error && data && data.length > 0) {
          const mappedData = data.map((item: any) => ({
            type: item.tag?.toUpperCase() || 'LIVE UPDATE',
            text: item.title,
            typeColor: item.color || '#EF4444',
            url: item.url || ''
          }));
          setPulseNews(mappedData);
        }
      } catch (e) {
        console.error('Error fetching pulses:', e);
      }
    };
    fetchPulses();
  }, []);

  useEffect(() => {
    if (pulseNews.length === 0) return;
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % pulseNews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [pulseNews]);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const onStartApp = () => {
    window.location.href = import.meta.env.DEV ? 'http://localhost:8081' : 'https://app.mytroski-go.online';
  };

  const onDownloadApk = () => {
    window.open('https://expo.dev/artifacts/eas/PdmETQdkqhniYTf9zvRWRxXUqZ3ltzEgGFQ0zGuSHYE.apk', '_blank');
  };

  return (
    <div className="page-container">
      {/* SPLASH SCREEN */}
      {showSplash && (
        <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <img src={logoImg} alt="myTroski Go Logo" className="splash-logo" />
            <div className="splash-loader"></div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-container">
            <img src={logoImg} alt="Logo" className="logo-img" />
            <span className="logo-text">myTroski Go</span>
          </div>

          {isDesktop ? (
            <nav className="nav-links">
              <span className="nav-link" onClick={() => setComingSoonFeature('Trotro Fares Directory')}>Trotro Fares</span>
              <span className="nav-link" onClick={() => setComingSoonFeature('Community Hub')}>Community</span>
              <span className="nav-link" onClick={onDownloadApk} style={{cursor: 'pointer'}}>Download</span>
            </nav>
          ) : (
            <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
            </button>
          )}

          {isDesktop && (
            <button className="btn-primary" onClick={onStartApp}>Start App</button>
          )}
        </div>
      </header>

      {/* MOBILE MENU */}
      {!isDesktop && menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav-links">
            <span className="mobile-nav-link" onClick={() => { setComingSoonFeature('Trotro Fares Directory'); setMenuOpen(false); }}>Trotro Fares</span>
            <span className="mobile-nav-link" onClick={() => { setComingSoonFeature('Community Hub'); setMenuOpen(false); }}>Community</span>
            <span className="mobile-nav-link" onClick={() => { onDownloadApk(); setMenuOpen(false); }}>Download</span>
            <button className="btn-primary large" style={{marginTop: '20px'}} onClick={() => { onStartApp(); setMenuOpen(false); }}>Start App</button>
          </nav>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-content">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <span>THE SMARTER WAY TO RIDE 🚀</span>
            </div>
            <h1 className="hero-title">
              Your Fare, <span className="text-yellow">Upfront.</span><br/>
              Your Ride, <span className="text-yellow">Faster.</span>
            </h1>
            <p className="hero-subtitle">
              Use myTroski Go, and know your fare before you go! Get live queue alerts and traffic updates — powered by everyday commuters. Take the guesswork out of your journey.
            </p>
            <div className="hero-buttons">
              <button className="store-btn apple" onClick={() => setShowIOSModal(true)}>
                <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div className="store-text">
                  <span className="store-small">iPhone users</span>
                  <span className="store-large" style={{fontSize: '14px'}}>Add to Home Screen</span>
                </div>
              </button>
              <button className="store-btn google" onClick={onDownloadApk}>
                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="store-text">
                  <span className="store-small">Download direct</span>
                  <span className="store-large">Android APK</span>
                </div>
              </button>
            </div>
            <div className="hero-buttons" style={{marginTop: '20px'}}>
               <button className="btn-primary large" onClick={onStartApp}>Launch Web App</button>
            </div>
          </div>
          <div className="hero-image-content">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* CITY PULSE NEWS */}
      <div className="city-pulse">
        <div className="pulse-inner">
          <div className="pulse-badge">
            <div className="pulse-dot"></div>
            <span>CITY PULSE</span>
          </div>
          <div className="pulse-divider"></div>
          <p className="pulse-headline" key={pulseIndex}>
            <span className="pulse-update" style={{ color: pulseNews[pulseIndex].typeColor }}>{pulseNews[pulseIndex].type}: </span>
            {pulseNews[pulseIndex].text}
          </p>
          <button 
            className="pulse-read-more"
            onClick={() => {
              const url = pulseNews[pulseIndex].url;
              if (url) {
                window.open(url, '_blank');
              } else {
                onStartApp();
              }
            }}
          >
            Read more →
          </button>
        </div>
      </div>

      {/* STATS BENTO GRID */}
      <section className="section">
        <div className="bento-grid">
          <div className="bento-card span-2 dark-card">
            <Map size={48} color="#FBBF24" />
            <h3 className="bento-title">Multi-Hop Routes</h3>
            <p className="bento-desc">Calculate combined fares for trips requiring multiple connections across the city.</p>
          </div>
          <div className="bento-card gold-card">
            <Bus size={32} color="#111827" />
            <h3 className="bento-title text-dark">500+</h3>
            <p className="bento-desc text-dark">Active Routes</p>
          </div>
          <div className="bento-card outline-card">
            <Smartphone size={32} color="#F9FAFB" />
            <h3 className="bento-title">Trotro</h3>
            <p className="bento-desc">Standard Fares</p>
          </div>
          <div className="bento-card dark-card">
            <h3 className="bento-title">Live</h3>
            <p className="bento-desc">Activity Map</p>
          </div>
        </div>
      </section>

      {/* GAMIFICATION */}
      <section className="section bg-darker">
        <div className="gamification-card">
          <div className="g-content">
            <h2 className="g-title">Report & Earn Points</h2>
            <p className="g-desc">Help the community by reporting traffic, fare changes, and long queues. Earn points and unlock badges!</p>
            <div className="badge-row">
              <span className="badge gold">🏆 Commuter Hero</span>
              <span className="badge silver">⭐ Active Scout</span>
            </div>
          </div>
          <div className="g-mockup">
            <div className="mockup-alert">
              <span className="alert-pts">+50 pts</span>
              <span>Kaneshie traffic reported!</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-badge">1</div>
            <h3 className="step-title">Search Route</h3>
            <p className="step-desc">Enter your starting point and destination to find the best available routes.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">2</div>
            <h3 className="step-title">Check Fares</h3>
            <p className="step-desc">See the exact crowdsourced fare so you never get overcharged.</p>
          </div>
          <div className="step-card">
            <div className="step-badge">3</div>
            <h3 className="step-title">Move Smart</h3>
            <p className="step-desc">Check the live pulse map for traffic or queue updates before you head out.</p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <div className="cta-banner">
          <div>
            <h2 className="cta-title">Ready to Move?</h2>
            <p className="cta-subtitle">Join 10,000+ Ghanaians moving smart. Launch myTroski Go today and forget transport stress.</p>
          </div>
          <button className="btn-dark" onClick={onStartApp}>Launch Web App →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoImg} alt="Logo" />
              <span>myTroski Go</span>
            </div>
            <p className="footer-desc">Crowdsourced transit data for Ghana. Know your fare, skip the queue, and never get overcharged again.</p>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4>PRODUCT</h4>
              <p>Trotro Fares</p>
              <p>Trotro Routes</p>
              <p>Live Map</p>
            </div>
            <div className="link-col">
              <h4>COMPANY</h4>
              <p>About Us</p>
              <p>Contact</p>
              <p>Privacy Policy</p>
            </div>
            <div className="link-col">
              <h4>DOWNLOAD</h4>
              <p onClick={onDownloadApk} style={{cursor:'pointer'}}>Android APK</p>
              <p onClick={onStartApp} style={{cursor:'pointer'}}>Web App</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 myTroski Go. All rights reserved.</p>
        </div>
      </footer>

      {/* IOS INSTALL MODAL */}
      {showIOSModal && (
        <div className="modal-overlay" onClick={() => setShowIOSModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowIOSModal(false)}>
              <X size={24} color="#64748B" />
            </button>
            <h3 className="modal-title">Install on iPhone</h3>
            <div className="modal-steps">
              <p><strong>1.</strong> Launch the Web App by clicking the button below.</p>
              <p><strong>2.</strong> Once in the Web App, tap the <strong>Share</strong> icon <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', display: 'inline'}}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> at the bottom of your Safari browser.</p>
              <p><strong>3.</strong> Scroll down and select <strong>Add to Home Screen</strong> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle', display: 'inline'}}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>.</p>
            </div>
            <button className="btn-primary w-full" style={{marginTop: '20px'}} onClick={onStartApp}>Go to Web App</button>
          </div>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {comingSoonFeature && (
        <div className="modal-overlay" onClick={() => setComingSoonFeature('')}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setComingSoonFeature('')}>
              <X size={24} color="#64748B" />
            </button>
            <h3 className="modal-title">Coming Soon! 🚀</h3>
            <div className="modal-steps">
              <p style={{marginBottom: '10px'}}>The <strong>{comingSoonFeature}</strong> is currently being optimized for the web.</p>
              <p>For now, you can access all features, live fares, and community updates directly inside the myTroski Go App.</p>
            </div>
            <button className="btn-primary w-full" style={{marginTop: '20px'}} onClick={() => { setComingSoonFeature(''); onStartApp(); }}>
              Launch Web App
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
