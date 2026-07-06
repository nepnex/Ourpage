import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useReducedMotion, useMousePosition, useWindowSize } from '@/hooks';
import { ParticleField } from './ParticleField';

interface BackgroundProps {
  className?: string;
  showParticles?: boolean;
  particleIntensity?: 'light' | 'medium' | 'dense';
  showGrid?: boolean;
  showRadialGlow?: boolean;
}

export function HeroBackground({
  className = '',
  showParticles = true,
  particleIntensity = 'medium',
  showGrid = true,
  showRadialGlow = true,
}: BackgroundProps) {
  const reducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();
  const { width, height } = useWindowSize();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) return;
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition.x, mousePosition.y, mouseX, mouseY, reducedMotion]);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const parallaxX = useTransform(smoothMouseX, [0, width || 1], [15, -15]);
  const parallaxY = useTransform(smoothMouseY, [0, height || 1], [15, -15]);

  const particleCounts = {
    light: 30,
    medium: 50,
    dense: 80,
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base white gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fafbfc] to-white" />

      {/* Aurora-style gradient layers */}
      {showRadialGlow && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary blue aurora - top center */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 via-primary-400/10 to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-transparent blur-[100px]" />
          </motion.div>

          {/* Indigo aurora - left side */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.2, 0.35, 0.2],
              x: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/4 -left-32 w-[600px] h-[700px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-indigo-400/5 to-transparent blur-3xl" />
          </motion.div>

          {/* Emerald aurora - right bottom */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.15, 0.25, 0.15],
              y: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 -right-32 w-[500px] h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/10 via-emerald-400/5 to-transparent blur-3xl" />
          </motion.div>

          {/* Cyan aurora - bottom left */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-0 left-1/4 w-[450px] h-[350px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/12 via-cyan-400/6 to-transparent blur-3xl" />
          </motion.div>

          {/* Violet aurora - center right */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.1, 0.2, 0.1],
              x: [0, -15, 0],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-violet-500/10 via-violet-400/5 to-transparent blur-3xl" />
          </motion.div>

          {/* Amber subtle glow - very subtle accent */}
          <motion.div
            animate={reducedMotion ? {} : {
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-2/3 left-1/3 w-[350px] h-[350px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/8 via-amber-400/4 to-transparent blur-3xl" />
          </motion.div>
        </div>
      )}

      {/* Floating blurred circles */}
      {showRadialGlow && !reducedMotion && (
        <>
          <motion.div
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-primary-500/20 blur-[80px]"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -25, 0],
              opacity: [0.1, 0.18, 0.1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-indigo-500/15 blur-[70px]"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full bg-emerald-500/12 blur-[60px]"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.12, 0.2, 0.12],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-1/4 left-1/2 w-[180px] h-[180px] rounded-full bg-cyan-500/15 blur-[50px]"
          />
        </>
      )}

      {/* Mouse-following glow */}
      {showRadialGlow && !reducedMotion && (
        <motion.div
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/8 via-primary-400/4 to-transparent blur-3xl" />
        </motion.div>
      )}

      {/* Grid pattern */}
      {showGrid && (
        <motion.div
          style={{
            x: parallaxX,
            y: parallaxY,
          }}
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#1296DB"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>
      )}

      {/* Radial gradient overlay (center focus) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-white/40" />
      </div>

      {/* Particle field */}
      {showParticles && !reducedMotion && (
        <ParticleField
          particleCount={particleCounts[particleIntensity]}
          connectionDistance={120}
          particleSpeed={0.15}
          showNetwork={true}
          networkNodes={6}
          centerGlow={true}
        />
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.01]" />
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  intensity = 20,
  className = '',
}: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();
  const { width, height } = useWindowSize();

  const mouseX = useMotionValue(width / 2);
  const mouseY = useMotionValue(height / 2);

  useEffect(() => {
    if (reducedMotion) return;
    mouseX.set(mousePosition.x || width / 2);
    mouseY.set(mousePosition.y || height / 2);
  }, [mousePosition.x, mousePosition.y, mouseX, mouseY, reducedMotion, width, height]);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const x = useTransform(smoothX, [0, width || 1], [intensity, -intensity]);
  const y = useTransform(smoothY, [0, height || 1], [intensity, -intensity]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ x, y }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GradientBackground({
  variant = 'primary',
  className = '',
}: {
  variant?: 'primary' | 'indigo' | 'emerald' | 'cyan' | 'violet' | 'mixed';
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  const gradients = {
    primary: {
      start: 'from-primary-500/20',
      middle: 'via-primary-400/10',
      end: 'to-transparent',
    },
    indigo: {
      start: 'from-indigo-500/20',
      middle: 'via-indigo-400/10',
      end: 'to-transparent',
    },
    emerald: {
      start: 'from-emerald-500/20',
      middle: 'via-emerald-400/10',
      end: 'to-transparent',
    },
    cyan: {
      start: 'from-cyan-500/20',
      middle: 'via-cyan-400/10',
      end: 'to-transparent',
    },
    violet: {
      start: 'from-violet-500/20',
      middle: 'via-violet-400/10',
      end: 'to-transparent',
    },
    mixed: {
      start: 'from-primary-500/15',
      middle: 'via-indigo-400/10',
      end: 'to-emerald-500/5',
    },
  };

  const gradient = gradients[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={reducedMotion ? {} : {
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-gradient-radial ${gradient.start} ${gradient.middle} ${gradient.end}`}
      />
    </div>
  );
}

interface GlowOrbProps {
  size?: number;
  color?: 'primary' | 'indigo' | 'emerald' | 'cyan' | 'violet' | 'amber';
  delay?: number;
  className?: string;
}

export function GlowOrb({
  size = 400,
  color = 'primary',
  delay = 0,
  className = '',
}: GlowOrbProps) {
  const reducedMotion = useReducedMotion();

  const colors = {
    primary: 'bg-primary-500/30',
    indigo: 'bg-indigo-500/30',
    emerald: 'bg-emerald-500/30',
    cyan: 'bg-cyan-500/30',
    violet: 'bg-violet-500/30',
    amber: 'bg-amber-500/30',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1,
        delay,
        ease: 'easeOut',
      }}
      className={`absolute rounded-full blur-3xl ${colors[color]} ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        }}
        className="absolute inset-0 rounded-full bg-inherit"
      />
    </motion.div>
  );
}

// Glassmorphism card wrapper
export function GlassCard({
  children,
  className = '',
  borderColor = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: 'primary' | 'indigo' | 'emerald' | 'cyan' | 'violet' | 'amber';
}) {
  const borderColors = {
    primary: 'border-primary-200/50',
    indigo: 'border-indigo-200/50',
    emerald: 'border-emerald-200/50',
    cyan: 'border-cyan-200/50',
    violet: 'border-violet-200/50',
    amber: 'border-amber-200/50',
  };

  return (
    <div className={`
      bg-white/70 backdrop-blur-xl border ${borderColors[borderColor]}
      shadow-xl shadow-black/5 rounded-2xl
      ${className}
    `}>
      {children}
    </div>
  );
}

// Gradient animated line
export function AnimatedGradientLine({ className = '' }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative h-px overflow-hidden ${className}`}>
      <motion.div
        animate={reducedMotion ? {} : {
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent" />
    </div>
  );
}
