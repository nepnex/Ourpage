// Removed unused react imports
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { GalleryItem } from '@/data/gallery';

interface MasonryGridProps {
  items: GalleryItem[];
  onImageClick: (item: GalleryItem) => void;
}

export function MasonryGrid({ items, onImageClick }: MasonryGridProps) {
  // We'll use a CSS-based masonry for simplicity and performance
  // By breaking items into columns based on screen size

  return (
    <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="break-inside-avoid"
          >
            <div 
              className="relative group rounded-2xl overflow-hidden cursor-pointer bg-secondary-100"
              onClick={() => onImageClick(item)}
              style={{
                aspectRatio: item.aspectRatio === 'square' ? '1/1' : item.aspectRatio === 'portrait' ? '3/4' : '4/3'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-secondary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 block">
                    {item.category[0]}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                </div>
              </div>
              
              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
