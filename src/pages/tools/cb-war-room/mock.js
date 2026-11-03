import { useState, useCallback } from "react";

// 開發用假資料：網址加 ?mock 時不用登入就能看「我的追蹤」（只在 dev server 生效）。
// 欄位與每日同步寫進 cb_history/{code}.daily 的格式相同，數字是隨手編的。
export const isMockMode = () =>
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).has("mock");

export const MOCK_USER = { uid: "mock", photoURL: "" };

// 參數仍用漲跌幅（%）方便編，轉成 daily 規格的漲跌（元）
const row = (id, name, category, price, chg, conv, stock, stockChg, volume) => {
  const toChange = (close, pct) =>
    Math.round((close - close / (1 + pct / 100)) * 100) / 100;
  return {
    id,
    name,
    category,
    price,
    stockPrice: stock,
    conversionPrice: conv,
    daily: {
      date: "2026-11-02",
      cbClose: volume > 0 ? price : null,
      cbChange: volume > 0 ? toChange(price, chg) : null,
      cbVolume: volume,
      traded: volume > 0,
      stockClose: stock,
      stockChange: toChange(stock, stockChg),
      conversionPrice: conv,
      premium: null, // 交給前端算，順便驗證計算
    },
  };
};

const MOCK_ITEMS = [
  row("37151", "定穎投控一", "PCB", 124.0, 1.2, 62.4, 74.1, 2.1, 312),
  row("37152", "定穎投控二", "PCB", 104.2, -0.4, 70.0, 71.5, 2.1, 45),
  row("54391", "高技一", "PCB", 131.0, 3.8, 41.2, 55.3, 5.0, 880),
  row("47642", "雙鍵二", "PCB設備/材料", 99.4, -0.2, 88.0, 61.2, -1.3, 0),
  row("62746", "台燿六", "PCB設備/材料", 110.4, -1.3, 168.0, 186.0, -2.4, 1204),
  row("66642", "群翊二", "PCB設備/材料", 133.0, 0.8, 120.5, 152.0, 0.7, 96),
  row("36804", "家登四", "半導體耗材", 150.0, 2.6, 488.9, 702.0, 3.1, 233),
  row("36805", "家登五", "半導體耗材", 101.8, 0, 520.0, 512.0, 3.1, 0),
  row("33246", "雙鴻六", "散熱", 172.0, 4.9, 560.0, 905.0, 6.2, 1530),
  row("33247", "雙鴻七", "散熱", 112.0, 1.1, 610.0, 640.0, 6.2, 58),
  row("370201", "大聯大E1", "電子通路", 103.5, 0.1, 55.0, 50.8, -0.6, 12),
  row("47491", "測試無轉換價", "電網", 107.0, -0.9, null, 88.0, -1.0, 20),
];

// 跟 useWatchlist 回傳同樣的介面，改的是本機 state，不寫 Firestore
export const useMockWatchlist = () => {
  const [watchlist, setWatchlist] = useState(MOCK_ITEMS);

  const addCB = useCallback(async (code, category) => {
    setWatchlist((prev) => [
      ...prev.filter((i) => i.id !== code),
      { id: code.toUpperCase(), name: "", category },
    ]);
  }, []);
  const moveCB = useCallback(async (id, category) => {
    setWatchlist((prev) =>
      prev.map((i) => (i.id === id ? { ...i, category } : i)),
    );
  }, []);
  const renameCategory = useCallback(async (from, to) => {
    setWatchlist((prev) =>
      prev.map((i) => (i.category === from ? { ...i, category: to } : i)),
    );
  }, []);
  const removeCB = useCallback(async (id) => {
    setWatchlist((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return {
    watchlist,
    loading: false,
    addCB,
    moveCB,
    renameCategory,
    removeCB,
  };
};
