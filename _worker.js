const SPA_ROUTES = new Set([
  "/puzzle-games",
  "/action-games",
  "/shooting-games",
  "/arcade-games",
  "/racing-games",
  "/sports-games",
  "/strategy-games",
  "/idle-games"
]);

const ADS_TXT = "google.com, pub-3274781156049995, DIRECT, f08c47fec0942fa0\n";

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function isRetiredPlayPath(pathname) {
  const path = normalizePath(pathname);
  return path === "/play" || path.startsWith("/play/");
}

function goneResponse() {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, follow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page removed | Pokopie</title>
</head>
<body>
  <main style="max-width:720px;margin:48px auto;padding:0 20px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6">
    <h1>This old game page has been removed</h1>
    <p>Pokopie is cleaning up retired game pages and focusing on higher-quality original guides and curated game pages.</p>
    <p><a href="/">Go to the Pokopie homepage</a></p>
  </main>
</body>
</html>`, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, follow",
      "cache-control": "public, max-age=300"
    }
  });
}

function shouldServeAppShell(pathname) {
  const path = normalizePath(pathname);
  return SPA_ROUTES.has(path);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (isRetiredPlayPath(url.pathname)) return goneResponse();

    if (url.pathname === "/ads.txt") {
      return new Response(ADS_TXT, {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=300"
        }
      });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    if (!shouldServeAppShell(url.pathname)) return response;

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";

    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  }
};
