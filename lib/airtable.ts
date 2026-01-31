
import { BLOG_POSTS } from './data';

// Airtable Configuration using process.env
const AIRTABLE_API_KEY = process.env.VITE_AIRTABLE_TOKEN;
const BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;
const TABLE_ID = 'tblfptsecFwUXsxUy';

const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
});

const isConfigValid = () => {
  // Checks if the key exists and isn't just the default placeholder 'pat...'
  return !!(AIRTABLE_API_KEY && BASE_ID && !AIRTABLE_API_KEY.startsWith('pat...'));
};

export const fetchPosts = async () => {
  if (!isConfigValid()) {
    console.warn('Airtable configuration missing in environment. Using local samples.');
    return BLOG_POSTS;
  }
  
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc`,
      { headers: getHeaders() }
    );
    
    if (!response.ok) {
      throw new Error(`Airtable Error: ${response.status}`);
    }
    
    const data = await response.json();
    const airtableRecords = (data.records || []).map((record: any) => ({
      id: record.id,
      airtableId: record.id,
      slug: record.fields.Slug,
      title: record.fields.Title,
      excerpt: record.fields.Excerpt,
      content: record.fields.Content,
      date: record.fields.Date,
      category: record.fields.Category,
      status: record.fields.Status || 'Draft',
      author: {
        name: record.fields['Author Name'] || 'Admin',
        avatar: record.fields['Author Avatar'] || 'https://picsum.photos/seed/tcv/100/100',
        role: record.fields['Author Role'] || 'Editor',
      },
      readTime: record.fields['Read Time'] || '5 min read',
      coverImage: record.fields['Cover Image'] || 'https://picsum.photos/seed/tcv-blog/1200/600',
    }));

    return airtableRecords.length > 0 ? airtableRecords : BLOG_POSTS;
  } catch (error) {
    console.error('Airtable Fetch Error:', error);
    return BLOG_POSTS;
  }
};

export const savePost = async (post: any, isNew: boolean = false) => {
  if (!isConfigValid()) {
    console.error('Cannot save: Airtable configuration is missing from environment.');
    return false;
  }

  const url = isNew 
    ? `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`
    : `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${post.airtableId || post.id}`;
  
  const method = isNew ? 'POST' : 'PATCH';
  
  const fields = {
    Title: post.title,
    Slug: post.slug,
    Excerpt: post.excerpt,
    Content: post.content,
    Category: post.category,
    Status: post.status,
    Date: post.date || new Date().toISOString().split('T')[0],
    'Read Time': post.readTime || '5 min read',
    'Cover Image': post.coverImage,
    'Author Name': post.author?.name || 'Marcus Thorne',
    'Author Avatar': post.author?.avatar || 'https://picsum.photos/seed/marcus/100/100',
    'Author Role': post.author?.role || 'Founder',
  };

  const body = isNew 
    ? { records: [{ fields }] } 
    : { fields };

  try {
    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return response.ok;
  } catch (error) {
    console.error('Save error:', error);
    return false;
  }
};
