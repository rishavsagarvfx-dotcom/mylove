import { memo, useEffect, useState, useCallback, useRef } from 'react';
import Horse from './Horse';
import CollectibleHeart from './CollectibleHeart';
import Cloud from './Cloud';
import FloatingHeart from './FloatingHeart';
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
const HEARTS_NEEDED = 7;

const progressMessages: Record<number, string> = {
  1: "okay this is adorable 🥺",
  3: "you're kinda pro at this 😏",
  5: "almost there… 💕",
  6: "one more… one more… 🤞",
};

const GameScreen = memo(({ onComplete }: GameScreenProps) => {
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isJumping, setIsJumping] = useState(false);
  const [horseY, setHorseY] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [groundOffset, setGroundOffset] = useState(0);
  
  const gameLoopRef = useRef<number>();
  const heartIdRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastHeartTimeRef = useRef(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    if (!isMuted) {
      audioRef.current.play().catch(() => {
        // Auto-play blocked, that's okay
      });
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

  // Update message based on hearts collected
  useEffect(() => {
    if (progressMessages[heartsCollected]) {
      setCurrentMessage(progressMessages[heartsCollected]);
    }
  }, [heartsCollected]);

  // Jump handler
  const handleJump = useCallback(() => {
    if (isJumping) return;
    
    setIsJumping(true);
    
    // Animate jump up
    const startTime = Date.now();
    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / JUMP_DURATION, 1);
      
      // Parabolic motion
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
  }, [isJumping]);

  // Keyboard and touch controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      handleJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [handleJump]);

  // Spawn hearts
  const spawnHeart = useCallback(() => {
    const containerWidth = gameContainerRef.current?.clientWidth || window.innerWidth;
    const heights = [50, 100, 150, 180]; // Different heights for variety
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
    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn hearts periodically (every 1.5-2.5 seconds)
      if (now - lastHeartTimeRef.current > 1500 + Math.random() * 1000) {
        if (hearts.filter(h => !h.collected).length < 3) {
          spawnHeart();
        }
        lastHeartTimeRef.current = now;
      }

      // Move hearts and check collisions
      setHearts(prev => {
        return prev.map(heart => {
          if (heart.collected) return heart;
          
          const newX = heart.x - GAME_SPEED;
          
          // Collision detection (generous hitbox)
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
                setTimeout(onComplete, 500);
              }
              return newCount;
            });
            return { ...heart, collected: true };
          }
          
          return { ...heart, x: newX };
        }).filter(heart => heart.x > -50 || heart.collected);
      });

      // Animate ground scroll
      setGroundOffset(prev => (prev + GAME_SPEED) % 100);
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [horseY, onComplete, spawnHeart, hearts]);

  return (
    <div 
      ref={gameContainerRef}
      className="relative min-h-screen w-full overflow-hidden bg-valentine-sky cursor-pointer select-none"
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

      {/* UI - Hearts counter */}
      <div className="absolute top-4 left-4 z-20 bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2 font-display text-lg text-foreground">
          <span className="text-2xl">❤️</span>
          <span>{heartsCollected} / {HEARTS_NEEDED}</span>
        </div>
        {currentMessage && (
          <p className="text-sm text-muted-foreground font-body mt-1 animate-fade-in-up">
            {currentMessage}
          </p>
        )}
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

      {/* Game area */}
      <div className="absolute inset-0">
        {/* Collectible hearts */}
        {hearts.map(heart => (
          <CollectibleHeart
            key={heart.id}
            x={heart.x}
            y={heart.y}
            collected={heart.collected}
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
          <Horse isJumping={isJumping} isRunning={!isJumping} />
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
