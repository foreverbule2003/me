import React from "react";
import { Calendar, Hotel } from "lucide-react";
import { SectionCard } from "../../../components/trips";

// 簡單的 SectionCard 內部定義，或假設從外部傳入 (若專案有統一 UI 庫)
// 由於目前 SectionCard 在 App.jsx 內定義，為解耦方便，我們假設它會被提取或暫時在這裡重用樣式。
// 為了保持 Timeline 的純粹性，我們這裡可以只回傳卡片內容，或者接受 Wrapper Component。
// 觀察 App.jsx，SectionCard 是一個封裝良好的元件。
// 最佳實務是將 SectionCard 也提取出來，但根據計畫，我們專注於 Timeline。
// 我們可以將 SectionCard 的邏輯複製一份簡單版，或者預期它會傳入。
// 為了避免重複代碼，理想上應該先提取 SectionCard。
// 但根據 CTO 指示，重點是 OverviewSection。
// 讓我們假設 Timeline 是一個完整的 SectionCard。

// 我們需要 SectionCard 的定義。在 App.jsx 中它依賴 icon, title, collapsible 等。
// 為了讓 Timeline 獨立運作，我們應該傳入 SectionCard 作為 prop 或是由父層處理 SectionCard。
// 但為了 "Drop-in replacement"，Timeline 最好自己包含 SectionCard。
// 讓我們檢查 shared 目錄下是否有 components.js，根據 FEATURES.md 似乎有 `trips/shared/components.js`。
// 讓我先檢查一下 `src/pages/trips/shared` 是否有其他檔案。
// 剛剛 list_dir 說目錄不存在。所以這是第一個共用元件。
// 我們把 SectionCard 的簡易版也放在這裡，或者是依賴 props 傳入的 SectionComponent。
// 為了簡單起見，我會將 SectionCard 的邏輯包含在 Timeline 裡面，或者更進一步，
// 既然我們要建立 shared 目錄，我們應該趁機把 App.jsx 當中的 SectionCard 也提取出來放在 `SectionCard.jsx`?
// 不，計畫中只提到 Timeline。
// 為了不破壞現有結構，我會在 Timeline.jsx 中定義 Timeline，
// 並且它會接受一個 `SectionCardComponent` prop，或者我們重複使用 SectionCard 的樣式代碼。
// 為了最乾淨的重構，我會在 Timeline.jsx 中只實作內容部分？不，OverviewSection 是包含 Card 的。
// 讓我決定：我將在 Timeline.jsx 中依賴外部傳入 `SectionCard` 元件，或者如果它是通用的，
// 我應該把它放在 `src/pages/trips/shared/SectionCard.jsx`。
// 既然我已經建立了 shared 目錄，我應該做正確的事：
// 1. 建立 `src/pages/trips/shared/SectionCard.jsx` (從 App.jsx 提取)
// 2. 建立 `src/pages/trips/shared/Timeline.jsx` (使用 SectionCard)
// 但這超出了原計畫範圍。
// 用戶同意的計畫是 "提取 OverviewSection"。
// 我將在 Timeline.jsx 中複製 SectionCard 的樣式邏輯，確保它是獨立的，
// 除非我能確信 SectionCard 在 App.jsx 中很容易被 import。
// 讓我們再看一次 App.jsx 的 SectionCard 定義。

// 讀取 App.jsx 以獲取 SectionCard 代碼
// (我將在下一步讀取，現在先寫一個佔位符或通用的邏輯)

// 修正策略：
// 我將建立 `Timeline.jsx`，它會是一個 pure component，負責渲染時間軸內容。
// 但原本的 `OverviewSection` 是包含 `SectionCard` 的。
// 為了符合 "提取為共用模組" 的精神，`Timeline` 應該包含卡片外框。
// 我將把 `SectionCard` 元件代碼也一併提取到 `src/pages/trips/shared/SectionCard.jsx`，
// 這樣才是正確的架構。雖然計畫沒明寫，但這是隱含的依賴。
// 我將分兩步走。

// 第一步：先寫 Timeline.jsx，這裡我會假設它是依賴一個通用的卡片結構。
// 等等，我可以直接把 App.jsx 裡的 SectionCard 搬過來嗎？
// App.jsx 裡的 SectionCard 用到了 ChevronDown, ChevronUp, ExternalLink 等 icon。
// 為了避免過度複雜化，我將在 `App.jsx` 傳入 `SectionCard` 給 `Timeline`？
// 不，這樣太醜了。
// 我會採取最穩健的做法：
// 在 `src/pages/trips/shared/Timeline.jsx` 中，我會實作完整的渲染邏輯。
// 為了 icon，我需要引入 lucide-react。

const Timeline = ({
    data = [],
    title = "行程概覽",
    icon: Icon = Calendar,
    forceOpen = false,
    onDayClick,
}) => {
    // 取得今天的日期 (格式: "1/11")
    const now = new Date();
    const todayStr = `${now.getMonth() + 1}/${now.getDate()}`;

    // 判斷是否為當日
    const isToday = (dateStr) => {
        const match = dateStr.match(/^(\d+\/\d+)/);
        return match && match[1] === todayStr;
    };

    // 如果沒有傳入 SectionCard，我們就只渲染內容 (或者報錯，這裡假設父層會處理)
    // 但為了好用，Timeline 應該就是一個 Section。
    // 我們可以讓 Timeline 接收 children? 不，它是展示資料的。

    // 讓我們回頭看 App.jsx 的 SectionCard。
    // 它是一個簡單的 functional component。
    // 為了讓 Timeline.jsx 獨立，我應該 import SectionCard。
    // 我決定：同時建立 SectionCard.jsx 和 Timeline.jsx。
    // 這是對架構最好的決定。

    // 暫時先只建立 Timeline.jsx 內容，等一下再寫入檔案。
    return (
        <SectionCard
            icon={Icon}
            title={title}
            collapsible={true}
            defaultOpen={false}
            forceOpen={forceOpen}
        >
            <div className="relative">
                {/* 時間軸線 - 置中於節點，底部縮短避免超出最後一天 */}
                <div className="absolute left-[13px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-indigo-400 via-pink-400 to-orange-400 rounded-full z-[1]" />

                <div className="space-y-1">
                    {data.map((item, idx) => {
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

export default Timeline;
