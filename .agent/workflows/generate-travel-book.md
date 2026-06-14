---
description: 從 data.js 動態產生離線旅遊小書 PDF 與 Spec 規格
---

# Generate Travel Book Workflow

這是一個通用的旅遊小書產生工作流程，幫助你將網頁版行程（定義在 `data.js` 中）自動轉換為可以離線閱讀的高質感 PDF 檔案，並確保對應的 `spec.md` 規格書保持同步。

## 使用時機

當專案中有任何旅遊行程（如 `trips/2026-tokyo`、`trips/2025-kyoto`）更新了 `data.js`，且使用者想要輸出最新的「離線小書 PDF」或是「更新規格書」時。

## 執行步驟

### 1. 取得目標行程代號

確認目標行程目錄名稱，例如 `2026-tokyo`。預設為 `2026-tokyo`。

### 2. 執行同步腳本 (Auto-Sync Spec)

自動從 `data.js` 萃取並產生對應的 `spec.md`：

```bash
node scripts/sync-travel-spec.mjs <trip_id>
```

### 3. 產生高保真 HTML

執行泛用的 PDF 產生腳本，將資料轉換為排版完美的 HTML：

```bash
node scripts/generate-travel-pdf.mjs <trip_id>
```

腳本執行成功後，會在 `trips/<trip_id>/master_guide.html` 產生檔案。

### 4. 轉換為 PDF (Chrome Headless)

使用 Chrome Headless 模式，將產生的 HTML 轉換為 PDF。請務必指定輸出檔名為 `<trip_id>_Ultimate_Guide.pdf`：

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --no-pdf-header-footer --print-to-pdf="trips/<trip_id>/<trip_id>_Ultimate_Guide.pdf" "file://$(pwd)/trips/<trip_id>/master_guide.html"
```

### 5. 清理暫存檔並回報

- 將轉換過程產生的 `master_guide.html` 暫存檔刪除。
- 利用 `view_file` 或直接回報給使用者，提供剛產生的 PDF 連結（如 `[2026_Tokyo_Ultimate_Guide.pdf](file:///...)`）讓使用者檢視。
