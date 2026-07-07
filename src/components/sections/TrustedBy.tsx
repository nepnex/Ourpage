import { motion } from 'framer-motion';
import { Container } from '@/components/ui';

// Placeholder company logos — in production these would be actual client logos
const trustedCompanies = [
  { name: 'Company 1', color: '#1296DB' },
  { name: 'Company 2', color: '#4F46E5' },
  { name: 'Company 3', color: '#10B981' },
  { name: 'Company 4', color: '#06B6D4' },
  { name: 'Company 5', color: '#8B5CF6' },
  { name: 'Company 6', color: '#F59E0B' },
];

// Duplicate for seamless looping
const allCompanies = [...trustedCompanies, ...trustedCompanies, ...trustedCompanies];

export function TrustedBy() {
  return (
    <div className="py-10 sm:py-14 border-y border-secondary-100 bg-white relative overflow-hidden">
      {/* Subtle top radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(18,150,219,0.03) 0%, transparent 70%)',
        }}
      />

      <Container>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs sm:text-sm text-secondary-400 font-semibold uppercase tracking-widest mb-8 sm:mb-10 px-4 flex items-center justify-center gap-3"
        >
          <span
            className="w-8 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #1296DB)' }}
          />
          Trusted by Leading Companies
          <span
            className="w-8 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, #1296DB, transparent)' }}
          />
        </motion.p>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, white, transparent)' }} />

          {/* Marquee track — CSS animation for smooth 60fps */}
          <div className="marquee-track">
            {allCompanies.map((company, index) => (
              <LogoItem key={`${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function LogoItem({ company }: { company: { name: string; color: string } }) {
  return (
    <div
      className="flex-shrink-0 group cursor-default"
      style={{ minWidth: '140px' }}
    >
      <div
        className="h-12 px-6 rounded-xl border border-secondary-100 bg-white flex items-center justify-center
          grayscale opacity-40 hover:grayscale-0 hover:opacity-100
          hover:-translate-y-1 hover:shadow-md hover:border-secondary-200
          transition-all duration-400 ease-out"
        style={{
          '--hover-border-color': company.color,
        } as React.CSSProperties}
      >
        <span
          className="text-xs font-semibold tracking-wide text-secondary-500 group-hover:text-secondary-700 transition-colors whitespace-nowrap"
          style={{ color: 'inherit' }}
        >
          {company.name}
        </span>
      </div>
    </div>
  );
}
