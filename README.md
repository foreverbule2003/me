# 🎮 TimZ Landing Page

> TimBoy 風格的互動式個人網站，結合復古遊戲機美學與現代 Web 技術。

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://foreverbule2003.github.io/me/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](https://foreverbule2003.github.io/me/)

## ✨ 功能特色

- 🕹️ **TimBoy 模擬器** - 復古遊戲機風格的首頁互動
- 📊 **財務工具** - 投資策略模擬器與儀表板 ✨ NEW
  - [財務儀表板](file:///tools/some-company.html) (Vite + React 版) 📈
  - [可轉債戰情室](file:///tools/cb-war-room.html) (Vite + React 版) 🚀
  - [可轉債計算機](file:///tools/cb-calculator.html) (Vite + React 版) 🧮
- 🍿 **旅程規劃系統** - React 驅動的詳細行程頁面
- 📓 **Vibe Coding Journal** - 開發日記（Firebase Auth 登入保護）
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
├── tools/                  # 工具頁面與後端橋接器
│   ├── components/         # 前端共用 Service (JS/MJS)
│   ├── lib/                # Python DDE 模組化層
│   │   ├── xq_dde.py       # 通訊協定封裝
│   │   └── cb_service.py   # 業務邏輯封裝
│   ├── xq_bridge.py        # (Legacy) 舊版 DDE 入口
│   └── fetch-hot-cb-dde.py # 🔥 核心 DDE 行情同步腳本
├── public/                 # 靜態資源 (Vite 直接複製)
├── assets/                 # CSS 與圖片
└── vite.config.js          # Vite 設定檔
```

---

## 📜 可用腳本

| 指令               | 說明                          |
| ------------------ | ----------------------------- |
| `npm run dev`      | 啟動 Vite 開發伺服器 (熱更新) |
| `npm run build`    | 建構 Production Bundle        |
| `npm run preview`  | 預覽 Production Build         |
| `npm run new-trip` | 互動式建立新旅程              |
| `npm run sync-cb`  | 執行 CB 資料自動化同步預覽    |
| `npm run format`   | 格式化所有程式碼              |

---

## 🔄 Data Sync (Hybrid DDE)

我們採用 **Hybrid DDE 架構** 來解決爬蟲與即時性的問題。
資料源自您的本地電腦 (XQ 全球贏家)，透過 Python 橋接腳本同步至雲端。

### 財務儀表板 (some-company) ✨

| 檔案               | 說明                                                             |
| ------------------ | ---------------------------------------------------------------- |
| `DataTable.jsx`    | **財務報表元件**：支援 100% 寬度自適應、放大字體與季度動態標題。 |
| `KpiCards.jsx`     | **KPI 視覺化卡片**：呈現營收、毛利、營益與淨利之核心指標。       |
| `RevenueChart.jsx` | **成長趨勢圖**：Chart.js 驅動的營收成長視覺化。                  |
| `ProfitChart.jsx`  | **獲利分析圖**：Chart.js 驅動的獲利能力走勢。                    |
| `AnnualChart.jsx`  | **年度盈餘圖**：視覺化展示年度累積盈餘與成長。                   |

---

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
- [CB_DATA_FLOW.md](./docs/CB_DATA_FLOW.md) - CB 爬蟲資料流架構

## 🔗 連結

- **線上版本**: [foreverbule2003.github.io/me](https://foreverbule2003.github.io/me/)
- **GitHub**: [foreverbule2003/me](https://github.com/foreverbule2003/me)

---

Made with 💜 by TimZ
