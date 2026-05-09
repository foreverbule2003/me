/**
 * 2026 東京 7日行程資料
 * 景點：東京市區 / 輕井澤 / 橫濱
 * 時間：2026 年 6 月中旬
 */

// ★ 航班資訊（待確認後填入）
export const flightData = {
  outbound: {
    airline: "TBD",
    flightNo: "TBD",
    date: "6/14 (日)",
    time: { depart: "TBD", arrive: "TBD" },
    airport: { depart: "TPE 桃園", arrive: "NRT 成田" },
    terminal: { depart: "T2", arrive: "T1" },
    duration: "約3小時",
    note: "",
  },
  inbound: {
    airline: "TBD",
    flightNo: "TBD",
    date: "6/21 (日)",
    time: { depart: "TBD", arrive: "TBD" },
    airport: { depart: "NRT 成田", arrive: "TPE 桃園" },
    terminal: { depart: "T1", arrive: "T2" },
    duration: "約3小時",
    note: "",
  },
};

// ★ 行程概覽 (Timeline 用)
export const overviewData = [
  { day: 1, date: "6/14 (日)", title: "抵達東京",        hotel: "TBD" },
  { day: 2, date: "6/15 (一)", title: "東京市區",        hotel: "TBD" },
  { day: 3, date: "6/16 (二)", title: "輕井澤",          hotel: "輕井澤" },
  { day: 4, date: "6/17 (三)", title: "輕井澤 → 橫濱",  hotel: "橫濱" },
  { day: 5, date: "6/18 (四)", title: "橫濱",            hotel: "橫濱" },
  { day: 6, date: "6/19 (五)", title: "東京購物",        hotel: "東京" },
  { day: 7, date: "6/20 (六)", title: "返程準備",        hotel: "✈️ 回家" },
];

// ★ 每日行程
export const itineraryData = [
  {
    phase: "東京・輕井澤・橫濱 (Day 1-7)",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 1,
        date: "6/14 (日)",
        title: "抵達東京",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
        time: "TBD - 住宿",
        highlight: "✈️ 抵達成田機場，進入東京市區。",
        activities: [
          {
            time: "TBD",
            text: "抵達成田機場 (NRT)",
            map: { type: "search", query: "Narita International Airport" },
          },
          {
            time: "TBD",
            text: "交通：機場 → 市區",
            subText: "成田特快 N'EX 或 京成特急 Sky Liner",
            note: "建議購買 Suica IC 卡，方便後續搭乘",
            map: {
              type: "route",
              origin: "Narita Airport Terminal 1",
              destination: "Shinjuku Station",
            },
          },
          {
            time: "TBD",
            text: "Check-in 旅館",
            map: { type: "search", query: "Tokyo Hotel" },
          },
          {
            time: "晚上",
            text: "晚餐：新宿周邊",
            foodGuideLink: "東京 新宿",
          },
        ],
      },
      {
        day: 2,
        date: "6/15 (一)",
        title: "東京市區探索",
        image:
          "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "🗼 東京地標 + 購物散步",
        activities: [
          {
            time: "上午",
            text: "景點 (待規劃)",
            subText: "例如：淺草寺、上野、秋葉原、原宿",
            map: { type: "search", query: "Asakusa Temple Tokyo" },
          },
          {
            time: "下午",
            text: "購物 (待規劃)",
            subText: "例如：表參道、涉谷、新宿",
          },
          {
            time: "晚上",
            text: "晚餐",
            foodGuideLink: "東京 新宿",
          },
        ],
      },
      {
        day: 3,
        date: "6/16 (二)",
        title: "輕井澤",
        image:
          "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=2070&auto=format&fit=crop",
        time: "上午出發",
        highlight: "🌿 高原小鎮，涼爽避暑 + Outlet 購物",
        activities: [
          {
            time: "上午",
            text: "交通：東京 → 輕井澤",
            subText: "北陸新幹線 はくたか (約80分)",
            note: "從東京站出發，建議早班新幹線",
            map: {
              type: "route",
              origin: "Tokyo Station",
              destination: "Karuizawa Station",
            },
          },
          {
            time: "午後",
            text: "輕井澤 Prince Shopping Plaza",
            subText: "Outlet 購物，約 240 家品牌",
            map: { type: "search", query: "Karuizawa Prince Shopping Plaza" },
          },
          {
            time: "傍晚",
            text: "舊輕井澤銀座通",
            subText: "老街散步、咖啡廳",
            map: { type: "search", query: "Kyu-Karuizawa Ginza" },
          },
          {
            time: "晚上",
            text: "晚餐：輕井澤市區",
            foodGuideLink: "輕井澤",
          },
        ],
      },
      {
        day: 4,
        date: "6/17 (三)",
        title: "輕井澤 → 橫濱",
        image:
          "https://images.unsplash.com/photo-1588959977869-e8d52dc1aab4?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "🚃 從高原移動到港都，感受橫濱夜景",
        activities: [
          {
            time: "上午",
            text: "輕井澤晨間散步",
            subText: "白絲瀑布或雲場池",
            map: { type: "search", query: "Shiraito Falls Karuizawa" },
          },
          {
            time: "中午",
            text: "交通：輕井澤 → 橫濱",
            subText: "新幹線至東京，再轉 JR 橫須賀線 or 東海道線",
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Yokohama Station",
            },
          },
          {
            time: "下午",
            text: "Check-in 橫濱旅館",
          },
          {
            time: "傍晚",
            text: "橫濱中華街",
            foodGuideLink: "橫濱",
            map: { type: "search", query: "Yokohama Chinatown" },
          },
          {
            time: "晚上",
            text: "山下公園・港未來夜景",
            map: { type: "search", query: "Yamashita Park Yokohama" },
          },
        ],
      },
      {
        day: 5,
        date: "6/18 (四)",
        title: "橫濱深度探索",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "⚓ 港口都市：紅磚倉庫、港未來、三溪園",
        activities: [
          {
            time: "上午",
            text: "三溪園",
            subText: "傳統日式庭園，6月有菖蒲花",
            map: { type: "search", query: "Sankeien Garden Yokohama" },
          },
          {
            time: "下午",
            text: "紅磚倉庫 (赤レンガ倉庫)",
            subText: "購物、餐廳、海景",
            map: { type: "search", query: "Yokohama Red Brick Warehouse" },
          },
          {
            time: "傍晚",
            text: "港未來 (みなとみらい)",
            map: { type: "search", query: "Minato Mirai Yokohama" },
          },
          {
            time: "晚上",
            text: "晚餐：橫濱港區",
            foodGuideLink: "橫濱",
          },
        ],
      },
      {
        day: 6,
        date: "6/19 (五)",
        title: "東京購物 Day",
        image:
          "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "🛍️ 回東京集中購物，補最後戰利品",
        activities: [
          {
            time: "上午",
            text: "交通：橫濱 → 東京",
            map: {
              type: "route",
              origin: "Yokohama Station",
              destination: "Shinjuku Station",
            },
          },
          {
            time: "上午",
            text: "藥妝 / 電器購物",
            subText: "松本清、唐吉訶德、秋葉原",
          },
          {
            time: "下午",
            text: "百貨 / 商場購物",
            subText: "新宿伊勢丹、表參道 Hills、涉谷 Hikarie",
          },
          {
            time: "晚上",
            text: "最後晚餐",
            foodGuideLink: "東京 新宿",
          },
        ],
      },
      {
        day: 7,
        date: "6/20 (六)",
        title: "返程",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        time: "TBD",
        highlight: "✈️ 帶著戰利品和回憶回家",
        activities: [
          {
            time: "上午",
            text: "退房、前往機場",
            subText: "N'EX 或 Sky Liner",
            map: {
              type: "route",
              origin: "Shinjuku Station",
              destination: "Narita Airport Terminal 1",
            },
          },
          {
            time: "TBD",
            text: "回程班機",
          },
        ],
      },
    ],
  },
];

// 預算明細（骨架，待確認後更新）
export const budgetData = [
  { item: "機票 (TPE-NRT 來回)", cost: 0,     note: "待確認" },
  { item: "交通 (新幹線/IC卡)",  cost: 15000, note: "約 ¥15,000 估算" },
  { item: "住宿 (6泊)",          cost: 42000, note: "約 ¥42,000 估算 (¥7,000/晚)" },
  { item: "餐飲費",              cost: 20000, note: "約 ¥20,000 估算" },
  { item: "購物/景點",           cost: 30000, note: "視購物清單調整" },
];

// 每日交通路線
export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1",
    type: "route",
    name: "機場 → 新宿",
    origin: "Narita Airport Terminal 1",
    destination: "Shinjuku Station",
    desc: "N'EX 成田特快",
    duration: "約90分",
  },
  {
    id: 2,
    day: "Day 3",
    type: "route",
    name: "東京 → 輕井澤",
    origin: "Tokyo Station",
    destination: "Karuizawa Station",
    desc: "北陸新幹線 はくたか",
    duration: "約80分",
  },
  {
    id: 3,
    day: "Day 4",
    type: "route",
    name: "輕井澤 → 橫濱",
    origin: "Karuizawa Station",
    destination: "Yokohama Station",
    desc: "新幹線 → 東京 → JR 東海道線",
    duration: "約2.5小時",
  },
  {
    id: 4,
    day: "Day 6",
    type: "route",
    name: "橫濱 → 東京",
    origin: "Yokohama Station",
    destination: "Shinjuku Station",
    desc: "JR 湘南新宿ライン",
    duration: "約30分",
  },
  {
    id: 5,
    day: "Day 7",
    type: "route",
    name: "新宿 → 成田機場",
    origin: "Shinjuku Station",
    destination: "Narita Airport Terminal 1",
    desc: "N'EX 成田特快",
    duration: "約90分",
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
          name: "Suica (西瓜卡) 申請",
          day: "Day 1",
          url: "https://www.jreast.co.jp/tc/suica/",
        },
        {
          name: "N'EX 成田特快訂票",
          day: "Day 1, 7",
          url: "https://www.jreast.co.jp/tc/pass/nex.html",
        },
        {
          name: "北陸新幹線訂票 (JR East)",
          day: "Day 3-4",
          url: "https://www.jreast.co.jp/tc/",
        },
      ],
    },
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [
        { name: "東京旅館 (待確認)", day: "Day 1-2", url: "" },
        { name: "輕井澤旅館 (待確認)", day: "Day 3", url: "" },
        { name: "橫濱旅館 (待確認)", day: "Day 4-5", url: "" },
        { name: "東京旅館 (待確認)", day: "Day 6", url: "" },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        {
          name: "輕井澤 Prince Shopping Plaza",
          day: "Day 3",
          url: "https://www.karuizawa-psp.jp/tw/",
        },
        {
          name: "橫濱 紅磚倉庫",
          day: "Day 5",
          url: "https://www.yokohama-akarenga.jp/tw/",
        },
        {
          name: "三溪園",
          day: "Day 5",
          url: "https://www.sankeien.or.jp/",
        },
      ],
    },
  ],
};

// 美食指南（骨架，歡迎補充）
export const foodData = {
  categories: [
    {
      location: "東京 新宿",
      day: "Day 1-2, 6-7",
      sections: [
        {
          title: "🍜 推薦餐廳",
          items: [
            {
              name: "一蘭拉麵 新宿店",
              type: "拉麵",
              desc: "個人隔間博多豚骨拉麵",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=一蘭拉麵+新宿",
            },
            {
              name: "俵屋吉富 新宿伊勢丹",
              type: "和菓子",
              desc: "京都老舖和菓子",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=俵屋吉富+新宿伊勢丹",
            },
          ],
        },
      ],
    },
    {
      location: "輕井澤",
      day: "Day 3-4",
      sections: [
        {
          title: "🌿 輕井澤美食",
          items: [
            {
              name: "Mikado Coffee 舊輕井澤店",
              type: "咖啡廳",
              desc: "輕井澤名物摩卡冰淇淋",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Mikado+Coffee+Karuizawa",
            },
            {
              name: "Sawamura 輕井澤",
              type: "麵包店",
              desc: "人氣烘焙坊，早餐首選",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Sawamura+Karuizawa",
            },
          ],
        },
      ],
    },
    {
      location: "橫濱",
      day: "Day 4-6",
      sections: [
        {
          title: "🥟 橫濱美食",
          items: [
            {
              name: "聘珍樓",
              type: "廣東料理",
              desc: "中華街老字號，點心午餐",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=聘珍樓+横浜中華街",
            },
            {
              name: "崎陽軒 横濱駅店",
              type: "燒賣",
              desc: "橫濱名物燒賣，必買伴手禮",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=崎陽軒+横浜駅",
            },
          ],
        },
      ],
    },
  ],
};

// 購物清單（目前空白，待規劃）
export const shoppingData = {
  targetStores: ["松本清", "唐吉訶德", "Don Quijote"],
  categories: [],
};

// 待訂清單
export const todoData = [
  { category: "交通", item: "機票 (TPE-NRT)" },
  { category: "交通", item: "Suica IC 卡 (成田機場取)" },
  { category: "交通", item: "N'EX 成田特快 (來回)" },
  { category: "交通", item: "北陸新幹線 (東京-輕井澤)" },
  { category: "住宿", item: "東京旅館 (Day 1-2)" },
  { category: "住宿", item: "輕井澤旅館 (Day 3)" },
  { category: "住宿", item: "橫濱旅館 (Day 4-5)" },
  { category: "住宿", item: "東京旅館 (Day 6)" },
  { category: "通訊", item: "日本上網 eSIM" },
  { category: "景點", item: "輕井澤 Outlet 確認營業時間" },
  { category: "景點", item: "三溪園入場券" },
];
