const fs = require("fs");
const path = require("path");

const ROOT = "https://www.pokopie.com";
const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "games-catalog.json");
const REDIRECTS_PATH = path.join(ROOT_DIR, "_redirects");

const categories = [
  {
    slug: "puzzle-games",
    category: "Puzzle",
    title: "Best Puzzle Games Online Free",
    description: "Play free puzzle games online with no download. Explore tile matching, sorting, mahjong, merge puzzles, logic games, and relaxing brain games on Pokopie.",
    intro: "Puzzle games are built for players who want a slower, more thoughtful challenge. On Pokopie, this category includes mahjong layouts, merge puzzles, sorting games, logic challenges, and visual matching games that run directly in your browser.",
    why: [
      "Good for short breaks because most puzzle games are easy to pause and restart.",
      "Useful for practicing pattern recognition, planning, spatial reasoning, and careful decision-making.",
      "Works well on mobile and desktop because most games rely on simple click, tap, or swipe controls."
    ],
    search: ["match", "mahjong", "merge", "sort", "puzzle", "tile"]
  },
  {
    slug: "shooting-games",
    category: "Action",
    title: "Best Shooting and Action Games Online",
    description: "Play free action and shooting games online with no download. Find browser games with missions, waves, aiming, combat, survival, and fast reactions.",
    intro: "Action games are designed around fast decisions, timing, and pressure. This page collects Pokopie games where you fight enemies, survive waves, complete missions, aim carefully, or react quickly to changing hazards.",
    why: [
      "Good for players who want immediate feedback and short, intense sessions.",
      "Helps practice timing, aiming, reaction speed, movement, and threat prioritization.",
      "Many action games are replayable because small improvements in control can change the result."
    ],
    search: ["shoot", "battle", "guard", "knight", "obby", "war", "defense"]
  },
  {
    slug: "arcade-games",
    category: "Arcade",
    title: "Best Arcade Games Online Free",
    description: "Play free arcade games online in your browser. Discover quick HTML5 games with simple controls, high-score loops, classic challenges, and instant play.",
    intro: "Arcade games focus on quick play, simple rules, and repeatable challenges. They are the best choice when you want to start immediately, learn the controls in seconds, and improve through repeated attempts.",
    why: [
      "Good for quick sessions because arcade games usually start fast and require little setup.",
      "Strong for high-score chasing, reflex practice, and simple challenge loops.",
      "Easy to browse because the genre covers classic action, skill games, platform-style challenges, and casual one-button games."
    ],
    search: ["arcade", "jump", "run", "dash", "classic", "score"]
  },
  {
    slug: "racing-games",
    category: "Racing",
    title: "Best Racing Games Online Free",
    description: "Play free racing games online with no download. Drive cars, bikes, stunt vehicles, traffic racers, and high-speed browser games on Pokopie.",
    intro: "Racing games are about speed, control, and clean movement. Pokopie includes traffic racers, stunt-driving games, motorcycle challenges, city driving games, and obstacle-heavy vehicle games that work in modern browsers.",
    why: [
      "Good for players who like skill improvement through steering, braking, and timing.",
      "Offers a wide range of play styles, from relaxed city driving to high-pressure traffic dodging.",
      "Replay value comes from cleaner routes, better landings, faster laps, and fewer crashes."
    ],
    search: ["car", "traffic", "moto", "racing", "driver", "stunt", "ride"]
  },
  {
    slug: "sports-games",
    category: "Sports",
    title: "Best Sports Games Online Free",
    description: "Play free sports games online with no download. Enjoy football, basketball, archery, skill shots, tournaments, and browser sports challenges.",
    intro: "Sports games turn familiar competitive rules into quick browser sessions. This category includes football matches, free kicks, basketball challenges, archery games, and timing-based sports tests.",
    why: [
      "Good for competitive players who want clear goals and immediate results.",
      "Builds timing, aim, positioning, and decision-making under pressure.",
      "Works for short sessions because many sports games use quick matches, shots, or rounds."
    ],
    search: ["football", "soccer", "basketball", "archery", "sports", "kick"]
  },
  {
    slug: "idle-games",
    category: "Strategy",
    title: "Best Idle and Strategy Games Online",
    description: "Play free idle and strategy games online with no download. Build, upgrade, defend, manage resources, and grow browser-based systems over time.",
    intro: "Idle and strategy games reward planning rather than speed. On Pokopie, this category includes tycoon games, upgrade loops, defense games, management sims, merge strategy, and resource-building games.",
    why: [
      "Good for players who enjoy progression, upgrades, resource planning, and long-term growth.",
      "Many games can be played in short check-ins while still giving a sense of progress.",
      "Useful for practicing prioritization: what to upgrade first, when to expand, and how to avoid bottlenecks."
    ],
    search: ["idle", "tycoon", "upgrade", "factory", "defense", "merge", "manage"]
  }
];

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "game";
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildGames(catalog) {
  const used = new Set();
  return catalog.map((game) => {
    let slug = game.slug || slugify(game.title);
    if (used.has(slug)) {
      let i = 2;
      while (used.has(`${slug}-${i}`)) i += 1;
      slug = `${slug}-${i}`;
    }
    used.add(slug);
    return Object.assign({}, game, { slug });
  });
}

function imgUrl(src) {
  const s = String(src || "").trim();
  if (!s) return "/assets/og.svg";
  if (/^https?:\/\//i.test(s)) return s;
  if (/^data:/i.test(s)) return "/assets/og.svg";
  return "/" + s.replace(/^\/+/, "").replace(/\.png(\?.*)?$/i, ".webp$1");
}

function scoreGame(game, config) {
  const text = `${game.title || ""} ${game.introParagraph || ""} ${game.coreGameplay || ""} ${game.similarGameplay || ""}`.toLowerCase();
  let score = game.category === config.category ? 10 : 0;
  for (const term of config.search) if (text.includes(term)) score += 2;
  if (game.popular) score += 2;
  if (game.recent) score += 1;
  return score;
}

function pickGames(games, config) {
  return games
    .map((game) => ({ game, score: scoreGame(game, config) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || String(a.game.title).localeCompare(String(b.game.title)))
    .slice(0, 36)
    .map((row) => row.game);
}

function renderPage(config, games) {
  const canonical = `${ROOT}/${config.slug}`;
  const selected = pickGames(games, config);
  const top = selected.slice(0, 12);
  const more = selected.slice(12, 36);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": config.title,
        "description": config.description,
        "isPartOf": { "@type": "WebSite", "name": "Pokopie", "url": `${ROOT}/` },
        "breadcrumb": { "@id": `${canonical}#breadcrumb` },
        "mainEntity": { "@id": `${canonical}#itemlist` }
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#itemlist`,
        "name": config.title,
        "numberOfItems": top.length,
        "itemListElement": top.map((game, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${ROOT}/play/${game.slug}`,
          "name": game.title
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${ROOT}/` },
          { "@type": "ListItem", "position": 2, "name": config.title, "item": canonical }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(config.title)} | Pokopie</title>
  <meta name="description" content="${esc(config.description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(config.title)}" />
  <meta property="og:description" content="${esc(config.description)}" />
  <meta property="og:site_name" content="Pokopie" />
  <meta property="og:image" content="${ROOT}/assets/og.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(config.title)}" />
  <meta name="twitter:description" content="${esc(config.description)}" />
  <meta name="twitter:image" content="${ROOT}/assets/og.svg" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { color-scheme: dark; }
    body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0f172a; color:#e5e7eb; line-height:1.65; }
    a { color:inherit; text-decoration:none; }
    a:hover { text-decoration:underline; }
    .wrap { max-width:1180px; margin:0 auto; padding:26px 18px 60px; }
    .top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:22px; }
    .brand { font-weight:800; font-size:18px; }
    .pill { color:#93c5fd; border:1px solid rgba(148,163,184,.35); border-radius:999px; padding:7px 12px; font-size:13px; }
    .hero { max-width:820px; margin-bottom:24px; }
    h1 { margin:0 0 10px; font-size:36px; line-height:1.12; }
    h2 { margin:30px 0 12px; font-size:22px; }
    p, li { color:#cbd5e1; font-size:15px; }
    .grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:14px; }
    .card { background:rgba(255,255,255,.055); border:1px solid rgba(148,163,184,.22); border-radius:14px; overflow:hidden; display:block; }
    .card img { width:100%; aspect-ratio:16/9; object-fit:cover; background:#111827; }
    .card-body { padding:10px; }
    .card h3 { margin:0 0 6px; font-size:15px; line-height:1.3; color:#f8fafc; }
    .card p { margin:0; font-size:12px; line-height:1.45; color:#94a3b8; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
    .why { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
    .why li { list-style:none; padding:14px; border:1px solid rgba(148,163,184,.18); border-radius:14px; background:rgba(255,255,255,.04); }
    .links { display:flex; flex-wrap:wrap; gap:10px; }
    .links a { color:#bfdbfe; border:1px solid rgba(59,130,246,.3); background:rgba(59,130,246,.12); border-radius:999px; padding:8px 12px; font-size:13px; }
    @media (max-width: 980px) { .grid { grid-template-columns:repeat(3, minmax(0,1fr)); } }
    @media (max-width: 720px) { h1 { font-size:28px; } .grid, .why { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <a class="brand" href="/">Pokopie</a>
      <a class="pill" href="/">Back to all games</a>
    </div>

    <main>
      <section class="hero">
        <h1>${esc(config.title)}</h1>
        <p>${esc(config.intro)}</p>
      </section>

      <section>
        <h2>Top ${esc(config.category)} Games</h2>
        <div class="grid">
          ${top.map((game) => `<a class="card" href="/play/${game.slug}"><img src="${esc(imgUrl(game.thumbnail))}" alt="${esc(game.title)} thumbnail" width="320" height="180" loading="lazy" /><div class="card-body"><h3>${esc(game.title)}</h3><p>${esc(game.introParagraph || game.description || `Play ${game.title} online for free.`)}</p></div></a>`).join("\n          ")}
        </div>
      </section>

      <section>
        <h2>Why Play ${esc(config.category)} Games?</h2>
        <ul class="why">
          ${config.why.map((item) => `<li>${esc(item)}</li>`).join("\n          ")}
        </ul>
      </section>

      <section>
        <h2>More ${esc(config.category)} Games</h2>
        <div class="grid">
          ${more.map((game) => `<a class="card" href="/play/${game.slug}"><img src="${esc(imgUrl(game.thumbnail))}" alt="${esc(game.title)} thumbnail" width="320" height="180" loading="lazy" /><div class="card-body"><h3>${esc(game.title)}</h3><p>${esc(game.introParagraph || game.description || `Play ${game.title} online for free.`)}</p></div></a>`).join("\n          ")}
        </div>
      </section>

      <section>
        <h2>Related Guides</h2>
        <div class="links">
          <a href="/articles/how-to-play-games-online-without-downloading">How browser games work</a>
          <a href="/articles/browser-games-vs-mobile-apps">Browser games vs mobile apps</a>
          <a href="/articles/best-game-categories-explained">Game categories explained</a>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
`;
}

function updateRedirects() {
  let redirects = fs.readFileSync(REDIRECTS_PATH, "utf8");
  const lines = redirects.split(/\r?\n/).map((line) => {
    if (line === "/action-games /index.html 200") return "/action-games /shooting-games 301";
    if (line === "/strategy-games /index.html 200") return "/strategy-games /idle-games 301";
    for (const config of categories) {
      if (line === `/${config.slug} /index.html 200`) return `/${config.slug} /${config.slug}.html 200`;
    }
    return line;
  });

  const extra = categories.map((config) => `/${config.slug}.html /${config.slug} 301`);
  const existing = new Set(lines);
  const insertAt = lines.findIndex((line) => line === "# Canonicalize: remove trailing slashes except real game directories");
  for (const route of extra.reverse()) {
    if (!existing.has(route) && insertAt !== -1) lines.splice(insertAt, 0, route);
  }
  fs.writeFileSync(REDIRECTS_PATH, lines.join("\n"), "utf8");
}

function main() {
  const games = buildGames(JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8")));
  for (const config of categories) {
    fs.writeFileSync(path.join(ROOT_DIR, `${config.slug}.html`), renderPage(config, games), "utf8");
  }
  updateRedirects();
  console.log(`Generated ${categories.length} category pages`);
}

main();
