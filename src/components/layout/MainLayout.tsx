import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useReducedMotion } from '@/hooks';

export function MainLayout() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
          className="flex-1 pt-16 sm:pt-20"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  );
}

