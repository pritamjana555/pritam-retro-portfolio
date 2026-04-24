
import { motion } from 'framer-motion';

interface PixelAvatarProps {
  className?: string;
  type: 'astronaut' | 'scientist' | 'ufo';
}

const PixelAvatar = ({ className = '', type }: PixelAvatarProps) => {
  // These are simple ASCII-art style representations that will be replaced with actual pixel art
  const renderAvatar = () => {
    switch (type) {
      case 'astronaut':
        return (
          <div className="w-20 h-32 bg-white relative">
            {/* Simple placeholder for astronaut */}
            <div className="w-12 h-12 rounded-full bg-black border-2 border-white absolute top-2 left-4"></div>
            <div className="w-16 h-16 bg-white absolute top-10 left-2 border-2 border-black"></div>
            <div className="w-4 h-8 bg-white absolute top-22 left-4 border-2 border-black"></div>
            <div className="w-4 h-8 bg-white absolute top-22 right-4 border-2 border-black"></div>
          </div>
        );
      case 'scientist':
        return (
          <div className="w-20 h-32 bg-white relative">
            {/* Simple placeholder for scientist */}
            <div className="w-12 h-12 rounded-full bg-retro-purple-light border-2 border-white absolute top-2 left-4"></div>
            <div className="w-16 h-16 bg-retro-purple absolute top-10 left-2 border-2 border-white"></div>
            <div className="w-4 h-8 bg-retro-purple-dark absolute top-22 left-4 border-2 border-white"></div>
            <div className="w-4 h-8 bg-retro-purple-dark absolute top-22 right-4 border-2 border-white"></div>
          </div>
        );
      case 'ufo':
        return (
          <div className="w-32 h-16 relative">
            {/* Simple placeholder for UFO */}
            <div className="w-16 h-6 rounded-full bg-retro-blue border-2 border-white absolute top-6 left-8"></div>
            <div className="w-10 h-10 rounded-full bg-retro-blue-light border-2 border-white absolute top-0 left-11"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ 
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1.5,
        ease: "easeInOut"
      }}
    >
      {renderAvatar()}
    </motion.div>
  );
};

export default PixelAvatar;
