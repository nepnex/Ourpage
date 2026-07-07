export type GalleryCategory = 'All' | 'Website Designs' | 'UI Concepts' | 'Branding' | 'Social Media' | 'Photography' | 'Video' | 'Behind The Scenes' | 'Team' | 'Events' | 'AI Experiments';

export interface GalleryItem {
  id: string;
  category: GalleryCategory[];
  title: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    category: ['Website Designs', 'UI Concepts'],
    title: 'Modern E-commerce Dashboard UI',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '2',
    category: ['Photography', 'Behind The Scenes', 'Team'],
    title: 'Team Strategy Session',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '3',
    category: ['Branding', 'Social Media'],
    title: 'Minimalist Brand Identity Mockup',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'square'
  },
  {
    id: '4',
    category: ['UI Concepts', 'Website Designs'],
    title: 'Mobile Banking App Concept',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'portrait'
  },
  {
    id: '5',
    category: ['Photography', 'Events'],
    title: 'Tech Meetup Kathmandu 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '6',
    category: ['AI Experiments', 'UI Concepts'],
    title: 'AI Generated Abstract Backgrounds',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'square'
  },
  {
    id: '7',
    category: ['Website Designs'],
    title: 'Creative Agency Portfolio Layout',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '8',
    category: ['Team', 'Behind The Scenes'],
    title: 'Late Night Coding',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'portrait'
  },
  {
    id: '9',
    category: ['Branding'],
    title: 'Coffee Shop Packaging Concept',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'square'
  },
  {
    id: '10',
    category: ['Social Media', 'Video'],
    title: 'Instagram Reel Storyboard',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '11',
    category: ['Photography', 'Events'],
    title: 'Office Launch Party',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'landscape'
  },
  {
    id: '12',
    category: ['UI Concepts', 'AI Experiments'],
    title: 'Voice Assistant Interface',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'square'
  }
];
