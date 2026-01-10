/**
 * 2026 伊勢志摩‧大阪 行程資料
 * Vite ESM 版本
 */

// 行程策略概覽
export const strategyData = {
  title: "關鍵策略 (11日素食慢旅版)",
  content:
    "由大阪 KIX 進出。Day 1 停留機場周邊，Day 2-3 直奔 VISON 連住兩晚，優化 5 日周遊券效益 (Day 2-6)。Day 7-8 大阪 USJ + 空庭溫泉，Day 9 自由活動，Day 10-11 返程。",
  transport: [
    "近鐵電車周遊券 5日券 plus (Day 2-6 使用)",
    "特急券總費用約 ¥4,320/人",
  ],
  accommodation: [
    "Day 1 (機場): OMO 關西機場 by 星野集團 (大浴場)",
    "Day 2-3 (園區): Hotel Vison (連住兩晚)",
    "Day 4 (市區): 伊勢市區飯店 / Comfort Hotel",
    "Day 5 (溫泉): 賢島寶生苑 (含早晚餐)",
    "Day 6-9 (都市): 大阪難波/心齋橋一帶",
    "Day 10 (機場): 關西機場華盛頓飯店",
  ],
};

// 每日行程資料
export const itineraryData = [
  {
    phase: "伊勢志摩慢旅 (Day 1-6)",
    days: [
      {
        day: 1,
        date: "1/11 (日)",
        title: "抵達關西 · Rinku Outlet",
        image:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2070&auto=format&fit=crop",
        time: "13:00 - 住宿",
        activities: [
          {
            time: "13:00",
            text: "抵達關西國際機場 (KIX)",
            map: { query: "Kansai International Airport" },
          },
          {
            time: "14:00",
            text: "交通：機場 → 臨空城",
            subText: "接駁巴士或南海電鐵 (一站)",
            map: { query: "Rinku Town Station" },
          },
          {
            time: "14:30",
            text: "購物：Rinku Premium Outlets",
            note: "別忘了去 Hoka Store (區號6700)",
            map: { query: "Rinku Premium Outlets" },
          },
          {
            time: "18:00",
            text: "晚餐：Outlet 內/周邊",
            foodGuideLink: "臨空城",
          },
          {
            time: "19:30",
            text: "入住：OMO Kansai Airport",
            subText: "星野集團機場飯店",
            note: "住客專用大浴場/桑拿",
            map: { query: "OMO Kansai Airport" },
          },
        ],
        highlight:
          "🛍️ 落地即購物！直奔 Rinku Outlet 買裝備，入住星野集團機場飯店享受大浴場。",
      },
      {
        day: 2,
        date: "1/12 (一)",
        title: "VISON 初探",
        image:
          "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2108&auto=format&fit=crop",
        time: "10:00 - 20:00",
        activities: [
          {
            time: "10:00",
            text: "OMO → 難波",
            subText: "南海電鐵 (¥970)",
            map: {
              type: "route",
              origin: "Kansai Airport Station",
              destination: "Namba Station",
            },
          },
          {
            time: "11:00",
            text: "難波 → 松阪",
            subText: "近鐵特急 (約80分)",
            note: "啟用周遊券 5日plus，另需購特急券 ¥1640",
            map: {
              type: "route",
              origin: "Osaka-Namba Station",
              destination: "Matsusaka Station",
            },
          },
          {
            time: "12:30",
            text: "松阪 → VISON",
            subText: "三重交通巴士 (約45分)",
            map: {
              type: "route",
              origin: "Matsusaka Station",
              destination: "VISON Mie",
            },
          },
          {
            time: "14:00",
            text: "午餐：園區餐廳",
            foodGuideLink: "VISON 園區",
          },
          {
            time: "15:00",
            text: "入住：Hotel Vison",
            subText: "Check-in 15:00",
            map: { query: "Hotel Vison" },
          },
          {
            time: "15:30",
            text: "午後散步：甜點區",
            foodGuideLink: "VISON 園區",
          },
          {
            time: "20:00",
            text: "體驗：本草湯",
            subText: "藥草溫泉 (住客免費)",
            note: "夜晚可欣賞園區星空 🌟",
            map: { query: "VISON Honzo Yu" },
          },
        ],
        highlight:
          "🚌 啟用周遊券，直奔日本最大商業度假園區 VISON。特急券需另購。",
      },
      {
        day: 3,
        date: "1/13 (二)",
        title: "VISON 深度體驗",
        image:
          "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2108&auto=format&fit=crop",
        time: "全日",
        activities: [
          {
            time: "08:00",
            text: "早餐：園區早餐",
            foodGuideLink: "VISON 園區",
          },
          {
            time: "10:00",
            text: "晨間體驗：本草湯",
            subText: "06:00 - 00:00 開放",
            map: { query: "VISON Honzo Yu" },
          },
          {
            time: "12:00",
            text: "午餐：園區餐廳",
            foodGuideLink: "VISON 園區",
          },
          { time: "14:00", text: "購物時光", note: "購買 VISON 限定伴手禮" },
          {
            time: "18:00",
            text: "晚餐：園區美食街",
            foodGuideLink: "VISON 園區",
          },
          { time: "20:00", text: "入住：VISON (第二晚)" },
        ],
        highlight: "♨️ 不趕車的悠閒一天，住客免費無限次使用本草湯。",
      },
      {
        day: 4,
        date: "1/14 (三)",
        title: "伊勢神宮漫遊",
        image:
          "https://images.unsplash.com/photo-1694175173949-1c2bc79b99dc?q=80&w=2070&auto=format&fit=crop",
        time: "11:00 - 17:00",
        activities: [
          {
            time: "11:00",
            text: "交通：VISON → 松阪",
            subText: "巴士",
            map: {
              type: "route",
              origin: "VISON Mie",
              destination: "Matsusaka Station",
            },
          },
          {
            time: "12:00",
            text: "交通：松阪 → 伊勢市",
            subText: "近鐵特急 (特急券+¥520)",
            map: {
              type: "route",
              origin: "Matsusaka Station",
              destination: "Iseshi Station",
            },
          },
          {
            time: "13:00",
            text: "午餐：托福橫丁",
            subText: "Oharai-machi 老街",
            foodGuideLink: "伊勢 (Day 4)",
            map: { query: "Oharai Machi Ise" },
          },
          {
            time: "14:30",
            text: "參拜：伊勢神宮 (內宮)",
            note: "日本人心靈故鄉，下午人潮較少",
            map: { query: "Ise Jingu Naiku" },
          },
          {
            time: "17:00",
            text: "入住：伊勢市區飯店",
            subText: "Comfort Hotel Ise",
            map: { query: "Comfort Hotel Ise" },
          },
        ],
        highlight: "⛩️ 參拜日本人心靈故鄉，漫步托福橫丁享受老街美食。",
      },
      {
        day: 5,
        date: "1/15 (四)",
        title: "賢島海景溫泉",
        image:
          "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=2070&auto=format&fit=crop",
        time: "10:00 - 住宿",
        activities: [
          {
            time: "10:00",
            text: "交通：伊勢市 → 賢島",
            subText: "近鐵特急 (特急券+¥520)",
            map: {
              type: "route",
              origin: "Iseshi Station",
              destination: "Kashikojima Station",
            },
          },
          {
            time: "15:00",
            text: "入住：賢島寶生苑",
            subText: "含早晚餐",
            note: "車站提供免費接駁車 (約3分)",
            tips: "車站全家超商 18:00 關門",
            map: { query: "Kashikojima Hojoen" },
          },
          {
            time: "18:00",
            text: "晚餐：寶生苑懷石料理",
            subText: "含早晚餐方案 🍱",
            note: "可提前告知素食需求",
          },
        ],
        highlight: "🌊 志摩半島絕美海景 + 傳統溫泉旅館懷石料理 (含早晚餐)。",
      },
      {
        day: 6,
        date: "1/16 (五)",
        title: "賢英虞灣遊船 · 大阪返程",
        image:
          "https://images.unsplash.com/photo-1490761668535-35497054764d?q=80&w=2070&auto=format&fit=crop",
        time: "08:00 - 18:00",
        activities: [
          {
            time: "08:00",
            text: "早餐：寶生苑早餐",
            subText: "含早晚餐方案 🍱",
          },
          {
            time: "11:00",
            text: "觀光：賢島西班牙遊船",
            subText: "英虞灣巡遊 (50分)",
            note: "憑周遊券折抵 ¥100 · 車站置物櫃 ¥600/次",
            map: { query: "Kashikojima Espana Cruise" },
          },
          { time: "13:00", text: "午餐：賢島", foodGuideLink: "賢島" },
          {
            time: "15:30",
            text: "交通：近鐵特急",
            subText: "賢島 → 大阪難波 (約2hr20m)",
            note: "特急券 ¥1,640",
            map: {
              type: "route",
              origin: "Kashikojima Station",
              destination: "Osaka-Namba Station",
            },
          },
          {
            time: "18:00",
            text: "晚餐：大阪市區",
            note: "Check-in 大阪飯店",
            foodGuideLink: "大阪 梅田",
          },
        ],
        highlight: "🚂 完美運用周遊券最後一天，英虞灣遊船觀光後返回大阪。",
      },
    ],
  },
  {
    phase: "大阪都市探索 (Day 7-11)",
    days: [
      {
        day: 7,
        date: "1/17 (六)",
        title: "梅田購物 · USJ 夜遊",
        image:
          "https://images.unsplash.com/photo-1612404834746-1ffba06de133?q=80&w=2070&auto=format&fit=crop",
        time: "11:00 - 20:00",
        activities: [
          {
            time: "11:00",
            text: "購物：梅田商圈",
            subText:
              "LUCUA: TRUFFLE(2F), Daniel(1F), PBS(B1) / 大丸: HARBS(6F)",
            map: { query: "LUCUA Osaka" },
          },
          { time: "13:00", text: "午餐：梅田商國", foodGuideLink: "大阪 梅田" },
          {
            time: "17:00",
            text: "樂園：USJ 環球影城",
            tips: "善用 Single Rider 節省時間",
            map: { query: "Universal Studios Japan" },
          },
          {
            time: "20:00",
            text: "晚餐：園區內或 Citywalk",
            foodGuideLink: "USJ 環球影城",
          },
        ],
        highlight: "🎢 年票優勢：白天購物，傍晚入園避開人潮。",
      },
      {
        day: 8,
        date: "1/18 (日)",
        title: "USJ 暢玩 · 空庭溫泉",
        image:
          "https://images.unsplash.com/photo-1506045412240-22980140a405?q=80&w=2070&auto=format&fit=crop",
        time: "09:00 - 21:00",
        activities: [
          {
            time: "09:00",
            text: "樂園：USJ 環球影城",
            subText: "持年票入園，隨意暢玩",
            map: { query: "Universal Studios Japan" },
          },
          {
            time: "12:00",
            text: "午餐：園區內",
            foodGuideLink: "USJ 環球影城",
          },
          {
            time: "16:00",
            text: "交通：USJ → 弁天町",
            subText: "JR約15分",
            map: {
              type: "route",
              origin: "Universal City Station",
              destination: "Bentencho Station",
            },
          },
          {
            time: "16:30",
            text: "體驗：空庭溫泉 Solaniwa Onsen",
            note: "安土桃山時代造景 / 免費浴衣 / 天空庭園足湯",
            map: { query: "Solaniwa Onsen Osaka" },
          },
          {
            time: "19:00",
            text: "晚餐：空庭溫泉館內",
            subText: "和食/居酒屋風",
          },
          { time: "21:00", text: "返回大阪市區", note: "營業至 23:00" },
        ],
        highlight: "♨️ 玩累了直接泡湯！USJ + 空庭溫泉一日雙享受。",
      },
      {
        day: 9,
        date: "1/19 (一)",
        title: "大阪自由活動",
        image:
          "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        activities: [
          {
            time: "全日",
            text: "自由活動",
            note: "可選擇繼續購物、大阪市區觀光或休息",
          },
          { time: "19:00", text: "入住：大阪市區飯店", subText: "最後一晚" },
        ],
        highlight: "🗓️ 彈性一天！可以補買遺珠、再訪喜歡的餐廳或純粹休息。",
      },
      {
        day: 10,
        date: "1/20 (二)",
        title: "Rinku Outlet",
        image:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2070&auto=format&fit=crop",
        time: "10:00 - 19:00",
        activities: [
          {
            time: "10:00",
            text: "交通：大阪 → 臨空城",
            map: {
              type: "route",
              origin: "Namba Station",
              destination: "Rinku Town Station",
            },
          },
          {
            time: "11:00",
            text: "購物：Rinku Premium Outlets",
            note: "營業至20:00",
            map: { query: "Rinku Premium Outlets" },
          },
          {
            time: "13:00",
            text: "午餐：Outlet 內餐廳",
            foodGuideLink: "臨空城",
          },
          { time: "18:00", text: "晚餐：TRIAL 超市 (24H) 或 Outlet 餐廳" },
          {
            time: "19:00",
            text: "入住：關西機場華盛頓飯店",
            subText: "Kansai Airport Washington Hotel",
            map: { query: "Kansai Airport Washington Hotel" },
          },
        ],
        highlight: "🛍️ 住機場旁，不用擔心早班機。",
      },
      {
        day: 11,
        date: "1/21 (三)",
        title: "優雅返程",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        time: "08:00 - 10:00",
        activities: [
          {
            time: "08:00",
            text: "交通：前往關西機場",
            subText: "飯店免費接駁車 (約10分)",
          },
          {
            time: "10:00",
            text: "Check-in & 返程",
            note: "帶著戰利品與回憶回家 ✈️",
          },
        ],
        highlight: "✈️ 完美與充滿回憶的旅程。",
      },
    ],
  },
];

// 預算資料
export const budgetData = [
  { item: "機票 (TPE-KIX)", cost: 42000, note: "約 $9,240 TWD (來回估算)" },
  { item: "交通 (近鐵周遊券)", cost: 6900, note: "約 $1,518 TWD (5日券 plus)" },
  {
    item: "交通 (特急券/其他)",
    cost: 7320,
    note: "約 $1,610 TWD (特急券 ¥4,320 + 其他 ¥3,000)",
  },
  {
    item: "住宿 (10泊)",
    cost: 72000,
    note: "約 $15,840 TWD (含 OMO, VISON x2, 寶生苑, 大阪x3, 華盛頓)",
  },
  { item: "餐飲費", cost: 30000, note: "約 $6,600 TWD (每日素食)" },
  { item: "娛樂費", cost: 3000, note: "約 $660 TWD (空庭溫泉、西班牙遊船)" },
];

// 推薦路線 (行程地圖用)
export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1",
    type: "route",
    name: "機場 → Outlet → OMO",
    origin: "Kansai International Airport",
    destination: "OMO Kansai Airport",
    desc: "接駁巴士/南海電鐵",
    duration: "20分",
  },
  {
    id: 2,
    day: "Day 2",
    type: "route",
    name: "OMO → 難波 → VISON",
    origin: "Kansai Airport Station",
    destination: "VISON Mie",
    desc: "南海電鐵+近鐵特急+巴士",
    duration: "3.5hr",
  },
  {
    id: 3,
    day: "Day 3",
    type: "search",
    name: "VISON 園區連住",
    query: "VISON Mie",
    desc: "園區內移動，無長途交通",
    duration: "—",
  },
  {
    id: 4,
    day: "Day 4",
    type: "route",
    name: "VISON → 伊勢神宮",
    origin: "VISON Mie",
    destination: "Ise Jingu Naiku",
    desc: "巴士+近鐵特急",
    duration: "1.5hr",
  },
  {
    id: 5,
    day: "Day 5",
    type: "route",
    name: "伊勢市 → 賢島",
    origin: "Iseshi Station",
    destination: "Kashikojima Station",
    desc: "近鐵特急",
    duration: "50分",
  },
  {
    id: 6,
    day: "Day 6",
    type: "route",
    name: "賢島 → 大阪難波",
    origin: "Kashikojima Station",
    destination: "Osaka-Namba Station",
    desc: "近鐵特急",
    duration: "2h20m",
  },
  {
    id: 7,
    day: "Day 7",
    type: "route",
    name: "梅田 → USJ",
    origin: "Umeda Station",
    destination: "Universal Studios Japan",
    desc: "JR環狀線+夢咲線",
    duration: "30分",
  },
  {
    id: 8,
    day: "Day 8",
    type: "route",
    name: "USJ → 空庭溫泉",
    origin: "Universal City Station",
    destination: "Solaniwa Onsen Osaka",
    desc: "JR至弁天町",
    duration: "15分",
  },
  {
    id: 9,
    day: "Day 9",
    type: "search",
    name: "大阪自由活動",
    query: "Osaka Station",
    desc: "市區移動",
    duration: "—",
  },
  {
    id: 10,
    day: "Day 10",
    type: "route",
    name: "大阪 → 臨空城",
    origin: "Namba Station",
    destination: "Rinku Town Station",
    desc: "南海電鐵",
    duration: "40分",
  },
  {
    id: 11,
    day: "Day 11",
    type: "route",
    name: "飯店 → 機場",
    origin: "Kansai Airport Washington Hotel",
    destination: "Kansai International Airport",
    desc: "飯店免費接駁車",
    duration: "10分",
  },
];

// 實用連結
export const usefulLinks = {
  categories: [
    {
      type: "ticket",
      label: "交通票券",
      icon: "Train",
      items: [
        {
          name: "關西國際機場",
          day: "Day 1, 11",
          url: "https://www.kansai-airport.or.jp/tw/",
        },
        {
          name: "近鐵周遊券 5日券 plus",
          day: "Day 2-6",
          url: "https://www.kintetsu.co.jp/foreign/chinese-han/ticket/krp_plus.html",
        },
      ],
    },
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [
        {
          name: "OMO 關西機場 by 星野",
          day: "Day 1",
          url: "https://hoshinoresorts.com/zh_tw/hotels/omokansaiairport/",
        },
        { name: "Hotel VISON", day: "Day 2-3", url: "https://vison.jp/stay/" },
        { name: "賢島寶生苑", day: "Day 5", url: "https://www.hojoen.com/" },
        {
          name: "關西機場華盛頓飯店",
          day: "Day 9",
          url: "https://washington-hotels.jp/kansai/",
        },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        {
          name: "Rinku Premium Outlets",
          day: "Day 1, 10",
          url: "https://www.premiumoutlets.co.jp/cht/rinku/",
        },
        { name: "VISON 度假園區", day: "Day 2-3", url: "https://vison.jp/" },
        { name: "伊勢神宮", day: "Day 4", url: "https://www.isejingu.or.jp/" },
        {
          name: "USJ 環球影城",
          day: "Day 7-8",
          url: "https://www.usj.co.jp/web/zh/tw",
        },
        { name: "空庭溫泉", day: "Day 8", url: "https://solaniwa.com/" },
      ],
    },
  ],
};

// 近鐵特急比較表
export const kintetsuComparisonData = [
  {
    day: "Day 2",
    route: "大阪難波 → 松阪",
    regular: "約 100~120 分",
    express: "約 80 分",
    cost: "¥1,640",
  },
  {
    day: "Day 4",
    route: "松阪 → 伊勢市",
    regular: "約 25~30 分",
    express: "約 15~18 分",
    cost: "¥520",
  },
  {
    day: "Day 5",
    route: "伊勢市 → 賢島",
    regular: "約 60 分",
    express: "約 45~50 分",
    cost: "¥520",
  },
  {
    day: "Day 6",
    route: "賢島 → 大阪難波",
    regular: "約 3.5~4 小時",
    express: "約 2h20m",
    cost: "¥1,640",
  },
];

// 特急列車加購價格表 (難波⇄松阪)
export const expressPricingData = [
  {
    train: "志摩之風",
    seat: "展望席",
    price: "¥2,690",
    note: "特急 ¥1,640 + 車廂 ¥1,050",
  },
  {
    train: "Liner 豪華",
    seat: "Deluxe",
    price: "¥2,160",
    note: "特急 ¥1,640 + 車廂 ¥520",
  },
  { train: "Liner 一般", seat: "Regular", price: "¥1,640", note: "僅特急費" },
  { train: "Vista Car", seat: "二樓席", price: "¥1,640", note: "僅特急費" },
  { train: "一般特急", seat: "標準", price: "¥1,640", note: "僅特急費" },
];

// 美食指南資料
export const foodData = {
  categories: [
    {
      location: "臨空城",
      day: "Day 1, 10",
      sections: [
        {
          title: "🍽️ Outlet 美食",
          items: [
            {
              name: "Kua Aina Sandwich Shop",
              type: "漢堡",
              desc: "夏威夷風漢堡店，¥1,000~2,000",
              rating: "4.0★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kua+Aina+Rinku",
            },
            {
              name: "CRAZY SPICE",
              type: "印度菜",
              desc: "印度咖哩，素食友善，¥1,000~2,000",
              rating: "3.7★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=CRAZY+SPICE+Rinku",
            },
            {
              name: "薩莉亞 臨空SEACLE店",
              type: "義式",
              desc: "平價義式餐廳，闔家皆宜，¥1,000~2,000",
              rating: "3.8★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Saizeriya+Rinku+SEACLE",
            },
            {
              name: "Mos Burger",
              type: "漢堡",
              desc: "日本連鎖漢堡，有素食堡選項，¥500~1,000",
              rating: "3.6★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Mos+Burger+Rinku",
            },
          ],
        },
      ],
    },
    {
      location: "VISON 園區",
      day: "Day 2-3",
      sections: [
        {
          title: "🥗 素食友善餐廳",
          items: [
            {
              name: "NOUNIYELL (農場餐廳)",
              type: "義式料理",
              desc: "有機蔬菜料理 (沙拉/時蔬麵/Pizza)，¥1,500~3,500",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=NOUNIYELL+VISON",
            },
            {
              name: "raf",
              type: "咖啡廳",
              desc: "當季蔬菜濃湯、咖哩，¥800~1,200",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=raf+cafe+VISON",
            },
            {
              name: "豊農米蔵",
              type: "米飯料理",
              desc: "鹽味飯糰可食 (味噌湯含魚湯)，¥500~1,000",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=豊農米蔵+VISON",
            },
          ],
        },
        {
          title: "🍳 早餐選項",
          items: [
            {
              name: "嬉野とうふ のせ",
              type: "豆腐定食",
              desc: "現做溫豆腐定食 (含早餐)",
              note: "⚠️ 需預約",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=嬉野とうふ+VISON",
            },
            {
              name: "VISON Buffet",
              type: "自助餐",
              desc: "和洋自助餐 (含早餐)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Hotel+VISON+Restaurant",
            },
            {
              name: "NOUNIYELL",
              type: "西式",
              desc: "蛋料理+沙拉 (含早餐)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=NOUNIYELL+VISON",
            },
            {
              name: "Confiture H",
              type: "法式",
              desc: "法式吐司 (含早餐)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Confiture+H+VISON",
            },
            {
              name: "Mariage de Farine",
              type: "麵包店",
              desc: "現烤麵包+咖啡 (自由入店)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Mariage+de+Farine+VISON",
            },
            {
              name: "猿田彥珈琲",
              type: "咖啡",
              desc: "熱三明治+咖啡 (自由入店)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=猿田彦珈琲+VISON",
            },
          ],
        },
        {
          title: "🍫 甜點/購物",
          items: [
            {
              name: "LE CHOCOLAT DE H",
              type: "巧克力專賣店",
              desc: "辻口博啓主理，60+種巧克力",
              note: "VISON 限定款 Meyer Lemon",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=LE+CHOCOLAT+DE+H+VISON",
            },
            {
              name: "Mariage de Farine",
              type: "麵包店",
              desc: "三重縣產小麥石臼現磨",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Mariage+de+Farine+VISON",
            },
            {
              name: "EGUN ON",
              type: "巴斯克起司塔",
              desc: "濃郁綿密的重乳酪口感",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=EGUN+ON+VISON",
            },
          ],
        },
      ],
    },
    {
      location: "伊勢",
      day: "Day 4",
      sections: [
        {
          title: "⛩️ 外宮參道 / 伊勢市站周邊",
          items: [
            {
              name: "Kishin (喜心)",
              type: "純素日式定食",
              desc: "九格小菜+味噌湯",
              recommended: true,
              mapUrl: "https://maps.app.goo.gl/iVnL3LNxxyXR6LCZA",
            },
            {
              name: "Killbilli",
              type: "可麗餅",
              desc: "復古美式風格，日式可麗餅",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Killbilli+Ise",
            },
            {
              name: "Camino Coffee",
              type: "咖啡廳",
              desc: "站前烘焙咖啡，早餐供蜂蜜起司吐司",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Camino+Coffee+Ise",
            },
            {
              name: "Hanakago'me",
              type: "創意蒸料理",
              desc: "當地食材蒸籠料理",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Hanakago'me+Ise",
            },
          ],
        },
        {
          title: "🍡 內宮前 托福橫丁",
          items: [
            {
              name: "赤福 本店",
              type: "和菓子",
              desc: "伊勢名物，紅豆麻糬",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=赤福+托福橫丁",
            },
            {
              name: "五十鈴川河畔 豆腐屋",
              type: "豆腐",
              desc: "豆腐田樂、湯豆腐 (醬汁含魚湯)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=伊勢+豆腐屋",
            },
            {
              name: "伊勢烏龍 ふくすけ",
              type: "麵食",
              desc: "濃口醬油烏龍麵 (醬汁含魚湯)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=伊勢うどん+ふくすけ",
            },
            {
              name: "豆腐冰淇淋",
              type: "甜點",
              desc: "濃郁豆香",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=豆腐+アイス+おかげ横丁",
            },
          ],
        },
      ],
    },
    {
      location: "賢島",
      day: "Day 5-6",
      sections: [
        {
          title: "☕ 咖啡廳",
          items: [
            {
              name: "カフェ エントラーダ",
              type: "咖啡廳",
              desc: "潛艇堡咖啡廳",
              rating: "4.9★",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=カフェ+エントラーダ+志摩",
            },
            {
              name: "カフェ サミエール",
              type: "咖啡廳",
              desc: "賢島站 2F，簡餐蛋糕捲",
              rating: "3.7★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=カフェ+サミエール+賢島",
            },
          ],
        },
      ],
    },
    {
      location: "大阪 梅田",
      day: "Day 7-10",
      sections: [
        {
          title: "🍜 素食友善餐廳",
          items: [
            {
              name: "[東梅田] 素食串燒 あじゅ",
              type: "居酒屋",
              desc: "純素串燒、大阪燒體驗",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=あじゅ+梅田+素食串燒",
            },
            {
              name: "[東梅田] おにぎりごりちゃん 中崎町本店",
              type: "飯糰",
              desc: "手作飯糰＋茶泡飯專賣店（上次吃的分店）",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=おにぎりごりちゃん+中崎町本店",
            },
            {
              name: "[東梅田] MOON and BACK HEP FIVE",
              type: "拉麵",
              desc: "純素擔擔麵、蒸餃",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=MOON+and+BACK+HEP+FIVE",
            },
            {
              name: "[梅田北口] Vegan and Gluten Free Osaka",
              type: "全素",
              desc: "大阪燒、章魚燒、拉麵、串炸 (完全素食)",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Vegan+and+Gluten+Free+Osaka",
            },
            {
              name: "[梅田南口] 松葉ルクア大阪店",
              type: "串炸",
              desc: "LUCUA 內知名串炸（上次吃的）",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=松葉+ルクア大阪店",
            },
            {
              name: "[福島] 花くじら (Hanakujira)",
              type: "關東煮",
              desc: "大阪必吃關東煮 (⚠️湯頭含魚)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=花くじら+福島",
            },
          ],
        },
        {
          title: "🍰 甜點/麵包",
          items: [
            // LUCUA
            {
              name: "TRUFFLE mini LUCUA",
              type: "麵包",
              desc: "白松露鹽可頌 (LUCUA 1100 2F)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=TRUFFLE+mini+LUCUA",
            },
            {
              name: "Daniel",
              type: "可麗露",
              desc: "神戶人氣可麗露 (LUCUA 1F)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Daniel+LUCUA",
            },
            {
              name: "PRESS BUTTER SAND",
              type: "伴手禮",
              desc: "焦糖奶油夾心餅 (LUCUA B1F)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=PRESS+BUTTER+SAND+LUCUA",
            },
            // 大丸梅田
            {
              name: "HARBS 大丸梅田店",
              type: "蛋糕",
              desc: "招牌水果千層蛋糕 (大丸梅田 6F)",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=HARBS+大丸梅田店",
            },
            // 阪急百貨
            {
              name: "GRAND Calbee 阪急梅田店",
              type: "薯片",
              desc: "現炸厚切薯片 (阪急百貨 B1F)",
              rating: "3.9★",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=GRAND+Calbee+阪急梅田",
            },
            // Diamor 地下街
            {
              name: "HARBS Diamor大阪店",
              type: "蛋糕",
              desc: "地下街分店，同款美味",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=HARBS+Diamor大阪店",
            },
            // 天神橋筋商店街
            {
              name: "Orange Fields Bread Factory",
              type: "法式吐司",
              desc: "天神橋筋商店街，超厚法式吐司",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Orange+Fields+Bread+Factory",
            },
            {
              name: "Maruyama Crêpe",
              type: "可麗餅",
              desc: "天神橋筋商店街，人氣法式薄餅店",
              rating: "4.6★",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Maruyama+Crepe+梅田",
            },
          ],
        },
      ],
    },
    {
      location: "USJ 環球影城",
      day: "Day 7-8",
      url: "https://www.usj.co.jp/web/zh/tw/service-guide/barrier-free/dietary-restriction/plant-based-menu",
      sections: [
        {
          title: "🍕 園區內美食",
          items: [
            {
              name: "[哈利波特] 三根掃帚",
              type: "西洋料理",
              desc: "愛爾蘭燉蔬菜 (含沙拉與麵包) / 奶油啤酒",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Three+Broomsticks+USJ",
            },
            {
              name: "[任天堂] 奇諾比奧咖啡店",
              type: "主題餐廳",
              desc: "大蘑菇披薩 / 耀西水果蔬菜沙拉 / 蘑菇濃湯",
              note: "⚠️ 需抽取整理券",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kinopio's+Cafe+USJ",
            },
            {
              name: "[紐約] 彩道 SAIDO",
              type: "日式料理",
              desc: "天婦羅御膳 (精緻日式定食，含素麵)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Restaurant+Saido+USJ",
            },
            {
              name: "[好萊塢] 比佛利咖啡店",
              type: "輕食咖啡",
              desc: "多彩蔬菜三明治 / 季節蛋糕 / 拿鐵",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Beverly+Hills+Boulangerie+USJ",
            },
            {
              name: "[侏羅紀] 失落的世界",
              type: "越式料理",
              desc: "蔬菜河粉 (越式熱湯麵，口味清淡)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Lost+World+Restaurant+USJ",
            },
          ],
        },
        {
          title: "🌐 Citywalk 周邊 (園區外)",
          items: [
            {
              name: "薩莉亞",
              type: "義式平價",
              desc: "瑪格麗特披薩 / 起司玉米披薩 / 飲料吧 (⚠️ 記得去培根)",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Saizeriya+Universal+Citywalk",
            },
            {
              name: "Shake Shack",
              type: "漢堡",
              desc: "'Shroom Burger (炸大波特菇) / 起司波浪薯條",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Shake+Shack+Universal+Citywalk",
            },
            {
              name: "MOS BURGER",
              type: "漢堡",
              desc: "Green Burger (植物肉排，口感清爽)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Mos+Burger+Universal+Citywalk",
            },
            {
              name: "Hard Rock Cafe",
              type: "美式餐廳",
              desc: "Impossible™ Burger (植物肉) / 凱薩沙拉 (去培根)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Hard+Rock+Cafe+Universal+Citywalk",
            },
            {
              name: "Red Lobster",
              type: "義式/海鮮",
              desc: "起司披薩 / 蔬菜義大利麵 / 起司比司吉",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Red+Lobster+Universal+Citywalk",
            },
          ],
        },
      ],
    },
  ],
};

// 購物清單資料
// 圖片請放在 src/assets/images/products/ 資料夾中
// import kissMeImg from '../../../assets/images/products/kissme_remover.jpg';

export const shoppingData = {
  targetStores: ["LUCUA 1100", "唐吉訶德"],
  categories: [
    {
      title: "卸妝",
      subtitle: "最重要的步驟，長粉刺的關鍵戰場",
      icon: "🧴",
      items: [
        {
          func: "卸睫毛",
          type: "必買",
          name: "Kiss Me 睫毛膏卸除液",
          nameJp: "キスミー ヒロインメイク スピーディーマスカラリムーバー",
          desc: "粉藍色漸層瓶",
          price: 924,
          image: "/me/images/products/kissme_remover.png",
          note: "【唯一解鎖鑰匙】沒買到它之前，請勿刷睫毛膏",
          mustBuy: true,
        },
        {
          func: "卸妝",
          type: "試用",
          name: "DUO 卸妝膏 (20g 迷你罐)",
          nameJp: "DUO ザ クレンジングバーム ミニ",
          desc: "💛 黃色-深層淨化",
          price: 880,
          image: "/me/images/products/duo_mini_20g.jpg",
          note: "【粉刺終結者 - 試用】先買小罐這幾天旅行用，測試膚感 (若無黃色，改買紅色)",
        },
        {
          func: "卸妝",
          type: "囤貨",
          name: "DUO 卸妝膏 (90g)",
          nameJp: "DUO ザ クレンジングバーム",
          desc: "💛 黃色-深層淨化",
          price: 3960,
          image: "/me/images/products/duo_cleansing_balm_90g.png",
          note: "【囤貨帶回台灣】若小罐好用，回程買大罐放托運",
        },
      ],
    },
    {
      title: "保養",
      subtitle: "針對乾燥、黑眼圈與藍光疲勞",
      icon: "💆",
      items: [
        {
          func: "眼霜",
          type: "必買",
          name: "SANA 豆乳眼霜",
          nameJp: "サナ なめらか本舗 目元ふっくらクリーム",
          price: 900,
          image: "/me/images/products/sana_eye_cream.png",
          note: "【妝前消腫】早上妝前使用，讓眼下不卡紋",
        },
        {
          func: "眼霜",
          type: "必買",
          name: "Melano CC 集中對策眼霜",
          nameJp: "メラノCC 集中対策 目もと集中美容液",
          price: 1100,
          image: "/me/images/products/melano_cc_eye.png",
          note: "【去黑眼圈】晚上使用，針對色素沈澱",
        },
        {
          func: "化妝水",
          type: "首選",
          name: "肌研化妝水 白潤Premium",
          nameJp: "肌ラボ 白潤プレミアム 薬用浸透美白化粧水",
          desc: "清爽型",
          price: 990,
          image: "/me/images/products/hada_labo_premium.png",
          note: "【美白化妝水】含傳明酸，適合想改善暗沉",
        },
        {
          func: "化妝水",
          type: "備案",
          name: "肌研化妝水 綠瓶補充包",
          nameJp: "肌ラボ 極潤 ヒアルロン液 つめかえ用",
          price: 700,
          image: "/me/images/products/hada_labo_refill.png",
          note: "【囤貨帶回台灣】愛用品補貨，放托運",
          isBackup: true,
        },
        {
          func: "眼藥水",
          type: "必買",
          name: "Rohto Digi-Eye",
          nameJp: "ロート デジアイ",
          desc: "鮮黃色盒子",
          price: 680,
          image: "/me/images/products/rohto_digi_eye.png",
          note: "【藍光修復眼藥水】針對長時間盯電腦。含B2 (液體黃色)，請裸眼使用",
          warning: true,
        },
      ],
    },
    {
      title: "上妝",
      subtitle: "遮瑕 → 底妝 → 眼線 → 臥蠶",
      icon: "💄",
      items: [
        {
          func: "遮瑕",
          type: "首選",
          name: "Visee 紅色遮瑕盤",
          nameJp: "ヴィセ リシェ レッドトリック アイコンシーラー",
          desc: "Red Trick Iconcealer",
          price: 1210,
          image: "/me/images/products/visee_concealer.png",
          note: "【高CP值戰神】認明紅色格。先紅再膚。優點：便宜、輕薄、不易失手",
        },
        {
          func: "遮瑕",
          type: "備案",
          name: "&be 雙色遮瑕膏",
          nameJp: "アンドビー ファンシーラー",
          desc: "Fanシーler",
          price: 3850,
          image: "/me/images/products/andbe_concealer.png",
          note: "【貴婦保濕神物】若現場試用 Visee 覺得乾，改買這盤。優點：極潤、橘色校正力更強",
          isBackup: true,
        },
        {
          func: "底妝",
          type: "首選",
          name: "CLIO Kill Cover 氣墊",
          nameJp: "クリオ キルカバー ファンウェア クッション オールニュー",
          desc: "色號：03 Linen / 黑方盒",
          price: 2970,
          image: "/me/images/products/clio_cushion.png",
          note: "【混合肌霧面遮瑕】遮瑕度高，持妝好。適合：喜歡無瑕妝感、怕T字出油",
        },
        {
          func: "底妝",
          type: "備案",
          name: "TIRTIR 紅色氣墊",
          nameJp: "ティルティル マスクフィット レッドクッション",
          desc: "Mask Fit Red / 色號：21N",
          price: 2970,
          image: "/me/images/products/tirtir_cushion.png",
          note: "【保濕光澤首選】紅色蛋型。比 CLIO 潤，帶光澤。適合：日本天氣太乾脫皮、喜歡韓系水光",
          isBackup: true,
        },
        {
          func: "眼線",
          type: "補貨",
          name: "KATE持色眼線液筆EX4.0",
          nameJp: "ケイト レアフィットジェルペンシル",
          desc: "色號：BR-1 自然棕",
          price: 1320,
          image: "/me/images/products/kate_eyeliner.png",
          note: "【愛用補貨】日本買比較便宜。畫在睫毛根部，眼神深邃",
        },
        {
          func: "臥蠶",
          type: "必買",
          name: "Cezanne 雙眼皮/臥蠶眼線液",
          nameJp: "セザンヌ 描くふたえアイライナー",
          desc: "色號：10 影用棕",
          price: 660,
          image: "/me/images/products/cezanne_eyeliner.png",
          note: "【內雙放大術】畫在臥蠶下方陰影，記得暈開。搭配家裡的 Canmake 腮紅打亮臥蠶肉",
          mustBuy: true,
        },
      ],
    },
  ],
};

// 待訂清單資料
export const todoData = [
  { category: "交通", item: "機票 (TPE-KIX)" },
  { category: "交通", item: "機場接送服務" },
  { category: "交通", item: "近鐵電車周遊券 5日券plus" },
  { category: "交通", item: "觀光特急 志摩之風 (Shimakaze)" },
  {
    category: "交通",
    item: "近鐵特急 (大阪-松阪 / Ise-Shima Liner 或 Vista Car)",
  },
  { category: "景點", item: "空庭溫泉 (含岩盤浴套票)" },
  { category: "通訊", item: "日本上網 eSIM" },
  { category: "住宿", item: "Hotel Vison" },
  { category: "住宿", item: "賢島寶生苑" },
];
