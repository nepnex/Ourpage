import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center font-medium rounded-lg',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white',
          'hover:bg-primary-700 active:bg-primary-800',
          'focus-visible:ring-primary-500',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.97] hover:scale-[1.02]',
        ],
        secondary: [
          'bg-secondary-100 text-secondary-900',
          'hover:bg-secondary-200 active:bg-secondary-300',
          'focus-visible:ring-secondary-400',
          'active:scale-[0.97] hover:scale-[1.01]',
        ],
        outline: [
          'bg-transparent border-2 border-primary-600 text-primary-600',
          'hover:bg-primary-50 active:bg-primary-100',
          'focus-visible:ring-primary-500',
          'active:scale-[0.97] hover:scale-[1.01]',
        ],
        ghost: [
          'bg-transparent text-secondary-700',
          'hover:bg-secondary-100 hover:text-secondary-900',
          'focus-visible:ring-secondary-400',
          'active:scale-[0.97]',
        ],
        destructive: [
          'bg-error-600 text-white',
          'hover:bg-error-700 active:bg-error-800',
          'focus-visible:ring-error-500',
          'shadow-sm active:scale-[0.97]',
        ],
        link: [
          'bg-transparent text-primary-600 underline-offset-4',
          'hover:underline hover:text-primary-700',
          'focus-visible:ring-primary-500',
          'p-0 h-auto',
        ],
        glass: [
          'bg-white/10 backdrop-blur-md text-white border border-white/20',
          'hover:bg-white/20 active:bg-white/25',
          'focus-visible:ring-white/50',
          'active:scale-[0.97] hover:scale-[1.01]',
        ],
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1',
        sm: 'h-9 px-3.5 text-sm gap-1.5',
        md: 'h-10 px-5 text-base gap-2',
        lg: 'h-12 px-6 text-lg gap-2',
        xl: 'h-14 px-8 text-xl gap-3',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'default',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const content = isLoading ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" aria-hidden="true" />
        <span>Loading…</span>
      </>
    ) : (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    );

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, rounded }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export variants for external use (e.g., styling Link components)
export { buttonVariants };
