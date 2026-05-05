/* Service Worker for Pokopie:
   - FreeToGame API: network-first (avoid stale game catalog)
   - Static assets: cache-first
   - Do not cache arbitrary cross-origin GET requests
*/

const CACHE_VERSION = "v2";
const STATIC_CACHE = `pokopie-static-${CACHE_VERSION}`;
const API_CACHE = `pokopie-api-${CACHE_VERSION}`;
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/app.js",
  "/games/2048/index.html",
  "/games/tetris/index.html",
  "/games/breakout/index.html",
  "/games/memory/index.html",
  "/games/minesweeper/index.html",
  "/games/snake/index.html",
  "/fun-quiz.html"
];
const API_HOST = "www.freetogame.com";
const API_PATH_PREFIX = "/api/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== API_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isApiRequest(reqUrl) {
  return reqUrl.hostname === API_HOST && reqUrl.pathname.startsWith(API_PATH_PREFIX);
}

async function networkFirst(req) {
  const cache = await caches.open(API_CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  } catch (_) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw _;
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(req, res.clone()).catch(() => {});
  }
  return res;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Cache-first only for same-origin static resources/documents.
  if (url.origin === self.location.origin) {
    event.respondWith(
      cacheFirst(req).catch(() => caches.match("/index.html"))
    );
  }
});

