/**
 * 2026 東京・橫濱・輕井澤 8日行程
 * 6/17~6/24 | 五辛蛋奶素 | Tim & Bei
 */
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Wallet,
  Train,
  Bus,
  Utensils,
  Hotel,
  ArrowRight,
  Star,
  Info,
  ChevronDown,
  ExternalLink,
  X,
  ShoppingBag,
  Check,
  AlertTriangle,
  Heart,
  Bike,
  Clock,
  Compass,
} from "lucide-react";

// 共用元件
import Timeline from "../shared/Timeline";
import FlightInfoSection from "../shared/FlightInfoSection";
import BudgetSection from "../shared/BudgetSection";
import ChecklistSection from "../shared/ChecklistSection";
import LinksGallery from "../shared/LinksGallery";
import WeatherForecastSection from "../shared/WeatherForecastSection";
import ShoppingSection from "../shared/ShoppingSection";
import ItineraryTab from "./components/ItineraryTab";

import {
  flightData,
  overviewData,
  itineraryData,
  budgetData,
  recommendedRoutes,
  usefulLinks,
  foodData,
  shoppingData,
  attractionData,
  todoData,
  vegetarianCard,
  accommodationData,
  weatherData,
} from "./data.js";

import {
  SectionCard,
  MapModal,
  ScrollToTop,
  ToggleFAB,
} from "../../../components/trips";

import {
  db,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "../../../lib/firebase.js";

// ========== 本地元件 ==========

// 處理日期字串的輔助函數，例如將 "Day 1 (6/17 三)" 解析為 { day: "Day 1", date: "6/17 三" }
const parseDateStr = (str) => {
  if (!str) return { day: "", date: "" };
  const match = str.match(/^(.*?)\s*\((.*)\)$/);
  if (match) {
    return { day: match[1].trim(), date: match[2].trim() };
  }
  return { day: str, date: "" };
};

// Header
const Header = () => (
  <header className="relative w-full pt-4 md:pt-8 pb-2 md:pb-6 px-6 md:px-12 text-white overflow-hidden flex flex-col items-center justify-center drop-shadow-md">
    <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
      <div className="flex items-center justify-start w-full mb-4 md:mb-8">
        <a
          href="/me/?booted=true"
          className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all border border-white/20 shadow-lg group"
          title="回到首頁"
        >
          <ArrowRight
            size={20}
            className="rotate-180 group-hover:-translate-x-1 transition-transform"
          />
        </a>
      </div>

      <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-black/20 backdrop-blur-md text-xs font-medium tracking-wider border border-white/20 text-white shadow-lg">
        JP · TYO · YOK · KRZ · 2026 · 8D
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight tracking-tight text-white drop-shadow-lg">
        東京
        <span className="block text-xl md:text-2xl mt-3 font-medium tracking-widest text-white/90 drop-shadow-md">
          橫濱・澀谷・輕井澤 8日旅
        </span>
      </h1>
    </div>
  </header>
);

// VegetarianCard 素食溝通卡
const VegetarianCard = ({ forceOpen }) => {
  return (
    <SectionCard
      icon={Utensils}
      title="蛋奶素溝通卡"
      collapsible={true}
      defaultOpen={false}
      forceOpen={forceOpen}
      variant="glass"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* 🚫 飲食禁忌 */}
        <div className="p-5 bg-red-50 border border-red-100 rounded-2xl space-y-3 animate-fade-in">
          <p className="text-sm font-black text-red-500 tracking-wider mb-3">
            食べられないもの (🚫 飲食禁忌)
          </p>
          <ul className="space-y-2.5">
            {vegetarianCard.cannotEat.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-red-800">
                <span className="text-red-500 mt-1 text-xs">■</span>
                <span className="text-base font-extrabold leading-tight">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ 可食項目 */}
        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3 animate-fade-in">
          <p className="text-sm font-black text-emerald-600 tracking-wider mb-3">
            食べられるもの (✅ 可食項目)
          </p>
          <ul className="space-y-2.5">
            {vegetarianCard.canEat.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-emerald-800">
                <span className="text-emerald-500 mt-1 text-xs">●</span>
                <span className="text-base font-extrabold leading-tight">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
};

// Tab 導航 - 等寬設計
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "總覽", Icon: Star },
    { id: "itinerary", label: "行程", Icon: Calendar },
    { id: "map", label: "交通", Icon: Train },
    { id: "attraction", label: "景點", Icon: Compass },
    { id: "food", label: "美食", Icon: Utensils },
    { id: "shopping", label: "購物", Icon: ShoppingBag },
    { id: "accommodation", label: "住宿", Icon: Hotel },
    { id: "budget", label: "預算", Icon: Wallet },
  ];

  return (
    <nav className="sticky top-4 z-40 mb-8 w-full max-w-5xl mx-auto px-6 md:px-12 pointer-events-none">
      <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
        <div className="overflow-x-auto no-scrollbar w-full [mask-image:linear-gradient(to_right,transparent_0%,black_16px,black_calc(100%-16px),transparent_100%)] md:[mask-image:none]">
          <div className="flex items-center p-1.5 min-w-max w-full gap-1">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex justify-center items-center px-4 py-2.5 gap-2 rounded-xl transition-all duration-300 ${
                  activeTab === id
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10 font-medium"
                }`}
              >
                <Icon size={14} />
                <span className="text-sm whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// 可折疊子區塊
const CollapsibleSubsection = ({
  title,
  count,
  children,
  defaultOpen = false,
  forceOpen = null,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  useEffect(() => {
    if (forceOpen !== null) setIsOpen(forceOpen);
  }, [forceOpen]);

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left group"
      >
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-[#7A8B7B]">{title}</h4>
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
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// 商品詳情 Modal
const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-[#F4F6F0] rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>
        <div className="w-full aspect-square bg-gradient-to-br from-[#F5F7F2] to-[#F5F7F2] flex items-center justify-center">
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
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#7A8B7B] mb-2">
            {product.name}
          </h3>
          {product.nameJp && (
            <p className="text-sm text-[#5F7A61] mb-3">🇯🇵 {product.nameJp}</p>
          )}
          {product.desc && (
            <p className="text-sm text-gray-500 mb-3">{product.desc}</p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#5F7A61]">
              ¥{product.price?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">
              ≈${Math.round((product.price || 0) * 0.22).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== 主應用程式 ==========
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [expandedDays, setExpandedDays] = useState({});
  const [collapseCounter, setCollapseCounter] = useState(0); // 用於通知 StickyPhaseHeader 全收合
  const [mapModalData, setMapModalData] = useState({
    isOpen: false,
    data: null,
  });
  const [productModalData, setProductModalData] = useState({
    isOpen: false,
    product: null,
  });
  const [favorites, setFavorites] = useState({});
  const [purchased, setPurchased] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedRouteOpts, setSelectedRouteOpts] = useState({});

  const TRIP_ID = "2026-tokyo";

  // Firebase：美食收藏同步
  useEffect(() => {
    if (!db) {
      setIsSyncing(false);
      return;
    }
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

  // Firebase：購物清單同步
  useEffect(() => {
    if (!db) return;
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

  const isAnyExpanded = Object.values(expandedDays).some(Boolean);

  const toggleDay = (key) => {
    setExpandedDays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSmartToggle = () => {
    if (isAnyExpanded) {
      setExpandedDays({});
      setCollapseCounter((c) => c + 1); // 觸發所有 StickyPhaseHeader 收合
    } else {
      const newExpanded = {};
      itineraryData.forEach((phase, pIdx) => {
        phase.days.forEach((_, dIdx) => {
          newExpanded[`${pIdx}-${dIdx}`] = true;
        });
      });
      setExpandedDays(newExpanded);
    }
  };

  const getItemKey = (catIdx, secIdx, itemIdx) =>
    `food-${catIdx}-${secIdx}-${itemIdx}`;

  const toggleFavorite = async (itemKey) => {
    if (!db) {
      alert("Firebase 配置缺失，無法同步收藏。");
      return;
    }
    const docRef = doc(db, "trips", TRIP_ID, "food_ratings", itemKey);
    try {
      if (favorites[itemKey]) await deleteDoc(docRef);
      else
        await setDoc(docRef, {
          timestamp: new Date().toISOString(),
          userId: "anonymous",
        });
    } catch (e) {
      console.error("Error updating rating:", e);
    }
  };

  const sortItems = (items, catIdx, secIdx) =>
    [...items].sort((a, b) => {
      const aFav = favorites[getItemKey(catIdx, secIdx, items.indexOf(a))]
        ? 1
        : 0;
      const bFav = favorites[getItemKey(catIdx, secIdx, items.indexOf(b))]
        ? 1
        : 0;
      return bFav - aFav;
    });

  const togglePurchased = async (itemKey) => {
    if (!db) {
      alert("Firebase 配置缺失，無法同步購物狀態。");
      return;
    }
    const docRef = doc(db, "trips", TRIP_ID, "shopping_purchased", itemKey);
    try {
      if (purchased[itemKey]) await deleteDoc(docRef);
      else await setDoc(docRef, { timestamp: new Date().toISOString() });
    } catch (e) {
      console.error("Error updating purchase status:", e);
    }
  };

  const handleOpenMap = (mapData) =>
    setMapModalData({ isOpen: true, data: mapData });

  const totalAccommodationBudget = accommodationData.reduce(
    (total, section) => {
      const booked = section.hotels.find(
        (h) =>
          h.status === "已預訂" ||
          h.status === "已訂妥" ||
          h.status === "已決定",
      );
      if (booked && booked.priceTwd) return total + booked.priceTwd;

      const candidatesWithPrice = section.hotels.filter((h) => h.priceTwd);
      if (candidatesWithPrice.length > 0) {
        const sum = candidatesWithPrice.reduce((acc, h) => acc + h.priceTwd, 0);
        return total + sum / candidatesWithPrice.length;
      }
      return total;
    },
    0,
  );

  const accommodationBreakdown = accommodationData.map((section) => {
    const booked = section.hotels.find(
      (h) =>
        h.status === "已預訂" || h.status === "已訂妥" || h.status === "已決定",
    );
    if (booked && booked.priceTwd) {
      return {
        location: section.location,
        period: section.period,
        type: "confirmed",
        detailText: `${booked.name} (${booked.status})`,
        price: booked.priceTwd,
      };
    }

    const candidatesWithPrice = section.hotels.filter((h) => h.priceTwd);
    if (candidatesWithPrice.length > 0) {
      const sum = candidatesWithPrice.reduce((acc, h) => acc + h.priceTwd, 0);
      const avg = sum / candidatesWithPrice.length;
      const count = candidatesWithPrice.length;
      return {
        location: section.location,
        period: section.period,
        type: "candidate_avg",
        detailText: `${count}間候選均價`,
        formula: `(${candidatesWithPrice.map((h) => h.priceTwd).join("+")}) / ${count} = ${Math.round(avg)}`,
        price: avg,
      };
    }

    return {
      location: section.location,
      period: section.period,
      type: "none",
      detailText: "無預估價格",
      price: 0,
    };
  });

  return (
    <div className="min-h-screen text-[#1C1C1E] selection:bg-[#a3b19b]/20 selection:text-[#5F7A61] relative bg-[#e2e8db]">
      {/* 移除 overflow-hidden 確保內部 sticky 導航列能正常置頂 */}
      <div className="relative z-10 w-full min-h-screen">
        {/* 頂部 Hero Image，手機版降低高度避免佔比過大 */}
        <div
          className="absolute top-0 left-0 right-0 h-[380px] md:h-[600px] pointer-events-none z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop')`,
              transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
              transformOrigin: "top center",
            }}
          />
          {/* 確保頂部文字清晰的暗色漸層 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        </div>

        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-12">
          {/* 總覽 Tab */}
          <div className={activeTab === "overview" ? "space-y-6" : "hidden"}>
            <FlightInfoSection
              outbound={flightData.outbound}
              inbound={flightData.inbound}
              forceOpen={isAnyExpanded}
            />
            <Timeline
              data={overviewData}
              forceOpen={isAnyExpanded}
              theme="forest"
              onDayClick={(dayNum) => {
                let targetKey = null;
                itineraryData.forEach((phase, pIdx) => {
                  phase.days.forEach((day, dIdx) => {
                    if (day.day === dayNum) targetKey = `${pIdx}-${dIdx}`;
                  });
                });
                if (targetKey)
                  setExpandedDays((prev) => ({ ...prev, [targetKey]: true }));
                setActiveTab("itinerary");
                setTimeout(() => {
                  const el = document.getElementById(`day-${dayNum}`);
                  if (el) {
                    const elementPosition =
                      el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top: elementPosition - 140,
                      behavior: "smooth",
                    });
                  }
                }, 100);
              }}
            />

            <WeatherForecastSection
              forecastData={weatherData.days}
              sourceNote={weatherData.sourceNote}
              sourceUrl={weatherData.sourceUrl}
              forceOpen={isAnyExpanded}
              theme="forest"
            />

            <ChecklistSection
              title="待辦事項"
              items={todoData}
              storageKey="tokyo_2026_todos_v2"
              forceOpen={isAnyExpanded}
              theme="forest"
            />
            <VegetarianCard forceOpen={isAnyExpanded} />
            <LinksGallery
              links={usefulLinks?.categories || []}
              forceOpen={isAnyExpanded}
              theme="forest"
            />
          </div>

          {/* 行程 Tab */}
          <div className={activeTab === "itinerary" ? "" : "hidden"}>
            <ItineraryTab
              itineraryData={itineraryData}
              expandedDays={expandedDays}
              toggleDay={toggleDay}
              onOpenMap={handleOpenMap}
              onOpenFoodGuide={(dayNum) => {
                setActiveTab("food");
                const matchIndex = foodData.categories.findIndex((cat) => {
                  const match = cat.day.match(/Day\s+([\d-]+)/);
                  if (!match) return false;
                  const range = match[1];
                  if (range.includes("-")) {
                    const [start, end] = range.split("-");
                    return (
                      dayNum >= parseInt(start, 10) &&
                      dayNum <= parseInt(end, 10)
                    );
                  }
                  return dayNum === parseInt(range, 10);
                });

                setTimeout(() => {
                  if (matchIndex !== -1) {
                    const el = document.getElementById(
                      `food-section-${matchIndex}`,
                    );
                    if (el) {
                      const elementPosition =
                        el.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: elementPosition - 140,
                        behavior: "smooth",
                      });
                      return;
                    }
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              onJumpToTransport={(dayNum) => {
                setActiveTab("map");
                const matchRoute = recommendedRoutes.find((r) => {
                  const match = r.day.match(/Day\s+([\d-]+)/);
                  if (!match) return false;
                  const range = match[1];
                  if (range.includes("-")) {
                    const [start, end] = range.split("-");
                    return (
                      dayNum >= parseInt(start, 10) &&
                      dayNum <= parseInt(end, 10)
                    );
                  }
                  return dayNum === parseInt(range, 10);
                });

                setTimeout(() => {
                  if (matchRoute) {
                    const el = document.getElementById(
                      `transport-route-${matchRoute.id}`,
                    );
                    if (el) {
                      const elementPosition =
                        el.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: elementPosition - 140,
                        behavior: "smooth",
                      });
                      return;
                    }
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              isAnyExpanded={isAnyExpanded}
              collapseCounter={collapseCounter}
            />
          </div>

          {/* 住宿 Tab */}
          <div
            className={activeTab === "accommodation" ? "space-y-6" : "hidden"}
          >
            <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1c1c1e] text-base">
                      住宿估算 (7晚)
                    </span>
                    <span className="text-[10px] font-medium bg-[#1c1c1e]/5 text-[#6e6e73] px-2 py-0.5 rounded-full">
                      ¥1 = NT$0.22
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6e6e73]">
                    已訂妥以該飯店計費，候選日期以均價估算
                  </span>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-0.5 mt-2 sm:mt-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#5F7A61] tabular-nums">
                      ¥
                      {Math.round(
                        totalAccommodationBudget / 0.22,
                      ).toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#6e6e73] tabular-nums">
                      / NT$
                      {Math.round(totalAccommodationBudget).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 text-[11px]">
                    <span className="text-[#6e6e73]">每晚平均:</span>
                    <span className="font-semibold text-[#5F7A61] tabular-nums">
                      ¥
                      {Math.round(
                        totalAccommodationBudget / 0.22 / 7,
                      ).toLocaleString()}
                    </span>
                    <span className="text-[#6e6e73] tabular-nums">
                      / NT$
                      {Math.round(
                        totalAccommodationBudget / 7,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#7A8B7B]/10">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="inline-flex items-center gap-1 text-xs text-[#5F7A61] hover:text-[#7A8B7B] transition-colors font-semibold"
                >
                  {showBreakdown ? "收起計算明細" : "顯示每日計算明細"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showBreakdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showBreakdown && (
                  <div className="mt-3 p-4 bg-[#F4F6F0]/80 rounded-xl space-y-2.5 border border-[#7A8B7B]/10 animate-fade-in">
                    <div className="text-xs font-bold text-[#7A8B7B] pb-1.5 border-b border-[#7A8B7B]/20 flex justify-between">
                      <span>日期與地點</span>
                      <span>計算依據與房價</span>
                    </div>
                    {accommodationBreakdown.map((item, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex justify-between items-center text-xs text-gray-600 py-1.5 last:pb-0 border-b border-[#7A8B7B]/10 last:border-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="font-semibold text-[#5F7A61] sm:mr-1.5">
                            {item.period}
                          </span>
                          <span className="text-gray-400 text-[10px] sm:text-xs">
                            {item.location}
                          </span>
                        </div>
                        <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-2">
                          <span
                            className="text-gray-400 text-[10px] sm:text-xs"
                            title={item.formula}
                          >
                            {item.detailText}
                          </span>
                          <span className="font-bold text-[#1c1c1e] tabular-nums">
                            ¥{Math.round(item.price / 0.22).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 tabular-nums">
                            (NT$ {Math.round(item.price).toLocaleString()})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {accommodationData.map((section, idx) => {
              const parsedDate = parseDateStr(section.period);
              return (
                <SectionCard
                  key={idx}
                  icon={null}
                  title={
                    <div className="flex items-center gap-3 w-full">
                      <span className="w-[72px] text-center inline-block text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        {parsedDate.day}
                      </span>
                      <span>{section.location}</span>
                    </div>
                  }
                  collapsible={true}
                  defaultOpen={true}
                  forceOpen={isAnyExpanded}
                  variant="glass"
                >
                  <div>
                    {parsedDate.date && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#5F7A61] bg-[#5F7A61]/5 px-3 py-1 rounded-xl border border-[#5F7A61]/10 mb-4">
                        <Calendar size={12} />
                        <span className="font-medium">{parsedDate.date}</span>
                      </div>
                    )}
                    <div className="space-y-4">
                      {section.hotels.map((hotel, hIdx) => {
                        const isSelected =
                          hotel.status === "已決定" ||
                          hotel.status === "已訂妥" ||
                          hotel.status === "已預訂";
                        return (
                          <div
                            key={hIdx}
                            className={`p-4 rounded-xl border relative group overflow-hidden transition-all duration-300 ${
                              isSelected
                                ? "bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20 animate-fade-in"
                                : "bg-[#F4F6F0] border-[#7A8B7B]/20"
                            }`}
                          >
                            {hotel.status &&
                              (() => {
                                const isConfirmed =
                                  hotel.status === "已決定" ||
                                  hotel.status === "已訂妥" ||
                                  hotel.status === "已預訂";
                                const badgeClass = isConfirmed
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-gray-50 text-gray-500 border-gray-200/60";
                                return (
                                  <div
                                    className={`absolute top-4 right-4 text-xs rounded-full px-2.5 py-0.5 font-medium border ${badgeClass}`}
                                  >
                                    <span>{hotel.status}</span>
                                  </div>
                                );
                              })()}
                            <h4 className="font-bold text-[#7A8B7B] text-lg pr-16 mb-1">
                              {hotel.name}
                            </h4>
                            <p className="text-sm text-gray-500 mb-3">
                              {hotel.desc}
                            </p>

                            {hotel.features && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {hotel.features.map((feature, fIdx) => (
                                  <span
                                    key={fIdx}
                                    className={`text-xs px-2 py-1 rounded-full font-medium shadow-sm ${
                                      isSelected
                                        ? "bg-[#F4F6F0] text-[#5F7A61]"
                                        : "bg-white text-[#5F7A61]"
                                    }`}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#7A8B7B]/10">
                              {hotel.mapUrl ? (
                                <a
                                  href={hotel.mapUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-[#5F7A61] hover:text-[#7A8B7B] transition-colors font-medium bg-white px-2 py-1 rounded shadow-sm hover:shadow-md"
                                >
                                  <MapPin size={12} /> 查看地圖
                                </a>
                              ) : (
                                <div />
                              )}
                              {hotel.priceTwd && (
                                <div className="text-sm font-bold text-[#5F7A61]">
                                  NT$ {hotel.priceTwd.toLocaleString()}{" "}
                                  <span className="text-xs font-normal text-gray-400">
                                    /晚
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </SectionCard>
              );
            })}
          </div>

          {/* 預算 Tab */}
          <div className={activeTab === "budget" ? "space-y-8" : "hidden"}>
            <BudgetSection
              data={budgetData}
              forceOpen={isAnyExpanded}
              theme="forest"
            />
          </div>

          {/* 交通 Tab */}
          <div className={activeTab === "map" ? "space-y-6" : "hidden"}>
            <SectionCard
              icon={null}
              title={
                <div className="flex items-center gap-3 w-full">
                  <span className="w-[72px] text-center inline-block text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                    Day 1-8
                  </span>
                  <span>車站名稱對照表</span>
                </div>
              }
              collapsible={true}
              defaultOpen={true}
              forceOpen={isAnyExpanded}
              variant="glass"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {[
                  {
                    zh: "成田機場",
                    ja: "成田空港 (なりたくうこう)",
                    en: "Narita Airport",
                  },
                  { zh: "東京", ja: "東京 (とうきょう)", en: "Tokyo" },
                  { zh: "橫濱", ja: "横浜 (よこはま)", en: "Yokohama" },
                  { zh: "澀谷", ja: "渋谷 (しぶや)", en: "Shibuya" },
                  { zh: "原宿", ja: "原宿 (はらじゅく)", en: "Harajuku" },
                  { zh: "大宮", ja: "大宮 (おおみや)", en: "Omiya" },
                  { zh: "高崎", ja: "高崎 (たかさき)", en: "Takasaki" },
                  { zh: "輕井澤", ja: "軽井沢 (かるいざわ)", en: "Karuizawa" },
                  {
                    zh: "中輕井澤",
                    ja: "中軽井沢 (なかかるいざわ)",
                    en: "Naka-Karuizawa",
                  },
                  {
                    zh: "草津溫泉",
                    ja: "草津温泉 (くさつおんせん)",
                    en: "Kusatsu Onsen",
                  },
                ].map((st, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white/70 p-2.5 rounded-xl border border-[#5F7A61]/10 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="font-bold text-[#5F7A61] text-[13px] md:text-sm">
                      {st.zh}
                    </span>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-800">
                        {st.ja}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">
                        {st.en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {recommendedRoutes.map((route, idx) => {
              const parsedDate = parseDateStr(route.day);
              const currentOptIdx = selectedRouteOpts[route.id] || 0;
              const currentRoute = route.options
                ? route.options[currentOptIdx]
                : route;

              const name = currentRoute.name || route.name;
              const steps = currentRoute.steps || route.steps;

              return (
                <div key={idx} id={`transport-route-${route.id}`}>
                  <SectionCard
                    icon={null}
                    collapsible={true}
                    defaultOpen={true}
                    forceOpen={isAnyExpanded}
                    variant="glass"
                    title={
                      <div className="flex items-center gap-3 w-full">
                        <span className="w-[72px] text-center inline-block text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                          {parsedDate.day}
                        </span>
                        <span>{name}</span>
                      </div>
                    }
                  >
                    <div>
                      {route.options && (
                        <div className="flex gap-2 mb-5 bg-[#F4F6F0] p-1 rounded-2xl border border-[#7A8B7B]/10">
                          {route.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止卡片折疊
                                setSelectedRouteOpts((prev) => ({
                                  ...prev,
                                  [route.id]: oIdx,
                                }));
                              }}
                              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                                currentOptIdx === oIdx
                                  ? "bg-[#5F7A61] text-white shadow-sm"
                                  : "text-[#5F7A61] hover:bg-[#5F7A61]/5"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                      {parsedDate.date && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <div className="inline-flex items-center gap-1.5 text-xs text-[#5F7A61] bg-[#5F7A61]/5 px-3 py-1 rounded-xl border border-[#5F7A61]/10">
                            <Calendar size={12} />
                            <span className="font-medium">
                              {parsedDate.date}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2.5">
                        {steps &&
                          steps.map((step, sIdx) => {
                            const isShinkansen =
                              step.line?.includes("新幹線") ||
                              step.type === "shinkansen";
                            const isLimitedExpress =
                              step.line?.includes("特急") ||
                              step.line?.includes("N'EX");
                            return (
                              <div
                                key={sIdx}
                                className="bg-[#F4F6F0]/80 rounded-2xl p-3.5 flex flex-col gap-1.5 border border-[#7A8B7B]/10 relative overflow-hidden group transition-all duration-300 hover:shadow-sm"
                              >
                                {/* 裝飾線條 */}
                                <div
                                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                                    step.type === "bike"
                                      ? "bg-[#93A895]"
                                      : isShinkansen
                                        ? "bg-amber-500"
                                        : isLimitedExpress
                                          ? "bg-red-500"
                                          : "bg-[#5F7A61]"
                                  }`}
                                ></div>

                                <div className="flex items-center gap-1.5 border-b border-[#7A8B7B]/10 pb-1.5 mb-1 pl-2">
                                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                    {step.type === "bike" ? (
                                      <Bike
                                        size={14}
                                        className="text-[#93A895] shrink-0"
                                      />
                                    ) : step.type === "bus" ? (
                                      <Bus
                                        size={14}
                                        className="text-[#5F7A61] shrink-0"
                                      />
                                    ) : (
                                      <Train
                                        size={14}
                                        className={`${
                                          isShinkansen
                                            ? "text-amber-600"
                                            : isLimitedExpress
                                              ? "text-red-600"
                                              : "text-[#5F7A61]"
                                        } shrink-0`}
                                      />
                                    )}
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span
                                        className={`text-sm font-bold truncate ${
                                          isShinkansen
                                            ? "text-amber-800"
                                            : isLimitedExpress
                                              ? "text-red-800"
                                              : "text-[#5F7A61]"
                                        }`}
                                      >
                                        {step.line}
                                      </span>
                                      {isShinkansen && (
                                        <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded shadow-sm shrink-0">
                                          新幹線
                                        </span>
                                      )}
                                      {isLimitedExpress && (
                                        <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded shadow-sm shrink-0">
                                          特急
                                        </span>
                                      )}
                                      {step.duration && (
                                        <span className="text-[11px] text-[#7A8B7B] font-medium flex items-center gap-0.5 opacity-80 shrink-0">
                                          <Clock size={10} />
                                          {step.duration}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 text-[11px] md:text-xs pl-2">
                                  {step.station && (
                                    <span className="bg-white/80 backdrop-blur-sm text-gray-700 font-medium px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                      <span className="text-[10px]">📍</span>{" "}
                                      <span className="truncate">
                                        {step.station}
                                      </span>
                                    </span>
                                  )}
                                  {step.platform && (
                                    <span className="bg-white/80 backdrop-blur-sm text-gray-700 font-medium px-2 py-1 rounded shadow-sm flex items-center gap-1 border border-emerald-100/50">
                                      <span className="text-[10px]">🛤️</span>{" "}
                                      <span className="truncate">
                                        {step.platform}
                                      </span>
                                    </span>
                                  )}
                                </div>

                                {(step.fare || step.note) && (
                                  <div className="text-[11px] text-gray-600 mt-2 leading-snug bg-white/60 p-2.5 rounded-lg border border-white/45 pl-3 ml-2 flex flex-col gap-1">
                                    {step.fare && (
                                      <div className="flex items-center gap-1 text-[#5F7A61] font-bold">
                                        <span>🪙</span> 票價：{step.fare}
                                      </div>
                                    )}
                                    {step.note && (
                                      <div className="text-gray-600">
                                        {step.note.includes("⚠️") ? (
                                          <span className="text-red-500 font-bold">
                                            {step.note}
                                          </span>
                                        ) : (
                                          <span>* {step.note}</span>
                                        )}
                                      </div>
                                    )}
                                    {step.link && (
                                      <a
                                        href={step.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[#5F7A61] hover:text-[#7A8B7B] underline font-medium mt-1 transition-colors"
                                      >
                                        🔗 {step.link.text}
                                      </a>
                                    )}
                                    {step.timetable && (
                                      <div className="mt-2.5 bg-white/80 rounded-xl overflow-hidden border border-[#5F7A61]/20 shadow-sm">
                                        <table className="w-full text-[11px] md:text-xs text-center">
                                          <thead className="bg-[#5F7A61]/10 text-[#5F7A61] font-bold">
                                            <tr>
                                              <th className="py-1.5 px-2">
                                                車次
                                              </th>
                                              <th className="py-1.5 px-2">
                                                發車
                                              </th>
                                              <th className="py-1.5 px-2">
                                                抵達
                                              </th>
                                              <th className="py-1.5 px-2 text-left">
                                                備註
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-[#5F7A61]/10">
                                            {step.timetable.map((row, rIdx) => (
                                              <tr
                                                key={rIdx}
                                                className="hover:bg-[#5F7A61]/5 transition-colors"
                                              >
                                                <td className="py-1.5 px-2 font-medium text-gray-700">
                                                  {row.train}
                                                </td>
                                                <td className="py-1.5 px-2 font-bold text-gray-900">
                                                  {row.dep}
                                                </td>
                                                <td className="py-1.5 px-2 font-bold text-gray-900">
                                                  {row.arr}
                                                </td>
                                                <td className="py-1.5 px-2 text-left text-gray-500">
                                                  {row.note || "-"}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        {currentRoute.desc && !steps && (
                          <div className="text-sm text-gray-500 pl-2">
                            {currentRoute.desc}
                          </div>
                        )}
                      </div>
                    </div>
                  </SectionCard>
                </div>
              );
            })}
          </div>

          {/* 景點 Tab */}
          <div className={activeTab === "attraction" ? "space-y-6" : "hidden"}>
            {attractionData.categories.map((category, cIdx) => {
              const parsedDate = parseDateStr(category.day);
              return (
                <SectionCard
                  key={cIdx}
                  icon={null}
                  title={
                    <div className="flex items-center gap-3 w-full">
                      <span className="w-[72px] text-center inline-block text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        {parsedDate.day}
                      </span>
                      <span>{category.location}</span>
                    </div>
                  }
                  collapsible={true}
                  forceOpen={isAnyExpanded}
                  variant="glass"
                >
                  {parsedDate.date && (
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#5F7A61] bg-[#5F7A61]/5 px-3 py-1 rounded-xl border border-[#5F7A61]/10 mb-4 ml-2">
                      <Calendar size={12} />
                      <span className="font-medium">{parsedDate.date}</span>
                    </div>
                  )}
                  {category.sections.map((section, sIdx) => (
                    <CollapsibleSubsection
                      key={sIdx}
                      title={section.title}
                      count={section.items.length}
                      forceOpen={isAnyExpanded}
                    >
                      <div className="space-y-2">
                        {section.items.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="p-3 rounded-xl transition-colors bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0 pt-1 pl-2">
                                <div className="font-bold text-[#7A8B7B] flex items-center gap-2">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  <span className="text-orange-600 font-medium">
                                    {item.type}
                                  </span>{" "}
                                  • {item.desc}
                                </div>
                                {item.note && (
                                  <div className="text-xs text-gray-500 mt-2 pl-2.5 border-l-2 border-[#5F7A61]/35 leading-relaxed">
                                    {item.note}
                                  </div>
                                )}
                              </div>
                              {item.mapUrl && (
                                <a
                                  href={item.mapUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-[#5F7A61] transition-colors shrink-0"
                                >
                                  <MapPin size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSubsection>
                  ))}
                </SectionCard>
              );
            })}
          </div>

          {/* 美食 Tab */}
          <div className={activeTab === "food" ? "space-y-6" : "hidden"}>
            {isSyncing && (
              <div className="text-center text-gray-400 text-sm py-2">
                ✨ 正在同步雲端收藏...
              </div>
            )}
            {foodData.categories
              .filter((cat) => cat.sections[0].items.length > 0)
              .map((category, cIdx) => {
                const parsedDate = parseDateStr(category.day);
                return (
                  <div key={cIdx} id={`food-section-${cIdx}`}>
                    <SectionCard
                      icon={null}
                      title={
                        <div className="flex items-center gap-3 w-full">
                          <span className="w-[72px] text-center inline-block text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                            {parsedDate.day}
                          </span>
                          <span>{category.location}</span>
                        </div>
                      }
                      collapsible={true}
                      forceOpen={isAnyExpanded}
                      variant="glass"
                    >
                      {parsedDate.date && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#5F7A61] bg-[#5F7A61]/5 px-3 py-1 rounded-xl border border-[#5F7A61]/10 mb-4 ml-2">
                          <Calendar size={12} />
                          <span className="font-medium">{parsedDate.date}</span>
                        </div>
                      )}
                      {category.sections.map((section, sIdx) => (
                        <CollapsibleSubsection
                          key={sIdx}
                          title={section.title}
                          count={section.items.length}
                          forceOpen={isAnyExpanded}
                        >
                          <div className="space-y-2">
                            {sortItems(section.items, cIdx, sIdx).map(
                              (item) => {
                                const originalIdx = section.items.indexOf(item);
                                const itemKey = getItemKey(
                                  cIdx,
                                  sIdx,
                                  originalIdx,
                                );
                                const isFavorite = favorites[itemKey];
                                return (
                                  <div
                                    key={itemKey}
                                    className={`p-3 rounded-xl transition-colors ${
                                      isFavorite
                                        ? "bg-pink-50 border border-pink-200"
                                        : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <button
                                        onClick={() => toggleFavorite(itemKey)}
                                        className={`p-2 rounded-full transition-all shrink-0 ${
                                          isFavorite
                                            ? "text-pink-500 bg-pink-100 hover:bg-pink-200"
                                            : "text-gray-300 hover:text-pink-400 hover:bg-pink-50"
                                        }`}
                                      >
                                        <Star
                                          size={18}
                                          className={
                                            isFavorite ? "fill-current" : ""
                                          }
                                        />
                                      </button>
                                      <div className="flex-1 min-w-0 pt-1">
                                        <div className="font-bold text-[#7A8B7B] flex items-center gap-2">
                                          {item.name}
                                          {item.recommended && (
                                            <Star
                                              size={14}
                                              className="text-yellow-500 fill-yellow-500"
                                            />
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                          <span className="text-orange-600 font-medium">
                                            {item.type}
                                          </span>{" "}
                                          • {item.desc}
                                        </div>
                                        {item.note && (
                                          <div className="text-xs text-gray-500 mt-1">
                                            {item.note}
                                          </div>
                                        )}
                                      </div>
                                      {item.mapUrl && (
                                        <a
                                          href={item.mapUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-2 text-gray-400 hover:text-[#5F7A61] transition-colors shrink-0"
                                        >
                                          <MapPin size={16} />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </CollapsibleSubsection>
                      ))}
                    </SectionCard>
                  </div>
                );
              })}
          </div>

          {/* 購物 Tab */}
          <div className={activeTab === "shopping" ? "space-y-6" : "hidden"}>
            <ShoppingSection
              categories={shoppingData.categories}
              wishlist={shoppingData.wishlist}
              purchased={purchased}
              togglePurchased={togglePurchased}
              setProductModalData={setProductModalData}
              forceOpen={isAnyExpanded}
              theme="forest"
            />
          </div>
        </main>

        {/* FAB */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
          {[
            "itinerary",
            "accommodation",
            "food",
            "shopping",
            "overview",
            "budget",
            "map",
            "attraction",
          ].includes(activeTab) && (
            <ToggleFAB
              isExpanded={isAnyExpanded}
              onToggle={handleSmartToggle}
              colorClass="text-[#5F7A61]"
              hoverClass="hover:text-[#5F7A61]"
            />
          )}
        </div>

        <ScrollToTop
          bgClass="bg-[#5F7A61]"
          shadowClass="shadow-[#5F7A61]/20"
          hoverBgClass="hover:bg-[#4b614d]"
        />

        <footer className="relative z-10 text-center py-6 text-gray-400 text-sm bg-gradient-to-t from-gray-50 to-transparent mt-6 mb-24 md:mb-6">
          <p>© 2026 東京・橫濱・輕井澤 8日旅</p>
        </footer>

        <MapModal
          isOpen={mapModalData.isOpen}
          onClose={() => setMapModalData({ ...mapModalData, isOpen: false })}
          data={mapModalData.data}
        />
        <ProductModal
          isOpen={productModalData.isOpen}
          onClose={() => setProductModalData({ isOpen: false, product: null })}
          product={productModalData.product}
        />
      </div>
    </div>
  );
}
