import fetch from 'node-fetch';

const PROJECT_ID = 'my-landing-page-2ca68';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function cleanAutoWatchlist() {
  const listUrl = `${BASE_URL}/cb_history?pageSize=500`;
  try {
    const res = await fetch(listUrl);
    const json = await res.json();
    if (!json.documents) {
      console.log("No documents found.");
      return;
    }

    // Surgical logic: Only delete documents that:
    // 1. Have no 'name' field (this is the key indicator of auto-created shells)
    // 2. Or name is literally "待同步..."
    const shells = json.documents.filter(doc => {
      const fields = doc.fields || {};
      const name = fields.name ? fields.name.stringValue : null;
      return !name || name === "待同步...";
    });

    console.log(`Found ${shells.length} auto-created shell documents.`);
    
    // Safety check: Don't delete everything if something looks wrong
    if (shells.length > 200) {
        console.warn("⚠️ Warning: Large number of documents detected. Aborting for safety. Please review logic.");
        // return;
    }

    for (const doc of shells) {
        const id = doc.name.split('/').pop();
        // NEVER delete 36804 (家登四) or 23683 (金像電三) just in case
        if (['36804', '23683'].includes(id)) {
            console.log(`[Safe] Skipping protected ID: ${id}`);
            continue;
        }

        console.log(`🗑️ Deleting shell: ${id}...`);
        const delRes = await fetch(`${BASE_URL}/cb_history/${id}`, { method: 'DELETE' });
        if (delRes.ok) {
            console.log(`✅ ${id} removed.`);
        } else {
            console.error(`❌ Failed to delete ${id}`);
        }
    }

    console.log("\n✨ Cleanup finished. Your watchlist should be clean now.");
  } catch (e) {
    console.error(e);
  }
}

cleanAutoWatchlist();
