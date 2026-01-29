const admin = require("firebase-admin");

/**
 * Hot CB Cloud Service (Backend/Admin version)
 * 負責將爬取到的數據推送到 Firestore
 */
async function saveSnapshotToCloud(data) {
  const fs = require("fs");
  const path = require("path");
  const keyPath = path.join(__dirname, "../../service-account.json");

  const hasEnv =
    process.env.FIREBASE_SERVICE_ACCOUNT ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const hasLocal = fs.existsSync(keyPath);

  if (!hasEnv && !hasLocal) {
    console.warn(
      "[Cloud] No Firebase credentials found (Env/Local). Skipping cloud save.",
    );
    return null;
  }

  try {
    // Initialize Admin SDK if not already initialized
    if (admin.apps.length === 0) {
      let credential;
      // keyPath is already defined above

      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        credential = admin.credential.cert(
          JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
        );
      } else if (fs.existsSync(keyPath)) {
        console.log("[Cloud] Using local service-account.json");
        credential = admin.credential.cert(require(keyPath));
      } else {
        // Fallback to default if available
        credential = admin.credential.applicationDefault();
      }

      admin.initializeApp({
        credential,
        // projectId handled by credential or env
      });
    }

    const db = admin.firestore();

    // 1. Save to daily collection (for history archive)
    // Document ID format: YYYY-MM-DD
    const today = new Date();
    const dateId = today.toISOString().split("T")[0];

    const docRef = db.collection("hot_cb_snapshots").doc(dateId);

    const payload = {
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      lastUpdated: today.toISOString(),
    };

    await docRef.set(payload);
    console.log(
      `[Cloud] Snapshot saved to Firestore: hot_cb_snapshots/${dateId}`,
    );

    // 2. Also update "latest" pointer for quick frontend access
    await db.collection("hot_cb_meta").doc("latest").set({
      lastDateId: dateId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return dateId;
  } catch (error) {
    console.error("[Cloud] Error saving to Firestore:", error.message);
    throw error;
  }
}

async function updateMasterMetadata(items) {
  if (!admin.apps.length) return; // Wait for init
  const db = admin.firestore();
  const batch = db.batch();
  let count = 0;

  items.forEach((item) => {
    if (!item.code) return;
    const ref = db.collection("cb_history").doc(item.code);
    // Only update static fields to avoid overwriting user stockPrice if stale
    batch.set(
      ref,
      {
        name: item.name,
        underlyingCode: item.underlyingCode || "",
        lastUpdated: new Date().toISOString(),
      },
      { merge: true },
    );
    count++;
  });

  if (count > 0) {
    await batch.commit();
    console.log(
      `[Cloud] Updated ${count} items in Master Metadata (cb_history)`,
    );
  }
}

module.exports = {
  saveSnapshotToCloud,
  updateMasterMetadata,
};
