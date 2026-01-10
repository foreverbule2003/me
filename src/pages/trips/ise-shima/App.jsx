/**
 * 2026 伊勢志摩‧大阪 11日素食慢旅
 * Vite + React 版本
 */
import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Wallet,
  Train,
  Utensils,
  Hotel,
  ArrowRight,
  Leaf,
  Star,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  X,
  MessageCircle,
  Languages,
  Bot,
  Bus,
  ShoppingBag,
  Send,
  CloudSun,
} from "lucide-react";

// 導入共用元件
import Timeline from "../shared/Timeline";
import FlightInfoSection from "../shared/FlightInfoSection";
import BudgetSection from "../shared/BudgetSection";
import ChecklistSection from "../shared/ChecklistSection";
import LinksGallery from "../shared/LinksGallery";
import WeatherForecastSection from "../shared/WeatherForecastSection";

// 航班資訊資料
const flightData = {
  outbound: {
    airline: "泰國獅航",
    flightNo: "SL396",
    time: { depart: "09:00", arrive: "12:30" },
    airport: { depart: "TPE 桃園", arrive: "KIX 關西" },
    duration: "3h30m",
    date: "01/11 (日)",
  },
  inbound: {
    airline: "國泰航空",
    flightNo: "CX565",
    time: { depart: "16:15", arrive: "18:30" },
    airport: { depart: "KIX 關西", arrive: "TPE 桃園" },
    duration: "2h15m",
    date: "01/21 (三)",
  },
};

import {
  strategyData,
  itineraryData,
  budgetData,
  recommendedRoutes,
  usefulLinks,
  kintetsuComparisonData,
  expressPricingData,
  foodData,
  shoppingData,
  todoData,
} from "./data.js";

// 導入圖片 (如果檔案不存在，請確認路徑或先放入圖片)
// 暫時註解避免報錯，請將圖片命名為 kissme_remover.jpg 並放入 src/assets/images/products/
// import kissMeImage from '../../../assets/images/products/kissme_remover.jpg';
// const kissMeImage = "https://www.isehan.co.jp/heroine/wp-content/uploads/sites/4/2018/12/speedymascararemover_660_660_2408.png";

// 為了讓使用者容易替換，我們先用一個變數。等您放入檔案後，我們可以改為 import 方式，或是您直接覆蓋這個網址。
// 但既然您要上傳檔案，我建議放在 public 資料夾可能更簡單，或者 src/assets。
// 這裡我們先設定資料結構。

// 導入共用元件
import {
  SectionCard,
  MapModal,
  CollapsibleSection,
  ActivityItem,
  ScrollToTop,
  ToggleFAB,
} from "../../../components/trips";

// 導入輔助函式
import { cleanQuery, callGeminiAPI } from "../../../lib/trip-helpers.js";

// 導入 Firebase
import {
  db,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "../../../lib/firebase.js";

// ========== 本地元件 ==========

// Header 元件
const Header = () => (
  <header className="relative w-full py-8 px-6 text-white overflow-hidden">
    <a
      href="/me/?booted=true"
      className="absolute top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg group"
      title="回到首頁"
    >
      <ArrowRight
        size={20}
        className="rotate-180 group-hover:-translate-x-1 transition-transform"
      />
    </a>
    <div className="absolute inset-0 z-0 select-none">
      <img
        src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop"
        alt="Japan Scenery"
        className="w-full h-full object-cover opacity-90 scale-105"
        style={{ animation: "float 20s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2540]/90 via-[#0F2540]/60 to-[#F5F5F0]"></div>
      <div className="absolute inset-0 bg-[#0F2540]/40 mix-blend-overlay"></div>
    </div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#0F2540]/30 backdrop-blur-md text-xs font-medium tracking-wider border border-[#E8968A]/40 text-[#E8968A]/90 animate-fade-up shadow-lg">
        JP-ISE-OSA-2026-VEG-11D
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight animate-fade-up text-yellow-50">
        伊勢志摩‧大阪
        <span className="block text-xl md:text-2xl mt-3 font-medium tracking-widest opacity-90">
          11日素食慢旅
        </span>
      </h1>
    </div>
  </header>
);

// ToggleFAB 元件

// 導航標籤
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "總覽", Icon: Star },
    { id: "itinerary", label: "行程", Icon: Calendar },
    { id: "map", label: "交通", Icon: Train },
    { id: "food", label: "美食", Icon: Utensils },
    { id: "shopping", label: "購物", Icon: ShoppingBag },
    { id: "budget", label: "預算", Icon: Wallet },
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
                ? "text-indigo-600 font-bold border-b-2 border-indigo-600"
                : "text-gray-400 hover:text-indigo-600"
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

// OverviewSection - 行程概覽 (時間軸)
const overviewData = [
  { day: 1, date: "1/11 (日)", title: "Rinku Outlet", hotel: "OMO 關西機場" },
  { day: 2, date: "1/12 (一)", title: "大阪 → VISON", hotel: "Hotel VISON" },
  { day: 3, date: "1/13 (二)", title: "VISON 深度體驗", hotel: "Hotel VISON" },
  { day: 4, date: "1/14 (三)", title: "伊勢神宮", hotel: "Comfort Hotel" },
  { day: 5, date: "1/15 (四)", title: "賢島溫泉", hotel: "賢島寶生苑" },
  { day: 6, date: "1/16 (五)", title: "英虞灣 → 大阪", hotel: "大阪市區" },
  { day: 7, date: "1/17 (六)", title: "梅田 + USJ", hotel: "大阪市區" },
  { day: 8, date: "1/18 (日)", title: "USJ + 空庭溫泉", hotel: "大阪市區" },
  { day: 9, date: "1/19 (一)", title: "自由活動", hotel: "大阪市區" },
  { day: 10, date: "1/20 (二)", title: "Rinku Outlet", hotel: "華盛頓飯店" },
  { day: 11, date: "1/21 (三)", title: "返程", hotel: "✈️ 回家" },
];

const OverviewSection = ({ forceOpen, onDayClick }) => {
  // 取得今天的日期 (格式: "1/11")
  const now = new Date();
  const todayStr = `${now.getMonth() + 1}/${now.getDate()}`;

  // 判斷是否為當日
  const isToday = (dateStr) => {
    const match = dateStr.match(/^(\d+\/\d+)/);
    return match && match[1] === todayStr;
  };

  return (
    <SectionCard
      icon={Calendar}
      title="行程概覽"
      collapsible={true}
      defaultOpen={false}
      forceOpen={forceOpen}
    >
      <div className="relative">
        {/* 時間軸線 - 置中於節點，底部縮短避免超出最後一天 */}
        <div className="absolute left-[13px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-indigo-400 via-pink-400 to-orange-400 rounded-full z-[1]" />

        <div className="space-y-1">
          {overviewData.map((item, idx) => {
            const today = isToday(item.date);
            return (
              <div
                key={idx}
                className="relative flex items-start gap-3 pl-1 py-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => onDayClick?.(item.day)}
              >
                {/* 背景層 (z-0 讓線條顯示在上面) */}
                {today && (
                  <div className="absolute inset-0 bg-indigo-50 rounded-lg z-0" />
                )}
                {/* 時間軸節點 */}
                <div
                  className={`relative w-5 h-5 rounded-full flex items-center justify-center z-10 shrink-0 ${today
                    ? "bg-indigo-500 border-2 border-indigo-500"
                    : "bg-white border-2 border-indigo-400"
                    }`}
                >
                  <span
                    className={`text-[10px] font-bold ${today ? "text-white" : "text-indigo-600"
                      }`}
                  >
                    {item.day}
                  </span>
                </div>
                {/* 內容 */}
                <div className="relative flex-1 pb-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {today && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded shrink-0">
                        TODAY
                      </span>
                    )}
                    <span
                      className={`text-xs font-medium ${today ? "text-indigo-600" : "text-gray-500"}`}
                    >
                      {item.date}
                    </span>
                    <span
                      className={`text-sm font-bold ${today ? "text-indigo-700" : "text-gray-800"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs ${today ? "text-indigo-500" : "text-gray-500"}`}
                  >
                    <Hotel size={12} />
                    <span>{item.hotel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
};

// DayCard 元件
const DayCard = ({
  dayData,
  onOpenRoute,
  onOpenFoodGuide,
  isExpanded: controlledExpanded,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const isControlled =
    controlledExpanded !== null && controlledExpanded !== undefined;

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
    <div
      id={`day-${dayData.day}`}
      className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6 border border-gray-100/50"
    >
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
            <h3 className="text-white text-xl font-bold">{dayData.title}</h3>
          </div>
          <div className="text-white/70">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {dayData.activities.map((act, idx) => (
              <div key={idx} className="flex gap-2 md:gap-4">
                <div className="w-11 md:w-14 shrink-0 text-right">
                  <span className="text-xs md:text-sm font-bold text-indigo-600">
                    {act.time}
                  </span>
                </div>
                <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 mb-1">
                        {act.text}
                      </div>
                      {act.subText && (
                        <div className="text-sm text-gray-500">
                          {act.subText}
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-1 shrink-0">
                      {act.map && (
                        <button
                          onClick={() => onOpenRoute(act.map)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
                          title="查看地圖"
                        >
                          <MapPin size={16} />
                        </button>
                      )}
                    </div>
                  </div>
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
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  HIGHLIGHT
                </div>
                <div className="text-sm font-medium text-gray-700 leading-relaxed">
                  {dayData.highlight}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 素食溝通卡元件
const VegetarianCard = ({ forceOpen }) => (
  <SectionCard
    icon={Leaf}
    title="素食溝通卡"
    collapsible={true}
    defaultOpen={false}
    forceOpen={forceOpen}
  >
    <div className="space-y-4 bg-gray-50/50 p-2 rounded-xl">
      {/* NG Section */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
        <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
          <span className="text-red-500">🚫</span> 食事制限 (飲食禁忌)
        </p>
        <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-lg font-bold text-red-600 leading-relaxed">
            私は肉と魚介類が食べられません。
            <br />
            <span className="border-b-2 border-red-200">
              肉や魚の出汁（だし）もNGです。
            </span>
          </p>
          <p className="text-xs text-red-500/70 mt-2 font-medium">
            (我不吃肉、海鮮，以及含肉或魚的高湯)
          </p>
        </div>
        <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-lg font-bold text-green-700 leading-relaxed">
            でも、卵・乳製品・ネギ・ニンニクは食べられます。
          </p>
          <div className="mt-2 text-xs text-green-700/70 font-medium">
            (但我
            <span className="font-bold border-b border-green-400">可以吃</span>
            雞蛋、牛奶、蔥、蒜)
          </div>
        </div>
      </div>

      {/* 高湯確認 */}
      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
        <p className="text-xs font-bold text-gray-500 mb-1">
          🐟 出汁の確認 (高湯確認)
        </p>
        <p className="text-xl font-bold text-gray-900 mb-2 leading-relaxed">
          この料理に、鰹節や魚の出汁は入っていますか？
        </p>
        <p className="text-xs text-blue-500/70 mt-1 font-medium">
          (請問這道菜含有柴魚或魚類高湯嗎？)
        </p>
      </div>

      {/* 可食清單 */}
      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs font-bold text-gray-500 mb-1">
          ✅ 食べられるもの (可食清單)
        </p>
        <ul className="grid grid-cols-2 gap-2 mt-2">
          <li className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="text-green-500">✔</span> 卵 (雞蛋)
          </li>
          <li className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="text-green-500">✔</span> 乳製品 (牛奶/起司)
          </li>
          <li className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="text-green-500">✔</span> 玉ねぎ (洋蔥)
          </li>
          <li className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="text-green-500">✔</span> ニンニク (大蒜)
          </li>
        </ul>
      </div>
    </div>
  </SectionCard>
);

// ========== 主應用程式 ==========

// ProductModal - 商品詳情彈窗
const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* 圖片區域 (預留位置) */}
        <div className="w-full aspect-square bg-gradient-to-br from-pink-50 to-indigo-50 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-center text-gray-300">
              <ShoppingBag size={64} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">尚無圖片</p>
            </div>
          )}
        </div>

        {/* 商品資訊 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {product.name}
          </h3>
          {product.nameJp && (
            <p className="text-sm text-pink-500 mb-3">🇯🇵 {product.nameJp}</p>
          )}
          {product.desc && (
            <p className="text-sm text-gray-500 mb-3">{product.desc}</p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-pink-600">
              ¥{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">
              ≈${Math.round(product.price * 0.22).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CollapsibleSubsection = ({
  title,
  count,
  children,
  defaultOpen = false,
  forceOpen = null,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (forceOpen !== null) {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left group"
      >
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-gray-700">{title}</h4>
          {count !== undefined && (
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <div
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen
          ? "grid-rows-[1fr] opacity-100 mt-2"
          : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// StickyPhaseHeader - 吸附式標題
// StickyPhaseHeader - 吸附式標題
const StickyPhaseHeader = ({
  title,
  children,
  defaultOpen = false,
  forceOpen = null,
  image,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef(null);

  useEffect(() => {
    if (forceOpen !== null) {
      // 當點擊全部展開/折疊時，總是保持標題展開，以便查看下方的每日卡片
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleToggle = () => {
    const wasCollapsed = !isOpen;
    setIsOpen(!isOpen);

    // 如果從收合狀態展開，滾動到頂部讓 Banner 吸附
    if (wasCollapsed && containerRef.current) {
      setTimeout(() => {
        const headerHeight = 72; // TabNavigation height
        const elementTop =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - headerHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div className="mb-6" ref={containerRef}>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden
                ${isOpen
            ? "sticky top-[72px] z-30 -mx-4 md:mx-0 md:rounded-xl shadow-sm"
            : "relative z-0 mx-0 rounded-3xl shadow-md my-4 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
          }`}
      >
        <button
          onClick={handleToggle}
          className={`w-full relative block transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "h-[56px]" : "h-24 md:h-36"}`}
        >
          {/* 背景層：毛玻璃 (Open) vs 圖片 (Closed) */}
          <div className="absolute inset-0">
            {/* Open Background */}
            <div
              className={`absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-100/50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
            ></div>

            {/* Closed Background */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}
            >
              {image && (
                <img
                  src={image}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt=""
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          </div>

          {/* 內容層：Open 狀態內容 */}
          <div
            className={`absolute inset-0 px-5 flex items-center justify-between transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 -translate-y-4 pointer-events-none"}`}
          >
            <h2 className="text-sm font-medium text-[#0F2540] flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8968A]/10 text-[#E8968A]">
                <MapPin size={12} />
              </span>
              {title}
            </h2>
            <div className="text-gray-400 rotate-180">
              <ChevronDown size={16} />
            </div>
          </div>

          {/* 內容層：Closed 狀態內容 */}
          <div
            className={`absolute inset-0 px-5 py-3 flex items-end justify-between transition-all duration-500 ${isOpen ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 delay-100"}`}
          >
            <h2 className="text-lg md:text-xl font-medium text-white mb-0.5 drop-shadow-md">
              {title}
            </h2>
            <div className="text-white/80 mb-1">
              <ChevronDown size={20} />
            </div>
          </div>
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 max-h-[5000px] mt-4" : "opacity-0 max-h-0 overflow-hidden mt-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  // Smart Expand/Collapse State
  const [expandedDays, setExpandedDays] = useState({}); // { "pIdx-dIdx": boolean }

  const [mapModalData, setMapModalData] = useState({
    isOpen: false,
    data: null,
  });
  const [productModalData, setProductModalData] = useState({
    isOpen: false,
    product: null,
  });

  // 美食收藏功能
  const [favorites, setFavorites] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const TRIP_ID = "2026-ise-shima";

  // 購物清單已購買狀態
  const [purchased, setPurchased] = useState({});

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
      },
    );
    return () => unsubscribe();
  }, []);

  // 購物清單 Firebase 即時同步
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "trips", TRIP_ID, "shopping_purchased"),
      (snapshot) => {
        const newPurchased = {};
        snapshot.forEach((docSnap) => {
          newPurchased[docSnap.id] = true;
        });
        setPurchased(newPurchased);
      },
      (error) => {
        console.error("Shopping sync error:", error);
      },
    );
    return () => unsubscribe();
  }, []);

  // 切換分頁時重置全域折疊狀態 (Optional, user preference if they want to keep state)
  // useEffect(() => {
  //     setExpandedDays({});
  // }, [activeTab]);

  // Check if ANY day is currently expanded
  const isAnyExpanded = Object.values(expandedDays).some(Boolean);

  // Toggle specific day
  const toggleDay = (key) => {
    setExpandedDays((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Smart Toggle Action for FAB
  const handleSmartToggle = () => {
    if (isAnyExpanded) {
      // If ANY are open, collapse ALL
      setExpandedDays({});
    } else {
      // If ALL are closed, expand ALL
      const newExpanded = {};
      itineraryData.forEach((phase, pIdx) => {
        phase.days.forEach((_, dIdx) => {
          newExpanded[`${pIdx}-${dIdx}`] = true;
        });
      });
      setExpandedDays(newExpanded);
    }
  };

  // 切換收藏狀態
  const toggleFavorite = async (itemKey) => {
    const docRef = doc(db, "trips", TRIP_ID, "food_ratings", itemKey);
    try {
      if (favorites[itemKey]) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          timestamp: new Date().toISOString(),
          userId: "anonymous",
        });
      }
    } catch (e) {
      console.error("Error updating rating:", e);
      alert("同步失敗，請檢查網路連線");
    }
  };

  // 產生唯一的 item key
  const getItemKey = (catIdx, secIdx, itemIdx) =>
    `food-${catIdx}-${secIdx}-${itemIdx}`;

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

  // 購物清單：產生唯一的 item key
  const getShoppingItemKey = (catIdx, itemIdx) =>
    `shopping-${catIdx}-${itemIdx}`;

  // 購物清單：切換已購買狀態
  const togglePurchased = async (itemKey) => {
    const docRef = doc(db, "trips", TRIP_ID, "shopping_purchased", itemKey);
    try {
      if (purchased[itemKey]) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          timestamp: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error("Error updating purchase status:", e);
    }
  };

  // 購物清單：排序（已購買移到底部）
  const sortShoppingItems = (items, catIdx) => {
    return [...items].sort((a, b) => {
      const aIdx = items.indexOf(a);
      const bIdx = items.indexOf(b);
      const aKey = getShoppingItemKey(catIdx, aIdx);
      const bKey = getShoppingItemKey(catIdx, bIdx);
      const aPurchased = purchased[aKey] ? 1 : 0;
      const bPurchased = purchased[bKey] ? 1 : 0;
      return aPurchased - bPurchased; // 已購買的排後面
    });
  };

  const handleOpenMap = (mapData) => {
    setMapModalData({ isOpen: true, data: mapData });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1C1C1E] selection:bg-[#E8968A]/20 selection:text-indigo-600">
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 pt-4 pb-12">
        {/* 總覽 Tab */}
        <div className={activeTab === "overview" ? "space-y-8" : "hidden"}>
          <FlightInfoSection
            outbound={flightData.outbound}
            inbound={flightData.inbound}
            forceOpen={isAnyExpanded}
          />

          {/* 全行程天氣預報 */}
          {/* 天氣預報 */}
          <WeatherForecastSection forceOpen={isAnyExpanded} />

          <Timeline
            data={overviewData}
            forceOpen={isAnyExpanded}
            onDayClick={(dayNum) => {
              // 找到對應的 dayKey 並展開
              let targetKey = null;
              itineraryData.forEach((phase, pIdx) => {
                phase.days.forEach((day, dIdx) => {
                  if (day.day === dayNum) {
                    targetKey = `${pIdx}-${dIdx}`;
                  }
                });
              });
              if (targetKey) {
                setExpandedDays((prev) => ({ ...prev, [targetKey]: true }));
              }
              setActiveTab("itinerary");
              setTimeout(() => {
                const el = document.getElementById(`day-${dayNum}`);
                if (el) {
                  const headerOffset = 140; // 懸浮標題高度 + 圓角間距
                  const elementPosition =
                    el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: "smooth",
                  });
                }
              }, 100);
            }}
          />
          <ChecklistSection
            title="待訂清單"
            items={todoData}
            storageKey="ise_shima_todos_v1"
            forceOpen={isAnyExpanded}
          />
          <LinksGallery
            links={usefulLinks?.categories || []}
            forceOpen={isAnyExpanded}
          />
        </div>

        {/* 行程 Tab */}
        <div className={activeTab === "itinerary" ? "" : "hidden"}>
          {itineraryData.map((phase, pIdx) => (
            <div key={pIdx}>
              <StickyPhaseHeader
                title={phase.phase}
                forceOpen={isAnyExpanded}
                image={pIdx === 0 ? phase.days[3].image : phase.days[1].image}
              >
                {phase.days.map((day, dIdx) => {
                  const dayKey = `${pIdx}-${dIdx}`;
                  return (
                    <DayCard
                      key={dIdx}
                      dayData={day}
                      onOpenRoute={handleOpenMap}
                      onOpenFoodGuide={() => setActiveTab("food")}
                      isExpanded={!!expandedDays[dayKey]}
                      onToggle={() => toggleDay(dayKey)}
                    />
                  );
                })}
              </StickyPhaseHeader>
            </div>
          ))}
        </div>

        {/* 預算 Tab */}
        <div
          className={activeTab === "budget" ? "max-w-3xl mx-auto" : "hidden"}
        >
          <BudgetSection
            data={budgetData}
            forceOpen={isAnyExpanded}
            notes={
              <div className="flex gap-4 items-start w-full">
                <Info className="text-indigo-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-indigo-600 leading-relaxed">
                  <p className="font-bold mb-1">關於預訂</p>
                  建議提前 3-6 個月開始預訂住宿以確保早鳥優惠。Shimakaze
                  觀光特急需在乘車日前一個月上午 10:30 準時搶票。
                </div>
              </div>
            }
          />
        </div>

        {/* 交通 Tab */}
        <div
          className={
            activeTab === "map" ? "max-w-3xl mx-auto space-y-6" : "hidden"
          }
        >
          {/* 近鐵特急比較表 */}
          <SectionCard
            icon={Train}
            title="近鐵比較表"
            collapsible={true}
            defaultOpen={false}
            forceOpen={isAnyExpanded}
          >
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
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm font-bold text-indigo-600">
                        {row.day}
                      </td>
                      <td className="p-3 text-sm font-medium">{row.route}</td>
                      <td className="p-3 text-sm text-gray-500">
                        {row.regular}
                      </td>
                      <td className="p-3 text-sm font-bold text-green-600">
                        {row.express}
                      </td>
                      <td className="p-3 text-sm font-bold text-[#E8968A]">
                        {row.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-600">
              <strong>特急券總費用</strong>：全程搭特急約{" "}
              <strong>¥4,320/人</strong>
            </div>
          </SectionCard>

          {/* 特急加購價格表 */}
          <SectionCard
            icon={Train}
            title="特急加購價格"
            collapsible={true}
            defaultOpen={false}
            forceOpen={isAnyExpanded}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-600">
                    <th className="p-3 font-bold text-sm">列車</th>
                    <th className="p-3 font-bold text-sm">座位</th>
                    <th className="p-3 font-bold text-sm">價格</th>
                    <th className="p-3 font-bold text-sm">備註</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {expressPricingData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm font-bold text-gray-800">
                        {row.train}
                      </td>
                      <td className="p-3 text-sm">{row.seat}</td>
                      <td className="p-3 text-sm font-bold text-[#E8968A]">
                        {row.price}
                      </td>
                      <td className="p-3 text-sm text-gray-500">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
              💡 持「近鐵5日券」已含基本運費，上表僅為額外加購費用
            </div>
            <div className="mt-3 text-center">
              <a
                href="https://www.ticket.kintetsu.co.jp/vs/en/T/TZZ/TZZ10.do?op=tDisplayVisitorMenu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <Train size={16} />
                近鐵特急線上訂票
                <ExternalLink size={14} />
              </a>
            </div>
          </SectionCard>

          {/* VISON 巴士時刻表 */}
          <SectionCard
            icon={Bus}
            title="VISON 巴士時刻表"
            collapsible={true}
            defaultOpen={false}
            forceOpen={isAnyExpanded}
          >
            <div className="space-y-4">
              {/* 松阪駅前 → VISON */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                    平日
                  </span>
                  <h4 className="font-bold text-gray-800 text-sm">
                    松阪駅前 → VISON
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          出發
                        </th>
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          抵達
                        </th>
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          車程
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["8:05", "8:55", "50分"],
                        ["9:30", "10:12", "42分"],
                        ["10:25", "11:07", "42分"],
                        ["12:45", "13:27", "42分", true],
                        ["13:20", "14:02", "42分", true],
                        ["14:45", "15:27", "42分"],
                        ["15:45", "16:27", "42分"],
                        ["17:05", "17:51", "46分"],
                        ["18:05", "18:47", "42分"],
                      ].map(([dep, arr, dur, rec], idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-100 ${rec ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                        >
                          <td
                            className={`p-2 ${rec ? "font-bold text-indigo-600" : "text-gray-700"}`}
                          >
                            {dep}
                          </td>
                          <td
                            className={`p-2 ${rec ? "font-bold text-indigo-600" : "text-gray-700"}`}
                          >
                            {arr}
                          </td>
                          <td className="p-2 text-gray-500 text-xs">{dur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* VISON → 松阪駅前 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                    平日
                  </span>
                  <h4 className="font-bold text-gray-800 text-sm">
                    VISON → 松阪駅前
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          出發
                        </th>
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          抵達
                        </th>
                        <th className="p-2 text-left font-medium text-gray-600 border-b">
                          車程
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["10:23", "11:06", "43分"],
                        ["11:00", "11:43", "43分", true],
                        ["12:23", "13:06", "43分"],
                        ["14:00", "14:43", "43分"],
                        ["15:28", "16:11", "43分"],
                        ["16:40", "17:23", "43分"],
                        ["17:08", "18:02", "54分"],
                        ["19:05", "19:48", "43分"],
                      ].map(([dep, arr, dur, rec], idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-100 ${rec ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                        >
                          <td
                            className={`p-2 ${rec ? "font-bold text-indigo-600" : "text-gray-700"}`}
                          >
                            {dep}
                          </td>
                          <td
                            className={`p-2 ${rec ? "font-bold text-indigo-600" : "text-gray-700"}`}
                          >
                            {arr}
                          </td>
                          <td className="p-2 text-gray-500 text-xs">{dur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-700 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-indigo-600">藍色</span>
                  為推薦班次。平日時刻表，假日班次可能不同。建議出發前至
                  <a
                    href="https://vison.jp/access/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    VISON 官網
                  </a>
                  確認。
                </div>
              </div>
            </div>
          </SectionCard>

          {/* VISON 園區地圖 */}
          <SectionCard
            icon={MapPin}
            title="VISON 園區地圖"
            collapsible={true}
            defaultOpen={false}
            forceOpen={isAnyExpanded}
          >
            <a
              href="https://vison.jp/upload_fileuploder/VISON_MAP_251010.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MapPin size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      VISON 園區地圖 (PDF)
                    </div>
                    <div className="text-sm text-gray-500">
                      含店舖配置、停車場、溫泉位置
                    </div>
                  </div>
                </div>
                <ExternalLink
                  size={18}
                  className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                />
              </div>
            </a>
          </SectionCard>

          {/* USJ 混雜預想 */}
          <SectionCard
            icon={Calendar}
            title="USJ 混雜預想 (1/17-1/20)"
            collapsible={true}
            defaultOpen={true}
            forceOpen={isAnyExpanded}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-600">
                    <th className="p-3 font-bold text-left">日期</th>
                    <th className="p-3 font-bold text-left">預測</th>
                    <th className="p-3 font-bold text-left">天氣 / 氣溫</th>
                    <th className="p-3 font-bold text-left">營業時間</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "1/17 (六)",
                      level: "🟡 C (56)",
                      weather: "☀️ 晴 (4~14°C)",
                      precip: "20%",
                      hours: "09:00 - 20:00",
                      note: "週末人潮",
                    },
                    {
                      date: "1/18 (日)",
                      level: "🟡 C (55)",
                      weather: "☀️ 晴 (5~12°C)",
                      precip: "10%",
                      hours: "09:00 - 20:00",
                      note: "-",
                    },
                    {
                      date: "1/19 (一)",
                      level: "🟢 C (48)",
                      weather: "☀️ 晴 (3~13°C)",
                      precip: "10%",
                      hours: "09:00 - 21:00",
                      note: "Jurassic Park 維修",
                    },
                    {
                      date: "1/20 (二)",
                      level: "🟢 B (46)",
                      weather: "🌤️ 晴時多雲 (3~10°C)",
                      precip: "40%",
                      hours: "09:00 - 20:00",
                      note: "推薦日",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 align-top"
                    >
                      <td className="p-3 font-bold text-indigo-600">
                        {row.date}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-800">
                          {row.level}
                        </div>
                        {row.note !== "-" && (
                          <div className="text-xs text-orange-500 mt-0.5">
                            {row.note}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="text-gray-800">{row.weather}</div>
                        <div className="text-xs text-blue-500 mt-0.5">
                          降水 {row.precip}
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 font-mono">
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-600">
              💡 天氣資料來源：tenki.jp (1/10 查詢)
            </div>
          </SectionCard>

          {/* 每日交通路線 */}
          <SectionCard
            icon={MapPin}
            title="每日交通路線"
            collapsible={true}
            defaultOpen={false}
            forceOpen={isAnyExpanded}
          >
            <div className="space-y-3">
              {recommendedRoutes.map((route, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
                  onClick={() => handleOpenMap(route)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {route.day}
                    </span>
                    <span className="text-xs text-gray-400">
                      {route.duration}
                    </span>
                  </div>
                  <div className="font-bold text-gray-800 mb-1">
                    {route.name}
                  </div>
                  <div className="text-sm text-gray-500">{route.desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* 美食 Tab */}
        <div
          className={
            activeTab === "food" ? "max-w-3xl mx-auto space-y-6" : "hidden"
          }
        >
          {/* 同步狀態提示 */}
          {isSyncing && (
            <div className="text-center text-gray-400 text-sm py-2">
              ✨ 正在同步雲端收藏...
            </div>
          )}

          {foodData.categories
            .filter((cat) => cat.sections[0].items.length > 0)
            .map((category, cIdx) => (
              <SectionCard
                key={cIdx}
                icon={Utensils}
                title={
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>{category.location}</span>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.day}
                    </span>
                  </div>
                }
                collapsible={true}
                forceOpen={isAnyExpanded}
              >
                {category.sections.map((section, sIdx) => (
                  <CollapsibleSubsection
                    key={sIdx}
                    title={section.title}
                    count={section.items.length}
                    forceOpen={isAnyExpanded}
                  >
                    <div className="space-y-2">
                      {sortItems(section.items, cIdx, sIdx).map((item) => {
                        const originalIdx = section.items.indexOf(item);
                        const itemKey = getItemKey(cIdx, sIdx, originalIdx);
                        const isFavorite = favorites[itemKey];

                        return (
                          <div
                            key={itemKey}
                            className={`p-3 rounded-xl transition-colors ${isFavorite
                              ? "bg-pink-50 border border-pink-200"
                              : "bg-gray-50 hover:bg-gray-100"
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* 收藏按鈕 (移至左側) */}
                              <button
                                onClick={() => toggleFavorite(itemKey)}
                                className={`p-2 rounded-full transition-all shrink-0 ${isFavorite
                                  ? "text-pink-500 bg-pink-100 hover:bg-pink-200"
                                  : "text-gray-300 hover:text-pink-400 hover:bg-pink-50"
                                  }`}
                                title={isFavorite ? "取消收藏" : "加入收藏"}
                              >
                                <Star
                                  size={18}
                                  className={isFavorite ? "fill-current" : ""}
                                />
                              </button>

                              {/* 內容區域 */}
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                  {item.name}
                                  {item.recommended && (
                                    <Star
                                      size={14}
                                      className="text-yellow-500 fill-yellow-500"
                                    />
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.type} • {item.desc}
                                </div>
                                {item.note && (
                                  <div className="text-xs text-orange-600 mt-1">
                                    {item.note}
                                  </div>
                                )}
                              </div>

                              {/* 地圖按鈕 (保留在右側) */}
                              {item.mapUrl && (
                                <a
                                  href={item.mapUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-indigo-600 transition-colors shrink-0"
                                >
                                  <MapPin size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* USJ 官方連結特製區塊 */}
                    {section.title === "🍕 園區內美食" &&
                      category.location === "USJ 環球影城" &&
                      category.url && (
                        <div className="mt-3">
                          <a
                            href={category.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all text-sm font-bold group"
                          >
                            <ExternalLink
                              size={16}
                              className="group-hover:scale-110 transition-transform"
                            />
                            USJ 官方蔬食餐點指南
                          </a>
                        </div>
                      )}
                  </CollapsibleSubsection>
                ))}
              </SectionCard>
            ))}
          <VegetarianCard forceOpen={isAnyExpanded} />
        </div>

        {/* 購物 Tab */}
        <div
          className={
            activeTab === "shopping" ? "max-w-3xl mx-auto space-y-6" : "hidden"
          }
        >
          {/* 購物清單分類 */}
          {/* 購物清單分類 */}
          <SectionCard
            icon={ShoppingBag}
            title="美妝購物攻略"
            collapsible={true}
            forceOpen={isAnyExpanded}
          >
            {shoppingData.categories.map((category, cIdx) => (
              <CollapsibleSubsection
                key={cIdx}
                title={`${category.icon} ${category.title}`}
                count={category.items.length}
                forceOpen={isAnyExpanded}
              >
                <div className="space-y-3">
                  {sortShoppingItems(category.items, cIdx).map((item) => {
                    const originalIdx = category.items.indexOf(item);
                    const itemKey = getShoppingItemKey(cIdx, originalIdx);
                    const isPurchased = purchased[itemKey];
                    return (
                      <div
                        key={originalIdx}
                        className={`p-4 rounded-xl border transition-all ${isPurchased
                          ? "bg-gray-100 border-gray-200 opacity-60"
                          : item.isBackup
                            ? "bg-gray-50 border-gray-200 border-dashed"
                            : "bg-white border-gray-100 hover:border-pink-200"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          {/* Checkbox */}
                          <button
                            onClick={() => togglePurchased(itemKey)}
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${isPurchased
                              ? "bg-green-500 border-green-500 text-white shadow-sm"
                              : "border-gray-300 bg-white hover:border-pink-400"
                              }`}
                          >
                            {isPurchased && <Check size={12} strokeWidth={4} />}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {item.func && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-bold rounded ${isPurchased ? "bg-gray-200 text-gray-500" : "bg-indigo-100 text-indigo-600"}`}
                                >
                                  {item.func}
                                </span>
                              )}
                              {item.type &&
                                !["必買", "囤貨", "補貨"].includes(
                                  item.type,
                                ) && (
                                  <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded ${isPurchased
                                      ? "bg-gray-200 text-gray-500"
                                      : item.type === "首選"
                                        ? "bg-green-100 text-green-600"
                                        : item.type === "試用"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-gray-100 text-gray-500"
                                      }`}
                                  >
                                    {item.type}
                                  </span>
                                )}
                            </div>
                            <button
                              onClick={() =>
                                setProductModalData({
                                  isOpen: true,
                                  product: item,
                                })
                              }
                              className={`font-bold mb-1 text-left hover:underline ${isPurchased ? "text-gray-500 line-through" : "text-gray-800 hover:text-pink-600"}`}
                            >
                              {item.name}
                            </button>
                            {item.desc && (
                              <div
                                className={`text-sm ${isPurchased ? "text-gray-400" : "text-gray-500"}`}
                              >
                                {item.desc}
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <div
                              className={`font-bold tabular-nums ${isPurchased ? "text-gray-400" : "text-pink-600"}`}
                            >
                              ¥{item.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400 tabular-nums">
                              ≈$
                              {Math.round(item.price * 0.22).toLocaleString()}
                            </div>
                            {isPurchased && (
                              <div className="text-xs text-green-500 mt-1">
                                ✓ 已購買
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleSubsection>
            ))}
          </SectionCard>
        </div>
      </main>

      {/* FAB Group */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {[
          "itinerary",
          "food",
          "shopping",
          "overview",
          "budget",
          "map",
        ].includes(activeTab) && (
            <ToggleFAB isExpanded={isAnyExpanded} onToggle={handleSmartToggle} />
          )}
      </div>

      <ScrollToTop />

      <footer className="relative z-10 text-center py-6 text-gray-400 text-sm bg-gradient-to-t from-gray-50 to-transparent mt-6 mb-24 md:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2 opacity-50">
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        </div>
        <p>© 2026 伊勢志摩‧大阪 11日素食慢旅 v7 (Vite 版)</p>
      </footer>

      {/* Map Modal */}
      <MapModal
        isOpen={mapModalData.isOpen}
        onClose={() => setMapModalData({ ...mapModalData, isOpen: false })}
        data={mapModalData.data}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={productModalData.isOpen}
        onClose={() => setProductModalData({ isOpen: false, product: null })}
        product={productModalData.product}
      />
    </div>
  );
}
