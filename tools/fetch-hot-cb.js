const { fetchHotCB, getMockHotCB } = require("../src/utils/cb-fetcher");
const { saveSnapshotToCloud } = require("../src/utils/hot-cb-cloud");

/**
 * Fetch Hot CB (CLI Tool)
 * 支援 --cloud 參數將結果同步至 Firestore
 */
(async () => {
  const isCloud = process.argv.includes("--cloud");

  try {
    const result = await fetchHotCB();
    const output = result.data
        ? result
        : { source: "pchome", data: result };

    // Print to console (legacy behavior)
    console.log(JSON.stringify(output, null, 2));

    // Optional: Save to cloud
    if (isCloud) {
        await saveSnapshotToCloud(output);
    }

  } catch (error) {
    // Fallback: Mock Data
    const mockData = getMockHotCB();
    const output = { source: "mock", data: mockData };
    console.log(JSON.stringify(output, null, 2));
    
    if (isCloud) {
        await saveSnapshotToCloud(output);
    }
  }
})();
