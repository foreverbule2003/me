---
description: 重新啟動開發伺服器 (Stop -> Run)
---

# Restart Server Workflow

> 先關閉所有開發伺服器，再重新啟動 (Stop & Run)。

## 1. 停止伺服器

嘗試關閉現有的 Vite 伺服器進程。

// turbo

```bash
pkill -f vite || true
```

## 2. 啟動伺服器

啟動新的開發伺服器。

// turbo

```bash
npm run dev
```
