import { describe, it, expect } from "vitest";
import { CbCalculatorCore } from "./cb_logic.mjs";

describe("CbCalculatorCore - Math Engine", () => {
  // Example Case: 志聖三 (24673)
  // CB Price: 125, Stock Price: 255, Conversion Price: 246.6
  const sample = {
    cb: 125,
    stock: 255,
    cp: 246.6,
  };

  it("should calculate correct shares per bond", () => {
    const shares = CbCalculatorCore.calculateSharesPerBond(sample.cp);
    expect(shares).toBeCloseTo(405.515, 3);
  });

  it("should calculate correct conversion value", () => {
    const convValue = CbCalculatorCore.calculateConversionValue(
      sample.stock,
      sample.cp,
    );
    // (405.515... * 255) / 1000 = 103.406
    expect(convValue).toBeCloseTo(103.406, 3);
  });

  it("should calculate correct premium rate", () => {
    const premiumRate = CbCalculatorCore.calculatePremiumRate(
      sample.cb,
      sample.stock,
      sample.cp,
    );
    // ((125 - 103.406) / 103.406) * 100 = 20.88%
    expect(premiumRate).toBeCloseTo(20.88, 2);
  });

  it("should calculate correct parity price (break-even)", () => {
    const parity = CbCalculatorCore.calculateParityPrice(sample.cb, sample.cp);
    // 125 * 246.6 / 100 = 308.25
    expect(parity).toBe(308.25);
  });

  it("should calculate correct upside needed", () => {
    const parity = 308.25;
    const upside = CbCalculatorCore.calculateUpsideNeeded(sample.stock, parity);
    // ((308.25 - 255) / 255) * 100 = 20.88%
    expect(upside).toBeCloseTo(20.88, 2);
  });

  it("should return correct moneyness status (ITM)", () => {
    const status = CbCalculatorCore.getMoneynessStatus(255, 246.6);
    expect(status.code).toBe("ITM");
    expect(status.color).toBe("green");
  });

  it("should return correct moneyness status (OTM)", () => {
    const status = CbCalculatorCore.getMoneynessStatus(200, 246.6);
    expect(status.code).toBe("OTM");
    expect(status.color).toBe("slate");
  });

  it("should return correct premium status (High Premium)", () => {
    const status = CbCalculatorCore.getPremiumStatus(25);
    expect(status.colorClass).toBe("red");
    expect(status.status).toContain("HIGH PREMIUM");
  });

  it("should handle invalid inputs gracefully", () => {
    expect(CbCalculatorCore.calculateSharesPerBond(0)).toBe(0);
    expect(CbCalculatorCore.calculateConversionValue(0, 246)).toBe(0);
    expect(CbCalculatorCore.calculatePremiumRate(125, 0, 246)).toBe(0);
  });
});
