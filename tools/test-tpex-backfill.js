const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const crypto = require('crypto');

// Fix for environments where $HOME is not set
if (!process.env.HOME && process.env.USERPROFILE) {
    process.env.HOME = process.env.USERPROFILE;
}

function getUrlHash(url) {
    return crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
}

async function fetchTpexDaily(dateStr) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        
        console.log("[TPEX] Setting up request interception...");
        await page.setRequestInterception(false); // We don't need to intercept, just listen
        
        page.on('response', async response => {
            const url = response.url();
            const status = response.status();
            const contentType = response.headers()['content-type'] || '';
            
            if (status === 200 && contentType.includes('application/json')) {
                console.log(`[JSON Response] ${url}`);
                try {
                    const data = await response.json();
                    const hash = getUrlHash(url);
                    const filename = `tools/tpex_api_${hash}.json`;
                    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
                    console.log(`✅ JSON saved to ${filename} (URL: ${url.substring(0, 100)})`);
                    
                    if (data.aaData) {
                        fs.writeFileSync("tools/tpex_final_data.json", JSON.stringify(data, null, 2));
                        console.log("🌟 Found aaData! Saved to tools/tpex_final_data.json");
                    }
                } catch (e) {
                    // console.error(`[JSON Error] ${url}: ${e.message}`);
                }
            }
        });

        console.log("[TPEX] Navigating to page...");
        await page.goto("https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day-quotes.html", { waitUntil: "networkidle2" });

        // Wait for potential auto-load
        await new Promise(r => setTimeout(r, 2000));

        console.log("[TPEX] Attempting to click search button...");
        try {
            const clicked = await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button, a, input[type="button"]'));
                const btn = buttons.find(b => b.textContent.includes('查詢') || (b.value && b.value.includes('查詢')));
                if (btn) {
                    btn.click();
                    return "Clicked button by text '查詢'";
                }
                const commonBtn = document.querySelector('.btn-query, .btn-search, #btnQuery');
                if (commonBtn) {
                    commonBtn.click();
                    return "Clicked button by common selector";
                }
                return "Search button not found";
            });
            console.log(`[TPEX] Click result: ${clicked}`);
        } catch (e) {
            console.error(`[TPEX] Click error: ${e.message}`);
        }

        // Wait longer for any late AJAX
        console.log("[TPEX] Waiting 10s for data...");
        await new Promise(r => setTimeout(r, 10000));

        return null;
    } catch (e) {
        console.error(`[Fatal] ${e.message}`);
        return null;
    } finally {
        await browser.close();
    }
}

(async () => {
    await fetchTpexDaily("2026/01/23");
})();
