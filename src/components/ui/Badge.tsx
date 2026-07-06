import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium rounded-full transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 text-primary-700 border border-primary-200',
        secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
        success: 'bg-success-100 text-success-700 border border-success-200',
        warning: 'bg-warning-100 text-warning-700 border border-warning-200',
        error: 'bg-error-100 text-error-700 border border-error-200',
        accent: 'bg-accent-100 text-accent-700 border border-accent-200',
        indigo: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
        violet: 'bg-violet-100 text-violet-700 border border-violet-200',
        amber: 'bg-amber-100 text-amber-700 border border-amber-200',
        outline:
          'bg-transparent text-secondary-600 border border-secondary-300',
        ghost: 'bg-secondary-100/60 text-secondary-600 border-transparent',
      },
      size: {
        xs: 'px-1.5 py-0 text-[10px]',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      dot: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, dot }), className)} {...props}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { badgeVariants };
