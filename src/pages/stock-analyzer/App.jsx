import React, { useState } from 'react';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';

const App = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <GameBoyShell activePage="tools">
            {/* White Background - Minimal Color Palette */}
            <div className="bg-white rounded-lg p-4 min-h-full overflow-y-auto" style={{ margin: '-10px', padding: '16px' }}>
                {/* Header */}
                <h1 className="text-xl font-bold text-center mb-1 text-gray-800">
                    台股分析自動化
                </h1>
                <p className="text-center text-gray-500 text-sm mb-4">一鍵完成數據抓取與報告生成</p>

                {/* Problem / Solution Cards - Unified Gray Theme */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-gray-400">
                        <p className="text-xs font-medium text-gray-500 mb-1">❌ 問題</p>
                        <p className="text-sm text-gray-700">
                            手動分析每支股票<br />
                            <span className="font-bold">30+ 分鐘</span>
                        </p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-gray-800">
                        <p className="text-xs font-medium text-gray-500 mb-1">✅ 解法</p>
                        <p className="text-sm text-gray-700">
                            一行指令搞定<br />
                            <span className="font-bold">2 分鐘內</span>
                        </p>
                    </div>
                </div>

                {/* Workflow - Grayscale */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <p className="text-xs font-bold text-gray-500 mb-2">📊 自動化流程</p>
                    <div className="flex items-center justify-between text-center text-xs">
                        <div className="flex-1">
                            <div className="text-xl mb-1">📡</div>
                            <p className="font-medium text-gray-700">抓取</p>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1 bg-gray-200 rounded p-1">
                            <div className="text-xl mb-1">🧠</div>
                            <p className="font-medium text-gray-800">分析</p>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex-1">
                            <div className="text-xl mb-1">📝</div>
                            <p className="font-medium text-gray-700">報告</p>
                        </div>
                    </div>
                </div>

                {/* Skills - Grayscale */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <p className="text-xs font-bold text-gray-500 mb-2">💡 學到什麼</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>• <span className="font-bold">Web Scraping</span> - 反爬蟲策略</li>
                        <li>• <span className="font-bold">自動化思維</span> - 流程優化</li>
                        <li>• <span className="font-bold">Prompt Engineering</span> - 分析框架</li>
                    </ul>
                </div>

                {/* CTA - Opens Modal */}
                <div className="text-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-block bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow hover:bg-gray-700 transition-colors cursor-pointer">
                        查看範例報告 →
                    </button>
                </div>

                {/* Back Link - Fixed Path */}
                <a href="../?booted=true#booted" className="gb-btn text-center mt-4">
                    ← 返回工具箱
                </a>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center">
                            <h2 className="font-bold">📊 台積電 (2330) 範例報告</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl hover:opacity-70"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 text-sm text-gray-700 space-y-4">
                            <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                                ⚠️ 此為展示用範例報告，數據僅供參考，不構成投資建議。
                            </p>

                            {/* 營收動能 */}
                            <section>
                                <h3 className="font-bold text-gray-800 mb-2">📈 營收動能（近三個月）</h3>
                                <table className="w-full text-xs border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-1">月份</th>
                                            <th className="border p-1">營收 (億)</th>
                                            <th className="border p-1">YoY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="border p-1">2025/12</td><td className="border p-1">2,894</td><td className="border p-1 text-green-600">+38.8%</td></tr>
                                        <tr><td className="border p-1">2025/11</td><td className="border p-1">2,531</td><td className="border p-1 text-green-600">+34.0%</td></tr>
                                        <tr><td className="border p-1">2025/10</td><td className="border p-1">2,429</td><td className="border p-1 text-green-600">+29.2%</td></tr>
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-500 mt-1">營收年增率連續三個月 {'>'} 25%，AI 需求強勁。</p>
                            </section>

                            {/* 獲利能力 */}
                            <section>
                                <h3 className="font-bold text-gray-800 mb-2">💰 獲利能力（近三季）</h3>
                                <table className="w-full text-xs border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-1">季度</th>
                                            <th className="border p-1">毛利率</th>
                                            <th className="border p-1">營益率</th>
                                            <th className="border p-1">EPS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="border p-1">2025Q3</td><td className="border p-1">57.8%</td><td className="border p-1">47.5%</td><td className="border p-1">12.54</td></tr>
                                        <tr><td className="border p-1">2025Q2</td><td className="border p-1">53.2%</td><td className="border p-1">42.5%</td><td className="border p-1">9.56</td></tr>
                                        <tr><td className="border p-1">2025Q1</td><td className="border p-1">53.1%</td><td className="border p-1">42.0%</td><td className="border p-1">9.15</td></tr>
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-500 mt-1">🔥 三率三升（毛利率回升至近年新高）</p>
                            </section>

                            {/* 技術面 */}
                            <section>
                                <h3 className="font-bold text-gray-800 mb-2">📉 技術面結構</h3>
                                <ul className="text-xs space-y-1">
                                    <li>• 目前股價：<span className="font-bold">1,050</span></li>
                                    <li>• MA60（季線）：985.20 (乖離 +6.6%)</li>
                                    <li>• MA240（年線）：842.50 (乖離 +24.6%)</li>
                                    <li>• 趨勢判斷：<span className="font-bold">多頭排列</span></li>
                                </ul>
                            </section>

                            {/* 籌碼面 */}
                            <section>
                                <h3 className="font-bold text-gray-800 mb-2">🏦 籌碼動向</h3>
                                <ul className="text-xs space-y-1">
                                    <li>• 外資：連續買超</li>
                                    <li>• 投信：☑️ 連續買超</li>
                                    <li>• 大戶持股：78.2%（籌碼集中）</li>
                                </ul>
                            </section>

                            {/* 操盤建議 */}
                            <section className="bg-gray-100 p-3 rounded">
                                <h3 className="font-bold text-gray-800 mb-2">📝 操盤建議（展示用）</h3>
                                <ul className="text-xs space-y-1">
                                    <li>• Action：<span className="font-bold">拉回佈局</span></li>
                                    <li>• Buy Zone：980-1,000</li>
                                    <li>• Stop Loss：950 (跌破季線)</li>
                                </ul>
                            </section>

                            <p className="text-xs text-gray-400 text-center pt-2 border-t">
                                📌 此報告由 Python 爬蟲 + Markdown 模板自動生成
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </GameBoyShell>
    );
};

export default App;
