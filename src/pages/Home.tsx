import { useState, useEffect } from 'react';
import { Bus, Map, Smartphone, Menu, Search, User, ChevronRight, Home as HomeIcon, Bell, Clock, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import heroBg from '../images/mytroski_background.jpg';
import { supabase } from '../supabaseClient';
import '../App.css';

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
            <div className="light-nav-item active"><HomeIcon size={18} color="#FFF" /></div>
            <div className="light-nav-item"><Clock size={18} color="#9CA3AF" /></div>
            <div className="light-nav-item"><MessageSquare size={18} color="#9CA3AF" /></div>
            <div className="light-nav-item"><Heart size={18} color="#9CA3AF" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Words for staggered animation
const titleWords = ["Your", "Fare,", "Upfront.", "Your", "Ride,", "Faster."];

export default function Home({ onStartApp, onDownloadApk, setShowIOSModal }: any) {
  const [pulseIndex, setPulseIndex] = useState(0);
  const [pulseNews, setPulseNews] = useState([
    { type: 'LIVE UPDATE', text: 'Heavy traffic building at Kaneshie due to roadworks. Delay ~25 mins.', typeColor: '#EF4444', url: '' },
    { type: 'COMMUNITY ALERT', text: 'GPRTU announces 20% increase in transport fares starting tomorrow.', typeColor: '#FBBF24', url: '' },
    { type: 'NEW ROUTE', text: 'New trotro station opened at Madina Zongo Junction. Routes active.', typeColor: '#3B82F6', url: '' }
  ]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax for background
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]); // Fade out text on scroll
  const scaleMockup = useTransform(scrollY, [0, 400], [1, 0.95]); // Subtle shrink

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3 } }}
    >
      {/* HERO SECTION */}
      <section className="hero" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Parallax Background */}
        <motion.div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: '-20%', 
            backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center',
            y: y1, zIndex: 0
          }} 
        />
        <div className="hero-overlay" style={{ zIndex: 1 }}></div>
        <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
          <motion.div 
            className="hero-text-content"
            style={{ opacity: opacityHero }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="hero-badge-dot"></div>
              <span>THE SMARTER WAY TO RIDE 🚀</span>
            </motion.div>
            
            <h1 className="hero-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', lineHeight: '1.2' }}>
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 150 }}
                  className={word.includes('Upfront') || word.includes('Faster') ? "text-yellow" : ""}
                  style={{ display: 'inline-block', marginRight: word.includes('.') || word.includes(',') ? '0' : '4px' }}
                >
                  {word}{word === "Upfront." && <br/>}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Use myTroski Go, and know your fare before you go! Get live queue alerts and traffic updates — powered by everyday commuters. Take the guesswork out of your journey.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="store-btn apple" onClick={() => setShowIOSModal(true)}>
                <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div className="store-text">
                  <span className="store-small">iPhone users</span>
                  <span className="store-large" style={{fontSize: '14px'}}>Add to Home Screen</span>
                </div>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="store-btn google" onClick={onDownloadApk}>
                <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div className="store-text">
                  <span className="store-small">Download direct</span>
                  <span className="store-large">Android APK</span>
                </div>
              </motion.button>
            </motion.div>
            <motion.div 
              className="hero-buttons" 
              style={{marginTop: '20px'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 120 }}
            >
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary large" onClick={onStartApp}>Get Started</motion.button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image-content"
            style={{ scale: scaleMockup }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 80 }}
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CITY PULSE NEWS */}
      <div className="city-pulse">
        <motion.div 
          className="pulse-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="pulse-badge">
            <div className="pulse-dot"></div>
            <span>CITY PULSE</span>
          </div>
          <div className="pulse-divider"></div>
          <AnimatePresence mode="wait">
            <motion.p 
              className="pulse-headline" 
              key={pulseIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <span className="pulse-update" style={{ color: pulseNews[pulseIndex]?.typeColor }}>{pulseNews[pulseIndex]?.type}: </span>
              {pulseNews[pulseIndex]?.text}
            </motion.p>
          </AnimatePresence>
          <button 
            className="pulse-read-more"
            onClick={() => {
              const url = pulseNews[pulseIndex]?.url;
              if (url) {
                window.open(url, '_blank');
              } else {
                onStartApp();
              }
            }}
          >
            Read more →
          </button>
        </motion.div>
      </div>

      {/* STATS BENTO GRID */}
      <section className="section">
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5, transition: { type: "spring" } }} className="bento-card span-2 dark-card">
            <Map size={48} color="#FBBF24" />
            <h3 className="bento-title">Multi-Hop Routes</h3>
            <p className="bento-desc">Calculate combined fares for trips requiring multiple connections across the city.</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5, transition: { type: "spring" } }} className="bento-card gold-card">
            <Bus size={32} color="#111827" />
            <h3 className="bento-title text-dark">500+</h3>
            <p className="bento-desc text-dark">Active Routes</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5, transition: { type: "spring" } }} className="bento-card outline-card">
            <Smartphone size={32} color="#F9FAFB" />
            <h3 className="bento-title">Trotro</h3>
            <p className="bento-desc">Standard Fares</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5, transition: { type: "spring" } }} className="bento-card dark-card">
            <h3 className="bento-title">Live</h3>
            <p className="bento-desc">Activity Map</p>
          </motion.div>
        </motion.div>
      </section>

      {/* GAMIFICATION */}
      <section className="section bg-darker">
        <div className="gamification-card">
          <motion.div 
            className="g-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="g-title">Report & Earn Points</h2>
            <p className="g-desc">Help the community by reporting traffic, fare changes, and long queues. Earn points and unlock badges!</p>
            <div className="badge-row">
              <motion.span whileHover={{ scale: 1.1 }} className="badge gold">🏆 Commuter Hero</motion.span>
              <motion.span whileHover={{ scale: 1.1 }} className="badge silver">⭐ Active Scout</motion.span>
            </div>
          </motion.div>
          <motion.div 
            className="g-mockup"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="mockup-alert">
              <span className="alert-pts">+50 pts</span>
              <span>Kaneshie traffic reported!</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <motion.div 
          className="steps-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -10, transition: { type: "spring" } }} className="step-card">
            <div className="step-badge">1</div>
            <h3 className="step-title">Search Route</h3>
            <p className="step-desc">Enter your starting point and destination to find the best available routes.</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -10, transition: { type: "spring" } }} className="step-card">
            <div className="step-badge">2</div>
            <h3 className="step-title">Check Fares</h3>
            <p className="step-desc">See the exact crowdsourced fare so you never get overcharged.</p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -10, transition: { type: "spring" } }} className="step-card">
            <div className="step-badge">3</div>
            <h3 className="step-title">Move Smart</h3>
            <p className="step-desc">Check the live pulse map for traffic or queue updates before you head out.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <motion.div 
          className="cta-banner"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div>
            <h2 className="cta-title">Ready to Move?</h2>
            <p className="cta-subtitle">Join 10,000+ Ghanaians moving smart. Launch myTroski Go today and forget transport stress.</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-dark" onClick={onStartApp}>Launch Web App →</motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
}
