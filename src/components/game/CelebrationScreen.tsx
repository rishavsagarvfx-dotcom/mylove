import { memo, useState } from 'react';
import Confetti from './Confetti';
import FloatingHeart from './FloatingHeart';
import Sparkle from './Sparkle';
import Horse from './Horse';

interface CelebrationScreenProps {
  onPlayAgain: () => void;
}

const CelebrationScreen = memo(({ onPlayAgain }: CelebrationScreenProps) => {
  const [horseTaps, setHorseTaps] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleHorseTap = () => {
    const newTaps = horseTaps + 1;
    setHorseTaps(newTaps);
    if (newTaps >= 5 && !showEasterEgg) {
      setShowEasterEgg(true);
    }
  };

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
        {/* Status badge */}
        <div 
          className="bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-soft mb-6 animate-bounce-in rotate-[-3deg]"
        >
          <span className="font-display text-xl text-primary">
            Valentine Status: Locked In ✅
          </span>
        </div>

        {/* Happy jumping horse - tappable for easter egg */}
        <div 
          className="mb-6 cursor-pointer transition-transform hover:scale-110"
          onClick={handleHorseTap}
        >
          <Horse isJumping={false} isRunning={false} isCelebrating={true} hasBlush={true} />
        </div>

        {/* Easter egg popup */}
        {showEasterEgg && (
          <div className="bg-accent/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-soft mb-4 animate-bounce-in">
            <p className="font-body text-sm text-accent-foreground">
              "Okay fine… I already imagined our house." 🏠💕
            </p>
          </div>
        )}

        {/* Main message */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-shadow-glow animate-bounce-in">
          Thank you for choosing me.
        </h1>

        {/* Promises */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-soft mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            I promise pink roses.<br />
            Chess games.<br />
            Late-night stories.<br />
            Quiet hugs.<br />
            Big laughs.<br />
            And a future where we grow together.
          </p>
        </div>

        {/* Welcome message */}
        <p className="font-display text-xl md:text-2xl text-primary mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Welcome to us. 💕
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={() => {
              // Just show instruction - no actual share
              alert('Take a screenshot and send it to me! 💕');
            }}
            className="btn-valentine text-base"
          >
            📸 Screenshot this & send it to me
          </button>
          <button
            onClick={onPlayAgain}
            className="btn-valentine text-base bg-secondary hover:bg-secondary/80"
            style={{ background: 'hsl(var(--secondary))' }}
          >
            🔁 Play Again (because I like watching you win)
          </button>
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-valentine-ground" />
    </div>
  );
});

CelebrationScreen.displayName = 'CelebrationScreen';

export default CelebrationScreen;
