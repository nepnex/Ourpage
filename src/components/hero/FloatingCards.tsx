import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Target, BarChart3, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { AnimatedCounter } from './AnimatedCounter';

interface FloatingCardProps {
  title: string;
  sequence: Array<{ value: number; suffix?: string; prefix?: string }>;
  decimals?: number;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  className?: string;
  cycleDuration?: number;
}

interface CardEntry {
  value: number;
  suffix?: string;
  prefix?: string;
}

export function FloatingCard({
  title,
  sequence,
  decimals = 0,
  icon,
  color = 'primary',
  delay = 0,
  className = '',
  cycleDuration = 3000,
}: FloatingCardProps) {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || sequence.length <= 1) {
      setCurrentIndex(sequence.length - 1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sequence.length);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [sequence, cycleDuration, reducedMotion]);

  const current = sequence[currentIndex] || sequence[sequence.length - 1];
  const previous = currentIndex > 0 ? sequence[currentIndex - 1] : sequence[0];

  const colorClasses = {
    primary: 'from-primary-50 to-white border-primary-100/80',
    success: 'from-emerald-50 to-white border-emerald-100/80',
    accent: 'from-cyan-50 to-white border-cyan-100/80',
    indigo: 'from-indigo-50 to-white border-indigo-100/80',
    violet: 'from-violet-50 to-white border-violet-100/80',
    amber: 'from-amber-50 to-white border-amber-100/80',
  };

  const iconBgClasses = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-emerald-100 text-emerald-600',
    accent: 'bg-cyan-100 text-cyan-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    violet: 'bg-violet-100 text-violet-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  const trendColor = currentIndex > 0 && current.value > previous.value ? 'text-emerald-600' : currentIndex > 0 && current.value < previous.value ? 'text-error-500' : 'text-secondary-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
        className={`
          relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}
          border backdrop-blur-sm p-5 shadow-lg shadow-black/5
        `}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className={`w-10 h-10 rounded-xl ${iconBgClasses[color as keyof typeof iconBgClasses] || iconBgClasses.primary} flex items-center justify-center shrink-0`}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-secondary-500 mb-1">{title}</div>
            <div className="flex items-baseline gap-2">
              <AnimatedCounter
                from={previous?.value || 0}
                to={current.value}
                duration={0.6}
                suffix={current.suffix}
                prefix={current.prefix}
                decimals={decimals}
                className={`text-2xl font-semibold text-secondary-800 ${trendColor}`}
              />
              <AnimatePresence mode="wait">
                {currentIndex > 0 && (
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                  >
                    {current.value > previous?.value ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500 inline-block" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-error-400 inline-block" />
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sequence indicators */}
        <div className="flex gap-1 mt-3">
          {sequence.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: i === currentIndex ? 'rgb(18, 150, 219)' : 'rgba(0,0,0,0.1)',
              }}
              className="h-1 flex-1 rounded-full"
            />
          ))}
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function FloatingCardsGrid({ className = '' }: { className?: string }) {
  const seoSequence: CardEntry[] = [
    { value: 42, suffix: '%' },
    { value: 68, suffix: '%' },
    { value: 91, suffix: '%' },
    { value: 98, suffix: '%' },
  ];

  const visitorsSequence: CardEntry[] = [
    { value: 0, prefix: '+' },
    { value: 520, prefix: '+' },
    { value: 2400, prefix: '+' },
    { value: 12000, prefix: '+' },
  ];

  const conversionSequence: CardEntry[] = [
    { value: 1.2, suffix: '%' },
    { value: 2.8, suffix: '%' },
    { value: 4.3, suffix: '%' },
    { value: 6.9, suffix: '%' },
  ];

  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      <FloatingCard
        title="SEO Score"
        sequence={seoSequence}
        icon={<BarChart3 className="w-5 h-5" />}
        color="primary"
        delay={0}
        cycleDuration={2000}
      />
      <FloatingCard
        title="Visitors"
        sequence={visitorsSequence}
        icon={<Users className="w-5 h-5" />}
        color="success"
        delay={0.2}
        cycleDuration={2000}
      />
      <FloatingCard
        title="Conversion Rate"
        sequence={conversionSequence}
        decimals={1}
        icon={<Target className="w-5 h-5" />}
        color="accent"
        delay={0.4}
        cycleDuration={2000}
      />
    </div>
  );
}

export function FloatingAnalyticsCards({ className = '' }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={reducedMotion ? {} : {
          x: [0, 10, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-16 -left-24"
      >
        <FloatingCard
          title="SEO Score"
          sequence={[
            { value: 42, suffix: '%' },
            { value: 68, suffix: '%' },
            { value: 91, suffix: '%' },
            { value: 98, suffix: '%' },
          ]}
          icon={<BarChart3 className="w-5 h-5" />}
          color="primary"
          delay={0}
          cycleDuration={2000}
          className="w-44"
        />
      </motion.div>

      <motion.div
        animate={reducedMotion ? {} : {
          x: [0, -8, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-32 -right-20"
      >
        <FloatingCard
          title="Visitors"
          sequence={[
            { value: 0, prefix: '+' },
            { value: 520, prefix: '+' },
            { value: 2400, prefix: '+' },
            { value: 12000, prefix: '+' },
          ]}
          icon={<Users className="w-5 h-5" />}
          color="success"
          delay={0.2}
          cycleDuration={2000}
          className="w-44"
        />
      </motion.div>

      <motion.div
        animate={reducedMotion ? {} : {
          x: [0, 12, 0],
          y: [0, 6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-56 -left-28"
      >
        <FloatingCard
          title="Conversion Rate"
          sequence={[
            { value: 1.2, suffix: '%' },
            { value: 2.8, suffix: '%' },
            { value: 4.3, suffix: '%' },
            { value: 6.9, suffix: '%' },
          ]}
          decimals={1}
          icon={<Target className="w-5 h-5" />}
          color="accent"
          delay={0.4}
          cycleDuration={2000}
          className="w-44"
        />
      </motion.div>

      <motion.div
        animate={reducedMotion ? {} : {
          x: [0, -10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute top-80 right-0"
      >
        <FloatingCard
          title="Speed Score"
          sequence={[
            { value: 45, suffix: '%' },
            { value: 72, suffix: '%' },
            { value: 88, suffix: '%' },
            { value: 99, suffix: '%' },
          ]}
          icon={<Zap className="w-5 h-5" />}
          color="primary"
          delay={0.6}
          cycleDuration={2000}
          className="w-44"
        />
      </motion.div>
    </div>
  );
}
