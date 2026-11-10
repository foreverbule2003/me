const fs = require("fs");
const path = require("path");
const { fetchHotCB, taipeiTodayStr } = require("../src/utils/cb-fetcher");
const {
  saveSnapshotToCloud,
  updateMasterMetadata,
} = require("../src/utils/hot-cb-cloud");

/**
 * @name fetch-hot-cb
 * @description 擷取市場熱門可轉債清單 (Market Pulse)
 * @source 櫃買中心每日可轉債行情表 CSV
 * @scope 市場成交量前 50-100 名標的
 * @target terminal console & (optional) Firestore Snapshot
 *
 * 支援:
 *   --cloud     同步至 Firestore
 *   --snapshot  存為本地歷史 JSON (public/data/history/YYYY-MM-DD.json)
 *   --final     當天最後一次排程：還抓不到這一輪的檔就以失敗結束（發 Telegram）
 *
 * 快照 ID 用資料交易日 (dataDate)，同一天已有快照就跳過，所以抓到的是哪一天都直接寫：
 * 前一天的檔不會被存成今天，排程延遲到過午夜也不會漏寫前一天（2026-11-10 起）。
 */
// 台北時間中午前都算前一個交易日的這一輪：櫃買當日檔約 17:20 出，
// GitHub 排程常延遲數小時，22:30 的排程可能拖到隔天凌晨才跑。
const ROUND_OFFSET_HOURS = 12;

(async () => {
  const isCloud = process.argv.includes("--cloud");
  const isSnapshot = process.argv.includes("--snapshot");

  try {
    const result = await fetchHotCB();
    const output = result.data ? result : { source: "tpex", data: result };

    // Print to console
    console.log(JSON.stringify(output, null, 2));

    let written = false;
    if (isCloud) {
      // Firebase 初始化失敗時回傳 null
      written = Boolean((await saveSnapshotToCloud(output))?.written);
    }

    // Update Cloud Metadata (Master Index)：只在寫入新快照時更新，省寫入次數
    if ((isCloud && written) || process.argv.includes("--save")) {
      console.log(`\n☁️  Updating Master Metadata in Firestore...`);
      await updateMasterMetadata(output.data);
    }

    const roundDate = taipeiTodayStr(
      new Date(Date.now() - ROUND_OFFSET_HOURS * 3600 * 1000),
    );
    if (output.dataDate < roundDate) {
      const msg = `櫃買 ${roundDate} 的檔還沒出，最新是 ${output.dataDate}。`;
      if (process.argv.includes("--final")) {
        console.error(`❌ [HotCB] ${msg}（當天最後一次排程，遇到休市日也會出現）`);
        process.exitCode = 1;
      } else {
        console.log(`⏭️  [HotCB] ${msg}`);
      }
    }

    // Optional: Local Snapshot
    if (isSnapshot) {
      const outFile = path.join(
        __dirname,
        "../public/data/history",
        `${output.dataDate}.json`,
      );
      const snapshot = {
        date: output.dataDate,
        timestamp: Math.floor(Date.now() / 1000),
        version: "2.0",
        source: output.source,
        count: output.data.length,
        data: output.data,
      };
      fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), "utf8");
      console.log(`\n✅ Snapshot saved to ${outFile}`);
    }
  } catch (error) {
    // 抓熱門榜失敗也算錯誤：以非 0 結束，讓 GitHub Actions 失敗並發 Telegram 通知
    console.error(`❌ [HotCB] ${error.message}`);
    process.exitCode = 1;

    // 不把假資料寫上雲端：快照一天只寫一次，假資料佔位會擋掉當天的真資料
  }
})();
