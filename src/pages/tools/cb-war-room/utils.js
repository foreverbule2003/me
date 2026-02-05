import { db, doc, getDoc } from "../../../lib/firebase-client.mjs";

export const fetchStockPrice = async (underlyingCode) => {
  if (!underlyingCode) return 0;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const queries = [
      `tse_${underlyingCode}.tw`,
      `otc_${underlyingCode}.tw`,
    ].join("|");
    const res = await fetch(
      `/api/stock/getStockInfo.jsp?ex_ch=${queries}&json=1&delay=0`,
      {
        signal: controller.signal,
      },
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.msgArray) {
        const matches = json.msgArray.filter((q) => q.c === underlyingCode);
        const match =
          matches.find((q) => parseFloat(q.z) > 0) ||
          matches.find((q) => parseFloat(q.y) > 0);
        if (match) {
          return parseFloat(match.z) || parseFloat(match.y) || 0;
        }
      }
    }
  } catch (e) {
    console.warn("[Utils] Stock price fetch failed", e);
  }
  return 0;
};

export const fetchCbDetails = async (code) => {
  if (!code) return null;
  try {
    const docRef = doc(db, "cb_history", code);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.warn(`[Utils] Failed to fetch CB details for ${code}`, e);
  }
  return null;
};
