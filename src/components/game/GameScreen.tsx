import { memo, useEffect, useState, useCallback, useRef } from 'react';
import Horse from './Horse';
import CollectibleHeart from './CollectibleHeart';
import Cloud from './Cloud';
import FloatingHeart from './FloatingHeart';
import MilestonePopup from './MilestonePopup';
import QuestionModal from './QuestionModal';
import FloatingText from './FloatingText';
import { Volume2, VolumeX } from 'lucide-react';

interface Heart {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

interface GameScreenProps {
  onComplete: () => void;
}

const GROUND_HEIGHT = 100;
const HORSE_BOTTOM = GROUND_HEIGHT + 10;
const JUMP_HEIGHT = 150;
const JUMP_DURATION = 500;
const GAME_SPEED = 3;
const HEARTS_NEEDED = 100;

// Milestone messages
const milestoneMessages: Record<number, string> = {
  25: "Okay… now I'm smiling. 😊",
  50: "Halfway there. Still choosing me? 💕",
  75: "At this point you kinda owe me dinner. 🍕",
  90: "Don't stop now. My heart's racing. 💓",
  100: "Alright. You unlocked something important. 🔓",
};

// Question configs
interface QuestionConfig {
  hearts: number;
  title: string;
  options: { label: string; emoji?: string; isCorrect?: boolean }[];
  requireCorrect?: boolean;
}

const questions: QuestionConfig[] = [
  {
    hearts: 30,
    title: "Quick Question",
    options: [
      { label: "The horse", emoji: "🐴" },
      { label: "Me thinking about you", emoji: "💭", isCorrect: true },
    ],
  },
  {
    hearts: 45,
    title: "Very Serious Question",
    options: [
      { label: "You", emoji: "♟️" },
      { label: "Me (after pretending I don't know how to play)", emoji: "😏" },
    ],
  },
  {
    hearts: 60,
    title: "Important Survey",
    options: [
      { label: "Pizza dates", emoji: "🍕" },
      { label: "Long walks", emoji: "🌙" },
      { label: "You + Me + Both", emoji: "💕", isCorrect: true },
    ],
    requireCorrect: true,
  },
  {
    hearts: 85,
    title: "Be honest…",
    options: [
      { label: "Yes", emoji: "😊" },
      { label: "Definitely yes", emoji: "🥰" },
    ],
  },
];

const GameScreen = memo(({ onComplete }: GameScreenProps) => {
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isJumping, setIsJumping] = useState(false);
  const [horseY, setHorseY] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [groundOffset, setGroundOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Milestone state
  const [currentMilestone, setCurrentMilestone] = useState<string | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);
  
  // Question state
  const [currentQuestion, setCurrentQuestion] = useState<QuestionConfig | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  
  // Near-end effects
  const [isNearEnd, setIsNearEnd] = useState(false);
  
  const gameLoopRef = useRef<number>();
  const heartIdRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastHeartTimeRef = useRef(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const shownMilestones = useRef<Set<number>>(new Set());

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    if (!isMuted) {
      audioRef.current.play().catch(() => {});
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (audioRef.current) {
        if (prev) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      return !prev;
    });
  }, []);

  // Check for milestones and questions
  useEffect(() => {
    // Check milestones
    if (milestoneMessages[heartsCollected] && !shownMilestones.current.has(heartsCollected)) {
      shownMilestones.current.add(heartsCollected);
      setCurrentMilestone(milestoneMessages[heartsCollected]);
      setShowMilestone(true);
      setIsPaused(true);
    }
    
    // Check questions
    const question = questions.find(q => q.hearts === heartsCollected);
    if (question && !answeredQuestions.has(heartsCollected)) {
      setTimeout(() => {
        setCurrentQuestion(question);
        setIsPaused(true);
      }, showMilestone ? 2800 : 0);
    }
    
    // Near-end effects (hearts pulse, background warms)
    if (heartsCollected >= 90) {
      setIsNearEnd(true);
    }
  }, [heartsCollected, answeredQuestions, showMilestone]);

  const handleMilestoneDismiss = useCallback(() => {
    setShowMilestone(false);
    setCurrentMilestone(null);
    // Only unpause if no question is pending
    const question = questions.find(q => q.hearts === heartsCollected);
    if (!question || answeredQuestions.has(heartsCollected)) {
      setIsPaused(false);
    }
  }, [heartsCollected, answeredQuestions]);

  const handleQuestionAnswer = useCallback((index: number) => {
    if (!currentQuestion) return;
    
    // If requireCorrect, check if correct
    if (currentQuestion.requireCorrect) {
      const selected = currentQuestion.options[index];
      if (!selected.isCorrect) return; // Don't proceed
    }
    
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.hearts));
    setCurrentQuestion(null);
    setIsPaused(false);
  }, [currentQuestion]);

  // Jump handler
  const handleJump = useCallback(() => {
    if (isJumping || isPaused) return;
    
    setIsJumping(true);
    
    const startTime = Date.now();
    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / JUMP_DURATION, 1);
      const jumpProgress = Math.sin(progress * Math.PI);
      setHorseY(jumpProgress * JUMP_HEIGHT);
      
      if (progress < 1) {
        requestAnimationFrame(animateJump);
      } else {
        setHorseY(0);
        setIsJumping(false);
      }
    };
    
    requestAnimationFrame(animateJump);
  }, [isJumping, isPaused]);

  // Keyboard and touch controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (isPaused) return;
      e.preventDefault();
      handleJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [handleJump, isPaused]);

  // Spawn hearts
  const spawnHeart = useCallback(() => {
    const containerWidth = gameContainerRef.current?.clientWidth || window.innerWidth;
    const heights = [50, 100, 150, 180];
    const y = heights[Math.floor(Math.random() * heights.length)];
    
    const newHeart: Heart = {
      id: heartIdRef.current++,
      x: containerWidth + 50,
      y: GROUND_HEIGHT + y,
      collected: false,
    };
    
    setHearts(prev => [...prev, newHeart]);
  }, []);

  // Game loop
  useEffect(() => {
    if (isPaused) return;

    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn hearts more frequently for 100 target
      if (now - lastHeartTimeRef.current > 800 + Math.random() * 600) {
        if (hearts.filter(h => !h.collected).length < 5) {
          spawnHeart();
        }
        lastHeartTimeRef.current = now;
      }

      // Move hearts and check collisions
      setHearts(prev => {
        return prev.map(heart => {
          if (heart.collected) return heart;
          
          const newX = heart.x - GAME_SPEED;
          
          const horseX = 100;
          const horseTop = HORSE_BOTTOM + horseY;
          const horseBottom = HORSE_BOTTOM + horseY + 80;
          
          const heartLeft = newX - 30;
          const heartRight = newX + 30;
          const heartTop = heart.y - 30;
          const heartBottom = heart.y + 30;
          
          const horizontalOverlap = horseX + 80 > heartLeft && horseX < heartRight;
          const verticalOverlap = horseTop < heartBottom && horseBottom > heartTop;
          
          if (horizontalOverlap && verticalOverlap) {
            setHeartsCollected(c => {
              const newCount = c + 1;
              if (newCount >= HEARTS_NEEDED) {
                setTimeout(onComplete, 1000);
              }
              return newCount;
            });
            return { ...heart, collected: true };
          }
          
          return { ...heart, x: newX };
        }).filter(heart => heart.x > -50 || heart.collected);
      });

      setGroundOffset(prev => (prev + GAME_SPEED) % 100);
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [horseY, onComplete, spawnHeart, hearts, isPaused]);

  return (
    <div 
      ref={gameContainerRef}
      className={`relative min-h-screen w-full overflow-hidden cursor-pointer select-none transition-all duration-1000 ${
        isNearEnd ? 'bg-gradient-to-b from-pink-200 via-pink-100 to-pink-50' : 'bg-valentine-sky'
      }`}
      onClick={handleJump}
    >
      {/* Background clouds */}
      <Cloud left="10%" top="10%" size="lg" delay={0} />
      <Cloud left="60%" top="5%" size="md" delay={1} />
      <Cloud left="80%" top="20%" size="sm" delay={2} />
      <Cloud left="30%" top="15%" size="md" delay={0.5} />
      
      {/* Background floating hearts */}
      <FloatingHeart left="15%" top="25%" size={20} delay={0} opacity={0.3} />
      <FloatingHeart left="75%" top="20%" size={24} delay={0.5} opacity={0.3} />
      <FloatingHeart left="45%" top="30%" size={18} delay={1} opacity={0.25} />

      {/* Floating romantic text */}
      <FloatingText triggerChange={heartsCollected} />

      {/* UI - Hearts counter */}
      <div className="absolute top-4 left-4 z-20 bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2 font-display text-lg text-foreground">
          <span className={`text-2xl ${isNearEnd ? 'animate-pulse' : ''}`}>❤️</span>
          <span>{heartsCollected} / {HEARTS_NEEDED}</span>
        </div>
        <p className="text-xs text-muted-foreground font-body mt-1">
          every heart brings you closer to me
        </p>
      </div>

      {/* Mute button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute top-4 right-4 z-20 bg-card/80 backdrop-blur-sm rounded-full p-3 shadow-soft hover:scale-110 transition-transform"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </button>

      {/* Milestone Popup */}
      <MilestonePopup 
        message={currentMilestone || ''} 
        isVisible={showMilestone}
        onDismiss={handleMilestoneDismiss}
      />

      {/* Question Modal */}
      {currentQuestion && (
        <QuestionModal
          title={currentQuestion.title}
          options={currentQuestion.options}
          onAnswer={handleQuestionAnswer}
          isVisible={true}
          requireCorrect={currentQuestion.requireCorrect}
        />
      )}

      {/* Game area */}
      <div className="absolute inset-0">
        {/* Collectible hearts */}
        {hearts.map(heart => (
          <CollectibleHeart
            key={heart.id}
            x={heart.x}
            y={heart.y}
            collected={heart.collected}
            isPulsing={isNearEnd}
          />
        ))}

        {/* Horse */}
        <div
          className="absolute left-20"
          style={{
            bottom: `${HORSE_BOTTOM + horseY}px`,
            transition: 'none',
          }}
        >
          <Horse isJumping={isJumping} isRunning={!isJumping && !isPaused} />
        </div>
      </div>

      {/* Ground */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-valentine-ground"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            hsl(340, 60%, 80%) 0px,
            hsl(340, 50%, 85%) 50px,
            hsl(340, 60%, 80%) 100px
          )`,
          backgroundPosition: `-${groundOffset}px 0`,
        }}
      />
      <div className="absolute bottom-20 left-0 right-0 h-6 bg-gradient-to-t from-ground to-transparent" />
      
      {/* Grass tufts */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-around">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-8 bg-ground-highlight rounded-t-full opacity-60"
            style={{ transform: `translateY(${Math.sin(i) * 4}px)` }}
          />
        ))}
      </div>
    </div>
  );
});

GameScreen.displayName = 'GameScreen';

export default GameScreen;
