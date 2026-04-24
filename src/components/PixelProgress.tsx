import { motion } from 'framer-motion';

interface PixelProgressProps {
  value: number;  // 0 to 100
  label: string;
  className?: string;
}

const PixelProgress = ({ value, label, className = '' }: PixelProgressProps) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between mb-1 text-xs">
        <span>{label}</span>
        <span>{clampedValue}%</span>
      </div>
      <div className="w-full h-5 border-2 border-white bg-black">
        <motion.div 
          className="h-full bg-retro-purple"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default PixelProgress;
