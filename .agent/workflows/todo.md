---
description: 快速管理待辦事項 (TODO)
---

# TODO Workflow

> 管理專案待辦事項與掃描程式碼標記。
> 📝 **寫作規範**：詳見 [docs/TODO_SPEC.md](../../docs/TODO_SPEC.md)

## 🎯 使用方式

| 指令               | 說明                      |
| :----------------- | :------------------------ |
| `/todo`            | 顯示 `TODO.md` 內容       |
| `/todo add [事項]` | 新增待辦事項到 `TODO.md`  |
| `/todo scan`       | 掃描程式碼中的 TODO/FIXME |

## 1. 顯示待辦事項

// turbo

```bash
cat TODO.md
```

## 2. 新增待辦事項 (手動)

若指令包含 `add`，請使用 `fs` 工具將新事項寫入 `TODO.md`。

## 3. 歸檔已完成項目 (自動檢查)

每次檢視或新增待辦事項時，請順手檢查：

- 將標記為 `[x]` 的已完成項目移動到 `TODO.md` 底部的 `## 🏁 已完成歸檔 (Archived)` 區塊。
- 加上歸檔日期，例如：`- [x] 事項 (Completed: YYYY-MM-DD)`。

## 4. 掃描程式碼標記

若指令指令包含 `scan`：

// turbo

```bash
grep -r "TODO" src --include="*.jsx" --include="*.js"
grep -r "FIXME" src --include="*.jsx" --include="*.js"
```
