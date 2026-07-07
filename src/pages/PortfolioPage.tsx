import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, Container, Button, PageHero3D } from '@/components/ui';
import { staggerContainerVariants } from '@/utils/animations';
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
  'Concept Projects',
];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return portfolioProjects;
    return portfolioProjects.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Our Portfolio & Concept Projects | NepNex</title>
        <meta name="description" content="Explore NepNex concept projects, creative experiments, and digital solutions showcasing how we help businesses build, grow, and succeed online." />
        <meta name="keywords" content="NepNex Portfolio, Web Development Nepal, Digital Marketing Nepal, Website Design Nepal, Software Company Nepal" />
        <meta property="og:title" content="Our Portfolio & Concept Projects | NepNex" />
        <meta property="og:description" content="Explore NepNex concept projects, creative experiments, and digital solutions showcasing how we help businesses build, grow, and succeed online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/portfolio" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'NepNex Portfolio',
            'description': 'Explore NepNex concept projects and capabilities showcase.',
            'url': 'https://nepnex.com/portfolio',
            'provider': { '@type': 'Organization', 'name': 'NepNex Technologies', 'url': 'https://nepnex.com' },
          })}
        </script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <PageHero3D
          theme="indigo-purple"
          badge={<><Sparkles className="w-4 h-4" /> Capabilities Showcase</>}
          title={
            <>
              Digital Experiences That{' '}
              <span className="text-cyan-300">Create Impact</span>
            </>
          }
          subtitle="Concept projects and creative experiments showing what NepNex can build for your business."
          actions={
            <>
              <Button size="xl" variant="primary" asChild>
                <Link to="/book-consultation">Start Your Project</Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </>
          }
        />

        {/* ── Portfolio Grid ── */}
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
