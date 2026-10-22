import React, { useEffect, useState } from "react";


// CHANGE: Handle failed requests with try/catch.
const useFetch = (url, method = "GET") => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: "" });

      try {
        const response = await fetch(url, { method });

        if (!response.ok) {
          throw new Error("Could not load data");
        }

        const data = await response.json();

        setState({
          data,
          loading: false,
          error: "",
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [url, method]);

  return state;
};

function App() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/users?limit=100"
  );
  const [users, setUsers] = useState([]);
  // CHANGE: Keep only one active edit and its draft date.
  const [editingId, setEditingId] = useState(null);
  const [birthDate, setBirthDate] = useState("");

  // Save the fetched users in editable state.
  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    // Starting another edit replaces the previous draft.
    setEditingId(user.id);
    setBirthDate(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setBirthDate("");
  }

  function applyEdit() {
    if (!birthDate) return;

    // CHANGE: Apply the new date to only the selected user.
    const updatedUsers = users.map((user) =>
      user.id === editingId ? { ...user, birthDate } : user
    );

    setUsers(updatedUsers);
    cancelEdit();
  }

  // Valid YYYY-MM-DD dates can be sorted as strings.
  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );

  const before = sortedUsers.filter((user) => Number(user.birthDate.slice(0, 4)) < 2000);
  const after = sortedUsers.filter((user) => Number(user.birthDate.slice(0, 4)) >= 2000);

  function showUsers(list) {
    return list.map((user) => (
      <div key={user.id}>
        <p>{user.name}: {user.birthDate}</p>

        {editingId === user.id ? (
          <>
            <input type="date" value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)} />
            <button onClick={applyEdit}>Apply</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : <button onClick={() => editUser(user)}>Edit</button>}
      </div>
    ));
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Born before 2000</h2>
      {showUsers(before)}

      <h2>Born in or after 2000</h2>
      {showUsers(after)}
    </div>
  );
}



export default App;
