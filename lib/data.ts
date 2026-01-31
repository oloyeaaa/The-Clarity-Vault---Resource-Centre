
import { Resource, BlogPost } from '../types';

export const RESOURCES: Resource[] = [
  {
    id: 'res-1',
    slug: 'ahrefs-seo-suite',
    name: 'Ahrefs',
    description: 'The gold standard for backlink analysis and keyword research.',
    longDescription: 'Ahrefs is an all-in-one SEO toolset that helps you optimize your website, analyze your competitors, and track your search rankings. It is widely considered the industry benchmark for link data.',
    category: 'SEO Performance',
    icon: 'search',
    tags: ['Backlinks', 'Keywords', 'Analytics'],
    certified: true,
    url: 'https://ahrefs.com'
  },
  {
    id: 'res-2',
    slug: 'make-automation',
    name: 'Make.com',
    description: 'Visual automation platform to design and build workflows.',
    longDescription: 'Make is a powerful visual platform that lets you design, build, and automate anything—from tasks and workflows to apps and systems—without writing any code.',
    category: 'Marketing Automation',
    icon: 'zap',
    tags: ['Workflows', 'No-Code', 'API'],
    certified: true,
    url: 'https://make.com'
  },
  {
    id: 'res-3',
    slug: 'jasper-ai-content',
    name: 'Jasper AI',
    description: 'Enterprise-grade AI content generator for marketing teams.',
    longDescription: 'Jasper is the AI Content Platform that helps you and your team break through creative blocks to create amazing, original content 10X faster.',
    category: 'AI Strategy',
    icon: 'brain',
    tags: ['Copywriting', 'AI', 'Content'],
    certified: false,
    url: 'https://jasper.ai'
  },
  {
    id: 'res-4',
    slug: 'hubspot-crm',
    name: 'HubSpot',
    description: 'Full-stack CRM and marketing suite for customer journeys.',
    longDescription: 'HubSpot offers a complete CRM platform with all the tools and integrations you need for marketing, sales, content management, and customer service.',
    category: 'Content Systems',
    icon: 'users',
    tags: ['CRM', 'Inbound', 'Lead Gen'],
    certified: true,
    url: 'https://hubspot.com'
  },
  {
    id: 'res-5',
    slug: 'tableau-bi',
    name: 'Tableau',
    description: 'Powerful business intelligence and data visualization.',
    longDescription: 'Tableau is the worlds leading analytics platform, offering visual analytics with powerful AI, data management and collaboration.',
    category: 'Growth Data',
    icon: 'bar-chart',
    tags: ['BI', 'Visualization', 'Big Data'],
    certified: false,
    url: 'https://tableau.com'
  },
  {
    id: 'res-6',
    slug: 'adclarity-intelligence',
    name: 'AdClarity',
    description: 'Uncover competitor ad strategies across all digital channels.',
    longDescription: 'AdClarity provides transparency into the digital advertising world, allowing you to see where competitors are spending and what creatives are working.',
    category: 'Intelligence',
    icon: 'eye',
    tags: ['Ads', 'Competitors', 'Display'],
    certified: false,
    url: 'https://adclarity.com'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'mastering-automation-2024',
    title: 'The Clarity Vault: Mastering Marketing Automation for Experts',
    excerpt: 'In a world of noise, TCV brings the clarity required to automate growth without losing the human touch.',
    content: 'Marketing automation is often misunderstood as a way to replace human interaction. At The Clarity Vault, we view it as the ultimate leverage for experts—allowing them to scale their unique insights while maintaining personal connections with their audience...',
    date: 'Oct 24, 2024',
    category: 'Strategy',
    // Added missing status property
    status: 'Published',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://picsum.photos/seed/marcus/100/100',
      role: 'Founder, TCV'
    },
    readTime: '12 min read',
    coverImage: 'https://picsum.photos/seed/post1/1200/600'
  },
  {
    id: 'post-2',
    slug: 'ai-integration-framework',
    title: 'The TCV AI Integration Framework: Beyond LLM Hype',
    excerpt: 'How to build an augmented intelligence system that prioritizes expert intuition over generative noise.',
    content: 'AI should not replace the expert, it should empower them. Our framework focuses on data hygiene and specific prompt engineering that extracts value rather than just text...',
    date: 'Nov 12, 2024',
    category: 'AI Strategy',
    // Added missing status property
    status: 'Published',
    author: {
      name: 'Elena Vance',
      avatar: 'https://picsum.photos/seed/elena/100/100',
      role: 'Head of Research'
    },
    readTime: '8 min read',
    coverImage: 'https://picsum.photos/seed/post2/1200/600'
  }
];
