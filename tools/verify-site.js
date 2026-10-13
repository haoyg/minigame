const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["index.html", "app.js", "games-catalog.json", "sitemap.xml", "_worker.js"];

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
if (sitemapUrls !== 203) {
  throw new Error(`Expected 203 sitemap URLs, found ${sitemapUrls}`);
}

const filesToCheck = [
  "index.html",
  "app.js",
  "404.html",
  "about.html",
  "games-catalog.json",
  "tools/gen-game-pages.js"
];

for (const file of filesToCheck) {
  const content = fs.readFileSync(path.join(root, file), "utf8");
  if (content.includes("pokopie.com")) throw new Error(`Old domain remains in ${file}`);
  if (content.includes("Pokopie")) throw new Error(`Old brand remains in ${file}`);
}

console.log(`Verified Pokopia static site: ${gamePages.length} game pages, ${sitemapUrls} sitemap URLs.`);
