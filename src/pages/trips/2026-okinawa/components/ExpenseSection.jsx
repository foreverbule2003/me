/**
 * ExpenseSection — 實際花費總覽
 * 顯示 expenseData 的雙幣（JPY + TWD）實際記帳明細
 */
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ReceiptText,
  UtensilsCrossed,
  Train,
  Hotel,
  ShoppingBag,
  Sparkles,
  Gift,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";
import { SectionCard } from "../../../../components/trips";

// ──────────────────────────────────────────────
// 設定
// ──────────────────────────────────────────────

const CATEGORY_CFG = {
  飲食: { color: "#E86B50", icon: UtensilsCrossed },
  交通: { color: "#4A6B7C", icon: Train },
  住宿: { color: "#5F7A61", icon: Hotel },
  購物: { color: "#8B5A8C", icon: ShoppingBag },
  娛樂: { color: "#E0B050", icon: Sparkles },
  伴手禮: { color: "#C17767", icon: Gift },
  其他: { color: "#B0B0B0", icon: MoreHorizontal },
};

const CATEGORIES = Object.keys(CATEGORY_CFG);

// ──────────────────────────────────────────────
// 輔助：圓餅圖
// ──────────────────────────────────────────────
const DonutChart = ({ breakdown, total }) => {
  const entries = CATEGORIES.map((cat) => ({
    cat,
    value: breakdown[cat] ?? 0,
    color: CATEGORY_CFG[cat].color,
  }))
    .filter((e) => e.value > 0)
    .sort((a, b) => b.value - a.value);

  let current = 0;
  const gradient = entries
    .map(({ value, color }) => {
      const pct = (value / total) * 100;
      const seg = `${color} ${current}% ${current + pct}%`;
      current += pct;
      return seg;
    })
    .join(", ");

  return (
    <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 py-2">
      {/* 圓環 */}
      <div
        className="w-32 h-32 shrink-0 rounded-full shadow-sm"
        style={{
          background: `conic-gradient(${gradient})`,
          WebkitMaskImage:
            "radial-gradient(circle, transparent 52%, black 53%)",
          maskImage: "radial-gradient(circle, transparent 52%, black 53%)",
        }}
      />
      {/* 圖例（僅分類與圖示） */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-auto">
        {entries.map(({ cat, color }) => {
          const Icon = CATEGORY_CFG[cat].icon;
          return (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <Icon size={12} style={{ color }} className="shrink-0" />
              <span className="text-xs font-bold text-gray-600">{cat}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// 依分類可折疊卡片
// ──────────────────────────────────────────────
const CategoryExpenseCard = ({
  category,
  items,
  jpyTotal,
  twdTotal,
  rate,
  forceOpen,
}) => {
  const [open, setOpen] = useState(false);
  const cfg = CATEGORY_CFG[category] ?? CATEGORY_CFG["其他"];
  const Icon = cfg.icon;

  useEffect(() => {
    if (forceOpen !== null) setOpen(forceOpen);
  }, [forceOpen]);

  const jpyItems = items.filter((i) => i.currency === "JPY");
  const twdItems = items.filter((i) => i.currency === "TWD");

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl overflow-hidden shadow-sm">
      {/* 標頭 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left gap-3 hover:bg-white/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: cfg.color + "20" }}
          >
            <Icon size={16} style={{ color: cfg.color }} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{category}</p>
            <p className="text-[11px] text-gray-400">{items.length} 筆記錄</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {(jpyTotal > 0 || twdTotal > 0) && (
            <span
              className="text-base font-black tabular-nums"
              style={{ color: cfg.color }}
            >
              NT${(Math.round(jpyTotal * rate) + twdTotal).toLocaleString()}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* 折疊明細 */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 space-y-1.5 border-t border-gray-100/60">
            {/* JPY */}
            {jpyItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 py-2 border-b border-gray-100/80 last:border-0"
              >
                {/* 日期 */}
                <span
                  className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: cfg.color + "99" }}
                >
                  {item._date}
                </span>
                <span className="text-xs text-gray-400 tabular-nums w-10 shrink-0 pt-0.5">
                  {item.time}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 leading-tight">
                    {item.shop}
                  </p>
                  {item.note && (
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {item.note}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-700 tabular-nums shrink-0">
                  ¥{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
            {/* TWD */}
            {twdItems.map((item, i) => (
              <div
                key={`twd-${i}`}
                className="flex items-start gap-2 py-2 border-b border-gray-100/80 last:border-0"
              >
                <span
                  className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: cfg.color + "99" }}
                >
                  {item._date}
                </span>
                <span className="text-xs text-gray-400 tabular-nums w-10 shrink-0 pt-0.5">
                  {item.time}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 leading-tight">
                    {item.shop}
                  </p>
                  {item.note && (
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {item.note}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-[#4A6B7C] tabular-nums shrink-0">
                  NT${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// 主元件
// ──────────────────────────────────────────────
const ExpenseSection = ({ data, rate = 0.2, forceOpen = null }) => {
  if (!data) return null;

  const { days, grandTotal } = data;
  const gt = grandTotal ?? {};
  const jpyGrand = gt.JPY ?? {};
  const twdGrand = gt.TWD ?? {};

  // 總圓餅圖（JPY 分類）
  const jpyBreakdown = jpyGrand.breakdown ?? {};

  // ── 統一貨幣（台幣） ──
  const unifiedTWD =
    Math.round((jpyGrand.total ?? 0) * rate) + (twdGrand.total ?? 0);

  const unifiedBreakdown = {};
  CATEGORIES.forEach((cat) => {
    const jpyAmt = jpyBreakdown[cat] ?? 0;
    const twdAmt = twdGrand.breakdown?.[cat] ?? 0;
    if (jpyAmt > 0 || twdAmt > 0) {
      unifiedBreakdown[cat] = Math.round(jpyAmt * rate) + twdAmt;
    }
  });

  // ── 按分類聚合所有天的記帳 ──
  const byCategory = {};
  (days ?? []).forEach((day) => {
    const dateLabel = day.date.slice(5).replace("-", "/"); // "2026-06-17" → "06/17"
    (day.items ?? []).forEach((item) => {
      const cat = item.category ?? "其他";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push({ ...item, _date: dateLabel });
    });
  });

  // 各分類 JPY / TWD 總計
  const catTotals = {};
  Object.entries(byCategory).forEach(([cat, items]) => {
    catTotals[cat] = {
      jpy: items
        .filter((i) => i.currency === "JPY")
        .reduce((s, i) => s + i.amount, 0),
      twd: items
        .filter((i) => i.currency === "TWD")
        .reduce((s, i) => s + i.amount, 0),
    };
  });

  // 依總花費金額從大到小排列
  const sortedCats = CATEGORIES.filter((c) => byCategory[c]?.length > 0).sort(
    (a, b) => (unifiedBreakdown[b] ?? 0) - (unifiedBreakdown[a] ?? 0),
  );

  return (
    <div className="space-y-6">
      {/* ── 總計卡 ── */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm overflow-hidden">
        {/* 標題行 */}
        <div className="px-5 py-5 border-b border-white/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <TrendingUp size={16} className="text-[#5F7A61]" />
              <span className="text-xs font-bold text-gray-500 tracking-wide">
                {days?.length ?? 0} 天實際花費總計（匯率 {rate}）
              </span>
            </div>
            <div className="flex flex-col mt-0.5">
              <span className="text-3xl font-black text-[#2D5A27] tabular-nums leading-none">
                NT${unifiedTWD.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[#5F7A61]/70 tabular-nums mt-1.5">
                ¥{Math.round(unifiedTWD / rate).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 圓環圖 */}
        {unifiedTWD > 0 && (
          <div className="px-5 py-5 bg-white/20">
            <DonutChart breakdown={unifiedBreakdown} total={unifiedTWD} />
          </div>
        )}

        {/* 分類格（統一台幣） */}
        <div className="px-5 py-4 border-t border-white/30 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sortedCats.map((cat) => {
            const Icon = CATEGORY_CFG[cat].icon;
            const unified = unifiedBreakdown[cat] ?? 0;
            const pct = Math.round((unified / unifiedTWD) * 100);
            return (
              <div
                key={cat}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/50"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: CATEGORY_CFG[cat].color + "20" }}
                >
                  <Icon size={14} style={{ color: CATEGORY_CFG[cat].color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-600">{cat}</p>
                  <p
                    className="text-sm font-black tabular-nums"
                    style={{ color: CATEGORY_CFG[cat].color }}
                  >
                    NT${unified.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-400">{pct}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 依分類明細 ── */}
      <SectionCard
        icon={ReceiptText}
        title={
          <div className="flex items-center gap-2">
            <span>分類記帳明細</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {sortedCats.length} 類
            </span>
          </div>
        }
        collapsible={false}
        defaultOpen={true}
        variant="glass"
      >
        <div className="space-y-3 pt-2">
          {sortedCats.map((cat) => (
            <CategoryExpenseCard
              key={cat}
              category={cat}
              items={byCategory[cat]}
              jpyTotal={catTotals[cat]?.jpy ?? 0}
              twdTotal={catTotals[cat]?.twd ?? 0}
              rate={rate}
              forceOpen={forceOpen}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default ExpenseSection;
