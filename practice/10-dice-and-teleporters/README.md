# Question 10: Find destinations after one die roll

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 25 minutes. Source: React JS!F4, F8:F9 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Implement possibleSquares(teleporters, dieSides, start, lastSquare). Teleporters are strings such as "3,1". For every possible roll, advance and follow at most ONE teleporter. Return unique destinations sorted numerically. The workbook does not specify overshoots: for this practice, ignore rolls landing beyond lastSquare. Teleporter endpoints are valid board squares and starts are unique.

## Start practicing

Open this folder as its own editor workspace using the included `10-dice-and-teleporters.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` to see a sample run. Edit `answer.js`, then run `npm test` to check your solution.

You can also use `npm run solution` to run the reference example, or `npm run test:solution` to verify it.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] All possible die outcomes are considered.
- [ ] Only one teleport is followed, even if its endpoint starts another.
- [ ] Duplicate destinations collapse.
- [ ] Overshoots are ignored under the stated practice rule.
- [ ] Explain time and space complexity.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
