# 🎮 TimZ Landing Page

> TimBoy 風格的互動式個人網站，結合復古遊戲機美學與現代 Web 技術。

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://foreverbule2003.github.io/me/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](https://foreverbule2003.github.io/me/)

## ✨ 功能特色

- 🕹️ **TimBoy 模擬器** - 復古遊戲機風格的首頁互動
- 🍿 **旅程規劃系統** - React 驅動的詳細行程頁面
- 📓 **Vibe Coding Journal** - 開發日記（Firebase Auth 登入保護）
- 📊 **財務工具** - 投資策略模擬器與儀表板
- 🌿 **素食友善** - 旅程中的素食餐廳指南（雲端同步）
- 🤖 **AI 助手** - 整合 Gemini API 的旅遊問答

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (Vite)
npm run dev

# 建構 Production Bundle
npm run build

# 預覽 Production Build
npm run preview
```

## 📁 專案結構

```
timboy/
├── index.html              # 首頁 (TimBoy 模擬器)
├── about/index.html        # 關於頁面
├── trips/index.html        # 旅程列表
├── tools/index.html        # 工具箱入口
├── journal/                # 📓 開發日記
│
├── src/                    # Vite ESM 入口點
│   ├── main.jsx            # 首頁入口
│   ├── components/         # 共用元件
│   │   └── GameBoyShell.jsx
│   ├── lib/                # 工具庫
│   │   └── firebase.js
│   └── pages/              # 各頁面入口
│       ├── about/main.jsx
│       ├── trips/main.jsx
│       ├── tools/main.jsx
│       └── journal/main.jsx
│
├── trips/                  # 旅程詳情
│   ├── shared/             # 共用元件庫
│   ├── 2025-cebu/
│   ├── 2026-ise-shima/
│   └── TRIP_STYLE_GUIDE.md
│
├── tools/                  # 工具頁面
├── public/                 # 靜態資源 (Vite 直接複製)
├── assets/                 # CSS 與圖片
└── vite.config.js          # Vite 設定檔
```

## 📜 可用腳本

| 指令               | 說明                          |
| ------------------ | ----------------------------- |
| `npm run dev`      | 啟動 Vite 開發伺服器 (熱更新) |
| `npm run build`    | 建構 Production Bundle        |
| `npm run preview`  | 預覽 Production Build         |
| `npm run new-trip` | 互動式建立新旅程              |
| `npm run format`   | 格式化所有程式碼              |

## 🛠️ 技術棧

- **建構工具**：Vite 6.0
- **前端框架**：React 18
- **樣式**：Tailwind CSS
- **圖示**：Lucide Icons (自訂封裝)
- **即時同步**：Firebase Firestore
- **部署**：GitHub Actions + GitHub Pages

## 📚 相關文件

- [FEATURES.md](./docs/FEATURES.md) - 功能清單
- [COMPONENTS.md](./docs/COMPONENTS.md) - 元件文件
- [SITEMAP.md](./docs/SITEMAP.md) - 網站地圖
- [STYLE_GUIDE.md](./docs/STYLE_GUIDE.md) - 程式碼風格指南
- [TODO_SPEC.md](./docs/TODO_SPEC.md) - 待辦事項寫作規範
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 貢獻指南
- [CHANGELOG.md](./CHANGELOG.md) - 更新日誌
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - 架構決策記錄 (ADR)

## 🔗 連結

- **線上版本**: [foreverbule2003.github.io/me](https://foreverbule2003.github.io/me/)
- **GitHub**: [foreverbule2003/me](https://github.com/foreverbule2003/me)

---

Made with 💜 by TimZ
