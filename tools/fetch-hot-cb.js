const fs = require("fs");
const path = require("path");
const { fetchHotCB, getMockHotCB } = require("../src/utils/cb-fetcher");
const { saveSnapshotToCloud } = require("../src/utils/hot-cb-cloud");

/**
 * Fetch Hot CB (CLI Tool)
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
