/**
 * CbHistoryService.mjs
 * 
 * Unified Data Service for Convertible Bond History.
 * Implements the Cloud-First Sync strategy:
 * 1. Persistent Cache (localStorage)
 * 2. Firestore Incremental (Cloud sync)
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
   * Fetch complete history for a symbol using Cloud-First Sync
   * @param {Object} db - Firestore Modular instance
   * @param {string} symbol - The stock/CB code
   * @param {Object} options - { onStatusUpdate: (msg, submsg) => void }
   */
  async fetchHistory(db, symbol, options = {}) {
    const { onStatusUpdate = () => {} } = options;
    const cacheKey = `cb_history_${symbol}`;
    
    onStatusUpdate("檢查本地暫存...", "快取搜尋中");
    
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

    // --- Tier 2: Cloud Firestore (Incremental Sync) ---
    // If cache is empty or outdated, jump straight to Firestore
    onStatusUpdate("同步雲端數據...", lastDate ? `${lastDate} 之後的增量更新` : "正在偵測雲端紀錄");
    
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
