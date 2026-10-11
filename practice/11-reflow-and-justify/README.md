# Question 11: Reflow and justify text

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 35 minutes. Source: React JS!F7 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Implement reflowAndJustify(lines, maxWidth). Join the original lines into words, greedily fit them into new lines, and use hyphens between words to reach the width. Spread gaps as equally as possible, assigning extra hyphens to earlier gaps. Single-word lines are not padded, including the last line. Unlike typical text-justification tasks, the final multiword line IS justified. For this practice, reject a word longer than maxWidth; the workbook leaves that case unspecified.

## Start practicing

Open this folder as its own editor workspace using the included `11-reflow-and-justify.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` to see a sample run. Edit `answer.js`, then run `npm test` to check your solution.

You can also use `npm run solution` to run the reference example, or `npm run test:solution` to verify it.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Word order is preserved.
- [ ] Every multiword line has exact maxWidth.
- [ ] Earlier gaps receive extra separators.
- [ ] Single-word lines remain unpadded.
- [ ] Empty input and long-word policy are handled.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
