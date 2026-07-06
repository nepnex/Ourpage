import { type HTMLAttributes, type ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
};

export function Container({
  className = '',
  size = 'lg',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`
        w-full mx-auto px-4 sm:px-6 lg:px-8
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
