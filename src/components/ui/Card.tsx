import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// ─── CVA Variants ─────────────────────────────────────────────────────────────

const cardVariants = cva(
  'rounded-2xl transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-white border border-secondary-100 shadow-card',
        elevated: 'bg-white shadow-xl border border-secondary-50',
        outlined: 'bg-white border-2 border-secondary-200',
        flat: 'bg-secondary-50 border border-secondary-100',
        dark: 'bg-secondary-900 text-white border border-secondary-800',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hoverable: {
        true: 'cursor-pointer hover:-translate-y-1 hover:shadow-card-hover',
      },
      clickable: {
        true: 'cursor-pointer active:scale-[0.98]',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    VariantProps<typeof cardVariants> {
  children?: ReactNode;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, clickable, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hoverable, clickable }), className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);
Card.displayName = 'Card';

// ─── GlassCard ────────────────────────────────────────────────────────────────

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: 'low' | 'medium' | 'high';
}

const glassBlur = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-lg', xl: 'backdrop-blur-xl' };
const glassOpacity = { low: 'bg-white/5', medium: 'bg-white/10', high: 'bg-white/20' };

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = 'md', opacity = 'medium', children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-2xl border border-white/10 p-6 transition-all duration-300',
        glassBlur[blur],
        glassOpacity[opacity],
        'hover:bg-white/20',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
);
GlassCard.displayName = 'GlassCard';

// ─── Sub-components ───────────────────────────────────────────────────────────

export const CardHeader = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-heading-lg text-secondary-900 font-semibold', className)} {...props}>
    {children}
  </h3>
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-body-md text-secondary-500 mt-1', className)} {...props}>
    {children}
  </p>
);
CardDescription.displayName = 'CardDescription';

export const CardContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);
CardContent.displayName = 'CardContent';

export const CardFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-4 pt-4 border-t border-secondary-100 flex items-center gap-2', className)}
    {...props}
  >
    {children}
  </div>
);
CardFooter.displayName = 'CardFooter';

export { cardVariants };
