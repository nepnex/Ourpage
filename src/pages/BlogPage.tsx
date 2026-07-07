import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Section, Container, PageHero3D } from '@/components/ui';
import { staggerContainerVariants } from '@/utils/animations';
import { blogPosts, blogCategories, BlogCategory } from '@/data/blog';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { useReducedMotion } from '@/hooks';

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');
  const reducedMotion = useReducedMotion();

  const featuredPost = useMemo(() => blogPosts[0], []);

  const filteredPosts = useMemo(() => {
    if (activeCategory !== 'All') return blogPosts.filter(p => p.category === activeCategory);
    return blogPosts.filter(p => p.id !== featuredPost.id);
  }, [activeCategory, featuredPost]);

  return (
    <>
      <Helmet>
        <title>Insights, Ideas & Digital Knowledge | NepNex</title>
        <meta name="description" content="Explore practical guides, industry insights, AI trends, marketing strategies, and technology updates to help businesses grow in the digital world." />
        <meta name="keywords" content="Digital Marketing Nepal, Web Development Nepal, SEO Nepal, Software Nepal, Creative Agency Nepal" />
        <meta property="og:title" content="Insights, Ideas & Digital Knowledge | NepNex" />
        <meta property="og:description" content="Explore practical guides, industry insights, AI trends, marketing strategies, and technology updates to help businesses grow in the digital world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/blog" />
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <PageHero3D
          theme="teal-blue"
          badge={<><Compass className="w-4 h-4" /> Insights</>}
          title={
            <>
              Ideas &{' '}
              <span className="text-cyan-300">Digital Knowledge</span>
            </>
          }
          subtitle="Practical guides, AI trends, and marketing strategies to grow your business."
        />

        {/* ── Articles ── */}
        <section
          className="py-20"
          style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #f5f3ff 100%)' }}
        >
          <Container>
            {activeCategory === 'All' && featuredPost && (
              <FeaturedArticle post={featuredPost} />
            )}

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
              {blogCategories.map((category) => {
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
                        layoutId="blogFilter"
                        className="absolute inset-0 rounded-full z-0"
                        style={{ background: 'linear-gradient(135deg, #1296DB, #4F46E5)' }}
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

            {/* Grid */}
            <motion.div
              layout
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    layout
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ArticleCard post={post} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-secondary-500">
                <p>No articles found in this category.</p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}

export default BlogPage;
