export const TRIP_ID = "2026-okinawa";

export const tripMeta = {
  id: TRIP_ID,
  badge: "JP · OKINAWA · 2026",
  title: "沖繩",
  subtitle: "大云永續極境出發",
  footer: "© 2026 沖繩 大云永續極境出發",
  heroImage: "/me/images/hero-okinawa-2026.png",
  nights: 4,
  exchangeRate: 0.21,
  exchangeRateLabel: "¥1 = NT$0.21",
};

export const stationMapping = {
  dayLabel: "Day 2",
  title: "那霸單軌電車重點車站",
  stations: [
    { zh: "縣廳前站", ja: "県庁前", en: "Kenchomae (國際通西側)" },
    { zh: "牧志站", ja: "牧志", en: "Makishi (國際通東側/近飯店)" },
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
    terminal: { depart: "T1/T2", arrive: "I" },
    duration: "1h40m",
    note: "請提前 2 小時抵達機場報到",
  },
  inbound: {
    airline: "星宇航空",
    flightNo: "JX871",
    date: "10/06 (二)",
    time: { depart: "15:50", arrive: "16:25" },
    airport: { depart: "OKA 那霸", arrive: "TPE 桃園" },
    terminal: { depart: "I", arrive: "T1/T2" },
    duration: "1h35m",
    note: "",
  },
};

export const overviewData = [
  {
    day: 1,
    date: "10/02 (五)",
    title: "抵達・海葡萄・國際通",
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
    title: "古宇利・水族館・美國村",
    hotel: "沖繩王子大飯店",
  },
  {
    day: 4,
    date: "10/05 (一)",
    title: "Junglia 侏儸紀樂園",
    hotel: "沖繩王子大飯店",
  },
  {
    day: 5,
    date: "10/06 (二)",
    title: "半潛水艇・瀨長島・返程",
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
        title: "抵達與海葡萄體驗",
        image:
          "https://images.unsplash.com/photo-1598059885816-dbf1cc9247eb?w=1200",
        highlight: "✨ 首日直奔海葡萄農場體驗與燒肉大餐",
        activities: [
          {
            time: "12:00",
            text: "桃園國際機場起飛",
            subText: "星宇航空 JX870",
          },
          { time: "14:40", text: "抵達沖繩那霸國際機場" },
          {
            time: "16:00",
            text: "海ん道 UMINCHI 海葡萄農場",
            subText: "採舀吃體驗 + 贈冰淇淋",
          },
          {
            time: "18:00",
            text: "燒肉自助晚餐吃到飽",
            subText: "飲料無限暢飲",
            isFood: true,
          },
          {
            time: "20:00",
            text: "入住 HOTEL COLLECTIVE 嘉新酒店",
            subText: "國際通心臟地帶，五星級享受",
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
          { time: "08:00", text: "飯店內豐盛早餐" },
          {
            time: "全日",
            text: "自由活動",
            subText: "贈單軌電車一日卷",
            note: "午晚餐方便遊玩敬請自理",
          },
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
        title: "古宇利與美麗海",
        image:
          "https://images.unsplash.com/photo-1614769018788-b2cf5e05a8f6?w=1200",
        highlight: "✨ 奔向神話之島，潛入深海奇蹟與浪漫美國村",
        activities: [
          { time: "08:00", text: "飯店內早餐" },
          {
            time: "10:00",
            text: "古宇利島大橋與海洋塔",
            subText: "搭乘電動車遠眺絕美海景",
          },
          { time: "12:00", text: "海景自助餐" },
          {
            time: "14:00",
            text: "美之海水族館 & 療癒海豚秀",
            subText: "東亞最大夢幻水族箱與巨大鯨鯊",
          },
          {
            time: "16:30",
            text: "北谷町美國村 & 免稅店",
            subText: "充滿美洲風情，看夕陽逛街購物",
          },
          {
            time: "18:30",
            text: "花琉球三絃琴表演",
            subText: "沖繩料理晚餐與酒水放題",
            isFood: true,
          },
          {
            time: "20:30",
            text: "入住 沖繩王子大飯店海景宜野灣",
            subText: "全房型海景附陽台",
          },
        ],
      },
      {
        day: 4,
        date: "10/05 (一)",
        title: "Junglia 叢林大冒險",
        image:
          "https://images.unsplash.com/photo-1533606990425-4c079db8542e?w=1200",
        highlight: "✨ 勇闖 2025 開幕的侏儸紀叢林樂園",
        activities: [
          { time: "08:00", text: "飯店內早餐" },
          {
            time: "全日",
            text: "Junglia Okinawa 侏儸紀叢林樂園",
            subText: "大自然結合頂尖科技的跨感官大冒險",
            note: "午晚餐敬請自理",
            tips: "若不參加此行程可選B行程自由活動，贈單軌電車一日卷+代金",
          },
          { time: "20:00", text: "返回 沖繩王子大飯店海景宜野灣" },
        ],
      },
      {
        day: 5,
        date: "10/06 (二)",
        title: "小希臘與返程",
        image:
          "https://images.unsplash.com/photo-1627885444654-e0e64c399a5e?w=1200",
        highlight: "✨ 半潛水艇海底探險，瀨長島悠閒午後",
        activities: [
          { time: "08:00", text: "飯店內早餐" },
          {
            time: "10:00",
            text: "銀河探險號半潛水艇",
            subText: "觀賞海底世界與熱帶魚",
          },
          { time: "12:00", text: "日式風味午餐" },
          {
            time: "14:00",
            text: "瀨長島 Umikaji Terrace",
            subText: "純白浪漫沖繩小希臘，捕捉絕美海景與夕陽",
          },
          {
            time: "15:50",
            text: "沖繩那霸國際機場起飛",
            subText: "星宇航空 JX871",
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
  { item: "餐飲", cost: 0, note: "部分自由活動需自理" },
  { item: "購物", cost: 0, note: "" },
];

export const recommendedRoutes = [
  {
    id: 1,
    day: "Day 2 (10/03 六)",
    name: "那霸市區單軌電車一日遊",
    steps: [
      {
        line: "沖繩都市單軌電車 (Yui Rail)",
        type: "train",
        station: "牧志站 (飯店附近) ➔ 首里站 / 歌町站",
        fare: "使用贈送之一日卷",
        note: "可前往首里城、免稅店 T Galleria、第一牧志公設市場等地",
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
        {
          name: "美麗海水族館",
          day: "Day 3",
          url: "https://churaumi.okinawa/tc/",
        },
        {
          name: "美國村",
          day: "Day 3",
          url: "https://www.okinawa-americanvillage.com/",
        },
        { name: "Junglia 樂園", day: "Day 4", url: "https://junglia.jp/" },
      ],
    },
  ],
};

export const foodData = {
  categories: [
    {
      location: "行程附餐特色",
      day: "Day 1, 3",
      sections: [
        {
          title: "🍽️ 嚴選餐廳與特色餐點",
          items: [
            {
              name: "燒肉自助晚餐吃到飽",
              type: "日式燒肉",
              desc: "抵達首日大啖沖繩燒肉，包含飲料無限暢飲。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=沖繩+燒肉",
            },
            {
              name: "花琉球",
              type: "沖繩傳統料理",
              desc: "三絃琴現場表演，享受濃厚沖繩風情與酒水放題。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=沖繩+花琉球",
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
              name: "海ん道 UMINCHI 海葡萄農場",
              type: "農場體驗",
              desc: "親身體驗海葡萄的生長過程，品嚐新鮮現採的海葡萄與冰淇淋。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=海ん道+UMINCHI",
            },
            {
              name: "瀨長島 Umikaji Terrace",
              type: "商場 / 海景",
              desc: "純白浪漫的沖繩小希臘，捕捉絕美海景與夕陽，度假感滿分。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Umikaji+Terrace",
            },
            {
              name: "銀河探險號半潛水艇",
              type: "海底觀光",
              desc: "在水中探險，觀賞海中優游的熱帶魚群與美麗的珊瑚礁。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=銀河探險號半潛水艇",
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
              name: "古宇利大橋 & 海洋塔",
              type: "景觀塔",
              desc: "跨越絕美湛藍海域，搭乘電動車至82m高的白色展望塔眺望海景。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=古宇利海洋塔",
            },
            {
              name: "美之海水族館",
              type: "水族館",
              desc: "東亞最大的夢幻水族箱，欣賞巨大鯨鯊與精彩的海豚秀。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Okinawa+Churaumi+Aquarium",
            },
            {
              name: "北谷町美國村",
              type: "主題商圈",
              desc: "充滿美洲風情的綜合娛樂設施，是看夕陽與逛街購物的熱門景點。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=American+Village+Okinawa",
            },
            {
              name: "Junglia Okinawa 侏儸紀叢林樂園",
              type: "主題樂園",
              desc: "位於山原之森的大自然樂園，結合頂尖科技的跨感官大冒險。",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Junglia+Okinawa",
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
];

export const accommodationData = [
  {
    location: "那霸市區",
    period: "Day 1-2 (10/02-10/03)",
    hotels: [
      {
        name: "HOTEL COLLECTIVE 嘉新酒店",
        status: "已訂妥",
        desc: "國際通的都市綠洲，下樓即達購物天堂。全客房30㎡以上。",
        features: ["國際通核心", "室外泳池", "五星級"],
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
        desc: "全房型附海景露台，頂樓無邊際天際泳池。",
        features: ["全海景", "無邊際泳池", "岩盤浴"],
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
