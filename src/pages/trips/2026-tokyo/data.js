/**
 * 2026 東京 8日行程資料 v2.0
 * 路線：成田 → 橫濱 → 澀谷 → 輕井澤 → 東京 → 返程
 * 時間：2026/6/17 (三) ~ 6/24 (三)
 */

export const flightData = {
  outbound: {
    airline: "泰國獅航 Thai Lion Air",
    flightNo: "SL394",
    date: "2026/6/17 (三)",
    time: { depart: "12:10", arrive: "16:30" },
    airport: { depart: "TPE 桃園 T1", arrive: "NRT 成田 T1N" },
    aircraft: "波音 737-900",
    cabin: "經濟艙",
    meal: "無餐點",
    baggage: "❗ 無免費託運行李，需另購",
    duration: "約4小時20分",
    note: "抵達後直接搭 N'EX 前往橫濱，免換車",
  },
  inbound: {
    airline: "樂桃航空 Peach Aviation",
    flightNo: "MM625",
    date: "2026/6/24 (三)",
    time: { depart: "16:50", arrive: "19:40" },
    airport: { depart: "NRT 成田 T1", arrive: "TPE 桃園 T1" },
    aircraft: "A320-212",
    cabin: "經濟艙",
    meal: "無餐點",
    baggage: "❗ 部分旅客無免費託運，確認訂單",
    duration: "約2小時50分",
    note: "最晚出發：13:30（東京站）",
  },
};

export const overviewData = [
  {
    day: 1,
    date: "6/17 (三)",
    title: "抵達成田 → 橫濱",
    hotel: "橫濱三井花園",
  },
  { day: 2, date: "6/18 (四)", title: "橫濱探索", hotel: "橫濱/澀谷" },
  { day: 3, date: "6/19 (五)", title: "Shibuya 109 採買", hotel: "澀谷" },
  { day: 4, date: "6/20 (六)", title: "澀谷→輕井澤", hotel: "淺間王子" },
  { day: 5, date: "6/21 (日)", title: "輕井澤慢活", hotel: "輕井澤 APA" },
  { day: 6, date: "6/22 (一)", title: "輕井澤慢活", hotel: "英迪格" },
  { day: 7, date: "6/23 (二)", title: "輕井澤→東京", hotel: "東京" },
  { day: 8, date: "6/24 (三)", title: "返程", hotel: "回家" },
];

export const itineraryData = [
  {
    phase: "橫濱 (Day 1–2)",
    image:
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 1,
        date: "6/17 (三)",
        title: "抵達成田 → 橫濱",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 16:30 抵達成田，N'EX 直達橫濱港都",
        activities: [
          {
            time: "16:30",
            text: "抵達成田機場 NRT T1",
            subText: "提領行李、辦 Suica IC 卡",
            map: {
              type: "search",
              query: "Narita International Airport Terminal 1",
            },
          },
          {
            time: "約17:30",
            text: "搭 N'EX → 橫濱站",
            transport: {
              line: "N'EX 成田特快",
              station: "成田機場 T1 (B1 JR 剪票口)",
              platform: "1、2 號月台",
              note: "全車指定席，外國旅客可購買優惠票 ¥4,070。直達約 90 分鐘。"
            },
            map: {
              type: "route",
              origin: "Narita Airport Terminal 1",
              destination: "Yokohama Station",
            },
          },
          {
            time: "約19:00",
            text: "Check-in 三井花園飯店橫濱港未來普米爾",
            subText: "港未來區高空絕美海景，精緻奢華首夜 🆕",
            map: {
              type: "search",
              query: "Mitsui Garden Hotel Yokohama Minatomirai Premier",
            },
          },
        ],
      },
      {
        day: 2,
        date: "6/18 (四)",
        title: "橫濱探索",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
        highlight: "⚓ 山下公園・紅磚倉庫・港未來夜景",
        activities: [
          {
            time: "上午",
            text: "山下公園",
            subText: "海濱散步，玫瑰花季",
            map: { type: "search", query: "Yamashita Park Yokohama" },
          },
          {
            time: "下午",
            text: "紅磚倉庫（1・2號館）",
            subText: "購物、餐廳、海景",
            map: { type: "search", query: "Yokohama Red Brick Warehouse" },
          },
          {
            time: "下午",
            text: "橫濱元町商店街",
            map: {
              type: "search",
              query: "Yokohama Motomachi Shopping Street",
            },
          },
          {
            time: "傍晚",
            text: "港未來・COSMOWORLD",
            subText: "摩天輪夜景、AIR CABIN 纜車",
            map: { type: "search", query: "Minato Mirai Yokohama" },
          },
          {
            time: "傍晚",
            text: "合味道紀念館",
            subText: "泡麵博物館，體驗製作",
            map: { type: "search", query: "Cup Noodles Museum Yokohama" },
          },
          {
            time: "方案B",
            text: "橫濱 → 澀谷",
            transport: {
              line: "JR 湘南新宿線",
              station: "橫濱站",
              platform: "10 號月台",
              note: "直達車，車程約 30 分鐘"
            },
            map: {
              type: "route",
              origin: "Yokohama Station",
              destination: "Shibuya Station",
            },
          },
        ],
      },
    ],
  },
  {
    phase: "澀谷 (Day 3)",
    image:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 3,
        date: "6/19 (五)",
        title: "Shibuya 109 連假採買",
        image:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛍️ 連假首日！Shibuya 109 主攻服飾",
        activities: [
          {
            time: "方案A",
            text: "橫濱退房 → 澀谷",
            transport: {
              line: "JR 湘南新宿線",
              station: "橫濱站",
              platform: "10 號月台",
              note: "直達車，車程約 30 分鐘"
            },
            map: {
              type: "route",
              origin: "Yokohama Station",
              destination: "Shibuya Station",
            },
          },
          {
            time: "全天",
            text: "Shibuya 109 採買服飾",
            subText: "連假首日，建議早到",
            map: { type: "search", query: "Shibuya 109 Tokyo" },
          },
          { time: "晚上", text: "晚餐：澀谷周邊素食", foodGuideLink: "澀谷" },
        ],
      },
    ],
  },
  {
    phase: "輕井澤 (Day 4–7)",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 4,
        date: "6/20 (六)",
        title: "澀谷退房 → 大宮 → 輕井澤",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🚄 退房後直奔輕井澤度假，當晚入住輕井澤",
        activities: [
          {
            time: "上午",
            text: "澀谷飯店退房 → 大宮站",
            transport: {
              line: "JR 湘南新宿線",
              station: "澀谷站",
              platform: "3 號月台",
              note: "車程約 35-40 分鐘"
            },
            map: {
              type: "route",
              origin: "Shibuya Station",
              destination: "Omiya Station",
            },
          },
          {
            time: "上午",
            text: "大宮站 → 輕井澤",
            transport: {
              line: "北陸新幹線 (はくたか / あさま)",
              station: "大宮站",
              platform: "17、18 號新幹線月台",
              note: "從普通線換乘新幹線須過專用聯絡閘門，車程約 50 分鐘。週六強烈建議預訂指定席。"
            },
            map: {
              type: "route",
              origin: "Omiya Station",
              destination: "Karuizawa Station",
            },
          },
          {
            time: "中午",
            text: "Check-in 輕井澤淺間王子大飯店",
            subText: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景 🆕",
            map: { type: "search", query: "Karuizawa Asama Prince Hotel" },
          },
          {
            time: "下午",
            text: "舊輕井澤銀座通或新輕井澤散步",
            subText: "避開週末人潮，悠閒開始慢活行程",
            map: { type: "search", query: "Kyu-Karuizawa Ginza" },
          },
          {
            time: "晚上",
            text: "輕井澤周邊素食晚餐",
            tips: "入座前確認湯底是否為純昆布",
          },
        ],
      },
      {
        day: 5,
        date: "6/21 (日)",
        anniversary: true,
        title: "全天輕井澤慢活（紀念日） 🎊",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
        highlight: "🎊 三週年結婚紀念日！全天悠閒享受輕井澤度假感",
        activities: [
          {
            time: "上午",
            text: "輕井澤淺間王子退房，移動至新飯店",
            subText: "搭乘公車或計程車至輕井澤站前",
          },
          {
            time: "中午",
            text: "Check-in 輕井澤 APA 飯店",
            subText: "站前步行 3 分鐘放行李，平價便捷 🆕",
            map: { type: "search", query: "APA Hotel Karuizawa Ekimae" },
          },
          {
            time: "下午",
            text: "中輕井澤森林漫步",
            subText: "漫遊榆樹街小鎮 (Harunire Terrace) 與造訪石之教會（需預約）",
            transport: {
              line: "信濃鐵道 或 腳踏車",
              station: "輕井澤站 (1、2號月台) → 中輕井澤站",
              note: "車程約 4 分鐘，單程 ¥240"
            },
            map: { type: "search", query: "Harunire Terrace Karuizawa" },
          },
          {
            time: "晚上",
            text: "🎊 中輕井澤野菜晚餐",
            subText: "紀念日慶祝大餐，請提前預約並確認無柴魚/魚介高湯",
            foodGuideLink: "輕井澤",
          },
        ],
      },
      {
        day: 6,
        date: "6/22 (一)",
        title: "輕井澤慢活",
        image:
          "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2070&auto=format&fit=crop",
        highlight: "🌿 租腳踏車悠閒穿梭：舊輕井澤銀座通・高原教會",
        activities: [
          {
            time: "上午",
            text: "輕井澤 APA 退房，租借腳踏車慢遊三區",
            subText: "推薦租借站前的白貓自行車（普通車約 ¥700/日，電動車約 ¥1,500/日，限 17:00 前歸還）🚲",
            note: "新輕井澤 ↔ 中輕井澤若不騎車，亦可搭乘信濃鐵道（車程約 4 分鐘，單程 ¥240，每小時 1-2 班）",
            map: { type: "search", query: "Kumoba Pond Karuizawa" },
          },
          {
            time: "傍晚",
            text: "Check-in 輕井澤英迪格酒店",
            subText: "延續紀念日的輕奢享受，木質渡假設計體驗",
            map: { type: "search", query: "Hotel Indigo Karuizawa" },
          },
          {
            time: "晚上",
            text: "輕井澤市區素食晚餐",
            tips: "嚴守五辛蛋奶素，入座前確認無柴魚高湯",
          },
        ],
      },
      {
        day: 7,
        date: "6/23 (二)",
        title: "輕井澤→東京",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛍️ 王子 Outlet 採買・章姬草莓・返東京",
        activities: [
          {
            time: "上午",
            text: "輕井澤王子購物廣場（Outlet）最後採買",
            subText: "把握最後的購物折扣",
            map: { type: "search", query: "Karuizawa Prince Shopping Plaza" },
          },
          {
            time: "上午",
            text: "🍓 章姬 / 香野草莓尋購",
            subText: "季節限定，美味甜度極佳",
          },
          {
            time: "中午後",
            text: "新幹線返東京",
            transport: {
              line: "北陸新幹線",
              station: "輕井澤站",
              platform: "1、2 號新幹線月台",
              note: "直達東京站，車程約 70 分鐘"
            },
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Tokyo Station",
            },
          },
          { time: "傍晚", text: "Check-in 東京站周邊飯店" },
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
        date: "6/24 (三)",
        title: "返程",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 16:50 NRT 起飛，帶著回憶回家",
        activities: [
          { time: "上午", text: "整理行李、退房" },
          {
            time: "13:30",
            text: "東京站 → 成田機場",
            transport: {
              line: "N'EX 成田特快",
              station: "東京站 (總武地下線)",
              platform: "地下 5 樓 1、2 號月台",
              note: "⚠️ 警告：總武地下月台極深，從地面轉乘步行至少需 15-20 分鐘，請務必提早出發！車程約 60 分鐘。"
            },
            map: {
              type: "route",
              origin: "Tokyo Station",
              destination: "Narita Airport Terminal 1",
            },
          },
          { time: "16:50", text: "🛫 NRT T1 起飛 → TPE T1" },
        ],
      },
    ],
  },
];

export const budgetData = [
  { item: "機票（TPE-NRT 來回）", cost: 0, note: "待確認" },
  { item: "交通（N'EX / 新幹線 / Suica）", cost: 18000, note: "估算/人" },
  { item: "住宿（7泊）", cost: 49000, note: "均攤約¥7,000/晚" },
  { item: "餐飲", cost: 22000, note: "紀念日餐廳另計" },
  { item: "購物 / 景點", cost: 30000, note: "含 Outlet、藥妝" },
];

export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1",
    type: "route",
    name: "成田 → 橫濱",
    origin: "Narita Airport Terminal 1",
    destination: "Yokohama Station",
    duration: "約90分",
    steps: [
      {
        type: "train",
        line: "N'EX 成田特快",
        station: "成田機場 T1 (地下一樓 B1 JR 剪票口)",
        platform: "1 或 2 號月台",
        note: "直達車，免換車。"
      }
    ]
  },
  {
    id: 2,
    day: "Day 2-3",
    type: "route",
    name: "橫濱 → 澀谷",
    origin: "Yokohama Station",
    destination: "Shibuya Station",
    duration: "約30分",
    steps: [
      {
        type: "train",
        line: "JR 湘南新宿線",
        station: "橫濱站",
        platform: "10 號月台",
        note: "強烈推薦此路線，為直達車。亦可搭東急東橫線或 JR 東海道線 (需轉乘)。"
      }
    ]
  },
  {
    id: 3,
    day: "Day 4",
    type: "route",
    name: "澀谷 → 大宮 → 輕井澤",
    origin: "Shibuya Station",
    destination: "Karuizawa Station",
    duration: "約85分",
    steps: [
      {
        type: "train",
        line: "JR 湘南新宿線",
        station: "澀谷站",
        platform: "3 號月台",
        note: "搭乘至「大宮站」轉乘新幹線。"
      },
      {
        type: "shinkansen",
        line: "北陸新幹線",
        station: "大宮站",
        platform: "17、18 號新幹線月台",
        note: "轉乘需通過專用聯絡閘門，往長野/金澤方向搭乘至「輕井澤站」。"
      }
    ]
  },
  {
    id: 4,
    day: "Day 5-6",
    type: "bike",
    name: "輕井澤區內慢活",
    origin: "Karuizawa Station",
    destination: "Karuizawa Area",
    duration: "全天彈性",
    steps: [
      {
        type: "bike",
        line: "白貓腳踏車",
        station: "輕井澤站 北口右對面",
        note: "電動車 ¥1,500/日、普通車 ¥700/日，需於 17:00 前歸還。"
      },
      {
        type: "train",
        line: "信濃鐵道",
        station: "輕井澤站 ↔ 中輕井澤站",
        platform: "北口獨立月台 1、2 號",
        note: "若不騎車可搭乘此線。車程 4 分，單程 ¥240。"
      }
    ]
  },
  {
    id: 5,
    day: "Day 7",
    type: "route",
    name: "輕井澤 → 東京站",
    origin: "Karuizawa Station",
    destination: "Tokyo Station",
    duration: "約70分",
    steps: [
      {
        type: "shinkansen",
        line: "北陸新幹線",
        station: "輕井澤站",
        platform: "新幹線 1、2 號月台",
        note: "搭乘往東京方向班次，直達東京站。"
      }
    ]
  },
  {
    id: 6,
    day: "Day 8",
    type: "route",
    name: "東京站 ➔ 成田機場",
    origin: "Tokyo Station",
    destination: "Narita Airport Terminal 1",
    duration: "約60分",
    steps: [
      {
        type: "train",
        line: "N'EX 成田特快",
        station: "東京站",
        platform: "總武地下線 地下 5 樓 1、2 號月台",
        note: "⚠️ 警告：總武地下月台極深，從地面層轉乘步行至少需 15-20 分鐘，請務必提早出發！"
      }
    ]
  },
];

export const usefulLinks = {
  categories: [
    {
      type: "ticket",
      label: "交通票券",
      icon: "Train",
      items: [
        {
          name: "N'EX 成田特快車票 (Klook 專屬優惠)",
          day: "Day 1, 8",
          url: "https://www.klook.com/zh-TW/activity/124707-narita-express-tokyo/",
        },
        {
          name: "北陸新幹線訂票",
          day: "Day 5, 7",
          url: "https://www.jreast.co.jp/tc/",
        },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        {
          name: "Shibuya 109",
          day: "Day 3",
          url: "https://www.shibuya109.jp/",
        },
        {
          name: "輕井澤王子購物廣場",
          day: "Day 5, 7",
          url: "https://www.karuizawa-psp.jp/tw/",
        },
        {
          name: "合味道紀念館橫濱",
          day: "Day 2",
          url: "https://www.cupnoodles-museum.jp/zh_TW/yokohama/",
        },
      ],
    },
  ],
};

export const foodData = {
  categories: [
    {
      location: "橫濱",
      day: "Day 1–2",
      sections: [
        {
          title: "☕ 咖啡・甜點",
          items: [
            {
              name: "Dean & DeLuca コレットマーレ",
              type: "咖啡廳",
              desc: "港未來，優雅海景咖啡",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Dean+DeLuca+Colette+Mare+Minatomirai",
            },
            {
              name: "YOKOHAMA SORAiRO gelato",
              type: "義式冰淇淋",
              desc: "在地人氣冰淇淋",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=SORAiRO+gelato+Yokohama",
            },
            {
              name: "Lumière de Paris",
              type: "咖啡廳",
              desc: "法式氛圍小店",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Lumiere+de+Paris+Yokohama",
            },
            {
              name: "Elysee",
              type: "咖啡廳",
              desc: "山手地區老牌咖啡店",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Elysee+Yamate+Yokohama",
            },
          ],
        },
        {
          title: "🍽 餐廳",
          items: [
            {
              name: "Center Grill",
              type: "西式料理",
              desc: "招牌蛋包飯，老字號洋食",
              recommended: true,
              note: "蛋包飯可素食，確認無肉高湯",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Center+Grill+Yokohama",
            },
          ],
        },
      ],
    },
    {
      location: "澀谷・表參道",
      day: "Day 3–4",
      sections: [
        {
          title: "🍞 麵包・甜點",
          items: [
            {
              name: "AMAM DACOTAN",
              type: "麵包店",
              desc: "超人氣排隊麵包，表參道",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=AMAM+DACOTAN+Omotesando",
            },
            {
              name: "I'm donut? Omotesando",
              type: "甜甜圈",
              desc: "現炸生甜甜圈，必排",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Im+donut+Omotesando",
            },
            {
              name: "NUMBER SUGAR",
              type: "牛奶糖",
              desc: "手工牛奶糖，伴手禮首選",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Number+Sugar+Tokyo",
            },
          ],
        },
        {
          title: "☕ 咖啡",
          items: [
            {
              name: "neel",
              type: "咖啡廳",
              desc: "澀谷區靜謐咖啡",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=neel+cafe+Shibuya",
            },
          ],
        },
        {
          title: "🍽 餐廳",
          items: [
            {
              name: "Brown Rice Tokyo Omotesando",
              type: "有機素食",
              desc: "表參道，素食友善，玄米料理",
              recommended: true,
              note: "蛋奶素完全OK，無肉無魚",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Brown+Rice+Tokyo+Omotesando",
            },
            {
              name: "Neo Nice Burger 表参道",
              type: "漢堡",
              desc: "表參道精緻漢堡",
              recommended: false,
              note: "可點蔬菜堡",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Neo+Nice+Burger+Omotesando",
            },
            {
              name: "大阪燒 櫻亭",
              type: "御好燒",
              desc: "關西風大阪燒",
              recommended: false,
              note: "可點蔬菜口味，確認湯底",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Sakuratel+okonomiyaki+Tokyo",
            },
            {
              name: "東急FoodShow 澀谷店",
              type: "食品賣場",
              desc: "澀谷站內，熟食便當、甜點一次買",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Tokyu+FoodShow+Shibuya",
            },
          ],
        },
      ],
    },
    {
      location: "輕井澤",
      day: "Day 5–7",
      sections: [
        {
          title: "🌿 野菜・紀念日餐廳",
          items: [
            {
              name: "中輕井澤野菜料理",
              type: "野菜料理",
              desc: "🎊 紀念日晚餐，提前預約確認蛋奶素",
              recommended: true,
              note: "提前確認全素昆布高湯，無魚介",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=中軽井沢+野菜料理",
            },
            {
              name: "Trattoria Primo",
              type: "義大利菜",
              desc: "輕井澤義式餐廳",
              recommended: false,
              note: "可點義大利麵素食款",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Trattoria+Primo+Karuizawa",
            },
            {
              name: "蕎麥麵 川上庵",
              type: "蕎麥麵",
              desc: "輕井澤名店，現磨蕎麥麵",
              recommended: false,
              note: "確認湯底是否昆布，蕎麥麵本身無肉",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kawakami-an+Karuizawa",
            },
          ],
        },
        {
          title: "🍞 麵包・咖啡",
          items: [
            {
              name: "Bakery & Restaurant Sawamura 舊輕井澤",
              type: "麵包/餐廳",
              desc: "輕井澤經典麵包店，酸種麵包",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Sawamura+Kyukaruizawa",
            },
            {
              name: "Hygge by ØC",
              type: "咖啡廳",
              desc: "北歐風格咖啡廳，輕井澤",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Hygge+OC+Karuizawa",
            },
            {
              name: "Café Merukoro",
              type: "咖啡廳",
              desc: "輕井澤在地咖啡",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Cafe+Merukoro+Karuizawa",
            },
            {
              name: "Kamepan",
              type: "麵包店",
              desc: "輕井澤特色麵包",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kamepan+Karuizawa",
            },
            {
              name: "Paomu",
              type: "西式料理/甜點",
              desc: "以布丁聞名的輕井澤小店",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Paomu+Karuizawa",
            },
          ],
        },
      ],
    },
    {
      location: "東京站",
      day: "Day 7–8",
      sections: [
        {
          title: "🌱 素食",
          items: [
            {
              name: "T's Tantan",
              type: "嚴格素食拉麵",
              desc: "東京車站站內，純素拉麵旗艦店",
              recommended: true,
              note: "全素食材，蛋奶素完全OK",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=T%27s+Tantan+Tokyo+Station",
            },
          ],
        },
      ],
    },
  ],
};

export const shoppingData = {
  targetStores: [
    "Shibuya 109",
    "松本清",
    "唐吉訶德",
    "輕井澤 Outlet",
  ],
  categories: [
    {
      title: "橫濱區",
      icon: "⚓",
      items: [
        {
          name: "科萊特馬雷 港未來購物中心",
          desc: "櫻木町站前的綜合性購物商場。",
        },
        {
          name: "橫濱元町商店街",
          desc: "具有歐式風情的歷史商店街，以精品、飾品與咖啡店聞名。",
        },
        {
          name: "橫濱紅磚倉庫 1號館 & 2號館",
          desc: "歷史建築改建的文創與商業空間，有許多獨特的雜貨與美食。",
        },
        {
          name: "MARINE & WALK 橫濱",
          desc: "充滿美式開放感的海濱購物中心，聚集時尚品牌與露天餐廳。",
        },
      ],
    },
    {
      title: "澀谷・表參道區",
      icon: "🗼",
      items: [
        {
          name: "澀谷SCRAMBLE SQUARE",
          desc: "澀谷最新地標，擁有豐富的高級時尚品牌與流行雜貨。",
        },
        {
          name: "MAGNET by SHIBUYA109",
          desc: "以次文化與潮流為主的購物中心，頂樓可俯瞰澀谷十字路口。",
        },
        { name: "Shibuya 109", desc: "澀谷最具代表性的潮流服飾百貨。" },
        {
          name: "任天堂 東京旗艦店",
          desc: "位於澀谷 PARCO 的任天堂官方直營店，販售多樣限定周邊。",
        },
        {
          name: "東急FoodShow 澀谷店",
          desc: "位於澀谷站的地下一樓美食街，採買在地甜點與伴手禮的好去處。",
        },
        {
          name: "手工牛奶糖 NUMBER SUGAR",
          desc: "原宿表參道的超人氣手工糖果店，包裝精美適合送禮。",
        },
        {
          name: "and ST TOKYO",
          desc: "知名服裝集團的旗艦選物店，提供多元的生活風格提案。",
        },
      ],
    },
    {
      title: "輕井澤區",
      icon: "🌿",
      items: [
        {
          name: "輕井澤王子購物廣場",
          desc: "位於輕井澤車站南側的大型暢貨中心，環境優美品牌豐富。",
        },
        {
          name: "榆樹街小鎮",
          desc: "位於星野區的文青風木棧道購物區，有多家精緻小店與餐廳。",
        },
        {
          name: "舊輕井澤銀座通",
          desc: "輕井澤最著名的商店街，適合購買果醬、手工藝品與散策美食。",
        },
      ],
    },
    {
      title: "其他（備用/返程）",
      icon: "🛍️",
      items: [
        {
          name: "酒酒井名牌暢貨中心",
          desc: "鄰近成田機場的大型 Outlet，適合行程最後一天回國前大採購。",
        },
        {
          name: "小町通商店街",
          desc: "鎌倉站前的著名商店街，有豐富的工藝品、伴手禮與在地美食。",
          isBackup: true,
        },
      ],
    },
  ],
};

export const todoData = [
  // 出國前準備
  {
    group: "出國前準備",
    category: "交通",
    item: "預訂新幹線去程：大宮 ➔ 輕井澤 (6/20 六)",
  },
  {
    group: "出國前準備",
    category: "交通",
    item: "預訂 N'EX 來回車票",
  },
  {
    group: "出國前準備",
    category: "通訊",
    item: "購買日本上網 eSIM",
  },
  {
    group: "出國前準備",
    category: "交通",
    item: "預約機場接送",
  },
  {
    group: "出國前準備",
    category: "準備",
    item: "請假",
  },

  // 確認與追蹤項目
  {
    group: "確認與追蹤項目",
    category: "交通",
    item: "預訂新幹線回程：輕井澤 ➔ 東京 (6/23 二)",
  },
];

export const vegetarianCard = {
  cannotEat: [
    "肉・魚・魚介類 (肉類與海鮮)",
    "すべての出汁 (柴魚/魚介/肉骨等高湯)",
  ],
  canEat: [
    "野菜・卵・乳製品 (蔬菜、雞蛋、乳製品)",
    "昆布だし (昆布高湯)",
    "ネギ・にんにく類 (蔥、蒜、韭菜等五辛)",
  ]
};

export const accommodationData = [
  {
    location: "橫濱",
    period: "Day 1 (6/17 三)",
    hotels: [
      {
        name: "三井花園飯店橫濱港未來普米爾",
        status: "已訂妥",
        desc: "港未來區高空絕美海景，精緻奢華首夜",
        features: ["海景", "高空", "新開幕"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Yokohama+Minatomirai+Premier",
        priceTwd: 3000,
      }
    ]
  },
  {
    location: "橫濱 / 澀谷",
    period: "Day 2 (6/18 四)",
    hotels: [
      {
        name: "Super Hotel Yokohama Kannai",
        status: "候選",
        desc: "高CP值商務旅館",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Yokohama+Kannai",
        priceTwd: 3000,
      },
      {
        name: "相鐵Fresa Inn 橫濱櫻木町",
        status: "候選",
        desc: "近車站，交通便利",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Sotetsu+Fresa+Inn+Yokohama+Sakuragicho",
        priceTwd: 3000,
      },
      {
        name: "澀谷飯店 (待定)",
        status: "候選",
        desc: "若選擇提早移動到澀谷",
        priceTwd: 3000,
      }
    ]
  },
  {
    location: "澀谷",
    period: "Day 3 (6/19 五)",
    hotels: [
      {
        name: "待定 (澀谷周邊)",
        status: "未決定",
        desc: "Shibuya 109 採買日，住澀谷最方便",
        features: ["交通樞紐", "購物"],
        priceTwd: 3000,
      }
    ]
  },
  {
    location: "輕井澤",
    period: "Day 4 (6/20 六)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "候選",
        desc: "站前步行 3 分鐘寄放行李，便捷高效首選",
        features: ["交通便利", "車站旁"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 4700,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "候選",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 6800,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "候選",
        desc: "奢華設計木質渡假體驗",
        features: ["設計感", "渡假"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 10000,
      }
    ]
  },
  {
    location: "輕井澤",
    period: "Day 5 (6/21 日)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "候選",
        desc: "站前步行 3 分鐘放行李，平價便捷",
        features: ["交通便利", "車站旁"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 2200,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "候選",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 5500,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "候選",
        desc: "三週年紀念日主場！奢華設計木質渡假體驗",
        features: ["設計感", "紀念日", "渡假"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 8700,
      }
    ]
  },
  {
    location: "輕井澤",
    period: "Day 6 (6/22 一)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "候選",
        desc: "站前步行 3 分鐘放行李，平價便捷",
        features: ["交通便利", "車站旁"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 2200,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "候選",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 5000,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "候選",
        desc: "奢華設計木質渡假體驗",
        features: ["設計感", "渡假"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 8000,
      }
    ]
  },
  {
    location: "東京",
    period: "Day 7 (6/23 二)",
    hotels: [
      {
        name: "待定 (東京站周邊)",
        status: "未決定",
        desc: "最後一晚，考量隔日搭乘 N'EX 前往成田機場的便利性",
        features: ["交通樞紐"],
        priceTwd: 3000,
      }
    ]
  }
];
