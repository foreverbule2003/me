---
description: Run automated smoke tests for the CB Calculator tool to verify critical functionality.
---

1. Open the CB Calculator page
   // turbo
2. Open Browser to "http://localhost:5173/me/tools/cb-calculator.html"

3. Verify Essential Elements
   // turbo
4. Run the following JavaScript in the browser to check for critical IDs:

```javascript
(() => {
  const ids = [
    "stockSearch",
    "cbPrice",
    "stockPrice",
    "conversionPrice",
    "searchDropdown",
    "tickerStatus",
  ];
  const missing = ids.filter((id) => !document.getElementById(id));
  if (missing.length > 0) {
    throw new Error("Missing Critical IDs: " + missing.join(", "));
  }
  return "All critical elements present";
})();
```

5. Test Search Functionality
   // turbo
6. Type "15142" into the element with id "stockSearch"
   // turbo
7. Press "Enter"
   // turbo
8. Wait for 2000ms
   // turbo
9. Run JavaScript to verify data population:

```javascript
(() => {
  const val = document.getElementById("cbPrice").value;
  if (!val || parseFloat(val) <= 0)
    throw new Error("Search failed: CB Price not populated");
  return "Search verified: CB Price is " + val;
})();
```

10. Test Autocomplete Functionality
    // turbo
11. Clear the element with id "stockSearch"
    // turbo
12. Type "3037" into the element with id "stockSearch"
    // turbo
13. Wait for 1000ms
    // turbo
14. Run JavaScript to verify dropdown:

```javascript
(() => {
  const dropdown = document.getElementById("searchDropdown");
  if (
    !dropdown ||
    dropdown.style.display === "none" ||
    dropdown.innerHTML === ""
  ) {
    throw new Error("Autocomplete failed: Dropdown not visible or empty");
  }
  return "Autocomplete verified";
})();
```

15. Report Success
