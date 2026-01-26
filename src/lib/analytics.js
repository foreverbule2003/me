import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals";
import { firebaseConfig } from "./firebase-config";

// Singleton instances
let app = null;
let analytics = null;

/**
 * Initialize Firebase Analytics and Web Vitals monitoring
 */
export const initAnalytics = () => {
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      analytics = getAnalytics(app);
      console.log("[Analytics] Firebase Analytics initialized");

      // Start Web Vitals monitoring
      initWebVitals();
    } catch (e) {
      console.warn("[Analytics] Initialization failed:", e);
    }
  }
  return { app, analytics };
};

/**
 * Report Web Vitals to Google Analytics
 */
const sendToAnalytics = ({ name, delta, id }) => {
  if (analytics) {
    logEvent(analytics, "web_vitals", {
      event_category: "Web Vitals",
      event_action: name,
      event_value: Math.round(name === "CLS" ? delta * 1000 : delta), // CLS need integer
      event_label: id,
      non_interaction: true,
    });
    // Also log specific metrics as separate events for easier dashboarding
    logEvent(analytics, name, {
      value: Math.round(name === "CLS" ? delta * 1000 : delta),
      metric_id: id,
    });
  }
};

/**
 * Monitor Core Web Vitals
 */
export const initWebVitals = () => {
  try {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    console.log("[Analytics] Web Vitals observer started");
  } catch (e) {
    console.warn("[Analytics] Failed to start Web Vitals:", e);
  }
};

// Helper to log custom events
export const logCustomEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};
