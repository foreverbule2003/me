const fs = require("fs");
const path = require("path");
const { fetchHotCB } = require("../src/utils/cb-fetcher");

/**
 * Snapshot Hot CB Tool
 * Fetches the current Hot CB list and saves it as a historical JSON file.
 * File path: public/data/history/YYYY-MM-DD.json
 */

const HISTORY_DIR = path.join(__dirname, "..", "public", "data", "history");

if (!fs.existsSync(HISTORY_DIR)) {
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

(async () => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const outFile = path.join(HISTORY_DIR, `${dateStr}.json`);

  console.log(`[Snapshot] Starting snapshot for ${dateStr}...`);

  try {
    const data = await fetchHotCB();

    const snapshot = {
      date: dateStr,
      timestamp: Math.floor(Date.now() / 1000),
      version: "1.0",
      source: "PChome",
      count: data.length,
      data: data,
    };

    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), "utf8");
    console.log(`[Snapshot] Success! Saved ${data.length} items to ${outFile}`);
  } catch (error) {
    console.error(`[Snapshot] Failed: ${error.message}`);
    process.exit(1);
  }
})();
