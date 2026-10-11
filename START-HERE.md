# Run on your office laptop

## 1. Get the project

On GitHub, open https://github.com/Diganta18-noob/karat and choose **Code > Download ZIP**. Extract the ZIP completely before running commands. The extracted folder may be named `karat-main` or `karat-master`.

Alternatively, with Git installed:

```powershell
git clone https://github.com/Diganta18-noob/karat.git
cd karat
```

With GitHub CLI installed, `gh repo clone Diganta18-noob/karat` also works.

## 2. Install dependencies once

Install Node.js 24 LTS (including npm) from https://nodejs.org, then reopen your terminal. Open the extracted project folder in your editor and open a terminal there. You must be in the folder containing the root `package-lock.json`.

```powershell
node --version
npm --version
npm ci
```

The initial installation requires internet access to the npm registry. Keep the whole project together: React exercises use the root `node_modules` folder. After installation, the exercises use local data; Question 13 uses its local JSON Server. Python and Git are not required for practicing from a downloaded ZIP.

## 3. Choose a question

Open [the practice index](practice/README.md). Every numbered folder has its own **RUN-GUIDE.md**, with exact commands, files to edit, and how to check your work.

Example, starting from the project root:

```powershell
cd practice/01-class-to-function
npm run dev
```

Open the local URL printed in the terminal. Keep the terminal running and edit `App.jsx`. Save to refresh the page. Press **Ctrl+C** to stop. Questions 10–12 are Node.js exercises and run in the terminal instead of React. Question 13 needs two terminals; follow its guide.

To run the original product-search workbench, open a new terminal at the project root and run `npm run dev`. Edit `src/ProductSearchPractice.jsx`; run `npm test` for the fixed reference or `npm run test:practice` for your attempt. Unfinished practice tests may fail until you implement the answer.

## Troubleshooting

- **npm is not recognized:** install Node.js and reopen the terminal.
- **PowerShell blocks npm.ps1:** use `npm.cmd` instead of `npm`, or use Command Prompt.
- **Cannot find Vite or a module:** return to the project root and run `npm ci`.
- **Missing package.json:** check the terminal's current folder; do not run inside the ZIP viewer.
- **Port already in use:** Vite usually prints another available port. For Question 13, stop the process using port 3001 before starting the API.
- **Installation fails on office Wi-Fi:** the npm registry may require your company's approved proxy/network setup.

## Make another portable ZIP

If Python is installed, run `python prepare_download.py` from the project root. It creates `karat-practice.zip` containing source files and guides, without dependencies, build output or Git history. Install dependencies on the destination laptop using `npm ci`.
