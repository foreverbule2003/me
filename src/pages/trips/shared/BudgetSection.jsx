import React from "react";
import { Wallet } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const BudgetSection = ({
  data = [],
  rate = 0.22,
  currency = "JPY",
  targetCurrency = "TWD",
  forceOpen = null,
  notes = null,
  theme = "default",
}) => {
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

  return (
    <SectionCard
      icon={Wallet}
      title={
        <div className="flex items-center gap-2">
          <span>預算概算</span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            每人
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
              <th className="p-3 font-bold text-sm whitespace-nowrap">項目</th>
              <th className="p-3 font-bold text-sm whitespace-nowrap">
                金額 ({currency})
              </th>
              <th className="p-3 font-bold text-sm whitespace-nowrap">
                預估 ({targetCurrency})
              </th>
              <th className="p-3 font-bold text-sm whitespace-nowrap">說明</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${t.hoverBgRow} transition-colors`}
              >
                <td className="p-3 font-bold text-gray-700 text-sm whitespace-nowrap">
                  {row.item}
                </td>
                <td className="p-3 font-bold tabular-nums text-gray-900 text-sm whitespace-nowrap">
                  ¥{row.cost.toLocaleString()}
                </td>
                <td className="p-3 font-bold tabular-nums text-gray-500 text-sm whitespace-nowrap">
                  ${Math.round(row.cost * rate).toLocaleString()}
                </td>
                <td className="p-3 text-sm text-gray-500 min-w-[200px]">
                  {row.note}
                </td>
              </tr>
            ))}
            <tr
              className={`${t.bgLight} text-gray-800 font-bold border-t-2 ${t.borderMain}`}
            >
              <td className="p-3 rounded-bl-lg text-sm whitespace-nowrap">
                總計
              </td>
              <td
                className={`p-3 font-bold tabular-nums text-xl ${t.textMain} font-black whitespace-nowrap`}
              >
                ¥{totalOriginal.toLocaleString()}
              </td>
              <td className="p-3 font-bold tabular-nums text-xl text-gray-500 font-black whitespace-nowrap">
                ${totalTarget.toLocaleString()}
              </td>
              <td className="p-3 rounded-br-lg text-gray-500 font-normal text-sm"></td>
            </tr>
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
            <div className="flex justify-between items-start">
              <div className="font-bold text-gray-800 text-sm">{row.item}</div>
              <div className="text-right">
                <div className={`font-bold tabular-nums ${t.textMain} text-sm`}>
                  ¥{row.cost.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 tabular-nums">
                  約 ${Math.round(row.cost * rate).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg leading-relaxed">
              {row.note}
            </div>
          </div>
        ))}
        <div
          className={`p-4 ${t.bgLight} border ${t.borderMain} rounded-xl shadow-sm`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-800 text-sm">總計 (預估)</span>
            <div className="text-right">
              <div className={`font-black tabular-nums text-xl ${t.textMain}`}>
                ¥{totalOriginal.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 tabular-nums font-bold">
                約 ${totalTarget.toLocaleString()}
              </div>
            </div>
          </div>
          <div
            className={`text-xs text-gray-500 text-center pt-2 border-t ${t.borderLight}`}
          ></div>
        </div>
      </div>

      {/* Optional Notes */}
      {notes && (
        <div
          className={`mt-8 p-6 ${t.bgLight} rounded-3xl flex gap-4 items-start`}
        >
          {notes}
        </div>
      )}
    </SectionCard>
  );
};

export default BudgetSection;
