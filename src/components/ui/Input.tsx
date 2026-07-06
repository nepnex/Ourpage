import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const inputVariants = cva(
  [
    'w-full rounded-lg bg-white text-secondary-900',
    'placeholder:text-secondary-400',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary-50',
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
        error: 'border border-error-400 focus:ring-error-500 focus:border-error-400 bg-error-50/30',
        success:
          'border border-success-400 focus:ring-success-500 focus:border-success-400 bg-success-50/30',
        disabled: 'border border-secondary-200 bg-secondary-50',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  hint?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  required?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      label,
      error,
      hint,
      success,
      leftIcon,
      rightIcon,
      required,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const state = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700">
            {label}
            {required && (
              <span className="ml-0.5 text-error-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              inputVariants({ size, state }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-sm text-error-600">
            {error}
          </p>
        )}
        {success && !error && (
          <p className="text-sm text-success-600">{success}</p>
        )}
        {hint && !error && !success && (
          <p id={`${inputId}-hint`} className="text-sm text-secondary-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
