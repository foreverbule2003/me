const { test, expect } = require("@playwright/test");

test.describe("CB Calculator Smoke Test", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator tool
    await page.goto("tools/cb-calculator.html");
  });

  test("should load the calculator page correctly", async ({ page }) => {
    // Escape the pipe character in regex
    await expect(page).toHaveTitle(/CB Analytics Engine \| Me Tools/);
    const header = page.locator("h1");
    // Correct H1 text
    await expect(header).toContainText("CB 可轉債計算機");
  });

  test("should perform a search and update UI", async ({ page }) => {
    const searchInput = page.locator("#stockSearch");

    // 1. Enter a known code
    await searchInput.fill("24673");
    await searchInput.press("Enter");

    // 2. Check if calculations are updated (with timeout for async fetch)
    const premiumRate = page.locator("#premiumRate");
    await expect(premiumRate).toContainText("%", { timeout: 10000 });

    // 3. Check for specific status classes (premium-card should be visible)
    const premiumCard = page.locator(".premium-card").first();
    await expect(premiumCard).toBeVisible();
  });

  test("should maintain professional aesthetics", async ({ page }) => {
    // Use ID for precise targeting
    const premiumCard = page.locator("#premiumCard");
    await expect(premiumCard).toHaveClass(/.*rounded-2xl.*/);
    await expect(premiumCard).toHaveClass(/.*shadow.*/);
  });
});
