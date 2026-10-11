import {createContext, useContext, useState} from 'react';
import {offices, initialUsers} from './data.js';
const OfficeContext = createContext(null);
function OfficeList() {
  const {officeId, changeOffice} = useContext(OfficeContext);
  return <select aria-label="Office" value={officeId} onChange={e => changeOffice(e.target.value)}>{offices.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}</select>;
}
function UserList() {
  const {officeId, selectedUser, setSelectedUser} = useContext(OfficeContext);
  const users = initialUsers.filter(u => u.officeId === officeId);
  return <><ul>{users.map(u => <li key={u.id}><button onClick={() => setSelectedUser(u)}>{u.name}</button></li>)}</ul>
    <p>Selected: {selectedUser?.name ?? 'none'}</p></>;
}
export default function App() {
  const [officeId, setOfficeId] = useState('a');
  const [selectedUser, setSelectedUser] = useState(null);
  const changeOffice = id => { setOfficeId(id); setSelectedUser(null); };
  return <OfficeContext.Provider value={{officeId,changeOffice,selectedUser,setSelectedUser}}><OfficeList/><UserList/></OfficeContext.Provider>;
}
