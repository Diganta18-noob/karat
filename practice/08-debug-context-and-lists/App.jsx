import {createContext, useContext, useState} from 'react';
import {offices, initialUsers} from './data.js';
const OfficeContext = createContext({});
function OfficeList() {
  const {officeId, setOfficeId} = useContext(OfficeContext);
  return <select aria-label="Office" value={officeId} onChange={() => setOfficeId?.(officeId)}>{offices.map((o,i) => <option key={i} value={o.id}>{o.name}</option>)}</select>;
}
function UserList() {
  const {officeId, selectedUser, setSelectedUser} = useContext(OfficeContext);
  // BUG: shows users from all offices.
  return <><ul>{initialUsers.map((u,i) => <li key={i}><button onClick={() => setSelectedUser?.(u)}>{u.name}</button></li>)}</ul>
    <p>Office: {officeId}; Selected: {selectedUser?.name ?? 'none'}</p></>;
}
export default function App() {
  const [officeId, setOfficeId] = useState('a');
  const [selectedUser, setSelectedUser] = useState(null);
  // BUG: consumer expects an object but receives an array.
  return <OfficeContext.Provider value={[officeId,setOfficeId,selectedUser,setSelectedUser]}><OfficeList/><UserList/></OfficeContext.Provider>;
}
