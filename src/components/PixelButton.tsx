
import { motion } from 'framer-motion';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'default' | 'purple' | 'green' | 'pink' | 'blue' | 'yellow';
}

const PixelButton = ({ 
  children, 
  onClick, 
  className = '',
  color = 'default'
}: PixelButtonProps) => {
  const colorClasses = {
    default: 'bg-retro-purple border-white text-white',
    purple: 'bg-retro-purple-dark border-retro-purple-light text-white',
    green: 'bg-retro-green border-white text-retro-black',
    pink: 'bg-retro-pink border-white text-retro-black',
    blue: 'bg-retro-blue border-white text-retro-black',
    yellow: 'bg-retro-yellow border-white text-retro-black'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 border-2 text-sm font-pixel transition-all ${colorClasses[color]} ${className}`}
      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.4)' }}
      whileHover={{ y: -1, x: -1, transition: { duration: 0.1 } }}
      whileTap={{ 
        y: 4, 
        x: 4, 
        boxShadow: '0px 0px 0px rgba(0,0,0,0.4)',
        transition: { duration: 0.1 } 
      }}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
