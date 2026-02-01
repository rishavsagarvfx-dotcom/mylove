import { memo, useMemo } from 'react';

interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  duration: number;
  color: string;
  size: number;
  isHeart: boolean;
}

const Confetti = memo(() => {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    const colors = [
      'hsl(340, 75%, 65%)', // Pink
      'hsl(350, 85%, 60%)', // Red-pink
      'hsl(280, 40%, 70%)', // Lavender
      'hsl(45, 100%, 70%)', // Gold
      'hsl(0, 0%, 100%)',   // White
    ];

    return [...Array(50)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 12,
      isHeart: Math.random() > 0.6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: piece.left,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {piece.isHeart ? (
            <svg
              width={piece.size}
              height={piece.size}
              viewBox="0 0 24 24"
              fill={piece.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
});

Confetti.displayName = 'Confetti';

export default Confetti;
