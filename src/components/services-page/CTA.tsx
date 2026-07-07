import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { fadeInUpVariants, easeTransitions } from '@/utils/animations';

const floatingOrbs = [
  { size: 300, x: -5, y: -20, color: 'rgba(255,255,255,0.06)', delay: 0, duration: 15 },
  { size: 220, x: 85, y: 55, color: 'rgba(79,70,229,0.15)', delay: 2, duration: 19 },
  { size: 160, x: 10, y: 75, color: 'rgba(6,182,212,0.1)', delay: 4, duration: 13 },
  { size: 150, x: 80, y: 5, color: 'rgba(255,255,255,0.05)', delay: 1, duration: 17 },
];

export function CTA() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div ref={inViewRef}>
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #0b5a85 0%, #0e78b0 25%, #1296DB 50%, #3730a3 75%, #4F46E5 100%)',
            backgroundSize: '300% 300%',
            animation: reducedMotion ? 'none' : 'gradient-rotate 10s ease infinite',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Floating orbs */}
        {!reducedMotion && floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none z-0"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ ...easeTransitions.smooth, delay: 0 }}
              className="flex justify-center mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Let's Build Something Great
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ ...easeTransitions.smooth, delay: 0.1 }}
              className="heading-section text-white mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>

            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ ...easeTransitions.smooth, delay: 0.2 }}
              className="text-body-lg sm:text-body-xl mb-12 max-w-2xl mx-auto text-white/80 leading-relaxed"
            >
              Whether you're launching a startup, growing a local business, or expanding an established company, NepNex is here to help you build, grow, and succeed through innovative digital solutions.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ ...easeTransitions.smooth, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white font-semibold text-primary-600 text-base transition-all duration-300 w-full sm:w-auto"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)' }}
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
