# Question 9: Edit users across birth-year lists

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

Suggested time: 35 minutes. Source: React JS!F10, F13:F15, F20:F21 in KARAT_Assessment_Question_Template.xlsx.

## Your task

Split users into born before 2000 and born in 2000 or later, sorted by birth date. Add Edit, Apply, and Cancel. Apply changes birthDate and moves the user into the right list. Cancel discards changes. Opening another user discards the previous draft. Only one user may be edited at a time. The workbook labels the second group "after 2000" but its code uses >=2000; this exercise follows the code.

## Start practicing

Open this folder as its own editor workspace using the included `09-edit-user-birthdates.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.

You can also use `npm run solution` to serve the same app and open `/?solution=1`.

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

- [ ] Edit preloads the current date.
- [ ] Apply persists the new date and closes the editor.
- [ ] Changing 1999 to 2001 moves a user between lists.
- [ ] Cancel never changes the saved user.
- [ ] Opening another editor discards the old draft; sorting updates and empty dates cannot be applied.

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
