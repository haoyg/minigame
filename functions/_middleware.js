export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname.startsWith("/games/")) {
    url.pathname = "/";
    return Response.redirect(url.toString(), 302);
  }
}