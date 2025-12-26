/**
 * 2026 伊勢志摩‧大阪 10日素食慢旅
 * Vite + React 版本
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Wallet, Train, Utensils, Hotel,
    ArrowRight, Leaf, Star, Info, ChevronDown, ChevronUp,
    ExternalLink, Sparkles, Clock, AlertCircle, X,
    MessageCircle, Languages, Bot, Bus, Check
} from 'lucide-react';

// 導入資料
import {
    strategyData, itineraryData, budgetData,
    recommendedRoutes, usefulLinks, kintetsuComparisonData, foodData
} from './data.js';

// 導入共用元件
import { SectionCard, MapModal, CollapsibleSection, ActivityItem } from '../../../components/trips';

// 導入輔助函式
import { cleanQuery, callGeminiAPI } from '../../../lib/trip-helpers.js';

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
                alt="Japan Scenery"
                className="w-full h-full object-cover opacity-90 scale-105"
                style={{ animation: 'float 20s ease-in-out infinite' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F2540]/90 via-[#0F2540]/60 to-[#F5F5F0]"></div>
            <div className="absolute inset-0 bg-[#0F2540]/40 mix-blend-overlay"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-block px-5 py-2 mb-6 rounded-full bg-[#0F2540]/30 backdrop-blur-md text-sm font-bold tracking-wider border border-[#E8968A]/40 text-[#E8968A]/90 animate-fade-up shadow-lg">
                JP-ISE-OSA-2026-VEG-10D
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-up text-yellow-50">
                伊勢志摩‧大阪
                <span className="block text-2xl md:text-3xl mt-4 font-bold tracking-widest font-serif opacity-90">
                    10日素食慢旅
                </span>
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
        { id: 'map', label: '交通', Icon: Train },
        { id: 'food', label: '美食', Icon: Utensils },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
                <div className="flex">
                    {tabs.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 min-w-[80px] py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === id
                                    ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                                    : 'text-gray-400 hover:text-indigo-600'
                                }`}
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
                <div className="text-3xl font-bold text-indigo-600 mb-1">10</div>
                <div className="text-sm text-gray-500">天 9 夜</div>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">5</div>
                <div className="text-sm text-gray-500">日周遊券</div>
            </div>
            <div className="bg-[#E8968A]/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">🌿</div>
                <div className="text-sm text-gray-600 font-medium">素食友善</div>
            </div>
            <div className="bg-[#E8968A]/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">♨️</div>
                <div className="text-sm text-gray-600 font-medium">溫泉療癒</div>
            </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {['VISON 連住', '賢島寶生苑', '空庭溫泉', 'USJ', 'KIX 進出'].map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#0F2540]/10 text-[#0F2540] rounded-full text-xs font-medium">
                    {tag}
                </span>
            ))}
        </div>
    </SectionCard>
);

// UsefulLinksSection
const UsefulLinksSection = () => {
    const iconMap = { Train, Hotel, Star, MapPin };

    return (
        <SectionCard icon={Sparkles} title="實用連結">
            <div className="grid md:grid-cols-3 gap-4">
                {usefulLinks.categories.map((category, idx) => {
                    const CategoryIcon = iconMap[category.icon] || MapPin;
                    return (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                                <CategoryIcon size={16} className="text-[#E8968A]" />
                                <span className="font-bold text-gray-700 text-sm">{category.label}</span>
                            </div>
                            <div className="p-2">
                                {category.items.map((item, iIdx) => (
                                    <a
                                        key={iIdx}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors text-sm truncate">
                                                {item.name}
                                            </span>
                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                                                {item.day}
                                            </span>
                                        </div>
                                        <ExternalLink size={14} className="text-gray-300 group-hover:text-[#E8968A] shrink-0 ml-2" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

// BudgetTable
const BudgetTable = () => {
    const RATE_TWD = 0.22;
    const totalJPY = budgetData.reduce((acc, curr) => acc + curr.cost, 0);
    const totalTWD = Math.round(totalJPY * RATE_TWD);

    return (
        <SectionCard
            icon={Wallet}
            title={<div className="flex flex-col md:flex-row md:items-end gap-1"><span>預算概算</span><span className="text-sm font-normal text-gray-400 md:ml-2 mb-0.5">(2人同行，每人平均)</span></div>}
        >
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-indigo-50 text-indigo-600">
                            <th className="p-3 font-bold text-sm whitespace-nowrap">項目</th>
                            <th className="p-3 font-bold text-sm whitespace-nowrap">金額 (JPY)</th>
                            <th className="p-3 font-bold text-sm whitespace-nowrap">預估台幣 (約)</th>
                            <th className="p-3 font-bold text-sm whitespace-nowrap">說明</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {budgetData.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-[#E8968A]/5 transition-colors">
                                <td className="p-3 font-bold text-gray-700 text-sm whitespace-nowrap">{row.item}</td>
                                <td className="p-3 font-bold tabular-nums text-gray-900 text-sm whitespace-nowrap">¥{row.cost.toLocaleString()}</td>
                                <td className="p-3 font-bold tabular-nums text-gray-500 text-sm whitespace-nowrap">${Math.round(row.cost * RATE_TWD).toLocaleString()}</td>
                                <td className="p-3 text-sm text-gray-500 min-w-[200px]">{row.note}</td>
                            </tr>
                        ))}
                        <tr className="bg-indigo-50 text-gray-800 font-bold border-t-2 border-indigo-200">
                            <td className="p-3 rounded-bl-lg text-sm whitespace-nowrap">總計</td>
                            <td className="p-3 font-bold tabular-nums text-xl text-indigo-600 font-black whitespace-nowrap">¥{totalJPY.toLocaleString()}</td>
                            <td className="p-3 font-bold tabular-nums text-xl text-gray-500 font-black whitespace-nowrap">${totalTWD.toLocaleString()}</td>
                            <td className="p-3 rounded-br-lg text-gray-500 font-normal text-sm">預算重點：吃得好、住得好、移動舒適 (匯率: {RATE_TWD})</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3">
                {budgetData.map((row, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <div className="font-bold text-gray-800 text-sm">{row.item}</div>
                            <div className="text-right">
                                <div className="font-bold tabular-nums text-indigo-600 text-sm">¥{row.cost.toLocaleString()}</div>
                                <div className="text-xs text-gray-400 tabular-nums">約 ${Math.round(row.cost * RATE_TWD).toLocaleString()}</div>
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
                            <div className="text-sm text-gray-500 tabular-nums font-bold">約 ${totalTWD.toLocaleString()}</div>
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

// DayCard 元件
const DayCard = ({ dayData, onOpenRoute, onOpenFoodGuide, isExpanded: controlledExpanded, onToggle }) => {
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
                style={{ backgroundImage: `url(${dayData.image})` }}
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
                                    {act.tips && (
                                        <div className="mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg inline-block">
                                            <span className="font-bold mr-1">⚠️</span> {act.tips}
                                        </div>
                                    )}
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {act.map && (
                                            <button
                                                onClick={() => onOpenRoute(act.map)}
                                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                                            >
                                                📍 地圖
                                            </button>
                                        )}
                                        {act.foodGuideLink && (
                                            <button
                                                onClick={() => onOpenFoodGuide()}
                                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-[#E8968A]/20 hover:text-[#E8968A] transition-colors"
                                            >
                                                🍽️ 美食指南
                                            </button>
                                        )}
                                    </div>
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

// ========== 主應用程式 ==========

export default function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [allExpanded, setAllExpanded] = useState(null);
    const [mapModalData, setMapModalData] = useState({ isOpen: false, data: null });

    const handleOpenMap = (mapData) => {
        if (mapData.type === 'route') {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(mapData.origin)}&destination=${encodeURIComponent(mapData.destination)}&travelmode=transit`;
            window.open(url, '_blank');
        } else if (mapData.query) {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapData.query)}`;
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
                        <UsefulLinksSection />
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
                                            onOpenFoodGuide={() => setActiveTab('food')}
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
                                建議提前 3-6 個月開始預訂住宿以確保早鳥優惠。Shimakaze
                                觀光特急需在乘車日前一個月上午 10:30 準時搶票。
                            </div>
                        </div>
                    </div>
                )}

                {/* 交通 Tab (簡化版) */}
                {activeTab === 'map' && (
                    <div className="max-w-3xl mx-auto">
                        <SectionCard icon={Train} title="每日交通路線">
                            <div className="space-y-3">
                                {recommendedRoutes.map((route, idx) => (
                                    <div key={idx} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{route.day}</span>
                                            <span className="text-xs text-gray-400">{route.duration}</span>
                                        </div>
                                        <div className="font-bold text-gray-800 mb-1">{route.name}</div>
                                        <div className="text-sm text-gray-500">{route.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </div>
                )}

                {/* 美食 Tab (簡化版) */}
                {activeTab === 'food' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {foodData.categories.filter(cat => cat.sections[0].items.length > 0).map((category, cIdx) => (
                            <SectionCard key={cIdx} icon={Utensils} title={`${category.location} (${category.day})`}>
                                {category.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="mb-4 last:mb-0">
                                        <h4 className="font-bold text-gray-700 mb-3">{section.title}</h4>
                                        <div className="space-y-2">
                                            {section.items.map((item, iIdx) => (
                                                <div key={iIdx} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="font-bold text-gray-800 flex items-center gap-2">
                                                                {item.name}
                                                                {item.recommended && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">{item.type} • {item.desc}</div>
                                                            {item.note && <div className="text-xs text-orange-600 mt-1">{item.note}</div>}
                                                        </div>
                                                        {item.mapUrl && (
                                                            <a
                                                                href={item.mapUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                            >
                                                                <MapPin size={16} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </SectionCard>
                        ))}
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
                <p>© 2026 伊勢志摩‧大阪素食豪華慢旅 v6 (Vite 版)</p>
            </footer>

            {/* Map Modal */}
            <MapModal
                isOpen={mapModalData.isOpen}
                onClose={() => setMapModalData({ ...mapModalData, isOpen: false })}
                data={mapModalData.data}
            />
        </div>
    );
}
