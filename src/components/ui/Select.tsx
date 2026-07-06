import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const selectVariants = cva(
  [
    'w-full rounded-lg bg-white text-secondary-900 appearance-none',
    'pr-10', // room for chevron icon
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary-50',
    'cursor-pointer',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-4 py-3 text-lg',
      },
      state: {
        default: 'border border-secondary-200 focus:ring-primary-500 focus:border-primary-400',
        error: 'border border-error-400 focus:ring-error-500 bg-error-50/30',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      size,
      label,
      error,
      hint,
      required,
      options,
      placeholder,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const state = error ? 'error' : 'default';

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-secondary-700">
            {label}
            {required && (
              <span className="ml-0.5 text-error-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            className={cn(selectVariants({ size, state }), className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} role="alert" className="text-sm text-error-600">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="text-sm text-secondary-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
