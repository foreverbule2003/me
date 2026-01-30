import { useEffect } from "react";

/**
 * useSwipe Hook
 * Detects swipe gestures for mobile navigation.
 *
 * @param {Object} handlers - Callback functions for swipes
 * @param {Function} [handlers.onSwipeLeft] - Called on swipe left
 * @param {Function} [handlers.onSwipeRight] - Called on swipe right
 * @param {Function} [handlers.onSwipeUp] - Called on swipe up
 * @param {Function} [handlers.onSwipeDown] - Called on swipe down
 * @param {number} [threshold=50] - Minimum distance in pixels to trigger swipe
 */
const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const handleGesture = () => {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Determine major axis
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal Swipe
        if (Math.abs(diffX) > threshold) {
          if (diffX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (diffX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        }
      } else {
        // Vertical Swipe (Optional: might conflict with scroll)
        if (Math.abs(diffY) > threshold) {
          if (diffY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (diffY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);
};

export default useSwipe;
