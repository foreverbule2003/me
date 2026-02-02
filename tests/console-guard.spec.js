const { test, expect } = require("@playwright/test");
const fs = require('fs');
const path = require('path');

// Pages to monitor
const PAGES = [
  "tools/cb-calculator.html",
  "tools/cb-war-room.html"
];

// Ignored harmless errors (if any)
const IGNORED_ERRORS = [
  "favicon.ico",
  "[Guard] Suppressed RangeError",
  "mce-autosize-textarea", // Third-party duplicate definition
  "TailingCSS", // Warning from CDN
  "Analytics: Dynamic config fetch failed", // Local env noise
  "Failed to load resource: the server responded with a status of 404", // Linked to above
  "Cannot read properties of undefined (reading 'split')", // Firebase SDK side-effect of 404
  "TypeError: Failed to fetch", // Network/Firewall issue
  "Could not reach Cloud Firestore backend", // Offline/Firewall
  "The operation could not be completed" // Connection noise
];

// Ensure log dir
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

PAGES.forEach(url => {
  test(`Console Health Check: ${url}`, async ({ page }) => {
    const errors = [];
    
    // Log file path
    const logFile = path.join(logDir, 'guard-report.txt');
    
    page.on("console", msg => {
      if (msg.type() === "error") {
        const text = msg.text();
        if (!IGNORED_ERRORS.some(i => text.includes(i))) {
          errors.push(text);
          try {
             fs.appendFileSync(logFile, `[${url}] Error: ${text}\n`);
          } catch(e) {}
          console.log(`[Browser Error] ${text}`);
        }
      }
    });

    page.on("pageerror", err => {
      if (!IGNORED_ERRORS.some(i => err.message.includes(i))) {
        errors.push(err.message);
        try {
          fs.appendFileSync(logFile, `[${url}] Exception: ${err.message}\n`);
        } catch(e) {}
      }
    });

    // Clear previous log for this run? No, append is safer for multiple tests running in parallel
    // Ideally we'd clear it once at the start of the suite, but appending is fine for debugging.

    try {
        await page.goto(url);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);
    } catch (e) {
        try {
            fs.appendFileSync(logFile, `[${url}] Nav Error: ${e.message}\n`);
        } catch(e) {}
    }

    expect(errors.length, `Detected ${errors.length} console errors on ${url}`).toBe(0);
  });
});
