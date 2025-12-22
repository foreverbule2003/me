const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// 新旅程的 HTML 模板 (使用共用元件)
function generateTripHTML(year, location, title) {
  return `<!doctype html>
<html lang="zh-TW">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <!-- 1. Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Inter:wght@400;500;700;800;900&display=swap"
    rel="stylesheet" />
  <!-- 2. Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: "#4F46E5",
            headerPrimary: "#0F2540",
            accent: "#E8968A",
            dark: "#1C1C1E",
            subtle: "#6E6E73",
            surface: "#F5F5F0",
            star: "#E8968A",
            love: "#C32F2F",
          },
          borderRadius: {
            "3xl": "24px",
            "4xl": "32px",
          },
          fontFamily: {
            display: ['"Noto Serif JP"', "serif"],
            body: ['"Inter"', "sans-serif"],
          },
        },
      },
    };
  <\/script>
  <!-- 3. React & ReactDOM -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <!-- 4. Babel -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <!-- 5. 共用樣式 -->
  <link rel="stylesheet" href="../shared/styles.css" />
  <!-- 6. 共用元件庫 -->
  <script src="../shared/config.js"><\/script>
  <script type="text/babel" src="../shared/icons.js"><\/script>
  <script type="text/babel" src="../shared/components.js"><\/script>
</head>

<body class="bg-surface font-body text-dark selection:bg-accent/20 selection:text-primary">
  <div id="root"></div>

  <script type="text/babel">
    // --- 0. 初始化 ---
    const { useState, useEffect, useRef } = React;

    // 引入共用圖示
    const Icons = window.TripShared.Icons;
    const {
      MapIcon,
      Calendar,
      Wallet,
      Train,
      Utensils,
      Hotel,
      ArrowRight,
      Leaf,
      Star,
      Info,
      Sparkles,
      X,
      MapPin,
      Navigation,
      ExternalLink,
      ChevronDown,
      ChevronUp,
    } = Icons;

    // 引入共用元件
    const SharedComponents = window.TripShared.components;
    const {
      SectionCard,
      CollapsibleSection,
      MapModal,
      FAB,
      PhaseHeader,
    } = SharedComponents;

    // --- 1. 資料常數 (請修改這裡) ---
    const TRIP_CONFIG = {
      year: "${year}",
      location: "${location}",
      title: "${title}",
      code: "JP-${location.toUpperCase()}-${year}",
      headerImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop", // 請替換
    };

    const itineraryData = [
      {
        phase: "第一階段 (Day 1-3)",
        days: [
          {
            day: 1,
            date: "TBD",
            title: "抵達",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500",
            activities: [
              { time: "12:00", text: "抵達機場" },
              { time: "14:00", text: "前往飯店" },
            ],
            highlight: "🎉 旅程開始！",
          },
        ],
      },
    ];

    const budgetData = [
      { item: "機票", cost: 0, note: "TBD" },
      { item: "住宿", cost: 0, note: "TBD" },
      { item: "交通", cost: 0, note: "TBD" },
      { item: "餐飲", cost: 0, note: "TBD" },
    ];

    // --- 2. Header ---
    const Header = () => (
      <header className="relative w-full py-32 px-6 text-white overflow-hidden">
        <a
          href="../../index.html?booted=true#booted"
          className="absolute top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg group"
          title="回到首頁"
        >
          <ArrowRight className="transform rotate-180 group-hover:scale-110 transition-transform" size={20} />
        </a>

        <img
          src={TRIP_CONFIG.headerImage}
          alt={TRIP_CONFIG.title}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-headerPrimary/90 via-headerPrimary/60 to-surface/100" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Leaf size={16} className="text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">{TRIP_CONFIG.code}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 animate-fade-up text-yellow-50">
            {TRIP_CONFIG.title}
          </h1>
        </div>
      </header>
    );

    // --- 3. DayCard (簡化版) ---
    const DayCard = ({ dayData }) => {
      const [isExpanded, setIsExpanded] = useState(true);

      return (
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full relative overflow-hidden cursor-pointer text-left h-28"
          >
            <img
              src={dayData.image}
              alt={dayData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            <div className="absolute left-4 top-4">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-white font-bold text-sm border border-white/20">
                D{dayData.day} · {dayData.date}
              </span>
            </div>
            <div className="absolute right-4 top-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
              <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <div className="absolute left-6 bottom-4 text-white">
              <h3 className="font-bold text-xl">{dayData.title}</h3>
            </div>
          </button>

          {isExpanded && (
            <div className="p-6 space-y-4">
              {dayData.activities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="text-xs font-bold text-primary/70 min-w-[3rem] font-mono">{act.time}</span>
                  <div className="text-gray-800 font-bold text-sm">{act.text}</div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-accent/10 rounded-xl">
                <div className="text-xs font-bold text-gray-400 uppercase">HIGHLIGHT</div>
                <div className="text-sm text-gray-700">{dayData.highlight}</div>
              </div>
            </div>
          )}
        </div>
      );
    };

    // --- 4. App ---
    const App = () => {
      const [activeTab, setActiveTab] = useState("itinerary");

      const tabs = [
        { id: "itinerary", label: "每日詳情", icon: Calendar },
        { id: "budget", label: "預算規劃", icon: Wallet },
      ];

      return (
        <div className="min-h-screen bg-gray-50 font-sans pb-24">
          <Header />

          {/* Tab Navigation */}
          <div className="sticky top-0 z-40 glass shadow-sm border-b border-gray-100/50">
            <div className="max-w-5xl mx-auto px-4">
              <nav className="flex items-center justify-around py-3">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={\`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all \${
                        activeTab === tab.id
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100"
                      }\`}
                    >
                      <TabIcon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <main className="max-w-5xl mx-auto px-6 py-8">
            {activeTab === "itinerary" && (
              <div className="space-y-6">
                {itineraryData.map((phase, idx) => (
                  <div key={idx}>
                    <h2 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent rounded-full" />
                      {phase.phase}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {phase.days.map((day, dIdx) => (
                        <DayCard key={dIdx} dayData={day} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "budget" && (
              <SectionCard icon={Wallet} title="預算概算">
                <div className="space-y-3">
                  {budgetData.map((row, idx) => (
                    <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-bold text-gray-700">{row.item}</span>
                      <span className="text-primary font-bold">¥{row.cost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </main>

          <footer className="text-center py-8 text-gray-400 text-sm">
            <p>© ${year} ${title}</p>
          </footer>
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  <\/script>
</body>

</html>`;
}

async function main() {
  console.log('--- 🚀 快速建立新旅程 (v2.0 - 使用共用元件) ---\n');

  const year = await askQuestion('📅 請輸入年份 (例如 2027): ');
  const location = await askQuestion('📍 請輸入地點代碼 (例如 sapporo): ');
  const title = await askQuestion('✨ 請輸入旅程標題 (例如 北海道美食之旅): ');

  if (!year || !location) {
    console.error('\n❌ 年份與地點為必填項目！');
    process.exit(1);
  }

  const tripTitle = title || `${year} ${location}`;
  const folderName = `${year}-${location}`;
  const targetDir = path.join(__dirname, '..', 'trips', folderName);

  if (fs.existsSync(targetDir)) {
    console.error(`\n❌ 錯誤：目錄 ${folderName} 已經存在！`);
    process.exit(1);
  }

  // 1. 建立目錄
  console.log(`\n📁 正在建立目錄: trips/${folderName}...`);
  fs.mkdirSync(path.join(targetDir, 'images'), { recursive: true });

  // 2. 建立 spec.md
  const specContent = `# 🗾 ${tripTitle}

## 📋 行程總覽

| 項目       | 內容                                       |
| ---------- | ------------------------------------------ |
| 行程代碼   | JP-${location.toUpperCase()}-${year}       |
| 適用對象   | 2人                                        |
| 進出點     | TBD                                        |
| 總預算概算 | TBD                                        |
| 核心策略   | TBD                                        |

---

## 📅 行程草案

### Day 1: 抵達
> 今日重點：

| 時間  | 活動 |
| ----- | ---- |
| 12:00 | 抵達 |

---

## ✅ 待辦清單
- [ ] 訂機票
- [ ] 訂住宿
- [ ] 規劃行程細節
`;

  fs.writeFileSync(path.join(targetDir, 'spec.md'), specContent);
  console.log('✅ spec.md 建立完成');

  // 3. 建立 index.html (使用新模板)
  const htmlContent = generateTripHTML(year, location, tripTitle);
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
  console.log('✅ index.html 建立完成 (使用共用元件模板)');

  console.log(`
🎉 旅程 ${folderName} 建立成功！

📂 檔案結構：
   trips/${folderName}/
   ├── index.html  (主頁面，使用共用元件)
   ├── spec.md     (行程規劃文件)
   └── images/     (圖片資料夾)

📝 下一步：
   1. 編輯 trips/${folderName}/spec.md 規劃行程
   2. 修改 trips/${folderName}/index.html 中的資料常數
   3. 執行 npm run dev 預覽頁面
`);
  
  rl.close();
}

main();
