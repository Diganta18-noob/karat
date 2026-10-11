import {useState} from 'react';
import {initialUsers} from './data.js';
export default function App() {
  const [users, setUsers] = useState(initialUsers);
  // TODO: add editingId and draftBirthDate; derive sorted groups.
  return <>{['Before 2000','2000 or later'].map((title,index) => <section key={title}><h2>{title}</h2>
    {users.filter(u => (Number(u.birthDate.slice(0,4)) < 2000) === (index === 0)).map(u => <p key={u.id}>{u.name} — {u.birthDate} <button>Edit</button></p>)}</section>)}</>;
}
