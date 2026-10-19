const fs = require("fs");
const path = require("path");
const { rootDir, site } = require("./lib/site-config");

const failures = [];
const warnings = [];
const seenCanonicals = new Map();
const seenTitles = new Map();
const knownRoutes = new Set();

function fail(message) { failures.push(message); }
function warn(message) { warnings.push(message); }
function read(relativePath) { return fs.readFileSync(path.join(rootDir, relativePath), "utf8"); }
function exists(relativePath) { return fs.existsSync(path.join(rootDir, relativePath)); }
function capture(html, pattern) { return (html.match(pattern) || [])[1] || ""; }

function routeToFile(route) {
  if (route === "/") return "index.html";
  if (route.startsWith("/play/") || route.startsWith("/games/")) {
    return `${route.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
  }
  return `${route.replace(/^\//, "")}.html`;
}

function inspectHtml(route, relativePath) {
  if (!exists(relativePath)) {
    fail(`${route} maps to missing file ${relativePath}`);
    return;
  }

  const html = read(relativePath);
  const title = capture(html, /<title>([\s\S]*?)<\/title>/i).replace(/\s+/g, " ").trim();
  const description = capture(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonical = capture(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const robots = capture(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  const expectedCanonical = route === "/" ? site.baseUrl : `${site.baseUrl}${route}`;

  if (!title) fail(`${relativePath} has no title`);
  if (!description) fail(`${relativePath} has no meta description`);
  if (!canonical) fail(`${relativePath} has no canonical URL`);
  if (canonical && canonical !== expectedCanonical) fail(`${relativePath} canonical is ${canonical}; expected ${expectedCanonical}`);
  if (/noindex/i.test(robots)) fail(`${relativePath} is in the sitemap but marked noindex`);
  if (!/<h1(?:\s|>)/i.test(html)) warn(`${relativePath} has no static H1`);

  if (canonical) {
    if (seenCanonicals.has(canonical)) fail(`${relativePath} duplicates canonical from ${seenCanonicals.get(canonical)}`);
    else seenCanonicals.set(canonical, relativePath);
  }
  if (title) {
    if (seenTitles.has(title)) fail(`${relativePath} duplicates title from ${seenTitles.get(title)}`);
    else seenTitles.set(title, relativePath);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); }
    catch (error) { fail(`${relativePath} contains invalid JSON-LD: ${error.message}`); }
  }

  for (const match of html.matchAll(/<a\b[^>]*\shref=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    let url;
    try { url = new URL(href, site.baseUrl); }
    catch (_) { fail(`${relativePath} contains an invalid link: ${href}`); continue; }
    if (url.origin !== site.baseUrl) continue;
    const normalized = url.pathname.replace(/\/$/, "") || "/";
    if (!knownRoutes.has(normalized) && !/\.[a-z0-9]+$/i.test(normalized)) {
      fail(`${relativePath} links to missing internal route ${url.pathname}`);
    }
  }
  if (html.includes("pokopie.com") || html.includes("Pokopie")) fail(`${relativePath} contains the retired domain or brand`);
}

for (const required of ["index.html", "app.js", "games-catalog.json", "sitemap.xml", "_worker.js", "data/site.json"]) {
  if (!exists(required)) fail(`Missing required site file: ${required}`);
}

const playDir = path.join(rootDir, "play");
const gameSlugs = fs.readdirSync(playDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && exists(`play/${entry.name}/index.html`))
  .map((entry) => entry.name)
  .sort();

const sitemap = read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const absoluteUrl of sitemapUrls) knownRoutes.add(new URL(absoluteUrl).pathname.replace(/\/$/, "") || "/");
for (const line of read("_redirects").split(/\r?\n/)) {
  const source = line.trim().split(/\s+/)[0];
  if (source && source.startsWith("/") && !source.includes("*")) knownRoutes.add(source.replace(/\/$/, "") || "/");
}
const expectedCount = 1 + site.categoryRoutes.length + site.staticRoutes.length + site.articleRoutes.length + site.builtInGames.length + gameSlugs.length;

if (sitemapUrls.length !== expectedCount) fail(`Expected ${expectedCount} sitemap URLs, found ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("sitemap.xml contains duplicate URLs");

for (const absoluteUrl of sitemapUrls) {
  if (!absoluteUrl.startsWith(site.baseUrl)) {
    fail(`Sitemap URL uses the wrong domain: ${absoluteUrl}`);
    continue;
  }
  const route = new URL(absoluteUrl).pathname;
  inspectHtml(route, routeToFile(route));
}

const catalog = JSON.parse(read("games-catalog.json"));
if (catalog.length !== gameSlugs.length) fail(`Catalog has ${catalog.length} games but play/ contains ${gameSlugs.length} generated pages`);

const homepage = read("index.html");
const initialCards = capture(homepage, /<!-- INITIAL_GAME_CARDS_START -->([\s\S]*?)<!-- INITIAL_GAME_CARDS_END -->/i);
const initialCardCount = (initialCards.match(/class="game-card"/g) || []).length;
if (initialCardCount !== 8) fail(`Expected 8 static homepage game cards, found ${initialCardCount}`);
if (!/<img\b[^>]*loading="eager"[^>]*fetchpriority="high"/i.test(initialCards)) {
  fail("Static homepage cards do not expose a high-priority eager image");
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`Error: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${sitemapUrls.length} indexable URLs, ${gameSlugs.length} generated games, unique canonicals and valid JSON-LD.`);
}
