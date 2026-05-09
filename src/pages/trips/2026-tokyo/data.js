/**
 * 2026 東京 8日行程資料
 * 路線：成田→橫濱→東京→輕井澤→東京→返程
 * 時間：2026 年 6/17 (二) ~ 6/24 (二)
 */

// ★ 航班資訊
export const flightData = {
  outbound: {
    airline: "TBD",
    flightNo: "TBD",
    date: "6/17 (二)",
    time: { depart: "TBD", arrive: "TBD" },
    airport: { depart: "TPE 桃園", arrive: "NRT 成田" },
    terminal: { depart: "T2", arrive: "T1" },
    duration: "約3小時",
    note: "抵達後直接前往橫濱",
  },
  inbound: {
    airline: "TBD",
    flightNo: "TBD",
    date: "6/24 (二)",
    time: { depart: "TBD", arrive: "TBD" },
    airport: { depart: "NRT 成田", arrive: "TPE 桃園" },
    terminal: { depart: "T1", arrive: "T2" },
    duration: "約3小時",
    note: "",
  },
};

// ★ 行程概覽
export const overviewData = [
  { day: 1, date: "6/17 (二)", title: "抵達成田 → 橫濱", hotel: "橫濱" },
  { day: 2, date: "6/18 (三)", title: "橫濱深度探索", hotel: "橫濱" },
  { day: 3, date: "6/19 (四)", title: "橫濱 → 東京", hotel: "東京" },
  { day: 4, date: "6/20 (五)", title: "東京 Day 1", hotel: "東京" },
  { day: 5, date: "6/21 (六)", title: "東京 Day 2", hotel: "東京" },
  { day: 6, date: "6/22 (日)", title: "東京 → 輕井澤", hotel: "輕井澤" },
  { day: 7, date: "6/23 (一)", title: "輕井澤 → 東京", hotel: "東京" },
  { day: 8, date: "6/24 (二)", title: "返程", hotel: "✈️ 回家" },
];

// ★ 每日行程
export const itineraryData = [
  {
    phase: "橫濱 (Day 1-2)",
    image:
      "https://images.unsplash.com/photo-1588959977869-e8d52dc1aab4?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 1,
        date: "6/17 (二)",
        title: "抵達成田 → 橫濱",
        image:
          "https://images.unsplash.com/photo-1588959977869-e8d52dc1aab4?q=80&w=2070&auto=format&fit=crop",
        time: "TBD - 住宿橫濱",
        highlight: "✈️ 抵達成田，直奔橫濱港都",
        activities: [
          {
            time: "TBD",
            text: "抵達成田機場 (NRT T1)",
            map: {
              type: "search",
              query: "Narita International Airport Terminal 1",
            },
          },
          {
            time: "TBD",
            text: "交通：成田 → 橫濱",
            subText: "成田特快 N'EX 直達橫濱站（約90分）",
            note: "建議購買 Suica IC 卡",
            map: {
              type: "route",
              origin: "Narita Airport Terminal 1",
              destination: "Yokohama Station",
            },
          },
          {
            time: "傍晚",
            text: "Check-in 橫濱旅館",
            map: { type: "search", query: "Yokohama Hotel" },
          },
          {
            time: "晚上",
            text: "橫濱中華街初探",
            subText: "消夜或宵夜，感受港都氛圍",
            foodGuideLink: "橫濱",
            map: { type: "search", query: "Yokohama Chinatown" },
          },
        ],
      },
      {
        day: 2,
        date: "6/18 (三)",
        title: "橫濱深度探索",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "⚓ 紅磚倉庫・港未來・三溪園",
        activities: [
          {
            time: "上午",
            text: "三溪園",
            subText: "傳統日式庭園，6月有菖蒲花盛開",
            map: { type: "search", query: "Sankeien Garden Yokohama" },
          },
          {
            time: "下午",
            text: "紅磚倉庫 (赤レンガ倉庫)",
            subText: "購物、海景餐廳",
            map: { type: "search", query: "Yokohama Red Brick Warehouse" },
          },
          {
            time: "傍晚",
            text: "港未來 (みなとみらい) 夜景",
            map: { type: "search", query: "Minato Mirai Yokohama" },
          },
          {
            time: "晚上",
            text: "晚餐：橫濱港區",
            foodGuideLink: "橫濱",
          },
        ],
      },
    ],
  },
  {
    phase: "東京 (Day 3-5)",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 3,
        date: "6/19 (四)",
        title: "橫濱 → 東京",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop",
        time: "上午移動",
        highlight: "🗼 入住東京，開始市區探索",
        activities: [
          {
            time: "上午",
            text: "交通：橫濱 → 東京",
            subText: "JR 湘南新宿ライン（約30分）",
            map: {
              type: "route",
              origin: "Yokohama Station",
              destination: "Shinjuku Station",
            },
          },
          {
            time: "上午",
            text: "Check-in 東京旅館",
            map: { type: "search", query: "Shinjuku Hotel Tokyo" },
          },
          {
            time: "下午",
            text: "淺草寺・仲見世通",
            subText: "東京最古老寺廟，雷門打卡",
            map: { type: "search", query: "Senso-ji Temple Asakusa" },
          },
          {
            time: "傍晚",
            text: "上野公園・阿美橫丁",
            map: { type: "search", query: "Ameya-Yokocho Ueno" },
          },
          {
            time: "晚上",
            text: "晚餐：上野/淺草周邊",
            foodGuideLink: "東京 淺草",
          },
        ],
      },
      {
        day: 4,
        date: "6/20 (五)",
        title: "東京 Day 1 — 地標精華",
        image:
          "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "🌆 秋葉原・原宿・表參道",
        activities: [
          {
            time: "上午",
            text: "秋葉原電器街",
            subText: "電器、動漫周邊、免稅購物",
            map: { type: "search", query: "Akihabara Electric Town Tokyo" },
          },
          {
            time: "下午",
            text: "原宿・竹下通",
            subText: "年輕潮流、可麗餅、街頭文化",
            map: { type: "search", query: "Takeshita Street Harajuku" },
          },
          {
            time: "傍晚",
            text: "表參道・青山",
            subText: "精品購物、咖啡廳",
            map: { type: "search", query: "Omotesando Tokyo" },
          },
          {
            time: "晚上",
            text: "晚餐：表參道/南青山",
            foodGuideLink: "東京 新宿",
          },
        ],
      },
      {
        day: 5,
        date: "6/21 (六)",
        title: "東京 Day 2 — 購物衝刺",
        image:
          "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop",
        time: "全日",
        highlight: "🛍️ 新宿・涉谷・藥妝掃貨",
        activities: [
          {
            time: "上午",
            text: "新宿藥妝・百貨",
            subText: "松本清、唐吉訶德、伊勢丹",
            map: { type: "search", query: "Shinjuku Shopping Tokyo" },
          },
          {
            time: "下午",
            text: "涉谷 Scramble Square / Hikarie",
            map: { type: "search", query: "Shibuya Scramble Square" },
          },
          {
            time: "傍晚",
            text: "新宿御苑散步 (可選)",
            subText: "6月綠意盎然，免費入場",
            map: { type: "search", query: "Shinjuku Gyoen National Garden" },
          },
          {
            time: "晚上",
            text: "最後東京晚餐",
            foodGuideLink: "東京 新宿",
          },
        ],
      },
    ],
  },
  {
    phase: "輕井澤 (Day 6-7)",
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 6,
        date: "6/22 (日)",
        title: "東京 → 輕井澤",
        image:
          "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=2070&auto=format&fit=crop",
        time: "上午出發",
        highlight: "🌿 高原避暑 + Outlet 購物天堂",
        activities: [
          {
            time: "上午",
            text: "交通：東京 → 輕井澤",
            subText: "北陸新幹線 はくたか（約80分）",
            note: "從東京站出發，建議早班新幹線（週日人多，建議提前訂位）",
            map: {
              type: "route",
              origin: "Tokyo Station",
              destination: "Karuizawa Station",
            },
          },
          {
            time: "午後",
            text: "輕井澤 Prince Shopping Plaza",
            subText: "Outlet，約 240 家品牌，週日人潮較多宜早到",
            map: { type: "search", query: "Karuizawa Prince Shopping Plaza" },
          },
          {
            time: "傍晚",
            text: "舊輕井澤銀座通",
            subText: "老街散步、Mikado Coffee 摩卡冰淇淋",
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
        day: 7,
        date: "6/23 (一)",
        title: "輕井澤晨遊 → 返東京",
        image:
          "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=2070&auto=format&fit=crop",
        time: "上午晨遊，下午返京",
        highlight: "🍃 白絲瀑布・雲場池，最後採購",
        activities: [
          {
            time: "清晨",
            text: "雲場池散步",
            subText: "輕井澤最美倒影湖，晨霧絕景",
            map: { type: "search", query: "Kumoba Pond Karuizawa" },
          },
          {
            time: "上午",
            text: "白絲瀑布 (可選)",
            map: { type: "search", query: "Shiraito Falls Karuizawa" },
          },
          {
            time: "中午",
            text: "午餐後前往輕井澤站",
          },
          {
            time: "下午",
            text: "交通：輕井澤 → 東京",
            subText: "北陸新幹線，約80分回東京站",
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Tokyo Station",
            },
          },
          {
            time: "傍晚",
            text: "成田機場附近或東京市區休整",
          },
        ],
      },
    ],
  },
  {
    phase: "返程 (Day 8)",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 8,
        date: "6/24 (二)",
        title: "返程",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        time: "TBD",
        highlight: "✈️ 帶著戰利品和回憶回家",
        activities: [
          {
            time: "TBD",
            text: "前往成田機場",
            subText: "N'EX 或 Sky Liner",
            map: {
              type: "route",
              origin: "Shinjuku Station",
              destination: "Narita Airport Terminal 1",
            },
          },
          {
            time: "TBD",
            text: "回程班機 NRT → TPE",
          },
        ],
      },
    ],
  },
];

// ★ 預算明細
export const budgetData = [
  { item: "機票 (TPE-NRT 來回)", cost: 0, note: "待確認" },
  { item: "交通 (N'EX/新幹線/Suica)", cost: 18000, note: "約 ¥18,000 估算" },
  { item: "住宿 (7泊)", cost: 49000, note: "約 ¥49,000 (橫濱2+東京4+輕井澤1)" },
  { item: "餐飲費", cost: 22000, note: "約 ¥22,000 估算" },
  { item: "購物/景點", cost: 30000, note: "視購物清單調整" },
];

// ★ 交通路線
export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1",
    type: "route",
    name: "成田 → 橫濱",
    origin: "Narita Airport Terminal 1",
    destination: "Yokohama Station",
    desc: "N'EX 成田特快直達橫濱",
    duration: "約90分",
  },
  {
    id: 2,
    day: "Day 3",
    type: "route",
    name: "橫濱 → 東京新宿",
    origin: "Yokohama Station",
    destination: "Shinjuku Station",
    desc: "JR 湘南新宿ライン",
    duration: "約30分",
  },
  {
    id: 3,
    day: "Day 6",
    type: "route",
    name: "東京 → 輕井澤",
    origin: "Tokyo Station",
    destination: "Karuizawa Station",
    desc: "北陸新幹線 はくたか（週日建議提前訂位）",
    duration: "約80分",
  },
  {
    id: 4,
    day: "Day 7",
    type: "route",
    name: "輕井澤 → 東京",
    origin: "Karuizawa Station",
    destination: "Tokyo Station",
    desc: "北陸新幹線",
    duration: "約80分",
  },
  {
    id: 5,
    day: "Day 8",
    type: "route",
    name: "新宿 → 成田機場",
    origin: "Shinjuku Station",
    destination: "Narita Airport Terminal 1",
    desc: "N'EX 成田特快",
    duration: "約90分",
  },
];

// ★ 實用連結
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
          day: "Day 1, 8",
          url: "https://www.jreast.co.jp/tc/pass/nex.html",
        },
        {
          name: "北陸新幹線訂票 (JR East)",
          day: "Day 6-7",
          url: "https://www.jreast.co.jp/tc/",
        },
      ],
    },
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [
        { name: "橫濱旅館 (待確認)", day: "Day 1-2", url: "" },
        { name: "東京旅館 (待確認)", day: "Day 3-5, 7", url: "" },
        { name: "輕井澤旅館 (待確認)", day: "Day 6", url: "" },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        { name: "三溪園", day: "Day 2", url: "https://www.sankeien.or.jp/" },
        {
          name: "橫濱 紅磚倉庫",
          day: "Day 2",
          url: "https://www.yokohama-akarenga.jp/tw/",
        },
        {
          name: "輕井澤 Prince Shopping Plaza",
          day: "Day 6",
          url: "https://www.karuizawa-psp.jp/tw/",
        },
      ],
    },
  ],
};

// ★ 美食指南
export const foodData = {
  categories: [
    {
      location: "東京 淺草",
      day: "Day 3",
      sections: [
        {
          title: "🍜 淺草推薦",
          items: [
            {
              name: "大黒家天麩羅",
              type: "天婦羅",
              desc: "創業1887年老舖，素食炸蔬菜可詢問",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=大黒家天麩羅+浅草",
            },
            {
              name: "梅園",
              type: "和菓子",
              desc: "淺草老舖，あわぜんざい紅豆餅",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=梅園+浅草",
            },
          ],
        },
      ],
    },
    {
      location: "東京 新宿",
      day: "Day 4-5, 7",
      sections: [
        {
          title: "🍜 新宿推薦",
          items: [
            {
              name: "一蘭拉麵 新宿店",
              type: "拉麵",
              desc: "個人隔間博多豚骨，湯底可換素 (需確認)",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=一蘭拉麵+新宿",
            },
            {
              name: "中村藤吉 新宿伊勢丹",
              type: "抹茶甜點",
              desc: "京都老舖，抹茶聖代",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=中村藤吉+新宿伊勢丹",
            },
          ],
        },
      ],
    },
    {
      location: "橫濱",
      day: "Day 1-2",
      sections: [
        {
          title: "🥟 橫濱美食",
          items: [
            {
              name: "聘珍樓",
              type: "廣東點心",
              desc: "中華街百年老舖，蔬菜點心",
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
    {
      location: "輕井澤",
      day: "Day 6-7",
      sections: [
        {
          title: "🌿 輕井澤美食",
          items: [
            {
              name: "Mikado Coffee 舊輕井澤店",
              type: "咖啡廳",
              desc: "輕井澤名物摩卡冰淇淋，必吃",
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
  ],
};

// ★ 購物清單（待規劃）
export const shoppingData = {
  targetStores: ["松本清", "唐吉訶德", "新宿伊勢丹", "輕井澤 Outlet"],
  categories: [],
};

// ★ 待訂清單
export const todoData = [
  { category: "交通", item: "機票 (TPE-NRT 來回，6/17 & 6/24)" },
  { category: "交通", item: "Suica IC 卡 (成田機場取)" },
  { category: "交通", item: "N'EX 成田特快 (來回)" },
  { category: "交通", item: "北陸新幹線 (東京-輕井澤，6/22 週日需提前訂位)" },
  { category: "住宿", item: "橫濱旅館 (Day 1-2，6/17-6/19)" },
  { category: "住宿", item: "東京旅館 (Day 3-5，6/19-6/22)" },
  { category: "住宿", item: "輕井澤旅館 (Day 6，6/22-6/23)" },
  { category: "住宿", item: "東京旅館 (Day 7，6/23-6/24)" },
  { category: "通訊", item: "日本上網 eSIM" },
  { category: "景點", item: "三溪園入場券 (Day 2)" },
  { category: "景點", item: "輕井澤 Outlet 確認週日營業時間" },
];

// ★ 素食溝通卡 (保留)
export const vegetarianCard = {
  restriction: "私は肉と魚介類が食べられません。肉や魚の出汁（だし）もNGです。",
  ok: "でも、卵・乳製品・ネギ・ニンニクは食べられます。",
  dashiQuestion: "この料理に、鰹節や魚の出汁は入っていますか？",
  canEat: [
    "卵 (雞蛋)",
    "乳製品 (牛奶/起司)",
    "玉ねぎ (洋蔥)",
    "ニンニク (大蒜)",
  ],
};
