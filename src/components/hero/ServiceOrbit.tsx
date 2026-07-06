import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import {
  Globe,
  Search,
  Target,
  Palette,
  Video,
  Sparkles,
  Code,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks';

// Service color mapping
const SERVICE_COLORS = {
  'Web Development': {
    gradient: 'from-primary-500 to-primary-600',
    shadow: 'shadow-primary-500/30',
    border: 'group-hover:border-primary-200',
    text: 'text-primary-500 group-hover:text-primary-600',
    bg: 'bg-primary-50 border-primary-100',
    iconBg: 'bg-primary-100 text-primary-600',
    gradientLine: 'rgba(18, 150, 219, 0.6)',
    glow: 'rgba(18, 150, 219, 0.15)',
  },
  'SEO': {
    gradient: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/30',
    border: 'group-hover:border-emerald-200',
    text: 'text-emerald-500 group-hover:text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-100 text-emerald-600',
    gradientLine: 'rgba(16, 185, 129, 0.6)',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  'Digital Ads': {
    gradient: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/30',
    border: 'group-hover:border-indigo-200',
    text: 'text-indigo-500 group-hover:text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-100',
    iconBg: 'bg-indigo-100 text-indigo-600',
    gradientLine: 'rgba(79, 70, 229, 0.6)',
    glow: 'rgba(79, 70, 229, 0.15)',
  },
  'Graphic Design': {
    gradient: 'from-violet-500 to-violet-600',
    shadow: 'shadow-violet-500/30',
    border: 'group-hover:border-violet-200',
    text: 'text-violet-500 group-hover:text-violet-600',
    bg: 'bg-violet-50 border-violet-100',
    iconBg: 'bg-violet-100 text-violet-600',
    gradientLine: 'rgba(139, 92, 246, 0.6)',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  'Video Editing': {
    gradient: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/30',
    border: 'group-hover:border-amber-200',
    text: 'text-amber-500 group-hover:text-amber-600',
    bg: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100 text-amber-600',
    gradientLine: 'rgba(245, 158, 11, 0.6)',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  'AI': {
    gradient: 'from-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/30',
    border: 'group-hover:border-cyan-200',
    text: 'text-cyan-500 group-hover:text-cyan-600',
    bg: 'bg-cyan-50 border-cyan-100',
    iconBg: 'bg-cyan-100 text-cyan-600',
    gradientLine: 'rgba(6, 182, 212, 0.6)',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
} as const;

type ServiceName = keyof typeof SERVICE_COLORS;

interface ServiceIconProps {
  icon: React.ReactNode;
  label: string;
  serviceName: ServiceName;
  delay?: number;
  index: number;
  total: number;
  orbitRadius?: number;
}

export function OrbitingServiceIcon({
  icon,
  label,
  serviceName,
  delay = 0,
  index,
  total,
  orbitRadius = 160,
}: ServiceIconProps) {
  const reducedMotion = useReducedMotion();
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;
  const colors = SERVICE_COLORS[serviceName];

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x,
        y,
        opacity: 1,
        scale: 1,
        rotate: reducedMotion ? 0 : [0, -360],
      }}
      transition={{
        x: { duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] },
        y: { duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] },
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] },
        rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
      }}
      className="absolute left-1/2 top-1/2 -translate-x-[calc(50%)] -translate-y-[calc(50%)]"
      style={{
        transform: 'translate(-50%, -50%)',
        transformOrigin: 'center center',
      }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
        className="relative group"
      >
        <div className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-14 h-14 rounded-2xl bg-white border border-secondary-100/80
              shadow-lg shadow-black/5 backdrop-blur-sm
              flex items-center justify-center
              ${colors.border} transition-all duration-300
            `}
          >
            <div className={`${colors.text} transition-colors [&>svg]:w-6 [&>svg]:h-6`}>
              {icon}
            </div>
          </motion.div>
          <span className={`text-xs font-medium text-secondary-500 group-hover:text-secondary-700 transition-colors whitespace-nowrap`}>
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceOrbit({
  className = '',
  orbitRadius = 140,
  showLabels = true,
  delay = 0,
}: {
  className?: string;
  orbitRadius?: number;
  showLabels?: boolean;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  const services = useMemo(
    () => [
      { icon: <Code />, label: 'Web Development', name: 'Web Development' as ServiceName },
      { icon: <Search />, label: 'SEO', name: 'SEO' as ServiceName },
      { icon: <Target />, label: 'Digital Ads', name: 'Digital Ads' as ServiceName },
      { icon: <Palette />, label: 'Graphic Design', name: 'Graphic Design' as ServiceName },
      { icon: <Video />, label: 'Video Editing', name: 'Video Editing' as ServiceName },
      { icon: <Sparkles />, label: 'AI', name: 'AI' as ServiceName },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${className}`}
      style={{ width: orbitRadius * 2 + 120, height: orbitRadius * 2 + 120 }}
    >
      {/* Orbit ring with gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
        }}
      >
        <svg
          width={orbitRadius * 2}
          height={orbitRadius * 2}
          viewBox={`0 0 ${orbitRadius * 2} ${orbitRadius * 2}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id={`orbitGradient-${orbitRadius}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(18, 150, 219, 0.2)" />
              <stop offset="25%" stopColor="rgba(16, 185, 129, 0.15)" />
              <stop offset="50%" stopColor="rgba(79, 70, 229, 0.1)" />
              <stop offset="75%" stopColor="rgba(6, 182, 212, 0.15)" />
              <stop offset="100%" stopColor="rgba(18, 150, 219, 0.2)" />
            </linearGradient>
          </defs>
          <circle
            cx={orbitRadius}
            cy={orbitRadius}
            r={orbitRadius - 2}
            fill="none"
            stroke={`url(#orbitGradient-${orbitRadius})`}
            strokeWidth="1.5"
            strokeDasharray="0"
          />
        </svg>
      </motion.div>

      {/* Central element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: delay + 2.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <motion.div
          animate={reducedMotion ? {} : {
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30 flex items-center justify-center relative overflow-hidden"
        >
          {/* Gradient shimmer effect */}
          <motion.div
            animate={reducedMotion ? {} : {
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <Globe className="w-10 h-10 text-white relative z-10" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: delay + 2.8 }}
          className="absolute inset-0 rounded-2xl bg-primary-400/20 blur-lg"
        />
      </motion.div>

      {/* Orbiting icons */}
      {services.map((service, i) => (
        <OrbitingServiceIcon
          key={service.name}
          icon={service.icon}
          label={showLabels ? service.label : ''}
          serviceName={service.name}
          index={i}
          total={services.length}
          orbitRadius={orbitRadius}
          delay={delay + i * 0.1}
        />
      ))}

      {/* Connection lines with gradient */}
      <svg
        width={orbitRadius * 2 + 120}
        height={orbitRadius * 2 + 120}
        viewBox={`0 0 ${orbitRadius * 2 + 120} ${orbitRadius * 2 + 120}`}
        className="absolute inset-0 overflow-visible pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <linearGradient id="lineGradientPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(18, 150, 219, 0)" />
            <stop offset="50%" stopColor="rgba(18, 150, 219, 0.4)" />
            <stop offset="100%" stopColor="rgba(18, 150, 219, 0)" />
          </linearGradient>
        </defs>
        {services.map((service, i) => {
          const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
          const innerRadius = 40;
          const outerRadius = orbitRadius + 25;
          const cx = (orbitRadius * 2 + 120) / 2;
          const cy = (orbitRadius * 2 + 120) / 2;
          const x1 = cx + Math.cos(angle) * innerRadius;
          const y1 = cy + Math.sin(angle) * innerRadius;
          const x2 = cx + Math.cos(angle) * outerRadius;
          const y2 = cy + Math.sin(angle) * outerRadius;
          const colors = SERVICE_COLORS[service.name];

          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colors.gradientLine}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                pathLength: { duration: 0.5, delay: delay + 2 + i * 0.1, ease: 'easeOut' },
                opacity: { duration: 0.3, delay: delay + 2 },
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

export function ServiceConnections({
  services,
  centerOffset = { x: 0, y: 0 },
  className = '',
}: {
  services: Array<{ label: string }>;
  centerOffset?: { x: number; y: number };
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const interval = setInterval(() => {
      setProgress((p) => (p + 0.02) % 1);
    }, 50);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <svg className={`absolute inset-0 overflow-visible ${className}`} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="connectingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(18, 150, 219, 0)" />
          <stop offset="50%" stopColor="rgba(18, 150, 219, 0.8)" />
          <stop offset="100%" stopColor="rgba(18, 150, 219, 0)" />
        </linearGradient>
      </defs>

      {services.map((_, i) => {
        const angle = (i / services.length) * Math.PI * 2;
        const radius = 35;
        const cx = 50 + centerOffset.x;
        const cy = 50 + centerOffset.y;
        const ox = cx + Math.cos(angle) * radius;
        const oy = cy + Math.sin(angle) * radius;

        return [
          <motion.line
            key={`line-${i}`}
            x1={cx}
            y1={cy}
            x2={ox}
            y2={oy}
            stroke="url(#connectingGradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{
              pathLength: { duration: 0.6, delay: 0.5 + i * 0.1 },
              opacity: { duration: 0.3 },
            }}
          />,
          !reducedMotion && (
            <motion.circle
              key={`particle-${i}`}
              cx={cx + (ox - cx) * progress}
              cy={cy + (oy - cy) * progress}
              r={2}
              fill="#1296DB"
              opacity={0.8}
            />
          ),
        ];
      })}
    </svg>
  );
}

export function ServiceOrbitCompact({ className = '' }: { className?: string }) {
  const services = useMemo(
    () => [
      { icon: <Code className="w-4 h-4" />, label: 'Dev', name: 'Web Development' as ServiceName },
      { icon: <Search className="w-4 h-4" />, label: 'SEO', name: 'SEO' as ServiceName },
      { icon: <Target className="w-4 h-4" />, label: 'Ads', name: 'Digital Ads' as ServiceName },
      { icon: <Palette className="w-4 h-4" />, label: 'Design', name: 'Graphic Design' as ServiceName },
      { icon: <Video className="w-4 h-4" />, label: 'Video', name: 'Video Editing' as ServiceName },
      { icon: <Sparkles className="w-4 h-4" />, label: 'AI', name: 'AI' as ServiceName },
    ],
    []
  );

  return (
    <div className={`relative w-64 h-64 ${className}`}>
      <ServiceOrbit orbitRadius={90} showLabels={false} delay={0} />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 mt-auto pt-4">
        {services.map((service, i) => {
          const colors = SERVICE_COLORS[service.name];
          return (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 2.5 + i * 0.05,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg backdrop-blur-sm border ${colors.bg}`}
            >
              <div className={colors.text}>{service.icon}</div>
              <span className="text-[10px] text-secondary-500">{service.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
