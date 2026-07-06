import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const chipVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-medium rounded-full',
    'transition-all duration-200 select-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
        primary: 'bg-primary-100 text-primary-700 border border-primary-200',
        filled: 'bg-primary-600 text-white',
        outline: 'bg-transparent text-secondary-600 border border-secondary-300',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-sm',
      },
      clickable: {
        true: 'cursor-pointer hover:shadow-sm',
      },
      selected: {
        true: 'ring-2 ring-primary-500 ring-offset-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    VariantProps<typeof chipVariants> {
  icon?: ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Chip({
  className,
  variant,
  size,
  clickable,
  selected,
  icon,
  onRemove,
  onClick,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(chipVariants({ variant, size, clickable: clickable ?? !!onClick, selected }), className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="flex-shrink-0 ml-0.5 rounded-full hover:bg-black/10 p-0.5 transition-colors"
          aria-label="Remove"
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}
