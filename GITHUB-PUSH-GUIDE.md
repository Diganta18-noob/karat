# Publish to Diganta18-noob/karat

This folder was supplied without Git history. The local files are prepared for publication, but publication must be verified against the remote repository first.

## Recommended: clone, then copy

Clone into a new folder outside this project, preserving any existing remote history:

```powershell
git clone https://github.com/Diganta18-noob/karat.git karat-publish
```

Or use `gh repo clone Diganta18-noob/karat karat-publish` if GitHub CLI is installed.

Extract the prepared `karat-practice.zip` into a temporary folder. Copy the **contents** of its `karat` folder into `karat-publish`, including `.gitignore` and `.gitattributes`. Preserve `karat-publish/.git`. Do not copy `node_modules`, `dist`, or ZIP archives. Existing remote files are preserved unless a copied file has the same path; review those differences before committing.

```powershell
cd karat-publish
npm ci
npm test
git status --short
git diff
git add .
git diff --cached --stat
git commit -m "Prepare portable interview practice and per-question run guides"
git push
```

Authenticate with your GitHub account when requested. Do not force-push. If the repository is empty and Git asks for an upstream, use `git push -u origin HEAD`.

After a successful push, open GitHub and verify `START-HERE.md` and all 13 `RUN-GUIDE.md` files. On your office laptop, choose **Code > Download ZIP** and follow `START-HERE.md`.
