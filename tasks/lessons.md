# 📝 教訓紀錄 (Lessons Learned)

> 每次使用者修正或發現錯誤後，記錄模式與防範規則。
> 定期回顧以降低重複錯誤率。

---

## 使用方式

1. **觸發時機**：當使用者修正了 AI 的分析、建議或執行方式時
2. **記錄格式**：按日期記錄「錯誤模式 → 修正規則 → 後續追蹤」
3. **回顧時機**：`/commit` 收尾步驟會提醒寫入；`/journal` 日報時回顧

---

## 紀錄模板

<!--
## YYYY-MM-DD

### 錯誤模式
- (描述發生了什麼)

### 修正規則
- (寫出防止相同錯誤的具體規則)

### 後續追蹤
- [ ] (驗證規則是否有效)
-->

---

## 2026-07-06

### 錯誤模式

- AI 準備「裸 commit」（只提交程式碼，未跑驗證、未同步 CHANGELOG 等文件），被使用者攔下。專案其實有設計好的 commit workflow（`.agent/workflows/commit.md`），但因工具世代交替（Antigravity → Claude Code）成為孤兒，AI 不知道它存在。
- 更深層的問題：`npm test` 與 `npm run guard` 長期紅燈（vitest 誤掃 Playwright、guard 規則過時），導致「紅燈=正常」的習慣，防線名存實亡。

### 修正規則

- **工具遷移時，workflow 資產要一起遷移**：指令、檢查清單、排程設定散落在舊工具目錄時，新工具讀不到=不存在。
- **紅燈零容忍**：測試或 guard 一旦紅燈常態化，防線就等於拆除。紅燈要嘛立即修、要嘛修規則，不可「習慣它」。
- **提交一律走 `/commit`**：清理 → guard/test 綠燈 → 文件同步 → 確認 → 分主題提交。

### 後續追蹤

- [x] vitest/guard 已修復回綠燈基準（2026-07-06）
- [x] 六個高價值指令已遷移至 `.claude/commands/`（2026-07-06）
- [ ] 觀察後續 commit 是否維持綠燈與文件同步紀律

---

## 2026-07-07

### 錯誤模式

- **雙版本殘留 + 測試假綠燈**：CB 計算核心歷史演進留下三份 `CbCalculatorCore`（`src/lib/cb-logic.mjs`、`src/lib/cb_logic.mjs`、`tools/components/CbCalculatorCore.mjs`）。`package.json` 的 `test:unit` 長期測的是**沒人使用**的 `cb_logic.mjs`，真正上線的 `cb-logic.mjs` 邏輯反而無測試把關——綠燈只是假安全感。
- **孤兒腳本壞損無人知**：`scripts/test-calculator-core.mjs` 的 import 指向不存在的根目錄 `components/`，壞了很久沒被發現，因為它沒接進任何 npm script 或 CI。

### 修正規則

- 重構抽出新模組時，**同一個 commit 必須刪除舊版**（或至少改名加 `.deprecated`），不可雙版本並存等日後清理。
- 改測試目標檔名時，同步檢查 `package.json` scripts 是否指向舊路徑。
- 新增驗證腳本時必須接進 npm script（如 `test:*`）或 guard 鏈，否則等於不存在；反向盤點：`scripts/` 內沒被 `package.json`、CI、文件引用的腳本，視為刪除候選。
- 判定「哪版是現行版」不能只看 git 日期，要以**實際引用處**（live app import 的 API 簽名）為準。

### 後續追蹤

- [ ] 下次重構抽模組時，確認 commit diff 內同時包含舊版刪除
- [x] 掃描自動化為 `tools/guard/check-orphan-scripts.mjs`，接進 `npm run guard`（2026-09-16）。首跑抓到三支：`test-calculator-core.mjs` 接上 `npm run test:calc`，`test-placeholder.js`（vitest 上線後就該退場）與 `verify-chart-fix.js`（目標檔已不存在）刪除，`seed-data.js` 列為手動工具

---

## 2026-08-29

### 錯誤模式

- 產架構圖時「先把節點擺好看，再交給驗證器」，結果連續四輪 fail。archify 的 showcase profile 有兩條互相拉扯的硬約束，事前沒算就一定撞牆：
  1. **可讀性**：節點小字（9px）在 1440px 桌面投影後不得低於 6px，反推 viewBox 寬度上限約 1394。
  2. **containment**：整頁在 1440×900 不得垂直溢出。頁面非圖的部分（標題列 + 卡片）約占 300px，所以圖本身高度上限約 600px，反推 viewBox 高寬比必須壓到 0.43 以下。
- 另一組反覆踩的坑：關聯標籤預設落在線段中點，兩個節點間距若小於標籤寬度，必定壓到節點上。中文標籤特別寬（「push main 觸發 deploy.yml」約 130px），欄距開 70px 時每一條都紅。

### 修正規則

- **先算畫布，再擺節點**：目標是扁平寬版（本案定案 1340×570，4 欄 × 4 列）。先定 viewBox，再讓節點去適應，不要反過來。
- **欄距要大於最長標籤寬度**：中文標籤抓每字約 9px 估寬，欄距至少留 150px；不夠時優先縮短標籤用詞（語意保留），而不是刪標籤。
- **垂直方向的標籤一律預期要 `labelDy`**：上下相鄰節點的連線標籤預設會壓到上方節點，直接給偏移量比等驗證器報錯快。
- **善用驗證器的 `Suggested fix`**：archify 會直接給出 `labelAt` 座標或 `labelDy` 數值，照著填即可，不要自己重算。
- **文件裡寫的指令要實跑過再寫進 README**：本次 README 的重生指令是實測 exit 0 後才落筆。

### 後續追蹤

- [ ] 下次改架構時，驗證 `sources` 參照是否隨程式碼漂移（規格檔釘在 commit `5c871f6`，檔案搬家會讓 evidence 驗證失敗）

---

## 2026-09-06

### 錯誤模式

- 新增 2024-kyoto 旅程時，`spec.md` 的交通章節印出 `(undefined ➔ undefined)`。查下去發現不是新旅程填錯，而是 **模板欄位與消費端腳本的契約沒對齊**：
  - `scripts/sync-travel-spec.mjs` 讀 `route.origin` / `route.destination`，但 `src/pages/trips/template/data.template.js` 的 `recommendedRoutes` 範例根本沒列這兩欄。照模板填，必壞。
  - 更隱蔽的是多方案路線：腳本對 `steps` 有 `route.steps || route.options[0].steps` 的 fallback，卻獨漏 origin/destination，所以 options 架構的路線就算填了也讀不到。
  - 同一支腳本還有第二處：`act.transport.station` 缺值時直接內插，產出 `🚕 機場接送(undefined)`。
- 2026-tokyo 的 spec.md 帶著這三個 `undefined` 存活了好幾個月沒被發現——**因為壞掉的方式是「產生出看起來正常的檔案」，不是拋錯**。

### 修正規則

- **模板即契約**：`data.template.js` 是消費端腳本的介面文件。腳本新讀一個欄位，模板就要同步列出並標 ★，否則照模板填的人一定漏。
- **樣板化的資料結構要成組 fallback**：既然 `options` 是 `steps` 的替代來源，那 origin/destination/duration 等同層欄位就要一起做 fallback，不能只補一個。
- **字串內插一律防 undefined**：產生文件的腳本，任何 `${obj.maybeMissing}` 都要嘛給預設值、要嘛整段省略。寧可少一行，不要印 `undefined`。
- **改完腳本要回頭重生所有既有產物**：本次修完 sync 腳本後重跑 2026-tokyo 與 2024-kyoto，才把陳年的 undefined 清掉。只修腳本不重生，等於沒修。
- **驗收用 grep 而非肉眼**：`grep -c "undefined" trips/*/spec.md` 是這類問題最省力的回歸測試。

### 後續追蹤

- [x] `sync-travel-spec.mjs` 補 options fallback 與 undefined 防護（2026-09-06）
- [x] `data.template.js` 補上 origin/destination/type 欄位說明（2026-09-06）
- [x] 2026-tokyo Day 5 三個方案補齊起訖點，兩份 spec.md 重生後 undefined 歸零（2026-09-06）
- [x] 2026-okinawa 也踩到同一個坑（Day 2 路線缺起訖點），補齊後重生，三份 spec 全數歸零（2026-09-06）
- [ ] `src/pages/trips/ise-shima/data.js` 缺 `flightData`/`accommodationData` 等匯出，`sync-travel-spec.mjs` 對它跑不起來；其 spec.md 目前是手工維護，待評估是否納入自動同步

---

## 2026-09-06 (2)

### 錯誤模式

- 開工前沒 `git fetch`，直接跑 `npm run new-trip` 建立 2024-kyoto，事後 push 才發現本地與遠端分歧（`ahead 5, behind 1`），rebase 在 `docs/SITEMAP.md`、`src/views/TripsView.jsx`、`vite.config.js` 三處衝突。
- 落後不是今天才發生的：遠端的 `515f3d3`（2026-okinawa）是 **07/07** 推上去的，本地 08/29 那批 archify commit 就已經在分歧狀態下堆疊，今天只是把 ahead 從 3 推到 5。
- 三個衝突點全部是 `tools/new-trip.js` 自動註冊的位置（`menuItems`、`rollupOptions.input`、SITEMAP 樹狀）。也就是說：**衝突不是內容分歧，而是「兩邊各自往同一個錨點插了一行」**。先 pull 的話，new-trip 會直接把京都插進已含沖繩的清單，一次衝突都不會有。

### 修正規則

- **會動到全域註冊點的操作，開工前先 `git fetch` 確認 `behind` 為 0**：scaffold（`npm run new-trip`）、新增路由 / Vite 入口 / 首頁選單 / SITEMAP 條目都算。這類操作的衝突是「插入位置衝突」，先同步就能完全避免，事後再解等於白做工。
- **不要只信 session 起始的 git status**：那是本地快照，`clean` 只代表工作區乾淨，不代表與遠端同步。`git status -sb` 才會顯示 ahead/behind，且需要先 fetch 才準。
- **多裝置專案把 fetch 當成開工儀式**：本 repo 有兩個作者身分（`tim` / `TimZ`）在推，分歧是常態而非意外。
- **解「各加各的」型衝突時，順手對齊既有排序慣例**：本次 `menuItems` 依「年份新→舊」把 2024 京都移到清單最後，而不是留在 new-trip 預設插入的最前面。

### 後續追蹤

- [x] rebase 完成，三處衝突兩邊內容全保留，guard/test/build 綠燈（2026-09-06）
- [ ] `input.txt`（new-trip 的互動輸入）與根目錄 `wrapper.js`（stub readline 的非互動執行器）在 `515f3d3` 隨旅程一起進了版控，應評估加入 `.gitignore` 或移入 `tools/`
- [x] 讓 `npm run new-trip` 在執行前自動 `git fetch`，`behind > 0` 時**中止**（不只是警告）並提示 `git pull --rebase`；離線不擋，`SKIP_SYNC_CHECK=1` 可略過（2026-09-06，見 2.7.2）

---

## 2026-09-06 (3)

### 錯誤模式

- **同一條規則、同一天、第二次踩**：上一則（`2026-09-06 (2)`）剛寫下「會動到全域註冊點的操作，開工前先 `git fetch`」，另一台機器的 session 在 18:57 建 2024-tokyo-disney 時仍未 fetch，撞出完全相同的四處衝突（`.gitignore`、`CHANGELOG.md`、`docs/SITEMAP.md`、`src/views/TripsView.jsx`）。**教訓寫進 lessons.md 不會自動傳到另一個 session** —— 檔案存在不等於被讀到。
- 撞得更兇的是 `CHANGELOG.md`：兩邊各自開了 `[2.7.0]`，且兩邊都寫「本站第一個回顧型旅程頁面」。版本號與「首次」這類宣稱是全域唯一資源，分歧開工必然對撞。
- **重造了已存在的輪子**：`npm run new-trip` 的 readline 在非互動 stdin 下會吃掉全部行、只回應前兩題，於是另寫了一支 spawn + 延遲寫入的驅動腳本。但根目錄早就有 `wrapper.js`（stub 掉 `readline.createInterface` 再 require new-trip）與 `input.txt`，正是為此而生 —— 就列在上一則的後續追蹤裡，卻沒被讀到。
- **同類 bug 修了三處漏第四處**：`52a77f5` 修掉 `sync-travel-spec.mjs` 三處未防護的字串內插，購物段的 `${item.nameJp}` 漏網。既有三份 spec 剛好每筆商品都有日文名才沒觸發，本旅程有 5 筆無日文名的商品當場印出 `(undefined)`。

### 修正規則

- **開工儀式的落點要在工具裡，不能只在文件裡**：把 `git fetch` + `behind > 0` 警告做進 `npm run new-trip`（上一則已列為追蹤項，本次再度驗證其必要性）。靠人記得讀 lessons.md 已證明無效兩次。
- **`CHANGELOG.md` 版本號在 commit 前重新確認**：分歧開工時先 `git fetch` 再看 `origin/main` 的最新版本號，不要沿用本地看到的。
- **改共用腳本的字串內插時，把同檔案內所有 `${...}` 掃過一遍**：而不是只修觸發問題的那幾處。這類 bug 的壞法是「產出看起來正常的檔案」，不會拋錯，靠的是下一份資料剛好缺欄位才會現形。
- **寫任何一次性腳本前先看根目錄有什麼**：本 repo 的 `wrapper.js`、`input.txt` 沒有明顯命名，但確實是現成工具。

### 後續追蹤

- [x] rebase 完成，四處衝突兩邊內容全保留；CHANGELOG 改為 `[2.7.1]`，「第一個回顧型」的宣稱歸還 2024-kyoto（2026-09-06）
- [x] `sync-travel-spec.mjs` 購物段 `nameJp` 補上防護，2024-tokyo-disney 的 spec.md `undefined` 歸零（2026-09-06）
- [ ] `wrapper.js` / `input.txt` 建議改名並移入 `tools/`（例：`tools/new-trip-noninteractive.js`），或直接讓 `new-trip.js` 支援 `--from-file` 參數，避免下次又被重造
- [x] 檢查已落到 `tools/new-trip.js` 裡，不再依賴人記得讀文件；`CONTRIBUTING.md` 同步說明被擋下時的處理（2026-09-06）
- [ ] 其他會動到全域註冊點的操作（新增路由、新增 Vite 入口）目前仍無同類保護

---

## 2026-09-11

### 錯誤模式

- **文件描述的機制從未上線，卻沒人發現**：TRIP_STYLE_GUIDE §1.1 寫著 `master_guide.html` + `manifest.json` + `sw.js` 提供 PWA 離線小書，2026-07-06 的 P2-4 還修過「sw 快取目標不再 404」並標為完成。實際上 `trips/` 不在 `public/`，Vite 只輸出 `rollupOptions.input` 列出的 `index.html`，這三個檔案從來沒進過 `dist/`；也沒有任何頁面註冊旅程 sw。上次的修正只對齊了 repo 內的檔名，沒有打一次線上網址。
- **同一件事，文件與 Git 狀態互相矛盾**：文件寫 master_guide.html「不進 Git」，但 `2026-okinawa` 的那份被追蹤了；兩邊各自說得通，卻都沒讓它上線。
- **產生器寫死第一個旅程的內容**：`generate-travel-pdf.mjs` 的 `<title>`、封面標題與日期寫死「2026 東京 8日旅 / 6/17~6/24」，沖繩的小書也掛著東京封面。泛化腳本時只換了資料來源，沒掃模板裡的字面值。
- **多支 Service Worker 共用 Cache Storage 卻各自清全部**：根 sw 與旅程 sw 的 activate 都刪掉「名稱不等於自己」的所有快取，任一方更新就清掉對方的離線資料。單獨看每支 sw 都沒錯。

### 修正規則

- **宣稱「部署後可用」的機制，驗證要打線上 URL**：`curl -s -o /dev/null -w '%{http_code}'` 確認回 200 且不是 404 頁；本機 `npm run build` 後至少要 `ls dist/` 確認檔案在。repo 裡有檔案 ≠ 會被部署。
- **Vite 專案裡，放在 `public/` 以外、又不是 input 入口的靜態檔，一律不會進 `dist/`**：要嘛移進 `public/`，要嘛在 `vite.config.js` 用 plugin `emitFile`。新增這類檔案時先想好它怎麼到線上。
- **可由資料產生的產物，優先在 build 時產生，不要靠人記得重跑再 commit**：master_guide.html 改為 build 時由 data.js 產生（`trip-offline-book` plugin），從此不會過期，也不必進 Git。
- **Service Worker 的快取名稱要帶前綴，activate 只清自己前綴的舊版**；scope 要限縮到真正要接管的頁面，避免同目錄其他頁面被接管而卡在舊版。
- **把「單一旅程專用」的腳本泛化時，掃一遍模板內所有字面值**（標題、日期、地名、天數），不只換掉資料 import。

### 後續追蹤

- [x] 三檔隨 build 輸出、sw 由 master_guide.html 註冊（scope `./master_guide.html`）、快取前綴隔離、Network First；本機 preview 斷網實測可開（2026-09-11，見 2.7.3 / `3aa2c34`）
- [x] push 部署後 curl 確認線上路徑（2026-09-16，`09b9c7e` 部署後實測 `master_guide.html`、`sw.js`、`manifest.json` 與 2026-tokyo 的小書共四個路徑皆回 200）
- [ ] 2024-kyoto、2024-tokyo-disney、2026-tokyo 的小書仍有 `undefined`，build 會警告（已另開任務處理）。2026-09-16 補上 `baggage`/`note` 的缺值過濾後降為 14／6／12，減少的是航班卡那兩行；剩下的是各旅程 `data.js` 自己缺值，`check-trip-schema.mjs` 不會報
- [ ] 2026-tokyo 小書內嵌圖片達 11MB，sw 安裝時整份預先快取；評估是否改為外連圖片或壓縮

---

## 2026-09-16

### 錯誤模式

- **產出檔印 `undefined` 的第三次，其中「模板漏列欄位」佔兩次**：
  - `origin` / `destination`（2.7.0，路線段）— **模板漏列**
  - `nameJp`（2.7.1，購物段）— 腳本字串內插未防護，模板其實有列
  - `baggage`（2.7.5，航班段）— **模板漏列**
- 模板漏列那兩次的形狀完全一樣：**`data.js` 先長出欄位、模板事後才追**。寫某趟旅程時為了呈現需要直接在 `data.js` 加欄位，產生腳本也跟著讀，唯獨模板沒人回頭補——下一趟照模板建的旅程就缺這個欄位。
- 三次都是**靠肉眼在產出物裡發現**的，而且每次都是「剛好這趟的資料缺那個欄位」才現形。前兩次留下的修正規則（「字串內插一律防 undefined」「改共用腳本時把同檔所有 `${...}` 掃一遍」）管的都是**腳本端**，沒有人管**模板端**，所以擋不住 `baggage` 這次。
- 另外，最近一趟（2026-okinawa）改完 `data.js` 只重生了 `spec.md` 與 `master_guide.html`，模板欄位、`trip_notes.md` 慣例、`CHANGELOG` 全都沒回寫——**「重生產出物」被誤當成「回寫完成」**。

### 修正規則

- **欄位契約的一致性交給 guard，不靠人記得**：新增 `tools/guard/check-trip-schema.mjs`，比對各旅程 `data.js` 實際用到的欄位與模板列出的欄位，某欄位在 2 個以上旅程出現而模板沒有就紅燈，已接進 `npm run guard`。判準與侷限見 `docs/REFACTOR_GUARD.md` §4。
- **這是 2026-09-06 那條「開工儀式的落點要在工具裡，不能只在文件裡」的同一種解法**：`new-trip` 的 `git fetch` 檢查擋的是分歧開工，這支擋的是模板漏欄位。凡是「靠人記得回頭補某個檔」的規則，寫進文件都會失效，要嘛做進工具、要嘛承認它會漏。
- **改 `data.js` 後的回寫清單有四項，不是一項**：① 重生 `spec.md` ② 重生 `master_guide.html` ③ 新欄位補進 `data.template.js` ④ 新慣例補進 `TRIP_STYLE_GUIDE.md` / `CHANGELOG.md`。前兩項是產出物、後兩項是契約與文件，只做前兩項等於沒回寫。

### 後續追蹤

- [x] `check-trip-schema.mjs` 實作完成並接進 `npm run guard`（2026-09-16）
- [x] 該 guard 首跑抓出 15 筆缺漏，收斂後確認 3 筆為真缺口（`foodData` 的 `recommended`、`shoppingData.wishlist` 的 `category` / `shop`），已補進模板（2026-09-16）
- [x] 模板的 `wishlist` 原本只是空陣列、沒有元素欄位示範，已補上註解示範——`ShoppingSection` 實際渲染的是 `wishlist` 而非 `categories`（2.7.1 曾因文件寫反而踩過）（2026-09-16）
- [ ] 上一則（2026-09-11）列的三份小書 `undefined`，本次補完 `baggage`/`note` 過濾後為 2024-kyoto 14 處、2024-tokyo-disney 6 處、2026-tokyo 12 處。剩下的是各旅程 `data.js` 自己缺值，不是模板漏列，本 guard 不會報——build 時的警告仍是唯一提示
- [ ] guard 目前不分辨巢狀層級（鍵名在該 export 任一層出現過就放行），`recommendedRoutes[].duration` 這類「鍵名有、掛錯層」的缺漏抓不到；待觀察是否值得加深
- [ ] `src/pages/trips/ise-shima/data.js` 缺 `flightData` 等匯出，guard 對它只能部分比對（沿用 2026-09-06 的待辦）

---

## 2026-09-16 (2)

### 錯誤模式

- **第三次分歧開工，這次連第二台機器都不需要**：今天開工時本地 `main` 落後遠端 3 個 commit，`/deploy` 才撞上，`CHANGELOG.md`、`tasks/lessons.md`、`generate-travel-pdf.mjs`、`TRIP_STYLE_GUIDE.md`、`master_guide.html` 五處衝突，版本號 `2.7.3` 更是兩邊各開一個。
- 查出來的成因不是「另一台電腦」：`git worktree list` 顯示 `.claude/worktrees/nervous-lehmann-19fc35` 的 HEAD 正好停在遠端最新的 `8665df4`。也就是 **2026-09-11 下午的離線小書那批工作是在同一台電腦的 git worktree 裡做的，push 之後主工作目錄的 `main` 不會跟著前進**，就這樣停在 `3bf37b1` 靜默落後五天。`git reflog main` 佐證：09-11 14:55 之後到 09-16 13:15 之間完全沒有動作。
- **既有防線涵蓋不到這個形狀**：2026-09-06 立的檢查做在 `npm run new-trip` 裡，前提是「建立新旅程」這個動作。今天這輪根本沒建新旅程，只是改文件和腳本，檢查一次都沒跑到。
- 前兩次的教訓寫的成因是「兩台機器、兩個作者身分（tim / TimZ）」，所以判斷落後風險時會下意識問「我最近有用另一台嗎」——答案是沒有，於是不覺得需要 fetch。**成因描述寫得太具體，反而讓人排除了其他路徑。**

### 修正規則

- **檢查要綁在「開工」這個時間點，不是綁在某一支指令上**：新增 `tools/guard/check-remote-sync.mjs`，接成 `npm run sync-check`，並掛上 Claude Code 的 SessionStart hook，每次開 session 自動跑。`new-trip` 改為呼叫同一支（`--strict` 落後即中止），同一個檢查不留兩份實作。
- **落後時的提示要一併列出本 repo 的其他 worktree**：這次若一開始就看到那行，不必查 reflog 也能立刻知道 commit 是從哪裡來的。
- **寫教訓時，成因要分「這次的路徑」與「這類的條件」**：這類的條件是「本地 HEAD 不等於遠端」，與幾台機器、幾個帳號無關。只寫路徑，下次換個路徑就認不出來。
- **`.claude/worktrees/` 底下用完的 worktree 要清掉**：留著它既是落後的來源，也讓 `git clean -ndX` 之類的盤點多一個要繞過的東西。

### 後續追蹤

- [x] `check-remote-sync.mjs` 實作完成，非 strict / strict 兩種模式都以模擬落後狀態實測（2026-09-16）
- [x] `new-trip` 改為呼叫共用模組，原本那份 55 行的重複實作移除（2026-09-16）
- [x] `npm run sync-check`、SessionStart hook、`/deploy` 前置檢查、README／CONTRIBUTING 同步（2026-09-16）
- [ ] SessionStart hook 只能在下次開 session 時才驗證得到，本 session 無法自測——下次開工時確認它確實有跑
- [ ] `.claude/worktrees/nervous-lehmann-19fc35` 已無用途（HEAD 停在已合併的 `8665df4`），待 `git worktree remove` 清掉
