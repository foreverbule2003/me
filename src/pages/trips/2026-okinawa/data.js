export const TRIP_ID = "2026-okinawa";

export const tripMeta = {
  id: TRIP_ID,
  badge: "JP · OKINAWA · 2026",
  title: "沖繩",
  subtitle: "公司員旅",
  footer: "© 2026 沖繩 公司員旅",
  heroImage: "/me/images/hero-okinawa-2026.png",
  nights: 4,
  exchangeRate: 0.2,
  exchangeRateLabel: "¥1 ≈ NT$0.20",
};

export const stationMapping = {
  dayLabel: "Day 2",
  title: "那霸單軌電車重點車站",
  stations: [
    { zh: "縣廳前站", ja: "県庁前", en: "Kenchomae (國際通西側/飯店步行7分)" },
    { zh: "牧志站", ja: "牧志", en: "Makishi (國際通東側/牧志市場)" },
    { zh: "歌町站", ja: "おもろまち", en: "Omoromachi (新都心/DFS免稅店)" },
    { zh: "首里站", ja: "首里", en: "Shuri (首里城)" },
  ],
};

export const weatherData = {
  sourceNote: "更新於 2026/10 - 日本氣象廳預報",
  sourceUrl: "https://tenki.jp/",
  days: [],
};

export const flightData = {
  outbound: {
    airline: "星宇航空",
    flightNo: "JX870",
    date: "10/02 (五)",
    time: { depart: "12:00", arrive: "14:40" },
    airport: { depart: "TPE 桃園", arrive: "OKA 那霸" },
    terminal: { depart: "T1", arrive: "I" },
    duration: "1h40m",
    baggage: "託運 23kg／手提 7kg",
    note: "09:00 桃園機場第一航廈 星宇航空團體櫃台集合",
  },
  inbound: {
    airline: "星宇航空",
    flightNo: "JX871",
    date: "10/06 (二)",
    time: { depart: "15:50", arrive: "16:25" },
    airport: { depart: "OKA 那霸", arrive: "TPE 桃園" },
    terminal: { depart: "I", arrive: "T1" },
    duration: "1h35m",
    baggage: "託運 23kg／手提 7kg",
    note: "",
  },
};

export const overviewData = [
  {
    day: 1,
    date: "10/02 (五)",
    title: "抵達・瀨長島・花琉球",
    hotel: "HOTEL COLLECTIVE",
  },
  {
    day: 2,
    date: "10/03 (六)",
    title: "那霸市區自由活動",
    hotel: "HOTEL COLLECTIVE",
  },
  {
    day: 3,
    date: "10/04 (日)",
    title: "Junglia 樂園／自由活動",
    hotel: "沖繩王子大飯店",
  },
  {
    day: 4,
    date: "10/05 (一)",
    title: "古宇利・水族館・美國村",
    hotel: "沖繩王子大飯店",
  },
  {
    day: 5,
    date: "10/06 (二)",
    title: "半潛水艇・海葡萄・返程",
    hotel: "✈️ 回家",
  },
];

export const itineraryData = [
  {
    phase: "第一階段：那霸市區 (Day 1-2)",
    days: [
      {
        day: 1,
        date: "10/02 (五)",
        title: "抵達與小希臘瀨長島",
        image:
          "https://images.unsplash.com/photo-1627885444654-e0e64c399a5e?w=1200",
        highlight: "✨ 落地直奔純白小希臘瀨長島，晚上三線琴表演配沖繩料理",
        activities: [
          {
            time: "09:00",
            text: "桃園機場第一航廈集合",
            subText: "星宇航空團體櫃台",
          },
          {
            time: "12:00",
            text: "桃園國際機場起飛",
            subText: "星宇航空 JX870（午餐：機上餐食）",
          },
          { time: "14:40", text: "抵達沖繩那霸國際機場" },
          {
            time: "下午",
            text: "瀨長島 Umikaji Terrace",
            subText: "純白建築 × 蔚藍海景的沖繩小希臘，還能看飛機起降",
          },
          {
            time: "晚餐",
            text: "花琉球 三線琴表演",
            subText: "沖繩料理晚餐與酒水放題",
            isFood: true,
          },
          {
            time: "晚上",
            text: "入住 HOTEL COLLECTIVE 嘉新酒店",
            subText: "國際通心臟地帶，距單軌「縣廳前站」步行約 7 分鐘",
          },
        ],
      },
      {
        day: 2,
        date: "10/03 (六)",
        title: "整日自由活動",
        image:
          "https://images.unsplash.com/photo-1579737951509-f39b6fc9df92?w=1200",
        highlight: "✨ 贈送單軌電車一日卷，探索那霸市區",
        activities: [
          { time: "早上", text: "飯店內豐盛早餐" },
          {
            time: "全日",
            text: "自由活動",
            subText: "贈單軌電車一日卷（當日不限次數搭乘）",
            note: "午晚餐方便遊玩敬請自理",
            tips: "飯店步行：國際通 3 分、RYUBO 百貨 5 分、第一牧志公設市場 8 分；搭單軌：首里城約 15 分、DFS 免稅店約 22 分",
          },
          { time: "晚上", text: "返回 HOTEL COLLECTIVE 嘉新酒店" },
        ],
      },
    ],
  },
  {
    phase: "第二階段：北部探索與海岸度假 (Day 3-5)",
    days: [
      {
        day: 3,
        date: "10/04 (日)",
        title: "Junglia 叢林大冒險",
        image:
          "https://images.unsplash.com/photo-1533606990425-4c079db8542e?w=1200",
        highlight: "✨ 勇闖 2025 開幕的侏儸紀叢林樂園（或選 B 行程自由活動）",
        activities: [
          { time: "早上", text: "飯店內早餐", subText: "HOTEL COLLECTIVE 退房" },
          {
            time: "全日",
            text: "A 行程：Junglia Okinawa 侏儸紀叢林樂園",
            subText: "走進恐龍世界，體驗叢林探險與自然生態的融合",
            note: "午晚餐方便遊玩敬請自理",
            tips: "B 行程：自由活動（發放代金 ¥1,000/人），可在那霸市區逛街散策",
          },
          { time: "晚上", text: "入住 沖繩王子大飯店海景宜野灣", subText: "全房型海景附露台" },
        ],
      },
      {
        day: 4,
        date: "10/05 (一)",
        title: "古宇利與美麗海",
        image:
          "https://images.unsplash.com/photo-1614769018788-b2cf5e05a8f6?w=1200",
        highlight: "✨ 奔向神話之島，潛入深海奇蹟與浪漫美國村",
        activities: [
          { time: "早上", text: "飯店內早餐" },
          {
            time: "上午",
            text: "古宇利島大橋與古宇利海洋塔",
            subText: "搭乘電動車上 82m 展望塔遠眺絕美海景",
          },
          { time: "午餐", text: "海景自助餐", isFood: true },
          {
            time: "下午",
            text: "海洋博公園・沖繩美麗海水族館",
            subText: "東亞最大夢幻水族箱與巨大鯨鯊，另有海豚秀",
          },
          {
            time: "傍晚",
            text: "北谷町美國村",
            subText: "充滿美洲風情，看夕陽逛街購物",
          },
          {
            time: "晚餐",
            text: "燒肉自助晚餐吃到飽",
            subText: "飲料無限暢飲",
            isFood: true,
          },
          { time: "晚上", text: "返回 沖繩王子大飯店海景宜野灣" },
        ],
      },
      {
        day: 5,
        date: "10/06 (二)",
        title: "海底探險與返程",
        image:
          "https://images.unsplash.com/photo-1598059885816-dbf1cc9247eb?w=1200",
        highlight: "✨ 半潛水艇海底探險、海葡萄採撈體驗，免稅店補貨後返台",
        activities: [
          { time: "早上", text: "飯店內早餐", subText: "沖繩王子大飯店退房" },
          {
            time: "上午",
            text: "銀河探險號半潛水艇",
            subText: "特別安排：觀賞珊瑚礁間的熱帶魚群",
          },
          {
            time: "上午",
            text: "海ん道 UMINCHI 海葡萄農場",
            subText: "採舀吃體驗 + 贈海葡萄冰淇淋",
          },
          { time: "午餐", text: "涮涮鍋放題", isFood: true },
          { time: "下午", text: "免稅店", subText: "選購伴手禮" },
          {
            time: "15:50",
            text: "沖繩那霸國際機場起飛",
            subText: "星宇航空 JX871（晚餐：機上餐食）",
          },
          { time: "16:25", text: "抵達桃園國際機場" },
        ],
      },
    ],
  },
];

export const budgetData = [
  { item: "團費", cost: 0, note: "NT$46,000 / 人" },
  { item: "交通", cost: 0, note: "" },
  { item: "住宿", cost: 0, note: "團費內含" },
  { item: "餐飲", cost: 0, note: "Day 2、Day 3 午晚餐自理" },
  { item: "購物", cost: 0, note: "" },
];

export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 2 (10/03 六)",
    name: "那霸市區單軌電車一日遊",
    origin: "Kenchomae Station",
    destination: "Shuri Station",
    duration: "15 分",
    type: "route",
    steps: [
      {
        line: "沖繩都市單軌電車 (Yui Rail)",
        type: "train",
        station: "縣廳前站 (飯店步行約 7 分) ➔ 首里站 / 歌町站",
        fare: "使用贈送之一日卷",
        note: "可前往首里城 (約 15 分)、DFS 免稅店 (約 22 分)、第一牧志公設市場等地",
      },
    ],
  },
];

export const usefulLinks = {
  categories: [
    {
      type: "hotel",
      label: "住宿",
      icon: "Hotel",
      items: [
        {
          name: "HOTEL COLLECTIVE",
          day: "Day 1-2",
          url: "https://hotelcollective.jp/tw/",
        },
        {
          name: "沖繩王子大飯店",
          day: "Day 3-4",
          url: "https://www.princehotels.com/ginowan/zh-hant/",
        },
      ],
    },
    {
      type: "attraction",
      label: "景點",
      icon: "Star",
      items: [
        { name: "Junglia 樂園", day: "Day 3", url: "https://junglia.jp/" },
        {
          name: "美麗海水族館",
          day: "Day 4",
          url: "https://churaumi.okinawa/tc/",
        },
        {
          name: "美國村",
          day: "Day 4",
          url: "https://www.okinawa-americanvillage.com/",
        },
      ],
    },
  ],
};

export const foodData = {
  categories: [
    {
      location: "那霸・抵達首晚",
      day: "Day 1",
      sections: [
        {
          title: "🍽️ 行程附餐",
          items: [
            {
              name: "花琉球",
              type: "沖繩傳統料理",
              desc: "三線琴現場表演，享受濃厚沖繩風情與酒水放題。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=沖繩+花琉球",
            },
          ],
        },
      ],
    },
    {
      location: "北部一日遊",
      day: "Day 4",
      sections: [
        {
          title: "🍽️ 行程附餐",
          items: [
            {
              name: "海景自助餐",
              type: "自助餐",
              desc: "古宇利島行程後的午餐，邊用餐邊看海。",
            },
            {
              name: "燒肉自助晚餐吃到飽",
              type: "日式燒肉",
              desc: "北部一日遊後大啖燒肉，包含飲料無限暢飲。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=沖繩+燒肉",
            },
          ],
        },
      ],
    },
    {
      location: "返程前午餐",
      day: "Day 5",
      sections: [
        {
          title: "🍽️ 行程附餐",
          items: [
            {
              name: "涮涮鍋放題",
              type: "涮涮鍋",
              desc: "搭機返台前的涮涮鍋吃到飽。",
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
      location: "那霸與周邊",
      day: "Day 1, 5",
      sections: [
        {
          title: "🌊 體驗與觀光",
          items: [
            {
              name: "瀨長島 Umikaji Terrace",
              type: "商場 / 海景",
              desc: "那霸機場旁的沖繩小希臘，純白建築與蔚藍海景，聚集特色餐廳、咖啡館與選物店，還能欣賞飛機起降。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Umikaji+Terrace",
            },
            {
              name: "銀河探險號半潛水艇",
              type: "海底觀光",
              desc: "從海中展望窗近距離觀賞繽紛的熱帶魚群與美麗的珊瑚礁。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=銀河探險號半潛水艇",
            },
            {
              name: "海ん道 UMINCHI 海葡萄農場",
              type: "農場體驗",
              desc: "親手採撈新鮮海葡萄，品嚐來自大海的鮮味，還贈送海葡萄冰淇淋。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=海ん道+UMINCHI",
            },
          ],
        },
      ],
    },
    {
      location: "那霸市區",
      day: "Day 2",
      sections: [
        {
          title: "🛍️ 飯店周邊（步行可達）",
          items: [
            {
              name: "國際通商店街",
              type: "商店街 / 步行 3 分",
              desc: "那霸最熱鬧的商店街，伴手禮、藥妝、服飾、美食一次逛齊。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kokusai+Dori+Naha",
            },
            {
              name: "RYUBO 百貨",
              type: "百貨公司 / 步行 5 分",
              desc: "沖繩歷史最悠久的百貨公司，精品、流行品牌與美食餐廳齊聚。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=RYUBO+Department+Store+Naha",
            },
            {
              name: "第一牧志公設市場",
              type: "傳統市場 / 步行 8 分",
              desc: "在地人常去的傳統市場，販售新鮮海產、沖繩食材與特色小吃。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=第一牧志公設市場",
            },
          ],
        },
        {
          title: "🚝 單軌電車可達",
          items: [
            {
              name: "首里城公園",
              type: "歷史古蹟 / 單軌約 15 分",
              desc: "琉球王國的歷史象徵，深入了解沖繩文化與歷史。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Shurijo+Castle+Park",
            },
            {
              name: "DFS 免稅店那霸",
              type: "免稅店 / 單軌約 22 分",
              desc: "國際知名免稅店，匯集各大精品品牌，位於歌町站旁。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=T+Galleria+Okinawa+by+DFS",
            },
          ],
        },
      ],
    },
    {
      location: "沖繩北部與中部",
      day: "Day 3-4",
      sections: [
        {
          title: "🐋 經典地標與樂園",
          items: [
            {
              name: "Junglia Okinawa 侏儸紀叢林樂園",
              type: "主題樂園",
              desc: "位於山原之森的沉浸式大自然主題樂園，結合頂尖遊樂設施與在地食材料理。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Junglia+Okinawa",
            },
            {
              name: "古宇利大橋 & 海洋塔",
              type: "景觀塔",
              desc: "約 2 公里的跨海大橋通往傳說中沖繩亞當與夏娃的古宇利島；搭電動車登上海拔 82m 的白色展望塔眺望大橋。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=古宇利海洋塔",
            },
            {
              name: "沖繩美麗海水族館",
              type: "水族館",
              desc: "高 8.2m、寬 22.5m 的巨型水槽飼養鯨鯊，另有海豚秀、海牛館與海龜館。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Okinawa+Churaumi+Aquarium",
            },
            {
              name: "北谷町美國村",
              type: "主題商圈",
              desc: "充滿美洲風情的綜合娛樂設施，購物、餐廳、摩天輪與日落海灘，是看夕陽的熱門景點。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=American+Village+Okinawa",
            },
          ],
        },
      ],
    },
  ],
};

export const shoppingData = {
  targetStores: [],
  wishlist: [],
  categories: [],
};

export const todoData = [
  { group: "出國前準備", category: "準備", item: "Visit Japan Web (VJW)" },
  { group: "出國前準備", category: "文件", item: "確認護照效期" },
  { group: "出國前準備", category: "通訊", item: "日本上網 eSIM" },
  {
    group: "出國前準備",
    category: "保險",
    item: "自行投保旅遊平安險（旅行社僅含責任險）",
  },
  {
    group: "出國前準備",
    category: "餐食",
    item: "機上特殊餐食需於出發前 7 天告知旅行社",
  },
  { group: "打包", category: "行李", item: "託運 23kg／手提 7kg" },
  {
    group: "打包",
    category: "電器",
    item: "行動電源（最多 2 個、須標示容量）與打火機隨身帶；自拍棒／腳架託運",
  },
  {
    group: "打包",
    category: "電器",
    item: "三孔插頭需帶三轉二轉接頭（日本 A 型插座 100V）",
  },
  {
    group: "出發當天",
    category: "集合",
    item: "10/02 09:00 桃園機場第一航廈 星宇航空團體櫃台",
  },
];

export const accommodationData = [
  {
    location: "那霸市區",
    period: "Day 1-2 (10/02-10/03)",
    hotels: [
      {
        name: "HOTEL COLLECTIVE 嘉新酒店",
        status: "已訂妥",
        desc: "260 間現代日式客房，全客房 30㎡以上，設戶外泳池、健身房、三溫暖。距單軌「縣廳前站」步行約 7 分鐘，鄰近國際通。",
        features: ["國際通核心", "室外泳池", "三溫暖"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=HOTEL+COLLECTIVE+Naha",
        priceJpy: 0,
        priceTwd: 0,
      },
    ],
  },
  {
    location: "宜野灣",
    period: "Day 3-4 (10/04-10/05)",
    hotels: [
      {
        name: "沖繩王子大飯店海景宜野灣",
        status: "已訂妥",
        desc: "全客房海景並附 6.5㎡ 以上露台，館內 2 座無邊際泳池。鄰近宜野灣船塢，距那霸機場車程約 30 分鐘。",
        features: ["全海景", "雙無邊際泳池", "岩盤浴"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Okinawa+Prince+Hotel+Ocean+View+Ginowan",
        priceJpy: 0,
        priceTwd: 0,
      },
    ],
  },
];

export const expenseData = {
  days: [],
  grandTotal: {
    JPY: { total: 0, breakdown: {} },
    TWD: { total: 0, breakdown: {} },
  },
};

export const vegetarianCard = {
  cannotEat: [],
  canEat: [],
};
