/**
 * Shared Utility Functions
 * Common helpers for performance monitoring and formatting.
 */

/**
 * Wraps a fetch call with performance timing logging.
 * @param {string} url - The URL to fetch.
 * @param {object} options - Fetch options.
 * @returns {Promise<Response>} - The fetch response.
 */
export const measureFetch = async (url, options = {}) => {
  const start = performance.now();
  try {
    const res = await fetch(url, options);
    return res;
  } finally {
    const duration = performance.now() - start;
    if (duration > 3000)
      console.warn(`[Perf] Slow fetch: ${url} (${duration.toFixed(0)}ms)`);
  }
};

/**
 * Wraps a Firestore operation with performance timing logging.
 * @param {string} label - Label for the operation.
 * @param {function} operation - Async function to execute.
 * @returns {Promise<any>} - The result of the operation.
 */
export const measureFirestore = async (label, operation) => {
  const start = performance.now();
  try {
    return await operation();
  } finally {
    const duration = performance.now() - start;
    // Log only if significant delay
    if (duration > 500) {
      console.debug(`[Firestore] ${label} took ${duration.toFixed(0)}ms`);
    }
  }
};

/**
 * Formats a date string to YYYY-MM-DD.
 * @param {string|Date} date - Date to format.
 * @returns {string} - Formatted date string or "--".
 */
export const formatDate = (date) => {
  if (!date) return "--";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "--";
  return d.toISOString().split("T")[0];
};
