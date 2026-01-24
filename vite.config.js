import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { spawn } from "child_process";
import fs from "fs";

// Custom Plugin to handle local crawling API
const cbCrawlerPlugin = () => ({
  name: "cb-crawler-api",
  configureServer(server) {
    const CACHE_FILE = resolve(__dirname, ".hot-cb-cache.json");

    // Helper: Check if market is currently closed
    // TW Market: 09:00 - 13:30. Let's buffer to 13:35.
    const isMarketClosed = () => {
      const now = new Date();
      // UTC+8 conversion (Active Server might be in UTC)
      const twNow = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Taipei" }),
      );
      const day = twNow.getDay();
      const hour = twNow.getHours();
      const minute = twNow.getMinutes();
      const totalMinutes = hour * 60 + minute;

      // Weekend = Closed
      if (day === 0 || day === 6) return true;

      // Market Hours: 09:00 (540) ~ 13:35 (815)
      const openTime = 9 * 60;
      const closeTime = 13 * 60 + 35;

      return totalMinutes < openTime || totalMinutes > closeTime;
    };

    // Helper: Get timestamp of latest market close
    const getLastMarketCloseTime = () => {
      const now = new Date();
      const twNow = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Taipei" }),
      );
      const hour = twNow.getHours();
      const minute = twNow.getMinutes();

      // If query is after 13:35 today, last close was today 13:35
      if (hour > 13 || (hour === 13 && minute >= 35)) {
        const close = new Date(twNow);
        close.setHours(13, 35, 0, 0);
        return close.getTime();
      }
      // If query is before 13:35 (e.g. morning), last close was yesterday 13:35
      const close = new Date(twNow);
      close.setDate(close.getDate() - 1);
      close.setHours(13, 35, 0, 0);
      return close.getTime();
    };

    // API: 獲取今日熱門 CB 排行 (Run puppeteer script)
    server.middlewares.use("/api/hot-cb", async (req, res, next) => {
      // 1. Check Cache Validity
      if (isMarketClosed() && fs.existsSync(CACHE_FILE)) {
        try {
          const cacheRaw = fs.readFileSync(CACHE_FILE, "utf-8");
          const cache = JSON.parse(cacheRaw);
          const lastCloseTime = getLastMarketCloseTime();

          // If cache was generated AFTER the last market close, it is valid/final for the day
          if (cache.timestamp > lastCloseTime) {
            console.log(
              "⚡ [Cache] Serving cached Hot CB data (Market Closed)",
            );
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(cache.data));
            return;
          }
        } catch (e) {
          console.warn("Cache read error, falling back to fresh fetch", e);
        }
      }

      console.log("🔥 Fetching Hot CB List (Fresh)...");
      const child = spawn("node", ["tools/fetch-hot-cb.js"], { shell: true });

      let output = "";
      child.stdout.on("data", (data) => {
        output += data.toString();
      });

      child.stderr.on("data", (data) => {
        console.error(`Scraper Log: ${data}`);
      });

      child.on("close", (code) => {
        res.setHeader("Content-Type", "application/json");

        // Try to cache if successful AND NOT MOCK
        try {
          const json = JSON.parse(output);
          if (
            json &&
            json.source !== "mock" &&
            (Array.isArray(json.data) || json.data)
          ) {
            const cacheData = {
              timestamp: Date.now(),
              data: json,
            };
            fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData));
            console.log("💾 [Cache] Hot CB data cached.");
          } else if (json && json.source === "mock") {
            console.log(
              "⚠️ [Cache] Scraper returned MOCK data, skipping cache update.",
            );
          }
        } catch (e) {
          console.error("Failed to parse/cache output");
        }

        res.end(output);
      });
    });

    server.middlewares.use("/api/crawl", async (req, res, next) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const symbol = url.searchParams.get("code");
      const since = url.searchParams.get("since");

      if (!symbol) {
        res.statusCode = 400;
        res.end("Missing 'code' parameter");
        return;
      }

      console.log(
        `[Server] Triggering crawler for ${symbol} (since: ${since || "BEGINNING"})...`,
      );

      const args = ["tools/fetch-cb-history.js", symbol];
      if (since) args.push(since);

      const child = spawn("node", args, {
        stdio: "inherit",
        shell: true,
      });

      child.on("close", (code) => {
        if (code === 0) {
          res.statusCode = 200;
          res.end(
            JSON.stringify({ success: true, message: `Crawled ${symbol}` }),
          );
        } else {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              success: false,
              message: `Crawler exited with code ${code}`,
            }),
          );
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), cbCrawlerPlugin()],

  // 多頁面與單頁面混合設定
  build: {
    rollupOptions: {
      input: {
        // 主入口 (SPA)
        main: resolve(__dirname, "index.html"),

        // 尚未遷移為 SPA 的遺留頁面或子頁面
        "trips-ise-shima": resolve(
          __dirname,
          "trips/2026-ise-shima/index.html",
        ),
        "trips-hokkaido": resolve(__dirname, "trips/2026-hokkaido/index.html"),
        "trips-cebu": resolve(__dirname, "trips/2025-cebu/index.html"),
        "trips-osaka": resolve(__dirname, "trips/2025-osaka/index.html"),
        "tools-options": resolve(__dirname, "tools/archive/prototypes/bull-put-spread.html"),
        "tools-dashboard": resolve(__dirname, "tools/archive/prototypes/financial-dashboard.html"),
        "tools-cb": resolve(__dirname, "tools/cb-calculator.html"),
        "tools-hot-cb": resolve(__dirname, "tools/hot-cb.html"),
      },
    },
  },
  // 開發伺服器設定 (CORS Proxy)
  server: {
    proxy: {
      "/api/stock": {
        target: "https://mis.twse.com.tw/stock/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stock/, ""),
        headers: {
          Referer: "https://mis.twse.com.tw/stock/fibest.jsp?lang=zh_tw",
        },
      },
      "/api/tpex": {
        target: "https://www.tpex.org.tw",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tpex/, ""),
        headers: {
          Referer: "https://www.tpex.org.tw/",
        },
      },
      "/api/psc": {
        target: "https://cbas16889.pscnet.com.tw/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/psc/, ""),
        headers: {
          Referer: "https://cbas16889.pscnet.com.tw/",
          Origin: "https://cbas16889.pscnet.com.tw",
        },
      },
    },
    // [Fix] Prevent HMR reload when auto-crawler writes new JSON files
    watch: {
      ignored: ["**/public/data/**"],
    },
  },

  // GitHub Pages 部署設定 (repo name: /me/)
  base: "/me/",
});
