import React, { useState } from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <a
            href="../?booted=true#booted"
            className="text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-2 text-sm"
          >
            ← 返回工具箱
          </a>
          <span className="text-xs text-gray-400 font-medium">TimZ Tools</span>
        </div>
      </header>

      {/* Main Content - Compact, grows to push footer */}
      <main className="px-4 py-6 flex-grow">
        {/* Hero - Compact */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            台股分析自動化
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            一鍵完成數據抓取與報告生成
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
          >
            查看範例報告 →
          </button>
        </div>

        {/* Problem / Solution - Compact Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">❌</span>
              <h3 className="font-bold text-gray-800 text-sm">問題</h3>
            </div>
            <p className="text-gray-600 text-sm">
              手動查詢整理
              <br />
              <span className="font-bold text-red-500">30+ 分鐘</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <h3 className="font-bold text-gray-800 text-sm">解法</h3>
            </div>
            <p className="text-gray-600 text-sm">
              一行指令搞定
              <br />
              <span className="font-bold text-green-600">2 分鐘內</span>
            </p>
          </div>
        </div>

        {/* Workflow - Compact */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
          <h3 className="font-bold text-gray-800 mb-3 text-sm text-center">
            📊 自動化流程
          </h3>
          <div className="flex items-center justify-between text-center text-xs">
            <div className="flex-1">
              <div className="text-xl mb-1">📡</div>
              <p className="font-medium text-gray-700">抓取</p>
            </div>
            <div className="text-gray-300">→</div>
            <div className="flex-1 bg-indigo-50 rounded-lg p-2">
              <div className="text-xl mb-1">🧠</div>
              <p className="font-medium text-indigo-600">分析</p>
            </div>
            <div className="text-gray-300">→</div>
            <div className="flex-1">
              <div className="text-xl mb-1">📝</div>
              <p className="font-medium text-gray-700">報告</p>
            </div>
          </div>
        </div>

        {/* Skills - Compact */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
          <h3 className="font-bold text-gray-800 mb-2 text-sm">💡 學到什麼</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>
              • <span className="font-bold text-indigo-600">Web Scraping</span>{" "}
              — 反爬蟲策略
            </li>
            <li>
              • <span className="font-bold text-purple-600">自動化思維</span> —
              流程優化
            </li>
            <li>
              •{" "}
              <span className="font-bold text-pink-600">
                Prompt Engineering
              </span>{" "}
              — 分析框架
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs">
        Made with ❤️ by TimZ
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="font-bold">📊 台積電 (2330) 範例報告</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl hover:opacity-70 w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 text-gray-700 space-y-5">
              <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-lg">
                ⚠️ 此為展示用範例報告，數據僅供參考，不構成投資建議。
              </p>

              {/* 營收動能 */}
              <section>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                  📈 營收動能（近三個月）
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-200 p-2 text-left">
                          月份
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          營收 (億)
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          YoY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-2">2025/12</td>
                        <td className="border border-gray-200 p-2">2,894</td>
                        <td className="border border-gray-200 p-2 text-green-600 font-medium">
                          +38.8%
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">2025/11</td>
                        <td className="border border-gray-200 p-2">2,531</td>
                        <td className="border border-gray-200 p-2 text-green-600 font-medium">
                          +34.0%
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">2025/10</td>
                        <td className="border border-gray-200 p-2">2,429</td>
                        <td className="border border-gray-200 p-2 text-green-600 font-medium">
                          +29.2%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 獲利能力 */}
              <section>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                  💰 獲利能力（近三季）
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-200 p-2 text-left">
                          季度
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          毛利率
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          營益率
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          EPS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-2">2025Q3</td>
                        <td className="border border-gray-200 p-2">57.8%</td>
                        <td className="border border-gray-200 p-2">47.5%</td>
                        <td className="border border-gray-200 p-2 font-medium">
                          12.54
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">2025Q2</td>
                        <td className="border border-gray-200 p-2">53.2%</td>
                        <td className="border border-gray-200 p-2">42.5%</td>
                        <td className="border border-gray-200 p-2 font-medium">
                          9.56
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">2025Q1</td>
                        <td className="border border-gray-200 p-2">53.1%</td>
                        <td className="border border-gray-200 p-2">42.0%</td>
                        <td className="border border-gray-200 p-2 font-medium">
                          9.15
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 技術面 + 籌碼 - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <section>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">
                    📉 技術面
                  </h3>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>
                      • 股價：<span className="font-bold">1,050</span>
                    </li>
                    <li>• 季線乖離：+6.6%</li>
                    <li>
                      • 趨勢：
                      <span className="text-green-600 font-bold">多頭</span>
                    </li>
                  </ul>
                </section>
                <section>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">
                    🏦 籌碼
                  </h3>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• 外資：連續買超</li>
                    <li>• 投信：連續買超</li>
                    <li>• 大戶：78.2%</li>
                  </ul>
                </section>
              </div>

              {/* 操盤建議 */}
              <section className="bg-indigo-50 p-3 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                  📝 操盤建議
                </h3>
                <p className="text-sm">
                  <span className="font-bold">拉回佈局</span> • Buy: 980-1,000 •
                  Stop: 950
                </p>
              </section>

              <p className="text-xs text-gray-400 text-center pt-3 border-t border-gray-100">
                📌 由 Python 爬蟲 + Markdown 模板自動生成
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
