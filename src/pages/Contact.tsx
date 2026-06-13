import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
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

export default function Contact() {
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
          Contact <span className="text-yellow">Us</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '800px' }}>
          Have questions or feedback? We'd love to hear from you. Reach out to our team using the contact details below.
        </p>
      </motion.div>

      <motion.div 
        className="bento-grid" 
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bento-card outline-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
          <div className="step-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', marginBottom: '20px' }}>
            <Mail size={32} color="#3B82F6" />
          </div>
          <h3 className="bento-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Email Us</h3>
          <p className="bento-desc" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px' }}>
            For support, inquiries, or feedback, drop us an email anytime.
          </p>
          <a href="mailto:mytroskigo@gmail.com" style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
            mytroskigo@gmail.com
          </a>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bento-card dark-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
          <div className="step-badge" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', marginBottom: '20px' }}>
            <Mail size={32} color="#FBBF24" />
          </div>
          <h3 className="bento-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Contact Admin</h3>
          <p className="bento-desc" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '15px' }}>
            Send a direct message to the admin team for any urgent inquiries.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="mailto:brighttoughson@gmail.com" style={{ color: '#FBBF24', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none' }}>
              brighttoughson@gmail.com
            </a>
            <a href="mailto:twitterbirdplus@gmail.com" style={{ color: '#FBBF24', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none' }}>
              twitterbirdplus@gmail.com
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
