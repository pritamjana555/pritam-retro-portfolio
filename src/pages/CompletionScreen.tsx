import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/PixelButton";
import PixelCard from "../components/PixelCard";
import { Trophy } from "lucide-react";
import bgimage from "../assets/images/background.jpg";

interface CompletionScreenProps {
  onRestart: () => void;
}


declare global {
    interface Window {
        help: unknown;
        unlockDirectly: unknown;
        portal: unknown;
        debug: unknown;
        cipher: unknown;
        konami: unknown;
        easterEggStage: number;
        unlock: unknown;
        code: unknown;
        me: unknown;        
    }
}

const CompletionScreen = ({ onRestart }: CompletionScreenProps) => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchType, setGlitchType] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  // Easter egg modal state
  const [showModal, setShowModal] = useState(false);
  const [devAnswer, setDevAnswer] = useState<null | "yes" | "no">(null);

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

    const confettiTimeout = setTimeout(() => setShowConfetti(false), 3000);

    // Enhanced Easter Egg Implementation
    if (typeof window !== "undefined") {
      // Initial puzzle clue
      console.log(
        "%c🎮 Thanks for playing! Did you find all the secrets?",
        "color: #A78BFA; font-weight: bold; font-size: 16px;"
      );
      console.log(
        "%c// There's more than meets the eye...\n// Try: help.me()",
        "color: #FBBF24; font-family: monospace;"
      );

      let easterEggStage = 0;
      const secretCode = btoa("theDeveloperIsPatient");
      const reversedCode = secretCode.split("").reverse().join("");

      window.help = {
        me: () => {
          console.clear();
          easterEggStage = 1;
          console.log(
            "%c🔍 DEBUG MODE ACTIVATED",
            "color: #4ADE80; font-weight: bold; font-size: 18px;"
          );
          console.log(
            "%c// Look deeper into the source\n// What's hidden in plain sight?\n// Try: debug.inspect('clue')",
            "color: #FBBF24; font-family: monospace;"
          );
        },
      };

      window.debug = {
        inspect: (param: string) => {
          if (param === "clue" && easterEggStage === 1) {
            easterEggStage = 2;
            console.log(
              "%c🧩 CLUE FOUND: The key is encoded",
              "color: #F472B6; font-weight: bold;"
            );
            console.log(
              "%c// What looks like nonsense might make sense backwards\n// Try: cipher.decode('" +
                reversedCode +
                "')",
              "color: #FBBF24; font-family: monospace;"
            );
          } else {
            console.log("%c❌ Nothing interesting here...", "color: #EF4444;");
          }
        },
      };

      window.cipher = {
        decode: (code: string) => {
          if (code === reversedCode && easterEggStage === 2) {
            easterEggStage = 3;
            const decodedMessage = atob(secretCode.split("").reverse().join(""));
            console.clear();
            console.log(
              "%c🏆 PUZZLE SOLVED! YOU WIN!",
              "color: #FBBF24; font-weight: bold; font-size: 24px; text-shadow: 0 0 5px gold;"
            );
            console.log(
              "%c👉 Source Code: https://github.com/pritamjana555/pritam-retro-portfolio",
              "color: #4ADE80; font-family: monospace; font-size: 16px;"
            );
            console.log(
              "%c💡 That was a real quest, wasn't it? Your decoding skills paid off!",
              "color: #A78BFA; font-style: italic; font-size: 14px;"
            );
          } else {
            console.log("%c❌ Invalid code!", "color: #EF4444;");
          }
        },
      };

      window.unlockDirectly = (passphrase: string) => {
        if (passphrase === "thisIsShit") {
          console.clear();
          console.log(
            "%c🤫 SHORTCUT DISCOVERED!",
            "color: #A78BFA; font-weight: bold; font-size: 18px;"
          );
          console.log(
            "%c👉 Source Code: https://github.com/pritamjana555/pritam-retro-portfolio",
            "color: #4ADE80; font-family: monospace;"
          );
          console.log(
            "%c💡 Smart move! Checking the documentation always helps.",
            "color: #F472B6; font-style: italic;"
          );
        } else {
          console.log("%c❌ Nice try, but that's not right.", "color: #EF4444;");
          console.log(
            "%c// Hint: Try expressing frustration with the puzzle",
            "color: #FBBF24; font-style: italic;"
          );
        }
      };

      window.unlock = {
        portal: () => {
          console.log(
            "%c🤔 The old ways are deprecated...",
            "color: #F472B6; font-weight: bold;"
          );
          console.log(
            "%c// Try: help.me()",
            "color: #FBBF24; font-family: monospace;"
          );
        },
      };
    }

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(confettiTimeout);
      // Cleanup
      delete window.help;
      delete window.debug;
      delete window.cipher;
      delete window.unlockDirectly;
      delete window.unlock;
    };
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

  const confettiParticles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 350,
    y: -10 - Math.random() * 20,
    size: Math.random() * 4 + 4,
    color: ["#A78BFA", "#FBBF24", "#4ADE80", "#F472B6", "#EF4444", "#EF7744"][
      Math.floor(Math.random() * 4)
    ],
    delay: Math.random() * 2,
  }));

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 z-10"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti &&
          confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute z-40"
              style={{
                left: `${particle.x}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
              }}
              initial={{ y: particle.y, opacity: 1 }}
              animate={{ y: "100vh", opacity: 0 }}
              transition={{
                duration: 3,
                delay: particle.delay,
                ease: "easeIn",
              }}
              exit={{ opacity: 0 }}
            />
          ))}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-6xl z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <PixelCard className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-glow border-2 border-retro-purple-light/40">
          <div className="text-center">
            <motion.div
              className="mb-4 text-3xl md:text-4xl font-bold text-retro-purple-light font-pixel"
              style={{
                textShadow:
                  "0 0 8px rgba(167, 139, 250, 0.8), 0 0 12px rgba(167, 139, 250, 0.6)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              LEVEL CLEARED
            </motion.div>
            <h1 className="text-xl md:text-2xl text-black font-pixel mb-2">
              CONGRATULATIONS, EXPLORER!
            </h1>
            <p className="text-base md:text-lg text-black font-pixel mb-6">
              You have completed the portfolio!
            </p>

            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
              transition={{
                delay: 0.4,
                duration: 0.7,
                type: "spring",
                stiffness: 100,
                rotate: { duration: 1, repeat: 1 },
              }}
            >
              <Trophy
                className="text-yellow-400 w-16 h-16 border-2 border-retro-purple-light rounded-full p-2 shadow-glow"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))",
                }}
              />
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <PixelButton
                onClick={onRestart}
                className="px-6 py-3 text-base md:text-lg bg-retro-purple-light text-white shadow-glow border-2 border-white/20 hover:bg-retro-purple-dark/90 transition-all"
              >
                <span className="mr-2 font-pixel tracking-wide">PLAY AGAIN</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>

              {/* Easter Egg Trigger */}
              <PixelButton
                onClick={() => setShowModal(true)}
                className="px-6 py-3 text-base md:text-lg bg-gray-700/80 text-gray-200 shadow-glow border-2 border-white/20 hover:bg-gray-600/90 transition-all"
              >
                <span className="mr-2 font-pixel tracking-wide">VIEW SOURCE</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>

              <PixelButton
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1BmSKe0MUmLMzCcX6l9-5CbHUwoYEP2OK/view?usp=drive_link",
                    "_blank"
                  )
                }
                className="px-6 py-3 text-base md:text-lg bg-gray-700/80 text-gray-200 shadow-glow border-2 border-white/20 hover:bg-gray-600/90 transition-all"
              >
                <span className="mr-2 font-pixel tracking-wide">VIEW RESUME</span>
                <span className="inline-block animate-bounce-right">→</span>
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-xl max-w-md w-full text-center font-pixel">
            {!devAnswer && (
              <>
                <h2 className="text-lg mb-4 text-black">
                  Are you a developer?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDevAnswer("yes")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDevAnswer("no")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {devAnswer === "no" && (
              <>
                <p className="text-sm mt-4 mb-2 text-black">
                  "Source code? That's above your pay grade 😉"
                </p>
                <button
                  onClick={() => {
                    window.open(
                      "https://github.com/pritamjana555/pritam-retro-portfolio",
                      "_blank"
                    );
                    setShowModal(false);
                    setDevAnswer(null);
                  }}
                  className="bg-gray-800 text-white mt-2 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Get me code
                </button>
              </>
            )}

            {devAnswer === "yes" && (
              <>
                <p className="text-sm mt-4 mb-2 text-retro-purple-dark">
                  Real developers need to work for it! <br />
                  <span className="text-xs font-mono text-gray-700">
                    Hint: Open console & look for clues...
                  </span>
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setDevAnswer(null);
                    // Add a hidden clue in the DOM
                    const hiddenClue = document.createElement("div");
                    hiddenClue.id = "dev-clue";
                    hiddenClue.style.display = "none";
                    hiddenClue.setAttribute("data-clue", "help.me()");
                    document.body.appendChild(hiddenClue);

                    // Subtle console hint
                    setTimeout(() => {
                      console.log(
                        "%c🔎 Looking in the right places?",
                        "color: #A78BFA; font-style: italic; font-size: 10px;"
                      );
                    }, 5000);
                  }}
                  className="bg-gray-800 text-white mt-2 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Challenge accepted!
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-sm z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-gray-300 font-pixel mb-1">THANKS FOR PLAYING!</p>
        <motion.a
          href="mailto:pritamjana.code@gmail.com"
          className="text-retro-purple-light font-mono hover:text-retro-purple-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          pritamjana.code@gmail.com
        </motion.a>
      </motion.div>
    </div>
  );
};

export default CompletionScreen;