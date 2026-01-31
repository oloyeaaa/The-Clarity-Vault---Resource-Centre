
export interface Resource {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: string;
  tags: string[];
  certified: boolean;
  url: string;
}

export interface BlogPost {
  id: string;
  airtableId?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  status: 'Published' | 'Draft';
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTime: string;
  coverImage: string;
}
