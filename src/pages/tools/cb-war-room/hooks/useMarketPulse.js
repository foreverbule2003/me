import { useState, useEffect, useCallback } from "react";
import {
  db,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "../../../../lib/firebase-client.mjs";

export const useMarketPulse = (initialDate = null) => {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isHistory, setIsHistory] = useState(false);

  const isWeekend = (d) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const getEffectiveDate = (inputDate) => {
    const d = new Date(inputDate);
    while (isWeekend(d)) {
      d.setDate(d.getDate() - 1);
    }
    return d;
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const fetchData = useCallback(async (targetDate) => {
    setLoading(true);
    setError(null);

    const dateId = formatDate(targetDate);
    const todayId = formatDate(new Date());

    try {
      const docRef = doc(db, "hot_cb_snapshots", dateId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        setData(cloudData.items || cloudData.data || []);

        let updateTime = null;
        if (cloudData.updatedAt?.toDate) {
          updateTime = cloudData.updatedAt.toDate();
        } else if (cloudData.updatedAt) {
          updateTime = new Date(cloudData.updatedAt);
        }
        setUpdatedAt(updateTime);
        setIsHistory(dateId !== todayId);
      } else {
        // Fallback to latest
        const fallbackQuery = query(
          collection(db, "hot_cb_snapshots"),
          orderBy("__name__", "desc"),
          limit(1),
        );
        const fallbackSnap = await getDocs(fallbackQuery);
        if (!fallbackSnap.empty) {
          const latestDoc = fallbackSnap.docs[0];
          const cloudData = latestDoc.data();
          setData(cloudData.items || cloudData.data || []);

          // [Fix] Update UI Date to match the actual data derived
          const fallbackId = latestDoc.id; // YYYY-MM-DD
          if (fallbackId && fallbackId !== dateId) {
            const [y, m, d] = fallbackId.split("-").map(Number);
            const fallbackDate = new Date(y, m - 1, d);
            setCurrentDate(fallbackDate);
          }

          let updateTime = null;
          if (cloudData.updatedAt?.toDate) {
            updateTime = cloudData.updatedAt.toDate();
          } else if (cloudData.updatedAt) {
            updateTime = new Date(cloudData.updatedAt);
          }
          setUpdatedAt(updateTime);
          setIsHistory(true);
        } else {
          setData([]);
          setError("No data found");
        }
      }
    } catch (err) {
      console.error("Fetch data failed", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentDate);
  }, [currentDate, fetchData]);

  // Auto-refresh logic (every 60s)
  useEffect(() => {
    const todayId = formatDate(new Date());
    const currentId = formatDate(currentDate);

    if (currentId === todayId && !loading) {
      const timer = setInterval(() => {
        console.log("[useMarketPulse] Auto-refreshing...");
        fetchData(currentDate);
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [currentDate, loading, fetchData]);

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    while (isWeekend(prev)) {
      prev.setDate(prev.getDate() - 1);
    }
    setCurrentDate(prev);
  };

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    while (isWeekend(next)) {
      next.setDate(next.getDate() + 1);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Normalize next to midnight for comparison
    const nextMidnight = new Date(next);
    nextMidnight.setHours(0, 0, 0, 0);

    if (nextMidnight > today) return;
    setCurrentDate(next);
  };

  const jumpToDate = (date) => {
    setCurrentDate(getEffectiveDate(date));
  };

  return {
    data,
    currentDate,
    loading,
    error,
    updatedAt,
    isHistory,
    jumpToDate,
    prevDay,
    nextDay,
    refresh: () => fetchData(currentDate),
  };
};
