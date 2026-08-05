/*
 * Serverless SEO renderer for product pages.
 * Serves product.template.html with per-product <title>, meta description,
 * canonical, Open Graph, Twitter Card and JSON-LD Product injected into <head>,
 * so crawlers (Bing, Google, GPTBot…) see unique, indexable content even though
 * the client renders the visible page with JavaScript.
 *
 * Routing: vercel.json rewrites /product -> /api/product (query string preserved).
 * The client (product.js / script.js) is untouched.
 */
const products = require('./products.data.js');
const TEMPLATE = require('./product.template.js');

const SITE = 'https://www.ikaritokyo.it';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function plain(s) {
  return String(s)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function clip(s, n) {
  s = plain(s);
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

function headForProduct(p) {
  const typeLabel = p.cat === 'hoodie' ? 'Felpa' : 'T-Shirt';
  const seriesPart = p.series && p.series !== p.name ? ` ${p.series}` : '';
  const title = `${p.name} ${typeLabel}${seriesPart} | IkariTokyo`;
  const desc = clip(p.desc, 155);
  const url = `${SITE}/product?id=${p.id}`;
  const image = p.imgW || p.imgB;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.name} — ${typeLabel}${seriesPart}`,
    image: [p.imgB, p.imgW].filter(Boolean),
    description: plain(p.desc),
    brand: { '@type': 'Brand', name: 'IkariTokyo' },
    category: `${typeLabel} Anime ${p.series}`,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      price: String(p.price),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="product">`,
    `<meta property="og:site_name" content="IkariTokyo">`,
    `<meta property="og:locale" content="it_IT">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta property="product:price:amount" content="${esc(p.price)}">`,
    `<meta property="product:price:currency" content="EUR">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`
  ].join('\n  ');
}

function headForCatalog() {
  const title = 'Shop — T-Shirt e Felpe Anime Premium | IkariTokyo';
  const desc =
    "La collezione IkariTokyo: t-shirt e felpe streetwear ispirate all'anime e alla cultura pop giapponese. Grafiche originali in edizione limitata. Spedizione in Italia ed Europa.";
  const url = `${SITE}/product`;
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="IkariTokyo">`,
    `<meta property="og:locale" content="it_IT">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${SITE}/assets/og-image.jpg">`,
    `<meta name="twitter:card" content="summary_large_image">`
  ].join('\n  ');
}

module.exports = (req, res) => {
  let id = null;
  try {
    id = new URL(req.url, SITE).searchParams.get('id');
  } catch (e) {
    /* ignore malformed URL */
  }
  const product = id ? products.find((p) => p.id === id) : null;
  const head = product ? headForProduct(product) : headForCatalog();

  // Replace the first (template) <title> with the generated head block.
  const html = TEMPLATE.replace(/<title>[\s\S]*?<\/title>/, head);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.statusCode = 200;
  res.end(html);
};
