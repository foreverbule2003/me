/**
 * 2026 東京 7日行程
 * 東京市區 / 輕井澤 / 橫濱
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
  CloudSun,
} from "lucide-react";

// 共用元件
import Timeline from "../shared/Timeline";
import FlightInfoSection from "../shared/FlightInfoSection";
import BudgetSection from "../shared/BudgetSection";
import ChecklistSection from "../shared/ChecklistSection";
import LinksGallery from "../shared/LinksGallery";
import WeatherForecastSection from "../shared/WeatherForecastSection";
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
} from "./data.js";

import {
  SectionCard,
  MapModal,
  ScrollToTop,
  ToggleFAB,
} from "../../../components/trips";

import { db, collection, doc, setDoc, deleteDoc, onSnapshot } from "../../../lib/firebase.js";

// ========== 本地元件 ==========

// Header
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
        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2070&auto=format&fit=crop"
        alt="Tokyo Skyline"
        className="w-full h-full object-cover opacity-90 scale-105"
        style={{ animation: "float 20s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/90 via-[#2d1b69]/60 to-[#F5F5F0]" />
      <div className="absolute inset-0 bg-[#1a0a2e]/40 mix-blend-overlay" />
    </div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#1a0a2e]/30 backdrop-blur-md text-xs font-medium tracking-wider border border-[#a78bfa]/40 text-[#a78bfa]/90 animate-fade-up shadow-lg">
        JP-TYO-2026-7D
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight animate-fade-up text-yellow-50">
        東京
        <span className="block text-xl md:text-2xl mt-3 font-medium tracking-widest opacity-90">
          輕井澤・橫濱 7日旅
        </span>
      </h1>
    </div>
  </header>
);

// Tab 導航
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview",   label: "總覽",  Icon: Star },
    { id: "itinerary",  label: "行程",  Icon: Calendar },
    { id: "map",        label: "交通",  Icon: Train },
    { id: "food",       label: "美食",  Icon: Utensils },
    { id: "shopping",   label: "購物",  Icon: ShoppingBag },
    { id: "budget",     label: "預算",  Icon: Wallet },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-[80px] py-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === id
                  ? "text-violet-600 font-bold border-b-2 border-violet-600"
                  : "text-gray-400 hover:text-violet-600"
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

// 可折疊子區塊
const CollapsibleSubsection = ({ title, count, children, defaultOpen = false, forceOpen = null }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  useEffect(() => { if (forceOpen !== null) setIsOpen(forceOpen); }, [forceOpen]);

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
        <div className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// 商品詳情 Modal
const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10">
          <X size={20} className="text-gray-500" />
        </button>
        <div className="w-full aspect-square bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
          ) : (
            <div className="text-center text-gray-300">
              <ShoppingBag size={64} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">尚無圖片</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          {product.nameJp && <p className="text-sm text-violet-500 mb-3">🇯🇵 {product.nameJp}</p>}
          {product.desc && <p className="text-sm text-gray-500 mb-3">{product.desc}</p>}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-violet-600">¥{product.price?.toLocaleString()}</span>
            <span className="text-sm text-gray-400">≈${Math.round((product.price || 0) * 0.22).toLocaleString()}</span>
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
  const [mapModalData, setMapModalData] = useState({ isOpen: false, data: null });
  const [productModalData, setProductModalData] = useState({ isOpen: false, product: null });
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
        snapshot.forEach((docSnap) => { newFavorites[docSnap.id] = true; });
        setFavorites(newFavorites);
        setIsSyncing(false);
      },
      (error) => { console.error("Firestore sync error:", error); setIsSyncing(false); }
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
        snapshot.forEach((docSnap) => { newPurchased[docSnap.id] = true; });
        setPurchased(newPurchased);
      },
      (error) => { console.error("Shopping sync error:", error); }
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
        phase.days.forEach((_, dIdx) => { newExpanded[`${pIdx}-${dIdx}`] = true; });
      });
      setExpandedDays(newExpanded);
    }
  };

  const getItemKey = (catIdx, secIdx, itemIdx) => `food-${catIdx}-${secIdx}-${itemIdx}`;
  const getShoppingItemKey = (catIdx, itemIdx) => `shopping-${catIdx}-${itemIdx}`;

  const toggleFavorite = async (itemKey) => {
    if (!db) {
      alert("Firebase 配置缺失，無法同步收藏。");
      return;
    }
    const docRef = doc(db, "trips", TRIP_ID, "food_ratings", itemKey);
    try {
      if (favorites[itemKey]) await deleteDoc(docRef);
      else await setDoc(docRef, { timestamp: new Date().toISOString(), userId: "anonymous" });
    } catch (e) { console.error("Error updating rating:", e); }
  };

  const sortItems = (items, catIdx, secIdx) =>
    [...items].sort((a, b) => {
      const aFav = favorites[getItemKey(catIdx, secIdx, items.indexOf(a))] ? 1 : 0;
      const bFav = favorites[getItemKey(catIdx, secIdx, items.indexOf(b))] ? 1 : 0;
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
    } catch (e) { console.error("Error updating purchase status:", e); }
  };

  const sortShoppingItems = (items, catIdx) =>
    [...items].sort((a, b) => {
      const aPurchased = purchased[getShoppingItemKey(catIdx, items.indexOf(a))] ? 1 : 0;
      const bPurchased = purchased[getShoppingItemKey(catIdx, items.indexOf(b))] ? 1 : 0;
      return aPurchased - bPurchased;
    });

  const handleOpenMap = (mapData) => setMapModalData({ isOpen: true, data: mapData });

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1C1C1E] selection:bg-[#a78bfa]/20 selection:text-violet-600">
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
          <Timeline
            data={overviewData}
            forceOpen={isAnyExpanded}
            onDayClick={(dayNum) => {
              let targetKey = null;
              itineraryData.forEach((phase, pIdx) => {
                phase.days.forEach((day, dIdx) => {
                  if (day.day === dayNum) targetKey = `${pIdx}-${dIdx}`;
                });
              });
              if (targetKey) setExpandedDays((prev) => ({ ...prev, [targetKey]: true }));
              setActiveTab("itinerary");
              setTimeout(() => {
                const el = document.getElementById(`day-${dayNum}`);
                if (el) {
                  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: elementPosition - 140, behavior: "smooth" });
                }
              }, 100);
            }}
          />
          <WeatherForecastSection forceOpen={isAnyExpanded} />
          <ChecklistSection
            title="待訂清單"
            items={todoData}
            storageKey="tokyo_2026_todos_v1"
            forceOpen={isAnyExpanded}
          />
          <LinksGallery links={usefulLinks?.categories || []} forceOpen={isAnyExpanded} />
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
        <div className={activeTab === "budget" ? "max-w-3xl mx-auto" : "hidden"}>
          <BudgetSection
            data={budgetData}
            forceOpen={isAnyExpanded}
            notes={
              <div className="flex gap-4 items-start w-full">
                <Info className="text-violet-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-violet-600 leading-relaxed">
                  <p className="font-bold mb-1">預算說明</p>
                  以上為估算值，機票與住宿確認後更新。匯率以 ¥1 = $0.22 TWD 計算。
                </div>
              </div>
            }
          />
        </div>

        {/* 交通 Tab */}
        <div className={activeTab === "map" ? "max-w-3xl mx-auto space-y-6" : "hidden"}>
          {/* 每日交通路線 */}
          <SectionCard
            icon={MapPin}
            title="每日交通路線"
            collapsible={true}
            defaultOpen={true}
            forceOpen={isAnyExpanded}
          >
            <div className="space-y-3">
              {recommendedRoutes.map((route, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-gray-100 hover:border-violet-200 transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
                  onClick={() => handleOpenMap(route)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded">
                      {route.day}
                    </span>
                    <span className="text-xs text-gray-400">{route.duration}</span>
                  </div>
                  <div className="font-bold text-gray-800 mb-1">{route.name}</div>
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
          >
            <div className="space-y-3">
              {[
                { title: "Suica (西瓜卡)", desc: "建議在成田機場 JR 服務窗口購買，適用地鐵、JR、公車、便利商店", tag: "必備" },
                { title: "N'EX 成田特快", desc: "成田機場 ↔ 東京/新宿/橫濱，外國旅客可購買來回優惠票 ¥4,070", tag: "推薦" },
                { title: "北陸新幹線 (東京-輕井澤)", desc: "はくたか 或 あさま，約 70~80 分，需事先劃位", tag: "需預訂" },
                { title: "JR 湘南新宿ライン", desc: "新宿 ↔ 橫濱，不需換車，約 28 分鐘", tag: "便利" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800">{item.title}</span>
                    <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">{item.tag}</span>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* 美食 Tab */}
        <div className={activeTab === "food" ? "max-w-3xl mx-auto space-y-6" : "hidden"}>
          {isSyncing && (
            <div className="text-center text-gray-400 text-sm py-2">✨ 正在同步雲端收藏...</div>
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
                            className={`p-3 rounded-xl transition-colors ${
                              isFavorite ? "bg-pink-50 border border-pink-200" : "bg-gray-50 hover:bg-gray-100"
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
                                <Star size={18} className={isFavorite ? "fill-current" : ""} />
                              </button>
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                  {item.name}
                                  {item.recommended && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{item.type} • {item.desc}</div>
                                {item.note && <div className="text-xs text-orange-600 mt-1">{item.note}</div>}
                              </div>
                              {item.mapUrl && (
                                <a href={item.mapUrl} target="_blank" rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-violet-600 transition-colors shrink-0">
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
        <div className={activeTab === "shopping" ? "max-w-3xl mx-auto space-y-6" : "hidden"}>
          {shoppingData.categories.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">購物清單尚未規劃</p>
              <p className="text-sm mt-1">待行程確認後填入</p>
            </div>
          ) : (
            <SectionCard icon={ShoppingBag} title="購物清單" collapsible={true} forceOpen={isAnyExpanded}>
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
                          className={`p-4 rounded-xl border transition-all ${
                            isPurchased
                              ? "bg-gray-100 border-gray-200 opacity-60"
                              : item.isBackup
                                ? "bg-gray-50 border-gray-200 border-dashed"
                                : "bg-white border-gray-100 hover:border-violet-200"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => togglePurchased(itemKey)}
                              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                isPurchased
                                  ? "bg-green-500 border-green-500 text-white shadow-sm"
                                  : "border-gray-300 bg-white hover:border-violet-400"
                              }`}
                            >
                              {isPurchased && <Check size={12} strokeWidth={4} />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <button
                                onClick={() => setProductModalData({ isOpen: true, product: item })}
                                className={`font-bold mb-1 text-left hover:underline ${
                                  isPurchased ? "text-gray-500 line-through" : "text-gray-800 hover:text-violet-600"
                                }`}
                              >
                                {item.name}
                              </button>
                              {item.desc && (
                                <div className={`text-sm ${isPurchased ? "text-gray-400" : "text-gray-500"}`}>
                                  {item.desc}
                                </div>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-bold tabular-nums ${isPurchased ? "text-gray-400" : "text-violet-600"}`}>
                                ¥{item.price?.toLocaleString()}
                              </div>
                              {isPurchased && <div className="text-xs text-green-500 mt-1">✓ 已購買</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleSubsection>
              ))}
            </SectionCard>
          )}
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {["itinerary", "food", "shopping", "overview", "budget", "map"].includes(activeTab) && (
          <ToggleFAB isExpanded={isAnyExpanded} onToggle={handleSmartToggle} />
        )}
      </div>

      <ScrollToTop />

      <footer className="relative z-10 text-center py-6 text-gray-400 text-sm bg-gradient-to-t from-gray-50 to-transparent mt-6 mb-24 md:mb-6">
        <p>© 2026 東京・輕井澤・橫濱 7日旅</p>
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
  );
}
