# Question 8: Explain and repair Context and list bugs

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 25 minutes. Source: React JS!F19; also F16, F20:F21 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Read the intentionally buggy App.jsx, explain its data flow, then fix the office selector, office user list, stable list keys, and selection behavior. This is a reconstructed practice snippet: the workbook names OfficeList/Context/UserList but does not supply a complete original for that exact report.

## Start practicing

Open this folder as its own editor workspace using the included `08-debug-context-and-lists.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Provider and consumer agree on their data shape.
- [ ] Selecting an office displays only its users.
- [ ] Changing office clears selection of a user from the old office.
- [ ] List items use stable IDs.
- [ ] Explain each defect and demonstrate its before/after behavior.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
