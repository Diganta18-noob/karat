import { useEffect, useReducer, useState } from "react";

function reducer(state, action) {
  // switch (action.type) {
  //   case "load":
  //     return action.notes;

  //   case "add":
  //     return [...state, action.note];

  //   case "update":
  //     return state.map((item) =>
  //       item.id === action.note.id ? action.note : item,
  //     );

  //   case "delete":
  //     return state.filter((item) => item.id !== action.id);

  //   default:
  //     return state;
  // }
  switch(action.type){
    case"load":
    return action.notes;

    case "add":
      return [...state,action.note];

    case "delete":
      return state.filter((item)=> item.id !== action.id);

      case "update":
        return state.map((item)=>item.id === action.note.id ? action.note: item);
  }
}

export default function App() {
  const [notes, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch("/api/notes");
      const savedNotes = await response.json();
      dispatch({ type: "load", notes: savedNotes });
    }

    fetchNotes();
  }, []);

  async function createNote() {
    if (!text.trim()) return;

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, done: false }),
    });

    const note = await response.json();
    dispatch({ type: "add", note });
    setText("");
  }

  async function updateNote() {
    if (!text.trim()) return;

    const response = await fetch(`/api/notes/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const updatedNote = await response.json();
    dispatch({ type: "update", note: updatedNote });
    setText("");
    setEditingId(null);
  }

  async function deleteNote(id) {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;

    dispatch({ type: "delete", id });

    if (editingId === id) {
      setEditingId(null);
      setText("");
    }
  }

  return (
    <main>
      <h1>useReducer practice</h1>
      <p>
        Type a note to add it. To change a note, click Edit, change the text
        above, then click Save.
      </p>

      <label htmlFor="note">Your note</label>
      <div className="row">
        <input
          id="note"
          placeholder="Write a note..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={editingId === null ? createNote : updateNote}>
          {editingId === null ? "Add" : "Save"}
        </button>
      </div>

      <h2>Notes</h2>
      {notes.length === 0 && <p>Your added notes will appear here.</p>}
      {notes.map((note) => (
        <p key={note.id}>
          {note.text}{" "}
          <button
            onClick={() => {
              setEditingId(note.id);
              setText(note.text);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </p>
      ))}
    </main>
  );
}
