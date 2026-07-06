import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const textareaVariants = cva(
  [
    'w-full rounded-lg bg-white text-secondary-900 resize-y min-h-[80px]',
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
        error: 'border border-error-400 focus:ring-error-500 bg-error-50/30',
        success: 'border border-success-400 focus:ring-success-500 bg-success-50/30',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  maxCharacters?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, label, error, hint, required, maxCharacters, value, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const state = error ? 'error' : 'default';
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-secondary-700">
            {label}
            {required && (
              <span className="ml-0.5 text-error-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={cn(textareaVariants({ size, state }), className)}
          {...props}
        />
        <div className="flex justify-between items-center">
          <div>
            {error && (
              <p id={`${textareaId}-error`} role="alert" className="text-sm text-error-600">
                {error}
              </p>
            )}
            {hint && !error && (
              <p id={`${textareaId}-hint`} className="text-sm text-secondary-400">
                {hint}
              </p>
            )}
          </div>
          {maxCharacters && (
            <p
              className={cn(
                'text-xs tabular-nums',
                charCount > maxCharacters ? 'text-error-500' : 'text-secondary-400'
              )}
            >
              {charCount}/{maxCharacters}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
