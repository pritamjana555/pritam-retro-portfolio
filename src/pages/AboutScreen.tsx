import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import SpeechBubble from "../components/SpeechBubble";
import bgimage from "../assets/images/background.jpg";
import profileImage from "../assets/images/IMG-20240925-WA0059.jpg";
import { Zap } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";


interface AboutScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

const AboutScreen = ({ onNext, onPrev }: AboutScreenProps) => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchType, setGlitchType] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchType(Math.floor(Math.random() * 4));
      setShowGlitch(true);
      const duration = Math.random() * 200 + 100;
      setTimeout(() => setShowGlitch(false), duration);
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setGlitchType(Math.floor(Math.random() * 4));
          setShowGlitch(true);
          setTimeout(() => setShowGlitch(false), duration / 2);
        }, duration + 50);
      }
    }, 7000);

    return () => clearInterval(glitchInterval);
  }, []);

  const getGlitchClass = () => {
    switch (glitchType) {
      case 0:
        return "bg-cyan-500/30";
      case 1:
        return "bg-pink-500/30";
      case 2:
        return "bg-yellow-500/30";
      case 3:
        return "bg-green-500/30";
      default:
        return "bg-cyan-500/30";
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden z-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 z-0" />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 50%, transparent 100%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Glitch Effect */}
      {showGlitch && (
        <>
          <div
            className={`absolute inset-0 ${getGlitchClass()} z-20 glitch-overlay`}
            style={{
              clipPath: `polygon(${Math.random() * 100}% 0, 100% ${
                Math.random() * 100
              }%, ${100 - Math.random() * 100}% 100%, 0 ${
                100 - Math.random() * 100
              }%)`,
            }}
          />
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div
              className="absolute left-0 top-0 w-full h-full"
              style={{
                transform: `translate(${(Math.random() - 0.5) * 10}px, ${
                  (Math.random() - 0.5) * 10
                }px)`,
                opacity: 0.7,
              }}
            />
          </div>
        </>
      )}

      {/* Pixel Corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-retro-purple-light opacity-70" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-retro-purple-light opacity-70" />

      {/* Header */}
      <motion.div
        className="absolute top-4 left-0 right-0 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-retro-purple-light drop-shadow-glow inline-block px-4 py-1 border-b-4 border-retro-purple-light/50 font-pixel">
          IT'S PRITAM JANA
        </h2>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute top-16 left-4 right-4 md:top-4 flex justify-between items-center z-30">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        >
          <PixelButton
            onClick={onPrev}
            className="px-3 py-2 text-xs hover:bg-retro-purple-dark/90 transition-colors bg-retro-purple-light text-white shadow-glow border-2 border-white/20"
          >
            <span className="font-pixel tracking-wide">previous level</span>
            <span className="ml-1 inline-block animate-bounce-left">←</span>
          </PixelButton>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        >
          <PixelButton
            onClick={onNext}
            className="px-3 py-2 text-xs hover:bg-retro-purple-dark/90 transition-colors bg-retro-purple-light text-white shadow-glow border-2 border-white/20"
          >
            <span className="font-pixel tracking-wide">next level</span>
            <span className="ml-1 inline-block animate-bounce-right">→</span>
          </PixelButton>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-6 mt-16 z-10">
        <motion.div
          initial={{ x: -50, opacity: 0, rotate: -10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center w-full md:w-auto"
        >
          <motion.a
            href="https://github.com/pritamjana555"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-retro-purple-light bg-retro-purple-dark/20 shadow-glow"
          >
            <img
              src={profileImage}
              alt="Pritam Jana Profile"
              className="w-full h-full object-cover"
            />
          </motion.a>
        </motion.div>

        <motion.div
          className="flex-1 w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <SpeechBubble className="w-full bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="text-yellow-400" size={20} />
                    <h3 className="text-lg sm:text-xl md:text-2xl text-retro-purple-dark font-bold font-pixel">
                      Pritam Jana
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-retro-purple-light italic mb-2 font-mono">
                    "Stacking code & chaos, one bug at a time!"
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed">
                    I am a FullStack Engineer with 1+ year of experience, hailing from somewhere in West Be, India currently crafting full-stack rollercoasters to elevate web experiences.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpeechBubble>
        </motion.div>
      </div>

       {/* Footer with social media links  */}

      <motion.div
              className="absolute bottom-8 left-0 right-0"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-center mb-4 text-sm text-white font-bold drop-shadow-glow">FOLLOW ME AT:</p>
              <div className="flex justify-center gap-6">
                <motion.a
                  href="https://github.com/pritamjana555"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="p-2 border-2 border-white bg-black bg-opacity-30 rounded"
                >
                  <GitHubLogoIcon className="h-6 w-6 text-white" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/pritam-jana-336862327/"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="p-2 border-2 border-white bg-black bg-opacity-30 rounded"
                >
                  <LinkedInLogoIcon className="h-6 w-6 text-white" />
                </motion.a>
                <motion.a
                  href="https://x.com/PritamJ69900162"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="p-2 border-2 border-white bg-black bg-opacity-30 rounded"
                >
                  <TwitterLogoIcon className="h-6 w-6 text-white" />
                </motion.a>
              </div>
            </motion.div>
      {/* Floating Pixels */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-16 right-16 w-6 h-6 bg-retro-purple-light/40 hidden md:block"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute top-32 left-16 w-4 h-4 bg-cyan-400/30 hidden md:block"
      />
    </div>
  );
};

export default AboutScreen;