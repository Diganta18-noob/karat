# Question 5: Paginate products ten at a time

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 30 minutes. Source: React JS!F2:F3, F5, F12:F15, F17, F19 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Add frontend pagination to a list of 25 local products. Display 10 per page, Previous and Next buttons, and the current page number. Selecting a product shows its details; Back returns to the same page. No API call is required for this variant.

## Start practicing

Open this folder as its own editor workspace using the included `05-product-pagination.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Pages show 10, 10, and 5 products.
- [ ] Previous is disabled on page 1; Next is disabled on page 3.
- [ ] There are no duplicates or skipped products.
- [ ] Opening details and returning preserves the page.
- [ ] Explain API pagination versus slicing a fetched subset.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
