# 🎮 TimZ Landing Page

> TimBoy 風格的互動式個人網站，結合復古遊戲機美學與現代 Web 技術。

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://foreverbule2003.github.io/me/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](https://foreverbule2003.github.io/me/)

## ✨ 功能特色

- 🕹️ **TimBoy 模擬器** - 復古遊戲機風格的首頁互動
- 🍿 **旅程規劃系統** - React 驅動的詳細行程頁面
- 📊 **財務工具** - 投資策略模擬器與儀表板
- 🌿 **素食友善** - 旅程中的素食餐廳指南（雲端同步）
- 🤖 **AI 助手** - 整合 Gemini API 的旅遊問答

## 🚀 快速開始

```bash
# 安裝依賴 (Live Server)
npm install -g live-server

# 啟動開發伺服器
npm run dev

# 瀏覽器開啟 http://localhost:8080
```

## 📁 專案結構

```
my-landing-page/
├── index.html          # 首頁 (TimBoy 模擬器)
├── about.html          # 關於頁面
├── trips.html          # 旅程列表
├── tools.html          # 工具箱入口
│
├── trips/              # 旅程詳情
│   ├── shared/         # 共用元件庫
│   │   ├── components.js
│   │   ├── icons.js
│   │   └── styles.css
│   ├── 2025-cebu/
│   ├── 2026-ise-shima/
│   └── TRIP_STYLE_GUIDE.md
│
├── tools/              # 工具頁面
│   ├── financial-dashboard.html
│   ├── bull-put-spread.html
│   └── new-trip.js     # 新旅程腳本
│
└── .agent/workflows/   # AI 助手 Workflows
```

## 📜 可用腳本

| 指令               | 說明               |
| ------------------ | ------------------ |
| `npm run dev`      | 啟動本地開發伺服器 |
| `npm run new-trip` | 互動式建立新旅程   |
| `npm run format`   | 格式化所有程式碼   |

## 🛠️ 技術棧

- **前端框架**：React 18 (CDN)
- **樣式**：Tailwind CSS
- **圖示**：Lucide Icons (自訂封裝)
- **即時同步**：Firebase Firestore
- **構建**：無構建步驟，純 HTML/JS
- **部署**：GitHub Pages

## 📖 文件

- [FEATURES.md](./FEATURES.md) - 功能清單
- [COMPONENTS.md](./COMPONENTS.md) - 元件文件
- [SITEMAP.md](./SITEMAP.md) - 網站地圖
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - 樣式指南

## 🔗 連結

- **線上版本**: [foreverbule2003.github.io/me](https://foreverbule2003.github.io/me/)
- **GitHub**: [foreverbule2003/me](https://github.com/foreverbule2003/me)

---

Made with 💜 by TimZ
