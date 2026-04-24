
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="retro-background"></div>
      
      <div className="stars"></div>
      
      <div className="cityscape"></div>
      
      {/* Terrain/Ground */}
      <motion.div 
        className="terrain"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
};

export default Background;
