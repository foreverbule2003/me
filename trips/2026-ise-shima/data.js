/**
 * 2026 伊勢志摩‧大阪 行程資料
 * 所有資料常數獨立於 UI 元件，便於維護和更新
 */

(function () {
  "use strict";

  // 行程策略概覽
  const strategyData = {
    title: "關鍵策略 (10日素食慢旅版)",
    content:
      "由大阪 KIX 進出。Day 1 停留機場周邊，Day 2-3 直奔 VISON 連住兩晚，優化 5 日周遊券效益 (Day 2-6)。Day 7-8 大阪 USJ + 空庭溫泉，Day 9-10 返程。",
    transport: [
      "近鐵電車周遊券 5日券 plus (Day 2-6 使用)",
      "特急券總費用約 ¥4,320/人",
    ],
    accommodation: [
      "Day 1 (機場): OMO 關西機場 by 星野集團 (大浴場)",
      "Day 2-3 (園區): Hotel Vison (連住兩晚)",
      "Day 4 (市區): 伊勢市區飯店 / Comfort Hotel",
      "Day 5 (溫泉): 賢島寶生苑 (含早晚餐)",
      "Day 6-8 (都市): 大阪難波/心齋橋一帶",
      "Day 9 (機場): 關西機場華盛頓飯店",
    ],
  };

  // 每日行程資料
  const itineraryData = [
    {
      phase: "第一階段：伊勢志摩度假慢旅 (Day 1-6)",
      days: [
        {
          day: 1,
          date: "1/12 (一)",
          title: "抵達關西 · Rinku Outlet",
          image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2070&auto=format&fit=crop",
          time: "13:00 - 住宿",
          activities: [
            { time: "13:00", text: "抵達關西國際機場 (KIX)", map: { query: "Kansai International Airport" } },
            { time: "14:00", text: "交通：機場 → 臨空城", subText: "接駁巴士或南海電鐵 (一站)", map: { query: "Rinku Town Station" } },
            { time: "14:30", text: "購物：Rinku Premium Outlets", note: "別忘了去 Hoka Store (區號6700)", map: { query: "Rinku Premium Outlets" } },
            { time: "18:00", text: "晚餐：Outlet 內/周邊", foodGuideLink: "臨空城" },
            { time: "19:30", text: "入住：OMO Kansai Airport", subText: "星野集團機場飯店", note: "住客專用大浴場/桑拿", map: { query: "OMO Kansai Airport" } },
          ],
          highlight: "🛍️ 落地即購物！直奔 Rinku Outlet 買裝備，入住星野集團機場飯店享受大浴場。",
        },
        {
          day: 2,
          date: "1/13 (二)",
          title: "VISON 初探",
          image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2108&auto=format&fit=crop",
          time: "10:00 - 20:00",
          activities: [
            { time: "10:00", text: "OMO → 難波", subText: "南海電鐵 (¥970)", map: { type: "route", origin: "Kansai Airport Station", destination: "Namba Station" } },
            { time: "11:00", text: "難波 → 松阪", subText: "近鐵特急 (約80分)", note: "啟用周遊券 5日plus，另需購特急券 ¥1640", map: { type: "route", origin: "Osaka-Namba Station", destination: "Matsusaka Station" } },
            { time: "12:30", text: "松阪 → VISON", subText: "三重交通巴士 (約45分)", map: { type: "route", origin: "Matsusaka Station", destination: "VISON Mie" } },
            { time: "14:00", text: "午餐：園區餐廳", foodGuideLink: "VISON 園區" },
            { time: "15:00", text: "入住：Hotel Vison", subText: "Check-in 15:00", map: { query: "Hotel Vison" } },
            { time: "15:30", text: "午後散步：甜點區", foodGuideLink: "VISON 園區" },
            { time: "20:00", text: "體驗：本草湯", subText: "藥草溫泉 (住客免費)", note: "夜晚可欣賞園區星空 🌟", map: { query: "VISON Honzo Yu" } },
          ],
          highlight: "🚌 啟用周遊券，直奔日本最大商業度假園區 VISON。特急券需另購。",
        },
        {
          day: 3,
          date: "1/14 (三)",
          title: "VISON 深度體驗",
          image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2108&auto=format&fit=crop",
          time: "全日",
          activities: [
            { time: "08:00", text: "早餐：園區早餐", foodGuideLink: "VISON 園區" },
            { time: "10:00", text: "晨間體驗：本草湯", subText: "06:00 - 00:00 開放", map: { query: "VISON Honzo Yu" } },
            { time: "12:00", text: "午餐：園區餐廳", foodGuideLink: "VISON 園區" },
            { time: "14:00", text: "購物時光", note: "購買 VISON 限定伴手禮" },
            { time: "18:00", text: "晚餐：園區美食街", foodGuideLink: "VISON 園區" },
            { time: "20:00", text: "入住：VISON (第二晚)" },
          ],
          highlight: "♨️ 不趕車的悠閒一天，住客免費無限次使用本草湯。",
        },
        {
          day: 4,
          date: "1/15 (四)",
          title: "伊勢神宮漫遊",
          image: "https://images.unsplash.com/photo-1694175173949-1c2bc79b99dc?q=80&w=2070&auto=format&fit=crop",
          time: "11:00 - 17:00",
          activities: [
            { time: "11:00", text: "交通：VISON → 松阪", subText: "巴士", map: { type: "route", origin: "VISON Mie", destination: "Matsusaka Station" } },
            { time: "12:00", text: "交通：松阪 → 伊勢市", subText: "近鐵特急 (特急券+¥520)", map: { type: "route", origin: "Matsusaka Station", destination: "Iseshi Station" } },
            { time: "13:00", text: "午餐：托福橫丁", subText: "Oharai-machi 老街", foodGuideLink: "伊勢 (Day 4)", map: { query: "Oharai Machi Ise" } },
            { time: "14:30", text: "參拜：伊勢神宮 (內宮)", note: "日本人心靈故鄉，下午人潮較少", map: { query: "Ise Jingu Naiku" } },
            { time: "17:00", text: "入住：伊勢市區飯店", subText: "Comfort Hotel Ise", map: { query: "Comfort Hotel Ise" } },
          ],
          highlight: "⛩️ 參拜日本人心靈故鄉，漫步托福橫丁享受老街美食。",
        },
        {
          day: 5,
          date: "1/16 (五)",
          title: "賢島海景溫泉",
          image: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=2070&auto=format&fit=crop",
          time: "10:00 - 住宿",
          activities: [
            { time: "10:00", text: "交通：伊勢市 → 賢島", subText: "近鐵特急 (特急券+¥520)", map: { type: "route", origin: "Iseshi Station", destination: "Kashikojima Station" } },
            { time: "15:00", text: "入住：賢島寶生苑", subText: "含早晚餐", note: "車站提供免費接駁車 (約3分)", tips: "車站全家超商 18:00 關門", map: { query: "Kashikojima Hojoen" } },
            { time: "18:00", text: "晚餐：寶生苑懷石料理", subText: "含早晚餐方案 🍱", note: "可提前告知素食需求" },
          ],
          highlight: "🌊 志摩半島絕美海景 + 傳統溫泉旅館懷石料理 (含早晚餐)。",
        },
        {
          day: 6,
          date: "1/17 (六)",
          title: "賢英虞灣遊船 · 大阪返程",
          image: "https://images.unsplash.com/photo-1490761668535-35497054764d?q=80&w=2070&auto=format&fit=crop",
          time: "08:00 - 18:00",
          activities: [
            { time: "08:00", text: "早餐：寶生苑早餐", subText: "含早晚餐方案 🍱" },
            { time: "11:00", text: "觀光：賢島西班牙遊船", subText: "英虞灣巡遊 (50分)", note: "憑周遊券折抵 ¥100 · 車站置物櫃 ¥600/次", map: { query: "Kashikojima Espana Cruise" } },
            { time: "13:00", text: "午餐：賢島", foodGuideLink: "賢島" },
            { time: "15:30", text: "交通：近鐵特急", subText: "賢島 → 大阪難波 (約2hr20m)", note: "特急券 ¥1,640", map: { type: "route", origin: "Kashikojima Station", destination: "Osaka-Namba Station" } },
            { time: "18:00", text: "晚餐：大阪市區", note: "Check-in 大阪飯店", foodGuideLink: "大阪 梅田" },
          ],
          highlight: "🚂 完美運用周遊券最後一天，英虞灣遊船觀光後返回大阪。",
        },
      ],
    },
    {
      phase: "第二階段：大阪都市探索 (Day 7-10)",
      days: [
        {
          day: 7,
          date: "1/18 (日)",
          title: "梅田購物 · USJ 夜遊",
          image: "https://images.unsplash.com/photo-1612404834746-1ffba06de133?q=80&w=2070&auto=format&fit=crop",
          time: "11:00 - 20:00",
          activities: [
            { time: "11:00", text: "購物：梅田商圈", subText: "LUCUA / Yodobashi / Grand Front", map: { query: "LUCUA Osaka" } },
            { time: "13:00", text: "午餐：梅田商國", foodGuideLink: "大阪 梅田" },
            { time: "17:00", text: "樂園：USJ 環球影城", tips: "善用 Single Rider 節省時間", map: { query: "Universal Studios Japan" } },
            { time: "20:00", text: "晚餐：園區內或 Citywalk", foodGuideLink: "USJ 環球影城" },
          ],
          highlight: "🎢 年票優勢：白天購物，傍晚入園避開人潮。",
        },
        {
          day: 8,
          date: "1/19 (一)",
          title: "USJ 暢玩 · 空庭溫泉",
          image: "https://images.unsplash.com/photo-1506045412240-22980140a405?q=80&w=2070&auto=format&fit=crop",
          time: "09:00 - 21:00",
          activities: [
            { time: "09:00", text: "樂園：USJ 環球影城", subText: "持年票入園，隨意暢玩", map: { query: "Universal Studios Japan" } },
            { time: "12:00", text: "午餐：園區內", foodGuideLink: "USJ 環球影城" },
            { time: "16:00", text: "交通：USJ → 弁天町", subText: "JR約15分", map: { type: "route", origin: "Universal City Station", destination: "Bentencho Station" } },
            { time: "16:30", text: "體驗：空庭溫泉 Solaniwa Onsen", note: "安土桃山時代造景 / 免費浴衣 / 天空庭園足湯", map: { query: "Solaniwa Onsen Osaka" } },
            { time: "19:00", text: "晚餐：空庭溫泉館內", subText: "和食/居酒屋風" },
            { time: "21:00", text: "返回大阪市區", note: "營業至 23:00" },
          ],
          highlight: "♨️ 玩累了直接泡湯！USJ + 空庭溫泉一日雙享受。",
        },
        {
          day: 9,
          date: "1/20 (二)",
          title: "Rinku Outlet",
          image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2070&auto=format&fit=crop",
          time: "10:00 - 19:00",
          activities: [
            { time: "10:00", text: "交通：大阪 → 臨空城", map: { type: "route", origin: "Namba Station", destination: "Rinku Town Station" } },
            { time: "11:00", text: "購物：Rinku Premium Outlets", note: "營業至20:00", map: { query: "Rinku Premium Outlets" } },
            { time: "13:00", text: "午餐：Outlet 內餐廳", foodGuideLink: "臨空城" },
            { time: "18:00", text: "晚餐：Outlet 內餐廳" },
            { time: "19:00", text: "入住：關西機場華盛頓飯店", subText: "Kansai Airport Washington Hotel", map: { query: "Kansai Airport Washington Hotel" } },
          ],
          highlight: "🛍️ 住機場旁，不用擔心早班機。",
        },
        {
          day: 10,
          date: "1/21 (三)",
          title: "優雅返程",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
          time: "08:00 - 10:00",
          activities: [
            { time: "08:00", text: "交通：前往關西機場", subText: "飯店免費接駁車 (約10分)" },
            { time: "10:00", text: "Check-in & 返程", note: "帶著戰利品與回憶回家 ✈️" },
          ],
          highlight: "✈️ 完美與充滿回憶的旅程。",
        },
      ],
    },
  ];

  // 預算資料
  const budgetData = [
    { item: "機票 (TPE-KIX)", cost: 42000, note: "約 $9,240 TWD (來回估算)" },
    { item: "交通 (近鐵周遊券)", cost: 6900, note: "約 $1,518 TWD (5日券 plus)" },
    { item: "交通 (特急券/其他)", cost: 7320, note: "約 $1,610 TWD (特急券 ¥4,320 + 其他 ¥3,000)" },
    { item: "住宿 (9泊)", cost: 64000, note: "約 $14,080 TWD (含 OMO, VISON x2, 寶生苑等)" },
    { item: "餐飲費", cost: 30000, note: "約 $6,600 TWD (每日素食)" },
    { item: "娛樂費", cost: 3000, note: "約 $660 TWD (空庭溫泉、西班牙遊船)" },
  ];

  // 推薦路線 (行程地圖用)
  const recommendedRoutes = [
    { id: 1, day: "Day 1", name: "機場 → Outlet → OMO", from: "Kansai International Airport", to: "OMO Kansai Airport", desc: "接駁巴士/南海電鐵", duration: "20分" },
    { id: 2, day: "Day 2", name: "OMO → 難波 → VISON", from: "Kansai Airport Station", to: "VISON Mie", desc: "南海電鐵+近鐵特急+巴士", duration: "3.5hr" },
    { id: 3, day: "Day 3", name: "VISON 園區連住", from: "VISON Mie", to: "VISON Mie", desc: "園區內移動，無長途交通", duration: "—" },
    { id: 4, day: "Day 4", name: "VISON → 伊勢神宮", from: "VISON Mie", to: "Ise Jingu Naiku", desc: "巴士+近鐵特急", duration: "1.5hr" },
    { id: 5, day: "Day 5", name: "伊勢市 → 賢島", from: "Iseshi Station", to: "Kashikojima Station", desc: "近鐵特急", duration: "50分" },
    { id: 6, day: "Day 6", name: "賢島 → 大阪難波", from: "Kashikojima Station", to: "Osaka-Namba Station", desc: "近鐵特急", duration: "2h20m" },
    { id: 7, day: "Day 7", name: "梅田 → USJ", from: "Umeda Station", to: "Universal Studios Japan", desc: "JR環狀線+夢咲線", duration: "30分" },
    { id: 8, day: "Day 8", name: "USJ → 空庭溫泉", from: "Universal City Station", to: "Solaniwa Onsen Osaka", desc: "JR至弁天町", duration: "15分" },
    { id: 9, day: "Day 9", name: "大阪 → 臨空城", from: "Namba Station", to: "Rinku Town Station", desc: "南海電鐵", duration: "40分" },
    { id: 10, day: "Day 10", name: "飯店 → 機場", from: "Kansai Airport Washington Hotel", to: "Kansai International Airport", desc: "飯店免費接駁車", duration: "10分" },
  ];

  // 實用連結
  const usefulLinks = {
    categories: [
      {
        type: "ticket",
        label: "交通票券",
        icon: "Train",
        items: [
          { name: "關西國際機場", day: "Day 1, 10", url: "https://www.kansai-airport.or.jp/tw/" },
          { name: "近鐵周遊券 5日券 plus", day: "Day 2-6", url: "https://www.kintetsu.co.jp/foreign/chinese-han/ticket/krp_plus.html" },
        ],
      },
      {
        type: "hotel",
        label: "住宿",
        icon: "Hotel",
        items: [
          { name: "OMO 關西機場 by 星野", day: "Day 1", url: "https://hoshinoresorts.com/zh_tw/hotels/omokansaiairport/" },
          { name: "Hotel VISON", day: "Day 2-3", url: "https://vison.jp/stay/" },
          { name: "賢島寶生苑", day: "Day 5", url: "https://www.hojoen.com/" },
          { name: "關西機場華盛頓飯店", day: "Day 9", url: "https://washington-hotels.jp/kansai/" },
        ],
      },
      {
        type: "attraction",
        label: "景點",
        icon: "Star",
        items: [
          { name: "Rinku Premium Outlets", day: "Day 1, 9", url: "https://www.premiumoutlets.co.jp/cht/rinku/" },
          { name: "VISON 度假園區", day: "Day 2-3", url: "https://vison.jp/" },
          { name: "伊勢神宮", day: "Day 4", url: "https://www.isejingu.or.jp/" },
          { name: "USJ 環球影城", day: "Day 7-8", url: "https://www.usj.co.jp/web/zh/tw" },
          { name: "空庭溫泉", day: "Day 8", url: "https://solaniwa.com/" },
        ],
      },
    ],
  };

  // 近鐵特急比較表
  const kintetsuComparisonData = [
    { day: "Day 2", route: "大阪難波 → 松阪", regular: "約 100~120 分", express: "約 80 分", cost: "¥1,640" },
    { day: "Day 4", route: "松阪 → 伊勢市", regular: "約 25~30 分", express: "約 15~18 分", cost: "¥520" },
    { day: "Day 5", route: "伊勢市 → 賢島", regular: "約 60 分", express: "約 45~50 分", cost: "¥520" },
    { day: "Day 6", route: "賢島 → 大阪難波", regular: "約 3.5~4 小時", express: "約 2h20m", cost: "¥1,640" },
  ];

  // 美食指南資料
  const foodData = {
    categories: [
      {
        location: "臨空城",
        day: "Day 1, 9",
        sections: [
          {
            title: "🍽️ Outlet 美食",
            items: [],
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
              { name: "NOUNIYELL (農場餐廳)", type: "義式料理", desc: "有機蔬菜料理 (沙拉/時蔬麵/Pizza)，¥1,500~3,500", mapUrl: "https://www.google.com/maps/search/?api=1&query=NOUNIYELL+VISON" },
              { name: "raf", type: "咖啡廳", desc: "當季蔬菜濃湯、咖哩，¥800~1,200", mapUrl: "https://www.google.com/maps/search/?api=1&query=raf+cafe+VISON" },
              { name: "豊農米蔵", type: "米飯料理", desc: "鹽味飯糰可食 (味噌湯含魚湯)，¥500~1,000", mapUrl: "https://www.google.com/maps/search/?api=1&query=豊農米蔵+VISON" },
            ],
          },
          {
            title: "🍳 早餐選項",
            items: [
              { name: "嬉野とうふ のせ", type: "豆腐定食", desc: "現做溫豆腐定食 (含早餐)", note: "⚠️ 需預約", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=嬉野とうふ+VISON" },
              { name: "VISON Buffet", type: "自助餐", desc: "和洋自助餐 (含早餐)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+VISON+Restaurant" },
              { name: "NOUNIYELL", type: "西式", desc: "蛋料理+沙拉 (含早餐)", mapUrl: "https://www.google.com/maps/search/?api=1&query=NOUNIYELL+VISON" },
              { name: "Confiture H", type: "法式", desc: "法式吐司 (含早餐)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Confiture+H+VISON" },
              { name: "Mariage de Farine", type: "麵包店", desc: "現烤麵包+咖啡 (自由入店)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mariage+de+Farine+VISON" },
              { name: "猿田彥珈琲", type: "咖啡", desc: "熱三明治+咖啡 (自由入店)", mapUrl: "https://www.google.com/maps/search/?api=1&query=猿田彦珈琲+VISON" },
            ],
          },
          {
            title: "🍫 甜點/購物",
            items: [
              { name: "LE CHOCOLAT DE H", type: "巧克力專賣店", desc: "辻口博啓主理，60+種巧克力", note: "VISON 限定款 Meyer Lemon", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=LE+CHOCOLAT+DE+H+VISON" },
              { name: "Mariage de Farine", type: "麵包店", desc: "三重縣產小麥石臼現磨", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mariage+de+Farine+VISON" },
              { name: "EGUN ON", type: "巴斯克起司塔", desc: "濃郁綿密的重乳酪口感", mapUrl: "https://www.google.com/maps/search/?api=1&query=EGUN+ON+VISON" },
            ],
          },
        ],
      },
      {
        location: "伊勢 (Day 4)",
        day: "Day 4",
        sections: [
          {
            title: "⛩️ 外宮參道 / 伊勢市站周邊",
            items: [
              { name: "Kishin (喜心)", type: "純素日式定食", desc: "九格小菜+味噌湯", recommended: true, mapUrl: "https://maps.app.goo.gl/iVnL3LNxxyXR6LCZA" },
              { name: "Killbilli", type: "可麗餅", desc: "復古美式風格，日式可麗餅", mapUrl: "https://www.google.com/maps/search/?api=1&query=Killbilli+Ise" },
              { name: "Camino Coffee", type: "咖啡廳", desc: "站前烘焙咖啡，早餐供蜂蜜起司吐司", mapUrl: "https://www.google.com/maps/search/?api=1&query=Camino+Coffee+Ise" },
              { name: "Hanakago’me", type: "創意蒸料理", desc: "當地食材蒸籠料理", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=Hanakago'me+Ise" },
            ],
          },
          {
            title: "🍡 內宮前 托福橫丁",
            items: [
              { name: "赤福 本店", type: "和菓子", desc: "伊勢名物，紅豆麻糬", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=赤福+托福橫丁" },
              { name: "五十鈴川河畔 豆腐屋", type: "豆腐", desc: "豆腐田樂、湯豆腐 (醬汁含魚湯)", mapUrl: "https://www.google.com/maps/search/?api=1&query=伊勢+豆腐屋" },
              { name: "伊勢烏龍 ふくすけ", type: "麵食", desc: "濃口醬油烏龍麵 (醬汁含魚湯)", mapUrl: "https://www.google.com/maps/search/?api=1&query=伊勢うどん+ふくすけ" },
              { name: "豆腐冰淇淋", type: "甜點", desc: "濃郁豆香", mapUrl: "https://www.google.com/maps/search/?api=1&query=豆腐+アイス+おかげ横丁" },
            ],
          },
        ],
      },
      {
        location: "賢島",
        day: "Day 5-6",
        sections: [
          {
            title: "🍽️ 餐廳",
            items: [],
          },
        ],
      },
      {
        location: "大阪 梅田",
        day: "Day 7",
        sections: [
          {
            title: "🍜 素食友善餐廳",
            items: [
              { name: "[東梅田] 素食串燒 あじゅ", type: "居酒屋", desc: "純素串燒、大阪燒體驗", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=あじゅ+梅田+素食串燒" },
              { name: "[東梅田] おにぎりごりちゃん 中崎町本店", type: "飯糰", desc: "手作飯糰＋茶泡飯專賣店（上次吃的分店）", mapUrl: "https://www.google.com/maps/search/?api=1&query=おにぎりごりちゃん+中崎町本店" },
              { name: "[東梅田] MOON and BACK HEP FIVE", type: "拉麵", desc: "純素擔擔麵、蒸餃", mapUrl: "https://www.google.com/maps/search/?api=1&query=MOON+and+BACK+HEP+FIVE" },
              { name: "[梅田北口] Vegan and Gluten Free Osaka", type: "全素", desc: "大阪燒、章魚燒、拉麵、串炸 (完全素食)", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=Vegan+and+Gluten+Free+Osaka" },
              { name: "[梅田南口] 松葉ルクア大阪店", type: "串炸", desc: "LUCUA 內知名串炸（上次吃的）", mapUrl: "https://www.google.com/maps/search/?api=1&query=松葉+ルクア大阪店" },
              { name: "[福島] 花くじら (Hanakujira)", type: "關東煮", desc: "大阪必吃關東煮 (⚠️湯頭含魚)", mapUrl: "https://www.google.com/maps/search/?api=1&query=花くじら+福島" },
            ],
          },
          {
            title: "🍰 甜點",
            items: [
              { name: "HARBS 大丸梅田店", type: "蛋糕", desc: "招牌水果千層蛋糕", recommended: true, mapUrl: "https://www.google.com/maps/search/?api=1&query=HARBS+大丸梅田店" },
              { name: "HARBS Diamor大阪店", type: "蛋糕", desc: "地下街分店，同款美味", mapUrl: "https://www.google.com/maps/search/?api=1&query=HARBS+Diamor大阪店" },
            ],
          },
        ],
      },
      {
        location: "USJ 環球影城",
        day: "Day 7-8",
        sections: [
          {
            title: "🍕 園區美食",
            items: [],
          },
        ],
      },
    ],
  };

  // 導出到全域
  if (typeof window !== "undefined") {
    window.TripData = {
      strategyData,
      itineraryData,
      budgetData,
      recommendedRoutes,
      usefulLinks,
      kintetsuComparisonData,
      foodData,
    };
  }
})();
