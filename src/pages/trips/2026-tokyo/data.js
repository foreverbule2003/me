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
    baggage: "❗ 無託運行李",
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
    baggage: "✅ 兩人共用一件託運行李",
    duration: "約2小時50分",
    note: "最晚出發：13:30（東京站）",
  },
};

export const overviewData = [
  {
    day: 1,
    date: "6/17 (三)",
    title: "成田 → 橫濱",
    hotel: "橫濱三井花園",
  },
  { day: 2, date: "6/18 (四)", title: "橫濱", hotel: "待訂" },
  { day: 3, date: "6/19 (五)", title: "澀谷", hotel: "待訂" },
  {
    day: 4,
    date: "6/20 (六)",
    title: "澀谷 → 輕井澤/高崎/草津",
    hotel: "待訂",
  },
  { day: 5, date: "6/21 (日)", title: "輕井澤", hotel: "待訂" },
  { day: 6, date: "6/22 (一)", title: "輕井澤", hotel: "待訂" },
  { day: 7, date: "6/23 (二)", title: "輕井澤 → 東京", hotel: "待訂" },
  { day: 8, date: "6/24 (三)", title: "東京", hotel: "回家" },
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
            text: "抵達成田機場 NRT",
            subText: "提領行李、辦理入境與通關",
            map: {
              type: "search",
              query: "Narita International Airport Terminal 1",
            },
          },
          {
            time: "17:30",
            text: "搭 N'EX → 橫濱站",
            transport: {
              line: "🚇 [特急] N'EX 成田特快",
              station: "成田機場 T1 (B1 JR 剪票口)",
              platform: "1、2 號月台",
              fare: "來回優惠票 NT$ 1,109",
              note: "全車指定席，直達約 90 分鐘。",
            },
            map: {
              type: "route",
              origin: "Narita Airport Terminal 1",
              destination: "Yokohama Station",
            },
          },
          {
            time: "19:00",
            text: "三井花園 Check-in",
            subText: "港未來區高空絕美海景，精緻奢華首夜",
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
            text: "紅磚倉庫",
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
              fare: "¥480",
              note: "直達車，車程約 30 分鐘",
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
        highlight: "🛒 連假首日！Shibuya 109 主攻服飾",
        activities: [
          {
            time: "方案A",
            text: "橫濱退房 → 澀谷",
            transport: {
              line: "JR 湘南新宿線",
              station: "橫濱站",
              platform: "10 號月台",
              fare: "¥480",
              note: "直達車，車程約 30 分鐘",
            },
            map: {
              type: "route",
              origin: "Yokohama Station",
              destination: "Shibuya Station",
            },
          },
          {
            time: "全天",
            text: "Shibuya 109 採買",
            subText: "連假首日，建議早到",
            map: { type: "search", query: "Shibuya 109 Tokyo" },
          },
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
        title: "澀谷退房 → 輕井澤 / 高崎 / 草津",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🚄 退房後直奔輕井澤度假、高崎溫泉中繼或前往草津溫泉",
        options: [
          {
            id: 1,
            label: "輕井澤",
            title: "澀谷退房 → 輕井澤",
            image:
              "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
            highlight: "🚄 退房後直奔輕井澤，當晚入住輕井澤淺間王子飯店",
            activities: [
              {
                time: "上午",
                text: "澀谷退房 → 大宮",
                transport: {
                  line: "JR 湘南新宿線",
                  station: "澀谷站",
                  platform: "3 號月台",
                  fare: "¥580",
                  note: "車程約 35-40 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Shibuya Station",
                  destination: "Omiya Station",
                },
              },
              {
                time: "上午",
                text: "大宮 → 輕井澤",
                transport: {
                  line: "🚄 [新幹線] 北陸新幹線 (はくたか / あさま)",
                  station: "大宮站",
                  platform: "17、18 號新幹線月台",
                  fare: "¥5,720 (指定席) / ¥5,200 (自由席)",
                  note: "從普通線換乘新幹線須過專用聯絡閘門，車程約 50 分鐘。週六強烈建議預訂指定席。",
                },
                map: {
                  type: "route",
                  origin: "Omiya Station",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "中午",
                text: "飯店 Check-in",
                subText: "輕井澤淺間王子 (候選) • 眺望淺間山景",
                map: { type: "search", query: "Karuizawa Asama Prince Hotel" },
              },
              {
                time: "下午",
                text: "舊輕井澤銀座通",
                subText: "避開週末人潮，悠閒開始慢活行程",
                map: { type: "search", query: "Kyu-Karuizawa Ginza" },
              },
            ],
          },
          {
            id: 2,
            label: "高崎",
            title: "澀谷退房 → 高崎",
            image:
              "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
            highlight: "🚄 澀谷搭乘特別快速直達高崎，入住天然溫泉多美迎酒店",
            activities: [
              {
                time: "上午",
                text: "澀谷退房 → 高崎",
                transport: {
                  line: "JR 湘南新宿線 (特別快速・高崎行)",
                  station: "澀谷站",
                  platform: "3 號月台",
                  fare: "¥1,980",
                  note: "直達高崎免換車，車程約 95 分鐘。亦可於大宮轉乘新幹線（新幹線大宮至高崎約 25 分鐘）。",
                },
                map: {
                  type: "route",
                  origin: "Shibuya Station",
                  destination: "Takasaki Station",
                },
              },
              {
                time: "中午",
                text: "飯店 Check-in",
                subText: "多美迎高崎 (候選) • 附設天然溫泉",
                map: { type: "search", query: "Dormy Inn Takasaki" },
              },
              {
                time: "下午",
                text: "高崎散策 / 達磨寺",
                subText:
                  "可搭乘高崎市內公車前往全日本達磨不倒翁的發源地，祈求旅途平安順利",
                map: { type: "search", query: "Shorinzan Darumaji Temple" },
              },
            ],
          },
          {
            id: 3,
            label: "草津溫泉",
            title: "澀谷退房 → 輕井澤 → 草津溫泉",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
            highlight:
              "♨️ 輕井澤站轉乘急行巴士前往草津溫泉，入住享受老牌溫泉一泊二食",
            activities: [
              {
                time: "上午",
                text: "澀谷退房 → 輕井澤",
                transport: {
                  line: "JR 湘南新宿線 + 🚄 [新幹線] 北陸新幹線",
                  station: "澀谷站 (3號月台) → 大宮站 → 輕井澤站",
                  fare: "澀谷 ➔ 大宮 (JR): ¥580 / 大宮 ➔ 輕井澤 (新幹線): ¥5,720 (指定席) 或 ¥5,200 (自由席)",
                  note: "大宮轉新幹線車程共約 85 分鐘。週六強烈建議預訂新幹線指定席。",
                },
                map: {
                  type: "route",
                  origin: "Shibuya Station",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "中午",
                text: "輕井澤 → 草津巴士",
                transport: {
                  line: "草津交通巴士 / 西武觀光巴士 (急行草津溫泉行)",
                  station: "輕井澤站北口 2 號乘車處",
                  fare: "¥2,240 - ¥2,300",
                  note: "車程約 76-80 分鐘，沿途可欣賞高原森林風光。",
                },
                map: {
                  type: "route",
                  origin: "Karuizawa Station",
                  destination: "Kusatsu Onsen Bus Terminal",
                },
              },
              {
                time: "下午",
                text: "飯店 Check-in",
                subText: "草津溫泉旅館 (候選) • 湯畑與揉湯體驗",
                map: { type: "search", query: "Yubatake Kusatsu" },
              },
            ],
          },
        ],
      },
      {
        day: 5,
        date: "6/21 (日)",
        anniversary: true,
        title: "輕井澤慢活",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
        highlight: "🎊 三週年結婚紀念日！全天悠閒享受輕井澤度假感",
        options: [
          {
            id: 1,
            label: "輕井澤",
            title: "輕井澤慢活",
            image:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
            highlight:
              "🎊 三週年結婚紀念日！淺間王子退房，移至輕井澤 APA 並慢活遊玩",
            activities: [
              {
                time: "上午",
                text: "退房並移動至新飯店",
                subText: "搭乘飯店接駁車或計程車至輕井澤站前",
              },
              {
                time: "中午",
                text: "飯店 Check-in",
                subText: "輕井澤 APA (候選) • 站前步行 3 分鐘",
                map: { type: "search", query: "APA Hotel Karuizawa Ekimae" },
              },
              {
                time: "下午",
                text: "中輕井澤漫步",
                subText:
                  "漫遊榆樹街小鎮 (Harunire Terrace) 與造訪石之教會（需預約）",
                transport: {
                  line: "信濃鐵道 或 腳踏車",
                  station: "輕井澤站 (1、2號月台) → 中輕井澤站",
                  fare: "信濃鐵道單程 ¥240",
                  note: "車程約 4 分鐘",
                },
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
            ],
          },
          {
            id: 2,
            label: "高崎",
            title: "高崎 → 輕井澤慢活",
            image:
              "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
            highlight:
              "🎊 三週年結婚紀念日！從高崎搭乘新幹線返回輕井澤慢活遊玩",
            activities: [
              {
                time: "上午",
                text: "高崎退房 → 輕井澤",
                transport: {
                  line: "🚄 [新幹線] JR 北陸新幹線",
                  station: "高崎站 ➔ 輕井澤站",
                  fare: "¥2,510 (自由席) / ¥3,040 (指定席)",
                  note: "車程約 25 分鐘。週日早上建議提前購票或劃位。",
                },
                map: {
                  type: "route",
                  origin: "Takasaki Station",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "中午",
                text: "飯店 Check-in",
                subText: "輕井澤 APA (候選) • 站前步行 3 分鐘",
                map: { type: "search", query: "APA Hotel Karuizawa Ekimae" },
              },
              {
                time: "下午",
                text: "中輕井澤森林漫步",
                subText:
                  "漫遊榆樹街小鎮 (Harunire Terrace) 與造訪石之教會（需預約）",
                transport: {
                  line: "信濃鐵道 或 腳踏車",
                  station: "輕井澤站 → 中輕井澤站",
                  fare: "信濃鐵道單程 ¥240",
                  note: "車程約 4 分鐘",
                },
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
            ],
          },
          {
            id: 3,
            label: "草津溫泉",
            title: "草津溫泉 → 輕井澤慢活",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
            highlight:
              "🎊 三週年結婚紀念日！草津溫泉晨間漫步後，搭急行巴士返輕井澤度假",
            activities: [
              {
                time: "上午",
                text: "草津老街晨間散步",
                subText:
                  "清晨的溫泉街「湯畑」漫步，享受清幽的溫泉鄉氛圍，隨後退房",
                map: { type: "search", query: "Yubatake Kusatsu" },
              },
              {
                time: "中午",
                text: "巴士返輕井澤",
                transport: {
                  line: "草津交通巴士 / 西武觀光巴士 (急行)",
                  station: "草津溫泉巴士總站 ➔ 輕井澤站北口",
                  fare: "¥2,240 - ¥2,300",
                  note: "車程約 80 分鐘。抵達後步行 3 分鐘至 APA 飯店寄放行李。",
                },
                map: {
                  type: "route",
                  origin: "Kusatsu Onsen Bus Terminal",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "下午",
                text: "中輕井澤森林漫步",
                subText:
                  "漫遊榆樹街小鎮 (Harunire Terrace) 與造訪石之教會（需預約）",
                transport: {
                  line: "信濃鐵道 或 腳踏車",
                  station: "輕井澤站 → 中輕井澤站",
                  fare: "信濃鐵道單程 ¥240",
                  note: "車程約 4 分鐘",
                },
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
            ],
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
            text: "退房 ➔ 租車慢遊",
            subText: "推薦白貓自行車（電動 ¥1,500/日，普通 ¥700/日）",
            note: "新輕井澤 ↔ 中輕井澤若不騎車，亦可搭乘信濃鐵道（車程約 4 分鐘，單程 ¥240，每小時 1-2 班）",
            map: { type: "search", query: "Kumoba Pond Karuizawa" },
          },
          {
            time: "傍晚",
            text: "飯店 Check-in",
            subText: "輕井澤英迪格 (候選) • 渡假設計體驗",
            map: { type: "search", query: "Hotel Indigo Karuizawa" },
          },
        ],
      },
      {
        day: 7,
        date: "6/23 (二)",
        title: "輕井澤→東京",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛒 王子 Outlet 採買・章姬草莓・返東京",
        activities: [
          {
            time: "上午",
            text: "王子 Outlet 採買",
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
              line: "🚄 [新幹線] 北陸新幹線",
              station: "輕井澤站",
              platform: "1、2 號新幹線月台",
              fare: "¥6,020 (指定席) / ¥5,490 (自由席)",
              note: "直達東京站，車程約 70 分鐘",
            },
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Tokyo Station",
            },
          },
          {
            time: "傍晚",
            text: "飯店 Check-in",
            subText: "東京站周邊飯店 (候選)",
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
        date: "6/24 (三)",
        title: "返程",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 16:50 NRT 起飛，帶著回憶回家",
        activities: [
          { time: "上午", text: "整理行李、退房" },
          {
            time: "13:30",
            text: "東京站 → 成田",
            transport: {
              line: "🚇 [特急] N'EX 成田特快",
              station: "東京站 (總武地下線)",
              platform: "地下 5 樓 1、2 號月台",
              fare: "含於 N'EX 來回優惠票 (NT$ 1,109)",
              note: "⚠️ 警告：總武地下月台極深，從地面轉乘步行至少需 15-20 分鐘，請務必提早出發！車程約 60 分鐘。",
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
  { item: "機票（單人）", cost: 52273, note: "去程無托運，回程合購1件托運" },
  { item: "交通 - N'EX 特急", cost: 5000, note: "約 NT$1,100" },
  { item: "交通 - 新幹線", cost: 10330, note: "大宮→輕井澤→東京" },
  { item: "交通 - 腳踏車", cost: 700, note: "非電動（輕井澤）" },
  { item: "交通 - ICOCA/Suica", cost: 2000, note: "市區地鐵、公車儲值" },
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
        line: "🚇 [特急] JR N'EX 成田特快",
        station: "成田 T1 (B1 JR)",
        platform: "1/2號月台",
        duration: "約90分",
        fare: "來回優惠票 NT$ 1,109",
        note: "直達車，免換車。",
      },
    ],
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
        fare: "¥480",
        note: "直達。亦可搭東急/東海道線(需轉乘)。",
      },
    ],
  },
  {
    id: 3,
    day: "Day 4 (6/20 六)",
    type: "route",
    name: "澀谷 → 輕井澤/高崎/草津",
    options: [
      {
        id: "opt1",
        label: "輕井澤",
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
            fare: "¥580",
            note: "搭至大宮轉乘",
          },
          {
            type: "shinkansen",
            line: "🚄 [新幹線] 北陸新幹線",
            station: "大宮站",
            platform: "17/18月台",
            duration: "約50分",
            fare: "¥5,720 (指定席) / ¥5,200 (自由席)",
            note: "轉乘需過聯絡閘門",
          },
        ],
      },
      {
        id: "opt2",
        label: "高崎",
        origin: "Shibuya Station",
        destination: "Takasaki Station",
        duration: "約60分 / 95分",
        steps: [
          {
            type: "train",
            line: "方式 A：大宮轉乘 🚄 [新幹線] 北陸/上越新幹線",
            station: "澀谷站 ➔ 大宮站 (站內轉乘) ➔ 高崎站",
            platform: "澀谷3號月台 / 大宮17、18號月台",
            duration: "約60分",
            fare: "澀谷 ➔ 大宮 (JR): ¥580 / 大宮 ➔ 高崎 (新幹線): ¥3,910 (指定席) 或 ¥3,280 (自由席)",
            note: "大宮轉北陸/上越新幹線，票價為大宮轉乘差額。持東京廣域周遊券免額外補票。",
          },
          {
            type: "train",
            line: "方式 B：JR 湘南新宿線特別快速",
            station: "澀谷站 ➔ 高崎站",
            platform: "澀谷3號月台",
            duration: "約95分",
            fare: "¥1,980",
            note: "直達高崎免轉乘。相較於新幹線，此方案可省下特急券費用，車程多約 35 分鐘。",
          },
        ],
      },
      {
        id: "opt3",
        label: "草津溫泉",
        origin: "Shibuya Station",
        destination: "Kusatsu Onsen",
        duration: "165分",
        steps: [
          {
            type: "train",
            line: "JR 湘南新宿線",
            station: "澀谷站",
            platform: "3號月台",
            duration: "約35分",
            fare: "¥580",
            note: "搭至大宮轉乘",
          },
          {
            type: "shinkansen",
            line: "🚄 [新幹線] 北陸新幹線",
            station: "大宮站",
            platform: "17/18月台",
            duration: "約50分",
            fare: "¥5,720 (指定席) / ¥5,200 (自由席)",
            note: "大宮轉乘至輕井澤",
          },
          {
            type: "bus",
            line: "草津交通 / 西武觀光巴士 (急行)",
            station: "輕井澤站北口 2號乘車處",
            duration: "約80分",
            fare: "¥2,240 - ¥2,300",
            note: "搭乘急行巴士直達草津溫泉。",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    day: "Day 5 (6/21 日)",
    type: "route",
    name: "輕井澤",
    options: [
      {
        id: "d5-opt1",
        label: "輕井澤",
        duration: "全天",
        steps: [
          {
            type: "bike",
            line: "白貓腳踏車",
            station: "輕井澤北口對面",
            fare: "電動 ¥1,500/日 (普通車 ¥700/日)",
            note: "17:00 前還。",
          },
          {
            type: "train",
            line: "信濃鐵道",
            station: "中輕井澤站",
            platform: "北口 1/2號",
            duration: "約4分",
            fare: "¥240",
            note: "車程約 4 分鐘，每小時 1-2 班。",
          },
        ],
      },
      {
        id: "d5-opt2",
        label: "高崎",
        duration: "全天",
        steps: [
          {
            type: "train",
            line: "🚄 [新幹線] JR 北陸新幹線",
            station: "高崎站 ➔ 輕井澤站",
            platform: "高崎站新幹線月台",
            duration: "約25分",
            fare: "¥2,510 (自由席) / ¥3,040 (指定席)",
            note: "持東京廣域周遊券免費。",
          },
          {
            type: "bike",
            line: "白貓腳踏車",
            station: "輕井澤北口對面",
            fare: "電動 ¥1,500/日 (普通車 ¥700/日)",
            note: "17:00 前還。",
          },
          {
            type: "train",
            line: "信濃鐵道",
            station: "中輕井澤站",
            platform: "北口 1/2號",
            duration: "約4分",
            fare: "¥240",
            note: "車程約 4 分鐘，每小時 1-2 班。",
          },
        ],
      },
      {
        id: "d5-opt3",
        label: "草津溫泉",
        duration: "全天",
        steps: [
          {
            type: "bus",
            line: "草津交通 / 西武觀光巴士 (急行)",
            station: "草津溫泉巴士總站 ➔ 輕井澤站北口",
            duration: "約80分",
            fare: "¥2,240 - ¥2,300",
            note: "沿途可欣賞高原山林美景。",
          },
          {
            type: "bike",
            line: "白貓腳踏車",
            station: "輕井澤北口對面",
            fare: "電動 ¥1,500/日 (普通車 ¥700/日)",
            note: "17:00 前還。",
          },
          {
            type: "train",
            line: "信濃鐵道",
            station: "中輕井澤站",
            platform: "北口 1/2號",
            duration: "約4分",
            fare: "¥240",
            note: "車程約 4 分鐘，每小時 1-2 班。",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    day: "Day 6 (6/22 一)",
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
        fare: "電動 ¥1,500/日 (普通車 ¥700/日)",
        note: "17:00 前還。",
      },
      {
        type: "train",
        line: "信濃鐵道",
        station: "中輕井澤",
        platform: "北口 1/2號",
        duration: "約4分",
        fare: "¥240",
        note: "車程約 4 分鐘，每小時 1-2 班。",
      },
    ],
  },
  {
    id: 6,
    day: "Day 7 (6/23 二)",
    type: "route",
    name: "輕井澤 → 東京",
    origin: "Karuizawa Station",
    destination: "Tokyo Station",
    duration: "70分",
    steps: [
      {
        type: "shinkansen",
        line: "🚄 [新幹線] 北陸新幹線",
        station: "輕井澤站",
        platform: "1/2號月台",
        duration: "約70分",
        fare: "¥6,020 (指定席) / ¥5,490 (自由席)",
        note: "直達東京",
      },
    ],
  },
  {
    id: 7,
    day: "Day 8 (6/24 三)",
    type: "route",
    name: "東京 → 成田",
    origin: "Tokyo Station",
    destination: "Narita Airport Terminal 1",
    duration: "60分",
    steps: [
      {
        type: "train",
        line: "🚇 [特急] JR N'EX 成田特快",
        station: "東京總武地下",
        platform: "B5 1/2月台",
        duration: "約60分",
        fare: "含於 N'EX 來回優惠票 (NT$ 1,109)",
        note: "⚠️ B5月台極深，從地面步行需15-20分，務必提早！",
      },
    ],
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
              mapUrl: "https://maps.app.goo.gl/p2WtcQGsogN4VZWx9",
            },
          ],
        },
      ],
    },
    {
      location: "澀谷",
      day: "Day 3-4",
      sections: [
        {
          title: "🍽 餐廳",
          items: [
            {
              name: "AFURI 澀谷",
              type: "拉麵",
              desc: "澀谷超人氣拉麵名店，提供兩款素食拉麵",
              recommended: true,
              mapUrl: "https://maps.app.goo.gl/LiH7B3axDie1uHbk9",
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
      location: "原宿・表參道",
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
          title: "🍽 餐廳",
          items: [
            {
              name: "AFURI 原宿",
              type: "拉麵",
              desc: "位於原宿的超人氣拉麵名店，招牌柚子拉麵極受歡迎，同樣提供兩款精緻素食拉麵",
              recommended: true,
              mapUrl: "https://maps.app.goo.gl/k6MXQBnUxg1NbzpJ6",
            },
            {
              name: "九州じゃんがら 原宿店",
              type: "拉麵",
              desc: "東京老牌拉麵名店，提供經典九州豚骨拉麵，有多款人氣全素拉麵可供選擇，湯頭濃郁",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/HvdtNQmww5g9vDk87",
            },
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
              name: "YAYOI 彌生軒 青山學院大學前店",
              type: "日式定食",
              desc: "表參道與澀谷之間日式定食餐廳，各式經典和食與定食套餐選擇",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/AaC4g4TxhKB2dfdo6",
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
              name: "BOULANGERIE ASANOYA 舊輕井澤本店",
              type: "麵包店",
              desc: "舊輕井澤銀座通百年老鋪，招牌是石窯烘烤的歐式麵包",
              recommended: true,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=BOULANGERIE+ASANOYA+Karuizawa",
            },
            {
              name: "輕井澤法國麵包店 (Karuizawa French Bakery)",
              type: "麵包店",
              desc: "約翰藍儂也愛造訪的經典老店，法國麵包與香脆可頌非常出名",
              recommended: false,
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Karuizawa+French+Bakery",
            },
            {
              name: "Café St.Maire KUMOBA",
              type: "咖啡廳",
              desc: "雲場池旁咖啡店，提供無肉咖哩 (價位偏高)",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/pGcXaeyvvxXoS1sa9",
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
              mapUrl: "https://maps.app.goo.gl/8fqYdYBZqVebwp5f7",
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

export const attractionData = {
  categories: [
    {
      location: "橫濱",
      day: "Day 1-2",
      sections: [
        {
          title: "🌲 觀光",
          items: [
            {
              name: "YOKOHAMA AIR CABIN (橫濱空中纜車)",
              type: "空中纜車",
              desc: "連接櫻木町站與運河公園，體驗全日本首座都市型循環式索道纜車，橫濱港灣美景盡收眼底。",
              note: "🎫 門票：單程 1,000円 / 往復 1,800円",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=YOKOHAMA+AIR+CABIN",
            },
            {
              name: "山下公園",
              type: "海濱公園",
              desc: "海濱散步，享受橫濱港灣風情與玫瑰花季。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Yamashita+Park+Yokohama",
            },
            {
              name: "港未來・COSMOWORLD",
              type: "遊樂園",
              desc: "擁有地標摩天輪與 AIR CABIN 纜車，夜景絕佳。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Cosmoworld+Yokohama",
            },
            {
              name: "合味道紀念館",
              type: "博物館",
              desc: "泡麵博物館，可體驗親手製作專屬的杯麵。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=CupNoodles+Museum+Yokohama",
            },
          ],
        },
        {
          title: "🛒 購物",
          items: [
            {
              name: "科萊特馬雷 港未來購物中心",
              type: "綜合商場",
              desc: "櫻木町站前的綜合性購物商場，匯聚時尚、餐飲、生活雜貨，視野佳。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Colette+Mare+Minatomirai",
            },
            {
              name: "橫濱元町商店街",
              type: "特色商店街",
              desc: "具有歐式風情的歷史商店街，以精品、飾品與咖啡店聞名，散步感十足。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Yokohama+Motomachi+Shopping+Street",
            },
            {
              name: "橫濱紅磚倉庫 1號館 & 2號館",
              type: "文創市集",
              desc: "歷史建築改建的文創與商業空間，有許多獨特的雜貨、美食與期間限定市集。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Yokohama+Red+Brick+Warehouse",
            },
            {
              name: "MARINE & WALK 橫濱",
              type: "海濱購物",
              desc: "充滿美式開放感的海濱購物中心，聚集時尚品牌與露天餐廳，景色怡人。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Marine+Walk+Yokohama",
            },
          ],
        },
      ],
    },
    {
      location: "澀谷",
      day: "Day 2-3",
      sections: [
        {
          title: "🌲 觀光",
          items: [
            {
              name: "SHIBUYA SKY (澀谷天空展望台)",
              type: "展望台",
              desc: "頂樓 360 度無死角玻璃展望台，極力推薦日落前入場，可俯瞰著名的澀谷十字路口與東京鐵塔。",
              note: "🎫 門票 (WEB)：15:00前 2,700円 / 15:00後 3,400円",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=SHIBUYA+SKY",
            },
          ],
        },
        {
          title: "🛒 購物",
          items: [
            {
              name: "澀谷SCRAMBLE SQUARE",
              type: "地標百貨",
              desc: "澀谷最新超高層地標，擁有豐富的高級時尚品牌、流行雜貨，SHIBUYA SKY 展望台入口位於 14F。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Square",
            },
            {
              name: "MAGNET by SHIBUYA109",
              type: "商場",
              desc: "以動漫、流行 culture 與美食為主打，還有頂樓觀景台",
              mapUrl: "https://maps.app.goo.gl/N9sU1pX3XzJvKxTq5",
            },
            {
              name: "Shibuya 109",
              type: "潮流服飾",
              desc: "澀谷最具代表性的潮流服飾百貨，集結日本最新流行趨勢品牌。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Shibuya+109",
            },
            {
              name: "任天堂 東京旗艦店",
              type: "限定旗艦店",
              desc: "位於澀谷 PARCO 6F 的任天堂官方直營店，販售多樣限定周邊與特色商品。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Nintendo+Tokyo+Shibuya+PARCO",
            },
            {
              name: "東急FoodShow 澀谷店",
              type: "伴手禮・美食",
              desc: "位於澀谷站地下一樓，採買在地甜點、熟食便當與伴手禮的必去好去處。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Tokyu+FoodShow+Shibuya",
            },
          ],
        },
      ],
    },
    {
      location: "原宿・表參道",
      day: "Day 2-3",
      sections: [
        {
          title: "🌲 觀光",
          items: [
            {
              name: "代代木公園",
              type: "公園",
              desc: "都市中的綠洲，賞楓勝地，佔地廣大適合散步放鬆",
              mapUrl: "https://maps.app.goo.gl/4N3r6P8sB2wz5eZc9",
            },
            {
              name: "竹下通",
              type: "景點",
              desc: "原宿人氣徒步區，充滿年輕流行文化、日系服飾與可麗餅",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=竹下通",
            },
          ],
        },
        {
          title: "🛒 購物",
          items: [
            {
              name: "Laforet 原宿",
              type: "商場",
              desc: "原宿地標性時尚購物中心，匯集眾多日系潮流服飾品牌",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Laforet+Harajuku",
            },
            {
              name: "生活之木 原宿表參道店",
              type: "香氛/雜貨",
              desc: "知名香氛精油品牌旗艦店，可購買各類精油與香氛產品",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=生活之木+原宿表參道店",
            },
            {
              name: "NUMBER SUGAR 手工牛奶糖",
              type: "伴手禮",
              desc: "表參道高人氣的質感手工焦糖牛奶糖，包裝精美適合送禮",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=NUMBER+SUGAR+Omotesando",
            },
          ],
        },
      ],
    },
    {
      location: "輕井澤",
      day: "Day 4-6",
      sections: [
        {
          title: "🌲 觀光",
          items: [
            {
              name: "雲場池",
              type: "自然名勝",
              desc: "輕井澤代表性景點，四季皆美，尤其是新綠與紅葉時期，被稱為天鵝湖。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kumoba+Pond+Karuizawa",
            },
          ],
        },
        {
          title: "🛒 購物",
          items: [
            {
              name: "輕井澤王子購物廣場",
              type: "Outlet",
              desc: "位於輕井澤車站南側的大型暢貨中心，環境優美品牌豐富，適合整天採購。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Karuizawa+Prince+Shopping+Plaza",
            },
            {
              name: "舊輕井澤銀座通",
              type: "歷史商店街",
              desc: "輕井澤最著名的散策商店街，適合購買手工藝品、特色伴手禮與享用散策美食。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kyu+Karuizawa+Ginza+Street",
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
          title: "🌲 觀光",
          items: [
            {
              name: "石之教會",
              type: "特色建築",
              desc: "由石頭與玻璃建成的獨特教堂，光影變幻令人讚嘆 (內部參觀需預約)。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Stone+Church+Karuizawa",
            },
            {
              name: "輕井澤高原教會",
              type: "歷史教堂",
              desc: "隱密於森林中的木造教堂，充滿歷史溫度，也是知名婚禮聖地，常有音樂會。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Karuizawa+Kogen+Church",
            },
            {
              name: "星野溫泉 蜻蛉之湯",
              type: "溫泉",
              desc: "位於星野區的現代日式溫泉，擁有被森林環繞的露天大浴池與室內檜木風呂，四季風情極佳",
              note: "🎫 泡湯：1,550円",
              mapUrl: "https://maps.app.goo.gl/zFoZCaYtuG3MZ7BE6",
            },
            {
              name: "輕井澤野鳥之森",
              type: "自然名勝",
              desc: "佔地約 100 公頃的國立自然保護區，設有漫步步道，可觀賞百餘種野鳥與野生動植物，適合森林浴",
              mapUrl: "https://maps.app.goo.gl/Mq6p4srsDW9M8pVm9",
            },
          ],
        },
        {
          title: "🛒 購物",
          items: [
            {
              name: "榆樹街小鎮",
              type: "文青選物",
              desc: "位於星野區的文青風木棧道購物區，有多家精緻小店、咖啡廳與設計師品牌。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Harunire+Terrace+Karuizawa",
            },
          ],
        },
      ],
    },
  ],
};

export const shoppingData = {
  targetStores: ["Shibuya 109", "松本清", "唐吉訶德", "輕井澤 Outlet"],
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
      image:
        "https://cosme-global-production.s3.amazonaws.com/uploads/product_sku_image/149669/211753/215225/medium_211753_202505200306.png",
    },
    {
      name: "樂敦 抗藍光眼藥水",
      nameJp: "ロート デジアイ",
      desc: "【黃盒PC】專攻藍光傷害，黃色包裝與液體，修復長時間看螢幕造成的細胞疲勞。涼度 2 級。",
      price: 968,
      category: "保養",
      shop: "藥妝店",
      image: "/me/images/products/rohto_digi_eye.png",
    },
    {
      name: "參天 Sante PC",
      nameJp: "サンテPC",
      desc: "【紅盒PC】含維生素 B12 (粉紅液體)，舒緩眼睛緊盯螢幕肌肉疲勞。涼度 3 級。",
      price: 880,
      category: "保養",
      shop: "藥妝店",
      image: "/me/images/products/sante_pc.png",
    },
    {
      name: "樂敦 Dry Aid EX",
      nameJp: "ロート ドライエイドEX",
      desc: "【高保濕】高黏度質地，在眼球表面形成持久保濕膜，解決水分快速蒸發的乾澀。涼度 1-2 級。",
      price: 1320,
      category: "保養",
      shop: "藥妝店",
      image: "/me/images/products/rohto_dry_aid_ex.png",
    },
    {
      name: "ELIXIR 小粉管防曬乳",
      nameJp: "デーケアレボリューション トーンアップ SP+",
      desc: "妝前乳+防曬+乳液三合一，SPF50+ PA++++，淡淡粉嫩提亮，保濕度佳讓氣墊粉餅更服貼。",
      price: 3410,
      category: "彩妝",
      shop: "藥妝店 / 唐吉訶德",
      image: "/me/images/products/elixir_pink_tube.png",
    },
    {
      name: "ELIXIR 小銀管防曬乳",
      nameJp: "エリクシール ブライトニング UV クリーム",
      desc: "防曬+美白二合一，SPF50+ PA++++，質地清爽不黏膩，提升膚色均勻感。",
      price: 3410,
      category: "彩妝",
      shop: "藥妝店 / 唐吉訶德",
      image: "/me/images/products/elixir_silver_tube.png",
    },
    {
      name: "&be 氣墊粉餅",
      nameJp: "アンドビー クッションファンデ",
      desc: "【白氣墊（霧面）】色號：Beige (自然米色)。霧面妝效，輕薄透氣，溫水可卸。深色痘疤需搭配遮瑕盤。",
      price: 3200,
      category: "彩妝",
      shop: "藥妝店 / 唐吉訶德",
      image: "/me/images/products/andbe_cushion.png",
    },
    {
      name: "ByUR 氣墊粉餅",
      nameJp: "バイユア クッションファンデ",
      desc: "【霧面白盒 Matte】Serumfit Fullcover Matte Cushion。色號：#21 Light Beige (自然偏白)。中高遮瑕，柔焦毛孔與泛紅。",
      price: 3600,
      category: "彩妝",
      shop: "藥妝店 / 唐吉訶德",
      image: "/me/images/products/byur_matte_cushion.png",
    },
    {
      name: "NUMBER SUGAR 手工牛奶糖",
      nameJp: "ナンバーシュガー キャラメル",
      desc: "表參道超人氣手工牛奶糖，精緻白盒包裝送禮首選，口味多樣。",
      price: 1296,
      category: "食物",
      shop: "NUMBER SUGAR 表參道",
      image: "/me/images/products/number_sugar.png",
    },
    {
      name: "天然果醬 澤屋 (SAWAYA)",
      nameJp: "沢屋 ジャム",
      desc: "輕井澤必買無添加果醬伴手禮，特別推薦草莓牛奶等熱銷口味。",
      price: 810,
      category: "食物",
      shop: "舊輕井澤",
      image:
        "https://m.media-amazon.com/images/I/414grYP1OHL._AC_UF1000,1000_QL80_.jpg",
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
      image: "https://m.media-amazon.com/images/I/71X7r4QyQKL._AC_UY900_.jpg",
    },
    {
      name: "隨身背包",
      nameJp: "",
      desc: "皮革側背包，棕色真皮質感",
      price: null,
      category: "衣飾",
      shop: "百貨 / 專賣店",
      image: "/me/images/products/leather_bag.jpg",
    },
    {
      name: "皮夾",
      nameJp: "",
      desc: "Roots 經典棕色真皮短夾",
      price: null,
      category: "衣飾",
      shop: "Roots / 百貨",
      image: "/me/images/products/roots_wallet.png",
    },
    {
      name: "MUJI 耳環收納",
      nameJp: "ベロア内箱仕切リング用　ネックレス・ピアススタンド用",
      desc: "無印良品灰色天鵝絨首飾盒/內盒仕切，適合收納手鍊與耳環。",
      price: 390,
      category: "居家",
      shop: "無印良品",
      image: "/me/images/products/muji_velour_case.png",
    },
    {
      name: "MUJI 精油",
      nameJp: "エッセンシャルオイル",
      desc: "100% 天然精油，至現場親自體驗並挑選喜愛的香氣味道。",
      price: 890,
      category: "居家",
      shop: "無印良品",
      image: "/me/images/products/muji_essential_oil_lemongrass.png",
    },
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
  ],
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
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Yokohama+Minatomirai+Premier",
        priceTwd: 3000,
      },
    ],
  },
  {
    location: "橫濱 / 澀谷",
    period: "Day 2 (6/18 四)",
    hotels: [
      {
        name: "Super Hotel Yokohama Kannai",
        status: "待訂",
        desc: "高CP值商務旅館",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Yokohama+Kannai",
        priceTwd: 3000,
      },
      {
        name: "相鐵Fresa Inn 橫濱櫻木町",
        status: "待訂",
        desc: "近車站，交通便利",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Sotetsu+Fresa+Inn+Yokohama+Sakuragicho",
        priceTwd: 3000,
      },
      {
        name: "澀谷飯店 (待定)",
        status: "待訂",
        desc: "若選擇提早移動到澀谷",
        priceTwd: 3000,
      },
    ],
  },
  {
    location: "澀谷",
    period: "Day 3 (6/19 五)",
    hotels: [
      {
        name: "待定 (澀谷周邊)",
        status: "待訂",
        desc: "Shibuya 109 採買日，住澀谷最方便",
        features: ["交通樞紐", "購物"],
        priceTwd: 3000,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 4 (6/20 六)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "待訂",
        desc: "站前步行 3 分鐘寄放行李，便捷高效首選",
        features: ["交通便利", "車站旁"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 4900,
      },
      {
        name: "多美迎高崎酒店 (Dormy Inn Takasaki)",
        status: "待訂",
        desc: "高崎站旁附天然溫泉與免費拉麵，適合作為交通中繼站",
        features: ["溫泉", "交通便利"],
        mapUrl: "https://maps.app.goo.gl/TnUyWtAd4NAzA8MA8",
        priceTwd: 3500,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "待訂",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 8500,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "待訂",
        desc: "奢華設計木質渡假體驗",
        features: ["設計感", "渡假"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 15000,
      },
      {
        name: "待定 (草津溫泉)",
        status: "待訂",
        desc: "若提早前去草津，考量老牌溫泉旅館的一泊二食體驗",
        features: ["溫泉", "一泊二食"],
        priceTwd: 8000,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 5 (6/21 日)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "待訂",
        desc: "站前步行 3 分鐘放行李，平價便捷",
        features: ["交通便利", "車站旁"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 2400,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "待訂",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 6500,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "待訂",
        desc: "三週年紀念日主場！奢華設計木質渡假體驗",
        features: ["設計感", "紀念日", "渡假"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 11000,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 6 (6/22 一)",
    hotels: [
      {
        name: "輕井澤 APA 飯店",
        status: "待訂",
        desc: "站前步行 3 分鐘放行李，平價便捷",
        features: ["交通便利", "車站旁"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=APA+Hotel+Karuizawa+Ekimae",
        priceTwd: 2400,
      },
      {
        name: "輕井澤淺間王子大飯店",
        status: "待訂",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景",
        features: ["溫泉", "淺間山景"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceTwd: 5800,
      },
      {
        name: "輕井澤英迪格酒店 (Hotel Indigo)",
        status: "待訂",
        desc: "奢華設計木質渡假體驗",
        features: ["設計感", "渡假"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Indigo+Karuizawa",
        priceTwd: 10000,
      },
    ],
  },
  {
    location: "東京",
    period: "Day 7 (6/23 二)",
    hotels: [
      {
        name: "待定 (東京站周邊)",
        status: "待訂",
        desc: "最後一晚，考量隔日搭乘 N'EX 前往成田機場的便利性",
        features: ["交通樞紐"],
        priceTwd: 3000,
      },
    ],
  },
];

export const weatherData = {
  sourceNote:
    "依據 tenki.jp 東京千代田區氣候值推估（6月中旬梅雨季），旅行前請至 tenki.jp 確認最新預報",
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
