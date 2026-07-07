import { describe, it, expect } from 'vitest';
import { CbCalculatorCore } from './cb-logic.mjs';

describe('CbCalculatorCore', () => {
  describe('calculateTheoreticalPrice (Conversion Value)', () => {
    it('calculates correctly for standard values', () => {
      // Stock: 100, Conv: 100 => 100
      expect(CbCalculatorCore.calculateTheoreticalPrice(100, 100)).toBeCloseTo(100.00);
      // Stock: 120, Conv: 100 => 120
      expect(CbCalculatorCore.calculateTheoreticalPrice(120, 100)).toBeCloseTo(120.00);
      // Stock: 25.5, Conv: 20 => 127.5
      expect(CbCalculatorCore.calculateTheoreticalPrice(25.5, 20)).toBeCloseTo(127.50);
    });

    it('returns 0 for invalid inputs', () => {
      expect(CbCalculatorCore.calculateTheoreticalPrice(0, 100)).toBe(0);
      expect(CbCalculatorCore.calculateTheoreticalPrice(100, 0)).toBe(0); // Zero conv price
      expect(CbCalculatorCore.calculateTheoreticalPrice(null, 100)).toBe(0);
    });
  });

  describe('calculatePremiumRate', () => {
    it('calculates premium correctly', () => {
      // CB: 110, Parity: 100 => 10% premium
      expect(CbCalculatorCore.calculatePremiumRate(110, 100)).toBeCloseTo(10.00);
      // CB: 95, Parity: 100 => -5% discount
      expect(CbCalculatorCore.calculatePremiumRate(95, 100)).toBeCloseTo(-5.00);
      // CB: 100, Parity: 100 => 0%
      expect(CbCalculatorCore.calculatePremiumRate(100, 100)).toBeCloseTo(0.00);
    });

    it('returns 0 if parity is 0', () => {
      expect(CbCalculatorCore.calculatePremiumRate(100, 0)).toBe(0);
    });
  });

  describe('calculateParityPrice (Break-Even Stock Price)', () => {
    it('calculates parity price correctly', () => {
      // CB: 120, Conv: 50
      // Parity Price = (120/100) * 50 = 1.2 * 50 = 60
      expect(CbCalculatorCore.calculateParityPrice(120, 50)).toBeCloseTo(60.00);
    });
  });

  describe('inferUnderlyingCode', () => {
    it('infers 4 digit code from 5 digit CB symbol', () => {
      expect(CbCalculatorCore.inferUnderlyingCode('23301')).toBe('2330');
      expect(CbCalculatorCore.inferUnderlyingCode('68072')).toBe('6807');
    });

    it('returns empty string for invalid input', () => {
      expect(CbCalculatorCore.inferUnderlyingCode('123')).toBe('');
      expect(CbCalculatorCore.inferUnderlyingCode(null)).toBe('');
    });
  });

  describe('calculateSharesPerBond', () => {
    it('calculates shares from par value 100,000', () => {
      // Conv: 246.6 => 100000 / 246.6 = 405.515
      expect(CbCalculatorCore.calculateSharesPerBond(246.6)).toBeCloseTo(405.515, 3);
    });

    it('returns 0 for invalid inputs', () => {
      expect(CbCalculatorCore.calculateSharesPerBond(0)).toBe(0);
      expect(CbCalculatorCore.calculateSharesPerBond(null)).toBe(0);
    });
  });

  describe('golden sample (志聖三 24673)', () => {
    // CB: 125, Stock: 255, Conv: 246.6
    it('reproduces the full calculation chain', () => {
      const convValue = CbCalculatorCore.calculateConversionValue(255, 246.6);
      expect(convValue).toBeCloseTo(103.406, 3);
      expect(CbCalculatorCore.calculatePremiumRate(125, convValue)).toBeCloseTo(20.88, 2);
      expect(CbCalculatorCore.calculateParityPrice(125, 246.6)).toBe(308.25);
    });
  });

  describe('getMoneynessStatus', () => {
    it('classifies moneyness by stock/conversion ratio', () => {
      expect(CbCalculatorCore.getMoneynessStatus(140, 100)).toBe('深度價內 (Deep ITM)');
      expect(CbCalculatorCore.getMoneynessStatus(110, 100)).toBe('價內 (ITM)');
      expect(CbCalculatorCore.getMoneynessStatus(90, 100)).toBe('價外 (OTM)');
      expect(CbCalculatorCore.getMoneynessStatus(70, 100)).toBe('深度價外 (Deep OTM)');
    });
  });

  describe('getPremiumStatus', () => {
    it('classifies premium rates correctly', () => {
      expect(CbCalculatorCore.getPremiumStatus(-6).label).toBe('折價');
      expect(CbCalculatorCore.getPremiumStatus(-2).label).toBe('微折價');
      expect(CbCalculatorCore.getPremiumStatus(0).label).toBe('平價');
      expect(CbCalculatorCore.getPremiumStatus(3).label).toBe('合理');
      expect(CbCalculatorCore.getPremiumStatus(10).label).toBe('溢價');
      expect(CbCalculatorCore.getPremiumStatus(20).label).toBe('高溢價');
    });
  });
});
