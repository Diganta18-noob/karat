# Question 13: Run guide

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
cd practice/13-use-reducer-crud
npm run server
```

Leave Terminal 1 running. Open **Terminal 2 at the project root**:

```powershell
cd practice/13-use-reducer-crud
npm run dev
```

Open the URL printed by Vite. Keep both terminals running. Edit `App.jsx` and `reducer.js`, then save to update React. The starter is intentionally unfinished.

The local API is http://localhost:3001/notes. In your React code, use `/api/notes`; Vite forwards requests to JSON Server. Changes persist in `db.json`. Copy that file before experimenting if you want to restore the original data later.

## Check your answer

Implement and manually check each CRUD task in README.md, then check compilation:

```powershell
npm run build
```

A successful build checks compilation, not whether your reducer and CRUD behavior are correct. This exercise has no reveal-solution script.

## Stop

Press **Ctrl+C** in both terminals. If the API is unavailable, check that Terminal 1 is running and port 3001 is free.
