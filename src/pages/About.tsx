import { motion } from 'framer-motion';
import { Bus, Map, Users } from 'lucide-react';
import '../App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function About() {
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
          About <span className="text-yellow">myTroski Go</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '800px' }}>
          We are on a mission to bring predictability, transparency, and safety to public transit in Ghana. Use myTroski Go and take the guesswork out of your daily commute.
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
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bento-card dark-card">
          <Bus size={40} color="#3B82F6" style={{ marginBottom: '15px' }} />
          <h3 className="bento-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Smart City Transit</h3>
          <p className="bento-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Our app provides live updates and crowdsourced transit data, ensuring you always know where your Trotro is. Say goodbye to long waits without information.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bento-card dark-card">
          <Map size={40} color="#FBBF24" style={{ marginBottom: '15px' }} />
          <h3 className="bento-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Reliable Routing</h3>
          <p className="bento-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Never get lost with our easy step-by-step directions for bus rides in the city. We map out the multi-hop routes so you can calculate combined fares and travel times easily.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bento-card dark-card">
          <Users size={40} color="#10B981" style={{ marginBottom: '15px' }} />
          <h3 className="bento-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Community Driven</h3>
          <p className="bento-desc" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            User reports help us keep track of delays, price changes, and road work right away. Together, we build a smarter transit network powered by everyday commuters.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
