import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

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
      },
    },
  },

  // GitHub Pages 部署設定 (repo name: /me/)
  base: "/me/",
});
