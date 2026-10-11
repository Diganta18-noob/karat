# Karat Interview Practice: ProductSearch Debugger

This workspace is set up so you can debug the buggy component, inspect network calls, test edge cases, and practice implementing the fix.

**New laptop / ZIP setup:** [START-HERE.md](START-HERE.md).

**All 13 questions:** [Practice index](practice/README.md), with a separate RUN-GUIDE.md in every folder.

**GitHub publication:** [GITHUB-PUSH-GUIDE.md](GITHUB-PUSH-GUIDE.md).

---

## 🚀 How to Run the Practice Workspace

### 1. Start the Live Interactive Workbench
```bash
npm run dev
```
Open the provided `localhost` URL in your browser.
- **Tab 1: Original Buggy Version** – See the race condition, missing category sync, and uncaught 500 error live.
- **Tab 2: Corrected & Optimized Version** – Verified, production-grade code.
- **Tab 3: Your Practice Playground** – Edit [src/ProductSearchPractice.jsx](src/ProductSearchPractice.jsx) and test your code live.
- **Network Request Monitor** on the right side lets you watch requests get fired, pending, completed, or aborted in real-time.
- **Controls**: Tweak simulated latency (e.g., 1000ms) and toggle simulated HTTP 500 server errors.

### 2. Run the Automated Test Suite
- Run tests against the **fixed solution**:
  ```bash
  npm test
  ```
- Run tests against your **practice file** ([src/ProductSearchPractice.jsx](src/ProductSearchPractice.jsx)):
  ```bash
  npm run test:practice
  ```
- Run tests in watch mode while you code:
  ```bash
  npm run test:watch
  ```

---

## 📁 Key Files
- [src/ProductSearchBuggy.jsx](src/ProductSearchBuggy.jsx) – The unedited buggy code from the prompt.
- [src/ProductSearchFixed.jsx](src/ProductSearchFixed.jsx) – The complete corrected implementation.
- [src/ProductSearchPractice.jsx](src/ProductSearchPractice.jsx) – Empty canvas for your practice.
- [src/ProductSearchFixed.test.jsx](src/ProductSearchFixed.test.jsx) – The 5 core interview test cases in Vitest.
- [src/mockApi.js](src/mockApi.js) – Fetch interception with latency, category filtering, and abort handling.
