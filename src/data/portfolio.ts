export type PortfolioCategory = 'All' | 'Web Development' | 'UI/UX Design' | 'Digital Marketing' | 'Branding' | 'SEO' | 'AI Solutions' | 'Concept Projects';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory[];
  shortDescription: string;
  description: string;
  image: string;
  services: string[];
  technologies: string[];
  challenge?: string;
  solution?: string;
  process?: string[];
  features?: string[];
  outcomes?: string[];
  gallery?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'nepnex-corporate-website',
    title: 'NepNex Corporate Website',
    category: ['Concept Projects', 'Web Development', 'UI/UX Design'],
    shortDescription: 'A modern technology company website focused on performance, user experience, and digital storytelling.',
    description: 'This concept project demonstrates our ability to build a world-class corporate identity online. By focusing on modern aesthetics, micro-interactions, and a robust technical architecture, we showcased what a premium digital presence looks like for forward-thinking tech companies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Website Development', 'UI/UX Design', 'SEO', 'Animation'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    challenge: 'Technology companies often struggle to convey their complex service offerings in an engaging, easy-to-understand manner without overwhelming the user with technical jargon or cluttered interfaces.',
    solution: 'We designed a clean, storytelling-driven interface leveraging glassmorphism, dynamic gradients, and smooth scroll animations to guide visitors through the services naturally, ensuring high performance and accessibility.',
    process: ['Discovery & Research', 'Wireframing & Prototyping', 'Visual Design (UI)', 'Frontend Development', 'Performance Optimization'],
    features: ['Custom scroll-linked animations', 'Interactive service cards', 'Responsive masonry layouts', 'Dynamic SEO routing'],
    outcomes: ['Increased perceived brand value', 'Higher engagement time on page', 'Improved conversion rate for consultation bookings'],
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '2',
    slug: 'himalayan-e-commerce',
    title: 'Himalayan E-Commerce Store',
    category: ['Concept Projects', 'Web Development'],
    shortDescription: 'A modern online store concept designed for Nepali businesses to sell products digitally.',
    description: 'A conceptual e-commerce platform designed to bring local Himalayan products to a global audience. The project emphasizes seamless navigation, high-quality product visualization, and a frictionless checkout experience tailored for the modern consumer.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['E-commerce', 'UI Design', 'Payment Integration'],
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'Zustand'],
    challenge: 'Creating an e-commerce experience that feels both culturally authentic to Nepal and meets the high usability standards expected by international buyers.',
    solution: 'Integrated a minimalist design system that highlights rich product photography, combined with a blazing-fast shopping cart and secure, multi-currency payment gateways.',
    process: ['Market Analysis', 'User Flow Mapping', 'UI Design', 'API Integration', 'Testing & QA'],
    features: ['Real-time inventory sync', 'Multi-currency support', 'One-click checkout', 'Advanced product filtering'],
    outcomes: ['Frictionless purchasing journey', 'Scalable product catalog structure', 'Mobile-first shopping experience'],
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: '3',
    slug: 'restaurant-digital-transformation',
    title: 'Restaurant Digital Transformation',
    category: ['Concept Projects', 'Web Development', 'Digital Marketing', 'SEO'],
    shortDescription: 'A complete digital presence concept helping restaurants attract customers through websites, SEO, and social media.',
    description: 'This concept showcases how a local restaurant can dominate its market through a cohesive digital strategy. It combines an appetizing website design with local SEO tactics and targeted social media marketing to drive foot traffic and online orders.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Web Design', 'Local SEO', 'Social Media Strategy'],
    technologies: ['React', 'Framer Motion', 'Google Analytics', 'Meta Business Suite'],
    challenge: 'Restaurants often rely solely on third-party delivery apps, losing control over their brand experience and profit margins.',
    solution: 'We conceptualized an independent digital ecosystem including a direct-ordering website, optimized Google Business Profile, and an engaged Instagram presence.',
    process: ['Brand Audit', 'Website Development', 'SEO Optimization', 'Content Creation Plan'],
    features: ['Online reservation system', 'Dynamic menu management', 'Local search optimization', 'Instagram feed integration'],
    outcomes: ['Increased direct bookings', 'Higher local search visibility', 'Stronger brand loyalty'],
  },
  {
    id: '4',
    slug: 'nepal-travel-experience',
    title: 'Nepal Travel Experience Platform',
    category: ['Concept Projects', 'Web Development', 'Branding'],
    shortDescription: 'A visual travel platform concept showcasing Nepal destinations with immersive digital experiences.',
    description: 'An immersive digital platform designed to inspire travel to Nepal. By utilizing large-scale imagery, ambient video backgrounds, and interactive maps, this concept brings the majesty of the Himalayas to the user\'s screen.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Web Design', 'Branding', 'Interactive Development'],
    technologies: ['Vue.js', 'Mapbox GL', 'GSAP', 'Tailwind CSS'],
    challenge: 'Conveying the scale, emotion, and cultural depth of traveling in Nepal through a flat screen.',
    solution: 'Leveraged high-performance WebGL and scroll-triggered animations to create a cinematic browsing experience that feels more like an interactive documentary than a standard website.',
    process: ['Concept Ideation', 'Storyboarding', 'Interactive Design', 'Frontend Implementation'],
    features: ['Interactive 3D maps', 'Cinematic video headers', 'Custom trip builder', 'Immersive photo galleries'],
    outcomes: ['High user engagement', 'Memorable brand experience', 'Visual storytelling excellence'],
  },
  {
    id: '5',
    slug: 'digital-marketing-campaign',
    title: 'Digital Marketing Campaign Concept',
    category: ['Concept Projects', 'Digital Marketing', 'Branding'],
    shortDescription: 'A sample campaign demonstrating content strategy, social media design, advertising, and analytics.',
    description: 'A comprehensive mock campaign illustrating our approach to data-driven marketing. This project breaks down a full-funnel strategy, from awareness-stage social media creatives to bottom-funnel conversion ads and retargeting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['Campaign Strategy', 'Ad Design', 'Copywriting', 'Analytics Setup'],
    technologies: ['Figma', 'Google Ads', 'Meta Ads Manager', 'Looker Studio'],
    challenge: 'Creating a unified marketing message that adapts effectively across multiple platforms (Instagram, LinkedIn, Google Search) while maintaining brand consistency.',
    solution: 'Developed a modular creative system paired with a robust tracking architecture to ensure every ad dollar is measured and optimized for maximum ROI.',
    process: ['Audience Persona Development', 'Creative Asset Production', 'Campaign Configuration', 'A/B Testing Framework'],
    features: ['Cross-platform creative consistency', 'Advanced conversion tracking', 'Dynamic retargeting flows', 'Live reporting dashboards'],
    outcomes: ['Lower Cost Per Acquisition (CPA)', 'Higher Click-Through Rates (CTR)', 'Data-backed scalability'],
  },
  {
    id: '6',
    slug: 'ai-business-assistant',
    title: 'AI Business Assistant',
    category: ['Concept Projects', 'AI Solutions', 'Web Development'],
    shortDescription: 'An AI-powered business productivity concept showing automation possibilities.',
    description: 'A forward-looking concept project demonstrating how custom AI solutions can streamline business operations. This dashboard integrates Large Language Models (LLMs) to automate customer support routing, generate reports, and assist with daily administrative tasks.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: ['AI Integration', 'Dashboard Design', 'Workflow Automation'],
    technologies: ['React', 'Node.js', 'OpenAI API', 'LangChain'],
    challenge: 'Businesses generate vast amounts of unstructured data (emails, chats, feedback) that require significant human hours to process and act upon.',
    solution: 'Designed a unified AI dashboard that ingests company data and provides a conversational interface for employees to query information, generate summaries, and trigger automated workflows.',
    process: ['Use Case Definition', 'Prompt Engineering', 'UI/UX Design', 'API Integration', 'Security Auditing'],
    features: ['Natural language querying', 'Automated email drafting', 'Sentiment analysis dashboard', 'Custom knowledge base integration'],
    outcomes: ['Drastic reduction in manual data entry', 'Faster customer response times', 'Enhanced team productivity'],
  }
];
