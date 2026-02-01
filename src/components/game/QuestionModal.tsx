import { memo, useEffect, useState } from 'react';

interface QuestionOption {
  label: string;
  emoji?: string;
  isCorrect?: boolean;
}

interface QuestionModalProps {
  title: string;
  subtitle?: string;
  options: QuestionOption[];
  onAnswer: (index: number) => void;
  isVisible: boolean;
  requireCorrect?: boolean;
  autoSelectIndex?: number;
}

const QuestionModal = memo(({ 
  title, 
  subtitle,
  options, 
  onAnswer, 
  isVisible, 
  requireCorrect,
  autoSelectIndex 
}: QuestionModalProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showAutoSelect, setShowAutoSelect] = useState(false);

  useEffect(() => {
    if (isVisible && autoSelectIndex !== undefined) {
      // After 1.5s, highlight the auto-select option
      const highlightTimer = setTimeout(() => {
        setHighlightedIndex(autoSelectIndex);
        setShowAutoSelect(true);
      }, 1500);

      // After 2.5s, auto-select it
      const selectTimer = setTimeout(() => {
        onAnswer(autoSelectIndex);
      }, 2500);

      return () => {
        clearTimeout(highlightTimer);
        clearTimeout(selectTimer);
      };
    }
  }, [isVisible, autoSelectIndex, onAnswer]);

  if (!isVisible) return null;

  const handleClick = (index: number) => {
    const option = options[index];
    if (requireCorrect && !option.isCorrect) {
      return;
    }
    onAnswer(index);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card rounded-3xl px-8 py-8 shadow-soft animate-bounce-in max-w-md mx-4 w-full">
        <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-2">
          {title}
        </h3>
        
        {subtitle && (
          <p className="font-body text-lg text-muted-foreground text-center mb-6">
            {subtitle}
          </p>
        )}
        
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`btn-valentine text-base md:text-lg py-3 transition-all ${
                highlightedIndex === index 
                  ? 'scale-110 ring-4 ring-primary/50 animate-pulse' 
                  : 'hover:scale-105'
              }`}
            >
              {option.emoji && <span className="mr-2">{option.emoji}</span>}
              {option.label}
            </button>
          ))}
        </div>

        {showAutoSelect && autoSelectIndex !== undefined && (
          <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in-up">
            (Obviously this one 💕)
          </p>
        )}
      </div>
    </div>
  );
});

QuestionModal.displayName = 'QuestionModal';

export default QuestionModal;
