# Question 11: Run guide

Read [README.md](README.md) for the question and acceptance checklist.

## First-time setup on this laptop

Extract the complete project ZIP. Install Node.js 24 LTS, open a terminal in the project root (the folder with `package-lock.json`), then run:

```powershell
npm ci
```

Do this once at the root, not in each question folder. Keep all folders together. See [START-HERE.md](../../START-HERE.md) for download and troubleshooting instructions.

## Run this question

Starting from the project root:

```powershell
cd practice/11-reflow-and-justify
npm run dev
```

This is a Node.js algorithm exercise; it does not start React or open a browser. Edit `answer.js`, save it, then rerun the command to see your output. Read `run.js` for the sample input.

## Check your answer

```powershell
npm test
```

Starter tests can fail until you implement the answer. To check the reference separately:

```powershell
npm run solution
npm run test:solution
```

Read `HINTS.md` when stuck and `solution.js` after your attempt. Record your observations in `NOTES.md`.
