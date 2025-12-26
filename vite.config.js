import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],

    // 多頁面應用設定
    build: {
        rollupOptions: {
            input: {
                // 主頁
                main: resolve(__dirname, 'index.html'),
                // About
                about: resolve(__dirname, 'about/index.html'),
                // Trips
                trips: resolve(__dirname, 'trips/index.html'),
                'trips-ise-shima': resolve(__dirname, 'trips/2026-ise-shima/index.html'),
                'trips-ise-shima-vite': resolve(__dirname, 'trips/2026-ise-shima-vite/index.html'),
                'trips-hokkaido': resolve(__dirname, 'trips/2026-hokkaido/index.html'),
                'trips-cebu': resolve(__dirname, 'trips/2025-cebu/index.html'),
                'trips-osaka': resolve(__dirname, 'trips/2025-osaka/index.html'),
                // Tools
                tools: resolve(__dirname, 'tools/index.html'),
                'tools-options': resolve(__dirname, 'tools/bull-put-spread.html'),
                'tools-dashboard': resolve(__dirname, 'tools/financial-dashboard.html'),
                // Journal
                journal: resolve(__dirname, 'journal/index.html'),
            },
        },
    },

    // GitHub Pages 部署設定 (repo name: /me/)
    base: '/me/',
});

