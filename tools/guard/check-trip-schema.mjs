/**
 * Guard Script: check-trip-schema.mjs
 *
 * 比對各旅程 data.js 實際用到的欄位與 data.template.js 列出的欄位契約。
 *
 * 為什麼需要這支：
 *   data.js 先長出新欄位、模板事後才追，已連續三次讓產生腳本印出 undefined
 *   （nameJp → origin/destination → baggage，見 CHANGELOG 2.7.0 / 2.7.1 / 2.7.3）。
 *   三次都是靠肉眼在產出物裡發現。這支把比對自動化。
 *
 * 判準：
 *   某欄位在 >= 2 個旅程出現、模板卻沒有 → 視為模板漏列契約，紅燈。
 *   只在 1 個旅程出現 → 視為該旅程特有欄位，不強制（僅在 verbose 時列出）。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 旅程 data.js 是 ESM 但副檔名為 .js，Node 每次 import 都會警告一次。
// guard 每次 commit 都跑，這行雜訊會蓋掉真正的輸出，只濾掉這一種。
process.removeAllListeners("warning");
process.on("warning", (w) => {
  if (w.code !== "MODULE_TYPELESS_PACKAGE_JSON") console.warn(w);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");
const TRIPS_DIR = path.join(ROOT, "src/pages/trips");
const TEMPLATE = path.join(TRIPS_DIR, "template/data.template.js");

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

// 產生腳本（sync-travel-spec.mjs / generate-travel-pdf.mjs）會讀的 export，
// 只比對這些——其餘 export 只餵給 React 元件，缺欄位當場就會在畫面上看出來。
const WATCHED_EXPORTS = [
  "flightData",
  "accommodationData",
  "itineraryData",
  "recommendedRoutes",
  "attractionData",
  "foodData",
  "shoppingData",
  "budgetData",
  "todoData",
];

// 逐旅程差異、不屬於通用契約的欄位，列在這裡就不會報。
const ALLOWED_MISSING = new Set([
  // 例："flightData.outbound.someTripSpecificField",
]);

/**
 * 模板用註解示範選填欄位（例：`// transport: { line: ... }`），import 看不到。
 * 因此除了 import 到的路徑，再把模板原始碼切成各 export 的行區塊，
 * 區塊內出現過 `鍵名:` 就視為已列出契約。
 *
 * 侷限：只比對到「鍵名出現在哪個 export 區塊」，不分辨巢狀層級——
 * 同一個鍵名在該 export 的任一層出現過就放行。抓得到的是「模板從未提過
 * 的新欄位」（baggage 型），抓不到「鍵名有、但掛錯層」。
 */
function templateKeysByExport(src) {
  const lines = src.split("\n");
  const starts = [];
  lines.forEach((line, i) => {
    const m = line.match(/^export const (\w+)/);
    if (m) starts.push([m[1], i]);
  });
  const byExport = new Map();
  starts.forEach(([name, start], idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1][1] : lines.length;
    const keys = new Set();
    for (const line of lines.slice(start, end)) {
      for (const m of line.matchAll(/([A-Za-z_]\w*)\s*:/g)) keys.add(m[1]);
    }
    byExport.set(name, keys);
  });
  return byExport;
}

/** 取一個值的欄位路徑集合，只往下探到「足以看出契約」的深度 */
function collectPaths(value, prefix, depth, out) {
  if (depth > 3 || value === null || value === undefined) return;
  if (Array.isArray(value)) {
    // 陣列取前三個元素的鍵聯集（首元素可能剛好缺選填欄位）
    value.slice(0, 3).forEach((el) => collectPaths(el, `${prefix}[]`, depth, out));
    return;
  }
  if (typeof value !== "object") return;
  for (const [k, v] of Object.entries(value)) {
    const p = `${prefix}.${k}`;
    out.add(p);
    collectPaths(v, p, depth + 1, out);
  }
}

async function pathsOf(file) {
  const mod = await import("file://" + file);
  const out = new Set();
  for (const name of WATCHED_EXPORTS) {
    if (!(name in mod)) continue; // 旅程沒這個 export 就跳過（例：ise-shima 無 flightData）
    collectPaths(mod[name], name, 0, out);
  }
  return out;
}

console.log(`${GREEN}🛡️  Starting Trip Schema Guard...${RESET}`);

const templatePaths = await pathsOf(TEMPLATE);
const templateKeys = templateKeysByExport(fs.readFileSync(TEMPLATE, "utf8"));

/** 該欄位路徑是否已被模板涵蓋（import 到、或以註解示範） */
function coveredByTemplate(p) {
  if (templatePaths.has(p)) return true;
  const exportName = p.split(/[.[]/)[0];
  const lastKey = p.split(".").pop();
  return templateKeys.get(exportName)?.has(lastKey) ?? false;
}

const trips = fs
  .readdirSync(TRIPS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !["template", "shared"].includes(d.name))
  .map((d) => d.name)
  .filter((name) => fs.existsSync(path.join(TRIPS_DIR, name, "data.js")));

// 欄位 → 用到它的旅程清單
const usage = new Map();
for (const trip of trips) {
  let paths;
  try {
    paths = await pathsOf(path.join(TRIPS_DIR, trip, "data.js"));
  } catch (err) {
    console.log(`${YELLOW}⚠️  ${trip}/data.js 讀取失敗，略過：${err.message}${RESET}`);
    continue;
  }
  for (const p of paths) {
    if (coveredByTemplate(p) || ALLOWED_MISSING.has(p)) continue;
    if (!usage.has(p)) usage.set(p, []);
    usage.get(p).push(trip);
  }
}

const violations = [...usage.entries()].filter(([, ts]) => ts.length >= 2);
const singles = [...usage.entries()].filter(([, ts]) => ts.length === 1);

if (process.env.VERBOSE && singles.length > 0) {
  console.log(`${YELLOW}ℹ️  只有單一旅程使用（視為旅程特有，不強制）：${RESET}`);
  for (const [p, ts] of singles.sort()) console.log(`   ${p}  ← ${ts[0]}`);
}

if (violations.length > 0) {
  console.log(
    `${RED}❌ 模板漏列欄位契約：以下欄位有 2 個以上旅程在用，data.template.js 卻沒有${RESET}`,
  );
  for (const [p, ts] of violations.sort()) {
    console.log(`   ${RED}${p}${RESET}  ← ${ts.join(", ")}`);
  }
  console.log(
    `\n   修法：把欄位補進 ${path.relative(ROOT, TEMPLATE)}（選填的標 (Optional)），`,
  );
  console.log(
    `   或確認它確實只屬於特定旅程後，加進本檔的 ALLOWED_MISSING 並註明原因。`,
  );
  process.exit(1);
}

console.log(
  `${GREEN}✅ 模板欄位契約與 ${trips.length} 個旅程一致（監看 ${WATCHED_EXPORTS.length} 個 export）。${RESET}`,
);
