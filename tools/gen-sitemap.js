const ROOT = "https://pokopie.com";

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
