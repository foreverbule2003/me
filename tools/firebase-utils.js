const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

/**
 * Initializes and returns the Firebase Admin instance.
 * Automatically checks for credentials in:
 * 1. FIREBASE_SERVICE_ACCOUNT (Environment Variable)
 * 2. service-account.json (Project Root)
 * 3. serviceAccountKey.json (Legacy)
 *
 * @returns {admin.app.App} The initialized Firebase Admin app.
 * @throws {Error} If no credentials are found.
 */
function getFirebaseAdmin() {
  // Return existing instance if already initialized
  if (admin.apps.length > 0) {
    return admin;
  }

  let credential = null;

  // 1. Env Var
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      credential = admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
      );
    } catch (e) {
      console.warn("⚠️ [Firebase Utils] Failed to parse env var:", e.message);
    }
  }

  // 2. Local File
  if (!credential) {
    const possibleKeys = ["service-account.json", "serviceAccountKey.json"];
    for (const keyFile of possibleKeys) {
      // Check 1 level up (Project Root) assuming script is in tools/
      const keyPath = path.join(__dirname, "..", keyFile);
      if (fs.existsSync(keyPath)) {
        console.log(`🔑 [Firebase Utils] Loaded credential: ${keyFile}`);
        credential = admin.credential.cert(require(keyPath));
        break;
      }
    }
  }

  if (!credential) {
    throw new Error(
      "❌ 找不到 Firebase 憑證 (service-account.json 或 serviceAccountKey.json 或 FIREBASE_SERVICE_ACCOUNT 環境變數)",
    );
  }

  admin.initializeApp({
    credential,
    projectId: "my-landing-page-2ca68",
  });

  return admin;
}

module.exports = {
  getFirebaseAdmin,
};
