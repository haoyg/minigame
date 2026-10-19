const fs = require("fs");
const path = require("path");
const { rootDir: ROOT_DIR, site } = require("./lib/site-config");

const ROOT = site.baseUrl;

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const date = today();
  const urls = [];

  // Homepage
  urls.push({ loc: `${ROOT}/`, changefreq: "daily", priority: "1.0", lastmod: date });

  // Category pages (preferred canonical routes, matching routeKeyForCategory in app.js)
  const categoryPages = site.categoryRoutes;
  for (const p of categoryPages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "daily", priority: "0.8", lastmod: date });
  }

  // Static pages
  const staticPages = site.staticRoutes;
  for (const p of staticPages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "monthly", priority: "0.5", lastmod: date });
  }

  // Editorial articles
  const articlePages = site.articleRoutes;
  for (const p of articlePages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "monthly", priority: "0.6", lastmod: date });
  }

  // Built-in games (static directories)
  const builtInGames = site.builtInGames;
  for (const g of builtInGames) {
    urls.push({ loc: `${ROOT}/games/${g}/`, changefreq: "monthly", priority: "0.7", lastmod: date });
  }

  // Generated game detail pages
  const playDir = path.join(ROOT_DIR, "play");
  const gameSlugs = fs.readdirSync(playDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(playDir, entry.name, "index.html")))
    .map((entry) => entry.name)
    .sort();
  for (const slug of gameSlugs) {
    urls.push({ loc: `${ROOT}/play/${slug}/`, changefreq: "monthly", priority: "0.7", lastmod: date });
  }

  let out = "";
  out += `<?xml version="1.0" encoding="UTF-8"?>\n`;
  out += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const u of urls) {
    out += `  <url>\n`;
    out += `    <loc>${escXml(u.loc)}</loc>\n`;
    out += `    <lastmod>${u.lastmod}</lastmod>\n`;
    out += `    <changefreq>${u.changefreq}</changefreq>\n`;
    out += `    <priority>${u.priority}</priority>\n`;
    out += `  </url>\n`;
  }
  out += `</urlset>\n`;

  if (process.argv.includes("--write")) {
    fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), out, "utf8");
    console.log(`Wrote ${urls.length} URLs to sitemap.xml`);
  } else {
    process.stdout.write(out);
  }
}

main();
