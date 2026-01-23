import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { spawn } from "child_process";

// Custom Plugin to handle local crawling API
const cbCrawlerPlugin = () => ({
  name: "cb-crawler-api",
  configureServer(server) {
    // API: 獲取今日熱門 CB 排行 (Run puppeteer script)
    server.middlewares.use("/api/hot-cb", (req, res, next) => {
      console.log("🔥 Fetching Hot CB List...");
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
        // If output is empty or not JSON, it might crash the frontend,
        // but our script handles JSON formatting even on error.
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
        "tools-options": resolve(__dirname, "tools/bull-put-spread.html"),
        "tools-dashboard": resolve(__dirname, "tools/financial-dashboard.html"),
        "tools-cb": resolve(__dirname, "tools/cb-calculator.html"),
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
