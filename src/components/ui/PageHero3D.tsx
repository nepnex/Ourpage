import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui';

interface PageHero3DProps {
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  /** gradient theme — defaults to 'blue-indigo' */
  theme?: 'blue-indigo' | 'indigo-purple' | 'teal-blue' | 'purple-pink';
}

const themeGradients: Record<NonNullable<PageHero3DProps['theme']>, string> = {
  'blue-indigo':
    'linear-gradient(135deg, #0F2B6B 0%, #1296DB 35%, #4F46E5 70%, #2D1B69 100%)',
  'indigo-purple':
    'linear-gradient(135deg, #1E1060 0%, #4F46E5 40%, #8B5CF6 75%, #6D28D9 100%)',
  'teal-blue':
    'linear-gradient(135deg, #064E3B 0%, #0E7490 35%, #1296DB 70%, #1E3A8A 100%)',
  'purple-pink':
    'linear-gradient(135deg, #4C1D95 0%, #7C3AED 40%, #EC4899 75%, #9D174D 100%)',
};

function Orb({
  size,
  color,
  style,
  delay,
}: {
  size: number;
  color: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${color}60, ${color}10 60%, transparent 80%)`,
        boxShadow: `0 0 ${size / 2}px ${color}30`,
        filter: 'blur(1px)',
        ...style,
      }}
      animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 8 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

function Ring({
  size,
  style,
  delay,
}: {
  size: number;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none hidden md:block"
      style={{ width: size, height: size, borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, ...style }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20 + delay * 5, repeat: Infinity, ease: 'linear', delay }}
    />
  );
}

function Shard({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-xl pointer-events-none hidden md:block"
      style={{
        width: 48,
        height: 48,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        ...style,
      }}
      animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export function PageHero3D({
  badge,
  title,
  subtitle,
  actions,
  theme = 'blue-indigo',
}: PageHero3DProps) {
  return (
    <section
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden text-white"
      style={{ background: themeGradients[theme] }}
    >
      {/* Dot mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Orbs */}
      <Orb size={320} color="#1296DB" style={{ top: '-80px', left: '-60px' }} delay={0} />
      <Orb size={200} color="#8B5CF6" style={{ bottom: '-40px', right: '5%' }} delay={1.5} />
      <Orb size={150} color="#06B6D4" style={{ top: '30%', right: '15%' }} delay={0.8} />
      <Orb size={100} color="#4F46E5" style={{ top: '60%', left: '10%' }} delay={2.2} />

      {/* Rings */}
      <Ring size={500} style={{ top: '-100px', left: '-150px', opacity: 0.6 }} delay={0} />
      <Ring size={300} style={{ bottom: '-80px', right: '-80px', opacity: 0.5 }} delay={3} />

      {/* Shards */}
      <Shard style={{ top: '20%', left: '8%' }} delay={0.3} />
      <Shard style={{ top: '55%', left: '82%' }} delay={1.8} />
      <Shard style={{ top: '15%', right: '10%', width: 32, height: 32 }} delay={0.9} />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {badge && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold backdrop-blur-sm">
                {badge}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          >
            {title}
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
