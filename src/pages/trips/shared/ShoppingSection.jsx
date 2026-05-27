import React, { useState, useMemo } from "react";
import { Check, ShoppingBag, Sparkles, Eye } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const ShoppingSection = ({
  categories = [],
  wishlist = [],
  purchased = {},
  togglePurchased,
  setProductModalData,
  forceOpen = null,
  theme = "default",
}) => {
  const t =
    {
      default: {
        hoverBorder: "hover:border-indigo-200",
        checkboxHover: "hover:border-pink-400",
        checkboxChecked: "bg-green-500 border-green-500 text-white shadow-sm",
        checkboxUnchecked: "border-gray-300 bg-white",
        priceText: "text-indigo-600",
        wishlistBg: "bg-gradient-to-br from-indigo-50/50 to-pink-50/30",
        wishlistBorder: "border-indigo-100/50",
        tagActive: "bg-indigo-600 text-white",
        tagInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
      forest: {
        hoverBorder: "hover:border-[#2D5A27]/30",
        checkboxHover: "hover:border-[#8B7355]",
        checkboxChecked: "bg-[#5F7A61] border-[#5F7A61] text-white shadow-sm",
        checkboxUnchecked: "border-gray-300 bg-white",
        priceText: "text-[#5F7A61]",
        wishlistBg: "bg-gradient-to-br from-[#F4F6F0] via-white/80 to-[#F4F6F0]/40",
        wishlistBorder: "border-[#7A8B7B]/20",
        tagActive: "bg-[#5F7A61] text-white",
        tagInactive: "bg-gray-100/80 text-gray-600 hover:bg-gray-200/90",
      },
    }[theme] || "default";

  // Wishlist 分類與過濾狀態
  const [activeCategory, setActiveCategory] = useState("全部");

  // 計算唯一的 Item Key
  const getWishlistItemKey = (index) => `wishlist-${index}`;
  const getShoppingItemKey = (cIdx, iIdx) => `shopping-${cIdx}-${iIdx}`;

  // 取得 Wishlist 分類列表
  const categoriesList = useMemo(() => {
    const cats = ["全部"];
    wishlist.forEach((item) => {
      if (item.category && !cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return cats;
  }, [wishlist]);

  // 過濾後的 Wishlist 商品
  const filteredWishlist = useMemo(() => {
    if (activeCategory === "全部") return wishlist;
    return wishlist.filter((item) => item.category === activeCategory);
  }, [wishlist, activeCategory]);

  // 計算 Wishlist 採購進度
  const wishlistProgress = useMemo(() => {
    if (wishlist.length === 0) return { total: 0, completed: 0, percent: 0 };
    const completed = wishlist.reduce((count, _, idx) => {
      return count + (purchased[getWishlistItemKey(idx)] ? 1 : 0);
    }, 0);
    return {
      total: wishlist.length,
      completed,
      percent: Math.round((completed / wishlist.length) * 100),
    };
  }, [wishlist, purchased]);

  // 排序原有的購物商店
  const sortShoppingItems = (items, categoryIdx) => {
    return [...items].sort((a, b) => {
      const aOriginalIdx = items.indexOf(a);
      const bOriginalIdx = items.indexOf(b);
      const aKey = getShoppingItemKey(categoryIdx, aOriginalIdx);
      const bKey = getShoppingItemKey(categoryIdx, bOriginalIdx);
      const aDone = purchased[aKey] ? 1 : 0;
      const bDone = purchased[bKey] ? 1 : 0;

      // 優先顯示未完成的
      if (aDone !== bDone) return aDone - bDone;
      // 其次顯示不是備案的
      if (a.isBackup !== b.isBackup) return a.isBackup ? 1 : -1;
      return 0;
    });
  };

  if ((!categories || categories.length === 0) && (!wishlist || wishlist.length === 0)) {
    return (
      <div className="text-center py-16 text-gray-400">
        <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
        <p className="font-medium">購物清單尚未規劃</p>
        <p className="text-sm mt-1">待行程確認後填入</p>
      </div>
    );
  }

  return (
    <>
      {/* 💄 欲購商品清單 (Shopping Wishlist) */}
      {wishlist.length > 0 && (
        <div className={`p-5 sm:p-6 rounded-3xl border ${t.wishlistBg} ${t.wishlistBorder} shadow-md mb-6 backdrop-blur-md`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#5F7A61]/10 rounded-2xl text-[#5F7A61] shrink-0">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                  欲購商品清單
                  <span className="text-[10px] font-normal text-gray-400 bg-white/90 border border-gray-100 px-2 py-0.5 rounded-full">
                    Wishlist
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">點擊卡片看詳細資訊，勾選按鈕標記已購入</p>
              </div>
            </div>

            {/* 進度條 */}
            <div className="flex flex-col w-full sm:w-44 shrink-0">
              <div className="flex justify-between items-center text-xs font-bold text-[#5F7A61] mb-1">
                <span>採購進度</span>
                <span>{wishlistProgress.completed} / {wishlistProgress.total} ({wishlistProgress.percent}%)</span>
              </div>
              <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden p-0.5 border border-white/50 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#8B9D8B] to-[#5F7A61] rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${wishlistProgress.percent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 分類頁籤 */}
          {categoriesList.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? t.tagActive + " shadow-sm scale-105"
                      : t.tagInactive
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* 商品 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredWishlist.map((item) => {
              const originalIndex = wishlist.indexOf(item);
              const itemKey = getWishlistItemKey(originalIndex);
              const isPurchased = purchased[itemKey];

              return (
                <div
                  key={originalIndex}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                    isPurchased
                      ? "bg-gray-100/60 border-gray-200 opacity-60"
                      : `bg-white border-gray-100 ${t.hoverBorder} shadow-sm hover:shadow-md hover:translate-y-[-1px]`
                  }`}
                  onClick={() => setProductModalData({ isOpen: true, product: item })}
                >
                  {/* 左側勾選框 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePurchased(itemKey);
                    }}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isPurchased
                        ? t.checkboxChecked
                        : `${t.checkboxUnchecked} ${t.checkboxHover} border-gray-300 hover:scale-105`
                    }`}
                  >
                    {isPurchased && <Check size={13} strokeWidth={4} />}
                  </button>

                  {/* 商品縮圖 */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-gray-100 overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.02]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-400">
                        <ShoppingBag size={18} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Eye size={14} />
                    </div>
                  </div>

                  {/* 右側商品資訊 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <span
                        className={`font-bold block truncate text-sm sm:text-base leading-tight ${
                          isPurchased ? "text-gray-500 line-through" : "text-gray-800"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {item.nameJp && (
                      <div className="text-[10px] text-[#5F7A61] font-mono mt-0.5 truncate leading-none">
                        🇯🇵 {item.nameJp}
                      </div>
                    )}

                    {item.shop && (
                      <div className="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                        <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-[9px] text-gray-500 font-medium truncate max-w-[110px] sm:max-w-[140px]">
                          📍 {item.shop}
                        </span>
                        <span className="inline-block px-1.5 py-0.5 bg-pink-50 rounded text-[9px] text-pink-600 font-medium">
                          🎀 {item.category}
                        </span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className={`font-extrabold text-xs sm:text-sm tabular-nums ${isPurchased ? "text-gray-400 line-through" : t.priceText}`}>
                        ¥{item.price?.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        ≈NT${Math.round((item.price || 0) * 0.22).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 原有的購物商店 */}
      {categories.map((category, cIdx) => (
        <SectionCard
          key={cIdx}
          icon={null}
          title={
            category.day ? (
              <div className="flex items-center gap-3 w-full">
                <span className="text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                  {category.day}
                </span>
                <span>{category.title}</span>
              </div>
            ) : (
              category.icon ? `${category.icon} ${category.title}` : category.title
            )
          }
          collapsible={true}
          forceOpen={forceOpen}
          variant="glass"
        >
          <div className="space-y-3">
            {sortShoppingItems(category.items, cIdx).map((item) => {
              const originalIdx = category.items.indexOf(item);
              const itemKey = getShoppingItemKey(cIdx, originalIdx);
              const isPurchased = purchased[itemKey];
              return (
                <div
                  key={originalIdx}
                  className={`py-2.5 px-4 rounded-xl border transition-all ${
                    isPurchased
                      ? "bg-gray-100 border-gray-200 opacity-60"
                      : item.isBackup
                        ? "bg-gray-50 border-gray-200 border-dashed"
                        : `bg-white border-gray-100 ${t.hoverBorder} shadow-sm`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePurchased(itemKey);
                      }}
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        isPurchased
                          ? t.checkboxChecked
                          : `${t.checkboxUnchecked} ${t.checkboxHover}`
                      }`}
                    >
                      {isPurchased && <Check size={12} strokeWidth={4} />}
                    </button>
                    <div
                      className="flex-1 min-w-0 cursor-pointer active:opacity-70 transition-opacity"
                      onClick={() =>
                        setProductModalData({ isOpen: true, product: item })
                      }
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`font-bold block truncate text-sm sm:text-base ${
                            isPurchased
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.price && (
                          <span
                            className={`font-bold text-xs sm:text-sm tabular-nums ml-2 shrink-0 ${isPurchased ? "text-gray-400" : t.priceText}`}
                          >
                            ¥{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <div
                          className={`text-xs mt-0.5 line-clamp-1 ${isPurchased ? "text-gray-400 line-through" : "text-gray-500"}`}
                        >
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      ))}
    </>
  );
};

export default ShoppingSection;
