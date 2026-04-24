import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LevelTransitionProps {
  level: number;
  levelName: string;
  onTransitionComplete: () => void;
  direction?: 'forward' | 'backward';
}

// Star component
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

const LevelTransition = ({
  level,
  levelName,
  onTransitionComplete,
  direction = 'forward', // 👈 default to forward if not provided
}: LevelTransitionProps) => {
  const [stars, setStars] = useState([]);

  // Generate stars
  useEffect(() => {
    const starCount = 50;
    const newStars = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
      });
    }

    setStars(newStars);
  }, []);

  // Trigger transition completion after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onTransitionComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onTransitionComplete]);

  // 👇 Animation values based on direction
  const slideInX = direction === 'forward' ? 1000 : -1000;
  const slideOutX = direction === 'forward' ? -1000 : 1000;

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0, x: slideInX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: slideOutX }}
      transition={{ duration: 0.6 }}
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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center z-10"
      >
        <div className="text-lg md:text-xl text-retro-purple-light mb-4">
          LEVEL {level}:
        </div>
        <h1 className="text-2xl md:text-3xl text-white">{levelName}</h1>
        <div className="mt-4 font-mono text-white animate-pulse">_</div>
      </motion.div>
    </motion.div>
  );
};

export default LevelTransition;
