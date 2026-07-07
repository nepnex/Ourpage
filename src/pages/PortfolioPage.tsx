import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, Container, Button } from '@/components/ui';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/animations';
import { portfolioProjects, PortfolioCategory } from '@/data/portfolio';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';

const categories: PortfolioCategory[] = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Digital Marketing',
  'Branding',
  'SEO',
  'AI Solutions',
  'Concept Projects'
];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return portfolioProjects;
    }
    return portfolioProjects.filter((project) => project.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Our Portfolio & Concept Projects | NepNex</title>
        <meta name="description" content="Explore NepNex concept projects, creative experiments, and digital solutions showcasing how we help businesses build, grow, and succeed online." />
        <meta name="keywords" content="NepNex Portfolio, Web Development Company Nepal, Digital Marketing Company Nepal, Website Design Nepal, Software Company Nepal, Creative Agency Nepal" />
        <meta property="og:title" content="Our Portfolio & Concept Projects | NepNex" />
        <meta property="og:description" content="Explore NepNex concept projects, creative experiments, and digital solutions showcasing how we help businesses build, grow, and succeed online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/portfolio" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NepNex Portfolio",
            "description": "Explore NepNex concept projects and capabilities showcase.",
            "url": "https://nepnex.com/portfolio",
            "provider": {
              "@type": "Organization",
              "name": "NepNex Technologies",
              "url": "https://nepnex.com"
            }
          })}
        </script>
      </Helmet>

      <main className="bg-secondary-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(18,150,219,0.08) 0%, transparent 70%)' }} />
          
          <Container className="relative z-10 text-center">
            <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-primary-500" />
                Capabilities Showcase
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="heading-hero text-secondary-900 mb-6 max-w-4xl mx-auto">
              Building Digital Experiences That <span className="text-primary-600">Create Impact</span>
            </motion.h1>

            <motion.p variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-body-lg sm:text-body-xl text-secondary-500 max-w-3xl mx-auto leading-relaxed mb-10">
              Explore NepNex concept projects, creative experiments, and digital solutions showcasing how we help businesses build, grow, and succeed online.
            </motion.p>
            
            <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="primary" asChild>
                <Link to="/book-consultation">Start Your Project</Link>
              </Button>
              <Button size="xl" variant="outline" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </Container>
        </section>

        {/* Portfolio Grid Section */}
        <Section className="py-20">
          <Container>
            <PortfolioFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelect={setActiveCategory} 
            />

            <motion.div 
              layout
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-secondary-500">
                <p>No projects found in this category.</p>
              </div>
            )}
          </Container>
        </Section>
      </main>
    </>
  );
}

export default PortfolioPage;
