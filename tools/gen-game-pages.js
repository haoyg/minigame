const fs = require("fs");
const path = require("path");

const ROOT = "https://pokopie.com";
const SCRIPT_DIR = __dirname;
const ROOT_DIR = path.resolve(SCRIPT_DIR, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "games-catalog.json");
const PLAY_DIR = path.join(ROOT_DIR, "play");
const REDIRECTS_PATH = path.join(ROOT_DIR, "_redirects");

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "game";
}

function escHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escAttr(value) {
  return escHtml(value).replace(/`/g, "&#96;");
}

function stripTags(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(value, max) {
  const s = stripTags(value);
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

function sentencePart(value) {
  return stripTags(value).replace(/[.!?。！？]+$/g, "");
}

function sentence(value) {
  const text = sentencePart(value);
  return text ? text[0].toUpperCase() + text.slice(1) + "." : "";
}

function controlSentence(value) {
  const text = sentencePart(value || "keyboard, mouse, or touch controls");
  if (!text) return "Use keyboard, mouse, or touch controls.";
  if (/^(use|click|tap|drag|swipe|aim|move|press|hold|select|choose|steer)\b/i.test(text)) {
    return sentence(text);
  }
  return `Use ${text}.`;
}

function resolveAssetUrl(src) {
  const s = String(src || "").trim();
  if (!s) return `${ROOT}/assets/og.svg`;
  if (/^https?:\/\//i.test(s)) return s;
  if (/^data:/i.test(s)) return `${ROOT}/assets/og.svg`;
  const clean = s.replace(/^\/+/, "").replace(/\.png(\?.*)?$/i, ".webp$1");
  return `${ROOT}/${clean}`;
}

function withGdReferrer(playUrl, canonicalUrl) {
  const raw = String(playUrl || "https://www.freetogame.com/").trim();
  try {
    const u = new URL(raw);
    if (u.hostname.toLowerCase().includes("html5.gamedistribution.com")) {
      u.searchParams.set("gd_sdk_referrer_url", canonicalUrl);
    }
    return u.toString();
  } catch (_) {
    return "https://www.freetogame.com/";
  }
}

function buildGames(catalog) {
  const used = new Set();
  const titleCounts = catalog.reduce((counts, game) => {
    const title = game.title || "Game";
    counts.set(title, (counts.get(title) || 0) + 1);
    return counts;
  }, new Map());
  return catalog.map((game) => {
    let slug = game.slug || slugify(game.title);
    if (used.has(slug)) {
      let i = 2;
      while (used.has(`${slug}-${i}`)) i += 1;
      slug = `${slug}-${i}`;
    }
    used.add(slug);
    const displayTitle = titleCounts.get(game.title || "Game") > 1
      ? `${game.title || "Game"} ${game.category || "Arcade"} Game`
      : game.title;
    return Object.assign({}, game, { slug, displayTitle });
  });
}

function similarGames(game, games) {
  const sameCategory = games.filter((g) => g.id !== game.id && g.category === game.category);
  const pool = sameCategory.length ? sameCategory : games.filter((g) => g.id !== game.id);
  return pool.slice(0, 6);
}

function categoryPath(category) {
  const paths = {
    Puzzle: "puzzle-games",
    Racing: "racing-games",
    Sports: "sports-games",
    Action: "shooting-games",
    Arcade: "arcade-games",
    Strategy: "idle-games"
  };
  return paths[category] || "arcade-games";
}

function gameCopy(game) {
  const name = game.displayTitle || game.title || "Game";
  const category = game.category || "Arcade";
  const genre = category.toLowerCase();
  const controls = sentencePart(game.controls || "keyboard, mouse, or touch controls");
  const keys = sentencePart(game.keys || "Arrow Keys / WASD, depending on the game");
  const mouse = sentencePart(game.mouseActions || "Click, drag, or tap as needed");
  const mainAction = sentencePart(game.mainAction || "control the action and complete each challenge");
  const objective = sentencePart(game.objective || "finish the objective of each stage");
  const obstacles = sentencePart(game.obstacles || "obstacles, timing challenges, and tricky moments");
  const win = sentencePart(game.winCondition || "complete the goal and improve your score");
  const intro = game.introParagraph ||
    `${name} is a free online ${genre} game you can play instantly in your browser. There is no download, no sign-up, and no app install. Start the game on desktop, tablet, or mobile and enjoy a quick session whenever you want.`;

  return { name, category, genre, controls, keys, mouse, mainAction, objective, obstacles, win, intro };
}

function renderPage(game, games) {
  const copy = gameCopy(game);
  const canonicalPath = `/play/${game.slug}`;
  const canonicalUrl = `${ROOT}${canonicalPath}`;
  const image = resolveAssetUrl(game.thumbnail);
  const playUrl = withGdReferrer(game.playUrl, canonicalUrl);
  const similar = similarGames(game, games);
  const description = `Play ${copy.name} online for free. No download needed. Learn how to play, controls, tips, and similar ${copy.genre} games on Pokopie.`;
  const tips = [
    game.tip1 || "Start slow and learn the core mechanics before chasing a high score.",
    game.tip2 || "Watch patterns carefully and make consistent moves.",
    game.tip3 || "Avoid rushing; most mistakes happen when you speed up too early.",
    game.tip4 || "Replay short sessions to improve your timing and strategy."
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoGame",
        "@id": `${canonicalUrl}#game`,
        "name": copy.name,
        "url": canonicalUrl,
        "image": image,
        "genre": copy.category,
        "applicationCategory": "Game",
        "operatingSystem": "Web",
        "description": description,
        "publisher": { "@type": "Organization", "name": "Pokopie", "url": `${ROOT}/` }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": `Play ${copy.name} Online Free`,
        "isPartOf": { "@type": "WebSite", "name": "Pokopie", "url": `${ROOT}/` },
        "primaryImageOfPage": { "@type": "ImageObject", "url": image },
        "breadcrumb": { "@id": `${canonicalUrl}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${ROOT}/` },
          { "@type": "ListItem", "position": 2, "name": `${copy.category} Games`, "item": `${ROOT}/${categoryPath(copy.category)}` },
          { "@type": "ListItem", "position": 3, "name": copy.name, "item": canonicalUrl }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is ${copy.name} free to play?`,
            "acceptedAnswer": { "@type": "Answer", "text": `Yes. ${copy.name} is free to play online on Pokopie.` }
          },
          {
            "@type": "Question",
            "name": `Do I need to download ${copy.name}?`,
            "acceptedAnswer": { "@type": "Answer", "text": "No. The game runs directly in your web browser with no installation required." }
          }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Play ${escHtml(copy.name)} Online Free No Download</title>
  <meta name="description" content="${escAttr(description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="Play ${escAttr(copy.name)} Online Free" />
  <meta property="og:description" content="${escAttr(description)}" />
  <meta property="og:site_name" content="Pokopie" />
  <meta property="og:image" content="${escAttr(image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Play ${escAttr(copy.name)} Online Free" />
  <meta name="twitter:description" content="${escAttr(description)}" />
  <meta name="twitter:image" content="${escAttr(image)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { color-scheme: dark; }
    body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#0f172a; color:#e5e7eb; line-height:1.65; }
    a { color:#93c5fd; text-decoration:none; }
    a:hover { text-decoration:underline; }
    .wrap { max-width:1180px; margin:0 auto; padding:24px 18px 56px; }
    .top { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:18px; }
    .brand { font-weight:800; font-size:18px; }
    .pill { display:inline-flex; padding:7px 12px; border:1px solid rgba(148,163,184,.35); border-radius:999px; background:rgba(15,23,42,.78); font-size:13px; }
    .layout { display:grid; grid-template-columns:minmax(0, 1fr) 300px; gap:20px; align-items:start; }
    .panel { background:rgba(255,255,255,.055); border:1px solid rgba(148,163,184,.22); border-radius:16px; padding:18px; }
    h1 { margin:0 0 8px; font-size:30px; line-height:1.16; }
    h2 { margin:24px 0 10px; font-size:20px; }
    h3 { margin:14px 0 6px; font-size:16px; }
    p, li { color:#cbd5e1; font-size:15px; }
    .meta { color:#94a3b8; font-size:13px; margin-bottom:16px; }
    .hero-img { width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:14px; border:1px solid rgba(148,163,184,.22); background:#111827; }
    .play-frame { width:100%; aspect-ratio:16/9; border:0; border-radius:14px; background:#020617; margin-top:16px; }
    .actions { display:flex; flex-wrap:wrap; gap:10px; margin:14px 0; }
    .btn { display:inline-flex; padding:10px 14px; border-radius:999px; background:#22c55e; color:#052e16; font-weight:800; }
    .btn.secondary { background:rgba(59,130,246,.18); color:#bfdbfe; border:1px solid rgba(59,130,246,.35); }
    .similar { display:grid; gap:10px; }
    .similar-card { display:grid; grid-template-columns:82px minmax(0,1fr); gap:10px; align-items:center; padding:8px; border:1px solid rgba(148,163,184,.16); border-radius:12px; background:rgba(255,255,255,.035); }
    .similar-card img { width:82px; height:46px; object-fit:cover; border-radius:8px; }
    .similar-card span { color:#e5e7eb; font-size:13px; font-weight:700; }
    .faq p { margin-top:4px; }
    @media (max-width: 860px) { .layout { grid-template-columns:1fr; } h1 { font-size:25px; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <a class="brand" href="/">Pokopie</a>
      <a class="pill" href="/">Back to all games</a>
    </div>
    <div class="layout">
      <main class="panel">
        <h1>Play ${escHtml(copy.name)} Online Free</h1>
        <div class="meta">${escHtml(copy.category)} game | HTML5 browser game | No download</div>
        <img class="hero-img" src="${escAttr(image)}" alt="${escAttr(copy.name)} thumbnail" width="640" height="360" />
        <div class="actions">
          <a class="btn" href="${escAttr(playUrl)}" target="_blank" rel="noopener noreferrer">Play Game</a>
          <a class="btn secondary" href="/">Browse More Games</a>
        </div>
        <iframe class="play-frame" src="${escAttr(playUrl)}" loading="lazy" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-fullscreen allow-popups"></iframe>

        <p>${escHtml(copy.intro)}</p>

        <h2>How to Play ${escHtml(copy.name)}</h2>
        <p>${escHtml(controlSentence(copy.controls))} The main task is to ${escHtml(copy.mainAction)}. Your goal is to ${escHtml(copy.objective)}. The main challenges are ${escHtml(copy.obstacles)}. Aim to ${escHtml(copy.win)}.</p>

        <h2>Game Controls</h2>
        <ul>
          <li><strong>Keyboard:</strong> ${escHtml(copy.keys)}</li>
          <li><strong>Mouse or touch:</strong> ${escHtml(copy.mouse)}</li>
          <li><strong>Mobile:</strong> Tap, swipe, or drag depending on the game.</li>
        </ul>

        <h2>Tips and Tricks</h2>
        <ul>${tips.map((tip) => `<li>${escHtml(tip)}</li>`).join("")}</ul>

        <h2>Features</h2>
        <ul>
          <li>Free to play in your browser</li>
          <li>No download or app install required</li>
          <li>Works on desktop and mobile browsers</li>
          <li>Fast loading HTML5 gameplay</li>
        </ul>

        <section class="faq">
          <h2>FAQ</h2>
          <h3>Is ${escHtml(copy.name)} free to play?</h3>
          <p>Yes. You can play it online for free on Pokopie.</p>
          <h3>Can I play ${escHtml(copy.name)} on mobile?</h3>
          <p>Yes. Most Pokopie browser games work on phones, tablets, laptops, and desktop computers.</p>
          <h3>Do I need to install anything?</h3>
          <p>No. ${escHtml(copy.name)} runs directly in your browser.</p>
        </section>
      </main>

      <aside class="panel">
        <h2>Similar Games</h2>
        <div class="similar">
          ${similar.map((sim) => `<a class="similar-card" href="/play/${encodeURIComponent(sim.slug)}"><img src="${escAttr(resolveAssetUrl(sim.thumbnail))}" alt="${escAttr(sim.title)} thumbnail" width="82" height="46" loading="lazy" /><span>${escHtml(sim.title)}</span></a>`).join("\n          ")}
        </div>
      </aside>
    </div>
  </div>
</body>
</html>
`;
}

function updateRedirects(games) {
  const start = "# BEGIN GENERATED PLAY ROUTES";
  const end = "# END GENERATED PLAY ROUTES";
  const routes = [
    start,
    ...games.flatMap((game) => [
      `/play/${game.slug}.html /play/${game.slug} 301`,
      `/play/${game.slug}/ /play/${game.slug} 301`,
      `/play/${game.slug} /play/${game.slug}/index.html 200`
    ]),
    end
  ].join("\n");

  let redirects = fs.readFileSync(REDIRECTS_PATH, "utf8");
  const block = new RegExp(`${start}[\\s\\S]*?${end}\\n?`);
  if (block.test(redirects)) {
    redirects = redirects.replace(block, routes + "\n");
  } else {
    redirects = redirects.replace("# Game detail pages - catalog games via /play/ (handled by JS router in app.js)", `${routes}\n\n# Game detail pages - catalog games via /play/ (handled by JS router in app.js)`);
  }
  redirects = redirects
    .replace(/\n# Game detail pages - catalog games via \/play\/ \(handled by JS router in app\.js\)\n\/play\/\* \/index\.html 200\n?/g, "\n");
  fs.writeFileSync(REDIRECTS_PATH, redirects, "utf8");
}

function removeLegacyFlatPages(games) {
  for (const game of games) {
    const legacyPath = path.join(PLAY_DIR, `${game.slug}.html`);
    if (fs.existsSync(legacyPath)) fs.unlinkSync(legacyPath);
  }
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
  const games = buildGames(catalog);
  fs.mkdirSync(PLAY_DIR, { recursive: true });
  removeLegacyFlatPages(games);
  for (const game of games) {
    const gameDir = path.join(PLAY_DIR, game.slug);
    fs.mkdirSync(gameDir, { recursive: true });
    fs.writeFileSync(path.join(gameDir, "index.html"), renderPage(game, games), "utf8");
  }
  updateRedirects(games);
  console.log(`Generated ${games.length} game pages in ${path.relative(ROOT_DIR, PLAY_DIR)}`);
}

main();
