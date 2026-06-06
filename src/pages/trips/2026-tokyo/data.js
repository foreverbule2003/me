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
    phase: "橫濱 (Day 1-2)",
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
            subText: "提領行李、辦理入境與通關",
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
    phase: "輕井澤 (Day 4-7)",
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
  { item: "交通（N'EX / 新幹線）", cost: 18000, note: "估算/人" },
  { item: "住宿（7泊）", cost: 49000, note: "均攤約¥7,000/晚" },
  { item: "餐飲", cost: 22000, note: "紀念日餐廳另計" },
  { item: "購物 / 景點", cost: 30000, note: "含 Outlet、藥妝" },
];

export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 1 (6/17 三)",
    type: "route",
    name: "成田 → 橫濱",
    origin: "Narita Airport Terminal 1",
    destination: "Yokohama Station",
    duration: "90分",
    steps: [
      {
        type: "train",
        line: "JR N'EX 成田特快",
        station: "成田 T1 (B1 JR)",
        platform: "1/2號月台",
        duration: "約90分",
        note: "直達車，免換車。"
      }
    ]
  },
  {
    id: 2,
    day: "Day 2-3 (6/18 四 - 6/19 五)",
    type: "route",
    name: "橫濱 → 澀谷",
    origin: "Yokohama Station",
    destination: "Shibuya Station",
    duration: "30分",
    steps: [
      {
        type: "train",
        line: "JR 湘南新宿線",
        station: "橫濱站",
        platform: "10號月台",
        duration: "約30分",
        note: "直達。亦可搭東急/東海道線(需轉乘)。"
      }
    ]
  },
  {
    id: 3,
    day: "Day 4 (6/20 六)",
    type: "route",
    name: "澀谷 → 輕井澤",
    origin: "Shibuya Station",
    destination: "Karuizawa Station",
    duration: "85分",
    steps: [
      {
        type: "train",
        line: "JR 湘南新宿線",
        station: "澀谷站",
        platform: "3號月台",
        duration: "約35分",
        note: "搭至大宮轉乘"
      },
      {
        type: "shinkansen",
        line: "北陸新幹線",
        station: "大宮站",
        platform: "17/18月台",
        duration: "約50分",
        note: "轉乘需過聯絡閘門"
      }
    ]
  },
  {
    id: 4,
    day: "Day 5-6 (6/21 日 - 6/22 一)",
    type: "bike",
    name: "輕井澤",
    origin: "Karuizawa Station",
    destination: "Karuizawa Area",
    duration: "全天",
    steps: [
      {
        type: "bike",
        line: "白貓腳踏車",
        station: "輕井澤北口對面",
        note: "電動 ¥1,500、普通 ¥700，17:00 前還。"
      },
      {
        type: "train",
        line: "信濃鐵道",
        station: "中輕井澤",
        platform: "北口 1/2號",
        duration: "約4分",
        note: "單程 ¥240"
      }
    ]
  },
  {
    id: 5,
    day: "Day 7 (6/23 二)",
    type: "route",
    name: "輕井澤 → 東京",
    origin: "Karuizawa Station",
    destination: "Tokyo Station",
    duration: "70分",
    steps: [
      {
        type: "shinkansen",
        line: "北陸新幹線",
        station: "輕井澤站",
        platform: "1/2號月台",
        duration: "約70分",
        note: "直達東京"
      }
    ]
  },
  {
    id: 6,
    day: "Day 8 (6/24 三)",
    type: "route",
    name: "東京 → 成田",
    origin: "Tokyo Station",
    destination: "Narita Airport Terminal 1",
    duration: "60分",
    steps: [
      {
        type: "train",
        line: "JR N'EX 成田特快",
        station: "東京總武地下",
        platform: "B5 1/2月台",
        duration: "約60分",
        note: "⚠️ B5月台極深，從地面步行需15-20分，務必提早！"
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
      day: "Day 1-2",
      sections: [
        {
          title: "☕ 咖啡・甜點",
          items: [
            {
              name: "Dean & DeLuca コレットマーレ",
              type: "咖啡廳",
              desc: "港未來優雅海景咖啡，紐約頂級超市品牌開的店",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Dean+DeLuca+Colette+Mare+Minatomirai",
            },
            {
              name: "YOKOHAMA SORAiRO gelato",
              type: "義式冰淇淋",
              desc: "港未來在地超人氣義式冰淇淋",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=SORAiRO+gelato+Yokohama",
            },
          ],
        },
        {
          title: "🍽 餐廳",
          items: [
            {
              name: "Center Grill",
              type: "西式料理",
              desc: "老字號昭和風洋食，招牌蛋包飯，老闆娘是台灣人",
              recommended: true,
              note: "蛋包飯可素食",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Center+Grill+Yokohama",
            },
            {
              name: "Rice Cuisine SŪYA",
              type: "Vegan / 無麩質",
              desc: "日本大通純素與無麩質米粉料理專賣，極力推薦擔擔麵與披薩",
              recommended: true,
              mapUrl:
                "https://maps.app.goo.gl/p2WtcQGsogN4VZWx9",
            },
          ],
        },
      ],
    },
    {
      location: "澀谷・表參道",
      day: "Day 3-4",
      sections: [
        {
          title: "🍞 麵包・甜點",
          items: [
            {
              name: "AMAM DACOTAN",
              type: "麵包店",
              desc: "表參道超人氣排隊麵包名店，I'm donut? 姊妹店，可內用",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=AMAM+DACOTAN+Omotesando",
            },
            {
              name: "I'm donut? Omotesando",
              type: "甜甜圈",
              desc: "現炸生甜甜圈，表參道必排極限人氣店",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Im+donut+Omotesando",
            },
            {
              name: "NUMBER SUGAR",
              type: "牛奶糖",
              desc: "表參道手工牛奶糖，精緻伴手禮首選",
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
              desc: "澀谷神宮前靜謐老屋咖啡廳，老辣妹推薦軟可麗餅",
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
              desc: "表參道精緻素食日式定食，提供一汁三菜、蒸籠蒸膳與野菜咖喱",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Brown+Rice+Tokyo+Omotesando",
            },
            {
              name: "Neo Nice Burger 表参道",
              type: "漢堡",
              desc: "表參道精緻漢堡名店，I'm donut? 姊妹店，有蘑菇漢堡，薯條好吃",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Neo+Nice+Burger+Omotesando",
            },
            {
              name: "大阪燒 櫻亭",
              type: "御好燒",
              desc: "裏參道藝術風格大阪燒，提供蔬食選項，可自己動手做",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Sakuratel+okonomiyaki+Tokyo",
            },
            {
              name: "AFURI 澀谷",
              type: "拉麵",
              desc: "澀谷超人氣拉麵名店，提供兩款素食拉麵",
              recommended: true,
              mapUrl:
                "https://maps.app.goo.gl/LiH7B3axDie1uHbk9",
            },
            {
              name: "YAYOI 彌生軒 青山學院大學前店",
              type: "日式定食",
              desc: "表參道與澀谷之間日式定食餐廳，各式經典和食與定食套餐選擇",
              recommended: false,
              mapUrl:
                "https://maps.app.goo.gl/AaC4g4TxhKB2dfdo6",
            },
            {
              name: "東急FoodShow 澀谷店",
              type: "食品賣場",
              desc: "澀谷地下街食品賣場，熟食便當與甜點一應俱全",
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
      day: "Day 5-7",
      sections: [
        {
          title: "🌿 餐廳",
          items: [
            {
              name: "Trattoria Primo",
              type: "義大利菜",
              desc: "山編推薦超人氣窯烤披薩與義大利麵",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Trattoria+Primo+Karuizawa",
            },
            {
              name: "TsuruTonTan UDON NOODLE",
              type: "烏龍麵",
              desc: "高級質感烏龍麵名店",
              recommended: false,
              note: "可客製蛋奶素醬汁",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=TsuruTonTan+Karuizawa",
            },
          ],
        },
        {
          title: "🍞 麵包・咖啡・甜點",
          items: [
            {
              name: "Bakery & Restaurant Sawamura 舊輕井澤",
              type: "麵包 / 餐廳",
              desc: "輕井澤森林經典麵包餐廳，酸種麵包極受歡迎",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Sawamura+Kyukaruizawa",
            },
            {
              name: "Café St.Maire KUMOBA",
              type: "咖啡廳",
              desc: "雲場池旁咖啡店，提供無肉咖哩 (價位偏高)",
              recommended: false,
              mapUrl:
                "https://maps.app.goo.gl/pGcXaeyvvxXoS1sa9",
            },
            {
              name: "Paomu",
              type: "西食 / 甜點",
              desc: "知名舊輕井澤布丁與輕食打卡店",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Paomu+Karuizawa",
            },
            {
              name: "CAFE HOUSE ぱいつぼおる",
              type: "咖啡廳",
              desc: "溫馨暖爐咖啡廳，提供輕食沙拉三明治",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=CAFE+HOUSE+ぱいつぼおる",
            },
            {
              name: "Suzunone (涼の音)",
              type: "咖啡廳",
              desc: "森林古民家咖啡，推法式吐司與蛋糕",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=涼の音+軽井沢",
            },
          ],
        },
      ],
    },
    {
      location: "中輕井澤",
      day: "Day 5-7",
      sections: [
        {
          title: "🌿 野菜・紀念日餐廳",
          items: [
            {
              name: "中輕井澤野菜料理",
              type: "野菜料理",
              desc: "需提前預約",
              recommended: true,
              note: "早/午餐均供素食餐點含野菜 Buffet。早餐 ¥4,000 / 午餐 ¥2,680",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=中軽井沢+野菜料理",
            },
          ],
        },
        {
          title: "🍞 麵包・咖啡・甜點",
          items: [
            {
              name: "Hygge by ØC",
              type: "咖啡廳",
              desc: "北歐風文青咖啡廳，推薦軟可麗餅",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Hygge+OC+Karuizawa",
            },
            {
              name: "Kamepan",
              type: "麵包店",
              desc: "人氣造型烏龜麵包，山編推薦必吃咖哩麵包",
              recommended: true,
              mapUrl:
                "https://maps.app.goo.gl/8fqYdYBZqVebwp5f7",
            },
            {
              name: "Izumiya Saku (和泉屋 傳兵衛)",
              type: "甜點 / 和菓子",
              desc: "日式甜點老鋪，大推味噌糰子與起司蛋糕",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=和泉屋傳兵衛+軽井沢",
            },
          ],
        },
      ],
    },
    {
      location: "東京 / 銀座",
      day: "Day 7-8",
      sections: [
        {
          title: "🌱 素食",
          items: [
            {
              name: "T's Tantan",
              type: "純素拉麵",
              desc: "東京車站內超人氣純素擔擔麵拉麵旗艦店",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=T%27s+Tantan+Tokyo+Station",
            },
          ],
        },
        {
          title: "🍽 定食・餐廳",
          items: [
            {
              name: "YAYOI 彌生軒 (銀座 INZ 店)",
              type: "日式定食",
              desc: "平價美味定食，米飯好吃",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Yayoi+Ginza+INZ",
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
      title: "橫濱",
      day: "Day 1-2",
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
      title: "澀谷・表參道",
      day: "Day 2-3",
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
      title: "輕井澤",
      day: "Day 4-6",
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
          desc: "輕井澤最著名的商店街，適合購買手工藝品與散策美食。",
        },
        {
          name: "天然果醬 澤屋 (SAWAYA)",
          desc: "輕井澤必買的無添加果醬伴手禮，特別推薦草莓牛奶果醬等熱銷口味。",
        },
      ],
    },
  ],
  wishlist: [
    {
      name: "肌研化妝水 白潤Premium",
      nameJp: "肌ラボ 白潤プレミアム 薬用浸透美白化粧水",
      desc: "清爽型。【美白化妝水】含傳明酸，適合想改善暗沉",
      price: 990,
      category: "保養",
      shop: "松本清 / 藥妝店",
      image: "/me/images/products/hada_labo_premium.png",
    },
    {
      name: "肌研化妝水 綠瓶補充包",
      nameJp: "肌ラボ 極潤 ヒアルロン液 つめかえ用",
      desc: "【囤貨帶回台灣】愛用品補貨，放托運",
      price: 700,
      category: "保養",
      shop: "松本清 / 藥妝店",
      image: "/me/images/products/hada_labo_refill.png",
    },
    {
      name: "DUO 卸妝膏 (20g 迷你罐)",
      nameJp: "DUO ザ クレンジングバーム ミニ",
      desc: "💛 黃色-深層淨化。【粉刺終結者 - 試用】旅行先用小罐測試膚感",
      price: 880,
      category: "保養",
      shop: "唐吉訶德 / 松本清",
      image: "/me/images/products/duo_mini_20g.jpg",
    },
    {
      name: "DUO 卸妝膏 (90g)",
      nameJp: "DUO ザ クレンジングバーム",
      desc: "💛 黃色-深層淨化。【囤貨帶回台灣】若小罐好用，回程買大罐放托運",
      price: 3960,
      category: "保養",
      shop: "唐吉訶德 / 松本清",
      image: "/me/images/products/duo_cleansing_balm_90g.png",
    },
    {
      name: "KOSE 紅瓶定妝噴霧 隨手罐",
      nameJp: "コーセー メイク キープ ミスト EX",
      desc: "超強防水防汗定妝噴霧，隨手小罐裝攜帶超方便。",
      price: 880,
      category: "彩妝",
      shop: "藥妝店 / 唐吉訶德",
      image: "https://cosme-global-production.s3.amazonaws.com/uploads/product_sku_image/149669/211753/215225/medium_211753_202505200306.png",
    },
    {
      name: "【待定】眼藥水",
      nameJp: "",
      desc: "請選擇想買的眼藥水款式",
      price: null,
      category: "保養",
      shop: "藥妝店",
      image: "",
    },
    {
      name: "【待定】潤色防曬",
      nameJp: "",
      desc: "請選擇想買的潤色防曬款式",
      price: null,
      category: "彩妝",
      shop: "藥妝店",
      image: "",
    },
    {
      name: "【待定】氣墊粉餅",
      nameJp: "",
      desc: "請選擇想買的氣墊粉餅款式",
      price: null,
      category: "彩妝",
      shop: "藥妝店",
      image: "",
    },
    {
      name: "天然果醬 澤屋 (SAWAYA)",
      nameJp: "沢屋 ジャム",
      desc: "輕井澤必買無添加果醬伴手禮，特別推薦草莓牛奶等熱銷口味。",
      price: 810,
      category: "食物",
      shop: "舊輕井澤",
      image: "https://m.media-amazon.com/images/I/414grYP1OHL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: "MUJI 無印良品 柚子金桔糖",
      nameJp: "柚子＆金柑のど飴",
      desc: "酸甜清爽的人氣隨身糖果。",
      price: 120,
      category: "食物",
      shop: "無印良品",
      image: "https://m.media-amazon.com/images/I/51IYHWaH%2BiL.jpg",
    },
    {
      name: "HOKA 運動鞋",
      nameJp: "",
      desc: "舒適好穿的避震機能鞋",
      price: null,
      category: "衣飾",
      shop: "直營店 / 鞋店",
      image: "",
    },
    {
      name: "隨身背包",
      nameJp: "",
      desc: "輕便好裝的旅行外出包",
      price: null,
      category: "衣飾",
      shop: "百貨 / 品牌專櫃",
      image: "",
    },
    {
      name: "皮夾",
      nameJp: "",
      desc: "質感短夾/長夾",
      price: null,
      category: "衣飾",
      shop: "百貨 / 品牌專櫃",
      image: "",
    }
  ],
};

export const todoData = [
  // 出國前準備
  {
    group: "出國前準備",
    category: "交通",
    item: "新幹線去程：大宮 ➔ 輕井澤 (6/20 六)",
  },
  {
    group: "出國前準備",
    category: "交通",
    item: "N'EX 來回車票",
  },
  {
    group: "出國前準備",
    category: "通訊",
    item: "日本上網 eSIM",
  },
  {
    group: "出國前準備",
    category: "交通",
    item: "機場接送",
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
    item: "新幹線回程：輕井澤 ➔ 東京 (6/23 二)",
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

export const weatherData = {
  sourceNote: "依據 tenki.jp 東京千代田區氣候值推估（6月中旬梅雨季），旅行前請至 tenki.jp 確認最新預報",
  sourceUrl: "https://tenki.jp/forecast/3/16/4410/13101/10days.html",
  days: [
    {
      date: "6/17",
      day: "三",
      fullDate: "6/17 (三)",
      loc: "橫濱",
      weatherIcon: "🌧️",
      weatherText: "雨時有雷",
      tempHigh: 25,
      tempLow: 19,
      precip: "70%",
      note: "帶傘必備",
      warn: true,
    },
    {
      date: "6/18",
      day: "四",
      fullDate: "6/18 (四)",
      loc: "橫濱",
      weatherIcon: "🌦️",
      weatherText: "曇時々雨",
      tempHigh: 27,
      tempLow: 20,
      precip: "50%",
      note: "午後或放晴",
      warn: false,
    },
    {
      date: "6/19",
      day: "五",
      fullDate: "6/19 (五)",
      loc: "澀谷",
      weatherIcon: "⛅",
      weatherText: "曇時々晴",
      tempHigh: 28,
      tempLow: 21,
      precip: "40%",
      note: "悶熱注意",
      warn: false,
    },
    {
      date: "6/20",
      day: "六",
      fullDate: "6/20 (六)",
      loc: "輕井澤",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 22,
      tempLow: 13,
      precip: "20%",
      note: "涼爽舒適",
      warn: false,
    },
    {
      date: "6/21",
      day: "日",
      fullDate: "6/21 (日)",
      loc: "輕井澤",
      weatherIcon: "⛅",
      weatherText: "多雲偶晴",
      tempHigh: 23,
      tempLow: 14,
      precip: "30%",
      note: "早晚偏涼",
      warn: false,
    },
    {
      date: "6/22",
      day: "一",
      fullDate: "6/22 (一)",
      loc: "輕井澤",
      weatherIcon: "🌧️",
      weatherText: "曇時々雨",
      tempHigh: 21,
      tempLow: 13,
      precip: "60%",
      note: "梅雨鋒面",
      warn: true,
    },
    {
      date: "6/23",
      day: "二",
      fullDate: "6/23 (二)",
      loc: "東京",
      weatherIcon: "🌦️",
      weatherText: "曇一時雨",
      tempHigh: 29,
      tempLow: 22,
      precip: "40%",
      note: "濕熱",
      warn: false,
    },
    {
      date: "6/24",
      day: "三",
      fullDate: "6/24 (三)",
      loc: "成田",
      weatherIcon: "☁️",
      weatherText: "曇",
      tempHigh: 27,
      tempLow: 21,
      precip: "30%",
      note: "返程日",
      warn: false,
    },
  ],
};
