import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { fadeInUpVariants, easeTransitions } from '@/utils/animations';

export function CTA() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-12 sm:py-section lg:py-section-lg overflow-hidden">
      <div ref={inViewRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating shapes */}
      <motion.div
        animate={reducedMotion ? {} : { y: [-30, 30, -30], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-48 h-48 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={reducedMotion ? {} : { y: [30, -30, 30], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-80 sm:h-80 bg-accent-500/20 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={easeTransitions.smooth}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-200" />
              <span className="text-sm font-medium text-white/90">Start Your Journey Today</span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={easeTransitions.smooth}
            className="heading-section text-white mb-4 sm:mb-6"
          >
            Ready to Transform Your Digital Presence?
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={easeTransitions.smooth}
            className="text-body-md sm:text-body-lg lg:text-body-xl text-primary-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-2"
          >
            Let's discuss how NepNex Technologies can help your business achieve its digital goals.
            Book a free consultation and take the first step towards digital excellence.
          </motion.p>

          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={easeTransitions.smooth}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          >
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto sm:px-8 sm:h-14 sm:text-xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              asChild
            >
              <Link to="/book-consultation">Book Free Consultation</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:px-8 sm:h-14 sm:text-xl border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/50"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </Container>
      </div>
    </section>
  );
}
