import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const HomePage = React.lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = React.lazy(() => import('@/pages/PlaceholderPages').then(m => ({ default: m.PortfolioPage })));
const AboutPage = React.lazy(() => import('@/pages/PlaceholderPages').then(m => ({ default: m.AboutPage })));

const BlogPage = React.lazy(() => import('@/pages/PlaceholderPages').then(m => ({ default: m.BlogPage })));
const ContactPage = React.lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));

const BookConsultationPage = React.lazy(() => import('@/pages/BookConsultationPage').then(m => ({ default: m.BookConsultationPage })));
const NotFoundPage = React.lazy(() => import('@/pages/PlaceholderPages').then(m => ({ default: m.NotFoundPage })));

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />

              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-consultation" element={<BookConsultationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
