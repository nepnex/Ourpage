import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { fadeInUpVariants } from '@/utils/animations';
import { galleryItems, GalleryCategory, GalleryItem } from '@/data/gallery';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { Lightbox } from '@/components/gallery/Lightbox';
import { useReducedMotion } from '@/hooks';

const categories: GalleryCategory[] = [
  'All',
  'Website Designs',
  'UI Concepts',
  'Branding',
  'Social Media',
  'Photography',
  'Video',
  'Behind The Scenes',
  'Team',
  'Events',
  'AI Experiments'
];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const reducedMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter(item => item.category.includes(activeCategory));
  }, [activeCategory]);

  const handleNext = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Creative Showcase & Gallery | NepNex</title>
        <meta name="description" content="Explore NepNex's creative designs, experiments, photography, behind-the-scenes moments, and our creative journey." />
        <meta property="og:title" content="Creative Showcase & Gallery | NepNex" />
        <meta property="og:description" content="Explore NepNex's creative designs, experiments, photography, behind-the-scenes moments, and our creative journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/gallery" />
      </Helmet>

      <main className="bg-secondary-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(18,150,219,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(18,150,219,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <Container className="relative z-10 text-center">
            <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase">
                <Camera className="w-4 h-4 text-primary-500" />
                Gallery
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="heading-hero text-secondary-900 mb-6 max-w-4xl mx-auto">
              Creative <span className="text-primary-600">Showcase</span>
            </motion.h1>

            <motion.p variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-body-lg sm:text-body-xl text-secondary-500 max-w-3xl mx-auto leading-relaxed mb-10">
              Explore our designs, experiments, photography, behind-the-scenes moments, and our creative journey.
            </motion.p>
          </Container>
        </section>

        {/* Gallery Content */}
        <Section className="py-20">
          <Container>
            
            {/* Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                      ${isActive ? 'text-white shadow-md' : 'text-secondary-600 bg-white hover:bg-secondary-50 hover:text-secondary-900 border border-secondary-200'}
                    `}
                  >
                    {isActive && !reducedMotion && (
                      <motion.div
                        layoutId="galleryFilter"
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

            {/* Masonry Grid */}
            <MasonryGrid items={filteredItems} onImageClick={setLightboxItem} />
            
            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-secondary-500">
                <p>No images found in this category.</p>
              </div>
            )}
          </Container>
        </Section>
      </main>

      <Lightbox 
        item={lightboxItem} 
        onClose={() => setLightboxItem(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={lightboxItem ? filteredItems.findIndex(i => i.id === lightboxItem.id) < filteredItems.length - 1 : false}
        hasPrev={lightboxItem ? filteredItems.findIndex(i => i.id === lightboxItem.id) > 0 : false}
      />
    </>
  );
}

export default GalleryPage;
