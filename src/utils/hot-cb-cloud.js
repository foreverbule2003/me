const admin = require("firebase-admin");

/**
 * Hot CB Cloud Service (Backend/Admin version)
 * 負責將爬取到的數據推送到 Firestore
 */
async function saveSnapshotToCloud(data) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn("[Cloud] No Firebase credentials found. Skipping cloud save.");
    return null;
  }

  try {
    // Initialize Admin SDK if not already initialized
    if (admin.apps.length === 0) {
      let credential;
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
      } else {
        // Fallback to default if available
        credential = admin.credential.applicationDefault();
      }

      admin.initializeApp({
        credential,
        projectId: "my-landing-page-2ca68" // Match config from src/lib/firebase.js
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
      lastUpdated: today.toISOString()
    };

    await docRef.set(payload);
    console.log(`[Cloud] Snapshot saved to Firestore: hot_cb_snapshots/${dateId}`);

    // 2. Also update "latest" pointer for quick frontend access
    await db.collection("hot_cb_meta").doc("latest").set({
        lastDateId: dateId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return dateId;
  } catch (error) {
    console.error("[Cloud] Error saving to Firestore:", error.message);
    throw error;
  }
}

module.exports = {
  saveSnapshotToCloud
};
