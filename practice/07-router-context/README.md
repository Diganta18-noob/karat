# Question 7: Share navigation through Context

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 30 minutes. Source: React JS!F16, F19:F21 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Replace changeLocation prop passing with RouterContext. Share current location and changeLocation. Wire product list, detail view, and Back through a custom useRouter Hook. Provider must wrap consumers. Use local data for this exercise.

## Start practicing

Open this folder as its own editor workspace using the included `07-router-context.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] List opens the selected product.
- [ ] Back returns to the list.
- [ ] Children access navigation through useRouter.
- [ ] Provider supplies a value object.
- [ ] Explain why a consumer in the same component that returns a provider is outside that provider.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
