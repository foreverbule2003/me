import React from "react";
import { useMarketPulse } from "../hooks/useMarketPulse";
import { useWatchlist } from "../hooks/useWatchlist";
import { isMockMode, useMockWatchlist } from "../mock";
import Watchlist from "../components/Watchlist";
import ThemeToggle from "../../../../components/ThemeToggle";
import WatchlistDraft, { Mark } from "./WatchlistDraft";

// 比較頁（只在 dev server）：左邊現行版、右邊草稿。兩邊都不寫入資料
const MOCK = isMockMode();
const DEV_USER = { uid: "dev", photoURL: "" };

const readOnly = () => alert("比較頁不寫入資料");

// 點說明 → 捲到草稿裡同編號的標記，再閃一下
const jumpTo = (n) => {
  const mark = document.querySelector(`.draft-col [data-mark="${n}"]`);
  const target = mark?.parentElement;
  if (!target) return;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - 32,
    behavior: "smooth",
  });
  target.classList.remove("is-located");
  void target.offsetWidth; // 重新觸發動畫
  target.classList.add("is-located");
  setTimeout(() => target.classList.remove("is-located"), 2000);
};

const CHANGES = [
  ["1", "搜尋／新增移到工具列", "拿掉左側欄，卡片吃滿寬；分類下拉只在查無代號、要新增時才出現"],
  ["2", "狀態磚改成溢價率分段", "折價／接近平價幾乎都是 0，改成 < 20%、20–50%、> 50%，門檻可調；群組內依溢價率由低到高排"],
  ["3", "卡片色帶", "左側色帶依溢價率分段上色，掃一眼就知道哪幾檔比較便宜"],
];

const Compare = () => {
  const { data: marketData, updatedAt } = useMarketPulse();
  const real = useWatchlist(MOCK ? null : DEV_USER);
  const mock = useMockWatchlist();
  const { watchlist } = MOCK ? mock : real;

  return (
    <div className="vento draft-page min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-black">我的追蹤：現行 vs 草稿</h1>
        <ThemeToggle />
      </header>

      {/* 說明固定在畫面下方，不佔版面，左右兩欄從同一高度開始對照 */}
      <ol className="draft-legend premium-card rounded-2xl p-4">
        {CHANGES.map(([n, title, desc]) => (
          <li key={n}>
            <button
              type="button"
              onClick={() => jumpTo(n)}
              title="跳到草稿裡的這項改動"
              className="draft-legend-item flex gap-3 text-xs text-left w-full rounded-xl p-2 -m-2"
            >
              <Mark n={n} />
              <div>
                <div className="font-semibold text-slate-700">{title}</div>
                <div className="text-slate-500 mt-0.5">{desc}</div>
              </div>
            </button>
          </li>
        ))}
      </ol>

      <div className="draft-compare">
        <section className="min-w-0">
          <h2 className="draft-col-title">現行版</h2>
          <Watchlist
            items={watchlist}
            marketData={marketData}
            marketUpdatedAt={updatedAt}
            onAdd={readOnly}
            onMove={readOnly}
            onRenameCategory={readOnly}
            onRemove={readOnly}
            onSelectCode={() => {}}
          />
        </section>

        <section className="min-w-0 draft-col">
          <h2 className="draft-col-title">草稿</h2>
          <WatchlistDraft
            items={watchlist}
            marketData={marketData}
            marketUpdatedAt={updatedAt}
          />
        </section>
      </div>
    </div>
  );
};

export default Compare;
