const fs = require("fs");
const path = require("path");
const csvParse = require("csv-parse/sync"); // We might not have this lib, let's use simple split
// Actually, simple split is risky for CSV. Let's try to handle basic CSV.

const TARGET_CODE = process.argv[2]; // e.g., 24673 or 15142
const CSV_FILE = process.argv[3] || `${TARGET_CODE}.csv`;

const DB_PATH = path.join(__dirname, "../public/data/cb-data.json");
const OUT_DIR = path.join(__dirname, "../public/data/history");

if (!TARGET_CODE) {
  console.error("Usage: node tools/import-xq-csv.js <CB_CODE> [CSV_PATH]");
  process.exit(1);
}

// 1. Get CB Info for Conversion Price
const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const cbInfo = dbData.items.find((i) => i.symbol === TARGET_CODE);

if (!cbInfo) {
  console.error(`Error: CB ${TARGET_CODE} not found in database.`);
  process.exit(1);
}

const convPrice = cbInfo.conversionPrice;
console.log(`Target: ${cbInfo.name} (${TARGET_CODE}), ConvPrice: ${convPrice}`);

// 2. Read CSV
const csvPath = path.resolve(CSV_FILE);
if (!fs.existsSync(csvPath)) {
  console.error(`Error: CSV file not found at ${csvPath}`);
  console.log(
    "Please export data from XQ and save as .csv in the project root.",
  );
  process.exit(1);
}

const content = fs.readFileSync(csvPath, "utf8");
const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);

// Detect format
// XQ Export often has header: "日期,開盤,最高,最低,收盤,成交量..."
// Or sometimes just data.
// We assume standard columns: Date, Open, High, Low, Close
// Need to find the header line.

let dataStartLine = 0;
// Simple heuristic: skip lines until we see a date-like pattern or just assume first line is header.
if (lines[0].includes("日期") || lines[0].includes("Date")) {
  dataStartLine = 1;
}

const resultList = [];

for (let i = dataStartLine; i < lines.length; i++) {
  const line = lines[i].trim();
  // csv split by comma or tab
  const cols = line.split(/[,\t]/).map((s) => s.trim());

  // XQ Date usually: "2024/01/01" or "20240101"
  let dateStr = cols[0];
  dateStr = dateStr.replace(/\//g, "-");

  // XQ Close usually at index 4 (0:Date, 1:Open, 2:High, 3:Low, 4:Close)
  // Check headers if possible, but hardcode for now based on user description.
  // User said B,C,D,E are Open,High,Low,Close. So A is Date.
  // Index: 0=Date, 1=Open, 2=High, 3=Low, 4=Close.

  const closePrice = parseFloat(cols[4]);

  // Stock Price?
  // Wait, the XQ CSV for "15142" gives CB Price.
  // We also need Stock Price to calculate premium correctly?
  // Or does the user only care about CB Price trend?
  // The chart needs TWO axes: Premium and Stock Price.
  // Ideally we Import CB Price AND Stock Price.
  // But if we only have CB Price, we can't calc Premium accurately without Stock Price history.
  // However, our `fetch-cb-history.js` ALREADY has Stock Price (TWSE).
  // So we can MERGE them!

  if (isNaN(closePrice)) continue;

  resultList.push({
    date: dateStr,
    cbPrice: closePrice,
  });
}

// 3. Merge with existing history (to keep Stock Price)
const jsonPath = path.join(OUT_DIR, `${TARGET_CODE}.json`);
let existingData = [];
if (fs.existsSync(jsonPath)) {
  existingData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

// Map existing by date
const historyMap = new Map();
existingData.forEach((item) => historyMap.set(item.date, item));

let updateCount = 0;

resultList.forEach((imported) => {
  let item = historyMap.get(imported.date);
  if (!item) {
    item = { date: imported.date };
    historyMap.set(imported.date, item);
  }

  // Update CB Price
  item.cbPrice = imported.cbPrice;
  item.isMock = false; // Real data from XQ

  // Recalculate Premium if Stock Price exists
  if (item.stockPrice) {
    // Premium = (CB - Parity) / Parity
    const parity = (100 / convPrice) * item.stockPrice;
    const premium = ((item.cbPrice - parity) / parity) * 100;
    item.premium = parseFloat(premium.toFixed(2));
  }

  updateCount++;
});

// Convert back to array
const finalOutput = Array.from(historyMap.values()).sort((a, b) =>
  a.date.localeCompare(b.date),
);

// Filter out items that have minimal data (e.g. no stock AND no cb)
// But wait, we want to keep whatever we have.

fs.writeFileSync(jsonPath, JSON.stringify(finalOutput, null, 2));
console.log(`Imported ${updateCount} records from ${CSV_FILE}`);
console.log(`Merged into ${jsonPath}`);
