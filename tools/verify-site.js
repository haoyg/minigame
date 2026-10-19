const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["index.html", "app.js", "games-catalog.json", "sitemap.xml", "_worker.js", "pokemon-30th-anniversary-2026.html"];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required site file: ${file}`);
  }
}

const playDir = path.join(root, "play");
const gamePages = fs.readdirSync(playDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(playDir, entry.name, "index.html")));

if (gamePages.length !== 180) {
  throw new Error(`Expected 180 generated game pages, found ${gamePages.length}`);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = (sitemap.match(/<url>/g) || []).length;
if (sitemapUrls !== 204) {
  throw new Error(`Expected 204 sitemap URLs, found ${sitemapUrls}`);
}
if (!sitemap.includes("https://pokopia.cloud/pokemon-30th-anniversary-2026")) {
  throw new Error("Anniversary guide is missing from sitemap.xml");
}

const filesToCheck = [
  "index.html",
  "app.js",
  "404.html",
  "about.html",
  "games-catalog.json",
  "pokemon-30th-anniversary-2026.html",
  "tools/gen-game-pages.js"
];

for (const file of filesToCheck) {
  const content = fs.readFileSync(path.join(root, file), "utf8");
  if (content.includes("pokopie.com")) throw new Error(`Old domain remains in ${file}`);
  if (content.includes("Pokopie")) throw new Error(`Old brand remains in ${file}`);
}

const guide = fs.readFileSync(path.join(root, "pokemon-30th-anniversary-2026.html"), "utf8");
for (const required of [
  '<link rel="canonical" href="https://pokopia.cloud/pokemon-30th-anniversary-2026"',
  '<meta name="robots" content="index,follow',
  '"@type":"Article"',
  '"@type":"BreadcrumbList"',
  "Pokémon 30th Anniversary 2026: December Release Guide"
]) {
  if (!guide.includes(required)) throw new Error(`Anniversary guide is missing required SEO content: ${required}`);
}

console.log(`Verified Pokopia static site: ${gamePages.length} game pages, ${sitemapUrls} sitemap URLs, anniversary guide SEO.`);
