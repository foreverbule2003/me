import React from "react";
import { Check, ShoppingBag } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const ShoppingSection = ({
  categories = [],
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
      },
      forest: {
        hoverBorder: "hover:border-[#2D5A27]/30",
        checkboxHover: "hover:border-[#8B7355]",
        checkboxChecked: "bg-green-500 border-green-500 text-white shadow-sm",
        checkboxUnchecked: "border-gray-300 bg-white",
        priceText: "text-[#2D5A27]",
      },
    }[theme] || "default";

  const getShoppingItemKey = (cIdx, iIdx) => `shopping-${cIdx}-${iIdx}`;

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

  if (!categories || categories.length === 0) {
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
      {categories.map((category, cIdx) => (
        <SectionCard
          key={cIdx}
          icon={ShoppingBag}
          title={`${category.icon} ${category.title}`}
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
                          className={`font-bold block truncate ${
                            isPurchased
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.price && (
                          <span
                            className={`font-bold tabular-nums ml-2 shrink-0 ${isPurchased ? "text-gray-400" : t.priceText}`}
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
