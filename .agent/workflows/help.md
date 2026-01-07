---
description: 專案小助手：分診或呼叫專家
---
# Help Workflow (Me)

> 統一入口：分診 + 直接呼叫專家

## 🎯 使用方式

### 方式一：自動分診
```
/help 我該先做哪個功能？
/help 這個按鈕的樣式怎麼改？
```

### 方式二：直接呼叫專家
| 指令                  | 說明                                |
| --------------------- | ----------------------------------- |
| `/help pm [問題]`     | 呼叫 **網站 PM** (Backlog/Release)  |
| `/help tech [問題]`   | 呼叫 **技術長** (Architecture/Code) |
| `/help design [問題]` | 呼叫 **設計師** (UI/UX)             |

## 🔍 分診邏輯

請使用 `.agent/prompts/receptionist-prompt.md` 進行判斷。
