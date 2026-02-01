import { memo, useState } from 'react';

interface CollectibleHeartProps {
  x: number;
  y: number;
  collected: boolean;
  onCollect?: () => void;
}

const CollectibleHeart = memo(({ x, y, collected }: CollectibleHeartProps) => {
  const [showPop, setShowPop] = useState(false);

  // Trigger pop animation when collected
  if (collected && !showPop) {
    setShowPop(true);
  }

  if (showPop) {
    return (
      <div
        className="absolute pointer-events-none heart-pop"
        style={{
          left: `${x}px`,
          bottom: `${y}px`,
          transform: 'translate(-50%, 50%)',
        }}
      >
        <svg
          width={40}
          height={40}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-heart"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {/* Sparkle burst */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-sparkle rounded-full"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-20px)`,
                animation: 'sparkle 0.4s ease-out forwards',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute pointer-events-none heart-pulse"
      style={{
        left: `${x}px`,
        bottom: `${y}px`,
        transform: 'translate(-50%, 50%)',
      }}
    >
      <div className="relative">
        <svg
          width={36}
          height={36}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-heart drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 0 10px hsl(350 90% 65% / 0.5))' }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {/* Glossy effect */}
        <div className="absolute top-1 left-2 w-3 h-2 bg-white/40 rounded-full" />
      </div>
    </div>
  );
});

CollectibleHeart.displayName = 'CollectibleHeart';

export default CollectibleHeart;
