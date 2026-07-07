import { motion } from 'framer-motion';
import { PortfolioCategory } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks';

interface PortfolioFilterProps {
  categories: PortfolioCategory[];
  activeCategory: PortfolioCategory;
  onSelect: (category: PortfolioCategory) => void;
}

export function PortfolioFilter({ categories, activeCategory, onSelect }: PortfolioFilterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${isActive ? 'text-white shadow-md' : 'text-secondary-600 bg-white hover:bg-secondary-50 hover:text-secondary-900 border border-secondary-200'}
            `}
          >
            {isActive && !reducedMotion && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary-600 rounded-full z-0"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {isActive && reducedMotion && (
              <div className="absolute inset-0 bg-primary-600 rounded-full z-0" />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
