const puppeteer = require('puppeteer');

const TARGET_URL = 'http://localhost:5173/me/tools/archive/cb-calculator-standalone.html';

async function runTest() {
  console.log('🚀 Launching Headless Browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Enable console log from page
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    console.log(`🌐 Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Step 1: Input Stock Code
    console.log('⌨️ Typing 30371...');
    await page.waitForSelector('#stockSearch');
    await page.type('#stockSearch', '30371');

    // Step 2: Select from Dropdown
    console.log('⏳ Waiting for dropdown...');
    try {
        await page.waitForSelector('.autocomplete-item', { timeout: 5000 });
        console.log('✅ Dropdown appeared, clicking first item...');
        await page.click('.autocomplete-item');
    } catch (e) {
        console.log('⚠️ Dropdown not found (maybe auto-searched?), checking loading state...');
    }

    // Step 3: Wait for Chart
    console.log('⏳ Waiting for chart to render...');
    await page.waitForSelector('#premiumChart', { visible: true, timeout: 10000 });
    
    // Check if chart class contains hidden
    const isHidden = await page.$eval('#premiumChart', el => el.classList.contains('hidden'));
    if (isHidden) throw new Error('Chart canvas is hidden!');
    console.log('✅ Chart Canvas is Visible!');

    // Step 4: Click MAX Button
    console.log('🖱️ Clicking MAX Button...');
    const maxBtn = await page.waitForSelector('.range-btn[data-range="all"]');
    await maxBtn.click();
    console.log('✅ MAX Button Clicked');

    // Wait for update
    await new Promise(r => setTimeout(r, 1000));
    
    // Get Chart Data Info text
    const infoText = await page.$eval('#chartDataInfo', el => el.textContent);
    console.log(`📊 Chart Info: ${infoText}`);

    if (infoText.includes('0 筆')) {
         console.warn('⚠️ Chart shows 0 data points (maybe mock data didn\'t load?)');
    } else {
         console.log('✅ Chart contains data!');
    }

    console.log('🎉 TEST PASSED: Setup complete without crash.');

  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
