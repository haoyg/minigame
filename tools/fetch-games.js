/**
 * fetch-games.js
 * Run: node tools/fetch-games.js
 * Fetches games from FreeToGame API and merges into games-catalog.json
 */
const fs = require('fs');
const path = require('path');

const API_URL = 'https://www.freetogame.com/api/games?platform=browser';
const CUSTOM_CATALOG = path.join(__dirname, '..', 'games-catalog.json');
const BACKUP_DIR = path.join(__dirname, '..', 'assets', 'backups');

async function main() {
  console.log('Fetching FreeToGame API...');
  let ftgGames = [];

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Not an array');
    ftgGames = data;
    console.log(`  Got ${ftgGames.length} games from FreeToGame`);
  } catch(e) {
    console.error('  FreeToGame fetch failed:', e.message);
    console.log('  Continuing with custom catalog only');
  }

  // Load existing custom catalog
  let customGames = [];
  if (fs.existsSync(CUSTOM_CATALOG)) {
    const raw = fs.readFileSync(CUSTOM_CATALOG, 'utf8');
    customGames = JSON.parse(raw);
    console.log(`  Loaded ${customGames.length} custom games`);
  }

  // Deduplicate by ID
  const existingIds = {};
  customGames.forEach(g => { existingIds[g.id] = true; });

  // Filter out duplicates and games without thumbnails
  const newGames = ftgGames.filter(g =>
    !existingIds[g.id] && g.thumbnail
  ).map(g => {
    const title = g.title || 'Game';
    // Normalize category
    let cat = (g.category || 'Arcade').trim();
    if (cat === 'MMORPG') cat = 'Strategy';
    if (cat === 'Shooter') cat = 'Action';

    return {
      id: String(g.id),
      title: title,
      description: g.description || title + ' — free browser game on Pokopie.',
      category: cat,
      thumbnail: g.thumbnail.startsWith('//') ? 'https:' + g.thumbnail : g.thumbnail,
      playUrl: g.game_url || '',
      popular: g.popular || false,
      recent: g.release_date && (g.release_date.includes('2025') || g.release_date.includes('2026')),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      // FreeToGame games use default generic info (not enriched)
      introParagraph: null,
      controls: null,
      keys: null,
      mouseActions: null,
      mainAction: null,
      objective: null,
      obstacles: null,
      winCondition: null,
      tip1: null,
      tip2: null,
      tip3: null,
      tip4: null,
      _source: 'freetogame'
    };
  });

  console.log(`  Adding ${newGames.length} new games (deduped, no thumbnail filtered)`);

  const merged = [...customGames, ...newGames];

  // Backup existing catalog
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const ts = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(BACKUP_DIR, `games-catalog-${ts}.json`), JSON.stringify(customGames, null, 2));

  // Write merged catalog
  fs.writeFileSync(CUSTOM_CATALOG, JSON.stringify(merged, null, 2));
  console.log(`Done. Total: ${merged.length} games (${customGames.length} custom + ${newGames.length} new)`);
}

main().catch(e => { console.error(e); process.exit(1); });