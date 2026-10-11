# Question 6: Run guide

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
cd practice/06-fetch-and-product-details
npm run dev
```

Open the local URL printed by Vite, usually http://127.0.0.1:5173. Use the printed port if it differs. Keep this terminal running. Edit `App.jsx` in this folder, save, and check the browser. Read `Original.jsx` if supplied as part of the prompt.

## Check your answer

Follow every acceptance item in README.md. To check compilation, use another terminal in this question folder:

```powershell
npm run build
```

A build checks compilation, not functional correctness. Read `HINTS.md` when stuck. After attempting the question, click **Reveal solution** or append `/?solution=1` to the local server URL to view `Solution.jsx`.

You can also run `npm run solution` from this folder; open the printed URL with `/?solution=1` to select the reference answer.

## Stop and switch questions

Press **Ctrl+C** in the server terminal, then go back to the root:

```powershell
cd ../..
```

Follow the next question's RUN-GUIDE.md. Record mistakes in `NOTES.md`.
