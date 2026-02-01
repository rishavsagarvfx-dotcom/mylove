import { memo } from 'react';

interface CloudProps {
  size?: 'sm' | 'md' | 'lg';
  left: string;
  top: string;
  delay?: number;
  text?: string;
}

const Cloud = memo(({ size = 'md', left, top, delay = 0, text }: CloudProps) => {
  const sizeMap = {
    sm: 'w-16 h-10',
    md: 'w-24 h-14',
    lg: 'w-32 h-18',
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        top,
        animation: `cloudFloat 8s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className={`${sizeMap[size]} relative`}>
        {/* Main cloud body */}
        <div className="absolute inset-0 bg-cloud rounded-full opacity-90" />
        <div className="absolute -top-2 left-2 w-8 h-8 bg-cloud rounded-full opacity-90" />
        <div className="absolute -top-1 right-4 w-6 h-6 bg-cloud rounded-full opacity-90" />
        <div className="absolute -bottom-1 left-4 w-10 h-6 bg-cloud rounded-full opacity-80" />
        
        {/* Hidden romantic word */}
        {text && (
          <span className="absolute inset-0 flex items-center justify-center text-primary/20 font-display text-xs">
            {text}
          </span>
        )}
      </div>
    </div>
  );
});

Cloud.displayName = 'Cloud';

export default Cloud;
