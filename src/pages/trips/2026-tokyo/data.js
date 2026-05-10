/**
 * 2026 東京 8日行程資料 v2.0
 * 路線：成田 → 橫濱 → 涉谷 → 新宿 → 輕井澤 → 東京 → 返程
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
    note: "最晚出發：13:30（東京站）/ 13:00（新宿站）",
  },
};

export const overviewData = [
  { day: 1, date: "6/17 (三)", title: "抵達成田 → 橫濱", hotel: "橫濱" },
  { day: 2, date: "6/18 (四)", title: "橫濱探索", hotel: "橫濱/涉谷" },
  { day: 3, date: "6/19 (五)", title: "Shibuya 109 採買", hotel: "涉谷" },
  { day: 4, date: "6/20 (六)", title: "涉谷→新宿→原宿", hotel: "新宿" },
  { day: 5, date: "6/21 (日)", title: "新宿→輕井澤 🎊", hotel: "輕井澤" },
  { day: 6, date: "6/22 (一)", title: "輕井澤慢活", hotel: "輕井澤" },
  { day: 7, date: "6/23 (二)", title: "輕井澤→東京", hotel: "東京" },
  { day: 8, date: "6/24 (三)", title: "返程", hotel: "✈️ 回家" },
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
            subText: "直達，約90分，免換車",
            note: "外國旅客可購買 N'EX 來回優惠票 ¥4,070",
            map: {
              type: "route",
              origin: "Narita Airport Terminal 1",
              destination: "Yokohama Station",
            },
          },
          {
            time: "約19:00",
            text: "Check-in 橫濱旅館",
            map: { type: "search", query: "Yokohama Hotel" },
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
            text: "橫濱 → 涉谷（JR，30分）",
            subText: "方案B選擇：提早移師涉谷",
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
    phase: "涉谷・新宿 (Day 3–4)",
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
            text: "橫濱退房 → 涉谷（JR，30分）",
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
          { time: "晚上", text: "晚餐：涉谷周邊素食", foodGuideLink: "涉谷" },
        ],
      },
      {
        day: 4,
        date: "6/20 (六)",
        title: "涉谷→新宿→原宿",
        image:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop",
        highlight: "🗼 Laforet 原宿・新宿補貨・Check-in 新宿",
        activities: [
          {
            time: "上午",
            text: "涉谷 → 新宿（JR，7分）寄放行李",
            map: {
              type: "route",
              origin: "Shibuya Station",
              destination: "Shinjuku Station",
            },
          },
          {
            time: "上午",
            text: "新宿 → 原宿（JR，5分）",
            map: {
              type: "route",
              origin: "Shinjuku Station",
              destination: "Harajuku Station",
            },
          },
          {
            time: "午前",
            text: "Laforet 原宿",
            subText: "潮牌、設計師聯名",
            map: { type: "search", query: "Laforet Harajuku" },
          },
          {
            time: "傍晚",
            text: "新宿藥妝補貨",
            subText: "松本清、唐吉訶德",
            map: { type: "search", query: "Shinjuku Drugstore Tokyo" },
          },
          {
            time: "晚上",
            text: "Check-in 新宿旅館，新宿周邊晚餐",
            map: { type: "search", query: "Shinjuku Hotel" },
          },
        ],
      },
    ],
  },
  {
    phase: "輕井澤 (Day 5–7)",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 5,
        date: "6/21 (日)",
        anniversary: true,
        title: "新宿 → 輕井澤 🎊",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
        highlight: "🎊 三週年結婚紀念日！中輕井澤野菜晚餐",
        activities: [
          { time: "上午", text: "新宿退房，搭電車至大宮站" },
          {
            time: "上午",
            text: "大宮 → 輕井澤（北陸新幹線）",
            subText: "約75分，建議指定席（週日早訂）",
            note: "週日旺季，請提前訂位",
            map: {
              type: "route",
              origin: "Omiya Station",
              destination: "Karuizawa Station",
            },
          },
          {
            time: "晚上",
            text: "🎊 中輕井澤野菜晚餐",
            subText: "紀念日主場，確認餐廳無葷高湯",
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
        highlight: "🌿 腳踏車穿梭三區：雲場池・中輕・舊輕",
        activities: [
          {
            time: "上午",
            text: "租借腳踏車穿梭各區",
            subText: "輕井澤站前可租",
            note: "白貓自行車（しろねこ）為清單推薦店",
          },
          {
            time: "上午",
            text: "雲場池",
            subText: "倒影湖，新輕井澤",
            map: { type: "search", query: "Kumoba Pond Karuizawa" },
          },
          {
            time: "下午",
            text: "榆樹街小鎮 (Harunire Terrace)",
            subText: "中輕井澤，森林步道、特色小店",
            map: { type: "search", query: "Harunire Terrace Karuizawa" },
          },
          {
            time: "下午",
            text: "石之教會",
            subText: "中輕井澤，建築景點（需預約）",
            map: { type: "search", query: "Stone Church Karuizawa" },
          },
          {
            time: "傍晚",
            text: "舊輕井澤銀座通",
            subText: "老街散步",
            map: { type: "search", query: "Kyu-Karuizawa Ginza" },
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
            subText: "確認開館時間",
            map: { type: "search", query: "Karuizawa Prince Shopping Plaza" },
          },
          {
            time: "上午",
            text: "🍓 章姬 / 香野草莓尋購",
            subText: "季節限定伴手禮",
          },
          {
            time: "中午後",
            text: "新幹線返東京",
            subText: "方案A→東京站(70分) / 方案B→新宿(90分)",
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Tokyo Station",
            },
          },
          { time: "傍晚", text: "Check-in（A：東京站 / B：新宿）" },
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
            time: "A：13:30",
            text: "東京站 → N'EX → 成田（約60分）",
            map: {
              type: "route",
              origin: "Tokyo Station",
              destination: "Narita Airport Terminal 1",
            },
          },
          {
            time: "B：13:00",
            text: "新宿 → N'EX → 成田（約85分）",
            map: {
              type: "route",
              origin: "Shinjuku Station",
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
    desc: "N'EX 成田特快直達",
    duration: "約90分",
  },
  {
    id: 2,
    day: "Day 2",
    type: "route",
    name: "橫濱 → 涉谷（方案B）",
    origin: "Yokohama Station",
    destination: "Shibuya Station",
    desc: "JR 東海道線",
    duration: "約30分",
  },
  {
    id: 3,
    day: "Day 3",
    type: "route",
    name: "橫濱 → 涉谷（方案A）",
    origin: "Yokohama Station",
    destination: "Shibuya Station",
    desc: "JR 東海道線",
    duration: "約30分",
  },
  {
    id: 4,
    day: "Day 4",
    type: "route",
    name: "涉谷 → 新宿",
    origin: "Shibuya Station",
    destination: "Shinjuku Station",
    desc: "JR 山手線",
    duration: "約7分",
  },
  {
    id: 5,
    day: "Day 5",
    type: "route",
    name: "大宮 → 輕井澤",
    origin: "Omiya Station",
    destination: "Karuizawa Station",
    desc: "北陸新幹線 はくたか（週日提前訂）",
    duration: "約50分",
  },
  {
    id: 6,
    day: "Day 7",
    type: "route",
    name: "輕井澤 → 東京站",
    origin: "Karuizawa Station",
    destination: "Tokyo Station",
    desc: "北陸新幹線",
    duration: "約70分",
  },
  {
    id: 7,
    day: "Day 8",
    type: "route",
    name: "東京站 → 成田（方案A）",
    origin: "Tokyo Station",
    destination: "Narita Airport Terminal 1",
    desc: "N'EX 成田特快",
    duration: "約60分",
  },
  {
    id: 8,
    day: "Day 8",
    type: "route",
    name: "新宿 → 成田（方案B）",
    origin: "Shinjuku Station",
    destination: "Narita Airport Terminal 1",
    desc: "N'EX 成田特快",
    duration: "約85分",
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
          name: "Suica IC 卡",
          day: "Day 1",
          url: "https://www.jreast.co.jp/tc/suica/",
        },
        {
          name: "N'EX 成田特快來回票",
          day: "Day 1, 8",
          url: "https://www.jreast.co.jp/tc/pass/nex.html",
        },
        {
          name: "北陸新幹線訂票",
          day: "Day 5, 7",
          url: "https://www.jreast.co.jp/tc/",
        },
      ],
    },
    {
      type: "hotel",
      label: "住宿候選",
      icon: "Hotel",
      items: [
        { name: "Super Hotel Yokohama Kannai", day: "Day 1-2", url: "" },
        { name: "相鐵Fresa Inn 橫濱櫻木町", day: "Day 1-2", url: "" },
        { name: "三井花園飯店橫濱港未來普米爾", day: "Day 1-2", url: "" },
        { name: "輕井澤王子大飯店西館", day: "Day 5-6", url: "" },
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
          name: "Laforet 原宿",
          day: "Day 4",
          url: "https://www.laforet.ne.jp/",
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
      location: "涉谷・原宿・表參道",
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
              desc: "涉谷區靜謐咖啡",
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
              name: "AFURI 阿夫利 原宿",
              type: "拉麵",
              desc: "柚子鹽拉麵，原宿本店",
              recommended: false,
              note: "請確認湯底是否含魚介高湯",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=AFURI+ramen+Harajuku",
            },
            {
              name: "Kyushu Jangara Ramen 原宿",
              type: "拉麵",
              desc: "九州系豚骨拉麵",
              recommended: false,
              note: "豚骨湯底含豬肉，酌情",
              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Kyushu+Jangara+Ramen+Harajuku",
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
    "Laforet 原宿",
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
      title: "涉谷・原宿・新宿區",
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
          name: "Laforet Harajuku",
          desc: "原宿時尚的中心，匯集許多獨特的街頭潮流品牌。",
        },
        {
          name: "竹下通",
          desc: "原宿最熱鬧的商店街，流行文化、甜點與平價雜貨集散地。",
        },
        {
          name: "手工牛奶糖 NUMBER SUGAR",
          desc: "原宿表參道的超人氣手工糖果店，包裝精美適合送禮。",
        },
        {
          name: "SEIKATSU no KI Harajuku",
          desc: "生活之木旗艦店，提供精油、香氛與天然健康護理產品。",
        },
        {
          name: "LUMINE EST新宿",
          desc: "新宿站內直結百貨，主打年輕族群服飾與人氣美食。",
        },
        {
          name: "新宿丸井 本館",
          desc: "新宿百貨核心之一，風格簡約精緻，頂樓花園優美。",
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
  { category: "交通", item: "機票確認（班次/時間填入）" },
  { category: "交通", item: "N'EX 成田特快（來回）" },
  { category: "交通", item: "北陸新幹線 6/21 指定席（週日旺季，最緊迫）" },
  { category: "住宿", item: "橫濱旅館（Day 1-2）" },
  { category: "住宿", item: "涉谷/新宿旅館（Day 3-4）" },
  { category: "住宿", item: "輕井澤王子大飯店西館（Day 5-6，紀念日）" },
  { category: "住宿", item: "東京旅館（Day 7）" },
  { category: "餐廳", item: "6/21 紀念日晚餐預約（中輕井澤，確認五辛蛋奶素）" },
  { category: "通訊", item: "日本上網 eSIM" },
  { category: "景點", item: "輕井澤腳踏車租借（白貓自行車）" },
  { category: "景點", item: "王子 Outlet 6/23 開館時間確認" },
];

export const vegetarianCard = {
  restriction: "私は肉類、魚介類が食べられません。",
  dashi: "出汁は昆布だしのみ大丈夫です。魚節・煮干しはNGです。",
  question: "この料理に、魚節や魚の出汁は入っていますか？",
  ok: "卵・乳製品は食べられます。野菜・辛味野菜もOKです。",
  canEat: [
    "卵 (雞蛋)",
    "乳製品 (牛奶/起司)",
    "昆布高湯",
    "蔥、蔻、韭菜 (五辛可)",
  ],
  cannotEat: ["肉類", "海鮮", "柴魚高湯", "小魚高湯"],
};
