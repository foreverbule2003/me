const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * CB 歷史資料抓取工具 (API 版 - 強健型)
 * 解決 2026/01 斷層與 UI 操作不穩定問題
 */

// 配置
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data', 'history');
const DB_PATH = path.join(__dirname, '..', 'public', 'data', 'cb-data.json');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 獲取從指定日期(since)到現在的月份區間
// since: YYYY-MM-DD (e.g., 2026-01-15)
function getMonthsSince(sinceDateStr) {
    const months = [];
    const now = new Date();
    
    // Default: 6 months
    let startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    
    if (sinceDateStr) {
        const since = new Date(sinceDateStr);
        if (!isNaN(since.getTime())) {
            startDate = new Date(since.getFullYear(), since.getMonth(), 1);
        }
    }
    
    // Ensure we don't go into the future
    let current = new Date(startDate);
    while (current <= now) {
        const rocY = current.getFullYear() - 1911;
        const mm = (current.getMonth() + 1).toString().padStart(2, '0');
        months.push(`${rocY}/${mm}`);
        current.setMonth(current.getMonth() + 1);
    }
    
    return months;
}

const CB_CODE = process.argv[2];
const SINCE_DATE = process.argv[3]; // Optional: YYYY-MM-DD

if (!CB_CODE) {
    console.error('Usage: node fetch-cb-history.js <CB_CODE> [SINCE_DATE]');
    process.exit(1);
}

(async () => {
    console.log(`[Start] Fetching history for CB: ${CB_CODE}`);
    
    // 讀取資料庫
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const cbInfo = db.items.find(i => i.code === CB_CODE);
    if (!cbInfo) {
        console.error(`Error: CB ${CB_CODE} not found in database.`);
        process.exit(1);
    }
    const stockCode = cbInfo.underlyingCode;
    const convPrice = cbInfo.conversionPrice;
    console.log(`[Info] Found CB: ${cbInfo.name}, Underlying: ${stockCode}, ConvPrice: ${convPrice}`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const historyMap = new Map();
    const months = getMonthsSince(SINCE_DATE);
    console.log(`[Config] Target months: ${months.join(', ')}`);

    try {
        // --- Step 1: Fetch CB Data (TPEx) via Direct API ---
        console.log(`[Step 1] Fetching CB data from TPEx API for ${months.join(', ')}...`);
        
        // 先去一次首頁確保 Session
        await page.goto('https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day-quotes.html', { waitUntil: 'networkidle0' });

        let consecutiveErrors = 0;

        for (const rocMonth of months) {
            // Circuit Breaker: Stop if too many errors
            if (consecutiveErrors >= 3) {
                console.error(`[Stop] Aborting due to ${consecutiveErrors} consecutive API errors. (Likely blocked)`);
                break;
            }

            const [ry, rm] = rocMonth.split('/');
            const yearAD = parseInt(ry) + 1911;
            const monthInt = parseInt(rm);
            const dateParam = `${yearAD}/${rm}/01`;

            console.log(`  Querying CB API: ${yearAD}/${rm}...`);
            try {
                const json = await page.evaluate(async (date, code) => {
                    const formData = new URLSearchParams();
                    formData.append('date', date);
                    formData.append('code', code);
                    formData.append('id', '');
                    formData.append('response', 'json');
                    
                    const resp = await fetch('https://www.tpex.org.tw/www/zh-tw/bond/cbDayQry', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formData.toString()
                    });
                    const text = await resp.text();
                    try {
                        return JSON.parse(text);
                    } catch(e) {
                         return { error: true, msg: text.substring(0, 200) };
                    }
                }, dateParam, CB_CODE);

                if (json.error) {
                    console.error(`    API Error: ${json.msg.replace(/\n/g, ' ')}...`);
                    consecutiveErrors++;
                    continue;
                }

                // Log raw response for debugging
                if (!json.aaData && !json.tables && !json.reportDate) {
                     console.log(`    [Debug] Raw Response structure invalid:`, JSON.stringify(json).substring(0, 200));
                }

                let rows = [];
                if (json.aaData) rows = json.aaData;
                else if (json.reportDate) rows = json.aaData; 
                else if (json.tables && json.tables.length > 0) rows = json.tables[0].data; // Restore this! 

                if (rows && rows.length > 0) {
                    console.log(`    Got ${rows.length} records.`);
                    consecutiveErrors = 0; // Reset on success

                    rows.forEach(row => {
                         const dStr = row[0]; 
                         let dateStr = "";
                         if (dStr.includes('/')) {
                             const [dy, dm, dd] = dStr.split('/');
                             dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
                         } else if (dStr.length === 7) {
                             dateStr = `${parseInt(dStr.substring(0, 3)) + 1911}-${dStr.substring(3, 5)}-${dStr.substring(5, 7)}`;
                         }
                         
                         let close = parseFloat(row[6]?.replace(/,/g, '')); // Standard Close
                         
                         if (!isNaN(close) && dateStr) {
                             if (!historyMap.has(dateStr)) historyMap.set(dateStr, { date: dateStr });
                             historyMap.get(dateStr).cbPrice = close;
                         }
                    });
                } else {
                    console.log(`    No data for ${rocMonth}. Raw: ${JSON.stringify(json).substring(0, 100)}...`);
                }
            } catch (e) {
                console.log(`    Error fetching ${rocMonth}:`, e.message);
            }
            await new Promise(r => setTimeout(r, 1000));
        }

        // --- Step 2: Fetch Stock Data (TWSE/TPEx) ---
        console.log(`[Step 2] Fetching Stock data for ${stockCode}...`);
        for (const rocMonth of months) {
            const [ry, rm] = rocMonth.split('/');
            const year = parseInt(ry) + 1911;
            const yyyymmdd = `${year}${rm}01`;

            console.log(`  Querying Stock: ${yyyymmdd}...`);
            console.log(`  Querying Stock: ${yyyymmdd}...`);
            
            let stockFound = false;

            // --- Attempt 1: TWSE ---
            try {
                const twseUrl = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${yyyymmdd}&stockNo=${stockCode}`;
                await page.goto(twseUrl, { waitUntil: 'networkidle0' });
                const text = await page.evaluate(() => document.body.innerText);
                let json;
                try { json = JSON.parse(text); } catch(e) {
                    console.log(`    [Debug] TWSE JSON Parse Error: ${e.message}`);
                    // console.log(`    [Debug] Raw: ${text.substring(0, 100)}...`);
                }

                if (json && json.stat === 'OK' && json.data) {
                    console.log(`    Got ${json.data.length} records (TWSE).`);
                    stockFound = true;
                    json.data.forEach(row => {
                        const [dy, dm, dd] = row[0].split('/');
                        const dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
                        const close = parseFloat(row[6].replace(/,/g, ''));
                        if (!historyMap.has(dateStr)) historyMap.set(dateStr, { date: dateStr });
                        historyMap.get(dateStr).stockPrice = close;
                    });
                } else if (json) {
                    console.log(`    [Debug] TWSE Valid JSON but no data: stat=${json.stat}`);
                }
            } catch (e) {
                console.log(`    TWSE failed: ${e.message}`);
            }

            // --- Attempt 2: TPEx (Fallback) ---
            if (!stockFound) {
                try {
                    const tpexUrl = `https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43_result.php?d=${ry}/${rm}&stkno=${stockCode}&json=1`;
                    
                    // Fix: Use page.goto with headers to avoid CORS issues from TWSE domain
                    await page.setExtraHTTPHeaders({
                        'Referer': 'https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43.php?l=zh-tw'
                    });
                    
                    await page.goto(tpexUrl, { waitUntil: 'networkidle0' });
                    const text = await page.evaluate(() => document.body.innerText);
                    
                    let tpexJson;
                    try { tpexJson = JSON.parse(text); } catch(e) {
                         console.log(`    [Debug] TPEx Stock JSON Parse Error: ${e.message}`);
                    }

                    if (tpexJson && tpexJson.aaData && tpexJson.aaData.length > 0) {
                        console.log(`    Got ${tpexJson.aaData.length} records (TPEx Stock).`);
                        stockFound = true; // Mark as found
                        tpexJson.aaData.forEach(row => {
                            const [dy, dm, dd] = row[0].split('/');
                            const dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
                            const close = parseFloat(row[6].replace(/,/g, ''));
                            if (!historyMap.has(dateStr)) historyMap.set(dateStr, { date: dateStr });
                            historyMap.get(dateStr).stockPrice = close;
                        });
                    } else if (tpexJson) {
                         console.log(`    [Debug] TPEx Stock valid JSON but no data.`);
                    }
                } catch (e) {
                    console.log(`    TPEx Stock failed: ${e.message}`);
                }
            }
            
            await new Promise(r => setTimeout(r, 1000));
        }

        // --- Step 3: Merge & Save ---
        console.log(`[Step 3] Finalizing ${historyMap.size} records...`);
        const resultList = [];
        const sortedDates = Array.from(historyMap.keys()).sort();

        sortedDates.forEach(date => {
            const item = historyMap.get(date);
            // Relaxed condition: Save even if only CB price exists
            if (item.cbPrice) {
                let premium = null;
                let stockPrice = item.stockPrice || null;

                if (stockPrice) {
                    const parity = (100 / convPrice) * stockPrice;
                    premium = ((item.cbPrice - parity) / parity) * 100;
                }

                resultList.push({
                    date: item.date,
                    cbPrice: parseFloat(item.cbPrice.toFixed(2)),
                    stockPrice: stockPrice,
                    premium: premium ? parseFloat(premium.toFixed(2)) : null
                });
            }
        });

        console.log(`  Generated ${resultList.length} merged records.`);
        const outFile = path.join(OUTPUT_DIR, `${CB_CODE}.json`);
        
        // [Incremental] Read existing file if present
        let existingData = [];
        if (fs.existsSync(outFile)) {
             try {
                 existingData = JSON.parse(fs.readFileSync(outFile, 'utf8'));
                 console.log(`[Merge] Loaded ${existingData.length} existing records.`);
             } catch(e) { console.warn('[Merge] Failed to read existing JSON, starting fresh.'); }
        }
        
        // Merge Map from existing data
        existingData.forEach(item => {
            // New data takes precedence (overwrite logic) or Old data (keep logic)?
            // Here we prioritize NEW fetch results for the overlapping dates, keep old for others.
            if (!historyMap.has(item.date)) {
                // Reconstruct format to match map values for sorting
                historyMap.set(item.date, item);
            }
        });

        // Final Sort & Dedupe
        const finalSorted = Array.from(historyMap.values())
            .map(item => {
                 // Format normalization if needed (existing JSON has clean data)
                 return {
                    date: item.date,
                    cbPrice: item.cbPrice,
                    stockPrice: item.stockPrice,
                    premium: item.premium
                 };
            })
            .sort((a,b) => new Date(a.date) - new Date(b.date));

        fs.writeFileSync(outFile, JSON.stringify(finalSorted, null, 2));
        console.log(`  Successfully saved ${finalSorted.length} records to ${outFile}`);

    } catch (e) {
        console.error('[Fatal Error] Runtime failed:', e);
    } finally {
        await browser.close();
    }
})();
