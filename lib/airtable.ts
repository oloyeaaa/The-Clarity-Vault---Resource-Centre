
const AIRTABLE_API_KEY = process.env.API_KEY; // Using injected API key
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appXXXXXXXXXXXX'; // Fallback for type safety
const TABLE_NAME = 'Blog System';

const getHeaders = () => ({
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
});

export const fetchPosts = async () => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc`,
      { headers: getHeaders() }
    );
    const data = await response.json();
    return data.records.map((record: any) => ({
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
        name: record.fields['Author Name'],
        avatar: record.fields['Author Avatar'],
        role: record.fields['Author Role'],
      },
      readTime: record.fields['Read Time'],
      coverImage: record.fields['Cover Image'],
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

  const response = await fetch(url, {
    method,
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return response.ok;
};
