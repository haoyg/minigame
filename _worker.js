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

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function shouldServeAppShell(pathname) {
  const path = normalizePath(pathname);
  return path.startsWith("/play/") || SPA_ROUTES.has(path);
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!shouldServeAppShell(url.pathname)) return response;

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";

    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  }
};
