import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Monitor, MousePointerClick } from 'lucide-react';
import { useReducedMotion } from '@/hooks';

interface WebsiteBuilderProps {
  className?: string;
  onComplete?: () => void;
  delay?: number;
}

export function WebsiteBuilder({
  className = '',
  onComplete,
  delay = 0,
}: WebsiteBuilderProps) {
  const [phase, setPhase] = useState(0);
  const reducedMotion = useReducedMotion();

  const phases = [
    { name: 'frame', duration: 800 },
    { name: 'navbar', duration: 500 },
    { name: 'hero', duration: 600 },
    { name: 'cards', duration: 500 },
    { name: 'buttons', duration: 400 },
    { name: 'cursor', duration: 300 },
    { name: 'click', duration: 100 },
    { name: 'live', duration: 2000 },
    { name: 'complete', duration: 0 },
  ];

  useEffect(() => {
    if (reducedMotion) {
      setPhase(phases.length - 1);
      onComplete?.();
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let totalDelay = delay * 1000;
    let totalDuration = 0;

    phases.forEach((p, i) => {
      if (i === 0) {
        totalDelay = delay * 1000;
      } else {
        totalDelay = delay * 1000 + totalDuration;
      }

      const timeout = setTimeout(() => {
        setPhase(i);
        if (p.name === 'complete') {
          onComplete?.();
        }
      }, totalDelay);

      timeouts.push(timeout);
      totalDuration += p.duration;
    });

    return () => timeouts.forEach(clearTimeout);
  }, [delay, onComplete, reducedMotion, phases]);

  const currentPhase = phases[phase]?.name || 'complete';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`relative ${className}`}
    >
      <div className="relative w-full max-w-md">
        {/* Browser Frame */}
        <motion.div
          initial={{ borderColor: 'rgb(226, 232, 240)' }}
          animate={{
            borderColor: currentPhase !== 'frame'
              ? 'rgb(129, 140, 248)'
              : 'rgb(226, 232, 240)',
          }}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          className="relative border-2 rounded-xl backdrop-blur-sm shadow-xl overflow-hidden"
        >
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-secondary-100 bg-secondary-50/50">
            <div className="flex gap-1.5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: delay }}
                className="w-3 h-3 rounded-full bg-error-400"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: delay + 0.05 }}
                className="w-3 h-3 rounded-full bg-warning-400"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: delay + 0.1 }}
                className="w-3 h-3 rounded-full bg-success-400"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: currentPhase !== 'frame' ? 1 : 0,
                width: currentPhase !== 'frame' ? '70%' : '0%',
              }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              className="mx-auto"
            >
              <div className="h-6 bg-secondary-100 rounded-lg flex items-center px-3 gap-2">
                <Monitor className="w-3 h-3 text-secondary-400" />
                <AnimatePresence>
                  {(currentPhase === 'live' || currentPhase === 'complete') && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-secondary-500"
                    >
                      nepnex.com
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Browser Content */}
          <div className="p-4 space-y-3 min-h-[200px]">
            {/* Navbar */}
            <AnimatePresence>
              {(['navbar', 'hero', 'cards', 'buttons', 'cursor', 'click', 'live', 'complete'] as string[]).includes(currentPhase) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 56 }}
                    transition={{ duration: 0.3 }}
                    className="h-4 bg-primary-500 rounded-md shrink-0"
                  />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 24, opacity: 1 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="h-3 bg-secondary-200 rounded"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hero Section */}
            <AnimatePresence>
              {(['hero', 'cards', 'buttons', 'cursor', 'click', 'live', 'complete'] as string[]).includes(currentPhase) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2 py-4"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '180%' }}
                    transition={{ duration: 0.5 }}
                    className="h-8 bg-secondary-900 rounded-lg origin-left"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="h-4 bg-secondary-300 rounded-lg flex-1" />
                    <div className="h-4 bg-secondary-300 rounded-lg w-1/2" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="h-3 bg-secondary-300 rounded-lg w-full"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="h-3 bg-secondary-300 rounded-lg w-[90%]"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.25 }}
                    className="flex items-center gap-2 mt-2"
                  >
                    <div className="h-6 w-14 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm" />
                    <div className="h-6 w-20 rounded-md border border-secondary-200 rounded-md" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards Section */}
            <AnimatePresence>
              {(['cards', 'buttons', 'cursor', 'click', 'live', 'complete'] as string[]).includes(currentPhase) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="p-2 border border-secondary-100 rounded-lg bg-white"
                    >
                      <div className="w-6 h-6 mx-auto mb-1 rounded-lg bg-secondary-100 flex items-center justify-center">
                        <div className="w-3 h-3 bg-secondary-300 rounded" />
                      </div>
                      <div className="h-2 bg-secondary-200 rounded mb-1" />
                      <div className="h-2 bg-secondary-100 rounded w-2/3 mx-auto" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <AnimatePresence>
              {(['buttons', 'cursor', 'click', 'live', 'complete'] as string[]).includes(currentPhase) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center gap-2 pt-2"
                >
                  <motion.div
                    id="get-started-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white text-xs font-medium shadow-sm"
                  >
                    Get Started
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-2 border border-secondary-200 rounded-lg text-xs font-medium text-secondary-600"
                  >
                    Learn More
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cursor */}
            <AnimatePresence>
              {(currentPhase === 'cursor' || currentPhase === 'click') && (
                <motion.div
                  initial={{ x: 0, y: 50, opacity: 0 }}
                  animate={{
                    x: -85,
                    y: -70,
                    opacity: 1,
                    scale: currentPhase === 'click' ? 0.8 : 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: currentPhase === 'click' ? 'easeIn' : 'easeOut',
                  }}
                  className="absolute pointer-events-none"
                >
                  <MousePointerClick className="w-5 h-5 text-secondary-700" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click ripple effect */}
            <AnimatePresence>
              {currentPhase === 'click' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 top-2/3 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-500"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Live indicator */}
          <AnimatePresence>
            {(currentPhase === 'live' || currentPhase === 'complete') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-success-100 text-success-700 text-xs font-medium"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-success-500"
                />
                Live
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow effect when live */}
          <AnimatePresence>
            {currentPhase === 'live' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 pointer-events-none rounded-xl"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reflection */}
        <div className="absolute -bottom-4 left-4 right-4 h-16 bg-gradient-to-b from-primary-500/5 to-transparent blur-xl" />
      </div>
    </motion.div>
  );
}

interface WireframeDrawingProps {
  className?: string;
  delay?: number;
}

export function WireframeDrawing({ className = '', delay = 0 }: WireframeDrawingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <svg width="300" height="200" viewBox="0 0 300 200" className="overflow-visible">
        {/* Browser outline */}
        <motion.path
          d="M10,10 L290,10 L290,190 L10,190 Z"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.5, delay, ease: 'easeInOut' }, opacity: { duration: 0 } }}
          id="wireframe-path"
        />

        {/* Three dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={25 + i * 10}
            cy={25}
            r={4}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: delay + 0.5 + i * 0.1,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            fill={i === 0 ? '#EF4444' : i === 1 ? '#F59E0B' : '#22C55E'}
          />
        ))}

        {/* Address bar */}
        <motion.rect
          x={60}
          y={17}
          width={180}
          height={20}
          rx={4}
          fill="#F1F5F9"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 180, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.6, ease: 'easeOut' }}
        />
        <motion.rect
          x={70}
          y={24}
          width={100}
          height={8}
          rx={2}
          fill="#CBD5E1"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 100, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.7, ease: 'easeOut' }}
        />

        {/* Header area */}
        <motion.rect
          x={20}
          y={45}
          width={100}
          height={16}
          rx={3}
          fill="#1296DB"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 100, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 1, ease: 'easeOut' }}
        />
        <motion.rect
          x={20}
          y={70}
          width={60}
          height={12}
          rx={2}
          fill="#94A3B8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 1.2, ease: 'easeOut' }}
        />

        {/* Content cards */}
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 1.5 + i * 0.15, ease: 'easeOut' }}
          >
            <rect
              x={20 + i * 95}
              y={100}
              width={80}
              height={80}
              rx={8}
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <rect
              x={30 + i * 95}
              y={110}
              width={24}
              height={24}
              rx={6}
              fill="#F1F5F9"
            />
            <rect
              x={30 + i * 95}
              y={145}
              width={60}
              height={8}
              rx={2}
              fill="#CBD5E1"
            />
            <rect
              x={30 + i * 95}
              y={160}
              width={40}
              height={6}
              rx={2}
              fill="#E2E8F0"
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

interface MorphTransitionProps {
  className?: string;
  progress?: number;
}

export function MorphTransition({ className = '', progress = 0 }: MorphTransitionProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  const pathFrom = 'M0,100 Q50,80 100,60 T200,40 T300,20 L300,200 L0,200 Z';
  const pathTo = 'M0,150 L300,150 L300,200 L0,200 Z';

  const interpolatePath = (from: string, to: string, t: number) => {
    const fromNums = from.match(/[-\d.]+/g)?.map(Number) || [];
    const toNums = to.match(/[-\d.]+/g)?.map(Number) || [];

    return from.replace(/[-\d.]+/g, (_, offset) => {
      const index = (from.match(/[-\d.]+/g) || []).slice(0, offset).length;
      const fromVal = fromNums[index] || 0;
      const toVal = toNums[index] || 0;
      return String(fromVal + (toVal - fromVal) * t);
    });
  };

  return (
    <motion.div className={className}>
      <svg width="300" height="200" viewBox="0 0 300 200" className="overflow-visible">
        <motion.path
          d={interpolatePath(pathFrom, pathTo, clampedProgress)}
          fill="#1296DB"
          opacity={0.3}
          initial={false}
        />
      </svg>
    </motion.div>
  );
}
