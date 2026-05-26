const fs = require("fs");
const path = require("path");

const ROOT = "https://pokopie.com";
const SCRIPT_DIR = __dirname;
const ROOT_DIR = path.resolve(SCRIPT_DIR, "..");
const INDEX_PATH = path.join(ROOT_DIR, "index.html");
const CATALOG_PATH = path.join(ROOT_DIR, "games-catalog.json");

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "game";
}

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

function extractTitlesFromInlineScript(html) {
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  const script = (m && m[1]) || "";
  const titles = [];
  for (const mm of script.matchAll(/\btitle:\s*"([^"]+)"/g)) titles.push(mm[1]);
  return titles;
}

function buildUniqueSlugs(titles) {
  const used = new Set();
  const slugs = [];
  for (const t of titles) {
    let s = slugify(t);
    if (used.has(s)) {
      let i = 2;
      while (used.has(`${s}-${i}`)) i += 1;
      s = `${s}-${i}`;
    }
    used.add(s);
    slugs.push(s);
  }
  return [...new Set(slugs)];
}

function main() {
  const date = today();
  const urls = [];

  // Homepage
  urls.push({ loc: `${ROOT}/`, changefreq: "daily", priority: "1.0", lastmod: date });

  // Category pages (preferred canonical routes, matching routeKeyForCategory in app.js)
  const categoryPages = [
    "/puzzle-games",
    "/shooting-games",
    "/arcade-games",
    "/racing-games",
    "/sports-games",
    "/idle-games"
  ];
  for (const p of categoryPages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "daily", priority: "0.8", lastmod: date });
  }

  // Static pages
  const staticPages = [
    "/best-unblocked-games",
    "/top-idle-games",
    "/about",
    "/privacy",
    "/contact",
    "/terms",
    "/fun-quiz"
  ];
  for (const p of staticPages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "monthly", priority: "0.5", lastmod: date });
  }

  // Editorial articles
  const articlePages = [
    "/articles/how-to-play-games-online-without-downloading",
    "/articles/browser-games-vs-mobile-apps",
    "/articles/best-game-categories-explained"
  ];
  for (const p of articlePages) {
    urls.push({ loc: `${ROOT}${p}`, changefreq: "monthly", priority: "0.6", lastmod: date });
  }

  // Built-in games (static directories)
  const builtInGames = ["2048", "breakout", "memory", "minesweeper", "snake", "tetris"];
  for (const g of builtInGames) {
    urls.push({ loc: `${ROOT}/games/${g}/`, changefreq: "monthly", priority: "0.7", lastmod: date });
  }

  // Catalog games from games-catalog.json
  try {
    const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
    const usedSlugs = new Set();
    for (const game of catalog) {
      let slug = game.slug || slugify(game.title);
      // Deduplicate slugs (same logic as app.js)
      if (usedSlugs.has(slug)) {
        let i = 2;
        while (usedSlugs.has(`${slug}-${i}`)) i++;
        slug = `${slug}-${i}`;
      }
      usedSlugs.add(slug);
      urls.push({ loc: `${ROOT}/play/${encodeURIComponent(slug)}`, changefreq: "weekly", priority: "0.9", lastmod: date });
    }
  } catch (e) {
    // Fallback: extract from inline script
    const html = fs.readFileSync(INDEX_PATH, "utf8");
    const titles = extractTitlesFromInlineScript(html);
    const gameSlugs = buildUniqueSlugs(titles);
    for (const s of gameSlugs) {
      urls.push({ loc: `${ROOT}/play/${encodeURIComponent(s)}`, changefreq: "weekly", priority: "0.9", lastmod: date });
    }
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

  process.stdout.write(out);
}

main();
