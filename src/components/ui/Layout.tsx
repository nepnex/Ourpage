import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── Section ──────────────────────────────────────────────────────────────────

const sectionVariants = cva('relative', {
  variants: {
    background: {
      white: 'bg-white',
      light: 'bg-secondary-50',
      muted: 'bg-secondary-100/50',
      dark: 'bg-secondary-900 text-white',
      'dark-deep': 'bg-secondary-950 text-white',
      gradient: 'bg-gradient-to-br from-primary-600 to-primary-800 text-white',
      'gradient-dark': 'bg-gradient-to-br from-secondary-900 to-secondary-800 text-white',
      primary: 'bg-primary-600 text-white',
      transparent: 'bg-transparent',
    },
    size: {
      sm: 'py-10 sm:py-12 lg:py-16',
      md: 'py-12 sm:py-16 lg:py-24',
      lg: 'py-16 sm:py-20 lg:py-32',
      xl: 'py-20 sm:py-24 lg:py-40',
      none: '',
    },
  },
  defaultVariants: {
    background: 'white',
    size: 'md',
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, background, size, container = true, containerSize = 'lg', children, ...props },
    ref
  ) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ background, size }), className)}
      {...props}
    >
      {container ? (
        <div className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', containerSizes[containerSize])}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
);
Section.displayName = 'Section';

// ─── Container ────────────────────────────────────────────────────────────────

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      xs: 'max-w-xl',
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[90rem]',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, children, ...props }, ref) => (
    <div ref={ref} className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </div>
  )
);
Container.displayName = 'Container';

// ─── Grid ─────────────────────────────────────────────────────────────────────

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      auto: 'grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
  },
});

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, children, ...props }, ref) => (
    <div ref={ref} className={cn(gridVariants({ cols, gap }), className)} {...props}>
      {children}
    </div>
  )
);
Grid.displayName = 'Grid';

// ─── Stack ────────────────────────────────────────────────────────────────────

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'col',
    align: 'start',
    justify: 'start',
    gap: 'md',
  },
});

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, gap, wrap, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(stackVariants({ direction, align, justify, gap, wrap }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Stack.displayName = 'Stack';

// ─── Divider ──────────────────────────────────────────────────────────────────

const dividerVariants = cva('border-secondary-200', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l self-stretch',
    },
    spacing: {
      none: '',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-8',
      xl: 'my-12',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'md',
  },
});

export interface DividerProps
  extends HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
}

export function Divider({ className, orientation, spacing, label, ...props }: DividerProps) {
  if (label) {
    return (
      <div
        className={cn(
          'flex items-center gap-4',
          dividerVariants({ spacing }),
          className
        )}
      >
        <hr className="flex-1 border-t border-secondary-200" />
        <span className="text-sm text-secondary-400 whitespace-nowrap">{label}</span>
        <hr className="flex-1 border-t border-secondary-200" />
      </div>
    );
  }

  return (
    <hr className={cn(dividerVariants({ orientation, spacing }), className)} {...(props as HTMLAttributes<HTMLHRElement>)} />
  );
}

// ─── IconWrapper ──────────────────────────────────────────────────────────────

const iconWrapperVariants = cva('flex items-center justify-center flex-shrink-0', {
  variants: {
    variant: {
      primary: 'bg-primary-100 text-primary-600',
      secondary: 'bg-secondary-100 text-secondary-600',
      success: 'bg-success-100 text-success-600',
      warning: 'bg-warning-100 text-warning-700',
      error: 'bg-error-100 text-error-600',
      accent: 'bg-accent-100 text-accent-600',
      ghost: 'bg-transparent text-secondary-600',
    },
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20',
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
});

export interface IconWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconWrapperVariants> {}

export function IconWrapper({
  className,
  variant,
  size,
  rounded,
  children,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={cn(iconWrapperVariants({ variant, size, rounded }), className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}
