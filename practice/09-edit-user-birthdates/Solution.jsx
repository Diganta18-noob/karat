import {useState} from 'react';
import {initialUsers} from './data.js';
export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [draftBirthDate, setDraftBirthDate] = useState('');
  const sorted = [...users].sort((a,b) => a.birthDate.localeCompare(b.birthDate));
  const cancel = () => {setEditingId(null); setDraftBirthDate('');};
  const edit = user => {setEditingId(user.id); setDraftBirthDate(user.birthDate);};
  const apply = () => {
    if (!draftBirthDate) return;
    setUsers(previous => previous.map(u => u.id === editingId ? {...u, birthDate:draftBirthDate} : u));
    cancel();
  };
  return <>{['Before 2000','2000 or later'].map((title,index) => <section key={title}><h2>{title}</h2>
    {sorted.filter(u => (Number(u.birthDate.slice(0,4)) < 2000) === (index === 0)).map(u => <div key={u.id}>
      <p>{u.name} — {u.birthDate}</p>{editingId === u.id
        ? <><input aria-label={`Birth date for ${u.name}`} type="date" value={draftBirthDate} onChange={e => setDraftBirthDate(e.target.value)}/><button disabled={!draftBirthDate} onClick={apply}>Apply</button><button onClick={cancel}>Cancel</button></>
        : <button onClick={() => edit(u)}>Edit {u.name}</button>}</div>)}</section>)}</>;
}
