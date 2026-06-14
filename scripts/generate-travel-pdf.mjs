import fs from "fs";
import path from "path";

const tripId = process.argv[2] || "2026-tokyo";
const dataPath = path.resolve(
  process.cwd(),
  `src/pages/trips/${tripId}/data.js`,
);
const modulePath = "file://" + dataPath;

async function generateHTML() {
  const {
    shoppingData,
    flightData,
    itineraryData,
    foodData,
    attractionData,
    recommendedRoutes,
    accommodationData,
    todoData,
    budgetData,
  } = await import(modulePath);

  let html =
    `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="utf-8">
  <title>2026 東京 8日旅 終極導覽</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-light: #e0e7ff;
      --secondary: #ec4899;
      --bg: #f9fafb;
      --text: #1f2937;
      --text-light: #6b7280;
      --border: #e5e7eb;
    }
    body { 
      font-family: 'Helvetica Neue', 'PingFang TC', 'Microsoft JhengHei', sans-serif; 
      color: var(--text); 
      line-height: 1.6; 
      margin: 0; 
      padding: 0; 
      background: #fff; 
    }
    .page { max-width: 900px; margin: 0 auto; padding: 40px; }
    
    h1 { font-size: 36px; color: #111; text-align: center; margin-bottom: 5px; }
    h2 { 
      font-size: 26px; color: var(--primary); 
      border-bottom: 2px solid var(--primary-light); 
      padding-bottom: 8px; margin-top: 50px; 
      page-break-after: avoid; 
    }
    h3 { font-size: 20px; color: #111; margin-top: 30px; }
    h4 { font-size: 16px; color: #333; margin-top: 15px; margin-bottom: 5px; }
    
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .page-break { page-break-before: always; }
    .avoid-break { page-break-inside: avoid; }
    
    .card { 
      background: var(--bg); border: 1px solid var(--border); 
      border-radius: 12px; padding: 20px; margin-bottom: 20px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    
    .veg-card { 
      background: #fdf2f8; border: 2px solid #f472b6; 
      border-radius: 12px; padding: 25px; text-align: center; 
      margin: 20px 0; 
    }
    .veg-card h3 { color: #be185d; margin-top: 0; font-size: 24px; }
    .veg-card p.jp { font-size: 22px; font-weight: bold; color: #111; margin: 20px 0; line-height: 1.6; text-align: left; padding: 0 20px; }
    
    .timeline-item { 
      display: flex; margin-bottom: 15px; 
      border-left: 3px solid var(--primary-light); 
      padding-left: 20px; margin-left: 10px; 
    }
    .time { font-weight: bold; color: var(--primary); width: 65px; flex-shrink: 0; font-size: 16px; }
    .timeline-title { font-weight: bold; font-size: 16px; color: #111; margin-bottom: 4px; }
    .timeline-subtext { font-size: 14px; color: var(--text-light); }
    .tag { background: var(--primary-light); color: var(--primary); font-size: 12px; padding: 3px 8px; border-radius: 6px; margin-left: 8px; font-weight: bold; }
    
    ul { padding-left: 20px; margin-top: 5px; }
    li { margin-bottom: 5px; font-size: 14px; }
    
    .shop-item { display: flex; border-bottom: 1px solid var(--border); padding: 15px 0; }
    .shop-item img { width: 120px; height: 120px; object-fit: contain; margin-right: 20px; border-radius: 8px; border: 1px solid var(--border); padding: 5px; }
    .shop-item-info h4 { margin: 0 0 5px 0; font-size: 16px; }
    .shop-item-info .jp { font-size: 13px; color: #666; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; display: inline-block; }
    .shop-item-info .price { font-size: 16px; color: #e11d48; font-weight: bold; margin-top: 8px; }
    
    .budget-row, .hotel-row { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 10px 0; }
    .budget-row strong { color: #111; }
    .budget-amount { font-weight: bold; color: var(--primary); }
    
    .badge-status { background: #dcfce7; color: #166534; font-size: 12px; padding: 2px 6px; border-radius: 4px; }
    .badge-pending { background: #fef9c3; color: #854d0e; font-size: 12px; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="page">
    
    <!-- Cover -->
    <div style="text-align: center; margin-top: 50px; margin-bottom: 80px;">
      <h1 style="font-size: 48px; margin-bottom: 10px;">🗾 2026 東京 8日旅</h1>
      <p style="font-size: 20px; color: var(--text-light);">6/17 (三) ~ 6/24 (三)</p>
      <div style="margin-top: 40px; display: inline-block; text-align: left; background: #f9fafb; padding: 30px; border-radius: 16px; border: 1px solid #eee;">
        <h3 style="margin-top: 0; color: var(--primary);">目錄</h3>
        <ol style="font-size: 16px; line-height: 2;">
          <li><a href="#sec-overview" style="color: var(--primary); text-decoration: none;">總覽 (Overview)</a></li>
          <li><a href="#sec-itinerary" style="color: var(--primary); text-decoration: none;">行程 (Itinerary)</a></li>
          <li><a href="#sec-transport" style="color: var(--primary); text-decoration: none;">交通 (Transport)</a></li>
          <li><a href="#sec-attraction" style="color: var(--primary); text-decoration: none;">景點 (Attraction)</a></li>
          <li><a href="#sec-food" style="color: var(--primary); text-decoration: none;">美食 (Food)</a></li>
          <li><a href="#sec-shopping" style="color: var(--primary); text-decoration: none;">購物 (Shopping)</a></li>
          <li><a href="#sec-accommodation" style="color: var(--primary); text-decoration: none;">住宿 (Accommodation)</a></li>
          <li><a href="#sec-budget" style="color: var(--primary); text-decoration: none;">預算 (Budget)</a></li>
        </ol>
      </div>
    </div>
    
    <div class="page-break"></div>

    <!-- 1. 總覽 Overview -->
    <h2 id="sec-overview">1. 總覽 (Overview)</h2>
    
    <div class="grid-2">
      <div class="card avoid-break">
        <h3 style="margin-top:0;">🛫 航班去程：` +
    flightData.outbound.date +
    `</h3>
        <p style="font-size: 18px;"><strong>` +
    flightData.outbound.airline +
    ` ` +
    flightData.outbound.flightNo +
    `</strong></p>
        <p>` +
    flightData.outbound.time.depart +
    ` ` +
    flightData.outbound.airport.depart +
    `<br>↓<br>` +
    flightData.outbound.time.arrive +
    ` ` +
    flightData.outbound.airport.arrive +
    `</p>
        <p style="font-size: 13px; color: var(--text-light); margin-top: 15px;">` +
    flightData.outbound.baggage +
    `<br>` +
    flightData.outbound.note +
    `</p>
      </div>
      <div class="card avoid-break">
        <h3 style="margin-top:0;">🛬 航班回程：` +
    flightData.inbound.date +
    `</h3>
        <p style="font-size: 18px;"><strong>` +
    flightData.inbound.airline +
    ` ` +
    flightData.inbound.flightNo +
    `</strong></p>
        <p>` +
    flightData.inbound.time.depart +
    ` ` +
    flightData.inbound.airport.depart +
    `<br>↓<br>` +
    flightData.inbound.time.arrive +
    ` ` +
    flightData.inbound.airport.arrive +
    `</p>
        <p style="font-size: 13px; color: var(--text-light); margin-top: 15px;">` +
    flightData.inbound.baggage +
    `<br>` +
    flightData.inbound.note +
    `</p>
      </div>
    </div>

    <h3>✅ 行前待辦清單</h3>
    <div class="grid-2">
`;

  let todoGroups = {};
  todoData.forEach((t) => {
    if (!todoGroups[t.group]) todoGroups[t.group] = [];
    todoGroups[t.group].push(t);
  });

  for (let group in todoGroups) {
    html +=
      `<div class="card avoid-break"><h4 style="margin-top:0; color:var(--primary);">` +
      group +
      `</h4><ul style="list-style-type: square; padding-left:15px; margin-bottom:0;">`;
    todoGroups[group].forEach((t) => {
      html +=
        `<li style="font-size:13px;">[` + t.category + `] ` + t.item + `</li>`;
    });
    html += `</ul></div>`;
  }

  html += `
    </div>

    <div class="veg-card avoid-break">
      <h3>🥦 素食溝通卡 (請直接出示給店員)</h3>
      <p class="jp">
        すみません、私たちはベジタリアン（五葷・卵・乳製品は食べられます）です。<br><br>
        肉類、魚介類（カツオやエビの出汁・エキスも含む）、動物性油脂（ラードなど）は食べられません。<br><br>
        ネギ、ニンニク、ニラ、タマネギ、卵、牛乳は食べられます。<br><br>
        この条件に合うメニューはありますか？
      </p>
      <p class="tw" style="margin-top: 30px;">(中文翻譯：不好意思，我們是五辛蛋奶素。不吃肉、海鮮及魚蝦高湯、動物油。可吃蔥蒜韭菜洋蔥、蛋奶。請問有符合條件的餐點嗎？)</p>
    </div>

    <div class="page-break"></div>

    <!-- 2. 行程 Itinerary -->
    <h2 id="sec-itinerary">2. 行程 (Itinerary)</h2>
`;

  itineraryData.forEach((phase) => {
    phase.days.forEach((day) => {
      html +=
        `
    <div class="day-block">
      <h3 style="background: #f3f4f6; padding: 10px 15px; border-radius: 8px;">Day ` +
        day.day +
        `：` +
        day.date +
        ` - ` +
        day.title +
        ` <span class="tag">` +
        phase.phase +
        `</span></h3>
    `;
      let activities = day.activities;
      if (!activities && day.options && day.options.length > 0) {
        activities = day.options[0].activities;
      }
      if (activities) {
        activities.forEach((act) => {
          html +=
            `
        <div class="timeline-item">
          <span class="time">` +
            act.time +
            `</span>
          <div class="timeline-content">
            <div class="timeline-title">` +
            act.text +
            ` ` +
            (act.isFood ? "🍽️" : "") +
            `</div>
            ` +
            (act.subText
              ? `<div class="timeline-subtext">` + act.subText + `</div>`
              : "") +
            `
            ` +
            (act.transport
              ? `<div class="timeline-subtext" style="color:#0284c7; margin-top: 4px; font-weight:bold;">🚆 ` +
                act.transport.line +
                ` (` +
                act.transport.station +
                `) - ` +
                act.transport.note +
                `</div>`
              : "") +
            `
          </div>
        </div>
        `;
        });
      }
      html += `</div>`;
    });
  });

  html += `
    <div class="page-break"></div>

    <!-- 3. 交通 Transport/Map -->
    <h2 id="sec-transport">3. 交通 (Transport)</h2>
`;
  recommendedRoutes.forEach((route) => {
    html +=
      `
  <div class="card avoid-break">
    <h3 style="margin-top:0;">` +
      route.day +
      ` | ` +
      route.name +
      `</h3>
    <p style="font-size:14px; color:#555;">` +
      route.origin +
      ` ➔ ` +
      route.destination +
      ` (約 ` +
      route.duration +
      `)</p>
  `;
    if (route.options) {
      route.steps = route.options[0].steps;
    }
    if (route.steps) {
      route.steps.forEach((step) => {
        html +=
          `
      <div style="margin-top: 10px; border-left: 2px solid #94a3b8; padding-left: 12px;">
        <strong>` +
          (step.line || step.type) +
          `</strong> (` +
          step.station +
          ` ` +
          (step.platform ? "- " + step.platform : "") +
          `)<br>
        <span style="font-size:13px; color:#666;">` +
          (step.note || "") +
          ` | 票價: ` +
          (step.fare || "無") +
          `</span>
      </div>
      `;
      });
    }
    html += `</div>`;
  });

  html += `
    <div class="page-break"></div>
    
    <!-- 4. 景點 Attraction -->
    <h2 id="sec-attraction">4. 景點 (Attraction)</h2>
    <div class="grid-2">
`;

  attractionData.categories.forEach((cat) => {
    html += `<div class="card avoid-break">`;
    html +=
      `<h3 style="margin-top:0; color: var(--primary); border-bottom: 1px solid #eee; padding-bottom: 5px;">📍 ` +
      cat.location +
      ` (` +
      cat.day +
      `)</h3>`;
    cat.sections.forEach((sec) => {
      html +=
        `<h4 style="color: #666;">📸 ` +
        sec.title +
        `</h4><ul style="padding-left:15px;">`;
      sec.items.forEach((item) => {
        html +=
          `<li style="margin-bottom:8px;"><strong>` +
          item.name +
          `</strong> <span style="color:#888; font-size:12px;">(` +
          item.type +
          `)</span>
        <div style="font-size:13px; color:#555;">` +
          item.desc +
          `</div>
        ` +
          (item.fee
            ? `<div style="font-size:12px; color:#e11d48;">` +
              item.fee +
              `</div>`
            : "") +
          `
      </li>`;
      });
      html += `</ul>`;
    });
    html += `</div>`;
  });

  html += `
    </div>

    <div class="page-break"></div>
    
    <!-- 5. 美食 Food -->
    <h2 id="sec-food">5. 美食 (Food)</h2>
    <div class="grid-2">
`;

  foodData.categories.forEach((cat) => {
    html += `<div class="card avoid-break">`;
    html +=
      `<h3 style="margin-top:0; color: var(--primary); border-bottom: 1px solid #eee; padding-bottom: 5px;">📍 ` +
      cat.location +
      ` (` +
      cat.day +
      `)</h3>`;
    cat.sections.forEach((sec) => {
      html +=
        `<h4 style="color: #666;">🍽️ ` +
        sec.title +
        `</h4><ul style="padding-left:15px;">`;
      sec.items.forEach((item) => {
        html +=
          `<li style="margin-bottom:8px;"><strong>` +
          item.name +
          `</strong> <span style="color:#888; font-size:12px;">(` +
          item.type +
          `)</span>
        ` +
          (item.recommended
            ? '<span style="color:#e11d48; font-weight:bold; font-size:12px; margin-left:4px;">★推薦</span>'
            : "") +
          `
        <div style="font-size:13px; color:#555;">` +
          item.desc +
          `</div>
      </li>`;
      });
      html += `</ul>`;
    });
    html += `</div>`;
  });

  html += `
    </div>

    <div class="page-break"></div>

    <!-- 6. 購物 Shopping -->
    <h2 id="sec-shopping">6. 購物 (Shopping)</h2>
`;

  shoppingData.wishlist.forEach((item) => {
    let imgBase64 = "";
    if (item.image && item.image.startsWith("http")) {
      imgBase64 = item.image;
    } else if (item.image) {
      let imgPath = path.join(
        process.cwd(),
        "public",
        item.image.replace("/me/", "/"),
      );
      try {
        let ext = path.extname(imgPath).replace(".", "");
        if (ext === "jpg") ext = "jpeg";
        let data = fs.readFileSync(imgPath).toString("base64");
        imgBase64 = "data:image/" + ext + ";base64," + data;
      } catch (e) {
        console.log("Missing image:", imgPath);
      }
    }

    html +=
      `
  <div class="shop-item avoid-break">
    ` +
      (imgBase64
        ? `<img src="` + imgBase64 + `">`
        : '<div style="width:120px;height:120px;background:#eee;margin-right:20px;display:flex;align-items:center;justify-content:center;color:#999;">無</div>') +
      `
    <div class="shop-item-info">
      <h4>` +
      item.name +
      `</h4>
      <div class="jp">` +
      item.nameJp +
      `</div>
      <div class="desc">` +
      (item.desc || "") +
      `</div>
      <div class="price">¥` +
      item.price +
      ` <span style="font-size:13px; color:#0284c7; font-weight:bold; margin-left:10px;">📍 ` +
      (item.shop || "") +
      `</span></div>
    </div>
  </div>
  `;
  });

  html += `
    <div class="page-break"></div>

    <!-- 7. 住宿 Accommodation -->
    <h2 id="sec-accommodation">7. 住宿 (Accommodation)</h2>
    <div class="card">
`;

  accommodationData.forEach((acc) => {
    html +=
      `<h4 style="color: var(--primary); border-bottom: 1px dashed #ccc; padding-bottom: 5px;">📍 ` +
      acc.location +
      ` (` +
      acc.period +
      `)</h4>`;
    acc.hotels.forEach((hotel) => {
      let badge = hotel.status === "已訂妥" ? "badge-status" : "badge-pending";
      html +=
        `
    <div class="hotel-row avoid-break">
      <div>
        <strong>` +
        hotel.name +
        `</strong> <span class="` +
        badge +
        `">` +
        hotel.status +
        `</span>
        <div style="font-size: 13px; color: #666; margin-top: 4px;">` +
        hotel.desc +
        `</div>
      </div>
      <div style="text-align: right; color: #e11d48; font-weight: bold;">
        ` +
        (hotel.priceTwd ? "NT$ " + hotel.priceTwd : "價格未定") +
        `
      </div>
    </div>
    `;
    });
  });

  html += `
    </div>

    <div class="page-break"></div>

    <!-- 8. 預算 Budget -->
    <h2 id="sec-budget">8. 預算 (Budget)</h2>
    <div class="card">
`;

  let totalBudget = 0;
  budgetData.forEach((b) => {
    totalBudget += b.cost;
    html +=
      `
  <div class="budget-row avoid-break" style="margin-bottom: 10px;">
    <div>
      <div style="font-size: 16px; font-weight: bold;">` +
      b.item +
      `</div>
      <div style="font-size: 13px; color: #666;">` +
      b.note +
      `</div>
    </div>
    <div class="budget-amount">¥ ` +
      b.cost.toLocaleString() +
      `</div>
  </div>
  `;
  });

  html +=
    `
      <div style="text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 10px; border-top: 2px solid #333;">
        總預算預估：<span style="color: #e11d48;">¥ ` +
    totalBudget.toLocaleString() +
    `</span>
      </div>
    </div>

  </div>
</body>
</html>
`;

  const outHtmlPath = path.resolve(
    process.cwd(),
    `trips/${tripId}/master_guide.html`,
  );
  fs.writeFileSync(outHtmlPath, html);
  console.log(`Master guide HTML generated successfully at ${outHtmlPath}`);
}

generateHTML().catch(console.error);
