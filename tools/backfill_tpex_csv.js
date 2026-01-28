const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to download content
function downloadContent(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day.html'
            }
        }, (res) => {
            if (res.statusCode !== 200) {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
                return;
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

function parseCSV(buffer, dateStr) {
    const decoder = new TextDecoder('big5');
    const text = decoder.decode(buffer);
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l);
    
    let headerIndex = -1;
    const records = [];
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('HEADER')) {
            headerIndex = i;
            continue;
        }
        
        if (lines[i].startsWith('BODY') && headerIndex !== -1) {
            const rowStr = lines[i].substring(5);
            const parts = rowStr.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
            const cols = parts.map(p => p.replace(/^"|"$/g, '').trim());
            
            // Filter out empty or header-like rows that might slip in
            if (cols.length < 5 || !cols[0].match(/^\d/)) continue;
            
            // Skip "Negotiated" orders if we only want "Order" (Equivalent) trading?
            // Usually "等價" (Order matching) is the main market. "議價" (Negotiated) is different.
            // Let's keep "等價" only for stats, or keep valid trades.
            // Column 2: Transaction Type.
            if (cols[2] !== '等價') continue;

            // Mapping based on analysis:
            // 0: Code
            // 1: Name
            // 2: Type
            // 3: Close
            // 4: Change
            // 5: Open
            // 6: High
            // 7: Low
            // 8: Tx Count
            // 9: Volume (Bonds)
            // 10: Value (TWD)
            // 11: Avg Price
            // 12: Last Bid?
            // 13: Limit Up
            // 14: Limit Down
            
            const close = parseFloat(cols[3]);
            if (isNaN(close)) continue; // Skip if no close price (no trade)

            records.push({
                date: dateStr,
                code: cols[0],
                name: cols[1],
                close: close,
                change: parseFloat(cols[4]),
                open: parseFloat(cols[5]),
                high: parseFloat(cols[6]),
                low: parseFloat(cols[7]),
                vol_tx: parseInt(cols[8]),
                vol_bonds: parseInt(cols[9]),
                vol_money: parseInt(cols[10].replace(/,/g, '')),
            });
        }
    }
    
    return records;
}

async function fetchDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const yyyymm = `${year}${month}`;
    const yyyymmdd = `${year}${month}${day}`;
    
    const url = `https://www.tpex.org.tw/storage/bond_zone/tradeinfo/cb/${year}/${yyyymm}/RSta0113.${yyyymmdd}-C.csv`;
    
    console.log(`[Task] Fetching ${dateStr}...`);
    
    try {
        const buffer = await downloadContent(url);
        const data = parseCSV(buffer, dateStr);
        console.log(`[Success] Parsed ${data.length} records.`);
        return data;
    } catch (e) {
        if (e.message.includes('404')) {
             console.log(`[Skip] No data for ${dateStr} (404)`);
        } else {
             console.error(`[Error] Failed to fetch ${dateStr}: ${e.message}`);
        }
        return [];
    }
}

async function runBackfill(days = 10) {
    const results = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        // Skip weekends
        if (d.getDay() === 0 || d.getDay() === 6) continue;
        
        const dateStr = d.toISOString().split('T')[0];
        const dayData = await fetchDate(dateStr);
        if (dayData && dayData.length > 0) {
            results.push(...dayData);
        }
        
        // Politeness delay
        await new Promise(r => setTimeout(r, 500));
    }
    
    fs.writeFileSync('tools/tpex_backfill_10days.json', JSON.stringify(results, null, 2));
    console.log(`[Done] Saved ${results.length} total records to tools/tpex_backfill_10days.json`);
}

runBackfill(15); // Check last 15 days to ensure we get 10 trading days
