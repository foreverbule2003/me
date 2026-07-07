const CACHE_NAME = "tokyo-trip-v3";
// master_guide.html 由 node scripts/generate-travel-pdf.mjs 2026-tokyo 產生
const urlsToCache = ["./master_guide.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if found
      if (response) {
        return response;
      }

      // Otherwise try to fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Don't cache cross-origin requests like images to keep it simple,
          // or we can cache them dynamically if we want.
          // Let's cache dynamically to make images work offline too!
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If offline and request fails, return the travel book for navigation
          if (event.request.mode === "navigate") {
            return caches.match("./master_guide.html");
          }
        });
    }),
  );
});
