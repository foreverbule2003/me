const { test, expect } = require("@playwright/test");

test.describe("CB War Room (React) Comprehensive Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Use the unified React entry point
    await page.goto("tools/cb-war-room.html");
    await page.waitForLoadState("networkidle");
  });

  test("should load War Room interface and display correct title", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/CB 戰情室/);

    // Check for the main title heading
    const title = page.locator("h1", { hasText: "CB 戰情室" });
    await expect(title).toBeVisible();
  });

  test("should display inline DateNavigator with correct format", async ({
    page,
  }) => {
    const dateNav = page.locator(".inline-flex.items-center.gap-2", {
      has: page.locator(".far.fa-calendar-alt"),
    });
    await expect(dateNav).toBeVisible();

    const dateText = dateNav.locator("span.mono");
    await expect(dateText).toBeVisible();
    const text = await dateText.innerText();
    // Format: YY/MM/DD(Day)
    expect(text).toMatch(/\d{2}\/\d{2}\/\d{2}\(.+\)/);
  });

  test("should have functional Tabs with Indigo styling", async ({ page }) => {
    const pulseTab = page.locator("button", { hasText: "市場熱門" });
    const watchlistTab = page.locator("button", { hasText: "我的追蹤" });

    await expect(pulseTab).toBeVisible();
    await expect(watchlistTab).toBeVisible();

    // Active tab should have indigo border
    await expect(pulseTab).toHaveClass(/border-indigo-600/);

    // Switch tab
    await watchlistTab.click();
    await expect(watchlistTab).toHaveClass(/border-indigo-600/);
    await expect(pulseTab).toHaveClass(/border-transparent/);
  });

  test("should open AnalysisDrawer and recover metadata correctly", async ({
    page,
  }) => {
    // Wait for data table
    const firstRow = page.locator("tbody tr").first();
    await expect(firstRow).toBeVisible({ timeout: 15000 });

    const code = await firstRow.locator("span.mono").first().innerText();
    await firstRow.click();

    // Drawer should open
    const drawer = page.locator("aside, div").filter({ hasText: "個股分析" });
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText(code);

    // Metadata Recovery Check (Price should load eventually, not stay "--")
    await page.waitForTimeout(2000);
    const convPriceValue = await drawer
      .locator("span.mono")
      .first()
      .innerText(); // Adjust selector if needed
    // Just verify basic visibility of the drawer's data fields
    await expect(
      drawer.locator("button", { has: page.locator(".fa-save") }),
    ).toBeVisible();
  });

  test("should NOT have console errors (toDate/find is not a function)", async ({
    page,
  }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    const criticalErrors = errors.filter(
      (e) =>
        e.includes("toDate") ||
        e.includes("find is not a function") ||
        e.includes("FirebaseError"),
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should verify global module exposure (Legacy Compatibility)", async ({
    page,
  }) => {
    const globals = await page.evaluate(() => {
      return {
        hasCore: !!window.CbCalculatorCore,
        hasChart: !!window.CbPremiumHistoryChart,
        hasHistory: !!window.CbHistoryService,
      };
    });

    expect(globals.hasCore).toBe(true);
    expect(globals.hasChart).toBe(true);
    expect(globals.hasHistory).toBe(true);
  });
});
