# Question 12: Group users by final connection count

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 30 minutes. Source: React JS!F22 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Implement grouping(events, N). CONNECT adds an undirected friendship and DISCONNECT removes it, regardless of name order. Return [users with fewer than N connections, users with N or more]. Include everyone seen, including users with zero final connections. Preserve first-appearance order. Repeated CONNECT and absent DISCONNECT are idempotent for this practice; reject self-connections and unknown event types.

## Start practicing

Open this folder as its own editor workspace using the included `12-social-connections.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` to see a sample run. Edit `answer.js`, then run `npm test` to check your solution.

You can also use `npm run solution` to run the reference example, or `npm run test:solution` to verify it.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Friendships are symmetric.
- [ ] Reversed DISCONNECT removes both directions.
- [ ] Repeated CONNECT does not double count.
- [ ] Zero-connection users remain included.
- [ ] Workbook examples for N=1,3,10 pass; explain complexity in E events.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.

Ordering note: workbook examples list the same members in an order that is not consistently first appearance. These tests use the explicit first-appearance contract above; grouping membership matches the workbook.
