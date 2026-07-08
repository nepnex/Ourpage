import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const sizes = {
  xs: { img: 'w-7 h-7', text: 'text-base' },
  sm: { img: 'w-8 h-8', text: 'text-lg' },
  md: { img: 'w-10 h-10', text: 'text-xl' },
  lg: { img: 'w-12 h-12', text: 'text-2xl' },
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
  showText?: boolean;
  className?: string;
  textClassName?: string;
  asLink?: boolean;
  variant?: 'default' | 'light';
}

export function Logo({
  size = 'md',
  showText = true,
  className,
  textClassName,
  asLink = false,
  variant = 'default',
}: LogoProps) {
  const isLight = variant === 'light';

  const content = (
    <>
      <img
        src="/nepnex-logo.png"
        alt="NepNex Technologies"
        className={cn(sizes[size].img, 'object-contain shrink-0')}
      />
      {showText && (
        <div className="flex flex-col justify-center leading-none text-left">
          <span
            className={cn(
              'font-bold tracking-tight',
              isLight ? 'text-white' : 'text-secondary-900',
              sizes[size].text,
              textClassName,
            )}
          >
            Nep<span className={isLight ? 'text-primary-300' : 'text-primary-500'}>Nex</span>
          </span>
          <span
            className={cn(
              'font-semibold opacity-75 tracking-[0.2em] uppercase block mt-0.5 text-[0.55em] leading-none',
              isLight ? 'text-white/80' : 'text-secondary-500'
            )}
          >
            Technologies
          </span>
        </div>
      )}
    </>
  );

  const classes = cn('inline-flex items-center gap-2', className);

  if (asLink) {
    return (
      <Link to="/" className={classes} aria-label="NepNex Technologies home">
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
