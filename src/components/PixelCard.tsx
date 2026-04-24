
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  heading?: string;
}

const PixelCard = ({ children, className = '', heading }: PixelCardProps) => {
  return (
    <motion.div
      className={`border-4 border-white bg-white bg-opacity-10 p-4 md:p-6 ${className}`}
      style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.4)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {heading && (
        <motion.div 
          className="text-center mb-4 pb-2 border-b-2 border-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl text-white">{heading}</h2>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};

export default PixelCard;
