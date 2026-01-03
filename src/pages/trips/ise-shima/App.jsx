/**
 * 2026 伊勢志摩‧大阪 10日素食慢旅
 * Vite + React 版本
 */
import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Wallet, Train, Utensils, Hotel,
    ArrowRight, Leaf, Star, Info, ChevronDown, ChevronUp,
    ExternalLink, Sparkles, Clock, AlertCircle, X,
    MessageCircle, Languages, Bot, Bus, Check, ShoppingBag, Send
} from 'lucide-react';

// 導入資料
import {
    strategyData, itineraryData, budgetData,
    recommendedRoutes, usefulLinks, kintetsuComparisonData, foodData, shoppingData
} from './data.js';

// 導入共用元件
import { SectionCard, MapModal, CollapsibleSection, ActivityItem } from '../../../components/trips';

// 導入輔助函式
import { cleanQuery, callGeminiAPI } from '../../../lib/trip-helpers.js';

// 導入 Firebase
import { db, collection, doc, setDoc, deleteDoc, onSnapshot } from '../../../lib/firebase.js';

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
        { id: 'shopping', label: '購物', Icon: ShoppingBag },
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

// AIChatBubble 元件
const AIChatBubble = ({ sender, text }) => (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
        <div
            className={`max-w-[80%] rounded-3xl p-4 text-sm leading-relaxed ${sender === "user"
                ? "bg-indigo-600 text-white rounded-br-none"
                : "bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none"
                }`}
        >
            {text}
        </div>
    </div>
);

// AIModal 元件
const AIModal = ({ isOpen, onClose }) => {
    const [activeFeature, setActiveFeature] = useState("chat");
    const [chatHistory, setChatHistory] = useState([
        { sender: "ai", text: "嗨！我是您的素食旅遊 AI 助手。關於行程、素食餐廳或日本旅遊的問題都可以問我喔！✨" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory, activeFeature]);

    if (!isOpen) return null;

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;
        const userMsg = inputText;
        setChatHistory(prev => [...prev, { sender: "user", text: userMsg }]);
        setInputText("");
        setIsLoading(true);

        const response = await callGeminiAPI(userMsg);
        setChatHistory(prev => [...prev, { sender: "ai", text: response }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-gray-50 w-full max-w-lg h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="bg-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-2">
                        <Bot size={24} />
                        <h3 className="font-bold text-lg">AI 旅遊助手</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Tab Buttons */}
                <div className="flex p-2 bg-white border-b border-gray-100 gap-2 shrink-0">
                    <button
                        onClick={() => setActiveFeature("chat")}
                        className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${activeFeature === "chat" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        <MessageCircle size={16} /> 行程顧問
                    </button>
                    <button
                        onClick={() => setActiveFeature("translate")}
                        className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${activeFeature === "translate" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                        <Languages size={16} /> 素食溝通卡
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {activeFeature === "chat" && (
                        <div className="flex flex-col min-h-full justify-end">
                            <div className="flex-1 pb-4">
                                {chatHistory.map((msg, idx) => (
                                    <AIChatBubble key={idx} sender={msg.sender} text={msg.text} />
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white border border-gray-100 rounded-3xl p-4 text-gray-400 text-sm shadow-sm flex items-center gap-2">
                                            <Sparkles size={14} className="animate-spin text-indigo-600" /> AI 思考中...
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                    )}

                    {activeFeature === "translate" && (
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Leaf size={16} className="text-green-500" /> 素食溝通卡 (請直接出示給店員)
                                </h4>
                                <div className="space-y-4">
                                    {/* NG Section */}
                                    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                                        <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                                            <span className="text-red-500">🚫</span> 食事制限 (飲食禁忌)
                                        </p>
                                        <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                                            <p className="text-lg font-bold text-red-600 leading-relaxed">
                                                私は肉と魚介類が食べられません。<br />
                                                <span className="border-b-2 border-red-200">肉や魚の出汁（だし）もNGです。</span>
                                            </p>
                                            <p className="text-xs text-red-500/70 mt-2 font-medium">(我不吃肉、海鮮，以及含肉或魚的高湯)</p>
                                        </div>
                                        <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                                            <p className="text-lg font-bold text-green-700 leading-relaxed">
                                                でも、卵・乳製品・ネギ・ニンニクは食べられます。
                                            </p>
                                            <div className="mt-2 text-xs text-green-700/70 font-medium">
                                                (但我<span className="font-bold border-b border-green-400">可以吃</span>雞蛋、牛奶、蔥、蒜)
                                            </div>
                                        </div>
                                    </div>

                                    {/* 高湯確認 */}
                                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                        <p className="text-xs font-bold text-gray-500 mb-1">🐟 出汁の確認 (高湯確認)</p>
                                        <p className="text-xl font-bold text-gray-900 mb-2 leading-relaxed">
                                            この料理に、鰹節や魚の出汁は入っていますか？
                                        </p>
                                        <p className="text-xs text-blue-500/70 mt-1 font-medium">(請問這道菜含有柴魚或魚類高湯嗎？)</p>
                                    </div>

                                    {/* 可食清單 */}
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                        <p className="text-xs font-bold text-gray-500 mb-1">✅ 食べられるもの (可食清單)</p>
                                        <ul className="grid grid-cols-2 gap-2 mt-2">
                                            <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><span className="text-green-500">✔</span> 卵 (雞蛋)</li>
                                            <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><span className="text-green-500">✔</span> 乳製品 (牛奶/起司)</li>
                                            <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><span className="text-green-500">✔</span> 玉ねぎ (洋蔥)</li>
                                            <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><span className="text-green-500">✔</span> ニンニク (大蒜)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                {activeFeature === "chat" && (
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="輸入問題，例如：附近有推薦的點心嗎？"
                                className="flex-1 px-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== 主應用程式 ==========

export default function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [allExpanded, setAllExpanded] = useState(null);
    const [mapModalData, setMapModalData] = useState({ isOpen: false, data: null });
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    // 美食收藏功能
    const [favorites, setFavorites] = useState({});
    const [isSyncing, setIsSyncing] = useState(true);
    const TRIP_ID = "2026-ise-shima";

    // Firebase Firestore 即時同步
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "trips", TRIP_ID, "food_ratings"),
            (snapshot) => {
                const newFavorites = {};
                snapshot.forEach((docSnap) => {
                    newFavorites[docSnap.id] = true;
                });
                setFavorites(newFavorites);
                setIsSyncing(false);
            },
            (error) => {
                console.error("Firestore sync error:", error);
                setIsSyncing(false);
            }
        );
        return () => unsubscribe();
    }, []);

    // 切換收藏狀態
    const toggleFavorite = async (itemKey) => {
        const docRef = doc(db, "trips", TRIP_ID, "food_ratings", itemKey);
        try {
            if (favorites[itemKey]) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, {
                    timestamp: new Date().toISOString(),
                    userId: "anonymous"
                });
            }
        } catch (e) {
            console.error("Error updating rating:", e);
            alert("同步失敗，請檢查網路連線");
        }
    };

    // 產生唯一的 item key
    const getItemKey = (catIdx, secIdx, itemIdx) => `food-${catIdx}-${secIdx}-${itemIdx}`;

    // 排序：愛心項目排在前面
    const sortItems = (items, catIdx, secIdx) => {
        return [...items].sort((a, b) => {
            const aIdx = items.indexOf(a);
            const bIdx = items.indexOf(b);
            const aKey = getItemKey(catIdx, secIdx, aIdx);
            const bKey = getItemKey(catIdx, secIdx, bIdx);
            const aFav = favorites[aKey] ? 1 : 0;
            const bFav = favorites[bKey] ? 1 : 0;
            return bFav - aFav;
        });
    };

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

                {/* 交通 Tab */}
                {activeTab === 'map' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* 近鐵特急比較表 */}
                        <SectionCard icon={Train} title="近鐵特急 vs 普通/急行 比較表">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-indigo-50 text-indigo-600">
                                            <th className="p-3 font-bold text-sm">日期</th>
                                            <th className="p-3 font-bold text-sm">區間</th>
                                            <th className="p-3 font-bold text-sm">普通/急行</th>
                                            <th className="p-3 font-bold text-sm">特急</th>
                                            <th className="p-3 font-bold text-sm">特急券</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600">
                                        {kintetsuComparisonData.map((row, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="p-3 text-sm font-bold text-indigo-600">{row.day}</td>
                                                <td className="p-3 text-sm font-medium">{row.route}</td>
                                                <td className="p-3 text-sm text-gray-500">{row.regular}</td>
                                                <td className="p-3 text-sm font-bold text-green-600">{row.express}</td>
                                                <td className="p-3 text-sm font-bold text-[#E8968A]">{row.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-600">
                                <strong>特急券總費用</strong>：全程搭特急約 <strong>¥4,320/人</strong>
                            </div>
                        </SectionCard>

                        {/* 每日交通路線 */}
                        <SectionCard icon={MapPin} title="每日交通路線">
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

                {/* 美食 Tab */}
                {activeTab === 'food' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* 同步狀態提示 */}
                        {isSyncing && (
                            <div className="text-center text-gray-400 text-sm py-2">
                                ✨ 正在同步雲端收藏...
                            </div>
                        )}

                        {foodData.categories.filter(cat => cat.sections[0].items.length > 0).map((category, cIdx) => (
                            <SectionCard key={cIdx} icon={Utensils} title={`${category.location} (${category.day})`}>
                                {category.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="mb-4 last:mb-0">
                                        <h4 className="font-bold text-gray-700 mb-3">{section.title}</h4>
                                        <div className="space-y-2">
                                            {sortItems(section.items, cIdx, sIdx).map((item) => {
                                                const originalIdx = section.items.indexOf(item);
                                                const itemKey = getItemKey(cIdx, sIdx, originalIdx);
                                                const isFavorite = favorites[itemKey];

                                                return (
                                                    <div key={itemKey} className={`p-3 rounded-xl transition-colors ${isFavorite ? 'bg-pink-50 border border-pink-200' : 'bg-gray-50 hover:bg-gray-100'
                                                        }`}>
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                                                    {item.name}
                                                                    {item.recommended && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1">{item.type} • {item.desc}</div>
                                                                {item.note && <div className="text-xs text-orange-600 mt-1">{item.note}</div>}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                {/* 收藏按鈕 */}
                                                                <button
                                                                    onClick={() => toggleFavorite(itemKey)}
                                                                    className={`p-2 rounded-full transition-all ${isFavorite
                                                                        ? 'text-pink-500 bg-pink-100 hover:bg-pink-200'
                                                                        : 'text-gray-300 hover:text-pink-400 hover:bg-pink-50'
                                                                        }`}
                                                                    title={isFavorite ? '取消收藏' : '加入收藏'}
                                                                >
                                                                    <Star size={18} className={isFavorite ? 'fill-current' : ''} />
                                                                </button>
                                                                {/* 地圖連結 */}
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
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </SectionCard>
                        ))}
                    </div>
                )}

                {/* 購物 Tab */}
                {activeTab === 'shopping' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* 版本與更新日期 */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">💄 美妝購物攻略</h2>
                            <div className="text-sm text-gray-500">
                                {shoppingData.version} · 更新於 {shoppingData.updateDate}
                            </div>
                            <div className="flex justify-center gap-2 mt-3 flex-wrap">
                                {shoppingData.targetStores.map((store, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">
                                        📍 {store}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 三大護膚鐵律 */}
                        <SectionCard icon={Sparkles} title="三大護膚鐵律">
                            <div className="space-y-3">
                                {shoppingData.rules.map((rule, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl">{rule.icon}</span>
                                        <div>
                                            <div className="font-bold text-gray-800">{rule.title}</div>
                                            <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: rule.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-pink-600">$1</strong>') }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        {/* 購物清單分類 */}
                        {shoppingData.categories.map((category, cIdx) => (
                            <SectionCard key={cIdx} icon={ShoppingBag} title={`${category.icon} ${category.title}`}>
                                <p className="text-sm text-gray-500 mb-4 italic">{category.subtitle}</p>
                                <div className="space-y-3">
                                    {category.items.map((item, iIdx) => (
                                        <div
                                            key={iIdx}
                                            className={`p-4 rounded-xl border transition-colors ${item.mustBuy
                                                ? 'bg-pink-50 border-pink-200'
                                                : item.isBackup
                                                    ? 'bg-gray-50 border-gray-200 border-dashed'
                                                    : 'bg-white border-gray-100 hover:border-pink-200'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        {item.priority && (
                                                            <span className={`px-2 py-0.5 text-xs font-bold rounded ${item.priority === 'P1' ? 'bg-red-500 text-white' :
                                                                item.priority === 'P2' ? 'bg-orange-500 text-white' :
                                                                    'bg-gray-400 text-white'
                                                                }`}>
                                                                {item.priority}
                                                            </span>
                                                        )}
                                                        {item.step && (
                                                            <span className="px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-600 rounded">
                                                                {item.step}
                                                            </span>
                                                        )}
                                                        {item.option && (
                                                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${item.option === '必買' ? 'bg-pink-500 text-white' :
                                                                item.option === '首選' ? 'bg-green-100 text-green-600' :
                                                                    'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                {item.option}
                                                            </span>
                                                        )}
                                                        <span className="font-bold text-gray-800">{item.name}</span>
                                                    </div>
                                                    {item.desc && <div className="text-sm text-gray-500 mb-1">{item.desc}</div>}
                                                    <div className={`text-xs leading-relaxed ${item.warning ? 'text-orange-600' : 'text-gray-600'}`}>
                                                        {item.note}
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className="font-bold text-pink-600 tabular-nums">¥{item.price.toLocaleString()}</div>
                                                    <div className="text-xs text-gray-400 tabular-nums">≈${Math.round(item.price * 0.22).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        ))}

                        {/* 行李檢查表 */}
                        <SectionCard icon={Check} title="🎒 行李檢查表">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="font-bold text-green-700 mb-3 flex items-center gap-2">
                                        ✅ 帶去日本 (隨身)
                                    </div>
                                    <ul className="space-y-2">
                                        {shoppingData.checklist.bringToJapan.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-green-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                        ❌ 不帶去日本
                                    </div>
                                    <ul className="space-y-2">
                                        {shoppingData.checklist.dontBring.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-red-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                                        📦 回程托運
                                    </div>
                                    <ul className="space-y-2">
                                        {shoppingData.checklist.returnLuggage.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-blue-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </SectionCard>

                        {/* 祝福語 */}
                        <div className="text-center py-6 text-gray-500">
                            <p className="text-lg">祝 1/12 大阪之旅順利！✈️</p>
                            <p className="text-sm mt-1">這份清單包含了所有備案，進可攻退可守！</p>
                        </div>
                    </div>
                )}
            </main>

            {/* FAB Group */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
                {activeTab === 'itinerary' && (
                    <ToggleFAB isExpanded={allExpanded} onToggle={setAllExpanded} />
                )}
                {/* AI 助手 FAB */}
                <button
                    onClick={() => setIsAIModalOpen(true)}
                    className="p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-all duration-300 group relative"
                    title="AI 旅遊助手"
                >
                    <Bot size={24} />
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        AI 助手 / 素食溝通卡
                    </span>
                </button>
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

            {/* AI Modal */}
            <AIModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
            />
        </div>
    );
}
