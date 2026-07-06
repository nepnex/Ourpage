import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { Section, Button } from '@/components/ui';
import { fadeInUpVariants } from '@/utils/animations';

export function PortfolioPage() {
  return (
    <Section className="pt-8 sm:pt-12">
      <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto px-4">
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="heading-page text-secondary-900 mb-4">Portfolio Page</h1>
          <p className="text-body-md sm:text-body-lg text-secondary-500 mb-8">
            This page is under construction. Check back soon to see our amazing work!
          </p>
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />} asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

export function AboutPage() {
  return (
    <Section className="pt-8 sm:pt-12">
      <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto px-4">
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="heading-page text-secondary-900 mb-4">About Page</h1>
          <p className="text-body-md sm:text-body-lg text-secondary-500 mb-8">
            This page is under construction. Check back soon to learn more about us!
          </p>
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />} asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

export function BlogPage() {
  return (
    <Section className="pt-8 sm:pt-12">
      <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto px-4">
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="heading-page text-secondary-900 mb-4">Blog Page</h1>
          <p className="text-body-md sm:text-body-lg text-secondary-500 mb-8">
            This page is under construction. Check back soon for our latest articles!
          </p>
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />} asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

export function NotFoundPage() {
  return (
    <Section className="pt-8 sm:pt-12">
      <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto px-4">
        <div className="text-center py-12 sm:py-20">
          <div className="text-6xl sm:text-8xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="heading-page text-secondary-900 mb-4">Page Not Found</h1>
          <p className="text-body-md sm:text-body-lg text-secondary-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />} asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
