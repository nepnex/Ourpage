import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Section, Container } from '@/components/ui';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/animations';
import { blogPosts, blogCategories, BlogCategory } from '@/data/blog';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { useReducedMotion } from '@/hooks';

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');
  const reducedMotion = useReducedMotion();

  // Find first post as featured (or filter based on category)
  const featuredPost = useMemo(() => {
    return blogPosts[0];
  }, []);

  const filteredPosts = useMemo(() => {
    // Exclude featured post from grid listings to avoid duplicates on 'All'
    let posts = blogPosts;
    if (activeCategory !== 'All') {
      posts = posts.filter(post => post.category === activeCategory);
    } else {
      // Exclude featured post from list if viewing All
      posts = posts.filter(post => post.id !== featuredPost.id);
    }
    return posts;
  }, [activeCategory, featuredPost]);

  return (
    <>
      <Helmet>
        <title>Insights, Ideas & Digital Knowledge | NepNex</title>
        <meta name="description" content="Explore practical guides, industry insights, AI trends, marketing strategies, and technology updates to help businesses grow in the digital world." />
        <meta name="keywords" content="Digital Marketing Company Nepal, Web Development Company Nepal, SEO Company Nepal, Software Company Nepal, Creative Agency Nepal" />
        <meta property="og:title" content="Insights, Ideas & Digital Knowledge | NepNex" />
        <meta property="og:description" content="Explore practical guides, industry insights, AI trends, marketing strategies, and technology updates to help businesses grow in the digital world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/blog" />
      </Helmet>

      <main className="bg-secondary-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% -20%, rgba(18,150,219,0.1) 0%, rgba(79,70,229,0.05) 50%, transparent 100%)',
            }}
          />
          
          <Container className="relative z-10 text-center">
            <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase">
                <Compass className="w-4 h-4 text-primary-500" />
                Insights
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="heading-hero text-secondary-900 mb-6 max-w-4xl mx-auto">
              Insights, Ideas & <span className="text-primary-600">Digital Knowledge</span>
            </motion.h1>

            <motion.p variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-body-lg sm:text-body-xl text-secondary-500 max-w-3xl mx-auto leading-relaxed">
              Explore practical guides, industry insights, AI trends, marketing strategies, and technology updates to help businesses grow in the digital world.
            </motion.p>
          </Container>
        </section>

        {/* Blog Listing Section */}
        <Section className="py-20">
          <Container>
            {/* Show Featured Article only on 'All' */}
            {activeCategory === 'All' && featuredPost && (
              <FeaturedArticle post={featuredPost} />
            )}

            {/* Category Filter */}
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

            {/* Articles Grid */}
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
        </Section>
      </main>
    </>
  );
}

export default BlogPage;
