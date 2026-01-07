---
description: 執行 Lighthouse 效能稽核
---
# 執行 Lighthouse 稽核

此工作流程檢查專案的效能、無障礙性 (Accessibility) 與 SEO。

1.  建構專案以確保產出正式環境資產
    ```bash
    npm run build
    ```

2.  啟動預覽伺服器 (在背景或獨立終端機)
    ```bash
    npm run preview
    ```

3.  **手動步驟**：在 Chrome 中打開預覽網址 (通常是 `http://localhost:4173`)。
4.  **手動步驟**：打開開發者工具 (F12) -> Lighthouse 分頁 -> 點擊 "Analyze page load"。
