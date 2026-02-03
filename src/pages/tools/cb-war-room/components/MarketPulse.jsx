import React from "react";

const MarketPulse = ({ data, onSelectCode }) => {
  if (!data || data.length === 0) {
    return <div className="p-12 text-center text-slate-300">NO DATA FOUND</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-400 font-bold">
          <tr>
            <th className="pl-4 md:pl-6 py-4 w-10 text-center">#</th>
            <th className="px-3 md:px-4 py-4">名稱 / 代號</th>
            <th className="px-3 md:px-4 py-4 text-right">現價</th>
            <th className="px-3 md:px-4 py-4 text-right">漲跌</th>
            <th className="px-3 md:px-4 py-4 text-right">成交量</th>
            <th className="px-3 md:px-4 py-4 text-center w-12">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((item, index) => {
            const rank = index + 1;
            const price = parseFloat(item.price) || 0;
            const changeStr = (item.change || "").toString();
            const isUp = changeStr.includes("▲") || parseFloat(changeStr) > 0;
            const isDown = changeStr.includes("▼") || parseFloat(changeStr) < 0;

            const pColor = isUp
              ? "text-red-500"
              : isDown
                ? "text-green-600"
                : "text-slate-900";

            const pctVal =
              parseFloat(item.changePercent?.replace(/[+%]/g, "")) || 0;
            const isLimitUp = pctVal >= 9.9;
            const isLimitDown = pctVal <= -9.9;

            let pctClass = "text-[9px] font-bold text-slate-400 mt-0.5";
            if (isLimitUp) {
              pctClass =
                "text-[9px] font-black bg-red-500 text-white px-1 rounded mt-0.5 shadow-sm shadow-red-100";
            } else if (isLimitDown) {
              pctClass =
                "text-[9px] font-black bg-green-500 text-white px-1 rounded mt-0.5 shadow-sm shadow-green-100";
            }

            return (
              <tr
                key={item.code}
                className="table-row-hover group cursor-pointer"
                onClick={() => onSelectCode(item.code)}
              >
                <td className="pl-4 md:pl-6 py-5">
                  <div
                    className={`rank-dot ${rank <= 3 ? "top-" + rank : "top-normal"} mx-auto`}
                  >
                    {rank}
                  </div>
                </td>
                <td className="px-3 md:px-4 py-5">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-700 text-sm truncate max-w-[120px]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="mono text-[10px] font-bold text-slate-400">
                        {item.code}
                      </span>
                      <span className="text-[9px] text-slate-300 font-bold bg-slate-50 px-1 rounded">
                        {item.time || "--:--"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3 md:px-4 py-5 text-right">
                  <span className={`mono font-black text-sm ${pColor}`}>
                    {price.toFixed(2)}
                  </span>
                </td>
                <td className="px-3 md:px-4 py-5 text-right">
                  <div className="flex flex-col items-end">
                    <span className={`mono text-[11px] font-black ${pColor}`}>
                      {item.change}
                    </span>
                    <span className={pctClass}>{item.changePercent}</span>
                  </div>
                </td>
                <td className="px-3 md:px-4 py-5 text-right">
                  <span className="mono text-xs font-bold text-slate-500">
                    {item.volume}
                  </span>
                </td>
                <td className="px-3 md:px-4 py-5 text-center">
                  <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center mx-auto group/btn">
                    <i className="fas fa-chart-line text-xs group-hover/btn:scale-110 transition-transform"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketPulse;
