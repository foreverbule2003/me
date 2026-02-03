import { useState, useEffect, useCallback } from "react";
import {
  db,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "../../../../lib/firebase-client.mjs";

export const useWatchlist = (user) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "cb_history"), where("category", "!=", ""));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setWatchlist(items);
        setLoading(false);
      },
      (error) => {
        console.error("Watchlist subscription failed", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const addCB = useCallback(
    async (code, category = "未分類 (UNCATEGORIZED)") => {
      if (!user || !code) return;

      // Smart formatting for category
      let finalCategory = category.trim();
      if (!finalCategory) finalCategory = "未分類 (UNCATEGORIZED)";

      const docRef = doc(db, "cb_history", code.toUpperCase());
      await setDoc(
        docRef,
        {
          addedAt: serverTimestamp(),
          category: finalCategory,
        },
        { merge: true },
      );
    },
    [user],
  );

  const removeCB = useCallback(
    async (id) => {
      if (!user || !id) return;
      if (!confirm(`確定要取消追蹤 ${id} 嗎?`)) return;
      await deleteDoc(doc(db, "cb_history", id));
    },
    [user],
  );

  return { watchlist, loading, addCB, removeCB };
};
