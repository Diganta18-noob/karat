# Question 2: Complete and explain a reducer

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 20 minutes. Source: React JS!F2:F6, F8:F9, F11:F16 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Complete the reducer for a cart. Support add, increment, decrement, remove, and clear. Adding an existing product increases its quantity. Decrementing quantity 1 removes the item. Keep updates immutable. This cart is a representative practice scenario; the workbook does not include its original reducer snippet.

## Start practicing

Open this folder as its own editor workspace using the included `02-use-reducer.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Every button dispatches an action with the right payload.
- [ ] Adding the same product creates one row with higher quantity.
- [ ] Removing and clearing work.
- [ ] Previous state objects are never mutated.
- [ ] Explain useReducer versus useState and the role of dispatch.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
