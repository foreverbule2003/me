const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// ============================================================
// 模板：HTML 入口點 (Vite 版)
// ============================================================
function generateHTML(year, location, title, locationCode) {
  return `<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | TimZ</title>
    <meta name="description" content="${year} ${title}">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="../../src/pages/trips/${locationCode}/main.jsx"></script>
  </body>
</html>
`;
}

// ============================================================
// 模板：main.jsx (Vite 入口)
// ============================================================
function generateMainJsx(locationCode) {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../../../index.css';  // Tailwind CSS
import './${locationCode}.css';  // 頁面專用樣式

// 使用共用 Firebase 設定
import { db } from '../../../lib/firebase.js';

// 導出 db 供未來功能使用 (如收藏同步)
export { db };

// 渲染應用
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
`;
}

// ============================================================
// 模板：App.jsx (主應用程式)
// ============================================================
function generateAppJsx(year, location, title, tripCode) {
  return `/**
 * ${year} ${title}
 * Vite + React 版本
 */
import React, { useState, useEffect } from 'react';
import {
    MapPin, Calendar, Wallet, Train, Utensils, Hotel,
    ArrowRight, Leaf, Star, Info, ChevronDown, ChevronUp,
    ExternalLink, Sparkles
} from 'lucide-react';

// 導入資料
import { strategyData, itineraryData, budgetData, usefulLinks } from './data.js';

// 導入共用元件
import { SectionCard, MapModal } from '../../../components/trips';

// ========== 本地元件 ==========

// Header 元件
const Header = () => (
    <header className="relative w-full py-12 px-6 text-white overflow-hidden">
        <a
            href="../../index.html?booted=true#booted"
            className="absolute top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg group"
            title="回到首頁"
        >
            <ArrowRight
                size={24}
                className="rotate-180 group-hover:-translate-x-1 transition-transform"
            />
        </a>
        <div className="absolute inset-0 z-0 select-none">
            <img
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop"
                alt="${title}"
                className="w-full h-full object-cover opacity-90 scale-105"
                style={{ animation: 'float 20s ease-in-out infinite' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F2540]/90 via-[#0F2540]/60 to-[#F5F5F0]"></div>
            <div className="absolute inset-0 bg-[#0F2540]/40 mix-blend-overlay"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-block px-5 py-2 mb-6 rounded-full bg-[#0F2540]/30 backdrop-blur-md text-sm font-bold tracking-wider border border-[#E8968A]/40 text-[#E8968A]/90 animate-fade-up shadow-lg">
                ${tripCode}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-up text-yellow-50">
                ${title}
            </h1>
        </div>
    </header>
);

// ToggleFAB 元件
const ToggleFAB = ({ isExpanded, onToggle }) => (
    <button
        onClick={() => onToggle(isExpanded === true ? false : true)}
        className="p-3 rounded-full bg-white/70 backdrop-blur-md text-indigo-600 shadow-xl border border-white/50 hover:bg-white hover:text-indigo-600 transition-all duration-300 group relative"
    >
        {isExpanded === true ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isExpanded === true ? "全部折疊" : "全部展開"}
        </span>
    </button>
);

// 導航標籤
const TabNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', label: '總覽', Icon: Star },
        { id: 'itinerary', label: '行程', Icon: Calendar },
        { id: 'budget', label: '預算', Icon: Wallet },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
                <div className="flex">
                    {tabs.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={\`flex-1 min-w-[80px] py-4 flex flex-col items-center gap-1 transition-colors \${activeTab === id
                                    ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                                    : 'text-gray-400 hover:text-indigo-600'
                                }\`}
                        >
                            <Icon size={20} />
                            <span className="text-xs">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

// StrategySection - 行程亮點
const StrategySection = () => (
    <SectionCard icon={Sparkles} title="行程亮點">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">TBD</div>
                <div className="text-sm text-gray-500">天</div>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">TBD</div>
                <div className="text-sm text-gray-500">夜</div>
            </div>
            <div className="bg-[#E8968A]/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">🌿</div>
                <div className="text-sm text-gray-600 font-medium">素食友善</div>
            </div>
            <div className="bg-[#E8968A]/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">✈️</div>
                <div className="text-sm text-gray-600 font-medium">自由行</div>
            </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {['TBD亮點1', 'TBD亮點2', 'TBD亮點3'].map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#0F2540]/10 text-[#0F2540] rounded-full text-xs font-medium">
                    {tag}
                </span>
            ))}
        </div>
    </SectionCard>
);

// DayCard 元件
const DayCard = ({ dayData, onOpenRoute, isExpanded: controlledExpanded, onToggle }) => {
    const [internalExpanded, setInternalExpanded] = useState(true);
    const isControlled = controlledExpanded !== null && controlledExpanded !== undefined;

    useEffect(() => {
        if (isControlled) {
            setInternalExpanded(controlledExpanded);
        }
    }, [controlledExpanded, isControlled]);

    const isExpanded = isControlled ? controlledExpanded : internalExpanded;

    const handleToggle = () => {
        if (isControlled) {
            onToggle?.();
        }
        setInternalExpanded(!internalExpanded);
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6 border border-gray-100/50">
            {/* Header */}
            <div
                onClick={handleToggle}
                className="cursor-pointer relative h-32 bg-cover bg-center"
                style={{ backgroundImage: \`url(\${dayData.image})\` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                    <div>
                        <div className="text-white/80 text-xs font-bold tracking-wider mb-1">
                            DAY {dayData.day} • {dayData.date}
                        </div>
                        <h3 className="text-white text-xl font-bold font-serif">{dayData.title}</h3>
                    </div>
                    <div className="text-white/70">
                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                </div>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="p-6">
                    <div className="space-y-4">
                        {dayData.activities.map((act, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-14 shrink-0 text-right">
                                    <span className="text-sm font-bold text-indigo-600">{act.time}</span>
                                </div>
                                <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                                    <div className="font-bold text-gray-800 mb-1">{act.text}</div>
                                    {act.subText && <div className="text-sm text-gray-500">{act.subText}</div>}
                                    {act.note && (
                                        <div className="mt-1 text-xs text-indigo-600/70 flex items-start gap-1">
                                            <Info size={12} className="mt-0.5 shrink-0" /> {act.note}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Highlight */}
                    <div className="mt-6 pt-6 border-t border-gray-50">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100">
                            <div className="p-2 bg-[#E8968A]/10 text-[#E8968A] rounded-lg shrink-0">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">HIGHLIGHT</div>
                                <div className="text-sm font-medium text-gray-700 leading-relaxed">{dayData.highlight}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// PhaseHeader 元件
const PhaseHeader = ({ phase }) => (
    <div className="mb-6 mt-10 first:mt-0">
        <h2 className="text-xl font-bold text-[#0F2540] font-serif flex items-center gap-2">
            <div className="w-1 h-6 bg-[#E8968A] rounded-full"></div>
            {phase}
        </h2>
    </div>
);

// BudgetTable 元件
const BudgetTable = () => {
    const RATE_TWD = 0.22;
    const totalJPY = budgetData.reduce((acc, curr) => acc + curr.cost, 0);
    const totalTWD = Math.round(totalJPY * RATE_TWD);

    return (
        <SectionCard icon={Wallet} title="預算概算">
            <div className="space-y-3">
                {budgetData.map((row, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <div className="font-bold text-gray-800 text-sm">{row.item}</div>
                            <div className="text-right">
                                <div className="font-bold tabular-nums text-indigo-600 text-sm">¥{row.cost.toLocaleString()}</div>
                                <div className="text-xs text-gray-400 tabular-nums">約 \${Math.round(row.cost * RATE_TWD).toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg leading-relaxed">{row.note}</div>
                    </div>
                ))}
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-800 text-sm">總計 (預估)</span>
                        <div className="text-right">
                            <div className="font-black tabular-nums text-xl text-indigo-600">¥{totalJPY.toLocaleString()}</div>
                            <div className="text-sm text-gray-500 tabular-nums font-bold">約 \${totalTWD.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center pt-2 border-t border-indigo-100">
                        預算重點：吃得好、住得好、移動舒適 (匯率: {RATE_TWD})
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};

// ========== 主應用程式 ==========

export default function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [allExpanded, setAllExpanded] = useState(null);

    const handleOpenMap = (mapData) => {
        if (mapData.type === 'route') {
            const url = \`https://www.google.com/maps/dir/?api=1&origin=\${encodeURIComponent(mapData.origin)}&destination=\${encodeURIComponent(mapData.destination)}&travelmode=transit\`;
            window.open(url, '_blank');
        } else if (mapData.query) {
            const url = \`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(mapData.query)}\`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-[#1C1C1E] selection:bg-[#E8968A]/20 selection:text-indigo-600">
            <Header />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* 總覽 Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <StrategySection />
                    </div>
                )}

                {/* 行程 Tab */}
                {activeTab === 'itinerary' && (
                    <div>
                        {itineraryData.map((phase, pIdx) => (
                            <div key={pIdx}>
                                <PhaseHeader phase={phase.phase} />
                                <div>
                                    {phase.days.map((day, dIdx) => (
                                        <DayCard
                                            key={dIdx}
                                            dayData={day}
                                            onOpenRoute={handleOpenMap}
                                            isExpanded={allExpanded}
                                            onToggle={() => setAllExpanded(null)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                回到頂部
                            </button>
                        </div>
                    </div>
                )}

                {/* 預算 Tab */}
                {activeTab === 'budget' && (
                    <div className="max-w-3xl mx-auto">
                        <BudgetTable />
                        <div className="mt-8 p-6 bg-indigo-50 rounded-3xl flex gap-4 items-start">
                            <Info className="text-indigo-600 flex-shrink-0 mt-1" />
                            <div className="text-sm text-indigo-600 leading-relaxed">
                                <p className="font-bold mb-1">關於預訂</p>
                                建議提前 3-6 個月開始預訂住宿以確保早鳥優惠。
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* FAB Group */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
                {activeTab === 'itinerary' && (
                    <ToggleFAB isExpanded={allExpanded} onToggle={setAllExpanded} />
                )}
            </div>

            <footer className="text-center py-8 text-gray-400 text-sm">
                <p>© ${year} ${title} (Vite 版)</p>
            </footer>
        </div>
    );
}
`;
}

// ============================================================
// 模板：data.js (資料檔案)
// ============================================================
function generateDataJs(year, location, title, tripCode) {
  return `/**
 * ${year} ${title} 行程資料
 * Vite ESM 版本
 */

// 行程策略概覽
export const strategyData = {
    title: "關鍵策略",
    content: "TBD - 請填寫行程策略",
    transport: [
        "TBD - 交通方式",
    ],
    accommodation: [
        "TBD - 住宿安排",
    ],
};

// 每日行程資料
export const itineraryData = [
    {
        phase: "第一階段 (Day 1-3)",
        days: [
            {
                day: 1,
                date: "TBD",
                title: "抵達",
                image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500",
                time: "TBD",
                activities: [
                    { time: "12:00", text: "抵達機場", map: { query: "Airport" } },
                    { time: "14:00", text: "前往飯店", subText: "交通方式 TBD" },
                    { time: "18:00", text: "晚餐", note: "餐廳 TBD" },
                ],
                highlight: "🎉 旅程開始！",
            },
            {
                day: 2,
                date: "TBD",
                title: "第二天",
                image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=500",
                time: "TBD",
                activities: [
                    { time: "09:00", text: "早餐" },
                    { time: "10:00", text: "景點 TBD" },
                    { time: "12:00", text: "午餐" },
                ],
                highlight: "TBD",
            },
        ],
    },
];

// 預算資料
export const budgetData = [
    { item: "機票", cost: 0, note: "TBD" },
    { item: "住宿", cost: 0, note: "TBD" },
    { item: "交通", cost: 0, note: "TBD" },
    { item: "餐飲", cost: 0, note: "TBD" },
    { item: "娛樂", cost: 0, note: "TBD" },
];

// 實用連結
export const usefulLinks = {
    categories: [
        {
            type: "ticket",
            label: "交通票券",
            icon: "Train",
            items: [
                { name: "TBD 機場", day: "Day 1", url: "#" },
            ],
        },
        {
            type: "hotel",
            label: "住宿",
            icon: "Hotel",
            items: [
                { name: "TBD 飯店", day: "Day 1-2", url: "#" },
            ],
        },
        {
            type: "attraction",
            label: "景點",
            icon: "Star",
            items: [
                { name: "TBD 景點", day: "Day 2", url: "#" },
            ],
        },
    ],
};
`;
}

// ============================================================
// 模板：CSS 樣式檔
// ============================================================
function generateCss(locationCode) {
  return `/**
 * ${locationCode} 專用樣式
 * Tailwind 擴展配置
 */

/* 頁面主題色 */
:root {
    --primary: #4F46E5;
    --headerPrimary: #0F2540;
    --accent: #E8968A;
    --dark: #1C1C1E;
    --subtle: #6E6E73;
    --surface: #F5F5F0;
}

/* 動畫 */
@keyframes float {
    0%, 100% {
        transform: scale(1.05);
    }
    50% {
        transform: scale(1.08);
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
}

.animate-fade-up {
    animation: slideUp 0.6s ease-out forwards;
}

.animate-fade-up-delay-1 {
    animation-delay: 0.1s;
    opacity: 0;
}

/* 隱藏滾動條 */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;
}

// ============================================================
// 模板：spec.md (行程規劃文件)
// ============================================================
function generateSpecMd(year, location, title, tripCode) {
  return `# 🗾 ${title}

## 📋 行程總覽

| 項目       | 內容                                       |
| ---------- | ------------------------------------------ |
| 行程代碼   | ${tripCode}                                |
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
| 14:00 | 前往飯店 |
| 18:00 | 晚餐 |

---

### Day 2: TBD
> 今日重點：

| 時間  | 活動 |
| ----- | ---- |
| 09:00 | 早餐 |
| 10:00 | 景點 |

---

## ✅ 待辦清單
- [ ] 訂機票
- [ ] 訂住宿
- [ ] 規劃行程細節
- [ ] 更新 data.js 資料
`;
}

// ============================================================
// 主程式
// ============================================================
async function main() {
  console.log('--- 🚀 快速建立新旅程 (v3.0 - Vite + React 版) ---\n');

  const year = await askQuestion('📅 請輸入年份 (例如 2027): ');
  const location = await askQuestion('📍 請輸入地點代碼 (例如 sapporo): ');
  const title = await askQuestion('✨ 請輸入旅程標題 (例如 北海道美食之旅): ');

  if (!year || !location) {
    console.error('\n❌ 年份與地點為必填項目！');
    process.exit(1);
  }

  const tripTitle = title || `${year} ${location}`;
  const folderName = `${year}-${location}`;
  const locationCode = location.toLowerCase();
  const tripCode = `JP-${location.toUpperCase()}-${year}`;

  // 路徑
  const tripsDir = path.join(__dirname, '..', 'trips', folderName);
  const srcPagesDir = path.join(__dirname, '..', 'src', 'pages', 'trips', locationCode);
  const viteConfigPath = path.join(__dirname, '..', 'vite.config.js');

  // 檢查是否已存在
  if (fs.existsSync(tripsDir) || fs.existsSync(srcPagesDir)) {
    console.error(`\n❌ 錯誤：目錄 ${folderName} 或 ${locationCode} 已經存在！`);
    process.exit(1);
  }

  console.log(`\n📁 正在建立 Vite + React 旅程結構...`);

  // 1. 建立 trips/{year}-{location}/ 目錄
  fs.mkdirSync(tripsDir, { recursive: true });

  // 2. 建立 src/pages/trips/{locationCode}/ 目錄
  fs.mkdirSync(srcPagesDir, { recursive: true });

  // 3. 產生 HTML 入口點
  fs.writeFileSync(path.join(tripsDir, 'index.html'), generateHTML(year, location, tripTitle, locationCode));
  console.log(`✅ trips/${folderName}/index.html`);

  // 4. 產生 spec.md
  fs.writeFileSync(path.join(tripsDir, 'spec.md'), generateSpecMd(year, location, tripTitle, tripCode));
  console.log(`✅ trips/${folderName}/spec.md`);

  // 5. 產生 main.jsx
  fs.writeFileSync(path.join(srcPagesDir, 'main.jsx'), generateMainJsx(locationCode));
  console.log(`✅ src/pages/trips/${locationCode}/main.jsx`);

  // 6. 產生 App.jsx
  fs.writeFileSync(path.join(srcPagesDir, 'App.jsx'), generateAppJsx(year, location, tripTitle, tripCode));
  console.log(`✅ src/pages/trips/${locationCode}/App.jsx`);

  // 7. 產生 data.js
  fs.writeFileSync(path.join(srcPagesDir, 'data.js'), generateDataJs(year, location, tripTitle, tripCode));
  console.log(`✅ src/pages/trips/${locationCode}/data.js`);

  // 8. 產生 CSS
  fs.writeFileSync(path.join(srcPagesDir, `${locationCode}.css`), generateCss(locationCode));
  console.log(`✅ src/pages/trips/${locationCode}/${locationCode}.css`);

  // 9. 更新 vite.config.js (提示用戶手動添加)
  console.log(`
⚠️  請手動更新 vite.config.js，在 build.rollupOptions.input 中加入：

    'trips-${locationCode}': resolve(__dirname, 'trips/${folderName}/index.html'),
`);

  console.log(`
🎉 旅程 ${folderName} 建立成功！

📂 檔案結構：
   trips/${folderName}/
   ├── index.html          (Vite 入口點)
   └── spec.md             (行程規劃文件)

   src/pages/trips/${locationCode}/
   ├── main.jsx            (React 入口)
   ├── App.jsx             (主應用程式)
   ├── data.js             (行程資料)
   └── ${locationCode}.css          (專用樣式)

📝 下一步：
   1. 編輯 trips/${folderName}/spec.md 規劃行程
   2. 修改 src/pages/trips/${locationCode}/data.js 中的資料
   3. 手動更新 vite.config.js 加入入口點
   4. 執行 npm run dev 預覽頁面
`);

  rl.close();
}

main();
