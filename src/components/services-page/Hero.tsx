import { motion } from 'framer-motion';
import { ArrowRight, Code, Megaphone, Palette, Search, Sparkles, Terminal, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

const floatingIcons = [
  { icon: Code, color: '#67E8F9', label: 'Web Dev', top: '18%', left: '7%', delay: 0 },
  { icon: Sparkles, color: '#A5B4FC', label: 'AI', top: '22%', left: '82%', delay: 1.5 },
  { icon: Palette, color: '#F9A8D4', label: 'Design', top: '62%', left: '12%', delay: 0.8 },
  { icon: Megaphone, color: '#86EFAC', label: 'Marketing', top: '70%', left: '78%', delay: 2.2 },
  { icon: Search, color: '#FCD34D', label: 'SEO', top: '42%', left: '4%', delay: 1.2 },
  { icon: Terminal, color: '#93C5FD', label: 'Dev', top: '48%', left: '88%', delay: 0.5 },
  { icon: Zap, color: '#6EE7B7', label: 'Growth', top: '80%', left: '45%', delay: 1.8 },
];

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #0F2B6B 0%, #1296DB 35%, #4F46E5 70%, #2D1B69 100%)',
      }}
    >
      {/* Dot mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Background orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: '-100px',
          left: '-80px',
          background: 'radial-gradient(circle at 35% 35%, rgba(18,150,219,0.5), rgba(18,150,219,0.05) 60%, transparent 80%)',
          filter: 'blur(2px)',
        }}
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250,
          height: 250,
          bottom: '-40px',
          right: '5%',
          background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.5), rgba(139,92,246,0.05) 60%, transparent 80%)',
          filter: 'blur(2px)',
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Floating Icons */}
      {!reducedMotion && floatingIcons.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className="absolute z-0 hidden md:flex items-center justify-center w-12 h-12 rounded-2xl pointer-events-none"
            style={{
              top: item.top,
              left: item.left,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${item.color}20`,
              backdropFilter: 'blur(4px)',
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          >
            <Icon className="w-5 h-5" style={{ color: item.color }} />
          </motion.div>
        );
      })}

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Our Services
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          >
            Digital Solutions That Drive{' '}
            <span className="text-cyan-300">Real Business Growth</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Web development, SEO, digital marketing, AI solutions — everything your business needs to grow online.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button size="xl" variant="primary" className="w-full sm:w-auto shadow-glow-primary" asChild>
                <Link to="/book-consultation">Book Free Consultation</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <a href="#services">Explore Services</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
