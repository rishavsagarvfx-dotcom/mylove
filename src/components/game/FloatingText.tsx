import { memo, useEffect, useState } from 'react';

const floatingMessages = [
  "Fun fact: I like you more with every jump.",
  "This horse believes in us.",
  "Missed a heart? It's okay. I won't.",
  "You're doing great. Just like in real life.",
  "If love had levels, you'd be maxed out.",
  "Collecting hearts like you collected mine.",
  "Plot twist: I was the prize all along.",
  "Careful… I'm getting attached.",
  "One day we're going to play chess for hours.",
  "I'm buying you pink roses. Every time.",
  "I promise to listen to your stories, even the long ones.",
  "Future us is laughing somewhere right now.",
  "This horse ships us.",
  "You talk. I listen. Deal.",
  "We're building memories, one heart at a time.",
  "Plot twist: we grow old together.",
  "I already picked our favorite café.",
  "You bring the smiles. I'll bring the snacks.",
  "Somewhere in the future… it's us.",
];

interface FloatingTextProps {
  triggerChange: number; // Changes to trigger new message
}

const FloatingText = memo(({ triggerChange }: FloatingTextProps) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: '20%', left: '50%' });

  useEffect(() => {
    if (triggerChange > 0 && triggerChange % 8 === 0) {
      const randomMessage = floatingMessages[Math.floor(Math.random() * floatingMessages.length)];
      const randomTop = 15 + Math.random() * 25;
      const randomLeft = 20 + Math.random() * 60;
      
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
      setCurrentMessage(randomMessage);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [triggerChange]);

  if (!isVisible || !currentMessage) return null;

  return (
    <div
      className="absolute z-20 pointer-events-none animate-fade-in-up"
      style={{ 
        top: position.top, 
        left: position.left,
        transform: 'translateX(-50%)',
        animation: 'fadeInUp 0.5s ease-out, fadeOut 0.5s ease-in 3s forwards'
      }}
    >
      <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-soft max-w-xs">
        <p className="font-body text-sm md:text-base text-muted-foreground text-center italic">
          "{currentMessage}"
        </p>
      </div>
    </div>
  );
});

FloatingText.displayName = 'FloatingText';

export default FloatingText;
