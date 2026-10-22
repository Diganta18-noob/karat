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

## 3. Practice the Excel React snippets

Open [the Excel-only practice guide](practice/excel-react/README.md).

From the project root:

```powershell
npm.cmd run practice:excel -- 01-pagination
```

Open the URL printed by Vite. Edit `practice/excel-react/01-pagination/App.jsx`, save, and check the browser. Read QUESTION.md for the task and ORIGINAL.txt for the exact supplied snippet. Use /?solution=1 to see the separate answer.

Press Ctrl+C, then run the same command with another exercise name from the guide. These exercises use the original API URLs and need internet access. No JSON Server is needed. Your previous demo workspaces remain saved under practice.

## Troubleshooting

- **npm is not recognized:** install Node.js and reopen the terminal.
- **PowerShell blocks npm.ps1:** use `npm.cmd` instead of `npm`, or use Command Prompt.
- **Cannot find Vite or a module:** return to the project root and run `npm ci`.
- **Missing package.json:** check the terminal's current folder; do not run inside the ZIP viewer.
- **Port already in use:** Vite usually prints another available port. For Question 13, stop the process using port 3001 before starting the API.
- **Installation fails on office Wi-Fi:** the npm registry may require your company's approved proxy/network setup.

## Make another portable ZIP

If Python is installed, run `python prepare_download.py` from the project root. It creates `karat-practice.zip` containing source files and guides, without dependencies, build output or Git history. Install dependencies on the destination laptop using `npm ci`.
