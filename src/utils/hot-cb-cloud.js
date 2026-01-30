const admin = require("firebase-admin");

/**
 * Hot CB Cloud Service (Backend/Admin version)
 * 負責將爬取到的數據推送到 Firestore
 */
async function saveSnapshotToCloud(data) {
  const fs = require("fs");
  const path = require("path");

  // Initialize Admin SDK if not already initialized
  if (admin.apps.length === 0) {
    // Try to use the shared util, relative path from src/utils to tools/
    const { getFirebaseAdmin } = require("../../tools/firebase-utils");
    try {
      getFirebaseAdmin();
    } catch (e) {
      console.warn("[Cloud] Firebase init failed in hot-cb-cloud:", e.message);
      // Fallback: If init fails (e.g. no creds), return null to skip cloud save
      return null;
    }
  }

  try {
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
