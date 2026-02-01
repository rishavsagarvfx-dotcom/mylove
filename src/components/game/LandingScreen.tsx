import { memo } from 'react';
import FloatingHeart from './FloatingHeart';
import Cloud from './Cloud';
import Sparkle from './Sparkle';
import Horse from './Horse';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = memo(({ onStart }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-valentine-sky flex flex-col items-center justify-center px-4">
      {/* Background decorations */}
      <Cloud left="5%" top="10%" size="lg" delay={0} text="love" />
      <Cloud left="75%" top="8%" size="md" delay={1} text="yours" />
      <Cloud left="85%" top="25%" size="sm" delay={2} />
      <Cloud left="15%" top="30%" size="md" delay={0.5} text="always" />
      <Cloud left="60%" top="35%" size="sm" delay={1.5} />
      
      {/* Floating hearts */}
      <FloatingHeart left="10%" top="20%" size={28} delay={0} opacity={0.5} />
      <FloatingHeart left="85%" top="15%" size={20} delay={0.5} opacity={0.4} />
      <FloatingHeart left="25%" top="60%" size={24} delay={1} opacity={0.5} />
      <FloatingHeart left="70%" top="55%" size={32} delay={1.5} opacity={0.6} />
      <FloatingHeart left="50%" top="75%" size={18} delay={0.8} opacity={0.4} />
      <FloatingHeart left="90%" top="70%" size={22} delay={0.3} opacity={0.5} />
      <FloatingHeart left="5%" top="50%" size={26} delay={1.2} opacity={0.5} />
      
      {/* Sparkles */}
      <Sparkle left="20%" top="15%" delay={0} color="gold" />
      <Sparkle left="80%" top="30%" delay={0.5} color="pink" />
      <Sparkle left="40%" top="25%" delay={1} color="gold" />
      <Sparkle left="65%" top="65%" delay={0.3} color="pink" />
      <Sparkle left="30%" top="80%" delay={0.8} color="gold" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Horse with idle animation */}
        <div className="mb-6 animate-bounce-gentle">
          <Horse isJumping={false} isRunning={false} />
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 text-shadow-soft">
          Horse Jump, Heart Hunt
        </h1>
        <span className="text-3xl md:text-4xl mb-4">🐴❤️</span>

        {/* Subtitle */}
        <p className="font-display text-lg md:text-xl text-primary mb-2">
          A tiny game. A big question.
        </p>

        {/* Supporting line */}
        <p className="font-body text-base md:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
          Catch 100 hearts to unlock secrets, smiles, and something I've been wanting to ask you.
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          className="btn-valentine text-xl md:text-2xl animate-wiggle hover:animate-none"
        >
          💖 Start Our Little Adventure
        </button>

        {/* Warning micro text */}
        <p className="mt-4 text-sm text-muted-foreground font-body italic">
          Warning: may cause blushing.
        </p>

        {/* Control hint */}
        <p className="mt-6 text-xs text-muted-foreground/70 font-body">
          Tap or press Space to jump
        </p>
      </div>

      {/* Ground decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-valentine-ground" />
      <div className="absolute bottom-20 left-0 right-0 h-4 bg-ground-highlight/50 rounded-t-full" />
    </div>
  );
});

LandingScreen.displayName = 'LandingScreen';

export default LandingScreen;
