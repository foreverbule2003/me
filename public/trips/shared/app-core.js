/**
 * 共用應用程式核心 - Shared App Core
 * 處理 React 應用程式初始化、資料載入與共用輔助函式
 */

(function () {
  "use strict";

  // --- 1. 輔助函式 (Helper Functions) ---

  /**
   * 清理查詢字串，移除表情符號與無效關鍵字
   */
  const cleanQuery = (text) => {
    let cleaned = text.replace(
      /[\u{1F600}-\u{1F6FF}|[\u{1F300}-\u{1F5FF}|[\u{1F680}-\u{1F6FF}|[\u{1F700}-\u{1F77F}|[\u{1F780}-\u{1F7FF}|[\u{1F800}-\u{1F8FF}|[\u{1F900}-\u{1F9FF}|[\u{1FA00}-\u{1FA6F}|[\u{1FA70}-\u{1FAFF}]/gu,
      "",
    );
    cleaned = cleaned.replace(/搭乘|移動|前往|抵達|入住|晚餐|午餐|參拜/g, "");
    cleaned = cleaned.replace(/[：:()（）]/g, " ");
    return cleaned.trim();
  };

  /**
   * 呼叫 Gemini API (模擬/演示模式)
   */
  const callGeminiAPI = async (prompt, systemContext = "", apiKey = "") => {
    const model = "gemini-3.0-pro";

    // 演示模式 (若無 API Key)
    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模擬延遲

      if (prompt.includes("素食")) {
        return "目前為演示模式。關於素食餐廳，行程中推薦了「伊勢烏龍麵」與「豆腐懷石料理」，都非常適合素食者享用！(請配置 API Key 以獲取即時 AI 建議)";
      }
      if (prompt.includes("交通")) {
        return "目前為演示模式。此行程主要使用近鐵廣域周遊券 (KINTETSU RAIL PASS)，包含特急券的預約建議提早進行。(請配置 API Key 以獲取即時 AI 建議)";
      }

      return `這是 AI 導遊的模擬回應。由於目前未設定 API Key，我無法連接到真正的 Gemini 模型。\n\n不過別擔心，您的行程規劃已經非常完整！您剛剛詢問關於：「${prompt.slice(0, 10)}${prompt.length > 10 ? "..." : ""}」的問題，建議您可以直接查看行程詳情頁面。`;
    }

    // 構建完整 Prompt (如果需要真實呼叫，需傳入 itineraryData/strategyData)
    // 這裡簡化處理，假設 context 已包含必要資訊
    const fullSystemInstruction = `
          You are a helpful, expert travel concierge.
          Respond in Traditional Chinese (繁體中文).
          Specific Instruction: ${systemContext}
      `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: fullSystemInstruction }] },
          }),
        },
      );
      const data = await response.json();
      if (data.error) {
        console.error("Gemini Error:", data.error);
        return "抱歉，AI 服務暫時無法使用 (API Key 可能無效或配額已滿)。";
      }
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "抱歉，AI 目前忙碌中。"
      );
    } catch (error) {
      console.error("Fetch Error:", error);
      return "連線發生錯誤，請檢查網路狀態。";
    }
  };

  // --- 2. 核心初始化 (Core Initialization) ---

  /**
   * 初始化 React 應用程式
   * @param {Component} App - 主要的 React App 元件
   * @param {string} rootId - 掛載點 ID (預設 'root')
   */
  const initTripApp = (App, rootId = "root") => {
    const { createRoot } = ReactDOM;
    const container = document.getElementById(rootId);

    if (!container) {
      console.error(`Root element #${rootId} not found!`);
      return;
    }

    const root = createRoot(container);
    root.render(React.createElement(App));
  };

  // --- 3. 匯出 (Export) ---
  if (typeof window !== "undefined") {
    window.TripShared = window.TripShared || {};
    window.TripShared.AppCore = {
      cleanQuery,
      callGeminiAPI,
      initTripApp,
    };
  }
})();
