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
