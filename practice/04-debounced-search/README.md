# Question 4: Optimize product search with debounce

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 25 minutes. Source: React JS!F3:F4, F8:F9, F11, F15:F16 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Optimize the product search so the input updates immediately but filtering uses the latest query only after 300 ms without typing. Make the filtering case insensitive. Explain how you would prevent stale results if filtering became a network request.

## Start practicing

Open this folder as its own editor workspace using the included `04-debounced-search.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Input remains responsive while typing.
- [ ] Results update after 300 ms of idle time.
- [ ] Rapid typing cancels older timers.
- [ ] Clearing the query restores all products after the delay.
- [ ] Explain debounce versus throttle, and cancellation versus memoization.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
