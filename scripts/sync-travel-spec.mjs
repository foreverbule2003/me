import fs from "fs";
import path from "path";

const tripId = process.argv[2] || "2026-tokyo";
const dataPath = path.resolve(
  process.cwd(),
  `src/pages/trips/${tripId}/data.js`,
);
const specPath = path.resolve(process.cwd(), `trips/${tripId}/spec.md`);

async function generateSpec() {
  const modulePath = "file://" + dataPath;
  const {
    flightData,
    itineraryData,
    recommendedRoutes,
    attractionData,
    foodData,
    shoppingData,
    accommodationData,
    budgetData,
    todoData,
  } = await import(modulePath);

  let md = `# ${tripId.toUpperCase()} 行程規格書\n\n`;
  md += `> **狀態**：自動同步自 \`data.js\` 🟢\n> **最後更新**：${new Date().toISOString().split("T")[0]}\n\n---\n\n`;

  md += `## ✈️ 航班資訊\n\n`;
  md += `**去程：${flightData.outbound.date}**\n- 航班：${flightData.outbound.airline} ${flightData.outbound.flightNo}\n- 時間：${flightData.outbound.time.depart} ${flightData.outbound.airport.depart} ➔ ${flightData.outbound.time.arrive} ${flightData.outbound.airport.arrive}\n- 備註：${flightData.outbound.note}\n\n`;
  md += `**回程：${flightData.inbound.date}**\n- 航班：${flightData.inbound.airline} ${flightData.inbound.flightNo}\n- 時間：${flightData.inbound.time.depart} ${flightData.inbound.airport.depart} ➔ ${flightData.inbound.time.arrive} ${flightData.inbound.airport.arrive}\n- 備註：${flightData.inbound.note}\n\n---\n\n`;

  md += `## 🏨 住宿規劃\n\n`;
  md += `| 區域 | 期間 | 飯店名稱 | 狀態 | 預估價格 |\n|---|---|---|---|---|\n`;
  accommodationData.forEach((loc) => {
    loc.hotels.forEach((h) => {
      md += `| ${loc.location} | ${loc.period} | **${h.name}**<br><small>${h.desc}</small> | ${h.status} | ${h.priceTwd || "未定"} |\n`;
    });
  });
  md += `\n---\n\n`;

  md += `## 📅 每日詳細行程\n\n`;
  itineraryData.forEach((phase) => {
    phase.days.forEach((day) => {
      md += `### Day ${day.day} — ${day.date} ${day.title} [${phase.phase}]\n\n`;
      let acts =
        day.activities ||
        (day.options && day.options.length > 0
          ? day.options[0].activities
          : []);
      if (acts) {
        md += `| 時間 | 行程 | 備註 | 交通 |\n|---|---|---|---|\n`;
        acts.forEach((act) => {
          md += `| ${act.time} | ${act.text} ${act.isFood ? "🍽️" : ""} | ${act.subText || ""} | ${act.transport ? `${act.transport.line}(${act.transport.station})` : ""} |\n`;
        });
        md += `\n`;
      }
    });
  });
  md += `---\n\n`;

  md += `## 🚃 交通推薦路線\n\n`;
  recommendedRoutes.forEach((route) => {
    md += `### ${route.day} | ${route.name} (${route.origin} ➔ ${route.destination})\n`;
    let steps = route.steps || (route.options ? route.options[0].steps : []);
    steps.forEach((step) => {
      md += `- **${step.line || step.type}** (${step.station} ${step.platform ? "月台:" + step.platform : ""}) — ${step.note || ""} [${step.fare || ""}]\n`;
    });
    md += `\n`;
  });
  md += `---\n\n`;

  md += `## 📸 景點推薦\n\n`;
  attractionData.categories.forEach((cat) => {
    md += `### 📍 ${cat.location} (${cat.day})\n`;
    cat.sections.forEach((sec) => {
      md += `**${sec.title}**\n`;
      sec.items.forEach((item) => {
        md += `- **${item.name}** (${item.type}) ${item.fee ? "\`" + item.fee + "\`" : ""}: ${item.desc}\n`;
      });
      md += `\n`;
    });
  });
  md += `---\n\n`;

  md += `## 🍽️ 美食清單\n\n`;
  foodData.categories.forEach((cat) => {
    md += `### 📍 ${cat.location} (${cat.day})\n`;
    cat.sections.forEach((sec) => {
      md += `**${sec.title}**\n`;
      sec.items.forEach((item) => {
        md += `- **${item.name}** (${item.type}) ${item.recommended ? "⭐推薦" : ""}: ${item.desc}\n`;
      });
      md += `\n`;
    });
  });
  md += `---\n\n`;

  md += `## 🛍️ 購物清單\n\n`;
  shoppingData.wishlist.forEach((item) => {
    md += `- **${item.name}** (${item.nameJp}) — ¥${item.price} @ ${item.shop || "未定"}\n  > ${item.desc || ""}\n`;
  });
  md += `\n---\n\n`;

  md += `## 💰 預算估算\n\n`;
  let total = 0;
  md += `| 項目 | 備註 | 預估花費 (日圓) |\n|---|---|---|\n`;
  budgetData.forEach((b) => {
    md += `| **${b.item}** | ${b.note} | ¥ ${b.cost.toLocaleString()} |\n`;
    total += b.cost;
  });
  md += `| **總計** | | **¥ ${total.toLocaleString()}** |\n`;
  md += `\n---\n\n`;

  md += `## ✅ 待辦事項\n\n`;
  let todoGroups = {};
  todoData.forEach((t) => {
    if (!todoGroups[t.group]) todoGroups[t.group] = [];
    todoGroups[t.group].push(t);
  });
  for (let g in todoGroups) {
    md += `### ${g}\n`;
    todoGroups[g].forEach((t) => {
      md += `- [ ] [${t.category}] ${t.item}\n`;
    });
    md += `\n`;
  }

  fs.writeFileSync(specPath, md);
  console.log(`Spec successfully generated at: ${specPath}`);
}

generateSpec().catch(console.error);
