# Question 1: Convert a class component to a function component

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 20 minutes. Source: React JS!F2:F6, F8:F9, F11:F16 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Convert Original.jsx into a function component in App.jsx. Preserve the counter, step prop, document title updates, and interval cleanup. Add a Pause/Resume button. The original is a representative practice snippet because the workbook describes this question without supplying its class code.

## Start practicing

Open this folder as its own editor workspace using the included `01-class-to-function.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Count starts at zero and advances by step once per second.
- [ ] Changing step changes future increments without resetting count.
- [ ] Pause stops increments; Resume continues.
- [ ] Unmounting clears the timer.
- [ ] Explain why the interval uses a functional state updater.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
