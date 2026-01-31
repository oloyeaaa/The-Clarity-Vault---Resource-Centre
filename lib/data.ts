
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
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'mastering-automation-2024',
    title: 'The Clarity Vault: Mastering Marketing Automation for Experts',
    excerpt: 'In a world of noise, TCV brings the clarity required to automate growth without losing the human touch.',
    content: '## The Automation Paradox\n\nMarketing automation is often misunderstood as a way to replace human interaction. At The Clarity Vault, we view it as the ultimate leverage for experts—allowing them to scale their unique insights while maintaining personal connections with their audience...\n\n### The ROI of Precision\n\nPrecision isn\'t just about accuracy; it\'s about **impact**. When you automate a flawed process, you simply scale inefficiency. The TCV method starts with a deep audit of the "Why" before we touch the "How".',
    date: '2024-10-24',
    category: 'Strategy',
    status: 'Published',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://picsum.photos/seed/marcus/100/100',
      role: 'Founder, TCV'
    },
    readTime: '12 min read',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'post-2',
    slug: 'ai-integration-framework',
    title: 'The TCV AI Integration Framework: Beyond LLM Hype',
    excerpt: 'How to build an augmented intelligence system that prioritizes expert intuition over generative noise.',
    content: '## Moving Beyond Chatbots\n\nAI should not replace the expert, it should empower them. Our framework focuses on data hygiene and specific prompt engineering that extracts value rather than just text...\n\n> "The value of AI is not in its ability to write, but in its ability to synthesize complex expert datasets into actionable strategies."',
    date: '2024-11-12',
    category: 'AI Strategy',
    status: 'Published',
    author: {
      name: 'Elena Vance',
      avatar: 'https://picsum.photos/seed/elena/100/100',
      role: 'Head of Research'
    },
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'draft-1',
    slug: 'automated-lead-nurture-blueprint',
    title: '[DRAFT] Advanced Lead Nurture: The 12-Step Automation Logic',
    excerpt: 'A technical teardown of the high-converting nurture sequence used by TCV partners.',
    content: '## The Logic Flow\n\n1. Initial Trigger: Form Submission\n2. Filter: High Intent vs Low Intent\n3. Enrichment: Clearbit/Lusha API call\n\n**Note: This blueprint is currently in the drafting phase.**',
    date: '2024-12-01',
    category: 'Marketing Automation',
    status: 'Draft',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://picsum.photos/seed/marcus/100/100',
      role: 'Founder, TCV'
    },
    readTime: '15 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'draft-2',
    slug: 'seo-content-audit-checklist',
    title: '[DRAFT] The 2025 Semantic SEO Audit Checklist',
    excerpt: 'Updating our internal audit processes for the era of Search Generative Experience.',
    content: '### Semantic Depth Audit\n\nIn the era of SGE, keywords are secondary to **entities** and **intent clusters**. \n\n- [ ] Map primary entities\n- [ ] Check for E-E-A-T signals\n- [ ] Verify schema markup precision',
    date: '2024-12-05',
    category: 'SEO Performance',
    status: 'Draft',
    author: {
      name: 'Elena Vance',
      avatar: 'https://picsum.photos/seed/elena/100/100',
      role: 'Head of Research'
    },
    readTime: '10 min read',
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200'
  }
];
