/**
 * cb_logic.mjs
 *
 * 核心計算引擎 (The Engine)
 * Unified for both Finance Tools and War Room.
 *
 * @version 1.1.0
 * @last_updated 2026-01-30
 */

export const CbCalculatorCore = {
  /**
   * 計算每張可轉債可轉換的股數
   * Formula: 100,000 / Conversion Price
   * @param {number} conversionPrice
   * @returns {number}
   */
  calculateSharesPerBond(conversionPrice) {
    if (!conversionPrice || conversionPrice <= 0) return 0;
    return 100000 / conversionPrice;
  },

  /**
   * 計算轉換價值 (Conversion Value)
   * Formula: (Shares * Stock Price) / 1000
   * @param {number} stockPrice
   * @param {number} conversionPrice
   * @returns {number}
   */
  calculateConversionValue(stockPrice, conversionPrice) {
    const shares = this.calculateSharesPerBond(conversionPrice);
    return (shares * stockPrice) / 1000;
  },

  /**
   * 計算轉換溢價率 (Premium Rate)
   * Formula: ((CB Price - Conversion Value) / Conversion Value) * 100
   * @param {number} cbPrice
   * @param {number} stockPrice
   * @param {number} conversionPrice
   * @returns {number} Percentage
   */
  calculatePremiumRate(cbPrice, stockPrice, conversionPrice) {
    const convValue = this.calculateConversionValue(stockPrice, conversionPrice);
    if (!convValue || convValue <= 0) return 0;
    return ((cbPrice - convValue) / convValue) * 100;
  },

  /**
   * 計算損益平衡股價 (Parity Price / Break-even Price)
   * Formula: CB Price * Conversion Price / 100
   * @param {number} cbPrice
   * @param {number} conversionPrice
   * @returns {number}
   */
  calculateParityPrice(cbPrice, conversionPrice) {
    if (!conversionPrice) return 0;
    return (cbPrice * conversionPrice) / 100;
  },

  /**
   * 計算需上漲幅度 (Upside Needed)
   * Formula: ((Parity Price - Stock Price) / Stock Price) * 100
   * @param {number} stockPrice
   * @param {number} parityPrice
   * @returns {number}
   */
  calculateUpsideNeeded(stockPrice, parityPrice) {
    if (!stockPrice || stockPrice <= 0) return 0;
    return ((parityPrice - stockPrice) / stockPrice) * 100;
  },

  /**
   * 取得價內外狀態 (Moneyness Status)
   */
  getMoneynessStatus(stockPrice, conversionPrice) {
    if (!stockPrice || !conversionPrice) return null;

    const diff = stockPrice - conversionPrice;
    const percent = (diff / conversionPrice) * 100;

    if (percent > 2) {
      return {
        code: "ITM",
        status: "價內 (ITM)",
        color: "green",
        desc: "IN THE MONEY: 股價高於轉換價",
        percent: percent,
      };
    } else if (percent < -2) {
      return {
        code: "OTM",
        status: "價外 (OTM)",
        color: "slate",
        desc: "OUT OF THE MONEY: 股價低於轉換價",
        percent: percent,
      };
    } else {
      return {
        code: "ATM",
        status: "價平 (ATM)",
        color: "amber",
        desc: "AT THE MONEY: 股價接近轉換價",
        percent: percent,
      };
    }
  },

  /**
   * 取得溢價率狀態描述
   */
  getPremiumStatus(premiumRate) {
    if (premiumRate < 0) {
      return {
        status: "DISCOUNT / 折價",
        colorClass: "indigo",
        desc: "CB 價格低於轉換價值。目前處於折價狀態，具有套利空間。",
      };
    } else if (premiumRate <= 10) {
      return {
        status: "LOW PREMIUM / 低溢價",
        colorClass: "green",
        desc: "溢價程度低。價格合理，與標的股價連動性極高。",
      };
    } else if (premiumRate <= 20) {
      return {
        status: "MID PREMIUM / 中溢價",
        colorClass: "amber",
        desc: "溢價程度中等。股價波動對 CB 影響力尚可，需留意追價風險。",
      };
    } else {
      return {
        status: "HIGH PREMIUM / 高溢價",
        colorClass: "red",
        desc: "溢價程度偏高。CB 價格包含過多權利金，股價上漲時跟漲幅度受限。",
      };
    }
  },
};
