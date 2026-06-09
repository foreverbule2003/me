import React, { useState } from "react";
import { Wallet, ChevronDown, ChevronUp } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const BudgetSection = ({
  data = [],
  rate = 0.22,
  currency = "日圓",
  targetCurrency = "台幣",
  forceOpen = null,
  notes = null,
  theme = "default",
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (idx) => {
    setExpandedRows((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const t =
    {
      default: {
        bgLight: "bg-indigo-50",
        textMain: "text-indigo-600",
        borderMain: "border-indigo-200",
        borderLight: "border-indigo-100",
        hoverBgRow: "hover:bg-[#E8968A]/5",
      },
      forest: {
        bgLight: "bg-[#2D5A27]/5",
        textMain: "text-[#2D5A27]",
        borderMain: "border-[#2D5A27]/20",
        borderLight: "border-[#2D5A27]/10",
        hoverBgRow: "hover:bg-[#8B7355]/5",
      },
    }[theme] || "default";

  const totalOriginal = data.reduce((acc, curr) => acc + curr.cost, 0);
  const totalTarget = Math.round(totalOriginal * rate);

  // Chart Configuration: 絕對高對比且無相近色的日式莫蘭迪色盤 (松葉綠、珊瑚朱、琉璃藍、山吹黃、藤紫、鴇色粉、焦糖、白茶)
  const CHART_COLORS = [
    "#5F7A61",
    "#E86B50",
    "#4A6B7C",
    "#E0B050",
    "#8B5A8C",
    "#C17767",
    "#D4A373",
    "#E3D5CA",
  ];

  let currentAngle = 0;
  const gradientStops = data
    .map((item, i) => {
      const percentage = (item.cost / totalOriginal) * 100;
      const startAngle = currentAngle;
      const endAngle = currentAngle + percentage;
      currentAngle = endAngle;
      return `${CHART_COLORS[i % CHART_COLORS.length]} ${startAngle}% ${endAngle}%`;
    })
    .join(", ");

  const conicGradient = `conic-gradient(${gradientStops})`;

  return (
    <div className="space-y-6">
      {/* 總預算與圖表綜合區塊 */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/40 shadow-sm overflow-hidden flex flex-col">
        {/* 上半部：維持原始極簡排版的總計數字 */}
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/30">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1c1e] text-base">
              總預算估算
            </span>
            <span className="text-[10px] font-medium bg-[#1c1c1e]/5 text-[#6e6e73] px-2 py-0.5 rounded-full">
              ¥1 = NT${rate}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold ${t.textMain} tabular-nums`}>
              ¥{totalOriginal.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#6e6e73] tabular-nums">
              / NT${totalTarget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 下半部：圓餅圖 */}
        <div className="p-5 flex flex-row items-center justify-center gap-6 sm:gap-10 bg-white/20">
          <div
            className="w-24 h-24 shrink-0 rounded-full shadow-sm"
            style={{
              background: conicGradient,
              WebkitMaskImage:
                "radial-gradient(circle, transparent 55%, black 56%)",
              maskImage: "radial-gradient(circle, transparent 55%, black 56%)",
            }}
          ></div>
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 w-auto">
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm shrink-0"
                  style={{
                    backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                  }}
                ></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                    {item.item}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {Math.round((item.cost / totalOriginal) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionCard
        icon={Wallet}
        title={
          <div className="flex items-center gap-2">
            <span>預算概算</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              兩人總計
            </span>
          </div>
        }
        collapsible={true}
        defaultOpen={false}
        forceOpen={forceOpen}
        variant="glass"
      >
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${t.bgLight} ${t.textMain}`}>
                <th className="p-3 font-bold text-sm whitespace-nowrap">
                  項目
                </th>
                <th className="p-3 font-bold text-sm whitespace-nowrap">
                  金額 ({currency})
                </th>
                <th className="p-3 font-bold text-sm whitespace-nowrap">
                  預估 ({targetCurrency})
                </th>
                <th className="p-3 font-bold text-sm whitespace-nowrap">
                  說明
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr
                    className={`border-b border-gray-100 ${t.hoverBgRow} transition-colors ${row.subItems ? "cursor-pointer" : ""}`}
                    onClick={() => row.subItems && toggleRow(idx)}
                  >
                    <td className="p-3 font-bold text-gray-700 text-sm whitespace-nowrap flex items-center gap-2">
                      {row.item}
                      {row.subItems &&
                        (expandedRows[idx] ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        ))}
                    </td>
                    <td className="p-3 font-bold tabular-nums text-gray-900 text-sm whitespace-nowrap">
                      ¥{row.cost.toLocaleString()}
                    </td>
                    <td className="p-3 font-bold tabular-nums text-gray-500 text-sm whitespace-nowrap">
                      NT${Math.round(row.cost * rate).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-gray-500 min-w-[200px] whitespace-pre-line">
                      {row.note}
                    </td>
                  </tr>
                  {row.subItems &&
                    expandedRows[idx] &&
                    row.subItems.map((sub, sIdx) => (
                      <tr
                        key={`${idx}-${sIdx}`}
                        className={`border-b border-gray-50 bg-gray-50/50 ${t.hoverBgRow} transition-colors`}
                      >
                        <td className="p-3 pl-8 text-gray-600 text-sm whitespace-nowrap flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                          {sub.item}
                        </td>
                        <td className="p-3 tabular-nums text-gray-700 text-sm whitespace-nowrap">
                          ¥{sub.cost.toLocaleString()}
                        </td>
                        <td className="p-3 tabular-nums text-gray-400 text-sm whitespace-nowrap">
                          NT${Math.round(sub.cost * rate).toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-gray-400 min-w-[200px]">
                          {sub.note}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {data.map((row, idx) => (
            <div
              key={idx}
              className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col gap-2"
            >
              <div
                className={`flex justify-between items-start ${row.subItems ? "cursor-pointer" : ""}`}
                onClick={() => row.subItems && toggleRow(idx)}
              >
                <div className="font-bold text-gray-800 text-sm flex items-center gap-1">
                  {row.item}
                  {row.subItems &&
                    (expandedRows[idx] ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    ))}
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold tabular-nums ${t.textMain} text-sm`}
                  >
                    ¥{row.cost.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 tabular-nums">
                    約 NT${Math.round(row.cost * rate).toLocaleString()}
                  </div>
                </div>
              </div>

              {row.note && (
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg leading-relaxed mt-1 whitespace-pre-line">
                  {row.note}
                </div>
              )}

              {row.subItems && expandedRows[idx] && (
                <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2">
                  {row.subItems.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex justify-between items-start pl-2 border-l-2 border-gray-200"
                    >
                      <div>
                        <div className="text-sm text-gray-600">{sub.item}</div>
                        {sub.note && (
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            {sub.note}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="tabular-nums text-gray-700 text-sm">
                          ¥{sub.cost.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default BudgetSection;
