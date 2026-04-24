import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import LevelTransition from '../components/LevelTransition';
import WelcomeScreen from './WelcomeScreen';
import AboutScreen from './AboutScreen';
import SkillsScreen from './SkillsScreen';
import ExperienceScreen from './ExperienceScreen';
import ProjectScreen from './ProjectScreen';
import CompletionScreen from './CompletionScreen';

type GameState =
  | 'loading'
  | 'welcome'
  | 'level1-transition'
  | 'about'
  | 'level2-transition'
  | 'skills'
  | 'level3-transition'
  | 'experience'
  | 'level4-transition'
  | 'projects'
  | 'completion';

const screenFlow: GameState[] = [
  'welcome',
  'level1-transition',
  'about',
  'level2-transition',
  'skills',
  'level3-transition',
  'experience',
  'level4-transition',
  'projects',
  'completion',
];

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('loading');
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const goToState = (state: GameState, dir: 'forward' | 'backward') => {
    setDirection(dir);
    setGameState(state);
  };

  const handleLoadingComplete = () => {
    goToState('welcome', 'forward');
  };

  const handleStartGame = () => {
    goToState('level1-transition', 'forward');
  };

  const handleAboutComplete = () => {
    goToState('level2-transition', 'forward');
  };

  const handleSkillsComplete = () => {
    goToState('level3-transition', 'forward');
  };

  const handleExperienceComplete = () => {
    goToState('level4-transition', 'forward');
  };

  const handleProjectsComplete = () => {
    goToState('completion', 'forward');
  };

  const handleRestart = () => {
    goToState('welcome', 'forward');
  };

  const handlePrev = () => {
    const index = screenFlow.indexOf(gameState);
    if (index > 0) {
      goToState(screenFlow[index - 2], 'backward');
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'loading' && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <WelcomeScreen onStart={handleStartGame} />
        )}

        {gameState === 'level1-transition' && (
          <LevelTransition
            level={1}
            levelName="ABOUT ME"
            direction={direction}
            onTransitionComplete={() => goToState('about', direction)}
          />
        )}

        {gameState === 'about' && (
          <AboutScreen onNext={handleAboutComplete} onPrev={handlePrev} />
        )}

        {gameState === 'level2-transition' && (
          <LevelTransition
            level={2}
            levelName="EXPLORE MY SKILLS"
            direction={direction}
            onTransitionComplete={() => goToState('skills', direction)}
          />
        )}

        {gameState === 'skills' && (
          <SkillsScreen onNext={handleSkillsComplete} onPrev={handlePrev} />
        )}

        {gameState === 'level3-transition' && (
          <LevelTransition
            level={3}
            levelName="EXPERIENCE LOGS"
            direction={direction}
            onTransitionComplete={() => goToState('experience', direction)}
          />
        )}

        {gameState === 'experience' && (
          <ExperienceScreen onNext={handleExperienceComplete} onPrev={handlePrev} />
        )}

        {gameState === 'level4-transition' && (
          <LevelTransition
            level={4}
            levelName="PROJECTS"
            direction={direction}
            onTransitionComplete={() => goToState('projects', direction)}
          />
        )}

        {gameState === 'projects' && (
          <ProjectScreen onNext={handleProjectsComplete} onPrev={handlePrev} />
        )}

        {gameState === 'completion' && (
          <CompletionScreen onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
