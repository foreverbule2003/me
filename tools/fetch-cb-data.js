const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../public/data/cb-data.json');

async function updateAllData() {
    try {
        console.log("Reading cb-data.json...");
        let db = { items: [] };
        if (fs.existsSync(DATA_FILE)) {
             const rawData = fs.readFileSync(DATA_FILE, 'utf8');
             db = JSON.parse(rawData);
        }

        const items = db.items || [];
        if (items.length === 0) {
            console.log("No items to update.");
            return;
        }

        // 1. Fetch Real-time Prices via MIS API (Works reliably)
        console.log("Fetching Real-time Prices from TWSE MIS...");
        const queries = [];
        items.forEach(item => {
            queries.push(`otc_${item.code}.tw`);
            queries.push(`tse_${item.underlyingCode}.tw`);
            queries.push(`otc_${item.underlyingCode}.tw`);
        });

        const queryStr = queries.join('|');
        const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${queryStr}&json=1&delay=0`;
        
        const misRes = await fetch(url);
        const misJson = await misRes.json();
        
         if (misJson.msgArray) {
            let priceUpdated = 0;
            items.forEach(item => {
                 // CB Quote
                const cbQuote = misJson.msgArray.find(q => q.c === item.code);
                if (cbQuote) {
                    let price = parseFloat(cbQuote.z); 
                    if (isNaN(price)) {
                         const ask = parseFloat(cbQuote.a?.split('_')[0]);
                         const bid = parseFloat(cbQuote.b?.split('_')[0]);
                         if (!isNaN(ask) && !isNaN(bid)) price = (ask + bid) / 2;
                         else price = parseFloat(cbQuote.y); 
                    }
                    
                    if (!isNaN(price)) {
                        item.cbPrice = price;
                        priceUpdated++;
                    }
                }

                // Underlying Stock Quote
                const stockQuote = misJson.msgArray.find(q => q.c === item.underlyingCode);
                if (stockQuote) {
                    let price = parseFloat(stockQuote.z);
                    if (isNaN(price)) price = parseFloat(stockQuote.y);
                    
                    if (!isNaN(price)) {
                        item.stockPrice = price;
                        priceUpdated++;
                    }
                }
            });
            console.log(`Updated ${priceUpdated} market prices locally.`);
        }

        // 2. Conversion Price Note
        console.log("\nNote: 'Conversion Price' is maintained in cb-data.json.");
        console.log("TPEx automated fetching is blocked by anti-bot protection.");
        console.log("Please manually verify Conversion Prices during ex-dividend events.");

        // Save
        db.updatedAt = new Date().toISOString();
        fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
        console.log("Done. cb-data.json saved.");

    } catch (error) {
        console.error("Error updating data:", error);
    }
}

updateAllData();
