import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

// Placeholder company logos - in production these would be actual client logos
const trustedCompanies = [
  'Company 1',
  'Company 2',
  'Company 3',
  'Company 4',
  'Company 5',
  'Company 6',
];

export function TrustedBy() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="py-8 sm:py-12 border-y border-secondary-100 bg-white">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-secondary-500 font-medium uppercase tracking-wider mb-6 sm:mb-8 px-4"
        >
          Trusted by Leading Companies
        </motion.p>

        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling logos */}
          <div className="flex items-center justify-center gap-12 lg:gap-20">
            {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
              <motion.div
                key={`${company}-${index}`}
                animate={reducedMotion ? {} : {
                  x: [0, -600],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    duration: 20,
                    ease: 'linear',
                  },
                }}
                className="flex-shrink-0 flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="w-32 h-10 bg-secondary-200 rounded flex items-center justify-center text-xs text-secondary-400 font-medium">
                  {company}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
