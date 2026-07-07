import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Container, Section, PageHero3D } from '@/components/ui';
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
  'AI Experiments',
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
    const idx = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (idx < filteredItems.length - 1) setLightboxItem(filteredItems[idx + 1]);
  };

  const handlePrev = () => {
    if (!lightboxItem) return;
    const idx = filteredItems.findIndex(i => i.id === lightboxItem.id);
    if (idx > 0) setLightboxItem(filteredItems[idx - 1]);
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

      <main>
        {/* ── Hero ── */}
        <PageHero3D
          theme="purple-pink"
          badge={<><Camera className="w-4 h-4" /> Gallery</>}
          title={
            <>
              Our Creative{' '}
              <span className="text-pink-300">Showcase</span>
            </>
          }
          subtitle="Designs, experiments, photography, and the moments behind what we create."
        />

        {/* ── Gallery Content ── */}
        <Section
          className="py-20"
          style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #f0f7ff 100%)' } as React.CSSProperties}
        >
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
                      ${isActive
                        ? 'text-white shadow-md'
                        : 'text-secondary-600 bg-white hover:bg-secondary-50 hover:text-secondary-900 border border-secondary-200'
                      }
                    `}
                  >
                    {isActive && !reducedMotion && (
                      <motion.div
                        layoutId="galleryFilter"
                        className="absolute inset-0 rounded-full z-0"
                        style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {isActive && reducedMotion && (
                      <div className="absolute inset-0 bg-purple-600 rounded-full z-0" />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

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
