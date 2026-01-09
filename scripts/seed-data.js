const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
  console.log("🚀 Starting data seed...");

  const trips = [
    {
      id: "2025-cebu",
      data: {
        title: "2025 CEBU (宿霧)",
        status: "PLANNING",
        date: "2025-01-XX",
        sortDate: "2025-01-20",
        members: ["Tim", "Friends"],
        budget: 30000,
        currency: "TWD",
      },
    },
    {
      id: "2026-ise-shima",
      data: {
        title: "2026 Ise-Shima (伊勢志摩)",
        status: "DRAFT",
        date: "2026-XX-XX",
        sortDate: "2026-06-01",
        description: "Solaniwa Onsen pure enjoyment version",
        budget: 50000,
        currency: "TWD",
      },
    },
    {
      id: "2025-osaka",
      data: {
        title: "2025 Osaka (大阪)",
        status: "CONFIRMED",
        date: "2025-08-28",
        sortDate: "2025-08-28",
        description: "Summer Trip (Kyoto/Osaka/Nara)",
        budget: 45000,
        currency: "TWD",
      },
    },
    {
      id: "2026-hokkaido",
      data: {
        title: "2026 Hokkaido (北海道)",
        status: "PLANNING",
        date: "2026-Winter",
        sortDate: "2026-12-01",
        description: "Winter Trip",
        budget: 60000,
        currency: "TWD",
      },
    },
  ];

  for (const trip of trips) {
    try {
      await setDoc(doc(db, "trips", trip.id), trip.data);
      console.log(`✅ Written trip: ${trip.id}`);
    } catch (e) {
      console.error(`❌ Error writing ${trip.id}:`, e);
    }
  }

  console.log("✨ Seeding completed!");
  process.exit(0);
}

seedData();
