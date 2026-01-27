/**
 * CbHistoryService.mjs
 * 
 * Unified Data Service for Convertible Bond History.
 * Implements the Smart Sync strategy (Plan B):
 * 1. Persistent Cache (localStorage)
 * 2. Local JSON Baseline (Optional/Fallback)
 * 3. Firestore Incremental (Cloud sync)
 */

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const CbHistoryService = {
  /**
   * Fetch complete history for a symbol using Smart Sync
   * @param {Object} db - Firestore Modular instance
   * @param {string} symbol - The stock/CB code
   * @param {Object} options - { onStatusUpdate: (msg, submsg) => void }
   */
  async fetchHistory(db, symbol, options = {}) {
    const { onStatusUpdate = () => {} } = options;
    const cacheKey = `cb_history_${symbol}`;
    
    onStatusUpdate("正在檢查快取...", "搜尋瀏覽器本地存儲");
    
    let history = [];
    let lastDate = null;

    // --- Tier 1: Local Storage (Primary Cache) ---
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        history = JSON.parse(cached);
        console.log(`[HistoryService] Loaded ${history.length} records from localStorage.`);
      }
    } catch (e) {
      console.warn("[HistoryService] localStorage read failed.", e);
    }

    // --- Tier 2: Local JSON (Baseline Fallback if cache is empty) ---
    if (history.length === 0) {
      onStatusUpdate("讀取初始資料...", "載入預留 JSON 快照");
      try {
        const jsonPath = `/data/history/${symbol}.json?t=${Date.now()}`;
        const res = await fetch(jsonPath);
        if (res.ok) {
          history = await res.json();
          console.log(`[HistoryService] Loaded ${history.length} records from Local JSON.`);
        }
      } catch (e) {
        // Not a critical error, just continue to Firestore full sync
      }
    }

    if (history.length > 0) {
      history.sort((a, b) => a.date.localeCompare(b.date));
      lastDate = history[history.length - 1].date;
    }

    // --- Tier 3: Cloud Firestore (Incremental Sync) ---
    onStatusUpdate("同步雲端數據...", lastDate ? `${lastDate} 之後的增量更新` : "正在下載雲端歷史紀錄");
    
    try {
      const incrementalRecords = await this._fetchIncremental(db, symbol, lastDate);
      if (incrementalRecords.length > 0) {
        // Merge & De-duplicate
        const map = new Map();
        history.forEach(r => map.set(r.date, r));
        incrementalRecords.forEach(r => map.set(r.date, r));
        
        history = Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
        
        // Update Local Storage
        try {
          localStorage.setItem(cacheKey, JSON.stringify(history));
          console.log(`[HistoryService] Cache updated. Total: ${history.length}`);
        } catch(e) {
          console.warn("[HistoryService] localStorage save failed (might be full).", e);
        }
      }
    } catch (e) {
      console.warn("[HistoryService] Cloud sync failed.", e);
    }

    // Tier 4: Auto-Crawl (Background Trigger for sparse data)
    if (history.length < 50) {
        this._triggerCrawl(symbol);
    }

    return history;
  },

  /**
   * Internal incremental fetch from Firestore
   */
  async _fetchIncremental(db, code, lastDate = null) {
    try {
      const recordsRef = collection(db, "cb_history", code, "records");
      let q;
      if (lastDate) {
        q = query(recordsRef, where("date", ">", lastDate), orderBy("date", "asc"));
      } else {
        q = query(recordsRef, orderBy("date", "asc"), limit(500));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch (e) {
      console.error("[HistoryService] Firestore getDocs failed:", e);
      return [];
    }
  },

  /**
   * Internal background crawl trigger
   */
  _triggerCrawl(code) {
    // Note: This API endpoint is a placeholder for future backend-less trigger or small cloud function
    const url = `${window.location.origin}/api/crawl?code=${code}`;
    fetch(url).catch(() => {});
  }
};
