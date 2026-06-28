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
    title: "成田 → 橫濱",
    hotel: "橫濱三井花園",
  },
  { day: 2, date: "6/18 (四)", title: "橫濱", hotel: "待訂" },
  { day: 3, date: "6/19 (五)", title: "澀谷／原宿", hotel: "待訂" },
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
        title: "抵達成田 → 橫濱港未來",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
        highlight:
          "✈️ 16:30 抵達成田，N'EX 直達橫濱港都，體驗港未來纜車與浪漫晚餐",
        activities: [
          {
            time: "08:30",
            text: "出發前往機場",
            transport: {
              line: "🚕 機場接送",
              note: "預約 08:30，預計 1 小時車程",
            },
          },
          {
            time: "09:30",
            text: "抵達桃園機場 T1",
            subText: "泰國獅航 SL394 報到 (12:10 起飛)",
            note: "無託運行李，可直接用電子登機證或自助機台報到",
          },
          {
            time: "17:30",
            text: "搭 N'EX → 橫濱站",
            transport: {
              line: "N'EX 成田特快",
              station: "成田機場 T1",
              fare: "來回優惠票 NT$ 1,109",
              note: "直達約 90 分鐘",
            },
            map: {
              type: "route",
              origin: "Narita Airport",
              destination: "Yokohama Station",
            },
          },
          {
            time: "18:00",
            text: "YOKOHAMA AIR CABIN",
            subText: "體驗全日本首座都市型循環式索道纜車，橫濱港灣美景盡收眼底",
            fee: "單程 ¥1,000 / 來回 ¥1,800",
            map: { type: "search", query: "YOKOHAMA AIR CABIN" },
          },
          {
            time: "20:00",
            text: "港未來・COSMOWORLD",
            subText: "地標摩天輪浪漫夜景",
            map: { type: "search", query: "Cosmoworld Yokohama" },
          },
          {
            time: "20:30",
            text: "Center Grill",
            isFood: true,
            subText: "老字號昭和風洋食，招牌蛋包飯 (可素食)",
            map: { type: "search", query: "Center Grill Yokohama" },
          },
        ],
      },
      {
        day: 2,
        date: "6/18 (四)",
        title: "橫濱海濱與文創散策",
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
        highlight: "⚓ 悠閒漫步山下公園、紅磚倉庫與元町商店街，傍晚前往澀谷",
        activities: [
          {
            time: "上午",
            text: "山下公園散步",
            subText: "海濱漫步，享受玫瑰花季",
            map: { type: "search", query: "Yamashita Park Yokohama" },
          },
          {
            time: "上午",
            text: "合味道紀念館",
            subText: "親手製作專屬杯麵",
            fee: "門票 ¥500，製麵體驗 ¥500",
            map: { type: "search", query: "CupNoodles Museum Yokohama" },
          },
          {
            time: "中午",
            text: "Rice Cuisine SŪYA",
            isFood: true,
            subText: "日本大通純素與無麩質米粉料理專賣，擔擔麵與披薩極推",
            map: { type: "search", query: "Rice Cuisine SUYA Yokohama" },
          },
          {
            time: "下午",
            text: "橫濱紅磚倉庫 & MARINE & WALK",
            subText: "歷史建築改建文創市集、美式海濱購物中心",
            map: { type: "search", query: "Yokohama Red Brick Warehouse" },
          },
          {
            time: "下午",
            text: "橫濱元町商店街",
            subText: "充滿歐式風情的精品與咖啡街散策",
            map: {
              type: "search",
              query: "Yokohama Motomachi Shopping Street",
            },
          },
          {
            time: "傍晚",
            text: "前往澀谷",
            transport: {
              line: "JR 湘南新宿線",
              station: "橫濱站 ➔ 澀谷站",
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
    phase: "澀谷／原宿 (Day 3)",
    image:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=2070&auto=format&fit=crop",
    days: [
      {
        day: 3,
        date: "6/19 (五)",
        title: "澀谷原宿潮流與觀景",
        image:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛒 原宿竹下通、排隊甜甜圈，傍晚 SHIBUYA SKY 百萬日落",
        activities: [
          {
            time: "上午",
            text: "代代木公園",
            subText: "廣闊的都市綠洲散策，享受寧靜的早晨",
            map: { type: "search", query: "Yoyogi Park" },
          },
          {
            time: "中午",
            text: "AFURI 原宿",
            isFood: true,
            subText: "清爽柚子鹽拉麵，備有精緻素食款",
            map: { type: "search", query: "AFURI Harajuku" },
          },
          {
            time: "下午",
            text: "AMAM DACOTAN／I'm donut?",
            isFood: true,
            subText: "超人氣排隊麵包與生甜甜圈",
            map: { type: "search", query: "Im donut Omotesando" },
          },
          {
            time: "下午",
            text: "原宿竹下通",
            subText: "體驗原宿年輕流行文化與特色商店",
            map: { type: "search", query: "Takeshita Street" },
          },
          {
            time: "傍晚",
            text: "YAYOI 彌生軒",
            isFood: true,
            subText: "青山學院大學前店，從表參道往澀谷方向順路吃晚餐",
            map: { type: "search", query: "Yayoiken Aoyama Gakuin" },
          },
          {
            time: "晚上",
            text: "澀谷商場採買",
            subText: "吃飽後散步逛 Shibuya 109、澀谷 PARCO 任天堂旗艦店",
            map: { type: "search", query: "Shibuya 109" },
          },
          {
            time: "晚上",
            text: "SHIBUYA SKY (展望台)",
            subText: "飽覽東京絕美百萬夜景 (建議先網上預約)",
            fee: "門票約 ¥2,500",
            map: { type: "search", query: "SHIBUYA SKY" },
          },
          {
            time: "晚上",
            text: "東急FoodShow 澀谷店",
            subText: "看完夜景下樓，採買隔日搭車要吃的早餐",
            map: { type: "search", query: "Tokyu FoodShow Shibuya" },
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
        title: "啟程：輕井澤／溫泉鄉",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🚄 前往輕井澤避暑，或選擇高崎／草津溫泉作為中繼站",
        options: [
          {
            id: 1,
            label: "輕井澤",
            title: "直奔輕井澤",
            image:
              "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
            highlight: "🚄 抵達輕井澤，感受舊輕井澤銀座通的百年風華",
            activities: [
              {
                time: "上午",
                text: "澀谷 → 輕井澤",
                transport: {
                  line: "JR 湘南新宿線 (至大宮) 轉 新幹線",
                  station: "大宮站 ➔ 輕井澤站",
                  fare: "總計約 ¥6,300",
                  note: "車程約 85 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Shibuya Station",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "下午",
                text: "舊輕井澤銀座通",
                subText: "散步百年老街，購買手工果醬與木雕",
                map: { type: "search", query: "Kyu-Karuizawa Ginza" },
              },
              {
                time: "下午",
                text: "雲場池漫遊",
                subText: "翠綠天鵝湖，絕美森林倒影",
                map: { type: "search", query: "Kumoba Pond Karuizawa" },
              },
              {
                time: "美食",
                text: "BOULANGERIE ASANOYA／Paomu",
                isFood: true,
                subText: "百年石窯麵包與知名布丁輕食",
              },
            ],
          },
          {
            id: 2,
            label: "高崎",
            title: "高崎達磨巡禮",
            image:
              "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
            highlight: "🚄 搭乘直達車入住高崎，參訪達磨寺",
            activities: [
              {
                time: "上午",
                text: "澀谷 → 高崎",
                transport: {
                  line: "JR 湘南新宿線 (特別快速)",
                  station: "澀谷站 ➔ 高崎站",
                  note: "免換車直達，車程約 95 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Shibuya Station",
                  destination: "Takasaki Station",
                },
              },
              {
                time: "下午",
                text: "高崎散策／達磨寺",
                subText: "達磨不倒翁發源地祈福",
                map: { type: "search", query: "Shorinzan Darumaji Temple" },
              },
            ],
          },
          {
            id: 3,
            label: "草津溫泉",
            title: "草津溫泉巡禮",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
            highlight: "♨️ 經輕井澤轉乘巴士，入住草津溫泉享受一泊二食",
            activities: [
              {
                time: "上午",
                text: "澀谷 → 輕井澤",
                transport: {
                  line: "JR + 新幹線",
                  station: "大宮站 ➔ 輕井澤站",
                  note: "車程約 85 分鐘",
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
                  line: "草津交通巴士／西武觀光巴士",
                  station: "輕井澤站北口",
                  note: "車程約 80 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Karuizawa Station",
                  destination: "Kusatsu Onsen Bus Terminal",
                },
              },
              {
                time: "下午",
                text: "湯畑漫步",
                subText: "體驗草津獨特溫泉鄉氛圍與揉湯",
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
        title: "三週年紀念・星野度假區",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
        highlight: "🎊 慶祝三週年！漫遊石之教會、高原教會與榆樹街小鎮",
        options: [
          {
            id: 1,
            label: "輕井澤",
            title: "輕井澤教堂漫遊",
            image:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
            highlight: "🎊 三週年！租借單車漫遊中輕井澤教堂區",
            activities: [
              {
                time: "上午",
                text: "石之教會 & 高原教會",
                subText: "隱密森林的石造與木造教堂，獨特光影之美",
                map: { type: "search", query: "Stone Church Karuizawa" },
              },
              {
                time: "中午",
                text: "中輕井澤野菜料理",
                isFood: true,
                subText: "預約制健康野菜 Buffet",
                map: { type: "search", query: "中軽井沢 野菜料理" },
              },
              {
                time: "下午",
                text: "榆樹街小鎮",
                subText: "星野區木棧道商店街，品嚐咖啡與甜點",
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
              {
                time: "晚餐",
                text: "Trattoria Primo",
                isFood: true,
                subText: "超人氣窯烤披薩與義大利麵",
                map: { type: "search", query: "Trattoria Primo Karuizawa" },
              },
            ],
          },
          {
            id: 2,
            label: "高崎",
            title: "返回輕井澤教堂區",
            image:
              "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
            highlight: "🎊 三週年！一早返回輕井澤，前往星野區度過浪漫紀念日",
            activities: [
              {
                time: "上午",
                text: "高崎 → 輕井澤",
                transport: {
                  line: "新幹線",
                  station: "高崎站 ➔ 輕井澤站",
                  note: "車程約 25 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Takasaki Station",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "中午",
                text: "石之教會 & 高原教會",
                subText: "隱密森林的石造與木造教堂",
                map: { type: "search", query: "Stone Church Karuizawa" },
              },
              {
                time: "下午",
                text: "榆樹街小鎮",
                subText: "星野區木棧道商店街，品嚐咖啡與甜點",
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
              {
                time: "晚餐",
                text: "Trattoria Primo",
                isFood: true,
                subText: "超人氣窯烤披薩與義大利麵",
                map: { type: "search", query: "Trattoria Primo Karuizawa" },
              },
            ],
          },
          {
            id: 3,
            label: "草津溫泉",
            title: "返回輕井澤教堂區",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
            highlight: "🎊 三週年！草津晨間散策後返回輕井澤，度過浪漫紀念日",
            activities: [
              {
                time: "上午",
                text: "草津 → 輕井澤",
                transport: {
                  line: "草津交通巴士",
                  station: "草津巴士總站 ➔ 輕井澤站",
                  note: "車程約 80 分鐘",
                },
                map: {
                  type: "route",
                  origin: "Kusatsu Onsen Bus Terminal",
                  destination: "Karuizawa Station",
                },
              },
              {
                time: "中午",
                text: "石之教會 & 高原教會",
                subText: "隱密森林的石造與木造教堂",
                map: { type: "search", query: "Stone Church Karuizawa" },
              },
              {
                time: "下午",
                text: "榆樹街小鎮",
                subText: "星野區木棧道商店街，品嚐咖啡與甜點",
                map: { type: "search", query: "Harunire Terrace Karuizawa" },
              },
              {
                time: "晚餐",
                text: "Trattoria Primo",
                isFood: true,
                subText: "超人氣窯烤披薩與義大利麵",
                map: { type: "search", query: "Trattoria Primo Karuizawa" },
              },
            ],
          },
        ],
      },
      {
        day: 6,
        date: "6/22 (一)",
        title: "森林浴與星野溫泉",
        image:
          "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2070&auto=format&fit=crop",
        highlight: "🌿 騎乘腳踏車穿梭野鳥之森，享受蜻蛉之湯天然溫泉",
        activities: [
          {
            time: "上午",
            text: "輕井澤野鳥之森",
            subText: "國立自然保護區，享受大自然芬多精",
            map: { type: "search", query: "Karuizawa Wild Bird Sanctuary" },
          },
          {
            time: "中午",
            text: "Kamepan／和泉屋 傳兵衛",
            isFood: true,
            subText: "造型烏龜麵包與老鋪和菓子味噌糰子",
          },
          {
            time: "下午",
            text: "星野溫泉 蜻蛉之湯",
            subText: "星野區的天然溫泉，享受露天風呂與森林浴",
            fee: "入場費 ¥1,350",
            map: { type: "search", query: "Tombo-no-yu" },
          },
          {
            time: "晚餐",
            text: "TsuruTonTan UDON NOODLE",
            isFood: true,
            subText: "高級質感烏龍麵 (可客製素食醬汁)",
            map: { type: "search", query: "TsuruTonTan Karuizawa" },
          },
        ],
      },
      {
        day: 7,
        date: "6/23 (二)",
        title: "輕井澤 Outlet → 返回東京",
        image:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",
        highlight: "🛒 王子 Outlet 最終採買，下午新幹線返東京",
        activities: [
          {
            time: "上午",
            text: "輕井澤王子購物廣場",
            subText: "佔地廣大 Outlet，把握最後購物時間",
            map: { type: "search", query: "Karuizawa Prince Shopping Plaza" },
          },
          {
            time: "下午",
            text: "新幹線返東京",
            transport: {
              line: "北陸新幹線",
              station: "輕井澤站 ➔ 東京站",
              fare: "約 ¥6,020",
              note: "車程約 70 分鐘",
            },
            map: {
              type: "route",
              origin: "Karuizawa Station",
              destination: "Tokyo Station",
            },
          },
          {
            time: "晚上",
            text: "T's Tantan",
            isFood: true,
            subText: "東京車站內超人氣純素擔擔麵",
            map: { type: "search", query: "T's Tantan Tokyo Station" },
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
        title: "帶著回憶返台",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
        highlight: "✈️ 16:50 NRT 起飛，再會日本",
        activities: [
          {
            time: "上午",
            text: "東京車站周邊早午餐",
            isFood: true,
            subText: "YAYOI 彌生軒 銀座 INZ 店",
            map: { type: "search", query: "Yayoi Ginza INZ" },
          },
          {
            time: "13:30",
            text: "搭 N'EX 往成田機場",
            transport: {
              line: "N'EX 成田特快",
              station: "東京站 (總武地下線) ➔ 成田機場",
              note: "總武地下月台極深，務必提早出發！車程約 60 分鐘。",
            },
            map: {
              type: "route",
              origin: "Tokyo Station",
              destination: "Narita Airport Terminal 1",
            },
          },
          {
            time: "14:30",
            text: "抵達成田機場 T1",
            subText: "泰國獅航 SL395 報到 (16:50 起飛)",
            note: "回程有一件託運行李，需至櫃檯報到",
          },
          { time: "16:50", text: "🛫 NRT T1 起飛 → TPE T1" },
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
      },
    ],
  },
];

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
