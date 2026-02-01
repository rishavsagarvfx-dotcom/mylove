import { useState, useCallback } from 'react';
import LandingScreen from './LandingScreen';
import GameScreen from './GameScreen';
import ProposalScreen from './ProposalScreen';
import CelebrationScreen from './CelebrationScreen';

type GameState = 'landing' | 'playing' | 'proposal' | 'celebration';

const ValentineGame = () => {
  const [gameState, setGameState] = useState<GameState>('landing');

  const handleStart = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleComplete = useCallback(() => {
    setGameState('proposal');
  }, []);

  const handleAccept = useCallback(() => {
    setGameState('celebration');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState('landing');
  }, []);

  switch (gameState) {
    case 'landing':
      return <LandingScreen onStart={handleStart} />;
    case 'playing':
      return <GameScreen onComplete={handleComplete} />;
    case 'proposal':
      return <ProposalScreen onAccept={handleAccept} />;
    case 'celebration':
      return <CelebrationScreen onPlayAgain={handlePlayAgain} />;
    default:
      return <LandingScreen onStart={handleStart} />;
  }
};

export default ValentineGame;
