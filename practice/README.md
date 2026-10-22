# Practice index

## Current: Excel React snippets only

[Open the Excel-only practice set](excel-react/README.md). Edit the actual supplied snippets and check the separate answers.

```powershell
cd D:\Antigravity\Karat
npm.cmd run practice:excel -- 01-pagination
```

## Previous demo workspaces (saved)

# Karat interview practice workspaces

Each question has its own folder and editor workspace. Open a folder, read README.md, edit its starter, and check the acceptance list before revealing its solution.

| Question | Workspace | Time |
|---|---|---|
| Convert a class component to a function component | [01-class-to-function](01-class-to-function/README.md) | 20 min |
| Complete and explain a reducer | [02-use-reducer](02-use-reducer/README.md) | 20 min |
| Communicate between React components | [03-component-communication](03-component-communication/README.md) | 20 min |
| Optimize product search with debounce | [04-debounced-search](04-debounced-search/README.md) | 25 min |
| Paginate products ten at a time | [05-product-pagination](05-product-pagination/README.md) | 30 min |
| Repair fetch and render product details | [06-fetch-and-product-details](06-fetch-and-product-details/README.md) | 30 min |
| Share navigation through Context | [07-router-context](07-router-context/README.md) | 30 min |
| Explain and repair Context and list bugs | [08-debug-context-and-lists](08-debug-context-and-lists/README.md) | 25 min |
| Edit users across birth-year lists | [09-edit-user-birthdates](09-edit-user-birthdates/README.md) | 35 min |
| Find destinations after one die roll | [10-dice-and-teleporters](10-dice-and-teleporters/README.md) | 25 min |
| Reflow and justify text | [11-reflow-and-justify](11-reflow-and-justify/README.md) | 35 min |
| Group users by final connection count | [12-social-connections](12-social-connections/README.md) | 30 min |
| Practice useReducer with live CRUD | [13-use-reducer-crud](13-use-reducer-crud/README.md) | Self-paced |

## Run one question

First follow [START-HERE.md](../START-HERE.md) and run `npm ci` at the project root. Each numbered folder contains its own `RUN-GUIDE.md`. The command below starts from the root.

```powershell
cd practice/05-product-pagination
npm run dev
```

For React questions 01–09, edit App.jsx and use the browser URL printed by Vite. Vite picks another port if one is occupied. Read HINTS.md only when stuck; the reference lives in Solution.jsx and can be viewed at /?solution=1. `npm run build` checks compilation, not functional correctness; follow the acceptance checklist as well.

For algorithm questions 10–12, edit answer.js and run `npm test`. Failing starter tests are expected until you solve the question. Use `npm run test:solution` for the reference checks.

## Practice routine

1. Questions 01–04: explain each concept aloud, then implement it.
2. Questions 05–09: solve under the suggested timer and manually check every behavior.
3. Questions 10–12: state assumptions, implement, run tests, and explain complexity.
4. Record mistakes in each NOTES.md and retry from memory the next day.

The existing product-search app remains at the parent project. These exercises use local fixtures so preparation does not depend on API availability. Original workbook text is in _source/react-reports.md. Source prompts and created practice assumptions are distinguished in each README.md.

## Separate run guides

- [Question 1: class-to-function](01-class-to-function/RUN-GUIDE.md)
- [Question 2: use-reducer](02-use-reducer/RUN-GUIDE.md)
- [Question 3: component-communication](03-component-communication/RUN-GUIDE.md)
- [Question 4: debounced-search](04-debounced-search/RUN-GUIDE.md)
- [Question 5: product-pagination](05-product-pagination/RUN-GUIDE.md)
- [Question 6: fetch-and-product-details](06-fetch-and-product-details/RUN-GUIDE.md)
- [Question 7: router-context](07-router-context/RUN-GUIDE.md)
- [Question 8: debug-context-and-lists](08-debug-context-and-lists/RUN-GUIDE.md)
- [Question 9: edit-user-birthdates](09-edit-user-birthdates/RUN-GUIDE.md)
- [Question 10: dice-and-teleporters](10-dice-and-teleporters/RUN-GUIDE.md)
- [Question 11: reflow-and-justify](11-reflow-and-justify/RUN-GUIDE.md)
- [Question 12: social-connections](12-social-connections/RUN-GUIDE.md)
- [Question 13: use-reducer-crud](13-use-reducer-crud/RUN-GUIDE.md)
