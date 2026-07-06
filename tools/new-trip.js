/**
 * 快速建立新旅程 (v4.0)
 * ============================================================
 * 以 2026-tokyo 的架構為基準：
 *   - src/pages/trips/{year}-{location}/  React 應用（複製自 template/）
 *   - trips/{year}-{location}/            Vite 入口 + spec.md + PWA (manifest/sw)
 *   - 自動註冊 vite.config.js 的 rollupOptions.input
 *
 * 後續工作流程：
 *   - data.js 填完後：node scripts/sync-travel-spec.mjs {year}-{location}
 *   - 離線旅遊小書：  node scripts/generate-travel-pdf.mjs {year}-{location}
 * ============================================================
 */
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const ROOT = path.join(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT, "src", "pages", "trips", "template");

// ============================================================
// 模板：HTML 入口點 (與 2026-tokyo 相同的極簡入口)
// ============================================================
function generateHTML(tripId, title, description) {
  return `<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="icon" type="image/svg+xml" href="/me/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/trips/${tripId}/main.jsx"></script>
  </body>
</html>
`;
}

// ============================================================
// 模板：main.jsx (含 ErrorBoundary，與 2026-tokyo 相同)
// ============================================================
function generateMainJsx(locationCode) {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../../../index.css";
import { ErrorBoundary } from "../../../components/ErrorBoundary.jsx";
import "./${locationCode}.css";

import { db } from "../../../lib/firebase.js";
export { db };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
`;
}

// ============================================================
// 模板：CSS 樣式檔（莫蘭迪鼠尾草綠主題，與 2026-tokyo 相同）
// ============================================================
function generateCss(locationCode, title) {
  return `/**
 * ${title} 專用樣式
 * 主題色：莫蘭迪鼠尾草綠 (Sage & Morandi Green)
 * 若要換主題，同步調整 App.jsx 內的 #5F7A61 系列色碼
 */

:root {
  --primary: #5f7a61;
  --headerPrimary: #2e3e30;
  --accent: #a3b19b;
  --dark: #1c1c1e;
  --subtle: #6e6e73;
  --surface: #f4f6f0;
}

/* 高級流光莫蘭迪鼠尾草綠漸層背景 (Mesh Gradient / Fluid Aura) */
.sage-aurora-bg {
  background-color: #f4f6f0;
  background-image:
    radial-gradient(at 0% 0%, rgba(95, 122, 97, 0.14) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(163, 177, 155, 0.16) 0px, transparent 50%),
    radial-gradient(at 100% 50%, rgba(95, 122, 97, 0.08) 0px, transparent 40%),
    radial-gradient(at 0% 100%, rgba(46, 62, 48, 0.06) 0px, transparent 50%),
    radial-gradient(
      at 50% 100%,
      rgba(163, 177, 155, 0.14) 0px,
      transparent 50%
    ),
    radial-gradient(at 50% 50%, rgba(244, 246, 240, 0.5) 0px, transparent 100%);
  background-attachment: fixed;
}

@keyframes float {
  0%,
  100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
.animate-fade-up {
  animation: slideUp 0.6s ease-out forwards;
}

.animate-fade-up-delay-1 {
  animation-delay: 0.1s;
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;
}

// ============================================================
// 模板：PWA manifest.json（離線旅遊小書用）
// ============================================================
function generateManifest(title) {
  const icon =
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗾</text></svg>';
  return (
    JSON.stringify(
      {
        name: title,
        short_name: title.slice(0, 12),
        start_url: "./travel-book.html",
        display: "standalone",
        background_color: "#0f0a19",
        theme_color: "#1a1025",
        icons: [
          { src: icon, sizes: "192x192", type: "image/svg+xml" },
          { src: icon, sizes: "512x512", type: "image/svg+xml" },
        ],
      },
      null,
      2,
    ) + "\n"
  );
}

// ============================================================
// 模板：Service Worker（離線快取旅遊小書，與 2026-tokyo 相同）
// ============================================================
function generateSw(tripId) {
  return `const CACHE_NAME = "${tripId}-trip-v1";
const urlsToCache = ["./travel-book.html", "./manifest.json"];

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
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((networkResponse) => {
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
          if (event.request.mode === "navigate") {
            return caches.match("./travel-book.html");
          }
        });
    }),
  );
});
`;
}

// ============================================================
// 模板：spec.md (行程規劃文件)
// ============================================================
function generateSpecMd(tripId, title) {
  return `# ${title} 行程規格書

> **狀態**：草稿 🟡（data.js 填寫完成後可執行自動同步）
>
> \`\`\`bash
> node scripts/sync-travel-spec.mjs ${tripId}
> \`\`\`

## 📋 行程總覽

| 項目       | 內容 |
| ---------- | ---- |
| 行程代碼   | ${tripId} |
| 適用對象   | 2人  |
| 進出點     | TBD  |
| 總預算概算 | TBD  |
| 核心策略   | TBD  |

---

## 📅 行程草案

### Day 1: 抵達
> 今日重點：

| 時間  | 活動 |
| ----- | ---- |
| 12:00 | 抵達 |
| 14:00 | 前往飯店 |
| 18:00 | 晚餐 |

---

## ✅ 待辦清單
- [ ] 訂機票（更新 data.js 的 flightData）
- [ ] 訂住宿（更新 accommodationData）
- [ ] 規劃每日行程（itineraryData / recommendedRoutes）
- [ ] 填寫美食與景點清單（foodData / attractionData）
- [ ] 執行 \`node scripts/sync-travel-spec.mjs ${tripId}\` 同步本文件
- [ ] 行程確定後執行 \`node scripts/generate-travel-pdf.mjs ${tripId}\` 產生離線旅遊小書
`;
}

// ============================================================
// vite.config.js 自動註冊入口點
// ============================================================
function registerViteEntry(locationCode, tripId) {
  const viteConfigPath = path.join(ROOT, "vite.config.js");
  const anchor = `"trips-tokyo": resolve(__dirname, "trips/2026-tokyo/index.html"),`;
  const newEntry = `"trips-${locationCode}": resolve(\n          __dirname,\n          "trips/${tripId}/index.html",\n        ),`;

  try {
    const content = fs.readFileSync(viteConfigPath, "utf8");
    if (content.includes(`trips/${tripId}/index.html`)) {
      console.log("ℹ️  vite.config.js 已包含此入口點，略過。");
      return true;
    }
    if (!content.includes(anchor)) {
      return false;
    }
    fs.writeFileSync(
      viteConfigPath,
      content.replace(anchor, `${anchor}\n        ${newEntry}`),
    );
    console.log(`✅ vite.config.js (自動加入 trips-${locationCode} 入口點)`);
    return true;
  } catch (e) {
    console.error(`⚠️  無法更新 vite.config.js: ${e.message}`);
    return false;
  }
}

// ============================================================
// 主程式
// ============================================================
async function main() {
  console.log(
    "--- 🚀 快速建立新旅程 (v4.0 - 2026-tokyo 架構：8 頁籤 + PWA + spec 同步) ---\n",
  );

  const year = (await askQuestion("📅 請輸入年份 (例如 2027): ")).trim();
  const location = (
    await askQuestion("📍 請輸入地點代碼 (例如 sapporo): ")
  ).trim();
  const title = (
    await askQuestion("✨ 請輸入主標題 (例如 北海道): ")
  ).trim();
  const subtitle = (
    await askQuestion("📝 請輸入副標題 (例如 札幌・小樽 6日旅): ")
  ).trim();

  if (!year || !location) {
    console.error("\n❌ 年份與地點為必填項目！");
    process.exit(1);
  }

  const tripTitle = title || `${year} ${location}`;
  const tripSubtitle = subtitle || `${tripTitle} 之旅`;
  const locationCode = location.toLowerCase();
  const tripId = `${year}-${locationCode}`; // 與 2026-tokyo 相同的目錄命名
  const badge = `JP · ${locationCode.toUpperCase()} · ${year}`;
  const fullTitle = `${year} ${tripTitle} ${tripSubtitle}`.replace(/\s+/g, " ");

  // 路徑（src 目錄改用 {year}-{location}，與 2026-tokyo 一致）
  const tripsDir = path.join(ROOT, "trips", tripId);
  const srcPagesDir = path.join(ROOT, "src", "pages", "trips", tripId);

  // 檢查是否已存在
  if (fs.existsSync(tripsDir) || fs.existsSync(srcPagesDir)) {
    console.error(`\n❌ 錯誤：目錄 trips/${tripId} 或 src/pages/trips/${tripId} 已經存在！`);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error(`\n❌ 錯誤：找不到模板目錄 ${TEMPLATE_DIR}！`);
    process.exit(1);
  }

  console.log(`\n📁 正在建立旅程結構 (${tripId})...`);

  // 1. 建立目錄
  fs.mkdirSync(tripsDir, { recursive: true });
  fs.mkdirSync(path.join(srcPagesDir, "components"), { recursive: true });

  // 2. trips/{tripId}/：入口 + spec + PWA
  fs.writeFileSync(
    path.join(tripsDir, "index.html"),
    generateHTML(tripId, fullTitle, `${fullTitle} 行程網頁`),
  );
  console.log(`✅ trips/${tripId}/index.html`);

  fs.writeFileSync(
    path.join(tripsDir, "spec.md"),
    generateSpecMd(tripId, fullTitle),
  );
  console.log(`✅ trips/${tripId}/spec.md`);

  fs.writeFileSync(
    path.join(tripsDir, "manifest.json"),
    generateManifest(fullTitle),
  );
  console.log(`✅ trips/${tripId}/manifest.json`);

  fs.writeFileSync(path.join(tripsDir, "sw.js"), generateSw(tripId));
  console.log(`✅ trips/${tripId}/sw.js`);

  // 3. src/pages/trips/{tripId}/：複製 template
  fs.writeFileSync(
    path.join(srcPagesDir, "main.jsx"),
    generateMainJsx(locationCode),
  );
  console.log(`✅ src/pages/trips/${tripId}/main.jsx`);

  fs.copyFileSync(
    path.join(TEMPLATE_DIR, "App.jsx"),
    path.join(srcPagesDir, "App.jsx"),
  );
  console.log(`✅ src/pages/trips/${tripId}/App.jsx (複製自 template)`);

  // data.template.js → data.js（替換佔位符）
  const dataContent = fs
    .readFileSync(path.join(TEMPLATE_DIR, "data.template.js"), "utf8")
    .replaceAll("__TRIP_ID__", tripId)
    .replaceAll("__TRIP_BADGE__", badge)
    .replaceAll("__TRIP_TITLE__", tripTitle)
    .replaceAll("__TRIP_SUBTITLE__", tripSubtitle)
    .replaceAll("__TRIP_FOOTER__", `© ${year} ${tripTitle} ${tripSubtitle}`);
  fs.writeFileSync(path.join(srcPagesDir, "data.js"), dataContent);
  console.log(`✅ src/pages/trips/${tripId}/data.js`);

  // components/
  const componentsDir = path.join(TEMPLATE_DIR, "components");
  for (const file of fs.readdirSync(componentsDir)) {
    fs.copyFileSync(
      path.join(componentsDir, file),
      path.join(srcPagesDir, "components", file),
    );
    console.log(`✅ src/pages/trips/${tripId}/components/${file}`);
  }

  // CSS
  fs.writeFileSync(
    path.join(srcPagesDir, `${locationCode}.css`),
    generateCss(locationCode, fullTitle),
  );
  console.log(`✅ src/pages/trips/${tripId}/${locationCode}.css`);

  // 4. vite.config.js 自動註冊
  const registered = registerViteEntry(locationCode, tripId);
  if (!registered) {
    console.log(`
⚠️  無法自動更新 vite.config.js，請手動在 build.rollupOptions.input 中加入：

    'trips-${locationCode}': resolve(__dirname, 'trips/${tripId}/index.html'),
`);
  }

  console.log(`
🎉 旅程 ${tripId} 建立成功！

📂 檔案結構：
   trips/${tripId}/
   ├── index.html          (Vite 入口點)
   ├── spec.md             (行程規格書，可自動同步)
   ├── manifest.json       (PWA 離線旅遊小書)
   └── sw.js               (Service Worker)

   src/pages/trips/${tripId}/
   ├── main.jsx            (React 入口 + ErrorBoundary)
   ├── App.jsx             (8 頁籤主應用：總覽/行程/交通/景點/美食/購物/住宿/花費)
   ├── data.js             (行程資料，所有內容由此驅動)
   ├── ${locationCode}.css (主題樣式)
   └── components/         (DayCard / ItineraryTab / StickyPhaseHeader / ExpenseSection)

📝 下一步：
   1. 編輯 src/pages/trips/${tripId}/data.js 填入行程資料（含 tripMeta）
   2. 執行 npm run dev 預覽頁面 → http://localhost:5173/me/trips/${tripId}/
   3. data.js 完成後執行 node scripts/sync-travel-spec.mjs ${tripId} 同步 spec.md
   4. 出發前執行 node scripts/generate-travel-pdf.mjs ${tripId} 產生離線旅遊小書
`);

  rl.close();
}

main();
