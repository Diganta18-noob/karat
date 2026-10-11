# Question 6: Repair fetch and render product details

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 30 minutes. Source: React JS!F2, F6, F11:F13, F16, F18 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Fix the custom fetch Hook and product view. Show loading/error states, bold title, category, dollar price with two decimals, discount percentage, description, and an image with alt text. Use the supplied simulated request with configurable failure and delay; it requires no internet. The workbook includes a Fetch/useFetch naming mismatch and missing error handling.

## Start practicing

Open this folder as its own editor workspace using the included `06-fetch-and-product-details.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Loading is shown until the request finishes.
- [ ] HTTP failure produces an error rather than success.
- [ ] Network failure is handled.
- [ ] Changing product quickly never displays an older response as the latest result.
- [ ] Retry works and image/title/price/discount are displayed correctly.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
