/* ===========================================================
   service-worker.js
   Offline support via a precached app shell.
   Bump CACHE_VERSION whenever you change any cached file.
   Paths are RELATIVE so this works under any GitHub Pages sub-path.
   =========================================================== */

const CACHE_VERSION = "vtaper-v4";

// Critical app shell — install fails if any of these can't be cached.
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./styles.css",
  "./script.js",
  "./data.js",
  "./manifest.json",
];

// Nice-to-have assets — cached individually so one 404 can't break install.
const OPTIONAL_ASSETS = [
  "./icons/favicon.svg",
  "./icons/favicon-64.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
];

// Install: precache the app shell.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(CORE_ASSETS);
      // Best-effort: don't let a single missing icon abort the install.
      await Promise.allSettled(OPTIONAL_ASSETS.map((a) => cache.add(a)));
      await self.skipWaiting();
    })()
  );
});

// Activate: drop old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// Allow the page to trigger immediate activation of a waiting worker.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

// Fetch strategy:
//  - navigations: network-first, fall back to cached index.html, then offline.html.
//  - same-origin assets: cache-first, then network (and cache the result).
//  - cross-origin (Google Fonts): stale-while-revalidate.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(async () =>
          (await caches.match("./index.html")) || (await caches.match("./offline.html"))
        )
    );
    return;
  }

  if (sameOrigin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
              return res;
            })
            .catch(() => cached)
      )
    );
    return;
  }

  // Cross-origin (fonts): serve cache, refresh in background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
