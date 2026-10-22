# React practice: Excel snippets only

Start from the Karat project root:

```powershell
cd D:\Antigravity\Karat
npm.cmd run practice:excel -- 01-pagination
```

Open the Local URL printed in the terminal. Stop with Ctrl+C before selecting another exercise.

| Command argument | Question | Excel source |
|---|---|---|
| 01-pagination | Product pagination | React JS!F2 |
| 02-fetch-details | Fetch product details | React JS!F6 |
| 03-context | Context routing | React JS!F16 |
| 04-birthdates | Edit birth dates | React JS!F10 |
| 05-debounce | Debounce | React JS!F27 |
| 06-lazy | Lazy loading | React JS!F27 |
| 07-product-search | Product search | React JS!F27 |
| 08-fetch-users | Fetch users | React JS!F27 |

## Run directly from an exercise folder

```powershell
cd D:\Antigravity\Karat\practice\excel-react\01-pagination
npm.cmd run dev
```

Use the Local URL printed by Vite. Syntax errors appear in the browser overlay and terminal; rendering/request errors appear on the page. Press F12 → Console to see console.log output and full error details. Read the exercise's RUN-GUIDE.md.

## What to edit

- App.jsx: your practice copy of the supplied snippet.
- ORIGINAL.txt: exact extracted code, including Excel quote artifacts.
- QUESTION.md: source question and run command.
- Solution.jsx: separate answer; browser URL /?solution=1 reveals it.

The starters keep the original mistakes. A compile/runtime error can be part of the question. The lazy-loading exercise includes a minimal Dashboard.jsx because the source references that file without providing it. API exercises use the source URLs and need internet; no JSON Server is needed.

F27 debounce, product search, users and lazy loading are separate supplied examples. Debounce's starter stores a delayed value but does not display/use it; the answer displays that value so you can see the timing. Product search, users and lazy loading already have valid basic implementations.

Duplicate workbook versions and truncated snippets are retained in [all original questions](../../EXCEL-QUESTIONS-WITH-CODE-SNIPPETS.md). This set uses one complete source version per React task. Reflow, robots and word wrapping are JavaScript algorithm tasks, not React components, and remain in that source document. Description-only class/reducer/communication prompts do not supply code to practice here.

Your previous practice folders and edits remain saved. They are outside this Excel-only set.
