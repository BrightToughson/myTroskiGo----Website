import { motion } from 'framer-motion';
import { Shield, Lock, MapPin } from 'lucide-react';
import '../App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Privacy() {
  return (
    <motion.div 
      className="page-content" 
      style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', color: '#FFF' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3 } }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
      >
        <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Privacy <span className="text-yellow">Policy</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '800px' }}>
          Your trust is our priority. We are committed to keeping your data safe and secure while providing you with the best transit experience.
        </p>
      </motion.div>

      <motion.div 
        className="steps-grid" 
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="step-card" style={{ padding: '30px' }}>
          <div className="step-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
            <Shield size={24} color="#3B82F6" />
          </div>
          <h3 className="step-title" style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '10px' }}>Data Privacy</h3>
          <p className="step-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            We keep your data safe and only collect what we need to make your ride better. We prioritize security to ensure your peace of mind while using myTroski Go.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="step-card" style={{ padding: '30px' }}>
          <div className="step-badge" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
            <MapPin size={24} color="#FBBF24" />
          </div>
          <h3 className="step-title" style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '10px' }}>Location Data</h3>
          <p className="step-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Location data is used exclusively for real-time routing, live tracking, and optimizing nearby stops. We do not use your location for invasive advertising.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="step-card" style={{ padding: '30px' }}>
          <div className="step-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
            <Lock size={24} color="#10B981" />
          </div>
          <h3 className="step-title" style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '10px' }}>Personal Data</h3>
          <p className="step-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Your personal data is never sold to third parties. Any information shared within the community hub is protected and handled according to strict privacy guidelines.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
