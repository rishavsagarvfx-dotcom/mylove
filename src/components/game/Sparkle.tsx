import { memo } from 'react';

interface SparkleProps {
  size?: number;
  left: string;
  top: string;
  delay?: number;
  color?: 'gold' | 'pink';
}

const Sparkle = memo(({ size = 12, left, top, delay = 0, color = 'gold' }: SparkleProps) => {
  const colorClass = color === 'gold' ? 'text-sparkle' : 'text-sparkle-pink';
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        top,
        animation: `sparkle 1.5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={colorClass}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  );
});

Sparkle.displayName = 'Sparkle';

export default Sparkle;
