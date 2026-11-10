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
 *   --final     當天最後一次排程：還抓不到今天的檔就以失敗結束（發 Telegram）
 *
 * 櫃買當日檔約 17:20 才出；抓到的不是今天的資料就不寫入，
 * 免得前一天的資料被存成今天的快照。
 */
(async () => {
  const isCloud = process.argv.includes("--cloud");
  const isSnapshot = process.argv.includes("--snapshot");

  try {
    const result = await fetchHotCB();
    const output = result.data ? result : { source: "tpex", data: result };

    // Print to console
    console.log(JSON.stringify(output, null, 2));

    const today = taipeiTodayStr();
    if (output.dataDate && output.dataDate !== today) {
      const msg = `櫃買今天 (${today}) 的檔還沒出，最新是 ${output.dataDate}，不寫入。`;
      if (process.argv.includes("--final")) {
        console.error(`❌ [HotCB] ${msg}（當天最後一次排程，遇到休市日也會出現）`);
        process.exitCode = 1;
      } else {
        console.log(`⏭️  [HotCB] ${msg}`);
      }
      return;
    }

    // Optional: Save to cloud
    if (isCloud) {
      await saveSnapshotToCloud(output);
    }

    // Update Cloud Metadata (Master Index)
    if (isCloud || process.argv.includes("--save")) {
      console.log(`\n☁️  Updating Master Metadata in Firestore...`);
      await updateMasterMetadata(output.data);
    }

    // Optional: Local Snapshot
    if (isSnapshot) {
      const outFile = path.join(
        __dirname,
        "../public/data/history",
        `${today}.json`,
      );
      const snapshot = {
        date: today,
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
