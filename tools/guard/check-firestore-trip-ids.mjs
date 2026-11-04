#!/usr/bin/env node
/**
 * Guard Script: check-firestore-trip-ids.mjs
 *
 * 檢查每個會寫共享勾選的旅程頁，它的 TRIP_ID 都在 firebase/firestore.rules 的
 * isKnownTrip 白名單裡。
 *
 * 為什麼需要這支：
 *   2026-11-04 起規則只收白名單內的 tripId（擋匿名者用任意 tripId 灌文件）。
 *   tools/new-trip.js 會自動把新旅程加進白名單，但手動新增或改名旅程時容易漏掉，
 *   漏掉的話那一頁的美食收藏、購物勾選會靜靜地寫入失敗。
 *   這支只比對 repo 內的規則檔；規則改了還是要部署才會生效。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");
const RULES = path.join(ROOT, "firebase", "firestore.rules");
const TRIPS_SRC = path.join(ROOT, "src", "pages", "trips");

const rules = fs.readFileSync(RULES, "utf8");
const listMatch = rules.match(/function isKnownTrip\(tripId\) \{\s*return tripId in \[([^\]]*)\];/);
if (!listMatch) {
  console.error("❌ firestore.rules 找不到 isKnownTrip 白名單");
  process.exit(1);
}
const allowed = new Set([...listMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));

const used = new Map(); // tripId -> 檔案
for (const dir of fs.readdirSync(TRIPS_SRC)) {
  if (dir === "template" || dir === "shared") continue;
  const pageDir = path.join(TRIPS_SRC, dir);
  if (!fs.statSync(pageDir).isDirectory()) continue;
  for (const file of ["data.js", "App.jsx"]) {
    const p = path.join(pageDir, file);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/TRIP_ID\s*=\s*["']([^"']+)["']/);
    if (m) used.set(m[1], path.relative(ROOT, p));
  }
}

const missing = [...used].filter(([id]) => !allowed.has(id));
if (missing.length) {
  console.error("❌ 以下旅程的 TRIP_ID 不在 firestore.rules 的 isKnownTrip 白名單，共享勾選會寫入失敗：");
  for (const [id, file] of missing) console.error(`   - ${id}（${file}）`);
  console.error("   加進白名單後部署：npx firebase deploy --only firestore:rules");
  process.exit(1);
}
console.log(`✅ Firestore 旅程白名單涵蓋全部 ${used.size} 個旅程頁`);
