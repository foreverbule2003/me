const fs = require("fs");
const path = require("path");
const { fetchHotCB, getMockHotCB } = require("../src/utils/cb-fetcher");
const { saveSnapshotToCloud } = require("../src/utils/hot-cb-cloud");

/**
 * @name fetch-hot-cb
 * @description 擷取市場熱門可轉債清單 (Market Pulse)
 * @source PChome Money (Tabular data)
 * @scope 市場成交量前 50-100 名標的
 * @target terminal console & (optional) Firestore Snapshot
 *
 * 支援:
 *   --cloud     同步至 Firestore
 *   --snapshot  存為本地歷史 JSON (public/data/history/YYYY-MM-DD.json)
 */
(async () => {
  const isCloud = process.argv.includes("--cloud");
  const isSnapshot = process.argv.includes("--snapshot");

  try {
    const result = await fetchHotCB();
    const output = result.data ? result : { source: "pchome", data: result };

    // Print to console
    console.log(JSON.stringify(output, null, 2));

    // Optional: Save to cloud
    if (isCloud) {
      await saveSnapshotToCloud(output);
    }

    // Update Local JSONs (Hot List & Master Directory)
    if (isCloud || process.argv.includes("--save")) {
      // 1. Save Hot List (Top 20) for War Room display
      const hotPath = path.join(__dirname, "../public/data/hot-cb.json");
      fs.writeFileSync(hotPath, JSON.stringify(output, null, 2), "utf8");
      console.log(`\n✅ Hot List (hot-cb.json) saved.`);

      // 2. Update Master Index (cb-data.json) for Search/Calculator lookup
      const masterPath = path.join(__dirname, "../public/data/cb-data.json");
      const masterData = {
        updatedAt: new Date().toISOString(),
        count: output.data.length,
        items: output.data.map((item) => ({
          code: item.code,
          name: item.name,
          price: item.price,
          underlyingCode: item.underlyingCode, // Assuming fetchHotCB provides this
        })),
      };

      // Smart Merge to preserve static fields if key matches
      if (fs.existsSync(masterPath)) {
        try {
          const existing = JSON.parse(fs.readFileSync(masterPath, "utf8"));
          const map = new Map(existing.items.map((i) => [i.code, i]));

          output.data.forEach((newItem) => {
            if (map.has(newItem.code)) {
              // Update dynamic fields
              const old = map.get(newItem.code);
              map.set(newItem.code, { ...old, price: newItem.price });
            } else {
              // Add new item
              map.set(newItem.code, {
                code: newItem.code,
                name: newItem.name,
                price: newItem.price,
                underlyingCode: newItem.underlyingCode || "", // Fallback
                conversionPrice: 100, // Default or needs separate enrich
              });
            }
          });
          masterData.items = Array.from(map.values());
        } catch (e) {}
      }

      fs.writeFileSync(masterPath, JSON.stringify(masterData, null, 2), "utf8");
      console.log(`\n✅ Master Index (cb-data.json) updated.`);
    }

    // Optional: Local Snapshot
    if (isSnapshot) {
      const today = new Date().toISOString().split("T")[0];
      const outFile = path.join(
        __dirname,
        "../public/data/history",
        `${today}.json`,
      );
      const snapshot = {
        date: today,
        timestamp: Math.floor(Date.now() / 1000),
        version: "2.0",
        source: output.source,
        count: output.data.length,
        data: output.data,
      };
      fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), "utf8");
      console.log(`\n✅ Snapshot saved to ${outFile}`);
    }
  } catch (error) {
    // Fallback: Mock Data
    const mockData = getMockHotCB();
    const output = { source: "mock", data: mockData };
    console.log(JSON.stringify(output, null, 2));

    if (isCloud) await saveSnapshotToCloud(output);
  }
})();
