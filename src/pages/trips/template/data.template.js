/**
 * 旅遊行程資料模板 (Trip Data Template)
 * ============================================================
 * 此檔案由 `npm run new-trip` 自動複製為新旅程的 data.js，
 * 並替換所有 __TOKEN__ 佔位符。
 *
 * Schema 與 2026-tokyo 完全一致，同時支援：
 *   - scripts/sync-travel-spec.mjs  (data.js → spec.md 自動同步)
 *   - scripts/generate-travel-pdf.mjs (data.js → 離線旅遊小書 HTML/PDF)
 *
 * 欄位說明：
 *   - 必填欄位：有 ★ 標記
 *   - 選填欄位：有 (Optional) 標記，可整個欄位刪除
 * ============================================================
 */

export const TRIP_ID = "__TRIP_ID__"; // 例如 "2026-tokyo"

// ★ 旅程元資料（App.jsx 的標題、Hero、匯率等皆由此驅動）
export const tripMeta = {
  id: TRIP_ID,
  badge: "__TRIP_BADGE__", // Header 徽章，例如 "JP · TYO · YOK · 2026 · 8D"
  title: "__TRIP_TITLE__", // 主標題，例如 "東京"
  subtitle: "__TRIP_SUBTITLE__", // 副標題，例如 "橫濱・澀谷・輕井澤 8日旅"
  footer: "__TRIP_FOOTER__", // 頁尾文字，例如 "© 2026 東京・橫濱・輕井澤 8日旅"
  // Hero 首圖 (Unsplash 建議 w=2070)
  heroImage:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
  nights: 7, // 總住宿晚數（住宿 Tab 均價計算用）
  exchangeRate: 0.2, // 日幣 → 台幣匯率（¥1 = NT$0.2）
  exchangeRateLabel: "¥1 = NT$0.2",
};

// ★ 車站名稱對照表（交通 Tab 頂部標籤雲；stations 留空則不顯示）
export const stationMapping = {
  dayLabel: "Day 1-8", // 卡片左側日期徽章
  title: "車站名稱對照表",
  stations: [
    // { zh: "成田機場", ja: "成田空港 (なりたくうこう)", en: "Narita Airport" },
  ],
};

// ★ 天氣預報（總覽 Tab；days 留空則暫不顯示）
export const weatherData = {
  sourceNote: "更新於 YYYY/MM/DD - 日本氣象廳 10 日間預報",
  sourceUrl: "https://tenki.jp/",
  days: [
    // {
    //   date: "6/17",
    //   day: "三",
    //   fullDate: "6/17 (三)",
    //   loc: "地點",
    //   weatherIcon: "⛅",
    //   weatherText: "曇時々晴",
    //   tempHigh: 27,
    //   tempLow: 19,
    //   precip: "20%",
    //   note: "舒適，適合散步",
    //   warn: false, // true 時以警示色顯示
    // },
  ],
};

// ★ 航班資訊
export const flightData = {
  outbound: {
    airline: "航空公司名稱", // e.g. "中華航空"
    flightNo: "CI100", // 航班號碼
    date: "06/17 (三)", // 出發日期
    time: { depart: "09:00", arrive: "13:00" },
    airport: { depart: "TPE 桃園", arrive: "NRT 成田" },
    terminal: { depart: "T2", arrive: "T1" },
    duration: "3h00m",
    note: "", // (Optional) 注意事項，例如托運/貴賓室資訊
  },
  inbound: {
    airline: "航空公司名稱",
    flightNo: "CI101",
    date: "06/24 (三)",
    time: { depart: "14:00", arrive: "17:00" },
    airport: { depart: "NRT 成田", arrive: "TPE 桃園" },
    terminal: { depart: "T1", arrive: "T2" },
    duration: "4h00m",
    note: "",
  },
};

// ★ 行程概覽（總覽 Tab 的 Timeline 元件；一行一天）
export const overviewData = [
  { day: 1, date: "6/17 (三)", title: "抵達・市區", hotel: "旅館名稱" },
  { day: 2, date: "6/18 (四)", title: "景點 A", hotel: "旅館名稱" },
  { day: 3, date: "6/19 (五)", title: "景點 B", hotel: "旅館名稱" },
  { day: 4, date: "6/20 (六)", title: "返程", hotel: "✈️ 回家" },
];

// ★ 每日行程（支援多 Phase 分段）
export const itineraryData = [
  {
    // 大區段標題，格式 "地點 (Day X-Y)" 會自動拆解為徽章 + 地點
    phase: "第一階段：地點名稱 (Day 1-2)",
    days: [
      {
        day: 1,
        date: "6/17 (三)",
        title: "今日主題",
        // ★ 每日封面圖 (Unsplash 建議 w=500~2070)
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
        // (Optional) 紀念日徽章：true 顯示預設文字，或自訂字串如 "🎊 三週年紀念日"
        // anniversary: true,
        highlight: "✨ 一句話亮點摘要", // (Optional) 顯示在 DayCard 底部
        activities: [
          {
            time: "13:00",
            text: "活動標題", // ★ 主要文字
            subText: "補充說明", // (Optional) 灰色小字
            note: "注意事項", // (Optional) Info 圖示小字
            tips: "小提醒", // (Optional) ⚠️ 警示框
            fee: "入場 1,000円", // (Optional) 票價資訊
            isFood: false, // (Optional) true 顯示美食連動按鈕
            // (Optional) 交通連動：點擊跳到交通 Tab 對應路線
            // transport: { line: "N'EX 成田特快", station: "成田空港" },
            // (Optional) 地圖：單點搜尋或路線導航
            // map: { type: "search", query: "景點英文名稱" },
            // map: { type: "route", origin: "出發地", destination: "目的地" },
          },
        ],
      },
      // (Optional) 多方案日：提供 options 供切換，共用 day/date
      // {
      //   day: 2,
      //   date: "6/18 (四)",
      //   title: "二選一方案日",
      //   image: "https://images.unsplash.com/photo-XXXXX?w=1200",
      //   options: [
      //     { label: "方案 A", title: "…", image: "…", highlight: "…", activities: [] },
      //     { label: "方案 B", title: "…", image: "…", highlight: "…", activities: [] },
      //   ],
      // },
    ],
  },
];

// ★ 預算明細（規劃期概算；旅程結束後以 expenseData 記錄實際花費）
export const budgetData = [
  {
    item: "機票",
    cost: 0, // 日幣
    note: "兩人合計 NT$0",
    // (Optional) 子項目拆分
    // subItems: [{ item: "N'EX 特急", cost: 10000, note: "單人約 ¥5,000" }],
  },
  { item: "交通", cost: 0, note: "" },
  { item: "住宿", cost: 0, note: "" },
  { item: "餐飲", cost: 0, note: "" },
  { item: "購物/景點", cost: 0, note: "" },
];

// ★ 每日推薦交通路線（交通 Tab）
export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1 (6/17 三)", // 格式 "Day X (日期)" 會自動拆解為徽章 + 日期
    name: "機場 → 市區",
    // ★ steps：逐段交通細節
    steps: [
      {
        line: "N'EX 成田特快", // 路線名稱（含 "新幹線"/"特急" 會自動標色）
        type: "train", // "train" | "bus" | "bike" | "shinkansen"
        station: "成田空港 → 橫濱", // 起訖站
        platform: "地下 1F 月台", // (Optional)
        duration: "90分", // (Optional)
        fare: "¥4,370 (指定席)", // (Optional)
        note: "全車指定席，需提前劃位", // (Optional，含 ⚠️ 會以紅色顯示)
        // (Optional) 時刻表
        // timetable: [{ train: "N'EX 30", dep: "13:44", arr: "15:10", note: "" }],
        // (Optional) 外部連結
        // link: { text: "官方時刻表", url: "https://..." },
      },
    ],
    // (Optional) 多方案路線：提供 options 供切換
    // options: [
    //   { label: "方案 A：N'EX", name: "…", steps: [] },
    //   { label: "方案 B：巴士", name: "…", steps: [] },
    // ],
  },
];

// ★ 實用連結（總覽 Tab 的 LinksGallery）
export const usefulLinks = {
  categories: [
    {
      type: "ticket",
      label: "交通票券",
      icon: "Train",
      items: [{ name: "連結名稱", day: "Day 1", url: "https://..." }],
    },
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [{ name: "旅館名稱", day: "Day 1-3", url: "https://..." }],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [{ name: "景點名稱", day: "Day 2", url: "https://..." }],
    },
  ],
};

// ★ 美食指南（美食 Tab；愛心收藏會同步到 Firebase）
export const foodData = {
  categories: [
    {
      location: "地點名稱",
      day: "Day 1-2 (6/17-18)", // 格式 "Day X (日期)" 會自動拆解為徽章 + 日期
      sections: [
        {
          title: "🍜 餐廳推薦",
          items: [
            {
              name: "餐廳名稱", // ★
              type: "料理類型", // e.g. "拉麵", "壽司"
              desc: "簡短描述", // ★
              note: "注意事項", // (Optional)
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=餐廳名稱+地點",
            },
          ],
        },
      ],
    },
  ],
};

// ★ 景點指南（景點 Tab；結構與 foodData 相同）
export const attractionData = {
  categories: [
    {
      location: "地點名稱",
      day: "Day 1-2 (6/17-18)",
      sections: [
        {
          title: "🌲 觀光",
          items: [
            {
              name: "景點名稱", // ★
              type: "景點類型", // e.g. "海濱公園", "美術館"
              desc: "簡短描述", // ★
              fee: "門票 1,000円 / 免費", // (Optional)
              note: "參觀小提醒", // (Optional)
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=景點英文名稱",
            },
          ],
        },
      ],
    },
  ],
};

// 購物清單（購物 Tab；已購狀態同步到 Firebase。空陣列代表暫無清單）
export const shoppingData = {
  targetStores: [], // (Optional) 目標商店列表
  wishlist: [], // (Optional) 願望清單
  categories: [
    // {
    //   title: "分類名稱",
    //   subtitle: "分類說明",
    //   icon: "🛍️",
    //   items: [
    //     {
    //       func: "功能標籤",           // (Optional) 例如 "卸妝", "底妝"
    //       type: "必買",               // (Optional) "必買"|"首選"|"試用"|"囤貨"|"備案"
    //       name: "商品名稱",           // ★
    //       nameJp: "日文名稱",         // (Optional)
    //       desc: "簡短描述",           // (Optional)
    //       price: 1000,               // ★ 日幣價格（數字）
    //       image: "/me/images/products/xxx.png", // (Optional) 商品圖片
    //       note: "購買備注",           // (Optional)
    //       isBackup: false,            // (Optional) true = 備案款，顯示虛線框
    //       mustBuy: false,             // (Optional) 必買標記
    //     },
    //   ],
    // },
  ],
};

// ★ 待辦清單（總覽 Tab 的 ChecklistSection；以 group 分組顯示）
export const todoData = [
  { group: "出國前準備", category: "準備", item: "Visit Japan Web (VJW)" },
  { group: "出國前準備", category: "交通", item: "機票" },
  { group: "出國前準備", category: "住宿", item: "旅館訂房" },
  { group: "出國前準備", category: "通訊", item: "日本上網 eSIM" },
  { group: "確認與追蹤項目", category: "交通", item: "回程交通劃位" },
];

// 素食溝通卡（總覽 Tab；若無素食需求可移除此匯出與 App.jsx 中的 VegetarianCard）
export const vegetarianCard = {
  cannotEat: [
    "肉・魚・魚介類 (肉類與海鮮)",
    "すべての出汁 (柴魚/魚介/肉骨等高湯)",
  ],
  canEat: [
    "野菜/卵/乳製品 (蔬菜/雞蛋/乳製品)",
    "昆布だし (昆布高湯)",
    "ネギ/にんにく類 (蔥/蒜/韭菜等五辛)",
  ],
};

// ★ 住宿規劃（住宿 Tab；每晚一個 section，可放多個候選旅館）
export const accommodationData = [
  {
    location: "地點名稱",
    period: "Day 1 (6/17 三)", // 格式 "Day X (日期)" 會自動拆解為徽章 + 日期
    hotels: [
      {
        name: "旅館名稱", // ★
        status: "候選", // "已訂妥"|"已預訂"|"已決定"|"候選"（已訂妥以該價格計費）
        desc: "一句話描述", // ★
        features: ["海景", "新開幕"], // (Optional) 特色標籤
        mapUrl: "https://www.google.com/maps/search/?api=1&query=旅館英文名稱",
        priceJpy: 0, // (Optional) 日幣房價
        priceTwd: 0, // (Optional) 台幣房價（住宿估算以此計算）
      },
    ],
  },
];

// 實際花費記帳（花費 Tab；旅程期間逐日記錄，支援 JPY/TWD 雙幣）
export const expenseData = {
  /** 每日花費明細 */
  days: [
    // {
    //   date: "2026-06-17",           // ★ ISO 日期
    //   label: "Day 1・成田 → 橫濱",   // ★ 顯示標籤
    //   items: [
    //     {
    //       time: "早上",              // 時段或 "事前"
    //       shop: "店名/項目",         // ★
    //       category: "飲食",          // ★ "飲食"|"交通"|"住宿"|"購物"|"娛樂"|"伴手禮"|"其他"
    //       amount: 1200,             // ★ 金額（數字）
    //       currency: "JPY",          // ★ "JPY" | "TWD"
    //       note: "備注",              // (Optional)
    //       preflight: true,          // (Optional) 出發前支出
    //     },
    //   ],
    // },
  ],
  /** 總計（依 currency 分開統計，breakdown 依分類） */
  grandTotal: {
    JPY: { total: 0, breakdown: {} },
    TWD: { total: 0, breakdown: {} },
  },
};
