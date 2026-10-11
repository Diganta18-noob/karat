# Empty useReducer practice workspace

**Setup and run instructions:** [RUN-GUIDE.md](RUN-GUIDE.md). Install root dependencies with `npm ci` before starting.

The React setup and JSON Server are ready. App.jsx contains only a heading; reducer.js is empty apart from a comment. Implement the reducer and UI yourself.

## Run

Open two terminals in this folder.

Terminal 1:
```powershell
npm run server
```

Terminal 2:
```powershell
npm run dev
```

Open the URL printed by Vite. The JSON data is available at http://localhost:3001/notes. In your React code, use /api/notes; Vite forwards it to JSON Server.

## Your data

Each note has id, text, and done fields. JSON Server saves changes in db.json.

## Practice tasks

1. Define an initial state and a reducer. Connect them with useReducer.
2. Fetch the notes and dispatch an action to display them.
3. Add a text input and a button to create a note.
4. Edit a note.
5. Delete a note.
6. Toggle its done value.

Use GET /api/notes, POST /api/notes, PATCH /api/notes/:id, and DELETE /api/notes/:id.

Keep HTTP requests outside the reducer. Return new state arrays and objects rather than changing the existing ones.

Start with task 1 and task 2 only. Add one operation at a time.
