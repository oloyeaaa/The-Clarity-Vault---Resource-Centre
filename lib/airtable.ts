
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
  } catch (e) {
    return '';
  }
};

const AIRTABLE_API_KEY = getApiKey();
const BASE_ID = (typeof process !== 'undefined' && process.env && process.env.AIRTABLE_BASE_ID) || 'appXXXXXXXXXXXX';
const TABLE_NAME = 'Blog System';

const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
});

export const fetchPosts = async () => {
  if (!AIRTABLE_API_KEY) {
    console.warn('Airtable API Key is missing. Dashboard will operate in offline/mock mode.');
    return [];
  }
  
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc`,
      { headers: getHeaders() }
    );
    
    if (!response.ok) {
      throw new Error(`Airtable Error: ${response.status}`);
    }
    
    const data = await response.json();
    return (data.records || []).map((record: any) => ({
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
  } catch (error) {
    console.error('Airtable Fetch Error:', error);
    return [];
  }
};

export const savePost = async (post: any, isNew: boolean = false) => {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
  const method = isNew ? 'POST' : 'PATCH';
  
  const fields = {
    Title: post.title,
    Slug: post.slug,
    Excerpt: post.excerpt,
    Content: post.content,
    Category: post.category,
    Status: post.status,
    Date: post.date || new Date().toISOString().split('T')[0],
    'Read Time': post.readTime,
    'Cover Image': post.coverImage,
    'Author Name': post.author.name,
    'Author Avatar': post.author.avatar,
    'Author Role': post.author.role,
  };

  const body = isNew 
    ? { records: [{ fields }] } 
    : { records: [{ id: post.airtableId, fields }] };

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
