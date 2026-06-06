import React, { useState, useMemo } from "react";
import { Check, ShoppingBag, Eye, MapPin } from "lucide-react";
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
        tagActive: "bg-indigo-600 text-white",
        tagInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
      forest: {
        hoverBorder: "hover:border-[#2D5A27]/30",
        checkboxHover: "hover:border-[#8B7355]",
        checkboxChecked: "bg-[#5F7A61] border-[#5F7A61] text-white shadow-sm",
        checkboxUnchecked: "border-gray-300 bg-white",
        priceText: "text-[#5F7A61]",
        tagActive: "bg-[#5F7A61] text-white",
        tagInactive: "bg-gray-100/80 text-gray-600 hover:bg-gray-200/90",
      },
    }[theme] || "default";

  // 購買清單分類與過濾狀態（預設顯示第一個分類）
  const firstCategory = useMemo(() => {
    for (const item of wishlist) {
      if (item.category) return item.category.slice(0, 2);
    }
    return null;
  }, [wishlist]);
  const [activeCategory, setActiveCategory] = useState(() => {
    for (const item of wishlist) {
      if (item.category) return item.category.slice(0, 2);
    }
    return null;
  });

  // 計算唯一的 Item Key
  const getWishlistItemKey = (index) => `wishlist-${index}`;
  const getShoppingItemKey = (cIdx, iIdx) => `shopping-${cIdx}-${iIdx}`;

  // 取得購買清單分類列表 (限制兩個字，不含「全部」)
  const categoriesList = useMemo(() => {
    const cats = [];
    wishlist.forEach((item) => {
      if (item.category) {
        const shortCat = item.category.slice(0, 2);
        if (!cats.includes(shortCat)) {
          cats.push(shortCat);
        }
      }
    });
    return cats;
  }, [wishlist]);

  // 過濾後的購買清單商品（null = 全部）
  const filteredWishlist = useMemo(() => {
    if (!activeCategory) return wishlist;
    return wishlist.filter(
      (item) => (item.category || "").slice(0, 2) === activeCategory,
    );
  }, [wishlist, activeCategory]);

  // 計算購買清單採購進度
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

  if (
    (!categories || categories.length === 0) &&
    (!wishlist || wishlist.length === 0)
  ) {
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
      {/* 購買清單 (可折疊收合，無 icon 且前置日期標籤，右側只留文字採購比例) */}
      {wishlist.length > 0 && (
        <SectionCard
          icon={null}
          title={
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                  Day 1-8
                </span>
                <span className="font-bold text-gray-800">購買清單</span>
              </div>

              {/* 採購進度文字比例 */}
              <div className="flex items-center shrink-0 mr-1 sm:mr-3">
                <span className="text-[11px] font-bold text-[#5F7A61] bg-[#5F7A61]/10 px-2.5 py-0.5 rounded-full tabular-nums">
                  {wishlistProgress.completed} / {wishlistProgress.total}
                </span>
              </div>
            </div>
          }
          collapsible={true}
          forceOpen={forceOpen}
          variant="glass"
        >
          {/* 下方分類 Tabs 與商品網格列表 */}
          <div className="space-y-4 pt-1">
            {/* 分類頁籤（不含「全部」） */}
            {categoriesList.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                    className={`text-[11px] px-3.5 py-1 rounded-full font-medium transition-all duration-200 ${
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
                    onClick={() =>
                      setProductModalData({ isOpen: true, product: item })
                    }
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
                          className="w-full h-full object-contain p-1 mix-blend-multiply"
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
                            isPurchased
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span
                          className={`font-extrabold text-xs sm:text-sm tabular-nums ${isPurchased ? "text-gray-400 line-through" : t.priceText}`}
                        >
                          ¥{item.price?.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          ≈NT$
                          {Math.round(
                            (item.price || 0) * 0.22,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
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
            ) : category.icon ? (
              `${category.icon} ${category.title}`
            ) : (
              category.title
            )
          }
          collapsible={true}
          forceOpen={forceOpen}
          variant="glass"
        >
          <div className="space-y-2.5">
            {sortShoppingItems(category.items, cIdx).map((item) => {
              const originalIdx = category.items.indexOf(item);
              const itemKey = getShoppingItemKey(cIdx, originalIdx);
              const isPurchased = purchased[itemKey];
              return (
                <div
                  key={originalIdx}
                  className={`p-3 rounded-xl border transition-all ${
                    isPurchased
                      ? "bg-gray-100 border-gray-200 opacity-60"
                      : item.isBackup
                        ? "bg-gray-50 border-gray-200 border-dashed"
                        : `bg-white border-gray-100 ${t.hoverBorder} shadow-sm hover:shadow-md`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* 勾選框 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePurchased(itemKey);
                      }}
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isPurchased
                          ? t.checkboxChecked
                          : `${t.checkboxUnchecked} ${t.checkboxHover}`
                      }`}
                    >
                      {isPurchased && <Check size={12} strokeWidth={4} />}
                    </button>

                    {/* 內容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-[#7A8B7B] text-sm sm:text-base leading-tight">
                          {item.name}
                        </div>
                        {/* 地圖連結 */}
                        {item.mapUrl && (
                          <a
                            href={item.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 text-gray-400 hover:text-[#5F7A61] transition-colors shrink-0"
                          >
                            <MapPin size={15} />
                          </a>
                        )}
                      </div>
                      {/* 類型標籤 + 描述 */}
                      <div className="text-xs text-gray-500 mt-1">
                        {item.type && (
                          <span className="text-orange-600 font-medium">
                            {item.type}
                          </span>
                        )}
                        {item.type && item.desc && (
                          <span className="text-gray-400"> • </span>
                        )}
                        {item.desc && (
                          <span
                            className={
                              isPurchased ? "line-through text-gray-400" : ""
                            }
                          >
                            {item.desc}
                          </span>
                        )}
                      </div>
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
