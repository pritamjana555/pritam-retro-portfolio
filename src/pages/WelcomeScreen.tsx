import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import BgImage from "../assets/images/welcome-background.jpg"

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden z-20"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* // add a black masking layer to the background image */}
      <div className="absolute inset-0 bg-black opacity-20 -z-10" />      
           
      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl mb-2 text-white font-bold pixel-font drop-shadow-glow">WELCOME</h1>
        <h2 className="text-3xl md:text-4xl text-retro-purple-light font-bold pixel-font drop-shadow-glow">PLAYER</h2>
      </motion.div>
     
      <motion.div
        className="mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="mb-2 text-center text-sm text-white font-bold drop-shadow-glow">PRESS BELOW BUTTON TO</p>
        <PixelButton
          onClick={onStart}
          className="px-12 mx-24 py-3 text-lg bg-opacity-90"
        >
          START
        </PixelButton>
      </motion.div>
     
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
    </div>
  );
};

export default WelcomeScreen;
