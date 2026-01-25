import { CbCalculatorCore } from '../components/CbCalculatorCore.mjs';

// Golden Sample Data (from cb-calculator.html fallback)
const CASE_1 = {
  cbPrice: 125.0,
  stockPrice: 255.0,
  conversionPrice: 246.6,
  expectedShares: 405.5149, // 100000 / 246.6
  expectedConvValue: 103.4063, // 405.5149 * 255 / 1000
  expectedPremium: 20.88, // (125 - 103.406) / 103.406
  expectedParity: 308.25 // 125 * 246.6 / 100
};

console.log("🧪 Testing CbCalculatorCore Module...");

// Test Shares
const shares = CbCalculatorCore.calculateSharesPerBond(CASE_1.conversionPrice);
console.log(`Shares: ${shares.toFixed(4)} (Expected: ${CASE_1.expectedShares})`);

// Test Conversion Value
const convVal = CbCalculatorCore.calculateConversionValue(CASE_1.stockPrice, CASE_1.conversionPrice);
console.log(`Conv Value: ${convVal.toFixed(4)} (Expected: ${CASE_1.expectedConvValue})`);

// Test Premium Rate
const premium = CbCalculatorCore.calculatePremiumRate(CASE_1.cbPrice, CASE_1.stockPrice, CASE_1.conversionPrice);
console.log(`Premium: ${premium.toFixed(2)}% (Expected: ${CASE_1.expectedPremium}%)`);

// Test Parity Price
const parity = CbCalculatorCore.calculateParityPrice(CASE_1.cbPrice, CASE_1.conversionPrice);
console.log(`Parity Price: ${parity.toFixed(2)} (Expected: ${CASE_1.expectedParity})`);

// Test Status
const status = CbCalculatorCore.getPremiumStatus(premium);
console.log(`Status: ${status.status} (Color: ${status.colorClass})`);

if (Math.abs(premium - CASE_1.expectedPremium) < 0.05) {
  console.log("✅ Math Verification Passed!");
} else {
  console.error("❌ Math Logic Discrepancy detected!");
  process.exit(1);
}
