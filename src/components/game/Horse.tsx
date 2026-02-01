import { memo } from 'react';
import horseImage from '@/assets/horse.png';

interface HorseProps {
  isJumping: boolean;
  isRunning: boolean;
  isCelebrating?: boolean;
}

const Horse = memo(({ isJumping, isRunning, isCelebrating }: HorseProps) => {
  let animationClass = 'horse-idle';
  
  if (isJumping) {
    animationClass = 'horse-jump';
  } else if (isCelebrating) {
    animationClass = 'animate-bounce-gentle';
  } else if (isRunning) {
    animationClass = 'horse-run';
  }

  return (
    <div 
      className={`relative ${animationClass}`}
      style={{ width: '120px', height: '120px' }}
    >
      <img 
        src={horseImage} 
        alt="Cute pink horse" 
        className="w-full h-full object-contain drop-shadow-lg"
        style={{ transform: 'scaleX(-1)' }} // Face right
      />
      
      {/* Sparkle trail when jumping */}
      {isJumping && (
        <>
          <div 
            className="absolute -left-4 top-1/2 w-3 h-3 bg-sparkle-pink rounded-full animate-sparkle"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute -left-8 top-1/3 w-2 h-2 bg-sparkle rounded-full animate-sparkle"
            style={{ animationDelay: '0.1s' }}
          />
          <div 
            className="absolute -left-6 top-2/3 w-2 h-2 bg-heart-glow rounded-full animate-sparkle"
            style={{ animationDelay: '0.2s' }}
          />
        </>
      )}
    </div>
  );
});

Horse.displayName = 'Horse';

export default Horse;
