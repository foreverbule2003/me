/**
 * Centralized Business Logic for Convertible Bonds (CB)
 * Unifies calculation formulas and data parsing across War Room and Calculator.
 */

export class CbCalculatorCore {
  /**
   * Calculates Shares Per Bond (轉換股數)
   * Formula: Par Value (100,000) / Conversion Price
   * @param {number} conversionPrice
   * @returns {number}
   */
  static calculateSharesPerBond(conversionPrice) {
    if (!conversionPrice || conversionPrice === 0) return 0;
    return 100000 / conversionPrice;
  }

  /**
   * Calculates Conversion Value (轉換價值/理論價)
   * Formula: (Shares Per Bond * Stock Price) / 1000 (if Price is integer-based)
   * Simplified: (Stock Price / Conversion Price) * 100
   * @param {number} stockPrice
   * @param {number} conversionPrice
   * @returns {number}
   */
  static calculateTheoreticalPrice(stockPrice, conversionPrice) {
    if (!stockPrice || !conversionPrice || conversionPrice === 0) return 0;
    return (stockPrice / conversionPrice) * 100;
  }

  // Alias for readability
  static calculateConversionValue(stockPrice, conversionPrice) {
    return this.calculateTheoreticalPrice(stockPrice, conversionPrice);
  }

  /**
   * Calculates Parity Price (平價)
   * Usually same as Conversion Value in TWD market context contextually,
   * but strictly: (CB Price / 100) * Conversion Price = Effective Stock Cost
   * WAIT: "Parity Price" (平價) in Taiwan often refers to "If I convert now, what is the bond worth?" which IS Conversion Value.
   * However, sometimes users mean "Parity" as "Break-even stock price".
   * Let's stick to the Project's formula:
   * Previous Code: parityPrice = (cbPrice / 100) * conversionPrice
   * Meaning: The implied cost of the underlying stock if you bought the bond and converted.
   */
  static calculateParityPrice(cbPrice, conversionPrice) {
    return (cbPrice / 100) * conversionPrice;
  }

  /**
   * Calculates the Premium Rate
   * Formula: ((CB Price - Theoretical Price) / Theoretical Price) * 100
   * @param {number} cbPrice - Current CB market price
   * @param {number} theoreticalPrice - Calculated parity price
   * @returns {number} - Premium rate percentage (e.g., 5.23 for 5.23%)
   */
  static calculatePremiumRate(cbPrice, theoreticalPrice) {
    if (!cbPrice || !theoreticalPrice || theoreticalPrice === 0) return 0;
    return ((cbPrice - theoreticalPrice) / theoreticalPrice) * 100;
  }

  /**
   * Returns a status object for UI display based on premium rate
   * @param {number} rate
   * @returns {object} { label, colorClass, desc }
   */
  static getPremiumStatus(rate) {
    if (rate < -5) return { label: "折價", color: "green", desc: "低估 (Undervalued)" };
    if (rate < 0) return { label: "微折價", color: "emerald", desc: "合理偏低" };
    if (rate === 0) return { label: "平價", color: "gray", desc: "損益兩平" };
    if (rate < 5) return { label: "合理", color: "blue", desc: "正常區間" };
    if (rate < 15) return { label: "溢價", color: "amber", desc: "稍貴 (Overvalued)" };
    return { label: "高溢價", color: "red", desc: "過熱 (High Risk)" };
  }

  static getMoneynessStatus(stockPrice, conversionPrice) {
    const ratio = stockPrice / conversionPrice;
    if (ratio > 1.3) return "深度價內 (Deep ITM)";
    if (ratio >= 1.0) return "價內 (ITM)";
    if (ratio >= 0.8) return "價外 (OTM)";
    return "深度價外 (Deep OTM)";
  }

  /**
   * Infers the underlying stock code from a CB symbol.
   * Logic: Returns first 4 digits if symbol is 5 chars ending in N/etc.
   * @param {string} cbSymbol - e.g., "23301" or "68072"
   * @returns {string} - e.g., "2330" or "6807"
   */
  static inferUnderlyingCode(cbSymbol) {
    if (!cbSymbol || cbSymbol.length < 5) return "";
    return cbSymbol.substring(0, 4);
  }

  /**
   * Safe number parsing for API responses
   * @param {string|number} value
   * @returns {number}
   */
  static safeFloat(value) {
    if (value === undefined || value === null || value === "") return 0;
    const f = parseFloat(value);
    return isNaN(f) ? 0 : f;
  }
}
