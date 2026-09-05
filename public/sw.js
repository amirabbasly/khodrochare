const CACHE_NAME = "khodrochare-shell-v2-20260905";
const APP_SHELL = ["/offline.html", "/app-icon.svg"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("khodrochare-") && key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Never cache customer requests, availability, or React Server Component payloads.
  if (event.request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || event.request.headers.get("RSC") || url.searchParams.has("_rsc")) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(async () => {
      const offline = await caches.match("/offline.html");
      return new Response(offline ? await offline.text() : "Offline. Call 09123022064.", { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
    }));
  }
  // Missing assets must not be replaced by a misleading HTTP-200 home page.
});
