/**
 * 旅遊行程資料模板 (Trip Data Template)
 * ============================================================
 * 使用方式：
 *   複製此檔案到新旅程資料夾，重命名為 data.js，
 *   填入實際資料後刪除說明注釋。
 *
 * 欄位說明：
 *   - 必填欄位：有 ★ 標記
 *   - 選填欄位：有 (Optional) 標記，可整個欄位刪除
 * ============================================================
 */

// ★ 航班資訊
export const flightData = {
  outbound: {
    airline: "航空公司名稱",          // e.g. "中華航空"
    flightNo: "CI101",               // 航班號碼
    date: "06/15 (一)",               // 出發日期
    time: {
      depart: "09:00",
      arrive: "13:00",
    },
    airport: {
      depart: "TPE 桃園",
      arrive: "NRT 成田",             // 目的地機場代碼 + 名稱
    },
    terminal: {
      depart: "T2",
      arrive: "T1",
    },
    duration: "3h00m",
    note: "",                         // (Optional) 注意事項，例如貴賓室資訊
  },
  inbound: {
    airline: "航空公司名稱",
    flightNo: "CI102",
    date: "06/22 (一)",
    time: {
      depart: "14:00",
      arrive: "16:00",
    },
    airport: {
      depart: "NRT 成田",
      arrive: "TPE 桃園",
    },
    terminal: {
      depart: "T1",
      arrive: "T2",
    },
    duration: "3h00m",
    note: "",
  },
};

// ★ 行程概覽 (用於 Timeline 元件)
// 一行一天，欄位簡潔
export const overviewData = [
  { day: 1, date: "6/15 (一)", title: "抵達・市區", hotel: "旅館名稱" },
  { day: 2, date: "6/16 (二)", title: "景點 A",    hotel: "旅館名稱" },
  { day: 3, date: "6/17 (三)", title: "景點 B",    hotel: "旅館名稱" },
  { day: 4, date: "6/18 (四)", title: "景點 C",    hotel: "旅館名稱" },
  { day: 5, date: "6/19 (五)", title: "購物",      hotel: "旅館名稱" },
  { day: 6, date: "6/20 (六)", title: "自由活動",  hotel: "旅館名稱" },
  { day: 7, date: "6/21 (日)", title: "返程",      hotel: "✈️ 回家" },
];

// ★ 每日行程（支援多 Phase 分段）
export const itineraryData = [
  {
    phase: "第一階段：景點名稱 (Day 1-3)",   // 大區段標題
    // (Optional) 此階段的封面圖，折疊時顯示
    image: "https://images.unsplash.com/photo-XXXXX",
    days: [
      {
        day: 1,
        date: "6/15 (一)",
        title: "今日主題",
        // ★ 每日封面圖 (Unsplash 建議 w=2070)
        image: "https://images.unsplash.com/photo-XXXXX?q=80&w=2070&auto=format&fit=crop",
        time: "13:00 - 住宿",          // 時間概覽（顯示在 DayCard 頭部）
        highlight: "✨ 一句話亮點摘要", // (Optional) 顯示在 DayCard 底部
        activities: [
          {
            time: "13:00",
            text: "活動標題",           // ★ 主要文字
            subText: "補充說明",        // (Optional) 灰色小字
            note: "注意事項",           // (Optional) 橘色警示框
            tips: "小技巧",            // (Optional) 藍色資訊框
            // (Optional) 地圖：兩種格式
            // 格式 A：單點搜尋
            map: { type: "search", query: "景點英文名稱" },
            // 格式 B：路線導航
            // map: { type: "route", origin: "出發地", destination: "目的地" },
            // (Optional) 美食指南 Tab 連動（顯示該地點的美食卡片）
            foodGuideLink: "location 名稱（需與 foodData 中的 location 一致）",
          },
          // ... 更多活動
        ],
      },
      // ... 更多天
    ],
  },
  // ... 更多 Phase
];

// ★ 預算明細
export const budgetData = [
  { item: "機票 (來回)",   cost: 15000, note: "約 $3,300 TWD" },
  { item: "交通 (IC卡)",   cost: 5000,  note: "約 $1,100 TWD" },
  { item: "住宿 (N泊)",    cost: 30000, note: "約 $6,600 TWD" },
  { item: "餐飲費",        cost: 15000, note: "約 $3,300 TWD" },
  { item: "購物/景點",     cost: 10000, note: "約 $2,200 TWD" },
];

// ★ 每日推薦交通路線（用於 交通 Tab）
export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1",
    type: "route",                     // "route" | "search"
    name: "機場 → 市區",
    origin: "Narita Airport Terminal 1",
    destination: "Shinjuku Station",
    desc: "成田特快 N'EX (約90分)",
    duration: "90分",
  },
  // ... 更多路線
];

// ★ 實用連結（用於 總覽 Tab）
export const usefulLinks = {
  categories: [
    {
      type: "ticket",
      label: "交通票券",
      icon: "Train",
      items: [
        {
          name: "連結名稱",
          day: "Day 1-7",             // 適用天數標籤
          url: "https://...",
        },
      ],
    },
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [
        { name: "旅館名稱", day: "Day 1-3", url: "https://..." },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        { name: "景點名稱", day: "Day 2", url: "https://..." },
      ],
    },
  ],
};

// ★ 美食指南（用於 美食 Tab）
// 愛心收藏狀態會同步到 Firebase
export const foodData = {
  categories: [
    {
      location: "地點名稱",            // ★ 需與 activities[].foodGuideLink 一致
      day: "Day 1-2",
      sections: [
        {
          title: "🍜 餐廳推薦",
          items: [
            {
              name: "餐廳名稱",        // ★
              type: "料理類型",        // e.g. "拉麵", "壽司"
              desc: "簡短描述",        // (Optional)
              note: "注意事項",        // (Optional) 橘色小字
              rating: "4.5★",         // (Optional)
              recommended: true,      // (Optional) 顯示星星圖示
              // Google Maps 連結（直接點擊開啟）
              mapUrl: "https://www.google.com/maps/search/?api=1&query=餐廳名稱+地點",
            },
          ],
        },
      ],
    },
  ],
};

// 購物清單（用於 購物 Tab）
// 已購狀態同步到 Firebase。空陣列代表暫無購物清單。
export const shoppingData = {
  targetStores: [],                   // (Optional) 目標商店列表
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

// ★ 待訂清單（用於 總覽 Tab 的 ChecklistSection）
export const todoData = [
  { category: "交通", item: "機票" },
  { category: "交通", item: "機場交通 (IC卡/Suica)" },
  { category: "住宿", item: "旅館訂房" },
  { category: "通訊", item: "日本上網 eSIM" },
];
