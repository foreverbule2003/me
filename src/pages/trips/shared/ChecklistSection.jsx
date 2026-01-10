import React, { useState, useEffect } from "react";
import { ClipboardList, Check } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const ChecklistSection = ({
    title = "待辦清單",
    items = [],
    storageKey,
    forceOpen = null,
}) => {
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

    // 排序：已完成的項目移到最下面
    const sortedItems = items
        .map((row, idx) => ({ ...row, originalIdx: idx }))
        .sort((a, b) => {
            const aKey = `item-${a.originalIdx}`;
            const bKey = `item-${b.originalIdx}`;
            const aDone = completed[aKey] ? 1 : 0;
            const bDone = completed[bKey] ? 1 : 0;
            return aDone - bDone;
        });

    return (
        <SectionCard
            icon={ClipboardList}
            title={title}
            collapsible={true}
            defaultOpen={false}
            forceOpen={forceOpen}
        >
            <div className="space-y-3">
                {sortedItems.map((row) => {
                    const itemKey = `item-${row.originalIdx}`;
                    const isDone = completed[itemKey];
                    return (
                        <div
                            key={row.originalIdx}
                            className={`py-2.5 px-4 rounded-xl border transition-all cursor-pointer active:scale-[0.98] active:bg-gray-50 ${isDone
                                ? "bg-gray-100 border-gray-200 opacity-60"
                                : "bg-white border-gray-100 hover:border-indigo-200 shadow-sm"
                                }`}
                            onClick={() => toggleItem(row.originalIdx)}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${isDone
                                        ? "bg-green-500 border-green-500 text-white shadow-sm"
                                        : "border-gray-300 bg-white hover:border-pink-400"
                                        }`}
                                >
                                    {isDone && <Check size={12} strokeWidth={4} />}
                                </div>
                                <div className="flex-1">
                                    <div className="mb-1">
                                        <span
                                            className={`px-2 py-0.5 text-xs font-bold rounded ${isDone ? "bg-gray-200 text-gray-500" : "bg-indigo-100 text-indigo-600"}`}
                                        >
                                            {row.category}
                                        </span>
                                    </div>
                                    <span
                                        className={`font-bold ${isDone ? "text-gray-500 line-through" : "text-gray-800"}`}
                                    >
                                        {row.item}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

export default ChecklistSection;
