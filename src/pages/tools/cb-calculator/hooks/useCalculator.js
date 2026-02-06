import React from "react";
import { CbCalculatorCore } from "../../../../lib/cb-logic.mjs";
import {
  db,
  collection,
  getDocs,
  getDoc,
  doc,
} from "../../../../lib/firebase-client.mjs";

/**
 * CB 計算機核心邏輯 Hook
 * 整合 Firestore 查詢與計算核心
 */
export function useCalculator() {
  const [loading, setLoading] = React.useState(false);
  const [symbols, setSymbols] = React.useState([]);
  const [selectedSymbol, setSelectedSymbol] = React.useState(null);
  const [inputs, setInputs] = React.useState({
    cbPrice: "",
    stockPrice: "",
    conversionPrice: "",
  });
  const [results, setResults] = React.useState({
    premiumRate: null,
    conversionValue: null,
    sharesPerBond: null,
    parityPrice: null,
    upsideNeeded: null,
    isDiscount: false,
  });

  // 載入可用標的清單
  const loadSymbols = React.useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, "cb_history"));
      const list = snapshot.docs.map((d) => ({
        symbol: d.id,
        name: d.data().name || "",
      }));
      setSymbols(list);
    } catch (e) {
      console.warn("[useCalculator] Failed to load symbols:", e);
    }
  }, []);

  // 查詢特定標的資料
  const fetchSymbolData = React.useCallback(async (code) => {
    setLoading(true);
    try {
      const docRef = doc(db, "cb_history", code);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectedSymbol({ code, ...data });
        // 欄位名稱相容性：Firestore 可能使用不同欄位名
        setInputs({
          cbPrice: (data.cbPrice || data.price)?.toString() || "",
          stockPrice:
            (data.stockPrice || data.underlyingPrice)?.toString() || "",
          conversionPrice:
            (data.conversionPrice || data.convPrice)?.toString() || "",
        });
      }
    } catch (e) {
      console.error("[useCalculator] Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // 計算結果
  const calculate = React.useCallback(() => {
    const cbPrice = parseFloat(inputs.cbPrice);
    const stockPrice = parseFloat(inputs.stockPrice);
    const conversionPrice = parseFloat(inputs.conversionPrice);

    if (!cbPrice || !stockPrice || !conversionPrice) {
      setResults({
        premiumRate: null,
        conversionValue: null,
        sharesPerBond: null,
        parityPrice: null,
        upsideNeeded: null,
        isDiscount: false,
      });
      return;
    }

    // 使用靜態方法計算
    const shares = CbCalculatorCore.calculateSharesPerBond(conversionPrice);
    const cv = CbCalculatorCore.calculateConversionValue(
      stockPrice,
      conversionPrice,
    );
    const premium = CbCalculatorCore.calculatePremiumRate(cbPrice, cv);
    const parity = CbCalculatorCore.calculateParityPrice(
      cbPrice,
      conversionPrice,
    );
    const upside = ((parity - stockPrice) / stockPrice) * 100;

    setResults({
      premiumRate: premium,
      conversionValue: cv,
      sharesPerBond: shares,
      parityPrice: parity,
      upsideNeeded: upside,
      isDiscount: premium < 0,
    });
  }, [inputs]);

  // 輸入變更時重新計算
  React.useEffect(() => {
    calculate();
  }, [inputs, calculate]);

  // 初始化
  React.useEffect(() => {
    loadSymbols();
  }, [loadSymbols]);

  // URL 參數處理
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      fetchSymbolData(code);
    }
  }, [fetchSymbolData]);

  return {
    loading,
    symbols,
    selectedSymbol,
    inputs,
    setInputs,
    results,
    fetchSymbolData,
  };
}
