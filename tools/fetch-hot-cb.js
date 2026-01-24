const { fetchHotCB, getMockHotCB } = require("../src/utils/cb-fetcher");

/**
 * Fetch Hot CB (Legacy/CLI Tool wrapper)
 * Now delegates logic to src/utils/cb-fetcher.js
 */
(async () => {
  try {
    const result = await fetchHotCB();
    // fetchHotCB now returns { source, updatedAt, data } or just array (legacy)
    // We want to print standard format
    if (result.data) {
        console.log(JSON.stringify(result, null, 2));
    } else {
        // Should not happen with new fetcher but fallback
        console.log(JSON.stringify({ source: "pchome", data: result }, null, 2));
    }
  } catch (error) {
    // Fallback: Mock Data
    const mockData = getMockHotCB();
    console.log(JSON.stringify({ source: "mock", data: mockData }, null, 2));
  }
})();
