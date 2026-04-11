
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://github.com/tangtaozhanshen/aliyun-promotion-seo/blob/main/';

function generateSitemap(dir) {
  const files = fs.readdirSync(dir);
  let urls = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      urls = urls.concat(generateSitemap(fullPath));
    } else {
      if (path.extname(file) === '.md') {
        const urlPath = fullPath.replace('/root/.openclaw/workspace/promotion/', '');
        urls.push(`${baseUrl}${urlPath}`);
      }
    }
  }

  return urls;
}

const urls = generateSitemap('/root/.openclaw/workspace/promotion');

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}README.md</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
`;

for (const url of urls) {
  if (url !== baseUrl + 'README.md') {
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
`;
  }
}

sitemap += '</urlset>';

fs.writeFileSync('/root/.openclaw/workspace/promotion/sitemap.xml', sitemap, 'utf-8');
console.log(`Generated sitemap with ${urls.length} articles`);
