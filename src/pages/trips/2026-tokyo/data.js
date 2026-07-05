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
    title: "抵達成田 → 橫濱",
    hotel: "橫濱三井花園",
  },
  { day: 2, date: "6/18 (四)", title: "橫濱一日遊", hotel: "橫濱三井花園" },
  {
    day: 3,
    date: "6/19 (五)",
    title: "橫濱 → 澀谷 → 上野 → 大宮",
    hotel: "Marroad Inn Omiya",
  },
  {
    day: 4,
    date: "6/20 (六)",
    title: "大宮 → 輕井澤",
    hotel: "輕井澤淺間王子大飯店",
  },
  {
    day: 5,
    date: "6/21 (日)",
    title: "舊輕井澤",
    hotel: "旧軽井沢 ホテル音羽ノ森",
  },
  {
    day: 6,
    date: "6/22 (一)",
    title: "中輕井澤 / 星野區",
    hotel: "星野集團 BEB5 輕井澤",
  },
  {
    day: 7,
    date: "6/23 (二)",
    title: "輕井澤 → 秋葉原",
    hotel: "dormy inn PREMIUM 神田",
  },
  { day: 8, date: "6/24 (三)", title: "秋葉原 → 成田機場", hotel: "溫暖的家" },
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
        title: "抵達成田 → 橫濱港未來",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 抵達成田，N'EX 直達橫濱港都，晚餐品嚐 AFURI 柚子鹽拉麵",
        activities: [
          {
            time: "08:30",
            text: "出發前往機場",
            transport: { line: "🚕 機場接送", note: "預約 08:30" },
          },
          {
            time: "09:30",
            text: "抵達桃園機場 T1",
            subText: "泰國獅航 SL394 報到 (12:10 起飛)",
            note: "無託運行李",
          },
          {
            time: "16:30",
            text: "抵達成田機場",
            subText: "加值 ICOCA、超商買飯糰點心",
          },
          {
            time: "18:00",
            text: "搭 N'EX → 橫濱站",
            transport: {
              line: "N'EX 成田特快",
              station: "成田機場 T1",
              note: "直達約 90 分鐘",
            },
          },
          {
            time: "20:49",
            text: "入住 MGH Yokohama Minatomirai",
            subText: "橫濱三井花園酒店",
          },
          {
            time: "21:15",
            text: "AFURI 橫濱地標塔店",
            isFood: true,
            subText: "清爽柚子鹽拉麵",
          },
          {
            time: "21:30",
            text: "超商大採買",
            subText: "成城石井超市、Lawson、7-Eleven 買蕎麥麵、泡芙等宵夜",
          },
        ],
      },
      {
        day: 2,
        date: "6/18 (四)",
        title: "橫濱海濱與文創散策",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
        highlight: "⚓ 悠閒漫步紅磚倉庫、MARINE & WALK，晚上搭乘空中纜車",
        activities: [
          {
            time: "中午",
            text: "Rice Cuisine SŪYA",
            isFood: true,
            subText: "日本大通純素與無麩質米粉料理專賣 (和膳、大豆肉泡菜丼)",
          },
          {
            time: "14:00",
            text: "VANILLABEANS THE ROASTERY",
            isFood: true,
            subText: "港景配巧克力下午茶 (熱紅茶套餐、Berry 巧克力刨冰聖代)",
          },
          {
            time: "下午",
            text: "橫濱紅磚倉庫 & MARINE & WALK",
            subText:
              "歷史建築改建文創市集、美式海濱購物中心 (BAGGYPORT 買零錢包)",
          },
          {
            time: "下午",
            text: "OWNDAYS 橫濱 World Porters",
            subText: "配木村拓哉同款眼鏡",
          },
          {
            time: "19:47",
            text: "橫濱元町 Doria",
            isFood: true,
            subText: "雞肉馬鈴薯番茄奶油起司筆管麵、蘑菇蛋包飯",
          },
          {
            time: "20:00",
            text: "買吉伊卡哇玩偶與點心",
            subText: "Character Station 買背包",
          },
          {
            time: "20:30",
            text: "YOKOHAMA AIR CABIN",
            subText: "體驗都市型空中纜車，橫濱港灣美景盡收眼底",
            fee: "單程 ¥1,000",
          },
        ],
      },
    ],
  },
  {
    phase: "澀谷／上野／大宮 (Day 3)",
    image:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 3,
        date: "6/19 (五)",
        title: "橫濱購物 → 澀谷 → 上野 → 大宮",
        image:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛒 MARK IS 採買，快閃澀谷 109 後，落腳大宮準備明日新幹線",
        activities: [
          {
            time: "早上",
            text: "MARK IS みなとみらい 早午餐",
            isFood: true,
            subText: "Foodway 超市小菜 + おぼんdeごはん 定食",
          },
          { time: "中午", text: "MARK IS 購物", subText: "mont-bell 買配件" },
          {
            time: "下午",
            text: "快閃澀谷 109",
            subText: "LUNA EARTH 買髮飾、NICE CLAUP 買牛仔褲",
          },
          {
            time: "19:28",
            text: "やよい軒 上野店",
            isFood: true,
            subText: "大豆肉蔬菜炒定食、豬肉涮涮鍋定食",
          },
          {
            time: "晚上",
            text: "移動至大宮站",
            transport: { line: "JR 在來線", station: "上野站 ➔ 大宮站" },
          },
          {
            time: "22:00",
            text: "買隔天新幹線車票",
            subText: "北陸新幹線 大宮-輕井澤",
          },
          {
            time: "22:45",
            text: "入住 Marroad Inn Omiya",
            subText: "大宮馬羅德客棧 (因不小心訂錯單人房現場補差額 QQ)",
          },
          {
            time: "深夜",
            text: "大宮超商大採買",
            subText: "Lawson、7-Eleven、FamilyMart 買餅乾、冰棒等宵夜",
          },
        ],
      },
    ],
  },
  {
    phase: "輕井澤 (Day 4-6)",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 4,
        date: "6/20 (六)",
        title: "啟程輕井澤與 Outlet 狂歡",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🚄 前往輕井澤避暑，入住淺間王子大飯店",
        activities: [
          {
            time: "早上",
            text: "大宮站吃早餐",
            isFood: true,
            subText:
              "TULLY'S 焙茶拿鐵、BAKE 起司塔、ANDERSEN 麵包、たごさく飯糰",
          },
          {
            time: "上午",
            text: "大宮 → 輕井澤",
            transport: { line: "北陸新幹線", station: "大宮站 ➔ 輕井澤站" },
          },
          {
            time: "下午",
            text: "輕井澤王子購物廣場 (Outlet)",
            subText: "BANANA REPUBLIC 買衣服，Delifrance 買麵包",
          },
          {
            time: "15:00",
            text: "KUA`AINA 輕井澤店",
            isFood: true,
            subText: "起司肉餅漢堡套餐",
          },
          {
            time: "傍晚",
            text: "入住 輕井澤淺間王子大飯店",
            subText: "享受渡假村設施與泡湯",
          },
          {
            time: "18:48",
            text: "飯店晚餐",
            isFood: true,
            subText: "信州蜂蜜梅酒、信州特色辣味噌拉麵",
          },
        ],
      },
      {
        day: 5,
        date: "6/21 (日)",
        title: "舊輕井澤古典風情與溫泉",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
        highlight:
          "🎊 拖著行李換飯店！舊輕井澤散策，晚上享受 Le Chien 日歸溫泉",
        activities: [
          { time: "早上", text: "換飯店移動", subText: "拖著行李前往舊輕井澤" },
          {
            time: "上午",
            text: "舊輕井澤銀座通",
            subText: "漫步百年老街，喝星巴克、買 French Bakery 鹽可頌",
          },
          {
            time: "14:35",
            text: "SAWAMURA 舊輕井澤",
            isFood: true,
            subText: "濃湯、凱薩沙拉與信州野澤菜麵包",
          },
          {
            time: "下午",
            text: "APPLE PIE lab 與伴手禮採買",
            subText: "吃蘋果派，買寺子屋本舖與餅乾",
          },
          {
            time: "傍晚",
            text: "入住 旧軽井沢 ホテル音羽ノ森",
            subText: "充滿古典風情的和式房",
          },
          {
            time: "19:48",
            text: "酢重正之",
            isFood: true,
            subText: "鐵鍋馬鈴薯奶油、炸豆腐田樂、梅茶漬",
          },
          {
            time: "20:05",
            text: "Le Chien 舊輕井澤",
            subText: "兩人日歸溫泉、私人風呂、大浴場，還有夜鳴拉麵！",
            fee: "¥2,640",
          },
        ],
      },
      {
        day: 6,
        date: "6/22 (一)",
        title: "雲場池與星野溫泉",
        image:
          "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2070&auto=format&fit=crop",
        highlight: "🌿 漫步雲場池，再戰 Outlet，入住 BEB5 享受星野區",
        activities: [
          {
            time: "早上",
            text: "換飯店移動",
            subText: "拖著行李準備前往中輕井澤",
          },
          {
            time: "中午",
            text: "Cafe St.Maire KUMOBA",
            isFood: true,
            subText: "雲場池旁野菜咖哩、起司蛋糕與抹茶冰淇淋",
          },
          {
            time: "下午",
            text: "雲場池漫遊",
            subText: "翠綠天鵝湖，絕美森林倒影",
          },
          {
            time: "下午",
            text: "輕井澤王子購物廣場 (Outlet)",
            subText: "二度攻略 Outlet，COACH 買包包",
          },
          {
            time: "傍晚",
            text: "入住 星野集團 BEB5 輕井澤",
            subText: "年輕活潑的星野青年旅館風格",
          },
          {
            time: "晚上",
            text: "7-Eleven 中輕井澤店大採買",
            subText: "超狂宵夜採購 (高麗菜絲、冷豆腐、優格等)",
          },
          {
            time: "20:19",
            text: "川上庵",
            isFood: true,
            subText: "天婦羅冷蕎麥麵",
          },
          {
            time: "20:31",
            text: "星野溫泉 蜻蛉之湯",
            subText: "享受星野區的天然溫泉露天風呂 (BEB5 住宿優惠 ¥1,200)",
          },
        ],
      },
    ],
  },
  {
    phase: "返回東京 (Day 7-8)",
    image:
      "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 7,
        date: "6/23 (二)",
        title: "榆樹街早晨，返回東京大採買",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
        highlight: "⛪ 參觀高原教會與石之教會，下午回東京秋葉原爆買",
        activities: [
          { time: "早上", text: "BEB5 退房", subText: "前往參觀教會" },
          {
            time: "上午",
            text: "石之教會 & 高原教會",
            subText: "隱密森林的石造與木造教堂，獨特光影之美",
          },
          {
            time: "09:30",
            text: "SAWAMURA 輕井澤榆樹街小鎮",
            isFood: true,
            subText: "法式吐司套餐、紅酒燉無花果奶油起司核桃麵包",
          },
          {
            time: "13:45",
            text: "新幹線返東京",
            transport: { line: "北陸新幹線", station: "輕井澤站 ➔ 東京站" },
          },
          {
            time: "15:35",
            text: "入住 dormy inn PREMIUM 神田",
            subText: "神田/秋葉原商圈住宿",
          },
          {
            time: "16:56",
            text: "無印良品 秋葉原Tolim店",
            subText: "買衣物與居家用品",
          },
          {
            time: "17:38",
            text: "やよい軒 神田北口店",
            isFood: true,
            subText: "大豆肉蔬菜炒定食、味噌豬排煮定食",
          },
          {
            time: "19:39",
            text: "松本清 秋葉原店",
            subText: "藥妝大採買 (&honey髮油、定妝噴霧、眼藥水等)",
          },
          {
            time: "21:02",
            text: "Bic Camera 秋葉原店",
            subText: "買滑鼠、特大和牛拼圖與軟糖",
          },
        ],
      },
      {
        day: 8,
        date: "6/24 (三)",
        title: "帶著回憶返台",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 16:50 NRT 起飛，再會日本",
        activities: [
          {
            time: "早上",
            text: "麥當勞 Bic Camera AKIBA店",
            isFood: true,
            subText: "培根蛋起司鬆餅堡餐",
          },
          {
            time: "10:48",
            text: "やよい軒 神田北口店",
            isFood: true,
            subText: "大豆肉蔬菜炒定食、宮崎冷湯與雞肉南蠻定食",
          },
          {
            time: "13:30",
            text: "搭車前往成田機場",
            transport: { line: "機場快線", station: "東京市區 ➔ 成田機場" },
          },
          {
            time: "14:10",
            text: "成田機場免稅店掃貨",
            subText: "東京食賓館、Fa-So-La 買起司蛋糕、餅乾、梅酒等伴手禮",
          },
          {
            time: "14:30",
            text: "抵達成田機場 T1",
            subText: "樂桃航空 MM625 報到 (16:50 起飛)",
          },
          { time: "16:50", text: "🛫 NRT T1 起飛 → TPE T1" },
          {
            time: "晚上",
            text: "桃園機場捷運",
            transport: { line: "機捷", station: "抵達溫暖的家" },
          },
        ],
      },
    ],
  },
];

export const budgetData = [
  {
    item: "機票",
    cost: 104546,
    note: "兩人合計 NT$23,000\n去程無托運，回程合購1件托運",
  },
  {
    item: "交通",
    cost: 36060,
    note: "每人總計約 ¥18,030",
    subItems: [
      { item: "N'EX 特急", cost: 10000, note: "單人約 ¥5,000 (約 NT$1,100)" },
      {
        item: "新幹線",
        cost: 20660,
        note: "單人約 ¥10,330 (大宮→輕井澤→東京)",
      },
      { item: "腳踏車", cost: 1400, note: "單人約 ¥700 (輕井澤)" },
      { item: "ICOCA/Suica", cost: 4000, note: "單人約 ¥2,000 (市區交通)" },
    ],
  },
  {
    item: "住宿",
    cost: 156000,
    note: "兩人每晚平均約 ¥22,000",
    subItems: [
      {
        item: "橫濱三井花園 6/17 (三)",
        cost: 15000,
        note: "已訂妥，約 NT$3,300",
      },
      {
        item: "待訂 - 橫濱或澀谷 6/18 (四)",
        cost: 15000,
        note: "每晚平均",
      },
      { item: "待訂 - 澀谷周邊 6/19 (五)", cost: 15000, note: "每晚平均" },
      { item: "待訂 - 輕井澤 6/20 (六)", cost: 36000, note: "每晚平均" },
      { item: "待訂 - 輕井澤 6/21 (日)", cost: 30000, note: "每晚平均" },
      { item: "待訂 - 輕井澤 6/22 (一)", cost: 30000, note: "每晚平均" },
      { item: "待訂 - 東京市區 6/23 (二)", cost: 15000, note: "每晚平均" },
    ],
  },
  {
    item: "餐飲",
    cost: 63000,
    note: "兩人每日預算約 ¥9,000",
    subItems: [
      { item: "每日早餐 (共 7 餐)", cost: 7000, note: "平均每餐兩人約 ¥1,000" },
      {
        item: "每日午、晚餐 (共約 14 餐)",
        cost: 42000,
        note: "平均每餐兩人約 ¥3,000",
      },
      {
        item: "輕食、咖啡與甜點 (7天)",
        cost: 14000,
        note: "平均每日兩人約 ¥2,000",
      },
    ],
  },
  {
    item: "購物",
    cost: 60000,
    note: "觀景台門票與採買總預估",
    subItems: [
      { item: "SHIBUYA SKY", cost: 5000, note: "單人約 ¥2,500" },
      { item: "合味道紀念館", cost: 1000, note: "單人約 ¥500" },
      {
        item: "服飾／Outlet 採買",
        cost: 30000,
        note: "單人預留 ¥15,000",
      },
      {
        item: "藥妝與零食伴手禮",
        cost: 24000,
        note: "單人預留 ¥12,000",
      },
    ],
  },
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
        fare: "來回優惠票 NT$ 1,109",
        note: "直達車，免換車。",
        link: {
          text: "官方時刻表",
          url: "https://www.jreast.co.jp/",
        },
        timetable: [
          {
            train: "N'EX 40",
            dep: "17:16",
            arr: "18:51",
            note: "無託運有機會趕上",
          },
          { train: "N'EX 42", dep: "17:45", arr: "19:19", note: "最保險班次" },
          { train: "N'EX 46", dep: "18:45", arr: "20:19", note: "" },
          { train: "N'EX 50", dep: "19:49", arr: "21:23", note: "" },
        ],
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
            line: "北陸新幹線",
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
        duration: "約60分／95分",
        steps: [
          {
            type: "train",
            line: "方式 A：大宮轉乘 北陸/上越新幹線",
            station: "澀谷站 ➔ 大宮站 (站內轉乘) ➔ 高崎站",
            platform: "澀谷3號月台／大宮17、18號月台",
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
            line: "北陸新幹線",
            station: "大宮站",
            platform: "17/18月台",
            duration: "約50分",
            fare: "¥5,720 (指定席) / ¥5,200 (自由席)",
            note: "大宮轉乘至輕井澤",
          },
          {
            type: "bus",
            line: "草津交通／西武觀光巴士 (急行)",
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
            line: "JR 北陸新幹線",
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
            line: "草津交通／西武觀光巴士 (急行)",
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
        line: "北陸新幹線",
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
        line: "JR N'EX 成田特快",
        station: "東京總武地下",
        platform: "B5 1/2月台",
        duration: "約60分",
        fare: "來回優惠票 NT$ 1,109",
        note: "⚠️ B5月台極深，從地面步行需15-20分，務必提早！",
        link: {
          text: "官方時刻表",
          url: "https://www.jreast.co.jp/",
        },
        timetable: [
          {
            train: "N'EX 19",
            dep: "11:03",
            arr: "11:57",
            note: "提早至機場午餐",
          },
          { train: "N'EX 21", dep: "11:33", arr: "12:31", note: "" },
          { train: "N'EX 23", dep: "12:03", arr: "12:58", note: "" },
          {
            train: "N'EX 25",
            dep: "12:33",
            arr: "13:26",
            note: "提前約3小時抵達",
          },
          { train: "N'EX 27", dep: "13:03", arr: "13:57", note: "較佳班次" },
          {
            train: "N'EX 29",
            dep: "13:33",
            arr: "14:31",
            note: "最晚底線班次",
          },
        ],
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
          name: "N'EX 成田特快車票 (Klook)",
          day: "Day 1, 8",
          url: "https://www.klook.com/zh-TW/activity/173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo/?spm=SearchResult.SearchResult_LIST&clickId=a6ae275d8f",
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
          name: "合味道紀念館橫濱",
          day: "Day 2",
          url: "https://www.cupnoodles-museum.jp/zh_TW/yokohama/",
        },
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
      ],
    },
    {
      type: "accommodation",
      label: "住宿",
      icon: "MapPin",
      items: [
        {
          name: "Dormy Inn 官網",
          day: "Day 5, 6",
          url: "https://www.hotespa.net/dormyinn/",
        },
      ],
    },
    {
      type: "prep",
      label: "出國準備",
      icon: "Globe",
      items: [
        {
          name: "Visit Japan Web (VJW)",
          day: "行前",
          url: "https://vjw-lp.digital.go.jp/zh-hant/",
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
              name: "Dean & DeLuca",
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
              desc: "老字號昭和風洋食，招牌蛋包飯 (可素食)，老闆娘是台灣人",
              recommended: true,

              mapUrl:
                "https://www.google.com/maps/search/?api=1&query=Center+Grill+Yokohama",
            },
            {
              name: "Rice Cuisine SŪYA",
              type: "Vegan／無麩質",
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
            {
              name: "幕末カレー",
              type: "咖哩",
              desc: "澀谷提供美味植物肉咖哩的專賣店",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/iiPQTsxzPWHGsV2S9",
            },
            {
              name: "真さか MASAKA",
              type: "居酒屋 / 全素",
              desc: "位於澀谷 PARCO B1F 的全素日式居酒屋，招牌為素炸雞與餃子",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/2CBYfVNBRSQd9RnNA",
            },
            {
              name: "THE NUTS EXCHANGE",
              type: "咖啡廳 / 全素",
              desc: "代代木公園附近的精緻全素咖啡廳與烘焙坊",
              recommended: false,
              mapUrl: "https://maps.app.goo.gl/pJ7HifWpEsedrdyYA",
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
              name: "YAYOI 彌生軒\n青山學院大學前店",
              type: "日式定食",
              desc: "澀谷周邊目前最近的分店！位在表參道往澀谷的順路上",
              recommended: true,
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
              type: "麵包／餐廳",
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
              type: "西食／甜點",
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
              name: "Izumiya Saku\n和泉屋 傳兵衛",
              type: "甜點／和菓子",
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
      location: "東京／銀座",
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
              name: "YAYOI 彌生軒 銀座 INZ 店",
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
              name: "YOKOHAMA AIR CABIN",
              type: "空中纜車",
              desc: "連接櫻木町站與運河公園，體驗全日本首座都市型循環式索道纜車，橫濱港灣美景盡收眼底。",
              fee: "單程 1,000円 / 往復 1,800円",
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
              fee: "門票 ¥500，製麵體驗 ¥500",
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
              fee: "門票 (WEB)：15:00前 2,700円 / 15:00後 3,400円",
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
              fee: "泡湯：1,550円",
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
      shop: "松本清／藥妝店",
      image: "/me/images/products/hada_labo_premium.png",
    },
    {
      name: "肌研化妝水 綠瓶補充包",
      nameJp: "肌ラボ 極潤 ヒアルロン液 つめかえ用",
      desc: "【囤貨帶回台灣】愛用品補貨，放托運",
      price: 700,
      category: "保養",
      shop: "松本清／藥妝店",
      image: "/me/images/products/hada_labo_refill.png",
    },
    {
      name: "DUO 卸妝膏 (20g 迷你罐)",
      nameJp: "DUO ザ クレンジングバーム ミニ",
      desc: "💛 黃色-深層淨化。【粉刺終結者 - 試用】旅行先用小罐測試膚感",
      price: 880,
      category: "保養",
      shop: "唐吉訶德／松本清",
      image: "/me/images/products/duo_mini_20g.jpg",
    },
    {
      name: "DUO 卸妝膏 (90g)",
      nameJp: "DUO ザ クレンジングバーム",
      desc: "💛 黃色-深層淨化。【囤貨帶回台灣】若小罐好用，回程買大罐放托運",
      price: 3960,
      category: "保養",
      shop: "唐吉訶德／松本清",
      image: "/me/images/products/duo_cleansing_balm_90g.png",
    },
    {
      name: "KOSE 紅瓶定妝噴霧 隨手罐",
      nameJp: "コーセー メイク キープ ミスト EX",
      desc: "超強防水防汗定妝噴霧，隨手小罐裝攜帶超方便。",
      price: 880,
      category: "彩妝",
      shop: "藥妝店／唐吉訶德",
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
      shop: "藥妝店／唐吉訶德",
      image: "/me/images/products/elixir_pink_tube.png",
    },
    {
      name: "ELIXIR 小銀管防曬乳",
      nameJp: "エリクシール ブライトニング UV クリーム",
      desc: "防曬+美白二合一，SPF50+ PA++++，質地清爽不黏膩，提升膚色均勻感。",
      price: 3410,
      category: "彩妝",
      shop: "藥妝店／唐吉訶德",
      image: "/me/images/products/elixir_silver_tube.png",
    },
    {
      name: "&be 氣墊粉餅",
      nameJp: "アンドビー クッションファンデ",
      desc: "【白氣墊（霧面）】色號：Beige (自然米色)。霧面妝效，輕薄透氣，溫水可卸。深色痘疤需搭配遮瑕盤。",
      price: 3200,
      category: "彩妝",
      shop: "藥妝店／唐吉訶德",
      image: "/me/images/products/andbe_cushion.png",
    },
    {
      name: "ByUR 氣墊粉餅",
      nameJp: "バイユア クッションファンデ",
      desc: "【霧面白盒 Matte】Serumfit Fullcover Matte Cushion。色號：#21 Light Beige (自然偏白)。中高遮瑕，柔焦毛孔與泛紅。",
      price: 3600,
      category: "彩妝",
      shop: "藥妝店／唐吉訶德",
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
      shop: "直營店／鞋店",
      image: "https://m.media-amazon.com/images/I/71X7r4QyQKL._AC_UY900_.jpg",
    },
    {
      name: "隨身背包",
      nameJp: "",
      desc: "皮革側背包，棕色真皮質感",
      price: null,
      category: "衣飾",
      shop: "百貨／專賣店",
      image: "/me/images/products/leather_bag.jpg",
    },
    {
      name: "皮夾",
      nameJp: "",
      desc: "Roots 經典棕色真皮短夾",
      price: null,
      category: "衣飾",
      shop: "Roots／百貨",
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
    category: "準備",
    item: "Visit Japan Web (VJW)",
  },
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
    category: "交通",
    item: "機場接送",
  },
  {
    group: "出國前準備",
    category: "通訊",
    item: "日本上網 eSIM",
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
    "野菜/卵/乳製品 (蔬菜/雞蛋/乳製品)",
    "昆布だし (昆布高湯)",
    "ネギ/にんにく類 (蔥/蒜/韭菜等五辛)",
  ],
};

export const accommodationData = [
  {
    location: "橫濱",
    period: "Day 1 (6/17 三)",
    hotels: [
      {
        name: "MGH Yokohama Minatomirai",
        status: "已訂妥",
        desc: "港未來區高空絕美海景，精緻奢華首夜",
        features: ["海景", "高空", "新開幕"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Yokohama+Minatomirai+Premier",
        priceJpy: 14070,
        priceTwd: 2814,
      },
    ],
  },
  {
    location: "橫濱",
    period: "Day 2 (6/18 四)",
    hotels: [
      {
        name: "MGH Yokohama Minatomirai",
        status: "已訂妥",
        desc: "續住港未來",
        features: ["海景", "高空", "新開幕"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Yokohama+Minatomirai+Premier",
        priceJpy: 19000,
        priceTwd: 3800,
      },
    ],
  },
  {
    location: "大宮",
    period: "Day 3 (6/19 五)",
    hotels: [
      {
        name: "Marroad Inn Omiya",
        status: "已訂妥",
        desc: "抵達大宮中繼，補單人房差額",
        features: ["交通樞紐"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Marroad+Inn+Omiya",
        priceJpy: 7400,
        priceTwd: 3456,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 4 (6/20 六)",
    hotels: [
      {
        name: "輕井澤淺間王子大飯店",
        status: "已訂妥",
        desc: "溫泉溫潤身心，房內可直接眺望淺間山雄偉美景 (含稅)",
        features: ["溫泉", "淺間山景"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Karuizawa+Asama+Prince+Hotel",
        priceJpy: 34008,
        priceTwd: 6802,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 5 (6/21 日)",
    hotels: [
      {
        name: "旧軽井沢 ホテル音羽ノ森",
        status: "已訂妥",
        desc: "三週年紀念日！體驗舊輕井澤的古典和風",
        features: ["和式房", "紀念日", "古典"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Kyu-Karuizawa+Hotel+Otowanomori",
        priceJpy: 15874,
        priceTwd: 3175,
      },
    ],
  },
  {
    location: "輕井澤",
    period: "Day 6 (6/22 一)",
    hotels: [
      {
        name: "星野集團 BEB5 輕井澤",
        status: "已訂妥",
        desc: "享受星野集團年輕活力的渡假體驗",
        features: ["設計感", "渡假", "星野"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=BEB5+Karuizawa",
        priceJpy: 27000,
        priceTwd: 5400,
      },
    ],
  },
  {
    location: "東京",
    period: "Day 7 (6/23 二)",
    hotels: [
      {
        name: "dormy inn PREMIUM 神田",
        status: "已訂妥",
        desc: "最後一晚，享用免費拉麵與大浴場",
        features: ["大浴場", "消夜拉麵"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Dormy+Inn+Premium+Kanda",
        priceJpy: 19080,
        priceTwd: 3816,
      },
    ],
  },
];

export const expenseData = {
  /** 每日花費明細 */
  days: [
    {
      date: "2026-06-17",
      label: "Day 1・成田 → 橫濱",
      items: [
        {
          time: "事前",
          shop: "機票",
          category: "交通",
          amount: 22890,
          currency: "TWD",
          note: "台北-成田 雙人來回（僅回程托運 1 行李）",
          preflight: true,
        },
        {
          time: "早上",
          shop: "早餐店",
          category: "飲食",
          amount: 120,
          currency: "TWD",
          note: "蔬菜蛋漢堡*2",
        },
        {
          time: "早上",
          shop: "台灣機場",
          category: "飲食",
          amount: 65,
          currency: "TWD",
          note: "茶可頌",
        },
        {
          time: "早上",
          shop: "台灣機場",
          category: "飲食",
          amount: 290,
          currency: "TWD",
          note: "素牛肉燉飯套餐",
        },
        {
          time: "早上",
          shop: "台灣機場",
          category: "飲食",
          amount: 95,
          currency: "TWD",
          note: "義美小泡芙奶茶口味+蚵仔煎格子餅乾",
        },
        {
          time: "早上",
          shop: "機場接送",
          category: "交通",
          amount: 1000,
          currency: "TWD",
          note: "機場送機",
        },
        {
          time: "18:03",
          shop: "FamilyMart 成田機場店",
          category: "飲食",
          amount: 962,
          currency: "JPY",
          note: "果凍飲、飯糰、橘子汁等",
        },
        {
          time: "18:07",
          shop: "成田機場車站",
          category: "交通",
          amount: 3000,
          currency: "JPY",
          note: "ICOCA 機台加值",
        },
        {
          time: "18:07",
          shop: "iPhone",
          category: "交通",
          amount: 2000,
          currency: "JPY",
          note: "手機加值 ICOCA",
        },
        {
          time: "20:49",
          shop: "MGH Yokohama Minatomirai",
          category: "住宿",
          amount: 14070,
          currency: "JPY",
          note: "飯店住宿費",
        },
        {
          time: "21:15",
          shop: "AFURI 橫濱地標塔店",
          category: "飲食",
          amount: 1290,
          currency: "JPY",
          note: "柚子鹽拉麵",
        },
        {
          time: "21:31",
          shop: "成城石井超市",
          category: "飲食",
          amount: 517,
          currency: "JPY",
          note: "柚子菇菇冷蕎麥麵 (打8折)",
        },
        {
          time: "21:33",
          shop: "Lawson",
          category: "飲食",
          amount: 254,
          currency: "JPY",
          note: "濃抹茶餅乾泡芙",
        },
        {
          time: "21:33",
          shop: "Lawson",
          category: "飲食",
          amount: 153,
          currency: "JPY",
          note: "梅子海苔捲",
        },
        {
          time: "21:35",
          shop: "7-Eleven 橫濱地標塔店",
          category: "飲食",
          amount: 339,
          currency: "JPY",
          note: "明治鮮奶 900ml",
        },
      ],
      summary: {
        JPY: {
          total: 22585,
          住宿: 14070,
          交通: 5000,
          飲食: 3515,
          購物: 0,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
        TWD: {
          total: 1570,
          交通: 1000,
          飲食: 570,
          住宿: 0,
          購物: 0,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-18",
      label: "Day 2・橫濱",
      items: [
        {
          time: "12:00",
          shop: "MGH Yokohama Minatomirai",
          category: "住宿",
          amount: 19000,
          currency: "JPY",
          note: "飯店住宿費",
        },
        {
          time: "12:30",
          shop: "RICE CUISINE スーヤ",
          category: "飲食",
          amount: 3030,
          currency: "JPY",
          note: "和膳、半拉麵與大豆肉泡菜丼",
        },
        {
          time: "14:06",
          shop: "VANILLABEANS THE ROASTERY",
          category: "飲食",
          amount: 3520,
          currency: "JPY",
          note: "巧克力之旅熱紅茶套餐、Berry 巧克力刨冰聖代",
        },
        {
          time: "17:03",
          shop: "BAGGYPORT 橫濱紅磚倉庫",
          category: "購物",
          amount: 7150,
          currency: "JPY",
          note: "撞色零錢包",
        },
        {
          time: "18:14",
          shop: "OWNDAYS 橫濱 World Porters 店",
          category: "購物",
          amount: 12545,
          currency: "JPY",
          note: "木村拓哉眼鏡 (免稅)",
        },
        {
          time: "19:47",
          shop: "橫濱元町 Doria",
          category: "飲食",
          amount: 3333,
          currency: "JPY",
          note: "Doria 雞肉馬鈴薯番茄奶油起司筆管麵、蘑菇蛋包飯",
        },
        {
          time: "19:53",
          shop: "吉伊卡哇燒",
          category: "購物",
          amount: 1650,
          currency: "JPY",
          note: "吉伊卡哇玩偶",
        },
        {
          time: "19:53",
          shop: "吉伊卡哇燒",
          category: "飲食",
          amount: 350,
          currency: "JPY",
          note: "吉伊卡哇燒 (紅豆口味)",
        },
        {
          time: "20:25",
          shop: "Character Station",
          category: "購物",
          amount: 5250,
          currency: "JPY",
          note: "moz後背包 (折扣後)",
        },
        {
          time: "20:30",
          shop: "YOKOHAMA AIR CABIN",
          category: "交通",
          amount: 2000,
          currency: "JPY",
          note: "單程成人票 2 張",
        },
        {
          time: "21:51",
          shop: "Lawson",
          category: "飲食",
          amount: 954,
          currency: "JPY",
          note: "蔬果汁、大滿足橘子果凍、花生米粿、魷魚絲",
        },
      ],
      summary: {
        JPY: {
          total: 58782,
          購物: 26595,
          住宿: 19000,
          飲食: 11187,
          交通: 2000,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-19",
      label: "Day 3・大宮",
      items: [
        {
          time: "事前",
          shop: "Marroad Inn Omiya",
          category: "住宿",
          amount: 1976,
          currency: "TWD",
          note: "事前網路訂房",
        },
        {
          time: "22:45",
          shop: "Marroad Inn Omiya",
          category: "住宿",
          amount: 7400,
          currency: "JPY",
          note: "現場補單人房差額",
        },
        {
          time: "12:01",
          shop: "Foodway 超市",
          category: "飲食",
          amount: 647,
          currency: "JPY",
          note: "四種小菜、中華冷麵",
        },
        {
          time: "12:06",
          shop: "おぼんdeごはん",
          category: "飲食",
          amount: 1730,
          currency: "JPY",
          note: "南蠻&銀鮭鹽麴定食",
        },
        {
          time: "13:45",
          shop: "mont-bell MARK IS みなとみらい店",
          category: "購物",
          amount: 1250,
          currency: "JPY",
          note: "登山扣等配件",
        },
        {
          time: "14:46",
          shop: "Foodway 超市",
          category: "飲食",
          amount: 240,
          currency: "JPY",
          note: "白桃果汁飲品",
        },
        {
          time: "16:07",
          shop: "LUNA EARTH",
          category: "購物",
          amount: 990,
          currency: "JPY",
          note: "大腸圈、髮圈套組",
        },
        {
          time: "17:43",
          shop: "NICE CLAUP",
          category: "購物",
          amount: 7000,
          currency: "JPY",
          note: "喇叭牛仔褲 (免稅價)",
        },
        {
          time: "19:28",
          shop: "やよい軒 上野店",
          category: "飲食",
          amount: 2050,
          currency: "JPY",
          note: "大豆肉蔬菜炒定食、夏越飯與豬肉涮涮鍋定食",
        },
        {
          time: "22:01",
          shop: "JR 新幹線",
          category: "交通",
          amount: 10520,
          currency: "JPY",
          note: "北陸新幹線 大宮-輕井澤 雙人指定席",
        },
        {
          time: "22:01",
          shop: "IC卡餘額加值",
          category: "交通",
          amount: 1480,
          currency: "JPY",
          note: "總加值12000扣除車票之剩額",
        },
        {
          time: "22:12",
          shop: "Lawson",
          category: "飲食",
          amount: 376,
          currency: "JPY",
          note: "麻糬抹茶蛋糕捲",
        },
        {
          time: "22:26",
          shop: "7-Eleven",
          category: "飲食",
          amount: 527,
          currency: "JPY",
          note: "湖池屋 Scone 梅子蒜味餅乾、明治鮮奶",
        },
        {
          time: "22:34",
          shop: "FamilyMart",
          category: "飲食",
          amount: 473,
          currency: "JPY",
          note: "Afternoon Tea 橘子伯爵冰棒、紅茶泡芙",
        },
      ],
      summary: {
        JPY: {
          total: 34683,
          交通: 12000,
          購物: 9240,
          住宿: 7400,
          飲食: 6043,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
        TWD: {
          total: 1976,
          住宿: 1976,
          交通: 0,
          飲食: 0,
          購物: 0,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-20",
      label: "Day 4・輕井澤（淺間王子）",
      items: [
        {
          time: "??:??",
          shop: "輕井澤淺間王子大飯店",
          category: "住宿",
          amount: 34008,
          currency: "JPY",
          note: "住宿費 33,208 + 泡湯稅 300 + 住宿稅 500",
        },
        {
          time: "10:10",
          shop: "TULLY'S COFFEE & TEA",
          category: "飲食",
          amount: 570,
          currency: "JPY",
          note: "焙茶拿鐵",
        },
        {
          time: "10:38",
          shop: "BAKE CHEESE TART",
          category: "飲食",
          amount: 702,
          currency: "JPY",
          note: "焦糖起司塔、檸檬椰子起司塔",
        },
        {
          time: "10:57",
          shop: "ANDERSEN 大宮店",
          category: "飲食",
          amount: 1144,
          currency: "JPY",
          note: "大份綜合三明治、玉米起司熱壓吐司",
        },
        {
          time: "10:58",
          shop: "おこわのたごさく",
          category: "飲食",
          amount: 601,
          currency: "JPY",
          note: "飯糰/米糕小菜",
        },
        {
          time: "11:12",
          shop: "JR-Cross",
          category: "飲食",
          amount: 250,
          currency: "JPY",
          note: "各地特色麵包：巧克力花生淋醬麵包",
        },
        {
          time: "14:18",
          shop: "BANANA REPUBLIC",
          category: "購物",
          amount: 5603,
          currency: "JPY",
          note: "深藍色質感上衣、白色質感短褲 (免稅)",
        },
        {
          time: "14:40",
          shop: "Delifrance 輕井澤店",
          category: "飲食",
          amount: 880,
          currency: "JPY",
          note: "白巧克力伯爵麵包、蔬菜蕃茄佛卡夏",
        },
        {
          time: "15:04",
          shop: "KUA`AINA 輕井澤店",
          category: "飲食",
          amount: 2340,
          currency: "JPY",
          note: "起司肉餅漢堡套餐(附薯條、飲料)、番茄醬凱撒沙拉",
        },
        {
          time: "15:54",
          shop: "7-Eleven 輕井澤王子S廣場店",
          category: "飲食",
          amount: 1989,
          currency: "JPY",
          note: "揚出豆腐、三明治、高菜與梅子飯糰、鮮奶、玉米濃湯、日清辣番茄杯麵",
        },
        {
          time: "18:48",
          shop: "輕井澤淺間王子大飯店",
          category: "飲食",
          amount: 930,
          currency: "JPY",
          note: "信州蜂蜜梅酒、信州特色辣味噌拉麵",
        },
      ],
      summary: {
        JPY: {
          total: 49017,
          住宿: 34008,
          飲食: 9406,
          購物: 5603,
          交通: 0,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-21",
      label: "Day 5・三週年紀念・舊輕井澤",
      items: [
        {
          time: "??:??",
          shop: "旧軽井沢 ホテル音羽ノ森",
          category: "住宿",
          amount: 15874,
          currency: "JPY",
          note: "和式房",
        },
        {
          time: "11:34",
          shop: "STARBUCKS 輕井澤T-SITE店",
          category: "飲食",
          amount: 658,
          currency: "JPY",
          note: "焙茶拿鐵",
        },
        {
          time: "13:33",
          shop: "French Bakery",
          category: "飲食",
          amount: 183,
          currency: "JPY",
          note: "鹽可頌",
        },
        {
          time: "14:35",
          shop: "SAWAMURA 舊輕井澤",
          category: "飲食",
          amount: 3102,
          currency: "JPY",
          note: "季節濃湯、凱薩沙拉、信州野澤菜麵包、雞蛋三明治、大蒜諾亞麵包",
        },
        {
          time: "15:14",
          shop: "APPLE PIE lab",
          category: "飲食",
          amount: 720,
          currency: "JPY",
          note: "檸檬蘋果派",
        },
        {
          time: "16:21",
          shop: "輕井澤のおやつ ATELIER",
          category: "伴手禮",
          amount: 919,
          currency: "JPY",
          note: "綜合奶油夾心餅乾4入 (家人伴手禮)",
        },
        {
          time: "16:25",
          shop: "寺子屋本舖",
          category: "伴手禮",
          amount: 1124,
          currency: "JPY",
          note: "信州味噌堅果 2入 (公司伴手禮)",
        },
        {
          time: "19:48",
          shop: "酢重正之",
          category: "飲食",
          amount: 5197,
          currency: "JPY",
          note: "鐵鍋馬鈴薯奶油、炸豆腐田樂、梅茶漬、烤焙茶布蕾、藍莓果醋香草冰淇淋",
        },
        {
          time: "20:05",
          shop: "Le Chien 舊輕井澤",
          category: "娛樂",
          amount: 2640,
          currency: "JPY",
          note: "兩人日歸溫泉、私人風呂、大浴場、夜鳴拉麵(番茄和醬油口味)",
        },
      ],
      summary: {
        JPY: {
          total: 30417,
          住宿: 15874,
          飲食: 9860,
          娛樂: 2640,
          伴手禮: 2043,
          交通: 0,
          購物: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-22",
      label: "Day 6・星野溫泉・BEB5",
      items: [
        {
          time: "??:??",
          shop: "星野集團 BEB5 輕井澤",
          category: "住宿",
          amount: 27000,
          currency: "JPY",
          note: "住宿費",
        },
        {
          time: "11:59",
          shop: "Cafe St.Maire KUMOBA",
          category: "飲食",
          amount: 3500,
          currency: "JPY",
          note: "雲場池旁野菜咖喱、起司蛋糕與抹茶冰淇淋+熱紅茶套餐",
        },
        {
          time: "13:52",
          shop: "7-Eleven 輕井澤王子S廣場店",
          category: "飲食",
          amount: 555,
          currency: "JPY",
          note: "汽水、玉米美乃滋麵包、高麗菜沙拉",
        },
        {
          time: "14:00",
          shop: "Delifrance 輕井澤店",
          category: "飲食",
          amount: 800,
          currency: "JPY",
          note: "羅勒起司麵包、巧克力豆麵包",
        },
        {
          time: "17:32",
          shop: "COACH 輕井澤",
          category: "購物",
          amount: 26400,
          currency: "JPY",
          note: "斜背包 (自用，免稅)",
        },
        {
          time: "17:32",
          shop: "COACH 輕井澤",
          category: "伴手禮",
          amount: 16800,
          currency: "JPY",
          note: "皮夾 (家人伴手禮，免稅)",
        },
        {
          time: "17:34",
          shop: "COACH 輕井澤",
          category: "購物",
          amount: 330,
          currency: "JPY",
          note: "S號禮物袋",
        },
        {
          time: "19:06",
          shop: "7-Eleven 中輕井澤店",
          category: "飲食",
          amount: 2557,
          currency: "JPY",
          note: "高麗菜絲、焗烤培根馬鈴薯、冷豆腐、中華冷麵、七種野菜味噌湯、優格葡萄乾巧克力、明治鮮奶、起司條、燻製風熟成蛋、起司洋蔥厚揚洋芋片",
        },
        {
          time: "20:19",
          shop: "川上庵",
          category: "飲食",
          amount: 2772,
          currency: "JPY",
          note: "天婦羅冷蕎麥麵",
        },
        {
          time: "20:31",
          shop: "星野溫泉 蜻蛉之湯",
          category: "娛樂",
          amount: 1200,
          currency: "JPY",
          note: "BEB5住宿者大人2位含入湯稅",
        },
      ],
      summary: {
        JPY: {
          total: 81914,
          住宿: 27000,
          購物: 26730,
          伴手禮: 16800,
          飲食: 10184,
          娛樂: 1200,
          交通: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-23",
      label: "Day 7・輕井澤 → 東京（神田）",
      items: [
        {
          time: "09:08",
          shop: "SAWAMURA 輕井澤榆樹街小鎮",
          category: "飲食",
          amount: 1716,
          currency: "JPY",
          note: "巧克力覆盆子可頌、紅酒燉無花果奶油起司核桃麵包、野菇塔",
        },
        {
          time: "09:31",
          shop: "SAWAMURA 輕井澤榆樹街小鎮",
          category: "飲食",
          amount: 2178,
          currency: "JPY",
          note: "法式吐司套餐（吐司兩片 沙拉 葡萄柚汁）",
        },
        {
          time: "13:45",
          shop: "JR 新幹線",
          category: "交通",
          amount: 11860,
          currency: "JPY",
          note: "輕井澤車站發行乘車券 2張",
        },
        {
          time: "13:45",
          shop: "SAWAMURA 輕井澤車站",
          category: "購物",
          amount: 918,
          currency: "JPY",
          note: "草莓果醬 (自用)",
        },
        {
          time: "13:45",
          shop: "SAWAMURA 輕井澤車站",
          category: "伴手禮",
          amount: 918,
          currency: "JPY",
          note: "草莓果醬 (家人伴手禮)",
        },
        {
          time: "15:35",
          shop: "dormy inn PREMIUM 神田",
          category: "住宿",
          amount: 19080,
          currency: "JPY",
          note: "6/23-6/24 雙人房住宿費",
        },
        {
          time: "16:56",
          shop: "無印良品 秋葉原Tolim店",
          category: "購物",
          amount: 6699,
          currency: "JPY",
          note: "男短襪*3(900)、女短襪*3(900)、男條紋T-shirt*2(1800)、戒指收納盒(355)、日本柏精油(1628)、柚子金桔喉糖12包(1116) (免稅)",
        },
        {
          time: "17:38",
          shop: "やよい軒 神田北口店",
          category: "飲食",
          amount: 1950,
          currency: "JPY",
          note: "大豆肉蔬菜炒定食、味噌豬排煮定食",
        },
        {
          time: "18:25",
          shop: "7-Eleven 神田須田町中央通店",
          category: "飲食",
          amount: 680,
          currency: "JPY",
          note: "明治鮮奶、麝香葡萄軟糖、優格風味葡萄乾巧克力",
        },
        {
          time: "19:39",
          shop: "松本清 秋葉原店",
          category: "購物",
          amount: 11666,
          currency: "JPY",
          note: "&honey髮油(1358)、KOSE紅色定妝噴霧蘋果口味(1300)、hince藍盒21號(2700)、Elixir防曬小銀管(3400)、肌研極潤化妝水補充包(814)、樂敦Digi Eye眼藥水(657)、參天Sante PC眼藥水(677)、DUO卸妝膏黃色旅行小罐裝(760) (免稅)",
        },
        {
          time: "21:02",
          shop: "Bic Camera 秋葉原店",
          category: "購物",
          amount: 6752,
          currency: "JPY",
          note: "特大和牛拼圖一頭買い(1412)、滑鼠G502HERO(3720)、滑鼠墊MPDFLT2GY(1090)、Cororo麝香葡萄軟糖(113)、長野縣產軟糖(148)、神奈川湘南產軟糖(148)、Cororo葡萄軟糖(121) (折扣後免稅)",
        },
      ],
      summary: {
        JPY: {
          total: 64417,
          購物: 26035,
          住宿: 19080,
          交通: 11860,
          飲食: 6524,
          伴手禮: 918,
          娛樂: 0,
          其他: 0,
        },
      },
    },
    {
      date: "2026-06-24",
      label: "Day 8・成田 → 返台",
      items: [
        {
          time: "09:56",
          shop: "麥當勞 Bic Camera AKIBA店",
          category: "飲食",
          amount: 1270,
          currency: "JPY",
          note: "培根蛋起司鬆餅堡餐*2 (其一去培根)、薯餅*2、小杯柳橙汁、大杯野菜生活100",
        },
        {
          time: "10:44",
          shop: "FamilyMart 神田鍛冶町三丁目店",
          category: "購物",
          amount: 429,
          currency: "JPY",
          note: "全家襪子",
        },
        {
          time: "10:44",
          shop: "FamilyMart 神田鍛冶町三丁目店",
          category: "飲食",
          amount: 360,
          currency: "JPY",
          note: "Afternoon Tea 奶茶冰沙",
        },
        {
          time: "10:48",
          shop: "やよい軒 神田北口店",
          category: "飲食",
          amount: 2110,
          currency: "JPY",
          note: "大豆肉蔬菜炒定食、宮崎冷湯與雞肉南蠻定食",
        },
        {
          time: "14:09",
          shop: "東京食賓館 成田機場",
          category: "伴手禮",
          amount: 594,
          currency: "JPY",
          note: "熊貓年輪蛋糕草莓味*1 (朋友伴手禮)",
        },
        {
          time: "14:09",
          shop: "東京食賓館 成田機場",
          category: "伴手禮",
          amount: 918,
          currency: "JPY",
          note: "熊貓年輪蛋糕草莓味*1、小型羊羹空之旅 (家人伴手禮)",
        },
        {
          time: "14:16",
          shop: "LAWSON 成田機場第1航廈店",
          category: "飲食",
          amount: 1104,
          currency: "JPY",
          note: "豬肉涮涮鍋義大利麵沙拉(397)、龜田梅子海苔仙貝*3(459)、大滿足橘子維他命C果凍(248)",
        },
        {
          time: "15:05",
          shop: "Fa-So-La SOUVENIR KOTOBUKI",
          category: "伴手禮",
          amount: 2400,
          currency: "JPY",
          note: "Tokyo Milk Cheese Factory 綜合餅乾 18入 (家人伴手禮，免稅)",
        },
        {
          time: "15:05",
          shop: "Fa-So-La SOUVENIR KOTOBUKI",
          category: "飲食",
          amount: 2110,
          currency: "JPY",
          note: "東酒造 灰持酒仕込 完熟梅酒 (自用，免稅)",
        },
        {
          time: "15:25",
          shop: "Fa-So-La TAX FREE ASAKUSA",
          category: "飲食",
          amount: 4700,
          currency: "JPY",
          note: "LeTAO 雙層起司蛋糕、LeTAO 小樽色內通起司夾心餅乾 16枚入 (自用，免稅)",
        },
        {
          time: "16:07",
          shop: "7-Eleven 成田機場第1航廈店",
          category: "飲食",
          amount: 1730,
          currency: "JPY",
          note: "紀州南高梅飯糰(182)、麝香葡萄果汁100%(120)、Jagabee九州醬油薯條(164)、去籽脆梅(180)、優質花生巧克力(158)、大包柿種花生(248)、中華冷麵(550)",
        },
        {
          time: "20:45",
          shop: "桃園機場捷運",
          category: "交通",
          amount: 320,
          currency: "TWD",
          note: "機捷費用 160*2",
        },
      ],
      summary: {
        JPY: {
          total: 17725,
          飲食: 13384,
          伴手禮: 3912,
          購物: 429,
          住宿: 0,
          交通: 0,
          娛樂: 0,
          其他: 0,
        },
        TWD: {
          total: 320,
          交通: 320,
          住宿: 0,
          飲食: 0,
          購物: 0,
          娛樂: 0,
          伴手禮: 0,
          其他: 0,
        },
      },
    },
  ],

  /** 8 天總計 */
  grandTotal: {
    JPY: {
      total: 359545,
      breakdown: {
        住宿: 136432,
        購物: 94632,
        飲食: 69103,
        伴手禮: 24591,
        交通: 30860,
        娛樂: 3840,
        其他: 0,
      },
    },
    TWD: {
      total: 26756,
      breakdown: {
        交通: 24210,
        住宿: 1976,
        飲食: 570,
        購物: 0,
        娛樂: 0,
        伴手禮: 0,
        其他: 0,
      },
    },
  },
};

export const weatherData = {
  sourceNote: "更新於 2026/06/13 - 日本氣象廳 10 日間預報",
  sourceUrl: "https://tenki.jp/forecast/3/16/4410/13101/10days.html",
  days: [
    {
      date: "6/17",
      day: "三",
      fullDate: "6/17 (三)",
      loc: "橫濱",
      weatherIcon: "⛅",
      weatherText: "曇時々晴",
      tempHigh: 27,
      tempLow: 19,
      precip: "20%",
      note: "舒適，適合散步",
      warn: false,
    },
    {
      date: "6/18",
      day: "四",
      fullDate: "6/18 (四)",
      loc: "橫濱",
      weatherIcon: "☁️",
      weatherText: "曇",
      tempHigh: 26,
      tempLow: 20,
      precip: "40%",
      note: "陰天微涼",
      warn: false,
    },
    {
      date: "6/19",
      day: "五",
      fullDate: "6/19 (五)",
      loc: "澀谷／原宿",
      weatherIcon: "🌦️",
      weatherText: "曇のち雨",
      tempHigh: 25,
      tempLow: 19,
      precip: "70%",
      note: "傍晚陣雨，記得帶傘",
      warn: true,
    },
    {
      date: "6/20",
      day: "六",
      fullDate: "6/20 (六)",
      loc: "輕井澤",
      weatherIcon: "🌧️",
      weatherText: "雨",
      tempHigh: 21,
      tempLow: 13,
      precip: "80%",
      note: "山區降雨，注意保暖",
      warn: true,
    },
    {
      date: "6/21",
      day: "日",
      fullDate: "6/21 (日)",
      loc: "輕井澤",
      weatherIcon: "⛅",
      weatherText: "曇時々晴",
      tempHigh: 22,
      tempLow: 12,
      precip: "30%",
      note: "避暑絕佳天氣",
      warn: false,
    },
    {
      date: "6/22",
      day: "一",
      fullDate: "6/22 (一)",
      loc: "輕井澤",
      weatherIcon: "☁️",
      weatherText: "曇",
      tempHigh: 20,
      tempLow: 12,
      precip: "40%",
      note: "微涼多雲",
      warn: false,
    },
    {
      date: "6/23",
      day: "二",
      fullDate: "6/23 (二)",
      loc: "東京",
      weatherIcon: "⛅",
      weatherText: "晴時々曇",
      tempHigh: 28,
      tempLow: 20,
      precip: "20%",
      note: "微熱，適合逛街",
      warn: false,
    },
    {
      date: "6/24",
      day: "三",
      fullDate: "6/24 (三)",
      loc: "成田",
      weatherIcon: "☀️",
      weatherText: "晴",
      tempHigh: 28,
      tempLow: 21,
      precip: "10%",
      note: "好天氣返程",
      warn: false,
    },
  ],
};
