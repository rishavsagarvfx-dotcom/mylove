import { memo, useState, useEffect } from 'react';
import FloatingHeart from './FloatingHeart';
import Sparkle from './Sparkle';

interface ProposalScreenProps {
  onAccept: () => void;
}

type ProposalStage = 'intro' | 'proper';

const ProposalScreen = memo(({ onAccept }: ProposalScreenProps) => {
  const [stage, setStage] = useState<ProposalStage>('intro');
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (stage === 'intro') {
      // Staggered reveal
      const t1 = setTimeout(() => setShowLine1(true), 500);
      const t2 = setTimeout(() => setShowLine2(true), 2000);
      const t3 = setTimeout(() => setShowQuestion(true), 3500);
      const t4 = setTimeout(() => setShowButtons(true), 4500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [stage]);

  const handleAskProperly = () => {
    setStage('proper');
  };

  const renderIntroStage = () => (
    <div className="flex flex-col items-center text-center px-6 max-w-lg">
      {/* Achievement header */}
      <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-soft mb-8 animate-bounce-in">
        <span className="font-display text-lg text-primary">
          🏆 Achievement Unlocked: My Favorite Person
        </span>
      </div>

      {/* Line 1 */}
      {showLine1 && (
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in-up">
          You collected 100 hearts.
        </p>
      )}

      {/* Line 2 */}
      {showLine2 && (
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up">
          But honestly… I gave you mine way earlier.
        </p>
      )}

      {/* Main question */}
      {showQuestion && (
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 text-shadow-glow animate-bounce-in">
          So… will you be my Valentine?
        </h1>
      )}

      {/* Buttons */}
      {showButtons && (
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
          <button
            onClick={onAccept}
            className="btn-valentine text-lg animate-wiggle hover:animate-none"
          >
            💖 Yes, obviously
          </button>
          <button
            onClick={handleAskProperly}
            className="btn-valentine text-lg"
            style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }}
          >
            💌 Ask me properly
          </button>
        </div>
      )}
    </div>
  );

  const renderProperStage = () => (
    <div className="flex flex-col items-center text-center px-6 max-w-lg animate-fade-in-up">
      {/* Title */}
      <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
        Okay. Here it is.
      </h2>

      {/* Promises */}
      <div className="bg-card/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-soft mb-8">
        <p className="font-display text-lg text-primary mb-4">I promise:</p>
        <ul className="font-body text-base md:text-lg text-muted-foreground space-y-3 text-left">
          <li>🌸 To buy you your favorite pink roses.</li>
          <li>♟️ To play chess with you for the rest of our lives.</li>
          <li>🌙 To listen to every story you tell, even when it's midnight.</li>
          <li>🤗 To hold you on hard days.</li>
          <li>😂 To laugh with you on easy ones.</li>
          <li>🏠 To build something real together.</li>
        </ul>
        
        <p className="font-body text-lg text-muted-foreground mt-6 italic">
          And someday…
        </p>
        <p className="font-display text-xl text-primary mt-2">
          Our own little family.
        </p>
      </div>

      {/* So once more */}
      <p className="font-body text-lg text-muted-foreground mb-6">
        So once more…
      </p>

      {/* Final buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onAccept}
          className="btn-valentine text-lg animate-wiggle hover:animate-none"
        >
          🌸 Yes
        </button>
        <button
          onClick={onAccept}
          className="btn-valentine text-lg"
        >
          🌷 Of course yes
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-valentine-sky flex items-center justify-center">
      {/* Extra floating hearts for magical moment */}
      {[...Array(20)].map((_, i) => (
        <FloatingHeart
          key={i}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          size={16 + Math.random() * 20}
          delay={Math.random() * 2}
          opacity={0.4 + Math.random() * 0.3}
        />
      ))}

      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <Sparkle
          key={i}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          delay={Math.random() * 2}
          color={Math.random() > 0.5 ? 'gold' : 'pink'}
          size={10 + Math.random() * 10}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {stage === 'intro' && renderIntroStage()}
        {stage === 'proper' && renderProperStage()}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-valentine-ground" />
    </div>
  );
});

ProposalScreen.displayName = 'ProposalScreen';

export default ProposalScreen;
