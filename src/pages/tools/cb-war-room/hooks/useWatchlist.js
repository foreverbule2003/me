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
  writeBatch,
  deleteField,
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

  // 拖拉換群組：只改 category，不動 addedAt
  const moveCB = useCallback(
    async (id, category) => {
      if (!user || !id || !category) return;
      await setDoc(doc(db, "cb_history", id), { category }, { merge: true });
    },
    [user],
  );

  // 改分類名稱：把該分類下所有標的一次改到新名稱（新名稱已存在則併入）
  const renameCategory = useCallback(
    async (from, to) => {
      const next = to.trim();
      if (!user || !from || !next || next === from) return;
      const batch = writeBatch(db);
      watchlist
        .filter((i) => i.category === from)
        .forEach((i) =>
          batch.set(
            doc(db, "cb_history", i.id),
            { category: next },
            { merge: true },
          ),
        );
      await batch.commit();
    },
    [user, watchlist],
  );

  const removeCB = useCallback(
    async (id) => {
      if (!user || !id) return;
      if (!confirm(`確定要取消追蹤 ${id} 嗎?`)) return;
      // 只清掉分類就會離開追蹤清單；主文件的轉換價、價格與歷史資料都保留
      await setDoc(
        doc(db, "cb_history", id),
        { category: deleteField() },
        { merge: true },
      );
    },
    [user],
  );

  return { watchlist, loading, addCB, moveCB, renameCategory, removeCB };
};
