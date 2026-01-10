const CACHE_NAME = "timboy-cache-v2";
const BASE_PATH = "/me/";

const ASSETS_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}assets/gb-theme.css`,
  `${BASE_PATH}assets/loading.css`,
  `${BASE_PATH}trips/2026-ise-shima/index.html`,
  `${BASE_PATH}icons/icon-192.png`,
  `${BASE_PATH}icons/icon-512.png`,
];

// Install Event: Precache App Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching App Shell");
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activate Event: Cleanup Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch Event: Cache First Strategy
self.addEventListener("fetch", (event) => {
  // Navigation requests: Try Network first, fall back to Cache (App Shell)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback to index.html for SPA routing
        return caches.match(`${BASE_PATH}index.html`);
      }),
    );
    return;
  }

  // Static Assets & Images: Cache First, fall back to Network
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache new images/assets locally as we browse (Runtime Caching)
        if (
          networkResponse.status === 200 &&
          (event.request.destination === "image" ||
            event.request.url.endsWith(".css") ||
            event.request.url.endsWith(".js"))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }),
  );
});
