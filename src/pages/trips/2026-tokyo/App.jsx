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
  todoData,
  vegetarianCard,
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

// Header
const Header = () => (
  <header className="relative w-full pt-8 pb-6 px-6 md:px-12 text-[#1c1c1e] overflow-hidden flex flex-col items-center justify-center">
    <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
      <div className="flex items-center justify-between w-full mb-8">
        <a
          href="/me/?booted=true"
          className="p-2 bg-white/40 backdrop-blur-md rounded-full text-[#5F7A61] hover:bg-white/60 transition-all border border-white/40 shadow-sm group"
          title="回到首頁"
        >
          <ArrowRight
            size={20}
            className="rotate-180 group-hover:-translate-x-1 transition-transform"
          />
        </a>
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#5F7A61] text-sm hidden sm:block">
            Tim & Bei
          </span>
          <div className="w-8 h-8 bg-white/50 backdrop-blur-md border border-white/60 rounded-full flex items-center justify-center text-[#5F7A61] shadow-sm">
            <Star size={14} />
          </div>
        </div>
      </div>

      <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/50 backdrop-blur-md text-xs font-medium tracking-wider border border-white/60 text-[#5F7A61] shadow-sm">
        JP · TYO · YOK · KRZ · 2026 · 8D
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight tracking-tight text-[#1c1c1e]">
        東京
        <span className="block text-xl md:text-2xl mt-2 font-medium tracking-widest text-[#5F7A61]">
          橫濱・涉谷・輕井澤 8日旅
        </span>
      </h1>
      <div className="mt-4 flex items-center justify-center gap-3 text-sm text-[#6e6e73]">
        <span>6/17 – 6/24</span>
        <span>·</span>
        <span>🎊 6/21 三週年</span>
        <span>·</span>
        <span>🌱 蛋奶素</span>
      </div>
    </div>
  </header>
);

// VegetarianCard 素食溝通卡
const VegetarianCard = ({ forceOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (forceOpen !== null) setIsOpen(forceOpen);
  }, [forceOpen]);
  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <span className="text-xl">🌱</span>
          </div>
          <div>
            <div className="font-bold text-[#7A8B7B]">蛋奶素溝通卡</div>
            <div className="text-xs text-gray-400 mt-0.5">
              日語・飲食限制快速出示
            </div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 space-y-4">
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
            <p className="text-xs font-bold text-red-400 mb-2">🚫 飲食禁忌</p>
            <p className="text-base font-bold text-red-700 leading-relaxed">
              {vegetarianCard.restriction}
            </p>
            <p className="text-sm font-bold text-red-600 mt-2 leading-relaxed">
              {vegetarianCard.dashi}
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
            <p className="text-xs font-bold text-amber-500 mb-2">💛 確認問句</p>
            <p className="text-base font-bold text-amber-800 leading-relaxed">
              {vegetarianCard.question}
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
            <p className="text-xs font-bold text-green-500 mb-2">✅ 可食</p>
            <p className="text-sm font-bold text-green-700">
              {vegetarianCard.ok}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {vegetarianCard.canEat.map((item, i) => (
                <span
                  key={i}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 mb-2">🚫 不可食</p>
            <div className="flex flex-wrap gap-2">
              {vegetarianCard.cannotEat.map((item, i) => (
                <span
                  key={i}
                  className="text-xs bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tab 導航
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
    <nav className="sticky top-0 z-40 bg-white/20 backdrop-blur-md border-b border-white/30 mb-6">
      <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar px-6 md:px-12">
        <div className="flex gap-6">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-none py-4 flex items-center gap-2 transition-colors relative ${
                activeTab === id
                  ? "text-[#1c1c1e] font-bold"
                  : "text-[#6e6e73] hover:text-[#1c1c1e]"
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{label}</span>
              {activeTab === id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1c1c1e] rounded-t-full"></span>
              )}
            </button>
          ))}
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
  const [expandedDays, setExpandedDays] = useState({});
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

  return (
    <div className="min-h-screen text-[#1C1C1E] selection:bg-[#a3b19b]/20 selection:text-[#5F7A61] relative overflow-x-hidden p-2 sm:p-6 lg:p-8 bg-[#e4e9e3]">
      <div className="relative z-10 max-w-[1400px] mx-auto bg-white/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[90vh]">
        {/* 內嵌 Hero Image，使用 mask-image 讓底部完美漸層消失，無縫融入毛玻璃面板 */}
        <div
          className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />
          {/* 輕微的白色覆蓋，確保上方文字易讀性，同時跟隨 mask 漸變 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        </div>

        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-4 pb-12">
          {/* 總覽 Tab */}
          <div className={activeTab === "overview" ? "space-y-8" : "hidden"}>
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

            <ChecklistSection
              title="待訂清單"
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
              onOpenFoodGuide={() => setActiveTab("food")}
              isAnyExpanded={isAnyExpanded}
            />
          </div>

          {/* 預算 Tab */}
          <div
            className={activeTab === "budget" ? "max-w-3xl mx-auto" : "hidden"}
          >
            <BudgetSection
              data={budgetData}
              forceOpen={isAnyExpanded}
              theme="forest"
              notes={
                <div className="flex gap-4 items-start w-full">
                  <Info className="text-[#5F7A61] flex-shrink-0 mt-1" />
                  <div className="text-sm text-[#5F7A61] leading-relaxed">
                    <p className="font-bold mb-1">預算說明</p>
                    以上為估算值，機票與住宿確認後更新。匯率以 ¥1 = $0.22 TWD
                    計算。
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
            {/* 每日交通路線 */}
            <SectionCard
              icon={MapPin}
              title="每日交通路線"
              collapsible={true}
              defaultOpen={true}
              forceOpen={isAnyExpanded}
              variant="glass"
            >
              <div className="space-y-3">
                {recommendedRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F4F6F0] rounded-xl border border-[#7A8B7B]/20 hover:border-[#93A895] transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
                    onClick={() => handleOpenMap(route)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#5F7A61] bg-[#F4F6F0] px-2 py-1 rounded">
                        {route.day}
                      </span>
                      <span className="text-xs text-gray-400">
                        {route.duration}
                      </span>
                    </div>
                    <div className="font-bold text-[#7A8B7B] mb-1">
                      {route.name}
                    </div>
                    <div className="text-sm text-gray-500">{route.desc}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 交通攻略說明 */}
            <SectionCard
              icon={Train}
              title="東京交通攻略"
              collapsible={true}
              defaultOpen={false}
              forceOpen={isAnyExpanded}
              variant="glass"
            >
              <div className="space-y-3">
                {[
                  {
                    title: "Suica (西瓜卡)",
                    desc: "建議在成田機場 JR 服務窗口購買，適用地鐵、JR、公車、便利商店",
                    tag: "必備",
                  },
                  {
                    title: "N'EX 成田特快",
                    desc: "成田機場 ↔ 東京/新宿/橫濱，外國旅客可購買來回優惠票 ¥4,070",
                    tag: "推薦",
                  },
                  {
                    title: "北陸新幹線 (東京-輕井澤)",
                    desc: "はくたか 或 あさま，約 70~80 分，需事先劃位",
                    tag: "需預訂",
                  },
                  {
                    title: "JR 湘南新宿ライン",
                    desc: "新宿 ↔ 橫濱，不需換車，約 28 分鐘",
                    tag: "便利",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F4F6F0] rounded-xl border border-[#7A8B7B]/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#7A8B7B]">
                        {item.title}
                      </span>
                      <span className="text-xs font-bold text-[#5F7A61] bg-[#F4F6F0] px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
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
                  variant="glass"
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
                                    className={isFavorite ? "fill-current" : ""}
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
                                    {item.type} • {item.desc}
                                  </div>
                                  {item.note && (
                                    <div className="text-xs text-orange-600 mt-1">
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
                        })}
                      </div>
                    </CollapsibleSubsection>
                  ))}
                </SectionCard>
              ))}
          </div>

          {/* 購物 Tab */}
          <div
            className={
              activeTab === "shopping"
                ? "max-w-3xl mx-auto space-y-6"
                : "hidden"
            }
          >
            <ShoppingSection
              categories={shoppingData.categories}
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
            "food",
            "shopping",
            "overview",
            "budget",
            "map",
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
