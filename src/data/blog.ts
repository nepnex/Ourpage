export type BlogCategory =
  | 'Digital Marketing'
  | 'SEO'
  | 'Web Development'
  | 'AI'
  | 'Business Growth'
  | 'Branding'
  | 'Technology'
  | 'NepNex Updates';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  image: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-web-development-2026',
    title: 'The Future of Web Development: What to Expect in 2026',
    description: 'Explore the next phase of web architectures, edge computing, AI-driven development tools, and how speed is redefining web development.',
    excerpt: 'An in-depth look at emerging web architectures, AI code co-pilots, and how modern frameworks are shaping the next generation of web performance.',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'July 5, 2026',
    readingTime: '5 min read',
    author: {
      name: 'Binod Tamang',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      role: 'Lead Developer, NepNex',
    },
    content: `
# The Future of Web Development: What to Expect in 2026

The web landscape is changing faster than ever. As we look at development practices today, several key paradigms are shifting from experimental features to industry-wide standards. Whether you're a developer, a business owner, or a designer, understanding these shifts is crucial.

## 1. Edge-First Architectures
Computing is moving closer to the user. Rather than running server-side logic in a single centralized data center, modern platforms distribute serverless execution directly onto the edge network.
* **Benefits:** Near-zero latency, instant load times, and superior globally distributed security.
* **Framework Support:** Technologies like Next.js, Remix, and SvelteKit are building edge-rendering into their cores.

## 2. Artificial Intelligence in the Development Loop
AI is no longer just autocomplete. In 2026, AI assistants help design database models, audit code for performance bottlenecks, and generate boilerplate code with high contextual awareness.
* Developers focus more on system design, architecture, and user experience.
* Code generation is faster, but code auditing is now a critical developer skill.

## 3. High-Performance Styling
Modern CSS methodologies have matured. Utilities like Tailwind CSS and CSS-in-JS are now co-existing with native CSS features like CSS Container Queries, CSS Grid Layouts, and native nesting, making layout rendering faster and cleaner.
    `
  },
  {
    id: '2',
    slug: 'local-seo-guide-nepal',
    title: 'Mastering Local SEO: A Step-by-Step Guide for Nepali Businesses',
    description: 'Learn how to optimize your business for local searches in Nepal, attract walk-in clients, and dominate Google Maps.',
    excerpt: 'Get actionable tips on how to structure your business online to attract local customers, optimize Google Business Profile, and capture local searches.',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'June 28, 2026',
    readingTime: '6 min read',
    author: {
      name: 'Aasish Shrestha',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      role: 'SEO Strategist, NepNex',
    },
    content: `
# Mastering Local SEO in Nepal

If you run a local restaurant, retail store, hotel, or agency in Nepal, being visible when users search "near me" or "in Kathmandu" is critical to your growth.

## The Pillars of Local SEO

1. **Google Business Profile (GBP)**
   Claim and fully optimize your Google Maps listing. Ensure your name, address, and phone number (NAP) are identical everywhere.
2. **Local Keywords**
   Optimize for city-specific search terms. For example, instead of just "Web Development", focus on "Web Development Company in Kathmandu".
3. **Customer Reviews**
   Encourage happy customers to leave reviews. Respond to reviews to signal active engagement to Google’s algorithm.
    `
  },
  {
    id: '3',
    slug: 'ai-transforming-small-business-nepal',
    title: 'How AI Tools Can Automate Your Daily Business Workflows',
    description: 'An overview of modern AI workflows that small to medium businesses can use to boost productivity and reduce operational overhead.',
    excerpt: 'Discover tools like ChatGPT, Claude, and automation platforms to optimize email drafting, reporting, and customer support routing.',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2026',
    readingTime: '4 min read',
    author: {
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      role: 'AI Solutions Engineer',
    },
    content: `
# Automating Small Business Workflows with AI

For growing businesses, time is the most valuable resource. Artificial Intelligence is democratizing tools that previously only enterprise organizations could afford.

## Workflow Automation Ideas

* **Automated Support Routing:** Use AI classification models to sort incoming customer emails.
* **Content Generation:** Streamline social media drafts and product descriptions.
* **Data Synthesis:** Ask LLMs to summarize lengthy financial tables and client call transcripts.
    `
  },
  {
    id: '4',
    slug: 'importance-of-branding-for-startups',
    title: 'Why Startups Need a Strong Brand Identity from Day One',
    description: 'Learn why branding is more than just a logo, and how it helps startups build trust and compete with established industry giants.',
    excerpt: 'Explore how consistent visual systems, voice guidelines, and core brand values build long-term trust and customer loyalty.',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'June 02, 2026',
    readingTime: '5 min read',
    author: {
      name: 'Prerna Joshi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      role: 'Creative Director, NepNex',
    },
    content: `
# Branding for Startups: More Than Just a Logo

Many startups treat branding as an afterthought, focusing solely on product development. However, visual identity and brand storytelling are critical to initial customer acquisition.

## The Foundations of Brand Identity

1. **Brand Voice:** How does your business sound? Formal, friendly, playful, or expert?
2. **Visual Consistency:** A unified color palette, typography scale, and image guidelines across all customer touchpoints.
3. **Core Promise:** A simple, powerful statement that defines why your business exists and what makes you different.
    `
  }
];
export const blogCategories: (BlogCategory | 'All')[] = [
  'All',
  'Digital Marketing',
  'SEO',
  'Web Development',
  'AI',
  'Business Growth',
  'Branding',
  'Technology',
  'NepNex Updates',
];
