import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Bus } from 'lucide-react';
import logoImg from './images/mytroskigo.png';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import './App.css';

export default function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);
    return () => clearTimeout(hideTimer);
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
        <AnimatePresence>
          {showSplash && (
            <motion.div 
              className="mobile-splash-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <div className="mobile-splash-content">
                <motion.div 
                  className="mobile-splash-icon-container"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                >
                  <img 
                    src={logoImg} 
                    alt="myTroski Go Logo" 
                    style={{ width: 120, height: 120, borderRadius: 30, boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)' }} 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  style={{ textAlign: 'center' }}
                >
                  <h1 className="mobile-splash-title">myTroski Go</h1>
                  <p className="mobile-splash-subtitle">Smart Transit for the City</p>
                </motion.div>
              </div>

              <div className="mobile-splash-footer">
                <div className="mobile-splash-loader-track">
                  <motion.div 
                    className="mobile-splash-loader-fill"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
              <img src={logoImg} alt="Logo" className="logo-img" />
              <span className="logo-text">myTroski Go</span>
            </Link>

            {isDesktop ? (
              <nav className="nav-links">
                <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>Home</Link>
                <Link to="/about" className="nav-link" style={{ textDecoration: 'none' }}>About</Link>
                <Link to="/contact" className="nav-link" style={{ textDecoration: 'none' }}>Contact</Link>
                <span className="nav-link" onClick={onDownloadApk} style={{cursor: 'pointer'}}>Download</span>
              </nav>
            ) : (
              <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
              </button>
            )}

            {isDesktop && (
              <button className="btn-primary" onClick={onStartApp}>Get Started</button>
            )}
          </div>
        </header>

        {/* MOBILE MENU */}
        {!isDesktop && menuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className="mobile-nav-link" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/contact" className="mobile-nav-link" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Contact</Link>
              <span className="mobile-nav-link" onClick={() => { onDownloadApk(); setMenuOpen(false); }}>Download</span>
              <button className="btn-primary large" style={{marginTop: '20px'}} onClick={() => { onStartApp(); setMenuOpen(false); }}>Get Started</button>
            </nav>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onStartApp={onStartApp} onDownloadApk={onDownloadApk} setShowIOSModal={setShowIOSModal} />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>

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
                <p onClick={() => setComingSoonFeature('Trotro Fares')} style={{cursor:'pointer'}}>Trotro Fares</p>
                <p onClick={() => setComingSoonFeature('Trotro Routes')} style={{cursor:'pointer'}}>Trotro Routes</p>
                <p onClick={() => setComingSoonFeature('Live Map')} style={{cursor:'pointer'}}>Live Map</p>
              </div>
              <div className="link-col">
                <h4>COMPANY</h4>
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
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
