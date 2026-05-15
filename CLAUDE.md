# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pokopie** (pokopie.com) is a free online HTML5 games portal. It aggregates 100+ browser games via the FreeToGame API and hosts 5 built-in canvas games. The site is a pure vanilla HTML/CSS/JS static app with no build system.

## Development

**No build step required.** Edit files directly and they are production-ready.

**Local development:** Serve the root directory with any static file server:
```bash
python -m http.server 8000
# or
npx serve .
```

**Sitemap regeneration** (run after adding new games or routes):
```bash
node tools/gen-sitemap.js > sitemap.xml
```

**Deployment:** Push to `main` — Netlify auto-deploys. Routing rules are in `_redirects`.

There is no linting, no tests, and no package manager.

## Architecture

**`app.js`** (~3568 lines) is the main application script:
- Maintains a local catalog of 105 browser games from GameDistribution
- Renders a filterable/searchable game grid
- Opens games in an iframe modal or routes to game detail pages (`/games/{slug}`)
- Handles category filtering, dark/light theme, and similar-game sidebars
- All CSS and JS are inline within HTML files

**`/games/`** — 5 self-contained built-in games (2048, breakout, memory, minesweeper, snake, tetris), each with their own `index.html` + local JS/CSS. These are loaded inside the main modal or as standalone pages.

**`_redirects`** — Netlify routing. Maps clean URLs (e.g., `/best-unblocked-games`) to their HTML files. The catch-all `/* -> /index.html` enables SPA-style routing.

**`sw.js`** — Minimal service worker for offline caching of core assets.

**`fun-quiz.html`** — Standalone personality quiz page, entirely self-contained.

**`assets/`** — ~110 PNG game thumbnail images (~28 MB total). Referenced by game cards in `index.html`.

## Key Design Decisions

- **Inline everything**: CSS and JS are embedded in HTML, not split into separate files. This is intentional for this project.
- **FreeToGame API** is the primary game source. Custom iframe games from GameDistribution serve as fallbacks/supplements.
- **No framework**: Pure DOM manipulation throughout.
- **SEO-first**: Canonical tags, JSON-LD structured data, OpenGraph meta, and dedicated landing pages (`best-unblocked-games.html`, `top-idle-games.html`) are central to the site strategy.
- **Monetization**: Google AdSense (`ca-pub-3274781156049995`) is integrated into game pages and modals.
