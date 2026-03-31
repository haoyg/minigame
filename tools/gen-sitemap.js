const fs = require("fs");

const ROOT = "https://www.pokopie.com";
const INDEX_PATH = "E:/gitclone_project/minigame/index.html";

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
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
  const html = fs.readFileSync(INDEX_PATH, "utf8");
  const titles = extractTitlesFromInlineScript(html);
  const gameSlugs = buildUniqueSlugs(titles);

  const urls = [];
  urls.push({ loc: `${ROOT}/`, changefreq: "daily", priority: "1.0" });

  const categoryPages = [
    "/puzzle-games/",
    "/shooting-games/",
    "/idle-games/",
    "/arcade-games/",
    "/racing-games/",
    "/sports-games/"
  ];
  for (const p of categoryPages) urls.push({ loc: `${ROOT}${p}`, changefreq: "daily", priority: "0.8" });

  const staticPages = [
    "/best-unblocked-games",
    "/top-idle-games",
    "/about.html",
    "/privacy.html",
    "/contact.html",
    "/terms.html"
  ];
  for (const p of staticPages) urls.push({ loc: `${ROOT}${p}`, changefreq: "monthly", priority: "0.5" });

  for (const s of gameSlugs) {
    urls.push({ loc: `${ROOT}/games/${encodeURIComponent(s)}`, changefreq: "weekly", priority: "0.9" });
  }

  let out = "";
  out += `<?xml version="1.0" encoding="UTF-8"?>\n`;
  out += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const u of urls) {
    out += `  <url>\n`;
    out += `    <loc>${escXml(u.loc)}</loc>\n`;
    out += `    <changefreq>${u.changefreq}</changefreq>\n`;
    out += `    <priority>${u.priority}</priority>\n`;
    out += `  </url>\n`;
  }
  out += `</urlset>\n`;

  process.stdout.write(out);
}

main();

