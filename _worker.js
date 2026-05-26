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

function shouldServeAppShell(pathname) {
  const path = normalizePath(pathname);
  return path.startsWith("/play/") || SPA_ROUTES.has(path);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
