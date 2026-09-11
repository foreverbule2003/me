const CACHE_PREFIX = "2024-kyoto-trip-";
const CACHE_NAME = CACHE_PREFIX + "v2";
// master_guide.html 於 npm run build 時由 data.js 產生（本機預覽：node scripts/generate-travel-pdf.mjs 2024-kyoto）
// 由 master_guide.html 以 scope "./master_guide.html" 註冊，不接管同目錄的 React 行程頁
const urlsToCache = ["./master_guide.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()),
  );
});

// Cache Storage 全站共用：只清自己前綴的舊版，不動根 sw（timboy-cache-*）與其他旅程的快取
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME,
            )
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Network First：小書每次部署都會重新產生，連線時取最新版並更新快取，斷網才讀快取
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() =>
        caches
          .match(event.request, { ignoreSearch: true })
          .then(
            (response) =>
              response ||
              (event.request.mode === "navigate"
                ? caches.match("./master_guide.html")
                : Response.error()),
          ),
      ),
  );
});
