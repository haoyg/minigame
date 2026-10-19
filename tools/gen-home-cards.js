const fs = require("fs");
const path = require("path");
const { rootDir } = require("./lib/site-config");

const indexPath = path.join(rootDir, "index.html");
const catalog = JSON.parse(fs.readFileSync(path.join(rootDir, "games-catalog.json"), "utf8"));

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "game")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "game";
}

function buildGames(rows) {
  const used = new Set();
  return rows.map((game) => {
    let slug = slugify(game.title);
    if (used.has(slug)) {
      let suffix = 2;
      while (used.has(`${slug}-${suffix}`)) suffix += 1;
      slug = `${slug}-${suffix}`;
    }
    used.add(slug);
    return { ...game, slug };
  });
}

function thumbnailPath(value) {
  const src = String(value || "").trim();
  if (/^https?:/i.test(src)) return src;
  return `/${src.replace(/^\/+/, "").replace(/\.png$/i, ".webp")}`;
}

function renderCard(game, index) {
  const title = escapeHtml(game.title);
  const category = escapeHtml(game.category || "Arcade");
  const badges = game.popular
    ? '<div class="game-popularity popular">Popular</div>'
    : game.recent ? '<div class="game-popularity recent">New</div>' : "";
  return `        <a class="game-card" href="/play/${game.slug}/" data-game-id="${escapeHtml(game.id)}">
          <div class="game-thumb-wrap">
            <img class="game-thumb" src="${escapeHtml(thumbnailPath(game.thumbnail))}" alt="${title} thumbnail" loading="${index < 4 ? "eager" : "lazy"}" decoding="async" fetchpriority="${index < 4 ? "high" : "low"}" width="320" height="180" />
            <div class="game-tag"><span class="dot"></span><span>${category}</span></div>
            ${badges}
          </div>
          <div class="game-content">
            <h3 class="game-title" title="${title}">${title}</h3>
            <div class="game-meta-row"><span>${category}</span></div>
            <span class="play-button"><span class="icon">▶</span><span>Play Now</span></span>
          </div>
        </a>`;
}

const cards = buildGames(catalog).slice(0, 8).map(renderCard);
cards.push('        <aside class="grid-ad" aria-label="Advertisement"><span>Advertisement</span><strong>Responsive ad space</strong></aside>');

const start = "        <!-- INITIAL_GAME_CARDS_START -->";
const end = "        <!-- INITIAL_GAME_CARDS_END -->";
const html = fs.readFileSync(indexPath, "utf8");
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
if (!pattern.test(html)) throw new Error("Initial game card markers are missing from index.html");

fs.writeFileSync(indexPath, html.replace(pattern, `${start}\n${cards.join("\n")}\n${end}`), "utf8");
console.log(`Generated ${cards.length - 1} initial game cards in index.html`);
