# Firebase 數據遷移說明

## 現況
已準備好 2 個 CB 的歷史數據 (總計 240 筆)：
- 15142: 115 筆
- 24673: 125 筆

## 遷移方式

由於 Firebase Admin SDK 需要服務帳戶金鑰，有以下兩種方式完成遷移：

### 方案 A：手動下載金鑰 (推薦)
1. 前往 [Firebase Console](https://console.firebase.google.com/project/my-landing-page-2ca68/settings/serviceaccounts/adminsdk)
2. 點擊「產生新的私密金鑰」
3. 下載後重新命名為 `serviceAccountKey.json`
4. 放在 `tools/` 資料夾
5. 執行 `node tools/migrate-to-firestore.js`

### 方案 B：使用前端工具直接上傳
已在 `cb-calculator.html` 整合 Firebase SDK，可以直接開啟頁面後執行 Console 指令上傳數據。

**步驟：**
1. 開啟 `http://localhost:5173/me/tools/cb-calculator.html`
2. 打開瀏覽器 DevTools (F12)
3. 在 Console 中貼上並執行：
```javascript
async function uploadLocalHistory() {
  const symbols = ['15142', '24673'];
  for (const symbol of symbols) {
    const res = await fetch(`/me/data/history/${symbol}.json`);
    const data = await res.json();
    await db.collection('cb_history').doc(symbol).set({
      symbol,
      lastUpdated: new Date().toISOString(),
      data
    });
    console.log(`✅ ${symbol} 上傳成功 (${data.length} 筆)`);
  }
}
uploadLocalHistory();
```

## 驗證方式
上傳完成後，可在 [Firestore Console](https://console.firebase.google.com/project/my-landing-page-2ca68/firestore/databases/-default-/data/~2Fcb_history) 檢視數據。
