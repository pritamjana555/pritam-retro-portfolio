import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Star component for creating individual stars
const Star = ({ top, left, size, delay }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
    }}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 1, 0.5, 1],
      scale: [1, 1.2, 1]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

// Main LoadingScreen component
const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [stars, setStars] = useState([]);
  
  // Generate stars on component mount
  useEffect(() => {
    const starCount = 50; // Number of stars
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1, // Random size between 1-4px
        delay: Math.random() * 2, // Random delay for twinkling effect
      });
    }
    
    setStars(newStars);
  }, []);
  
  // Loading progress effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Stars */}
      {stars.map(star => (
        <Star 
          key={star.id}
          top={star.top}
          left={star.left}
          size={star.size}
          delay={star.delay}
        />
      ))}
      
      {/* Loading Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <h1 className="text-2xl md:text-3xl text-white mb-8">LOADING<span className="animate-pulse">_</span></h1>
      </motion.div>
      
      {/* Progress Bar */}
      <div className="w-64 h-6 border-4 border-white bg-transparent relative z-10">
        <motion.div
          className="h-full bg-retro-purple"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      
      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-sm text-retro-purple-light z-10 font-mono"
      >
        INITIALIZING WORLD...
      </motion.div>
    </motion.div>
  );
};


export default LoadingScreen;