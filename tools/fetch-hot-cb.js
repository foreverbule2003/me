const { fetchHotCB, getMockHotCB } = require("../src/utils/cb-fetcher");

/**
 * Fetch Hot CB (Legacy/CLI Tool wrapper)
 * Now delegates logic to src/utils/cb-fetcher.js
 */
(async () => {
  try {
    const results = await fetchHotCB();
    console.log(JSON.stringify({ source: "pchome", data: results }, null, 2));
  } catch (error) {
    // Fallback: Mock Data
    const mockData = getMockHotCB();
    console.log(JSON.stringify({ source: "mock", data: mockData }, null, 2));
  }
})();
