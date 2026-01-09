/**
 * 2025 大阪‧京阪奈岡山 行程資料
 * Extracted from original index.html
 */

(function () {
  "use strict";

  const flightData = {
    out: {
      date: "8/28 (四)",
      code: "IT214",
      time: "11:30 - 15:05",
      from: "TPE T1",
      to: "OKJ 岡山",
      note: "環亞貴賓室(C區)",
    },
    in: {
      date: "9/05 (五)",
      code: "回程",
      time: "待確認",
      from: "KIX",
      to: "TPE",
    },
  };

  const itineraryData = [
    {
      day: "D1",
      date: "8/28 (四)",
      loc: "岡山 ➝ 倉敷",
      events: [
        {
          time: "11:30",
          title: "飛往岡山",
          desc: "虎航 IT214 (T1航廈)",
          note: "貴賓室在出境後左轉B1-B9方向4F",
        },
        {
          time: "15:05",
          title: "抵達岡山桃太郎機場",
          desc: "入境VJW申請",
          link: "https://vjw-lp.digital.go.jp/zh-hant/",
        },
        {
          time: "16:00",
          title: "前往倉敷",
          desc: "Check-in 住宿",
          tag: "住宿",
        },
        {
          time: "18:00",
          title: "倉敷晚餐",
          desc: "富來屋本舖(千屋牛) 或 倉敷烏龍麵",
          tag: "美食",
        },
      ],
    },
    {
      day: "D2",
      date: "8/29 (五)",
      loc: "倉敷 ➝ 京都",
      note: "★ 開始使用關西廣域周遊券 (Pass Day 1)",
      events: [
        {
          time: "上午",
          title: "移動至新大阪",
          desc: "倉敷→岡山(17分)→新大阪(50分, Sakura號)",
          note: "Pass可搭：Sakura, Hikari, Kodama。不可搭：Nozomi",
        },
        {
          time: "轉乘",
          title: "新大阪 ➝ 京都",
          desc: "轉乘 Haruka 或 JR新快速 (不可搭新幹線)",
          tag: "交通",
        },
        {
          time: "下午",
          title: "嵐山散策",
          desc: "JR山陰本線 (約20分)",
          tag: "景點",
        },
      ],
    },
    {
      day: "D3",
      date: "8/30 (六)",
      loc: "保津川・嵐山",
      events: [
        {
          time: "09:00",
          title: "保津川遊船",
          desc: "每小時一班，Klook購票",
          link: "https://s.klook.com/c/my4zr7E2yO",
          tag: "體驗",
        },
        {
          time: "12:00",
          title: "嵐山午餐",
          desc: "廣川鰻魚飯 / 嵐山吉兆",
          tag: "美食",
        },
        {
          time: "14:00",
          title: "嵐山景點",
          desc: "竹林小徑、天龍寺",
          tag: "景點",
        },
      ],
    },
    {
      day: "D4",
      date: "8/31 (日)",
      loc: "宇治",
      events: [
        {
          time: "上午",
          title: "前往宇治",
          desc: "JR 奈良線 (快速17分)",
          tag: "交通",
        },
        {
          time: "景點",
          title: "平等院鳳凰堂",
          desc: "世界遺產",
          tag: "景點",
        },
        {
          time: "美食",
          title: "中村藤吉 本店",
          desc: "必點：生茶果凍",
          tag: "必吃",
        },
        {
          time: "注意",
          title: "交通提醒",
          desc: "奈良-京都/大阪無特急，只有快速(45分)或普通(60分)",
          tag: "重要",
        },
      ],
    },
    {
      day: "D5",
      date: "9/01 (一)",
      loc: "小倉・任天堂",
      events: [
        {
          time: "全日",
          title: "任天堂博物館",
          desc: "Nintendo Museum (小倉)",
          link: "https://check.museum-tickets.nintendo.com/en/myticket",
          tag: "重點",
        },
        {
          time: "提醒",
          title: "置物資訊",
          desc: "有免費寄物櫃(100円退幣)、大型行李寄放",
          tag: "資訊",
        },
      ],
    },
    {
      day: "D6",
      date: "9/02 (二)",
      loc: "奈良",
      events: [
        {
          time: "上午",
          title: "奈良公園",
          desc: "東大寺、餵鹿",
          tag: "景點",
        },
        {
          time: "資訊",
          title: "USJ 預測",
          desc: "查看明日入園人數",
          link: "https://usjreal.asumirai.info/monthly/usj-forecast-2025-9.html",
        },
      ],
    },
    {
      day: "D7",
      date: "9/03 (三)",
      loc: "USJ 環球影城",
      note: "★ 門票/年票確認",
      events: [
        {
          time: "08:00",
          title: "USJ Day 1",
          desc: "提早排隊",
          tag: "玩樂",
        },
      ],
    },
    {
      day: "D8",
      date: "9/04 (四)",
      loc: "USJ 環球影城",
      events: [
        {
          time: "全日",
          title: "USJ Day 2",
          desc: "補玩設施",
          tag: "玩樂",
        },
      ],
    },
    {
      day: "D9",
      date: "9/05 (五)",
      loc: "大阪梅田 ✈️",
      events: [
        {
          time: "上午",
          title: "梅田購物",
          desc: "LUCUA, 阪急",
          tag: "購物",
        },
        {
          time: "下午",
          title: "前往機場",
          desc: "Haruka 購票教學",
          link: "https://www.instagram.com/reel/DIeF0H1TrAY/?igsh=cXlhNjJzbTNmeGJs",
        },
        {
          time: "15:55",
          title: "回程班機",
          desc: "IT215 (預計)",
          tag: "交通",
        },
      ],
    },
  ];

  const luggageData = {
    bao: {
      title: "寶的清單",
      items: [
        "酒精(補充)",
        "半包衛生紙/小衛生紙",
        "香",
        "眼鏡/太陽眼鏡",
        "塑膠袋(髒衣/鞋)",
        "睡衣(乾淨吊嘎)",
        "襪子",
        "內褲",
        "行李束帶",
        "護照/日幣",
        "行動電源",
        "手機繩",
        "鑰匙/台幣",
        "Cube卡",
        "鴨舌帽",
      ],
    },
    bei: {
      title: "貝的清單",
      items: [
        "藥品(甲亢/頭痛/鼻)",
        "化妝包(備用髮圈)",
        "護墊/口罩",
        "髒衣袋",
        "耳環",
        "水壺(方綠)",
        "卸妝棉",
        "洗漱組(洗面乳/棉花棒)",
        "曬衣夾*3/衣架",
        "Gogoro卡/J卡",
        "耳機/悠遊卡",
        "太陽眼鏡",
      ],
    },
    morning: {
      title: "早上檢查",
      items: [
        "牙刷",
        "關窗/關插座",
        "貝耳塞/藥",
        "化妝包",
        "小梳子",
        "拔蚊香",
        "香",
        "充電線/豆腐頭",
        "iPad",
        "護照(再次確認)",
        "浪耳機",
        "早餐",
      ],
    },
    clothes: {
      title: "小豬衣物",
      items: [
        "襪子(穿1帶3)",
        "內褲(穿1帶3, 無痕3+紫)",
        "下半身(白洞洞裙/牛仔短褲)",
        "內衣(白前扣/交叉白/平口)",
        "口罩",
        "黑短bra",
        "白透外套",
        "鴨舌帽",
        "米奇睡衣/短褲",
      ],
    },
  };

  const shoppingData = {
    items: [
      {
        title: "&be 雙色遮瑕膏 (淺膚/橘)",
        type: "cosme",
        image: "/me/images/products/andbe_concealer.png",
      },
      {
        title: "CLIO Kill Cover 氣墊 02 Lingerie",
        type: "cosme",
        image: "/me/images/products/clio_cushion.png",
      },
      {
        title: "TIRTIR 紅色氣墊 21N",
        type: "cosme",
        image: "/me/images/products/tirtir_cushion.png",
      },
      {
        title: "DUO 卸妝膏 (深層淨化 90g)",
        type: "cosme",
        image: "/me/images/products/duo_cleansing_balm_90g.png",
      },
      {
        title: "DUO 卸妝膏 (迷你 20g)",
        type: "cosme",
        image: "/me/images/products/duo_mini_20g.jpg",
      },
      {
        title: "極潤化妝水 (補充包)",
        type: "cosme",
        image: "/me/images/products/hada_labo_refill.png",
      },
      {
        title: "Kissme 睫毛卸除液",
        type: "cosme",
        image: "/me/images/products/kissme_remover.png",
      },
      {
        title: "Melano CC 集中對策眼霜",
        type: "cosme",
        image: "/me/images/products/melano_cc_eye.png",
      },
      {
        title: "Rohto Digi Eye 眼藥水 (初音)",
        type: "drug",
        image: "/me/images/products/rohto_digi_eye.png",
      },
      {
        title: "SANA 豆乳美肌眼霜",
        type: "cosme",
        image: "/me/images/products/sana_eye_cream.png",
      },
      {
        title: "Visee 遮瑕筆",
        type: "cosme",
        image: "/me/images/products/visee_concealer.png",
      },
      { title: "味噌", type: "food" },
      { title: "桃屋辣油 (辣的)", type: "food" },
      { title: "微波包子容器 (大創/3coins)", type: "goods" },
    ],
    links: [
      {
        title: "梅田 Visa 行李寄放",
        url: "https://www.instagram.com/reel/DLFZxwIzf3t/",
        icon: "fa-suitcase",
      },
      {
        title: "Lawson OPENPOINT 集點",
        url: "https://www.instagram.com/reel/DH_WnRlzpmX/",
        icon: "fa-store",
      },
      {
        title: "JCB 貴賓室資訊",
        url: "https://parklounge.reservation.jcb/lounge/member/zh-tw/usj/reserve/loungeReserveTop.html",
        icon: "fa-couch",
      },
      {
        title: "eSim 購買連結",
        url: "https://tw.trip.com/m/things-to-do/detail/37658069",
        icon: "fa-sim-card",
      },
    ],
    tips: [
      "隨身行李液體限制：味噌算是液體，請託運！",
      "關西廣域 Pass：只能搭岡山-新大阪的新幹線，不能搭新大阪-京都的新幹線。",
      "奈良交通：奈良往返京都/大阪沒有特急，請搭快速列車。",
    ],
  };

  if (typeof window !== "undefined") {
    window.TripData = {
      flightData,
      itineraryData,
      luggageData,
      shoppingData,
    };
  }
})();
