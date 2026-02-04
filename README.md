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
├── tools/                  # 工具頁面與後端橋接器
│   ├── components/         # 前端共用 Service (JS/MJS)
63: │   ├── lib/                # Python DDE 模組化層
64: │   │   ├── xq_dde.py       # 通訊協定封裝
65: │   │   └── cb_service.py   # 業務邏輯封裝
66: │   ├── xq_bridge.py        # (Legacy) 舊版 DDE 入口
67: │   └── fetch-hot-cb-dde.py # 🔥 核心 DDE 行情同步腳本
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
| `npm run sync-cb`  | 執行 CB 資料自動化同步預覽    |
| `npm run format`   | 格式化所有程式碼              |

## 🔄 Data Sync (Hybrid DDE)

我們採用 **Hybrid DDE 架構** 來解決爬蟲被封鎖的問題。
資料源自您的本地電腦 (XQ 全球贏家)，透過 Python 橋接腳本同步至雲端。

### 前置需求
1.  **Windows OS**
2.  **XQ 全球贏家 (個人版/企業版)** 需安裝並登入。
3.  **Python 3.8+** 並安裝依賴 (需 `pywin32`):
    ```bash
    pip install -r requirements.txt
    ```

### 執行同步
確保 XQ 軟體已開啟，然後執行：

```bash
npm run sync:dde
```

這將會：
1.  讀取 db 中的追蹤清單。
2.  請求 XQ DDE 取得報價。
3.  更新 Firestore 快署。

### 🔄 Data Sync (History) - 手動補齊 K 線
若雲端自動排程失敗或過慢，可在本地執行全量歷史補齊：

```bash
npm run fetch:history:full
```

這將會：
1.  讀取雲端/本地追蹤清單。
2.  針對每一檔 CB，智慧判斷需補齊的月份。
3.  爬取櫃買中心資料並同步至 Firestore (需 `serviceAccountKey.json`)。

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
