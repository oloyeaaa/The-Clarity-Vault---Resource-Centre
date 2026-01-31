import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const BASE_URL = 'https://theclarityvault.com';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Blog System';

const staticPages = [
  '',
  '/resources',
  '/blog',
];

async function generateSitemap() {
  console.log('🚀 Starting Sitemap Generation (ESM)...');
  
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('⚠️ Missing Airtable credentials. Skipping dynamic routes.');
  }

  try {
    let dynamicPages = [];
    
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      // 1. Fetch Dynamic Slugs from Airtable
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?filterByFormula={Status}='Published'`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
      );
      
      if (response.ok) {
        const data = await response.json();
        dynamicPages = data.records.map(record => `/blog/${record.fields.Slug || record.id}`);
        console.log(`📝 Found ${dynamicPages.length} published blog posts.`);
      } else {
        console.error(`❌ Airtable API error: ${response.status}`);
      }
    }

    // 2. Build XML String
    const allPages = [...staticPages, ...dynamicPages];
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    // 3. Save to Public (relative to this script's location)
    const publicDir = path.join(__dirname, '..', 'public');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const publicPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemapXml);
    console.log(`✅ Sitemap successfully created at ${publicPath}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();