import { memo, useEffect, useState } from 'react';

interface MilestonePopupProps {
  message: string;
  isVisible: boolean;
  onDismiss?: () => void;
}

const MilestonePopup = memo(({ message, isVisible, onDismiss }: MilestonePopupProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="bg-card/95 backdrop-blur-md rounded-3xl px-8 py-6 shadow-soft animate-bounce-in max-w-sm mx-4">
        <p className="font-display text-xl md:text-2xl text-foreground text-center">
          {message}
        </p>
      </div>
    </div>
  );
});

MilestonePopup.displayName = 'MilestonePopup';

export default MilestonePopup;
