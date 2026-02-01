import { memo } from 'react';
import Confetti from './Confetti';
import FloatingHeart from './FloatingHeart';
import Sparkle from './Sparkle';
import Horse from './Horse';

interface CelebrationScreenProps {
  onPlayAgain: () => void;
}

const CelebrationScreen = memo(({ onPlayAgain }: CelebrationScreenProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-valentine-sky flex items-center justify-center">
      {/* Confetti */}
      <Confetti />

      {/* Heart rain */}
      {[...Array(30)].map((_, i) => (
        <FloatingHeart
          key={i}
          left={`${Math.random() * 100}%`}
          top={`${-10 + Math.random() * 120}%`}
          size={12 + Math.random() * 24}
          delay={Math.random() * 3}
          duration={4 + Math.random() * 3}
          opacity={0.5 + Math.random() * 0.4}
        />
      ))}

      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <Sparkle
          key={i}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          delay={Math.random() * 2}
          color={Math.random() > 0.5 ? 'gold' : 'pink'}
          size={8 + Math.random() * 12}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Happy jumping horse */}
        <div className="mb-6">
          <Horse isJumping={false} isRunning={false} isCelebrating={true} />
        </div>

        {/* Main message */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-shadow-glow animate-bounce-in">
          Thank you for choosing me.
        </h1>

        {/* Promise */}
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          I promise unlimited hugs, emotional support, bad jokes, and a future full of love.
        </p>

        {/* Valentine approved stamp */}
        <div 
          className="bg-card/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-soft mb-6 animate-bounce-in rotate-[-5deg]"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="font-display text-primary text-lg">
            Valentine Approved ✅
          </span>
        </div>

        {/* Screenshot hint */}
        <p className="font-body text-sm text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          Screenshot this and send it to me ❤️
        </p>

        {/* Play again button */}
        <button
          onClick={onPlayAgain}
          className="btn-valentine text-lg animate-fade-in-up"
          style={{ animationDelay: '1s' }}
        >
          Play Again 🔄
        </button>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-valentine-ground" />
    </div>
  );
});

CelebrationScreen.displayName = 'CelebrationScreen';

export default CelebrationScreen;
