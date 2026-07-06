import { type HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

const variants = {
  text: 'rounded h-4',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
  card: 'rounded-xl',
};

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  style = {},
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`
        bg-secondary-200 animate-pulse
        ${variants[variant]}
        ${className}
      `}
      style={{
        width: width || (variant === 'circular' ? '40px' : undefined),
        height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '1rem' : undefined),
        ...style,
      }}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-xl border border-secondary-100">
      <Skeleton variant="rectangular" className="w-full h-40 mb-4" />
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  );
}
