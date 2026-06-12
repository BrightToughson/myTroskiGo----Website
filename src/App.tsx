import { useState, useEffect } from 'react';
import './App.css';
import { Bus, Map, Smartphone, Menu, X } from 'lucide-react';
import logoImg from '../public/images/logo/mytroskigo.png';

export default function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onStartApp = () => {
    window.location.href = 'https://trotro-app-my-troski-go.vercel.app';
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
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Skip the queue.<br/>Know your fare.</h1>
          <p className="hero-subtitle">The ultimate crowdsourced transit companion for trotro and okada riders in Ghana.</p>
          <div className="hero-buttons">
            <button className="btn-primary large" onClick={onStartApp}>Launch Web App</button>
            <button className="btn-outline large" onClick={onDownloadApk}>Download APK</button>
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
