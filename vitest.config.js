import { defineConfig } from "vitest/config";

// 單元測試僅掃描 src/ 下的 *.test.* 檔案。
// tests/ 目錄是 Playwright E2E 專用（npm run test:ui），
// 不可讓 vitest 誤掃，否則 3 個 spec 必定紅燈（防線失效的主因）。
export default defineConfig({
  test: {
    include: ["src/**/*.test.{js,mjs,jsx,ts,tsx}"],
    exclude: ["node_modules/**", "dist/**", "tests/**"],
  },
});
