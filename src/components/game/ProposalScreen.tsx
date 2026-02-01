import { memo, useState, useEffect } from 'react';
import FloatingHeart from './FloatingHeart';
import Cloud from './Cloud';
import Sparkle from './Sparkle';

interface ProposalScreenProps {
  onAccept: () => void;
}

const ProposalScreen = memo(({ onAccept }: ProposalScreenProps) => {
  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Typewriter sequence
    const timer1 = setTimeout(() => setLine1Visible(true), 500);
    const timer2 = setTimeout(() => setLine2Visible(true), 2500);
    const timer3 = setTimeout(() => setQuestionVisible(true), 4500);
    const timer4 = setTimeout(() => setButtonsVisible(true), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-valentine-sky flex items-center justify-center">
      {/* Magical overlay */}
      <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm" />

      {/* Extra floating hearts for magical moment */}
      {[...Array(20)].map((_, i) => (
        <FloatingHeart
          key={i}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          size={16 + Math.random() * 20}
          delay={Math.random() * 2}
          duration={3 + Math.random() * 2}
          opacity={0.4 + Math.random() * 0.3}
        />
      ))}

      {/* Background clouds */}
      <Cloud left="5%" top="10%" size="lg" delay={0} />
      <Cloud left="80%" top="15%" size="md" delay={1} />
      <Cloud left="20%" top="25%" size="sm" delay={0.5} />

      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <Sparkle
          key={i}
          left={`${10 + Math.random() * 80}%`}
          top={`${10 + Math.random() * 80}%`}
          delay={Math.random() * 2}
          color={Math.random() > 0.5 ? 'gold' : 'pink'}
          size={10 + Math.random() * 10}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Line 1 */}
        {line1Visible && (
          <p className="font-display text-xl md:text-2xl text-foreground mb-4 animate-fade-in-up">
            You caught all my love.
          </p>
        )}

        {/* Line 2 */}
        {line2Visible && (
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up">
            Now there's just one thing left…
          </p>
        )}

        {/* The Question */}
        {questionVisible && (
          <div className="animate-bounce-in mb-10">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-shadow-glow mb-2">
              Will you be my Valentine?
            </h1>
            <span className="text-5xl">💌</span>
          </div>
        )}

        {/* Buttons */}
        {buttonsVisible && (
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <button
              onClick={onAccept}
              className="btn-valentine text-lg animate-wiggle hover:animate-none"
            >
              Yes ❤️
            </button>
            <button
              onClick={onAccept}
              className="btn-valentine text-lg animate-wiggle hover:animate-none"
              style={{ animationDelay: '0.5s' }}
            >
              Obviously Yes 😅
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

ProposalScreen.displayName = 'ProposalScreen';

export default ProposalScreen;
