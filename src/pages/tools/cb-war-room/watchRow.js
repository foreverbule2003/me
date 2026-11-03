import { CbCalculatorCore } from "../../../lib/cb-logic.mjs";

// 追蹤清單每一列要顯示的數字，以及由數字推出的資料狀態。
// 當日資料由每日同步寫在 cb_history/{code}.daily（規格見 docs/CB_DATA_FLOW.md）：
//   date, cbClose, cbChange, cbVolume, traded, stockClose, stockChange,
//   conversionPrice, premium
// 熱門榜上的標的優先用熱門榜當日資料；都沒有時退回每週 thefew 同步的 price／stockPrice。

export const NEAR_PARITY_MAX = 5; // 溢價率 0–5% 算接近平價

const num = (v) => {
  const n = parseFloat(String(v ?? "").replace(/[+%,▲▼\s]/g, ""));
  return Number.isFinite(n) ? n : null;
};

const signedPct = (v) => {
  const s = String(v ?? "");
  const n = num(s);
  if (n === null) return null;
  return s.includes("▼") ? -Math.abs(n) : n;
};

export const premiumState = (premium) => {
  if (premium === null) return null;
  if (premium < 0) return "discount";
  if (premium <= NEAR_PARITY_MAX) return "near";
  return "premium";
};

export const PREMIUM_LABEL = {
  discount: "折價",
  near: "接近平價",
  premium: "溢價",
};

export const priceBand = (price, { low, high }) => {
  if (price === null) return null;
  if (price < low) return "low";
  if (price > high) return "high";
  return "mid";
};

// 漲跌（元）換成漲跌幅：change / 前一日價
const changeToPct = (close, change) =>
  close !== null && change !== null && close - change !== 0
    ? (change / (close - change)) * 100
    : null;

export const toWatchRow = (item, live, bands) => {
  const daily = item.daily || {};
  const conversionPrice =
    num(daily.conversionPrice) ?? num(item.conversionPrice);

  // CB：熱門榜 > daily > 每週價（沒成交時 cbClose 是 null，用每週價當參考）
  const dailyClose = num(daily.cbClose);
  const cbPrice = num(live?.price) ?? dailyClose ?? num(item.price);
  const cbChangePct =
    signedPct(live?.changePercent) ??
    changeToPct(dailyClose, num(daily.cbChange));
  const volume = num(live?.volume) ?? num(daily.cbVolume);

  const dailyStock = num(daily.stockClose);
  const stockPrice = dailyStock ?? num(item.stockPrice);
  const stockChangePct = changeToPct(dailyStock, num(daily.stockChange));

  // 熱門榜價格比 daily 新時重算；否則用同步時算好的 premium
  const parity = CbCalculatorCore.calculateTheoreticalPrice(
    stockPrice,
    conversionPrice,
  );
  const computed =
    cbPrice && parity
      ? CbCalculatorCore.calculatePremiumRate(cbPrice, parity)
      : null;
  const premium = live?.price ? computed : (num(daily.premium) ?? computed);

  const traded =
    volume !== null
      ? volume > 0
      : typeof daily.traded === "boolean"
        ? daily.traded
        : null; // null = 不確定，不當成沒成交

  return {
    id: item.id,
    name: live?.name || item.name || "",
    category: item.category || "未分類 (UNCATEGORIZED)",
    cbPrice,
    cbChangePct,
    stockPrice,
    stockChangePct,
    volume,
    premium,
    premiumState: premiumState(premium),
    band: priceBand(cbPrice, bands),
    traded,
    priceDate: daily.date || item.priceDate || null,
  };
};
