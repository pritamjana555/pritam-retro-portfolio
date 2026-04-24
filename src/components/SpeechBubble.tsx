
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'left' | 'right';
}

const SpeechBubble = ({ children, direction = 'left' }: SpeechBubbleProps) => {
  return (
    <motion.div 
      className="relative bg-white border-4 border-white p-4 text-retro-black"
      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.4)' }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {children}
      
      {/* Speech bubble tail */}
      <div 
        className={`absolute w-4 h-4 bg-white border-b-4 border-r-4 border-white -bottom-4 ${
          direction === 'left' ? 'left-6' : 'right-6'
        } transform rotate-45`}
      ></div>
    </motion.div>
  );
};

export default SpeechBubble;
