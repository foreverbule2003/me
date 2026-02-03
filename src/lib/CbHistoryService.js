/**
 * CbHistoryService.js
 *
 * Unified Data Service for Convertible Bond History using IndexedDB Cache.
 */

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "./firebase-client.mjs";

const DB_NAME = "CbDataStore";
const STORE_NAME = "history";
const DB_VERSION = 2;

export const CbHistoryService = {
  _db: null,

  async _getDB() {
    if (this._db) return this._db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }
        db.createObjectStore(STORE_NAME, { keyPath: "symbol" });
      };
      request.onsuccess = (e) => {
        this._db = e.target.result;
        resolve(this._db);
      };
      request.onerror = (e) => reject(e.target.error);
    });
  },

  async _readLocal(symbol) {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(symbol);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async _writeLocal(symbol, data, lastSync, timestamp = null) {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        symbol,
        records: data,
        lastSync,
        timestamp: timestamp || new Date().toISOString(),
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * Fetch complete history for a symbol
   */
  async fetchHistory(db, symbol, options = {}) {
    const { onStatusUpdate = () => {}, forceSync = false } = options;
    const todayStr = new Date().toISOString().split("T")[0];

    onStatusUpdate("檢查本地資料...", "IndexedDB 檢索中");

    let localData = null;
    try {
      localData = await this._readLocal(symbol);
    } catch (e) {
      console.warn("[HistoryService] Local read failed:", e);
    }

    if (!forceSync && localData && localData.lastSync === todayStr) {
      return localData.records;
    }

    onStatusUpdate("同步雲端數據...", "正在獲取增量紀錄");

    let history = localData ? localData.records : [];
    const lastDate =
      history.length > 0 ? history[history.length - 1].date : null;

    try {
      const incremental = await this._fetchIncremental(db, symbol, lastDate);
      if (incremental.length > 0) {
        const map = new Map();
        history.forEach((r) => map.set(r.date, r));
        incremental.forEach((r) => map.set(r.date, r));
        history = Array.from(map.values()).sort((a, b) =>
          a.date.localeCompare(b.date),
        );
      }

      await this._writeLocal(symbol, history, todayStr);
    } catch (e) {
      console.warn(
        "[HistoryService] Sync failed, returning best-effort local data.",
        e,
      );
    }

    return history;
  },

  async _fetchIncremental(db, code, lastDate = null) {
    try {
      const recordsRef = collection(db, "cb_history", code, "records");
      let q;
      if (lastDate) {
        q = query(
          recordsRef,
          where("date", ">", lastDate),
          orderBy("date", "asc"),
        );
      } else {
        q = query(recordsRef, orderBy("date", "asc"), limit(1000));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.error("[HistoryService] Firestore failed:", e);
      return [];
    }
  },
};
