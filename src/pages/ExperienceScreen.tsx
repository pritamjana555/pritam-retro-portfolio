import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import PixelCard from "../components/PixelCard";
import { ArrowLeftIcon, ArrowRightIcon, Zap } from "lucide-react";
import bgimage from "../assets/images/background.jpg";

interface ExperienceScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

const experiences = [
  {
    role: "Junior Frontend Developer Intern",
    period: "June-July 2025",
    company: "Zidio Development, Bengaluru",
    icon: <Zap className="text-yellow-400" size={20} />,
    projects: [
      {
        name: "Xcellytics",
        details: [
          "Developed a dynamic dashboard using React and Chart.js to visualize real-time analytics data, improving user engagement by 30%.",
          "Implemented responsive design principles to ensure seamless user experience across devices, resulting in a 25% increase in mobile traffic.",
        ],
      },

    ],
  },

];

const ExperienceScreen = ({ onNext, onPrev }: ExperienceScreenProps) => {
  const [currentExperience, setCurrentExperience] = useState(0);
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

  const nextExperience = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

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
              clipPath: `polygon(${Math.random() * 100}% 0, 100% ${Math.random() * 100
                }%, ${100 - Math.random() * 100}% 100%, 0 ${100 - Math.random() * 100
                }%)`,
            }}
          />
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div
              className="absolute left-0 top-0 w-full h-full"
              style={{
                transform: `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10
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

      {/* Header */}
      <motion.div
        className="absolute top-4 left-0 right-0 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-retro-purple-light drop-shadow-glow inline-block px-4 py-1 border-b-4 border-retro-purple-light/50 font-pixel">
          EXPERIENCE LOG
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-6 mt-16 z-10">
        <div className="w-full flex-1">
          <div className="w-full flex items-center justify-between px-2 sm:px-4 mb-4">
            <motion.button
              onClick={prevExperience}
              whileHover={{ x: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-purple-light p-1 sm:p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
            >
              <ArrowLeftIcon size={16} />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentExperience}
                className="flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {experiences[currentExperience].icon}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-glow font-pixel">
                  {experiences[currentExperience].role}
                </h3>
                <span className="text-xs bg-white/20 px-1 sm:px-2 py-1 rounded-md text-white/80 font-mono">
                  {currentExperience + 1}/{experiences.length}
                </span>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={nextExperience}
              whileHover={{ x: 4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-purple-light p-1 sm:p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-glow"
            >
              <ArrowRightIcon size={16} />
            </motion.button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <PixelCard className="w-full bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
              <div
                className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 sm:pr-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#A78BFA #EDE9FE",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={experiences[currentExperience].role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col gap-4 sm:gap-6">
                      <div>
                        <p className="text-xs sm:text-sm md:text-base text-retro-purple-light font-mono mb-1 sm:mb-2">
                          {experiences[currentExperience].period}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-800 font-pixel">
                          {experiences[currentExperience].company}
                        </p>
                      </div>
                      {experiences[currentExperience].projects.map((project, index) => (
                        <div key={index} className="mt-3 sm:mt-4">
                          {project.name && (
                            <h4 className="text-base sm:text-lg md:text-xl text-retro-purple-dark font-bold font-pixel mb-2 sm:mb-3">
                              {project.name}
                            </h4>
                          )}
                          <ul className="list-disc pl-5 space-y-1 sm:space-y-2">
                            {project.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="text-xs sm:text-sm md:text-base text-gray-800"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </PixelCard>
          </motion.div>
        </div>
      </div>

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

export default ExperienceScreen;