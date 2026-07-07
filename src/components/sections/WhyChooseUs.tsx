import { motion } from 'framer-motion';
import { Trophy, Users, Zap, Shield, Clock, HeartHandshake } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView } from '@/hooks';

const reasons = [
  {
    icon: Trophy,
    title: 'Premium Quality',
    description: 'We deliver world-class solutions that meet international standards and exceed expectations.',
    isPrimary: true,
    color: '#1296DB',
    gradient: 'linear-gradient(135deg, rgba(18,150,219,0.1) 0%, rgba(6,182,212,0.06) 100%)',
    border: 'rgba(18,150,219,0.2)',
    glow: 'rgba(18,150,219,0.15)',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our talented professionals bring diverse expertise across design, development, and marketing.',
    isPrimary: false,
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(139,92,246,0.04) 100%)',
    border: 'rgba(79,70,229,0.12)',
    glow: 'rgba(79,70,229,0.12)',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile methodologies and efficient processes ensure timely project completion without compromising quality.',
    isPrimary: false,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(16,185,129,0.04) 100%)',
    border: 'rgba(245,158,11,0.12)',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Security-first approach with robust infrastructure ensuring your digital assets are protected.',
    isPrimary: false,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.04) 100%)',
    border: 'rgba(16,185,129,0.12)',
    glow: 'rgba(16,185,129,0.12)',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support and maintenance to keep your digital presence running smoothly.',
    isPrimary: false,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(18,150,219,0.04) 100%)',
    border: 'rgba(6,182,212,0.12)',
    glow: 'rgba(6,182,212,0.12)',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Approach',
    description: 'Your success is our success. We build lasting partnerships focused on mutual growth and trust.',
    isPrimary: false,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(79,70,229,0.04) 100%)',
    border: 'rgba(139,92,246,0.12)',
    glow: 'rgba(139,92,246,0.12)',
  },
];

export function WhyChooseUs() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section>
      <div ref={inViewRef}>
        <SectionHeading
          label="Why NepNex Technologies"
          title="Why Choose Us"
          description="We combine creativity, technology, and strategy to deliver exceptional digital experiences that drive business growth."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
              transition={{
                duration: 0.55,
                delay: index * 0.09,
                ease: [0.21, 1.02, 0.73, 1],
              }}
              className={reason.isPrimary ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              {reason.isPrimary ? (
                <PrimaryCard reason={reason} isInView={isInView} />
              ) : (
                <SecondaryCard reason={reason} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Featured / Primary Card ──────────────────────────────────────────────────

function PrimaryCard({ reason, isInView }: { reason: typeof reasons[0]; isInView: boolean }) {
  const Icon = reason.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', damping: 20, stiffness: 280 }}
      className="relative h-full rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #1296DB 0%, #0e78b0 60%, #4F46E5 100%)',
        boxShadow: '0 8px 32px rgba(18,150,219,0.3), 0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Animated glow top-right */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: '#06B6D4' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Light sweep */}
      <div
        className="absolute inset-0 animate-sweep opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)',
        }}
      />

      <div className="relative p-7 sm:p-8 flex flex-col h-full">
        {/* Featured badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white/90 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Our Promise
          </div>
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -15 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{reason.title}</h3>
        <p className="text-white/75 leading-relaxed text-sm sm:text-base">{reason.description}</p>

        {/* Stat accent */}
        <div className="mt-auto pt-6 border-t border-white/15">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-white/60 font-medium">Projects Delivered</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-white/60 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Secondary Card ───────────────────────────────────────────────────────────

function SecondaryCard({ reason }: { reason: typeof reasons[0] }) {
  const Icon = reason.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative p-6 sm:p-7 rounded-2xl bg-white group cursor-default h-full overflow-hidden"
      style={{
        border: `1px solid ${reason.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.03)',
      }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: reason.gradient }}
      />

      {/* Top-right orb */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ background: reason.color }}
      />

      <div className="relative">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.12, rotate: 8 }}
          transition={{ type: 'spring', damping: 12, stiffness: 300 }}
          className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${reason.color}14` }}
        >
          <Icon className="w-6 h-6" style={{ color: reason.color }} />
        </motion.div>

        <h3 className="text-base font-semibold text-secondary-900 mb-2.5 group-hover:text-secondary-800 transition-colors">
          {reason.title}
        </h3>
        <p className="text-body-sm text-secondary-500 leading-relaxed">{reason.description}</p>
      </div>

      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${reason.color}30` }}
      />
    </motion.div>
  );
}
