import React, { useState, useEffect } from "react";
import { ClipboardList, Check } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const ChecklistSection = ({
  title = "待辦清單",
  items = [],
  storageKey,
  forceOpen = null,
  theme = "default",
}) => {
  const t =
    {
      default: {
        hoverBorder: "hover:border-indigo-200",
        checkboxHover: "hover:border-pink-400",
        tagBg: "bg-indigo-100",
        tagText: "text-indigo-600",
      },
      forest: {
        hoverBorder: "hover:border-[#5F7A61]/30",
        checkboxHover: "hover:border-[#7A8B7B]",
        tagBg: "bg-[#5F7A61]/10",
        tagText: "text-[#5F7A61]",
      },
    }[theme] || "default";
  const [completed, setCompleted] = useState({});

  // 初始化：從 localStorage 讀取
  useEffect(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setCompleted(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load checklist state", e);
      }
    }
  }, [storageKey]);

  // 切換狀態並儲存
  const toggleItem = (idx) => {
    const key = `item-${idx}`;
    const newState = { ...completed, [key]: !completed[key] };
    setCompleted(newState);

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newState));
    }
  };

  // 判斷是否要分組
  const hasGroup = items.some((row) => row.group);

  // 為所有項目附上 originalIdx
  const indexedItems = items.map((row, idx) => ({ ...row, originalIdx: idx }));

  // Helper：為特定陣列進行「未完成排在已完成前面」的排序
  const getSortedItems = (list) => {
    return [...list].sort((a, b) => {
      const aKey = `item-${a.originalIdx}`;
      const bKey = `item-${b.originalIdx}`;
      const aDone = completed[aKey] ? 1 : 0;
      const bDone = completed[bKey] ? 1 : 0;
      return aDone - bDone;
    });
  };

  const renderChecklistItem = (row) => {
    const itemKey = `item-${row.originalIdx}`;
    const isDone = completed[itemKey];
    return (
      <div
        key={row.originalIdx}
        className={`py-2.5 px-4 rounded-xl border transition-all cursor-pointer active:scale-[0.98] active:bg-gray-50 ${
          isDone
            ? "bg-gray-100 border-gray-200 opacity-60"
            : `bg-white border-gray-100 ${t.hoverBorder} shadow-sm`
        }`}
        onClick={() => toggleItem(row.originalIdx)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
              isDone
                ? "bg-[#5F7A61] border-[#5F7A61] text-white shadow-sm"
                : `border-gray-300 bg-white ${t.checkboxHover}`
            }`}
          >
            {isDone && <Check size={12} strokeWidth={4} />}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  isDone
                    ? "bg-gray-200 text-gray-500"
                    : `${t.tagBg} ${t.tagText}`
                }`}
              >
                {row.category}
              </span>
            </div>
            <span
              className={`font-bold text-sm ${
                isDone ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {row.item}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SectionCard
      icon={ClipboardList}
      title={title}
      collapsible={true}
      defaultOpen={false}
      forceOpen={forceOpen}
      variant="glass"
    >
      <div className="space-y-6">
        {hasGroup ? (
          // 分組渲染
          (() => {
            const uniqueGroups = [];
            indexedItems.forEach((item) => {
              if (item.group && !uniqueGroups.includes(item.group)) {
                uniqueGroups.push(item.group);
              }
            });

            return uniqueGroups.map((groupName, gIdx) => {
              const groupItems = indexedItems.filter(
                (item) => item.group === groupName,
              );
              const sorted = getSortedItems(groupItems);

              return (
                <div key={gIdx} className="space-y-3">
                  {/* 分組大標題 */}
                  <div className="flex items-center gap-2 pb-1 border-b border-[#5F7A61]/15 mt-5 first:mt-0">
                    <div className="w-1 h-3.5 bg-[#5F7A61] rounded-full shadow-sm" />
                    <span className="text-xs font-black text-[#7A8B7B] tracking-wider">
                      {groupName}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {sorted.map((row) => renderChecklistItem(row))}
                  </div>
                </div>
              );
            });
          })()
        ) : (
          // 原本的扁平渲染
          <div className="space-y-3">
            {getSortedItems(indexedItems).map((row) =>
              renderChecklistItem(row),
            )}
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default ChecklistSection;
