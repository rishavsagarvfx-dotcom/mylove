import { memo } from 'react';

interface QuestionOption {
  label: string;
  emoji?: string;
  isCorrect?: boolean; // If true, only this option proceeds
}

interface QuestionModalProps {
  title: string;
  options: QuestionOption[];
  onAnswer: (index: number) => void;
  isVisible: boolean;
  requireCorrect?: boolean; // If true, only correct option proceeds
}

const QuestionModal = memo(({ title, options, onAnswer, isVisible, requireCorrect }: QuestionModalProps) => {
  if (!isVisible) return null;

  const handleClick = (index: number) => {
    const option = options[index];
    // If requireCorrect is true, only allow correct option to proceed
    if (requireCorrect && !option.isCorrect) {
      // Shake animation or feedback could go here
      return;
    }
    onAnswer(index);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card rounded-3xl px-8 py-8 shadow-soft animate-bounce-in max-w-md mx-4 w-full">
        <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-6">
          {title}
        </h3>
        
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="btn-valentine text-base md:text-lg py-3 hover:scale-105 transition-transform"
            >
              {option.emoji && <span className="mr-2">{option.emoji}</span>}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

QuestionModal.displayName = 'QuestionModal';

export default QuestionModal;
