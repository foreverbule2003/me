const { test, expect } = require("@playwright/test");

test.describe("CB War Room Smoke Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("tools/cb-war-room.html");
  });

  test("should load War Room interface correctly", async ({ page }) => {
    // 1. Title verification
    await expect(page).toHaveTitle(/CB 戰情室/);
    
    // 2. Check for Critical UI Sections
    await expect(page.locator("#marketStatus")).toBeVisible();
    await expect(page.locator("#statusBanner")).toBeVisible();
  });

  test("should expose core modules globally", async ({ page }) => {
    // Verify our Refactoring Phase 1 & 2 success
    // These must be exposed on window for the app to function
    const globals = await page.evaluate(() => {
      return {
        hasCore: !!window.CbCalculatorCore,
        hasChart: !!window.CbPremiumHistoryChart,
        hasHistory: !!window.CbHistoryService,
        hasMeasure: !!window.measureFetch
      };
    });

    expect(globals.hasCore).toBe(true);
    expect(globals.hasChart).toBe(true);
    expect(globals.hasMeasure).toBe(true);
  });

  test("should handle Analysis Drawer state", async ({ page }) => {
    const drawer = page.locator("#analysisDrawer");
    
    // Initially closed
    await expect(drawer).not.toHaveClass(/open/);

    // Call openAnalysis via JS (Simulate interaction)
    // We must seed the data first since openAnalysis relies on finding the item
    await page.evaluate(() => {
        window.lastKnownItems = [{
            code: "23301",
            name: "台積電一",
            cbPrice: 120,
            stockPrice: 600,
            conversionPrice: 500,
            underlyingCode: "2330"
        }];
        // Now trigger it
        window.openAnalysis("23301");
    });

    // Should open
    await expect(drawer).toHaveClass(/open/);
    
    // Check Drawer Content Initialization
    await expect(page.locator("#drawerCode")).toContainText("23301");
    
    // Close it
    await page.evaluate(() => window.closeAnalysis());
    await expect(drawer).not.toHaveClass(/open/);
  });
});
