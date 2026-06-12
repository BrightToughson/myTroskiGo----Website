import { useState, useEffect } from 'react';
import './App.css';
import { Bus, Map, Smartphone, Menu, X, Search, User, ChevronRight, Home, Bell, Clock, MessageSquare, Heart } from 'lucide-react';
import logoImg from './images/mytroskigo.png';
import heroBg from './images/mytroski_background.jpg';

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

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onStartApp = () => {
    window.location.href = import.meta.env.DEV ? 'http://localhost:8081' : 'https://app.mytroski-go.online';
  };

  const onDownloadApk = () => {
    window.open('https://expo.dev/artifacts/eas/PdmETQdkqhniYTf9zvRWRxXUqZ3ltzEgGFQ0zGuSHYE.apk', '_blank');
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-container">
            <img src={logoImg} alt="Logo" className="logo-img" />
            <span className="logo-text">myTroski Go</span>
          </div>

          {isDesktop ? (
            <nav className="nav-links">
              <span className="nav-link">Okada Fares</span>
              <span className="nav-link">Community</span>
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

      {/* HERO SECTION */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-content">
            <h1 className="hero-title">
              Know Your<br/>
              <span className="text-yellow">Fare.</span><br/>
              Skip the <span className="text-yellow underline">Queue.</span>
            </h1>
            <p className="hero-subtitle">
              Live fares, instant queue alerts, station updates — crowdsourced by commuters like you. Save time, skip the long queues, avoid overcharges.
            </p>
            <div className="hero-buttons">
              <button className="store-btn apple" onClick={onStartApp}>
                <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div className="store-text">
                  <span className="store-small">Download on the</span>
                  <span className="store-large">App Store</span>
                </div>
              </button>
              <button className="store-btn google" onClick={onDownloadApk}>
                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="store-text">
                  <span className="store-small">GET IT ON</span>
                  <span className="store-large">Google Play</span>
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
          <p className="pulse-headline">
            <span className="pulse-update">LIVE UPDATE: </span>
            Heavy traffic building at Kaneshie due to roadworks. Delay ~25 mins.
          </p>
          <button className="pulse-read-more">Read more →</button>
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
            <h3 className="bento-title">Okada</h3>
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
              <p>Okada Fares</p>
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
    </div>
  );
}
