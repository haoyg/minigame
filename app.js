    // Configuration
    const API_URL = "https://www.freetogame.com/api/games?platform=browser";
    const MIN_GAMES = 100;
    const FALLBACK_THUMB =
      "data:image/svg+xml;base64," +
      "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMTgwJyB2aWV3Qm94PScwIDAgMzIwIDE4MCc+PGxpbmVhckdyYWRpZW50IGlkPSdiJyB4MT0nMCUnIHkxPScwJScgeDI9JzEwMCUnIHkyPScxMDAlJz48c3RvcCBvZmZzZXQ9JzAlJyBzdG9wLWNvbG9yPScjMTAxODI0Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjM2I4MmY2Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMzIwJyBoZWlnaHQ9JzE4MCcgZmlsbD0ndXJsKCNiKScvPjxjaXJjbGUgY3g9JzEyOCcgY3k9JzcwJyByPSczMCcgZmlsbD0nI2ZlY2M2NScvPjxwYXRoIGQ9J00yMDQgMTA0YTMwIDMwIDAgMSAwLTMwIDMwIDMwIDMwIDAgMCAwIDMwLTMwem0wLTQ4YTE4IDE4IDAgMSAxLTE4IDE4IDE4IDE4IDAgMCAxIDE4LTE4eicgZmlsbD0nI2Y5NzMxNicvPjx0ZXh0IHg9JzE2MCcgeT0nMTM1JyBmb250LXNpemU9JzI0JyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjZjhmYWZiJz5QbGF5PC90ZXh0Pjwvc3ZnPg==";

    const CATEGORY_ICONS = {
      All: "🌈",
      Arcade: "🕹️",
      Puzzle: "🧩",
      Action: "⚔️",
      Racing: "🏎️",
      Sports: "🏀",
      Strategy: "♟️",
      Card: "🃏",
      Shooter: "🎯",
      Adventure: "🧭",
      Fighting: "🥊"
    };

    // 自定义 iframe 游戏列表（全部统一新标签打开）
    const customIframeGames = [];

    async function loadGames() {
      try {
        var res = await fetch("/games-catalog.json");
        var rows = await res.json();
        var usedSlugs = {};
        allGames = rows.map(function(row) {
          var title = row.title || "Game";
          var cat = normalizeCategoryByTitle(title, row.category || "Arcade");
          var slug = slugify(title);
          if (usedSlugs[slug]) {
            var i = 2;
            while (usedSlugs[slug + "-" + i]) { i++; }
            slug = slug + "-" + i;
          }
          usedSlugs[slug] = true;
          return {
            id: row.id,
            title: title,
            description: row.description || title + " — free browser game on Pokopie.",
            category: cat,
            thumbnail: row.thumbnail,
            playUrl: row.playUrl,
            popular: row.popular !== false,
            recent: row.recent !== false,
            slug: slug,
            introParagraph: row.introParagraph,
            controls: row.controls,
            keys: row.keys,
            mouseActions: row.mouseActions,
            mainAction: row.mainAction,
            objective: row.objective,
            obstacles: row.obstacles,
            winCondition: row.winCondition,
            tip1: row.tip1,
            tip2: row.tip2,
            tip3: row.tip3,
            tip4: row.tip4
          };
        });
        statusSource.textContent = "Custom game catalog + FreeToGame";
      } catch(e) {
        allGames = [];
        statusSource.textContent = "Failed to load catalog";
      }

      // Also fetch from FreeToGame API to add more games
      try {
        var ftgRes = await fetch(API_URL);
        if (ftgRes.ok) {
          var ftgData = await ftgRes.json();
          if (Array.isArray(ftgData) && ftgData.length > 0) {
            var existingIds = {};
            allGames.forEach(function(g) { existingIds[g.id] = true; });

            ftgData.forEach(function(game) {
              if (existingIds[game.id]) return; // skip duplicates
              var title = game.title || "Game";
              var cat = normalizeCategoryByTitle(title, game.category || "Arcade");
              var slug = slugify(title);
              // Only add games with thumbnail to keep quality
              if (game.thumbnail) {
                allGames.push({
                  id: game.id,
                  title: title,
                  description: game.description || title + " — free browser game on Pokopie.",
                  category: cat,
                  thumbnail: game.thumbnail,
                  playUrl: game.game_url,
                  popular: game.popular !== false,
                  recent: game.release_date && game.release_date.includes("2025"),
                  slug: slug,
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
                  tip4: null
                });
              }
            });
            statusSource.textContent = allGames.length + " games (custom + FreeToGame)";
          }
        }
      } catch(e) {
        // FreeToGame fetch failed, continue with custom catalog only
      }

      statusTotal.textContent = allGames.length + " games available";
      renderAllSections();
    }

    // 自定义 iframe 游戏列表（已迁移到 /games-catalog.json，loadGames 异步加载）

    let allGames = [];
    let filteredGames = [];
    let currentCategory = "All";
    let currentSort = "popular";
    let searchQuery = "";

    const homePage = document.getElementById("top");
    const gameDetailPage = document.getElementById("gameDetailPage");

    const featuredGrid = document.getElementById("featuredGrid");
    const popularRow = document.getElementById("popularRow");
    const newRow = document.getElementById("newRow");
    const mainGrid = document.getElementById("mainGrid");
    const emptyMessage = document.getElementById("emptyMessage");
    const statusTotal = document.getElementById("statusTotal");
    const statusFilter = document.getElementById("statusFilter");
    const statusSource = document.getElementById("statusSource");
    const searchInput = document.getElementById("searchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    const navCategories = document.getElementById("navCategories");
    const heroPlayBtn = document.getElementById("heroPlayBtn");
    const backToTop = document.getElementById("backToTop");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const modalBackdrop = document.getElementById("gameModalBackdrop");
    const modalGameTitle = document.getElementById("modalGameTitle");
    const modalGameMeta = document.getElementById("modalGameMeta");
    const modalDescription = document.getElementById("modalDescription");
    const gameIframe = document.getElementById("gameIframe");
    const internalWrapper = document.getElementById("internalWrapper");
    const internalCanvas = document.getElementById("internalCanvas");
    const internalTitle = document.getElementById("internalTitle");
    const internalScore = document.getElementById("internalScore");
    const internalRestart = document.getElementById("internalRestart");
    const internalHelp = document.getElementById("internalHelp");
    const modalLoading = document.getElementById("modalLoading");
    const embedNotice = document.getElementById("embedNotice");
    const noticeOpenNew = document.getElementById("noticeOpenNew");
    const noticeTryAnother = document.getElementById("noticeTryAnother");
    const modalClose = document.getElementById("modalClose");
    const modalFullscreen = document.getElementById("modalFullscreen");
    const modalOpenNew = document.getElementById("modalOpenNew");

    // Game detail elements
    const detailTitle = document.getElementById("detailTitle");
    const detailMeta = document.getElementById("detailMeta");
    const detailDescription = document.getElementById("detailDescription");
    const detailExtra = document.getElementById("detailExtra");
    const detailIframe = document.getElementById("detailIframe");
    const detailIframeLoading = document.getElementById("detailIframeLoading");
    const detailSimilarList = document.getElementById("detailSimilarList");
    const detailBackHome = document.getElementById("detailBackHome");

    // Category landing elements
    const categoryLanding = document.getElementById("categoryLanding");
    const landingH1 = document.getElementById("landingH1");
    const landingIntro = document.getElementById("landingIntro");
    const landingTopTitle = document.getElementById("landingTopTitle");
    const landingTopList = document.getElementById("landingTopList");
    const landingWhyTitle = document.getElementById("landingWhyTitle");
    const landingWhyList = document.getElementById("landingWhyList");
    const landingNewTitle = document.getElementById("landingNewTitle");
    const landingNewList = document.getElementById("landingNewList");

    let currentModalGame = null;
    let isModalMaximized = false;
    let embedWatchdog = null;
    let internalLoopHandle = 0;
    let internalCleanup = null;

    function el(tag, className, attrs) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (attrs) {
        for (const [k, v] of Object.entries(attrs)) {
          if (k === "text") node.textContent = v;
          else if (k === "html") node.innerHTML = v;
          else node.setAttribute(k, v);
        }
      }
      return node;
    }

    function slugify(text) {
      return (text || "")
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "game";
    }

    function resolveThumbSrc(src) {
      const s = (src || "").trim();
      if (!s) return "";
      if (/^(https?:|data:|blob:)/i.test(s)) return s;
      const path = s.startsWith("/") ? s : "/" + s.replace(/^\/+/, "");
      return path.replace(/\.png(\?.*)?$/i, ".webp$1");
    }

    function createThumbPicture(imgClass, thumbSrc, alt, attrs = {}) {
      const src = thumbSrc || FALLBACK_THUMB;
      const img = el("img", imgClass, Object.assign({
        src: src,
        alt: alt || "game thumbnail",
        loading: "lazy",
        decoding: "async",
        width: "320",
        height: "180"
      }, attrs));
      img.onerror = () => {
        img.src = FALLBACK_THUMB;
        img.onerror = null;
      };
      return img;
    }

    function setCategoryLandingVisible(visible) {
      if (!categoryLanding) return;
      categoryLanding.hidden = !visible;
    }

    function renderCategoryLanding(category) {
      if (!categoryLanding) return;
      if (!category || category === "All") {
        setCategoryLandingVisible(false);
        return;
      }

      const cat = category;
      const subtype1 = cat === "Puzzle" ? "logic puzzles" : cat === "Action" ? "shooting challenges" : cat === "Racing" ? "car stunts" : cat === "Sports" ? "skill matches" : "incremental upgrades";
      const subtype2 = cat === "Puzzle" ? "match & merge games" : cat === "Action" ? "sniper missions" : cat === "Racing" ? "traffic racing" : cat === "Sports" ? "quick arcade sports" : "tycoon-style progress";

      if (landingH1) landingH1.textContent = `Best ${cat} Games Online`;
      if (landingIntro) {
        landingIntro.textContent =
          `Discover the best free ${cat.toLowerCase()} games you can play online. These games are easy to start, require no download, and work on any device. Whether you enjoy ${subtype1} or ${subtype2}, there is something for everyone.`;
      }
      if (landingTopTitle) landingTopTitle.textContent = `Top ${cat} Games`;
      if (landingWhyTitle) landingWhyTitle.textContent = `Why Play ${cat} Games`;
      if (landingNewTitle) landingNewTitle.textContent = `New ${cat} Games`;

      const listAll = allGames.filter((g) => (g.category || "").toLowerCase() === cat.toLowerCase());
      const topList = listAll
        .slice()
        .sort((a, b) => {
          const ap = a.popular ? 1 : 0;
          const bp = b.popular ? 1 : 0;
          if (bp !== ap) return bp - ap;
          return (a.title || "").localeCompare(b.title || "");
        })
        .slice(0, 20);

      const newList = listAll
        .filter((g) => g.recent)
        .slice(0, 12);

      if (landingTopList) {
        landingTopList.innerHTML = "";
        topList.forEach((g) => {
          const item = el("article", "landing-item");
          const img = createThumbPicture("landing-thumb", resolveThumbSrc(g.thumbnail), g.title + " thumbnail", {
            loading: "lazy",
            width: "86",
            height: "56"
          });
          const right = el("div", "");
          right.appendChild(el("div", "landing-title", { text: g.title }));
          const oneLine = g.description || `Play ${g.title} free online. No download required.`;
          right.appendChild(el("div", "landing-desc", { text: oneLine }));
          item.appendChild(img);
          item.appendChild(right);
          item.addEventListener("click", () => navigateToGame(g));
          landingTopList.appendChild(item);
        });
      }

      if (landingWhyList) {
        landingWhyList.innerHTML = "";
        const benefits =
          cat === "Puzzle"
            ? ["Improve skills like logic and problem solving", "Relax and have fun", "Play anytime without installation"]
            : cat === "Action"
              ? ["Improve skills like reaction time and aiming", "Fast, exciting gameplay", "Play anytime without installation"]
              : cat === "Racing"
                ? ["Improve skills like timing and control", "Quick sessions with satisfying wins", "Play anytime without installation"]
                : cat === "Sports"
                  ? ["Improve skills like precision and timing", "Short matches, instant fun", "Play anytime without installation"]
                  : ["Improve skills like planning and optimization", "Relax and watch your progress grow", "Play anytime without installation"];
        benefits.forEach((b) => landingWhyList.appendChild(el("li", "", { text: b })));
      }

      if (landingNewList) {
        landingNewList.innerHTML = "";
        (newList.length ? newList : topList.slice(0, 6)).forEach((g) => {
          const item = el("article", "landing-item");
          const img = createThumbPicture("landing-thumb", resolveThumbSrc(g.thumbnail), g.title + " thumbnail", {
            loading: "lazy",
            width: "86",
            height: "56"
          });
          const right = el("div", "");
          right.appendChild(el("div", "landing-title", { text: g.title }));
          right.appendChild(el("div", "landing-desc", { text: g.description || `New ${cat.toLowerCase()} game on Pokopie. Play instantly in browser.` }));
          item.appendChild(img);
          item.appendChild(right);
          item.addEventListener("click", () => navigateToGame(g));
          landingNewList.appendChild(item);
        });
      }

      setCategoryLandingVisible(true);
    }

    function getCanonicalOrigin() {
      const host = (window.location.hostname || "").toLowerCase();
      if (host === "www.pokopie.com" || host === "pokopie.com") return "https://www.pokopie.com";
      return window.location.origin;
    }

    function setSeoForPage({ title, description, canonicalPath }) {
      try {
        const origin = getCanonicalOrigin();
        const canonicalUrl = origin + canonicalPath;

        document.title = title;

        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", description);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", canonicalUrl);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", description);

        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute("content", title);

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute("content", description);
      } catch (_) {}
    }

    function setSeoForGame(game) {
      const cat = (game.category || "Arcade");
      const canonicalPath = `/games/${game.slug || slugify(game.title)}`;
      const title = `Play ${game.title} Online Free No Download`;
      const description = `Play ${game.title} online for free. No download needed. Learn how to play, tips, and similar games. Works on PC, mobile, and tablet.`;

      setSeoForPage({ title, description, canonicalPath });

      // Optional: add/replace a Game JSON-LD block for richer snippets
      try {
        const origin = getCanonicalOrigin();
        const json = {
          "@context": "https://schema.org",
          "@type": "VideoGame",
          "name": game.title,
          "url": origin + canonicalPath,
          "genre": cat,
          "applicationCategory": "Game",
          "operatingSystem": "Web",
          "description": description,
          "image": game.thumbnail ? (origin + resolveThumbSrc(String(game.thumbnail))) : undefined,
          "publisher": { "@type": "Organization", "name": "Pokopie", "url": origin + "/" }
        };
        Object.keys(json).forEach((k) => json[k] === undefined && delete json[k]);
        let node = document.getElementById("pokopie-game-jsonld");
        if (!node) {
          node = document.createElement("script");
          node.type = "application/ld+json";
          node.id = "pokopie-game-jsonld";
          document.head.appendChild(node);
        }
        node.textContent = JSON.stringify(json);
      } catch (_) {}
    }

    function clearGameSeoJsonLd() {
      const node = document.getElementById("pokopie-game-jsonld");
      if (node) node.remove();
    }

    const CATEGORY_ROUTES = {
      "puzzle-games": "Puzzle",
      "shooting-games": "Action",
      "idle-games": "Strategy",
      "arcade-games": "Arcade",
      "racing-games": "Racing",
      "sports-games": "Sports",
      "strategy-games": "Strategy",
      "action-games": "Action"
    };

    function routeKeyForCategory(cat) {
      if (cat === "All") return "";
      // Prefer your chosen SEO slugs
      if (cat === "Action") return "shooting-games";
      if (cat === "Strategy") return "idle-games";
      const found = Object.entries(CATEGORY_ROUTES).find(([, v]) => v === cat);
      return found ? found[0] : "";
    }

    function pushRoute(path) {
      history.pushState({}, "", path);
      handleRoute();
    }

    function navigateToGame(game) {
      if (!game || !game.id) return;
      const slug = game.slug || slugify(game.title);
      // Use query params for game routing to work on all hosts (Netlify, Cloudflare, etc.)
      if (window.location.protocol === "file:") {
        const url = new URL(window.location.href);
        url.searchParams.set("game", game.id);
        window.location.href = url.toString();
        return;
      }
      window.location.href = `/?game=${encodeURIComponent(game.id)}`;
    }

    function showHomePage() {
      homePage.style.display = "";
      gameDetailPage.style.display = "none";
    }

    function renderSimilarGames(game) {
      if (!detailSimilarList) return;
      detailSimilarList.innerHTML = "";
      if (!allGames.length) return;

      const sameCategory = allGames.filter(
        (g) => g.id !== game.id && g.category === game.category
      );
      const pool = sameCategory.length ? sameCategory : allGames.filter((g) => g.id !== game.id);

      pool.slice(0, 6).forEach((sim) => {
        const card = el("article", "detail-similar-card");
        card.setAttribute("data-game-id", sim.id);

        const img = createThumbPicture("detail-similar-thumb", resolveThumbSrc(sim.thumbnail), sim.title + " thumbnail", {
          loading: "lazy"
        });
        card.appendChild(img);

        const caption = el("div", "detail-similar-caption", {
          text: truncate(sim.title, 24)
        });
        card.appendChild(caption);

        card.addEventListener("click", () => navigateToGame(sim));
        detailSimilarList.appendChild(card);
      });
    }

    function showGameDetail(game) {
      if (!gameDetailPage || !homePage) return;
      homePage.style.display = "none";
      gameDetailPage.style.display = "block";

      if (detailTitle) detailTitle.textContent = `Play ${game.title} Online Free`;
      if (detailMeta) {
        const cat = game.category || "Arcade";
        detailMeta.textContent = cat + " • HTML5 browser game on Pokopie";
      }
      if (detailDescription) {
        const genre = (game.category || "Arcade").toLowerCase();
        const core = game.coreGameplay || "play instantly and enjoy quick, satisfying levels";
        const similar = game.similarGameplay || "fast browser games and easy-to-learn challenges";
        // ~110-140 words
        detailDescription.textContent =
          game.introParagraph ||
          `${game.title} is a free online ${genre} game where you ${core}. This browser game requires no download and works on desktop and mobile. The controls are simple, the gameplay is smooth, and you can start playing in seconds. Whether you want a short break or a longer session, ${game.title} is easy to jump into on PC, mobile, and tablet. If you enjoy ${similar}, you will love this game.`;
      }

      if (detailExtra) {
        const cat = game.category || "Arcade";
        const name = game.title;
        const controls = game.controls || "keyboard, mouse, or touch";
        const mainAction = game.mainAction || "control your character and interact with the level";
        const objective = game.objective || "finish the objective of each stage";
        const obstacles = game.obstacles || "obstacles and tricky moments";
        const win = game.winCondition || "win by completing the goal and improving your score";

        const keys = game.keys || "Arrow Keys / WASD (varies by game)";
        const mouse = game.mouseActions || "Click / Drag as needed";

        const tip1 = game.tip1 || "Start slow and learn the mechanics";
        const tip2 = game.tip2 || "Focus on timing and consistent moves";
        const tip3 = game.tip3 || "Avoid rushing — most mistakes happen when you speed up";
        const tip4 = game.tip4 || "Practice to improve your score";

        const similarGames = (() => {
          const sameCategory = allGames.filter((g) => g.id !== game.id && g.category === game.category);
          const pool = sameCategory.length ? sameCategory : allGames.filter((g) => g.id !== game.id);
          return pool.slice(0, 3);
        })();

        detailExtra.innerHTML = "";

        // H2 How to play
        detailExtra.appendChild(el("h2", "", { text: `How to Play ${name}` }));
        detailExtra.appendChild(
          el("p", "", {
            text: `Use ${controls} to ${mainAction}. Your goal is to ${objective}. Avoid ${obstacles} and try to ${win}. The longer you play, the harder it becomes.`
          })
        );

        // H2 Controls
        detailExtra.appendChild(el("h2", "", { text: "Game Controls" }));
        const ulControls = el("ul", "detail-list");
        ulControls.appendChild(el("li", "", { text: `Keyboard: ${keys}` }));
        ulControls.appendChild(el("li", "", { text: `Mouse: ${mouse}` }));
        ulControls.appendChild(el("li", "", { text: "Mobile: Tap and swipe to control" }));
        detailExtra.appendChild(ulControls);

        // H2 Tips
        detailExtra.appendChild(el("h2", "", { text: "Tips and Tricks" }));
        const ulTips = el("ul", "detail-list");
        [tip1, tip2, tip3, tip4].forEach((t) => ulTips.appendChild(el("li", "", { text: t })));
        detailExtra.appendChild(ulTips);

        // H2 Features
        detailExtra.appendChild(el("h2", "", { text: "Features" }));
        const ulFeatures = el("ul", "detail-list");
        [
          "Free to play in browser",
          "No download required",
          "Supports mobile and desktop",
          "Fast loading and smooth gameplay"
        ].forEach((t) => ulFeatures.appendChild(el("li", "", { text: t })));
        detailExtra.appendChild(ulFeatures);

        // H2 Similar Games (internal links)
        detailExtra.appendChild(el("h2", "", { text: "Similar Games" }));
        const ulSimilar = el("ul", "detail-list");
        similarGames.forEach((g) => {
          const a = el("a", "detail-link", { href: `/games/${g.slug || slugify(g.title)}`, text: `Play ${g.title}` });
          const li = el("li", "");
          li.appendChild(a);
          ulSimilar.appendChild(li);
        });
        detailExtra.appendChild(ulSimilar);

        // H2 FAQ
        detailExtra.appendChild(el("h2", "", { text: "FAQ" }));
        detailExtra.appendChild(el("h3", "", { text: `Is ${name} free to play` }));
        detailExtra.appendChild(el("p", "", { text: "Yes, you can play it online for free without downloading." }));
        detailExtra.appendChild(el("h3", "", { text: `Can I play ${name} on mobile` }));
        detailExtra.appendChild(el("p", "", { text: "Yes, it works on most phones and tablets." }));
        detailExtra.appendChild(el("h3", "", { text: "Do I need to install anything" }));
        detailExtra.appendChild(el("p", "", { text: "No, it runs directly in your browser." }));
      }

      const rawUrl = game.playUrl || "https://www.freetogame.com/";
      if (detailIframe) {
        if (detailIframeLoading) detailIframeLoading.classList.remove("hidden");
        // 详情页里始终尝试加载 iframe，让你在本地和线上都能直接看到游戏或平台页面
        detailIframe.src = withGdReferrer(rawUrl);
      }

      if (detailBackHome) {
        detailBackHome.onclick = () => {
          pushRoute("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      renderSimilarGames(game);
    }

    function truncate(text, max) {
      if (!text) return "";
      return text.length > max ? text.slice(0, max - 1) + "…" : text;
    }

    function getReferrerForEmbed() {
      // GameDistribution 官方要求：gd_sdk_referrer_url 必须是“实际游戏页面的完整 URL”。
      // 这里我们在正式环境下返回“当前页面的完整地址”：
      // - 如果 URL 里已经有 ?game=xxx，就直接使用当前地址；
      // - 否则在首页 / 上根据 currentModalGame.id 拼一个 ?game=xxx。
      // 在本地预览或出错时则回退到主站首页。
      try {
        const loc = window.location;
        const host = (loc.hostname || "").toLowerCase();
        if (host === "www.pokopie.com" || host === "pokopie.com") {
          const href = loc.protocol + "//" + loc.host + loc.pathname + loc.search;
          const params = new URLSearchParams(loc.search || "");
          const isGamePath = (loc.pathname || "").toLowerCase().startsWith("/games/");
          if (params.get("game") || isGamePath) {
            // 详情页场景：直接返回当前 URL（不带哈希）
            return href;
          }
          // 首页 + 弹窗场景：根据 currentModalGame 拼接一个 ?game=ID
          let base = loc.protocol + "//" + loc.host + "/";
          if (currentModalGame && currentModalGame.id) {
            // Prefer clean game URL for referrer
            const slug = currentModalGame.slug || slugify(currentModalGame.title);
            base += "games/" + encodeURIComponent(slug);
          }
          return base;
        }
      } catch {
        // ignore
      }
      return "https://www.pokopie.com/";
    }

    function withGdReferrer(url) {
      // Fix "Not found at origin!" for many GameDistribution embeds:
      // ensure gd_sdk_referrer_url matches current page URL.
      if (!url || typeof url !== "string") return url;
      if (!url.includes("html5.gamedistribution.com")) return url;

      const ref = encodeURIComponent(getReferrerForEmbed());
      if (url.includes("gd_sdk_referrer_url=")) {
        return url.replace(/gd_sdk_referrer_url=[^&]*/i, "gd_sdk_referrer_url=" + ref);
      }
      return url + (url.includes("?") ? "&" : "?") + "gd_sdk_referrer_url=" + ref;
    }

    function isLocalPreview() {
      try {
        return window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      } catch {
        return true;
      }
    }

    function isAllowedEmbedHost() {
      // GameDistribution often requires domain whitelisting.
      // Allow embeds only on the real production hosts.
      try {
        const host = (window.location.hostname || "").toLowerCase();
        return host === "www.pokopie.com" || host === "pokopie.com";
      } catch {
        return false;
      }
    }

    function isEmbeddableUrl(rawUrl) {
      // Many providers block iframe embedding via X-Frame-Options / CSP.
      // 仅在“非常确定可以 iframe”时返回 true，其余情况统一用新标签页。
      if (!rawUrl || typeof rawUrl !== "string") return false;
      try {
        const u = new URL(rawUrl, window.location.href);
        const host = (u.hostname || "").toLowerCase();

        // FreeToGame 官网页面禁止 iframe。
        if (host === "www.freetogame.com" || host === "freetogame.com") return false;

        // GameDistribution：只在正式域名（已加入白名单）上尝试 iframe，其余环境一律视为不可 iframe。
        if (host === "html5.gamedistribution.com") {
          return isAllowedEmbedHost();
        }

        // 其他站点默认允许（目前主要是本地自带游戏等）。
        return true;
      } catch {
        return false;
      }
    }

    function stopInternalGame() {
      if (internalLoopHandle) cancelAnimationFrame(internalLoopHandle);
      internalLoopHandle = 0;
      if (typeof internalCleanup === "function") internalCleanup();
      internalCleanup = null;
      internalWrapper.classList.remove("visible");
      internalScore.textContent = "Score: 0";
    }

    function startInternalGame(game) {
      stopInternalGame();

      internalWrapper.classList.add("visible");
      internalTitle.textContent = game.title;

      const ctx = internalCanvas.getContext("2d");
      const W = internalCanvas.width;
      const H = internalCanvas.height;

      const themeA = (game.theme && game.theme.a) || "#facc15";
      const themeB = (game.theme && game.theme.b) || "#fb923c";
      const type = game.internalType || "arena-dodge";
      const seed0 = (game.seed || 1) >>> 0;

      // Small deterministic RNG (LCG)
      let rng = seed0;
      function rand() {
        rng = (1664525 * rng + 1013904223) >>> 0;
        return rng / 4294967296;
      }

      const helpSpan = internalHelp.querySelector("span");
      const disposers = [];
      const on = (target, evt, fn, opts) => {
        target.addEventListener(evt, fn, opts);
        disposers.push(() => target.removeEventListener(evt, fn, opts));
      };
      const setCleanup = () => {
        internalCleanup = () => disposers.splice(0).forEach((d) => d());
      };
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const pointerToCanvas = (evt) => {
        const rect = internalCanvas.getBoundingClientRect();
        const x = ((evt.clientX - rect.left) / rect.width) * W;
        const y = ((evt.clientY - rect.top) / rect.height) * H;
        return { x: clamp(x, 0, W), y: clamp(y, 0, H) };
      };

      function drawBackground() {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, "rgba(2,6,23,1)");
        g.addColorStop(0.35, themeB + "33");
        g.addColorStop(1, themeA + "22");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ----------------------------
      // Puzzle: 2048
      // ----------------------------
      if (type === "2048") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Arrow keys / WASD • Swipe on mobile";
        let score = 0;
        internalScore.textContent = "Score: 0";

        const N = 4;
        const grid = Array.from({ length: N }, () => Array(N).fill(0));
        const colors = {
          0: "rgba(15,23,42,0.55)",
          2: "#fef3c7", 4: "#fde68a", 8: "#fdba74", 16: "#fb923c",
          32: "#f97316", 64: "#ef4444", 128: "#a78bfa", 256: "#60a5fa",
          512: "#34d399", 1024: "#22c55e", 2048: "#facc15"
        };

        function empties() {
          const out = [];
          for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) out.push([r, c]);
          return out;
        }

        function spawn() {
          const e = empties();
          if (!e.length) return;
          const [r, c] = e[Math.floor(rand() * e.length)];
          grid[r][c] = rand() < 0.9 ? 2 : 4;
        }

        function compressLine(line) {
          const arr = line.filter((v) => v !== 0);
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] && arr[i] === arr[i + 1]) {
              arr[i] *= 2;
              score += arr[i];
              arr[i + 1] = 0;
              i++;
            }
          }
          const out = arr.filter((v) => v !== 0);
          while (out.length < N) out.push(0);
          return out;
        }

        function move(dir) {
          const before = grid.map((r) => r.slice());
          if (dir === "left") {
            for (let r = 0; r < N; r++) grid[r] = compressLine(grid[r]);
          } else if (dir === "right") {
            for (let r = 0; r < N; r++) grid[r] = compressLine(grid[r].slice().reverse()).reverse();
          } else if (dir === "up") {
            for (let c = 0; c < N; c++) {
              const col = [];
              for (let r = 0; r < N; r++) col.push(grid[r][c]);
              const newCol = compressLine(col);
              for (let r = 0; r < N; r++) grid[r][c] = newCol[r];
            }
          } else if (dir === "down") {
            for (let c = 0; c < N; c++) {
              const col = [];
              for (let r = 0; r < N; r++) col.push(grid[r][c]);
              const newCol = compressLine(col.slice().reverse()).reverse();
              for (let r = 0; r < N; r++) grid[r][c] = newCol[r];
            }
          }

          const changed = before.some((r, i) => r.some((v, j) => v !== grid[i][j]));
          if (changed) spawn();
          internalScore.textContent = "Score: " + score;
          render();
        }

        function render() {
          drawBackground();
          const pad = 32;
          const size = Math.min(W, H) - pad * 2;
          const cell = size / N;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;

          ctx.fillStyle = "rgba(15,23,42,0.55)";
          ctx.fillRect(x0 - 10, y0 - 10, size + 20, size + 20);

          for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
              const v = grid[r][c];
              const x = x0 + c * cell + 8;
              const y = y0 + r * cell + 8;
              const w = cell - 16;
              const h = cell - 16;
              ctx.fillStyle = colors[v] || themeA;
              roundRect(ctx, x, y, w, h, 14);
              ctx.fill();
              if (v) {
                ctx.fillStyle = "rgba(15,23,42,0.9)";
                ctx.font = (v >= 1024 ? "800 28px" : "800 34px") + " Poppins, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(String(v), x + w / 2, y + h / 2);
              }
            }
          }
        }

        function roundRect(c, x, y, w, h, r) {
          c.beginPath();
          c.moveTo(x + r, y);
          c.arcTo(x + w, y, x + w, y + h, r);
          c.arcTo(x + w, y + h, x, y + h, r);
          c.arcTo(x, y + h, x, y, r);
          c.arcTo(x, y, x + w, y, r);
          c.closePath();
        }

        function restart() {
          for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) grid[r][c] = 0;
          score = 0;
          spawn(); spawn();
          internalScore.textContent = "Score: 0";
          render();
        }

        const keyHandler = (e) => {
          const k = (e.key || "").toLowerCase();
          if (["arrowleft", "a"].includes(k)) move("left");
          if (["arrowright", "d"].includes(k)) move("right");
          if (["arrowup", "w"].includes(k)) move("up");
          if (["arrowdown", "s"].includes(k)) move("down");
        };

        let swipeStart = null;
        const pd = (e) => { swipeStart = pointerToCanvas(e); };
        const pu = (e) => {
          if (!swipeStart) return;
          const p = pointerToCanvas(e);
          const dx = p.x - swipeStart.x;
          const dy = p.y - swipeStart.y;
          swipeStart = null;
          if (Math.hypot(dx, dy) < 24) return;
          if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
          else move(dy > 0 ? "down" : "up");
        };

        internalRestart.onclick = restart;
        on(window, "keydown", keyHandler);
        on(internalCanvas, "pointerdown", pd);
        on(internalCanvas, "pointerup", pu);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Puzzle: Memory Match
      // ----------------------------
      if (type === "memory") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Tap / click to flip cards";
        let moves = 0;
        internalScore.textContent = "Moves: 0";

        const rows = 4, cols = 4;
        const total = rows * cols;
        const icons = ["🥧","🍒","🍋","🍇","🍓","🍉","🍪","🍭"];
        const deck = [];
        for (let i = 0; i < total / 2; i++) deck.push(icons[i], icons[i]);
        // shuffle
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        const state = Array(total).fill(0); // 0 hidden, 1 shown, 2 matched
        let first = -1;
        let lock = false;

        function cellAt(x, y) {
          const pad = 42;
          const size = Math.min(W, H) - pad * 2;
          const cw = size / cols;
          const ch = size / rows;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;
          const c = Math.floor((x - x0) / cw);
          const r = Math.floor((y - y0) / ch);
          if (r < 0 || r >= rows || c < 0 || c >= cols) return -1;
          return r * cols + c;
        }

        function render() {
          drawBackground();
          const pad = 42;
          const size = Math.min(W, H) - pad * 2;
          const cw = size / cols;
          const ch = size / rows;
          const x0 = (W - size) / 2;
          const y0 = (H - size) / 2;

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          for (let i = 0; i < total; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const x = x0 + c * cw + 10;
            const y = y0 + r * ch + 10;
            const w = cw - 20;
            const h = ch - 20;
            ctx.fillStyle = state[i] === 2 ? "rgba(34,197,94,0.65)" : "rgba(15,23,42,0.7)";
            roundRect(ctx, x, y, w, h, 16);
            ctx.fill();
            ctx.strokeStyle = "rgba(148,163,184,0.45)";
            ctx.lineWidth = 2;
            ctx.stroke();

            if (state[i] !== 0) {
              ctx.font = "800 42px Poppins, sans-serif";
              ctx.fillStyle = "rgba(248,250,252,0.95)";
              ctx.fillText(deck[i], x + w / 2, y + h / 2);
            } else {
              ctx.font = "700 18px Poppins, sans-serif";
              ctx.fillStyle = "rgba(148,163,184,0.85)";
              ctx.fillText("POKOPIE", x + w / 2, y + h / 2);
            }
          }
        }

        function roundRect(c, x, y, w, h, r) {
          c.beginPath();
          c.moveTo(x + r, y);
          c.arcTo(x + w, y, x + w, y + h, r);
          c.arcTo(x + w, y + h, x, y + h, r);
          c.arcTo(x, y + h, x, y, r);
          c.arcTo(x, y, x + w, y, r);
          c.closePath();
        }

        function restart() {
          for (let i = 0; i < total; i++) state[i] = 0;
          moves = 0; first = -1; lock = false;
          internalScore.textContent = "Moves: 0";
          render();
        }

        function flip(i) {
          if (lock || i < 0 || state[i] !== 0) return;
          state[i] = 1;
          if (first === -1) {
            first = i;
            render();
            return;
          }
          moves++;
          internalScore.textContent = "Moves: " + moves;
          const a = first, b = i;
          first = -1;
          render();
          if (deck[a] === deck[b]) {
            state[a] = 2; state[b] = 2;
            render();
          } else {
            lock = true;
            setTimeout(() => {
              state[a] = 0; state[b] = 0;
              lock = false;
              render();
            }, 650);
          }
        }

        const click = (e) => {
          const p = pointerToCanvas(e);
          flip(cellAt(p.x, p.y));
        };

        internalRestart.onclick = restart;
        on(internalCanvas, "pointerup", click);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Puzzle: Minesweeper Lite
      // ----------------------------
      if (type === "mines") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Click to reveal • Shift+Click to flag";
        const cols = 12, rows = 8;
        const minesCount = 14;
        let revealed = 0;
        internalScore.textContent = "Safe: 0";

        const cellSize = Math.floor(Math.min(W / cols, H / rows) * 0.86);
        const boardW = cellSize * cols;
        const boardH = cellSize * rows;
        const x0 = (W - boardW) / 2;
        const y0 = (H - boardH) / 2;

        let mines = new Set();
        let flags = new Set();
        let open = new Set();
        let dead = false;

        function idx(r, c) { return r * cols + c; }
        function rc(i) { return { r: Math.floor(i / cols), c: i % cols }; }

        function neighbors(r, c) {
          const out = [];
          for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue;
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) out.push(idx(rr, cc));
          }
          return out;
        }

        function countMines(r, c) {
          let n = 0;
          for (const ni of neighbors(r, c)) if (mines.has(ni)) n++;
          return n;
        }

        function cellFromPoint(x, y) {
          const c = Math.floor((x - x0) / cellSize);
          const r = Math.floor((y - y0) / cellSize);
          if (r < 0 || r >= rows || c < 0 || c >= cols) return -1;
          return idx(r, c);
        }

        function placeMines(avoidIndex) {
          mines = new Set();
          while (mines.size < minesCount) {
            const i = Math.floor(rand() * (rows * cols));
            if (i === avoidIndex) continue;
            mines.add(i);
          }
        }

        function flood(start) {
          const stack = [start];
          while (stack.length) {
            const cur = stack.pop();
            if (open.has(cur) || flags.has(cur)) continue;
            open.add(cur);
            revealed++;
            const { r, c } = rc(cur);
            if (countMines(r, c) === 0) {
              for (const ni of neighbors(r, c)) if (!open.has(ni)) stack.push(ni);
            }
          }
        }

        function render() {
          drawBackground();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "700 18px Poppins, sans-serif";

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const i = idx(r, c);
              const x = x0 + c * cellSize;
              const y = y0 + r * cellSize;
              const isOpen = open.has(i);
              ctx.fillStyle = isOpen ? "rgba(248,250,252,0.14)" : "rgba(15,23,42,0.78)";
              ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
              ctx.strokeStyle = "rgba(148,163,184,0.25)";
              ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);

              if (flags.has(i) && !isOpen) {
                ctx.fillStyle = "#facc15";
                ctx.fillText("🚩", x + cellSize / 2, y + cellSize / 2);
              } else if (isOpen) {
                if (mines.has(i)) {
                  ctx.fillText("💣", x + cellSize / 2, y + cellSize / 2);
                } else {
                  const n = countMines(r, c);
                  if (n) {
                    ctx.fillStyle = "rgba(248,250,252,0.9)";
                    ctx.fillText(String(n), x + cellSize / 2, y + cellSize / 2);
                  }
                }
              }
            }
          }

          if (dead) {
            ctx.fillStyle = "rgba(2,6,23,0.68)";
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = "rgba(248,250,252,0.95)";
            ctx.font = "800 40px Fredoka One, sans-serif";
            ctx.fillText("Boom!", W * 0.5, H * 0.46);
            ctx.font = "600 16px Poppins, sans-serif";
            ctx.fillStyle = "rgba(226,232,240,0.92)";
            ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
          }
        }

        let firstClick = true;
        function reveal(i) {
          if (dead || i < 0) return;
          if (flags.has(i)) return;
          if (firstClick) {
            placeMines(i);
            firstClick = false;
          }
          if (mines.has(i)) {
            dead = true;
            open.add(i);
            render();
            return;
          }
          const { r, c } = rc(i);
          flood(i);
          internalScore.textContent = "Safe: " + revealed;
          render();
        }

        function toggleFlag(i) {
          if (dead || i < 0) return;
          if (open.has(i)) return;
          if (flags.has(i)) flags.delete(i);
          else flags.add(i);
          render();
        }

        function restart() {
          firstClick = true;
          dead = false;
          revealed = 0;
          flags = new Set();
          open = new Set();
          mines = new Set();
          internalScore.textContent = "Safe: 0";
          render();
        }

        const click = (e) => {
          const p = pointerToCanvas(e);
          const i = cellFromPoint(p.x, p.y);
          if (e.shiftKey) toggleFlag(i);
          else reveal(i);
        };

        internalRestart.onclick = restart;
        on(internalCanvas, "pointerup", click);
        setCleanup();
        restart();
        return;
      }

      // ----------------------------
      // Arcade: Snake
      // ----------------------------
      if (type === "snake") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Arrow keys / WASD • Swipe on mobile";
        const cols = 30, rows = 18;
        const cell = Math.floor(Math.min(W / cols, H / rows));
        const x0 = Math.floor((W - cols * cell) / 2);
        const y0 = Math.floor((H - rows * cell) / 2);

        let dir = { x: 1, y: 0 };
        let nextDir = { x: 1, y: 0 };
        let snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
        let food = { x: 15, y: 9 };
        let dead = false;
        let score = 0;
        internalScore.textContent = "Score: 0";

        function placeFood() {
          while (true) {
            const fx = Math.floor(rand() * cols);
            const fy = Math.floor(rand() * rows);
            if (!snake.some((s) => s.x === fx && s.y === fy)) {
              food = { x: fx, y: fy };
              return;
            }
          }
        }

        function step() {
          if (dead) return;
          dir = nextDir;
          const head = snake[0];
          const nx = head.x + dir.x;
          const ny = head.y + dir.y;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) { dead = true; return; }
          if (snake.some((s) => s.x === nx && s.y === ny)) { dead = true; return; }
          snake.unshift({ x: nx, y: ny });
          if (nx === food.x && ny === food.y) {
            score += 10;
            internalScore.textContent = "Score: " + score;
            placeFood();
          } else {
            snake.pop();
          }
        }

        function render() {
          drawBackground();
          ctx.globalAlpha = 0.12;
          ctx.fillStyle = "#e2e8f0";
          for (let x = 0; x <= cols; x++) ctx.fillRect(x0 + x * cell, y0, 1, rows * cell);
          for (let y = 0; y <= rows; y++) ctx.fillRect(x0, y0 + y * cell, cols * cell, 1);
          ctx.globalAlpha = 1;

          // food
          ctx.fillStyle = themeA;
          ctx.fillRect(x0 + food.x * cell + 2, y0 + food.y * cell + 2, cell - 4, cell - 4);
          // snake
          for (let i = 0; i < snake.length; i++) {
            const s = snake[i];
            ctx.fillStyle = i === 0 ? "rgba(34,197,94,0.95)" : "rgba(34,197,94,0.65)";
            ctx.fillRect(x0 + s.x * cell + 2, y0 + s.y * cell + 2, cell - 4, cell - 4);
          }

          if (dead) {
            ctx.fillStyle = "rgba(2,6,23,0.68)";
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = "rgba(248,250,252,0.95)";
            ctx.font = "800 40px Fredoka One, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Game Over", W * 0.5, H * 0.46);
            ctx.font = "600 16px Poppins, sans-serif";
            ctx.fillStyle = "rgba(226,232,240,0.92)";
            ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
          }
        }

        function setDir(dx, dy) {
          if (dead) return;
          // prevent 180 turn
          if (dx === -dir.x && dy === -dir.y) return;
          nextDir = { x: dx, y: dy };
        }

        const key = (e) => {
          const k = (e.key || "").toLowerCase();
          if (k === "arrowleft" || k === "a") setDir(-1, 0);
          if (k === "arrowright" || k === "d") setDir(1, 0);
          if (k === "arrowup" || k === "w") setDir(0, -1);
          if (k === "arrowdown" || k === "s") setDir(0, 1);
        };

        let swipeStart = null;
        const pd = (e) => { swipeStart = pointerToCanvas(e); };
        const pu = (e) => {
          if (!swipeStart) return;
          const p = pointerToCanvas(e);
          const dx = p.x - swipeStart.x;
          const dy = p.y - swipeStart.y;
          swipeStart = null;
          if (Math.hypot(dx, dy) < 18) return;
          if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
          else setDir(0, dy > 0 ? 1 : -1);
        };

        function restart() {
          dir = { x: 1, y: 0 };
          nextDir = { x: 1, y: 0 };
          snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
          dead = false;
          score = 0;
          internalScore.textContent = "Score: 0";
          placeFood();
        }

        internalRestart.onclick = restart;
        on(window, "keydown", key);
        on(internalCanvas, "pointerdown", pd);
        on(internalCanvas, "pointerup", pu);
        setCleanup();

        restart();
        let acc = 0;
        let last = performance.now();
        const loop = (now) => {
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          acc += dt;
          const stepTime = 0.12;
          while (acc >= stepTime) { step(); acc -= stepTime; }
          render();
          internalLoopHandle = requestAnimationFrame(loop);
        };
        internalLoopHandle = requestAnimationFrame(loop);
        return;
      }

      // ----------------------------
      // Arcade: Brick Breaker
      // ----------------------------
      if (type === "brick-breaker") {
        helpSpan.innerHTML = "<strong>Controls:</strong> Move pointer/finger to control paddle";
        let score = 0;
        internalScore.textContent = "Score: 0";

        const paddle = { w: 140, h: 14, x: W * 0.5, y: H - 60 };
        const ball = { x: W * 0.5, y: H - 90, r: 9, vx: 260, vy: -300 };
        const bricks = [];
        const cols = 10, rows = 5;
        const gap = 10;
        const bw = (W - 2 * 46 - (cols - 1) * gap) / cols;
        const bh = 24;
        const bx0 = 46;
        const by0 = 70;

        function resetBricks() {
          bricks.length = 0;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              bricks.push({
                x: bx0 + c * (bw + gap),
                y: by0 + r * (bh + gap),
                w: bw, h: bh,
                alive: true,
                color: r % 2 ? themeA : themeB
              });
            }
          }
        }

        function restart() {
          score = 0;
          internalScore.textContent = "Score: 0";
          paddle.x = W * 0.5;
          ball.x = W * 0.5;
          ball.y = H - 90;
          ball.vx = 240 + rand() * 80;
          ball.vy = -320;
          resetBricks();
        }

        function draw() {
          drawBackground();

          // bricks
          for (const b of bricks) {
            if (!b.alive) continue;
            ctx.fillStyle = b.color + "cc";
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = "rgba(248,250,252,0.25)";
            ctx.strokeRect(b.x, b.y, b.w, b.h);
          }

          // paddle
          ctx.fillStyle = "rgba(248,250,252,0.9)";
          ctx.fillRect(paddle.x - paddle.w / 2, paddle.y, paddle.w, paddle.h);
          ctx.fillStyle = "rgba(15,23,42,0.75)";
          ctx.fillRect(paddle.x - paddle.w / 2 + 6, paddle.y + 3, paddle.w - 12, paddle.h - 6);

          // ball
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
          ctx.fillStyle = themeA;
          ctx.fill();
          ctx.strokeStyle = "rgba(248,250,252,0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        function update(dt) {
          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          // walls
          if (ball.x < ball.r) { ball.x = ball.r; ball.vx *= -1; }
          if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx *= -1; }
          if (ball.y < ball.r) { ball.y = ball.r; ball.vy *= -1; }

          // paddle collision
          const px0 = paddle.x - paddle.w / 2;
          const px1 = paddle.x + paddle.w / 2;
          if (ball.y + ball.r >= paddle.y && ball.y + ball.r <= paddle.y + paddle.h + 8 && ball.x >= px0 && ball.x <= px1 && ball.vy > 0) {
            ball.vy *= -1;
            const t = (ball.x - paddle.x) / (paddle.w / 2);
            ball.vx = clamp(ball.vx + t * 220, -520, 520);
            ball.y = paddle.y - ball.r - 1;
          }

          // bricks collision (simple)
          for (const b of bricks) {
            if (!b.alive) continue;
            if (ball.x + ball.r < b.x || ball.x - ball.r > b.x + b.w || ball.y + ball.r < b.y || ball.y - ball.r > b.y + b.h) continue;
            b.alive = false;
            score += 5;
            internalScore.textContent = "Score: " + score;
            // reflect based on penetration
            const cx = clamp(ball.x, b.x, b.x + b.w);
            const cy = clamp(ball.y, b.y, b.y + b.h);
            const dx = ball.x - cx;
            const dy = ball.y - cy;
            if (Math.abs(dx) > Math.abs(dy)) ball.vx *= -1;
            else ball.vy *= -1;
            break;
          }

          // lose
          if (ball.y - ball.r > H + 40) {
            restart();
          }

          // win
          if (bricks.every((b) => !b.alive)) {
            restart();
          }
        }

        const movePaddle = (x) => {
          paddle.x = clamp(x, paddle.w / 2, W - paddle.w / 2);
        };

        const mouse = (e) => movePaddle(pointerToCanvas(e).x);
        const touch = (e) => movePaddle(pointerToCanvas(e).x);

        internalRestart.onclick = restart;
        on(window, "pointermove", touch, { passive: true });
        on(internalCanvas, "pointerdown", mouse);
        setCleanup();
        restart();

        let last = performance.now();
        const loop = (now) => {
          const dt = Math.min(0.033, (now - last) / 1000);
          last = now;
          update(dt);
          draw();
          internalLoopHandle = requestAnimationFrame(loop);
        };
        internalLoopHandle = requestAnimationFrame(loop);
        return;
      }

      // If not one of the distinct games above, fall through to arena engine below.
      // Map new ids to old arena variants.
      const arenaType =
        type === "arena-runner" ? "runner" :
        "dodge";

      const input = { left: false, right: false, up: false, down: false, dragging: false, dx: 0, dy: 0 };
      const player = { x: W * 0.5, y: H * 0.7, r: 14, vx: 0, vy: 0 };
      let score = 0;
      let alive = true;
      let t = 0;

      const difficulty = 1 + ((seed0 % 7) / 7);
      const enemies = [];
      const pickups = [];

      const enemyCount = Math.floor(5 + difficulty * 4);
      const pickupCount = 6;

      function resetEntities() {
        enemies.length = 0;
        pickups.length = 0;
        for (let i = 0; i < enemyCount; i++) {
          enemies.push({
            x: rand() * W,
            y: rand() * H * 0.5,
            r: 10 + rand() * 10,
            vx: (rand() * 2 - 1) * (1.2 + difficulty),
            vy: (rand() * 2 - 1) * (1.0 + difficulty * 0.6)
          });
        }
        for (let i = 0; i < pickupCount; i++) {
          pickups.push({
            x: 40 + rand() * (W - 80),
            y: 60 + rand() * (H - 140),
            r: 9 + rand() * 5
          });
        }
      }

      resetEntities();

      function dist2(ax, ay, bx, by) { const dx = ax - bx; const dy = ay - by; return dx * dx + dy * dy; }

      function drawCircle(x, y, r, fill, stroke) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
      }

      function update(dt) {
        t += dt;
        const speed = 380;

        let ax = 0, ay = 0;
        if (input.left) ax -= 1;
        if (input.right) ax += 1;
        if (input.up) ay -= 1;
        if (input.down) ay += 1;
        if (input.dragging) {
          ax += input.dx * 2.2;
          ay += input.dy * 2.2;
        }

        const mag = Math.hypot(ax, ay) || 1;
        ax /= mag; ay /= mag;

        player.vx = ax * speed;
        player.vy = ay * speed;
        player.x = clamp(player.x + player.vx * dt, player.r, W - player.r);
        player.y = clamp(player.y + player.vy * dt, player.r, H - player.r);

        // Move enemies
        for (const e of enemies) {
          // Type variations
          if (arenaType === "orbit") {
            const cx = W * 0.5, cy = H * 0.45;
            const ang = (seed0 % 100) * 0.01 + t * (0.7 + difficulty * 0.25);
            const rr = 80 + (seed0 % 5) * 22 + (enemies.indexOf(e) % 5) * 18;
            e.x = cx + Math.cos(ang + enemies.indexOf(e)) * rr;
            e.y = cy + Math.sin(ang + enemies.indexOf(e) * 0.8) * rr;
          } else if (arenaType === "runner") {
            e.x += (2.6 + difficulty) * 90 * dt;
            if (e.x - e.r > W + 10) { e.x = -10; e.y = 60 + rand() * (H - 120); }
          } else if (arenaType === "maze") {
            e.x += e.vx * 60 * dt;
            e.y += e.vy * 60 * dt;
            if (e.x < e.r || e.x > W - e.r) e.vx *= -1;
            if (e.y < e.r || e.y > H - e.r) e.vy *= -1;
          } else {
            e.x += e.vx * 60 * dt;
            e.y += e.vy * 60 * dt;
            if (e.x < e.r || e.x > W - e.r) e.vx *= -1;
            if (e.y < e.r || e.y > H - e.r) e.vy *= -1;
          }

          // Collision with player
          if (dist2(player.x, player.y, e.x, e.y) < (player.r + e.r) ** 2) {
            alive = false;
          }
        }

        // Pickups
        for (const p of pickups) {
          if (dist2(player.x, player.y, p.x, p.y) < (player.r + p.r) ** 2) {
            score += 10;
            p.x = 40 + rand() * (W - 80);
            p.y = 60 + rand() * (H - 140);
          }
        }

        // Survival score
        score += dt * (arenaType === "target" ? 8 : 4);
        internalScore.textContent = "Score: " + Math.floor(score);
      }

      function draw() {
        drawBackground();

        // Pickups
        for (const p of pickups) {
          drawCircle(p.x, p.y, p.r, themeA, "rgba(248,250,252,0.35)");
          ctx.globalAlpha = 0.8;
          drawCircle(p.x, p.y, Math.max(2, p.r * 0.4), themeB, null);
          ctx.globalAlpha = 1;
        }

        // Enemies
        for (const e of enemies) {
          drawCircle(e.x, e.y, e.r, "rgba(239,68,68,0.75)", "rgba(248,250,252,0.35)");
        }

        // Player
        drawCircle(player.x, player.y, player.r, "rgba(34,197,94,0.9)", "rgba(248,250,252,0.5)");
        ctx.fillStyle = "rgba(15,23,42,0.85)";
        ctx.font = "700 12px Poppins, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("YOU", player.x, player.y + 4);

        if (!alive) {
          ctx.fillStyle = "rgba(2,6,23,0.72)";
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = "rgba(248,250,252,0.95)";
          ctx.font = "700 40px Fredoka One, sans-serif";
          ctx.fillText("Game Over", W * 0.5, H * 0.46);
          ctx.font = "600 16px Poppins, sans-serif";
          ctx.fillStyle = "rgba(226,232,240,0.92)";
          ctx.fillText("Press Restart to try again", W * 0.5, H * 0.54);
        }
      }

      let last = performance.now();
      function loop(now) {
        const dt = Math.min(0.033, (now - last) / 1000);
        last = now;
        if (alive) update(dt);
        draw();
        internalLoopHandle = requestAnimationFrame(loop);
      }

      function onKey(e, down) {
        const k = (e.key || "").toLowerCase();
        if (k === "arrowleft" || k === "a") input.left = down;
        if (k === "arrowright" || k === "d") input.right = down;
        if (k === "arrowup" || k === "w") input.up = down;
        if (k === "arrowdown" || k === "s") input.down = down;
      }

      function pointerPos(evt) {
        const rect = internalCanvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) / rect.width;
        const y = (evt.clientY - rect.top) / rect.height;
        return { x, y };
      }

      let lastPtr = null;
      function onPointerDown(evt) {
        input.dragging = true;
        lastPtr = pointerPos(evt);
      }
      function onPointerMove(evt) {
        if (!input.dragging) return;
        const p = pointerPos(evt);
        if (!lastPtr) lastPtr = p;
        input.dx = clamp((p.x - lastPtr.x) * 3.2, -1, 1);
        input.dy = clamp((p.y - lastPtr.y) * 3.2, -1, 1);
        lastPtr = p;
      }
      function onPointerUp() {
        input.dragging = false;
        input.dx = 0; input.dy = 0;
        lastPtr = null;
      }

      function restart() {
        rng = seed0;
        score = 0;
        alive = true;
        player.x = W * 0.5;
        player.y = H * 0.7;
        resetEntities();
      }

      internalRestart.onclick = restart;

      const keydownHandler = (e) => onKey(e, true);
      const keyupHandler = (e) => onKey(e, false);
      const pointerDownHandler = (e) => onPointerDown(e);
      const pointerMoveHandler = (e) => onPointerMove(e);
      const pointerUpHandler = () => onPointerUp();

      window.addEventListener("keydown", keydownHandler);
      window.addEventListener("keyup", keyupHandler);
      internalCanvas.addEventListener("pointerdown", pointerDownHandler);
      window.addEventListener("pointermove", pointerMoveHandler, { passive: true });
      window.addEventListener("pointerup", pointerUpHandler, { passive: true });

      internalCleanup = () => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        internalCanvas.removeEventListener("pointerdown", pointerDownHandler);
        window.removeEventListener("pointermove", pointerMoveHandler);
        window.removeEventListener("pointerup", pointerUpHandler);
      };

      internalLoopHandle = requestAnimationFrame(loop);
    }

    function normalizeCategoryByTitle(title, fallbackCategory) {
      const t = (title || "").toLowerCase();
      const fallback = (fallbackCategory || "Arcade");

      if (/(2048|sudoku|mahjong|puzzle|logic|brain|merge|block|tile|match|connect)/.test(t)) {
        return "Puzzle";
      }
      if (/(race|racing|drift|highway|traffic|kart|rally|moto|bike|car)/.test(t)) {
        return "Racing";
      }
      if (/(soccer|football|basketball|tennis|golf|bowling|penalty|cricket|volley|ski|snowboard)/.test(t)) {
        return "Sports";
      }
      if (/(chess|kingdom|empire|tycoon|defense|tower|idle|strategy|tactics)/.test(t)) {
        return "Strategy";
      }
      if (/(zombie|war|battle|ninja|warrior|hero|fighter|shooter|gun|sniper|assault|arena|combat)/.test(t)) {
        return "Action";
      }
      if (/(runner|run|jump|flappy|bounce|clicker|tap|stack|ball|bubble|platform)/.test(t)) {
        return "Arcade";
      }
      return fallback;
    }

    function updateCategoryUI() {
      const navBtns = navCategories.querySelectorAll(".nav-pill");
      navBtns.forEach((b) => {
        const cat = b.getAttribute("data-category");
        if (cat === currentCategory || (currentCategory === "All" && cat === "All")) b.classList.add("active");
        else b.classList.remove("active");
      });

      statusFilter.textContent = currentCategory === "All" ? "All categories" : "Category: " + currentCategory;

      // 同步更新 All Games 区块标题，使其与当前菜单保持一致
      const allGamesHeading = document.getElementById("all-games-heading");
      if (allGamesHeading) {
        allGamesHeading.textContent = currentCategory === "All" ? "All Games" : currentCategory + " Games";
      }
    }

    function renderAllSections() {
      applyFilters();
      renderFeatured();
    }

    function applyFilters() {
      const query = searchQuery.trim().toLowerCase();
      filteredGames = allGames.filter((g) => {
        const matchCategory =
          currentCategory === "All" ||
          (g.category && g.category.toLowerCase() === currentCategory.toLowerCase());
        const matchSearch =
          !query ||
          (g.title && g.title.toLowerCase().includes(query)) ||
          (g.description && g.description.toLowerCase().includes(query));
        return matchCategory && matchSearch;
      });

      if (currentSort === "az") filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      else if (currentSort === "new") filteredGames.sort((a, b) => (b.recent === a.recent ? 0 : b.recent ? 1 : -1));
      else filteredGames.sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));

      statusTotal.textContent = filteredGames.length + " games found";
      renderMainGrid();
    }

    function createGameCard(game, compact) {
      const card = el("article", "game-card");
      card.setAttribute("data-game-id", game.id);

      const thumbWrap = el("div", "game-thumb-wrap");
      const img = createThumbPicture("game-thumb", resolveThumbSrc(game.thumbnail), game.title + " thumbnail", {
        loading: "lazy",
        decoding: "async",
        fetchpriority: "low"
      });
      thumbWrap.appendChild(img);

      const tag = el("div", "game-tag");
      const dot = el("span", "dot");
      const tagText = el("span", null, { text: game.category || "Arcade" });
      tag.appendChild(dot);
      tag.appendChild(tagText);
      thumbWrap.appendChild(tag);

      if (game.popular) thumbWrap.appendChild(el("div", "game-popularity", { text: "🔥 Popular" }));
      else if (game.recent) thumbWrap.appendChild(el("div", "game-popularity", { text: "⭐ New" }));

      const content = el("div", "game-content");
      const title = el("h3", "game-title", { text: game.title });
      title.title = game.title;

      const desc = el("p", "game-description", { text: truncate(game.description || "Instant browser mini game.", compact ? 70 : 90) });

      const metaRow = el("div", "game-meta-row");
      metaRow.appendChild(el("span", null, { text: (game.category || "Arcade") + " • HTML5" }));
      metaRow.appendChild(el("span", null, { text: "Play now" }));

      const btn = el("button", "play-button", { type: "button" });
      btn.appendChild(el("span", "icon", { text: "▶" }));
      btn.appendChild(el("span", null, { text: "Play Now" }));

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateToGame(game);
      });
      card.addEventListener("click", () => navigateToGame(game));

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(metaRow);
      content.appendChild(btn);

      card.appendChild(thumbWrap);
      card.appendChild(content);
      return card;
    }

    function renderFeatured() {
      featuredGrid.innerHTML = "";
      const featured = allGames.slice(0, 8);
      // Preload first featured thumbnail to improve LCP
      if (featured.length) {
        const firstThumb = resolveThumbSrc(featured[0].thumbnail);
        if (firstThumb && !document.querySelector('link[href="' + firstThumb + '"]')) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = firstThumb;
          document.head.appendChild(link);
        }
      }
      featured.forEach((game, idx) => {
        const card = el("article", "featured-card", { "data-game-id": game.id });
        const img = createThumbPicture("featured-thumb", resolveThumbSrc(game.thumbnail), game.title + " thumbnail", {
          loading: idx === 0 ? "eager" : "lazy",
          decoding: "async",
          fetchpriority: idx === 0 ? "high" : "low"
        });
        card.appendChild(img);
        const overlay = el("div", "featured-overlay");
        overlay.appendChild(el("div", "featured-title", { text: truncate(game.title, 22) }));
        const meta = el("div", "featured-meta");
        meta.appendChild(el("span", "tag", { text: game.category || "Arcade" }));
        meta.appendChild(el("span", "play", { text: "▶ Play" }));
        overlay.appendChild(meta);
        card.appendChild(overlay);
        card.addEventListener("click", () => navigateToGame(game));
        featuredGrid.appendChild(card);
      });
    }

    function renderPopular() {
      popularRow.innerHTML = "";
      const list = [...allGames].sort((a, b) => (b.popular === a.popular ? 0 : b.popular ? 1 : -1));
      list.slice(0, 14).forEach((g) => popularRow.appendChild(createGameCard(g, true)));
    }

    function renderNew() {
      newRow.innerHTML = "";
      const list = [...allGames].sort((a, b) => (b.recent === a.recent ? 0 : b.recent ? 1 : -1));
      list.slice(0, 14).forEach((g) => newRow.appendChild(createGameCard(g, true)));
    }

    function renderMainGrid() {
      mainGrid.innerHTML = "";
      if (!filteredGames.length) { emptyMessage.hidden = false; return; }
      emptyMessage.hidden = true;
      filteredGames.forEach((g) => mainGrid.appendChild(createGameCard(g, false)));
    }

    function openGameModal(game) {
      currentModalGame = game;

      // 对 GameDistribution 恢复“直接新标签打开”的模式，不再展示 iframe 弹窗。
      try {
        const raw = game.playUrl || "";
        const host = raw ? new URL(raw, window.location.href).hostname.toLowerCase() : "";
        if (host.includes("html5.gamedistribution.com")) {
          openGameInNewTab();
          return;
        }
      } catch {
        // URL 解析失败时按正常流程走
      }

      modalGameTitle.textContent = game.title;
      modalGameMeta.textContent = (game.category || "Arcade") + " • HTML5 browser game • Tap to play";
      if (modalDescription) {
        const cat = game.category || "Arcade";
        const desc = game.description || "Instant browser mini game.";
        modalDescription.innerHTML =
          "<strong>" + cat + "</strong> · " + desc;
      }
      embedNotice.classList.remove("visible");
      stopInternalGame();
      gameIframe.src = "";
      // 默认不使用 sandbox，先清空，后续按域名按需设置
      gameIframe.removeAttribute("sandbox");
      modalLoading.style.display = "flex";
      modalBackdrop.classList.add("visible");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Built-in fallback games: always playable, no iframe needed.
      if (game.playMode === "internal") {
        modalLoading.style.display = "none";
        gameIframe.src = "about:blank";
        startInternalGame(game);
        return;
      }

      setTimeout(() => {
        const rawUrl = game.playUrl || "https://www.freetogame.com/";
        // 如果不可 iframe（例如 FreeToGame 等），直接外部说明 + 新标签打开。
        if (!isEmbeddableUrl(rawUrl)) {
          modalLoading.style.display = "none";
          embedNotice.classList.add("visible");
          gameIframe.src = "about:blank";
          openGameInNewTab();
          return;
        }
        gameIframe.src = withGdReferrer(rawUrl);
      }, 80);

      // If running locally, many providers (notably GameDistribution) can block embeds.
      // Show a helpful fallback message if the iframe doesn't become usable quickly.
      if (embedWatchdog) clearTimeout(embedWatchdog);
      embedWatchdog = setTimeout(() => {
        const rawUrl = game.playUrl || "";
        if (!isEmbeddableUrl(rawUrl)) {
          embedNotice.classList.add("visible");
        }
      }, 900);
    }

    function closeGameModal() {
      modalBackdrop.classList.remove("visible");
      modalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      embedNotice.classList.remove("visible");
      stopInternalGame();
      gameIframe.src = "";
      isModalMaximized = false;
      const modal = document.querySelector(".modal");
      modal.style.maxWidth = "960px";
      modal.style.maxHeight = "90vh";
      modal.style.borderRadius = "26px";
    }

    function toggleModalMaximize() {
      const modal = document.querySelector(".modal");
      isModalMaximized = !isModalMaximized;
      if (isModalMaximized) {
        modal.style.maxWidth = "100%";
        modal.style.maxHeight = "100vh";
        modal.style.borderRadius = "0";
      } else {
        modal.style.maxWidth = "960px";
        modal.style.maxHeight = "90vh";
        modal.style.borderRadius = "26px";
      }
    }

    function openGameInNewTab() {
      if (!currentModalGame) return;
      if (currentModalGame.playMode === "internal") return;
      const rawUrl = currentModalGame.playUrl || "https://www.freetogame.com/";
      window.open(withGdReferrer(rawUrl), "_blank", "noopener");
    }

    function setSeoForHome() {
      clearGameSeoJsonLd();
      setSeoForPage({
        title: "Pokopie - 100+ Free Online Browser Games | Play Instantly No Download",
        description:
          "Play 100+ free HTML5 browser games online at Pokopie.com — puzzle, arcade, racing, strategy and more. Instant play on mobile or desktop, no download.",
        canonicalPath: "/"
      });
    }

    function setSeoForCategory(cat) {
      clearGameSeoJsonLd();
      const slug = routeKeyForCategory(cat) || Object.entries(CATEGORY_ROUTES).find(([, v]) => v === cat)?.[0] || "";
      const canonicalPath = slug ? `/${slug}/` : "/";
      const keyword =
        (slug || cat || "")
          .replace(/-games$/i, " games")
          .replace(/-/g, " ")
          .trim() || "games";
      const titleCat = cat === "All" ? "All Games" : cat;
      setSeoForPage({
        title: `${titleCat} | Free Online ${keyword} - No Download - Pokopie`,
        description: `Play ${keyword} online for free on Pokopie. Explore top ${keyword} and play instantly in your browser — no download, no signup. Works on mobile and desktop.`,
        canonicalPath
      });
    }

    function handleRoute() {
      try {
        const path = (window.location.pathname || "/").replace(/\/+$/, "") || "/";

        // Backward compatible: ?game=custom-id
        const params = new URLSearchParams(window.location.search || "");
        const legacyGameId = params.get("game");
        const q = (params.get("q") || "").trim();
        if (legacyGameId) {
          const g = allGames.find((x) => x.id === legacyGameId);
          if (g) {
            history.replaceState({}, "", `/games/${g.slug || slugify(g.title)}`);
            showGameDetail(g);
            setSeoForGame(g);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
        }

        // Game detail route: /games/:slug
        if (path.startsWith("/games/")) {
          const slug = decodeURIComponent(path.slice("/games/".length)).toLowerCase();
          const game = allGames.find((g) => (g.slug || "").toLowerCase() === slug);
          if (game) {
            showGameDetail(game);
            setSeoForGame(game);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          // Not found -> home
          showHomePage();
          setSeoForHome();
          return;
        }

        // Category routes: /puzzle-games/ etc
        const key = path.replace(/^\/+/, "");
        if (CATEGORY_ROUTES[key]) {
          const cat = CATEGORY_ROUTES[key];
          showHomePage();
          currentCategory = cat;
          updateCategoryUI();
          applyFilters();
          renderCategoryLanding(cat);
          setSeoForCategory(cat);
          const mainSection = document.querySelector(".section[aria-labelledby='all-games-heading']");
          if (mainSection) mainSection.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        // Home
        showHomePage();
        renderCategoryLanding("All");
        if (q) {
          searchQuery = q;
          if (searchInput) searchInput.value = q;
          if (clearSearchBtn) clearSearchBtn.classList.toggle("visible", true);
          applyFilters();
        }
        if (currentCategory !== "All") {
          currentCategory = "All";
          updateCategoryUI();
          applyFilters();
        }
        setSeoForHome();
      } catch (_) {
        showHomePage();
        renderCategoryLanding("All");
        setSeoForHome();
      }
    }

    function setupEvents() {
      const logoLink = document.querySelector(".logo");
      if (logoLink) {
        logoLink.addEventListener("click", (e) => {
          // SPA navigation
          e.preventDefault();
          pushRoute("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      navCategories.addEventListener("click", (e) => {
        const btn = e.target.closest(".nav-pill");
        if (!btn) return;
        const cat = btn.getAttribute("data-category");
        if (!cat) return;
        currentCategory = cat;
        updateCategoryUI();
        applyFilters();

        const key = routeKeyForCategory(cat);
        if (!key) pushRoute("/");
        else pushRoute(`/${key}/`);
      });

      let searchTimeout = null;
      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value || "";
        clearSearchBtn.classList.toggle("visible", !!searchQuery);
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => applyFilters(), 150);
      });

      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.remove("visible");
        applyFilters();
      });

      heroPlayBtn.addEventListener("click", () => {
        const list = filteredGames.length ? filteredGames : allGames;
        if (!list.length) return;
        navigateToGame(list[Math.floor(Math.random() * list.length)]);
      });

      modalClose.addEventListener("click", closeGameModal);
      modalFullscreen.addEventListener("click", toggleModalMaximize);
      modalOpenNew.addEventListener("click", openGameInNewTab);
      noticeOpenNew.addEventListener("click", openGameInNewTab);
      noticeTryAnother.addEventListener("click", () => {
        const list = filteredGames.length ? filteredGames : allGames;
        if (!list.length) return;
        navigateToGame(list[Math.floor(Math.random() * list.length)]);
      });
      modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeGameModal(); });
      gameIframe.addEventListener("load", () => { modalLoading.style.display = "none"; });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalBackdrop.classList.contains("visible")) closeGameModal();
      });

      window.addEventListener("popstate", () => handleRoute());

      window.addEventListener("scroll", () => {
        if (window.scrollY > 350) backToTop.classList.add("visible");
        else backToTop.classList.remove("visible");
      });

      if (detailIframe && detailIframeLoading) {
        detailIframe.addEventListener("load", () => {
          detailIframeLoading.classList.add("hidden");
        });
      }

      backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

      const storedTheme = localStorage.getItem("pokopie-theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark) || (!storedTheme && !prefersDark);

      if (shouldUseDark) {
        document.body.classList.add("dark-theme");
        darkModeToggle.classList.add("active");
        darkModeToggle.querySelector(".icon").textContent = "🌞";
        darkModeToggle.querySelector("span:last-child").textContent = "Light";
        if (!storedTheme) localStorage.setItem("pokopie-theme", "dark");
      }

      darkModeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        darkModeToggle.classList.toggle("active", isDark);
        if (isDark) {
          darkModeToggle.querySelector(".icon").textContent = "🌞";
          darkModeToggle.querySelector("span:last-child").textContent = "Light";
          localStorage.setItem("pokopie-theme", "dark");
        } else {
          darkModeToggle.querySelector(".icon").textContent = "🌙";
          darkModeToggle.querySelector("span:last-child").textContent = "Dark";
          localStorage.setItem("pokopie-theme", "light");
        }
      });

      // Service Worker disabled to avoid unexpected caching/redirect behavior.
      // Clean up any stale SWs from previous deployments.
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          regs.forEach(function (r) { r.unregister(); });
        }).catch(function () {});
      }
    }

    document.addEventListener("DOMContentLoaded", async () => {
      setupEvents();
      await loadGames();
      handleRoute();
    });
