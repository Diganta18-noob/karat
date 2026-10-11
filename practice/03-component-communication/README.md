# Question 3: Communicate between React components

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 20 minutes. Source: React JS!F2:F6, F8:F9, F11:F14, F16 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Build a parent with a SearchInput child and a Results sibling. Typing in SearchInput must filter Results. Add a Clear button inside Results that clears SearchInput. Explain how the same data could reach a deeply nested component through Context, including advantages and disadvantages.

## Start practicing

Open this folder as its own editor workspace using the included `03-component-communication.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Input and results remain synchronized.
- [ ] Clear in the results component clears the input.
- [ ] State has one owner in the nearest shared parent.
- [ ] Children receive data and callbacks through props.
- [ ] Explain parent/child, child/parent, siblings, and Context tradeoffs.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
