const fs = require("fs");
const path = require("path");

const ROOT = "https://pokopia.cloud";
const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "games-catalog.json");
const REDIRECTS_PATH = path.join(ROOT_DIR, "_redirects");

const categories = [
  {
    slug: "puzzle-games",
    category: "Puzzle",
    title: "Best Puzzle Games Online Free",
    description: "Play free puzzle games online with no download. Explore tile matching, sorting, mahjong, merge puzzles, logic games, and relaxing brain games on Pokopia.",
    intro: "Puzzle games are built for players who want a slower, more thoughtful challenge. On Pokopia, this category includes mahjong layouts, merge puzzles, sorting games, logic challenges, and visual matching games that run directly in your browser.",
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
    intro: "Action games are designed around fast decisions, timing, and pressure. This page collects Pokopia games where you fight enemies, survive waves, complete missions, aim carefully, or react quickly to changing hazards.",
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
    description: "Play free racing games online with no download. Drive cars, bikes, stunt vehicles, traffic racers, and high-speed browser games on Pokopia.",
    intro: "Racing games are about speed, control, and clean movement. Pokopia includes traffic racers, stunt-driving games, motorcycle challenges, city driving games, and obstacle-heavy vehicle games that work in modern browsers.",
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
    intro: "Idle and strategy games reward planning rather than speed. On Pokopia, this category includes tycoon games, upgrade loops, defense games, management sims, merge strategy, and resource-building games.",
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
    .filter((game) => game.category === config.category)
    .map((game) => ({ game, score: scoreGame(game, config) }))
    .sort((a, b) => b.score - a.score || String(a.game.title).localeCompare(String(b.game.title)))
    .slice(0, 100)
    .map((row) => row.game);
}

function renderPage(config, games) {
  const canonical = `${ROOT}/${config.slug}`;
  const selected = pickGames(games, config);
  const top = selected.slice(0, 12);
  const more = selected.slice(12);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": config.title,
        "description": config.description,
        "isPartOf": { "@type": "WebSite", "name": "Pokopia", "url": `${ROOT}/` },
        "breadcrumb": { "@id": `${canonical}#breadcrumb` },
        "mainEntity": { "@id": `${canonical}#itemlist` }
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#itemlist`,
        "name": config.title,
        "numberOfItems": selected.length,
        "itemListElement": selected.map((game, index) => ({
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
  <title>${esc(config.title)} | Pokopia</title>
  <meta name="description" content="${esc(config.description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(config.title)}" />
  <meta property="og:description" content="${esc(config.description)}" />
  <meta property="og:site_name" content="Pokopia" />
  <meta property="og:image" content="${ROOT}/assets/og.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(config.title)}" />
  <meta name="twitter:description" content="${esc(config.description)}" />
  <meta name="twitter:image" content="${ROOT}/assets/og.svg" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3274781156049995" crossorigin="anonymous"></script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { color-scheme:light; --ink:#10213f; --muted:#64748b; --green:#16a864; --border:#dfe5ec; --surface:#fff; --page:#f7f8fa; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; background:var(--page); color:var(--ink); line-height:1.55; }
    a { color:inherit; text-decoration:none; }
    header { background:#0d1d38; border-bottom:1px solid rgba(255,255,255,.1); }
    .top { max-width:1320px; min-height:72px; margin:0 auto; padding:6px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .brand-art { position:relative; width:142px; height:64px; overflow:hidden; display:block; }
    .brand-art img { position:absolute; top:-23.5px; left:-32.7px; width:202.5px; height:135px; max-width:none; }
    .back { color:#e2e8f0; border:1px solid rgba(255,255,255,.2); border-radius:7px; padding:8px 12px; font-size:13px; }
    .wrap { max-width:1320px; margin:0 auto; padding:18px 20px 60px; }
    .ad { min-height:92px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--muted); background:#eef2f6; border:1px solid var(--border); border-radius:8px; font-size:12px; }
    .ad small { opacity:.7; }
    .hero { max-width:920px; margin:26px 0; }
    h1 { margin:0 0 8px; font-size:36px; line-height:1.12; letter-spacing:0; }
    h2 { margin:34px 0 14px; font-size:24px; }
    p, li { color:var(--muted); font-size:15px; }
    .grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; }
    .card { background:var(--surface); border:1px solid var(--border); border-radius:8px; overflow:hidden; display:block; box-shadow:0 3px 14px rgba(15,31,55,.06); transition:.16s ease; }
    .card:hover { transform:translateY(-3px); border-color:rgba(22,168,100,.45); box-shadow:0 10px 30px rgba(15,31,55,.1); }
    .card img { width:100%; aspect-ratio:16/9; object-fit:cover; background:#eef2f6; display:block; }
    .card-body { padding:12px; display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:10px; }
    .card h3 { margin:0; font-size:15px; line-height:1.3; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .play { color:#fff; background:var(--green); border-radius:6px; padding:7px 12px; font-size:12px; font-weight:700; }
    .why { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
    .why li { list-style:none; padding:16px; border:1px solid var(--border); border-radius:8px; background:var(--surface); }
    .links { display:flex; flex-wrap:wrap; gap:10px; }
    .links a { color:var(--ink); border:1px solid var(--border); background:var(--surface); border-radius:7px; padding:8px 12px; font-size:13px; }
    @media (max-width: 980px) { .grid { grid-template-columns:repeat(3, minmax(0,1fr)); } }
    @media (max-width: 680px) { .top,.wrap { padding-inline:14px; } .brand-art { width:126px; height:58px; } h1 { font-size:28px; } .ad { min-height:72px; } .grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; } .why { grid-template-columns:1fr; padding:0; } .card-body { display:block; padding:9px; } .play { display:flex; justify-content:center; margin-top:9px; } .card h3 { font-size:13px; } }
    @media (max-width: 380px) { .grid { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <header><div class="top">
    <a class="brand-art" href="/" aria-label="Pokopia home"><img src="/assets/pokopie-logo.png" alt="" width="1536" height="1024" /></a>
    <a class="back" href="/">All games</a>
  </div></header>
  <div class="wrap">
    <aside class="ad" aria-label="Advertisement"><span>Advertisement</span><small>Responsive ad space</small></aside>

    <main>
      <section class="hero">
        <h1>${esc(config.title)}</h1>
        <p>${esc(config.intro)}</p>
      </section>

      <section>
        <h2>Top ${esc(config.category)} Games</h2>
        <div class="grid">
          ${top.map((game) => `<a class="card" href="/play/${game.slug}/"><img src="${esc(imgUrl(game.thumbnail))}" alt="${esc(game.title)} thumbnail" width="320" height="180" loading="lazy" /><div class="card-body"><h3>${esc(game.title)}</h3><span class="play">Play Now</span></div></a>`).join("\n          ")}
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
          ${more.map((game) => `<a class="card" href="/play/${game.slug}/"><img src="${esc(imgUrl(game.thumbnail))}" alt="${esc(game.title)} thumbnail" width="320" height="180" loading="lazy" /><div class="card-body"><h3>${esc(game.title)}</h3><span class="play">Play Now</span></div></a>`).join("\n          ")}
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
