/**
 * @name thefew-extract
 * @description 在已登入的 https://thefew.tw/cb 頁面執行，解析可轉債列表
 *
 * 由每週排程任務透過 Claude in Chrome 的 javascript_tool 貼上執行：
 * 1. 執行本檔內容 → 回傳筆數，結果存在 window.__few
 * 2. 分段取出：window.__few.slice(i, i + 35).join(";")（工具回傳上限約 1000 字）
 * 3. 把各段以 ";" 串起來存成文字檔，交給 tools/sync-thefew-cb.js
 *
 * 每筆格式：代號,轉換價,CB收盤價,股票收盤價
 */
(() => {
  const lines = document.body.innerText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const out = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const m = lines[i].match(/^(\d{4,6})\s/);
    if (!m) continue;
    // 欄位：CB收盤價, 轉換價值, 轉換溢價率, 股票收盤價, 轉換價, 已轉換(%), 到期日
    const f = lines[i + 1].split("\t");
    if (f.length < 6) continue;
    const cb = parseFloat(f[0]);
    const sp = parseFloat(f[3]);
    const cp = parseFloat(f[4]);
    if (cp > 0) out.push([m[1], cp, cb || "", sp || ""].join(","));
  }
  window.__few = out;
  return out.length;
})();
