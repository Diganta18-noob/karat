from pathlib import Path
import json
import textwrap
import openpyxl

BASE = Path(__file__).resolve().parent / 'practice'

def write(folder, name, content):
    target = BASE / folder / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(textwrap.dedent(content).strip() + '\n', encoding='utf-8')

questions = [
    ('01-class-to-function', 'Convert a class component to a function component', 'React JS!F2:F6, F8:F9, F11:F16', 20,
     'Convert Original.jsx into a function component in App.jsx. Preserve the counter, step prop, document title updates, and interval cleanup. Add a Pause/Resume button. The original is a representative practice snippet because the workbook describes this question without supplying its class code.',
     ['Count starts at zero and advances by step once per second.', 'Changing step changes future increments without resetting count.', 'Pause stops increments; Resume continues.', 'Unmounting clears the timer.', 'Explain why the interval uses a functional state updater.'],
     'Map props/state/handlers first. The timer and document title synchronize with external systems, so consider separate Effects. Never create an interval during render.'),
    ('02-use-reducer', 'Complete and explain a reducer', 'React JS!F2:F6, F8:F9, F11:F16', 20,
     'Complete the reducer for a cart. Support add, increment, decrement, remove, and clear. Adding an existing product increases its quantity. Decrementing quantity 1 removes the item. Keep updates immutable. This cart is a representative practice scenario; the workbook does not include its original reducer snippet.',
     ['Every button dispatches an action with the right payload.', 'Adding the same product creates one row with higher quantity.', 'Removing and clearing work.', 'Previous state objects are never mutated.', 'Explain useReducer versus useState and the role of dispatch.'],
     'Write down each action shape. Return a new array for changes, using map/filter. Derive the total from items rather than keeping a second total in state.'),
    ('03-component-communication', 'Communicate between React components', 'React JS!F2:F6, F8:F9, F11:F14, F16', 20,
     'Build a parent with a SearchInput child and a Results sibling. Typing in SearchInput must filter Results. Add a Clear button inside Results that clears SearchInput. Explain how the same data could reach a deeply nested component through Context, including advantages and disadvantages.',
     ['Input and results remain synchronized.', 'Clear in the results component clears the input.', 'State has one owner in the nearest shared parent.', 'Children receive data and callbacks through props.', 'Explain parent/child, child/parent, siblings, and Context tradeoffs.'],
     'Use a controlled input. The parent owns query; SearchInput receives query and onQueryChange. Results receives filtered data and onClear.'),
    ('04-debounced-search', 'Optimize product search with debounce', 'React JS!F3:F4, F8:F9, F11, F15:F16', 25,
     'Optimize the product search so the input updates immediately but filtering uses the latest query only after 300 ms without typing. Make the filtering case insensitive. Explain how you would prevent stale results if filtering became a network request.',
     ['Input remains responsive while typing.', 'Results update after 300 ms of idle time.', 'Rapid typing cancels older timers.', 'Clearing the query restores all products after the delay.', 'Explain debounce versus throttle, and cancellation versus memoization.'],
     'An Effect depending on query can set a timeout and return clearTimeout. Derive filtered products from the settled query. For network work, discuss HTTP checks and stale-response protection.'),
    ('05-product-pagination', 'Paginate products ten at a time', 'React JS!F2:F3, F5, F12:F15, F17, F19', 30,
     'Add frontend pagination to a list of 25 local products. Display 10 per page, Previous and Next buttons, and the current page number. Selecting a product shows its details; Back returns to the same page. No API call is required for this variant.',
     ['Pages show 10, 10, and 5 products.', 'Previous is disabled on page 1; Next is disabled on page 3.', 'There are no duplicates or skipped products.', 'Opening details and returning preserves the page.', 'Explain API pagination versus slicing a fetched subset.'],
     'Use pageSize=10 and slice((page-1)*pageSize, page*pageSize). Keep page in a parent that remains mounted when showing details.'),
    ('06-fetch-and-product-details', 'Repair fetch and render product details', 'React JS!F2, F6, F11:F13, F16, F18', 30,
     'Fix the custom fetch Hook and product view. Show loading/error states, bold title, category, dollar price with two decimals, discount percentage, description, and an image with alt text. Use the supplied simulated request with configurable failure and delay; it requires no internet. The workbook includes a Fetch/useFetch naming mismatch and missing error handling.',
     ['Loading is shown until the request finishes.', 'HTTP failure produces an error rather than success.', 'Network failure is handled.', 'Changing product quickly never displays an older response as the latest result.', 'Retry works and image/title/price/discount are displayed correctly.'],
     'Call the defined useFetch Hook. Throw on !response.ok, catch failures, reset loading for a new request, and clean up with AbortController or an ignore flag.'),
    ('07-router-context', 'Share navigation through Context', 'React JS!F16, F19:F21', 30,
     'Replace changeLocation prop passing with RouterContext. Share current location and changeLocation. Wire product list, detail view, and Back through a custom useRouter Hook. Provider must wrap consumers. Use local data for this exercise.',
     ['List opens the selected product.', 'Back returns to the list.', 'Children access navigation through useRouter.', 'Provider supplies a value object.', 'Explain why a consumer in the same component that returns a provider is outside that provider.'],
     'Use createContext, useContext, and <Context.Provider value={{location, changeLocation}}>. Match capitalization, and validate that your custom Hook has a provider.'),
    ('08-debug-context-and-lists', 'Explain and repair Context and list bugs', 'React JS!F19; also F16, F20:F21', 25,
     'Read the intentionally buggy App.jsx, explain its data flow, then fix the office selector, office user list, stable list keys, and selection behavior. This is a reconstructed practice snippet: the workbook names OfficeList/Context/UserList but does not supply a complete original for that exact report.',
     ['Provider and consumer agree on their data shape.', 'Selecting an office displays only its users.', 'Changing office clears selection of a user from the old office.', 'List items use stable IDs.', 'Explain each defect and demonstrate its before/after behavior.'],
     'Inspect provider value and select onChange first. Keep data derivable from selected office. Clear selectedUser when changing office.'),
    ('09-edit-user-birthdates', 'Edit users across birth-year lists', 'React JS!F10, F13:F15, F20:F21', 35,
     'Split users into born before 2000 and born in 2000 or later, sorted by birth date. Add Edit, Apply, and Cancel. Apply changes birthDate and moves the user into the right list. Cancel discards changes. Opening another user discards the previous draft. Only one user may be edited at a time. The workbook labels the second group "after 2000" but its code uses >=2000; this exercise follows the code.',
     ['Edit preloads the current date.', 'Apply persists the new date and closes the editor.', 'Changing 1999 to 2001 moves a user between lists.', 'Cancel never changes the saved user.', 'Opening another editor discards the old draft; sorting updates and empty dates cannot be applied.'],
     'Keep users, editingId, and draftBirthDate. Derive both lists from users. Store drafts separately and update the saved array only on Apply.'),
    ('10-dice-and-teleporters', 'Find destinations after one die roll', 'React JS!F4, F8:F9', 25,
     'Implement possibleSquares(teleporters, dieSides, start, lastSquare). Teleporters are strings such as "3,1". For every possible roll, advance and follow at most ONE teleporter. Return unique destinations sorted numerically. The workbook does not specify overshoots: for this practice, ignore rolls landing beyond lastSquare. Teleporter endpoints are valid board squares and starts are unique.',
     ['All possible die outcomes are considered.', 'Only one teleport is followed, even if its endpoint starts another.', 'Duplicate destinations collapse.', 'Overshoots are ignored under the stated practice rule.', 'Explain time and space complexity.'],
     'Parse teleporter strings into a Map. Loop rolls 1..dieSides; validate the landing; apply map.get once; add to a Set.'),
    ('11-reflow-and-justify', 'Reflow and justify text', 'React JS!F7', 35,
     'Implement reflowAndJustify(lines, maxWidth). Join the original lines into words, greedily fit them into new lines, and use hyphens between words to reach the width. Spread gaps as equally as possible, assigning extra hyphens to earlier gaps. Single-word lines are not padded, including the last line. Unlike typical text-justification tasks, the final multiword line IS justified. For this practice, reject a word longer than maxWidth; the workbook leaves that case unspecified.',
     ['Word order is preserved.', 'Every multiword line has exact maxWidth.', 'Earlier gaps receive extra separators.', 'Single-word lines remain unpadded.', 'Empty input and long-word policy are handled.'],
     'Separate greedy packing from justification. If words have total letter length L and g gaps, distribute maxWidth-L as floor(total/g), plus one in the first total%g gaps.'),
    ('12-social-connections', 'Group users by final connection count', 'React JS!F22', 30,
     'Implement grouping(events, N). CONNECT adds an undirected friendship and DISCONNECT removes it, regardless of name order. Return [users with fewer than N connections, users with N or more]. Include everyone seen, including users with zero final connections. Preserve first-appearance order. Repeated CONNECT and absent DISCONNECT are idempotent for this practice; reject self-connections and unknown event types.',
     ['Friendships are symmetric.', 'Reversed DISCONNECT removes both directions.', 'Repeated CONNECT does not double count.', 'Zero-connection users remain included.', 'Workbook examples for N=1,3,10 pass; explain complexity in E events.'],
     'Map each user to a Set of neighbors. Register both names even for disconnect events, update both sets, and group only after processing the entire log.'),
]

fixtures = '''
export const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, title: `Product ${i + 1}`, category: i % 2 ? 'audio' : 'phones',
  price: 10.5 + i, discountPercentage: 5, description: `Description for product ${i + 1}`,
  thumbnail: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="lightblue"/><text x="10" y="45">Product</text></svg>')
}));
export const initialUsers = [
  { id: 1, name: 'Alice', birthDate: '1995-06-15', officeId: 'a' },
  { id: 2, name: 'Bob', birthDate: '2000-01-01', officeId: 'b' },
  { id: 3, name: 'Charlie', birthDate: '2002-03-12', officeId: 'a' },
  { id: 4, name: 'Dina', birthDate: '1999-12-31', officeId: 'b' },
];
export const offices = [{id:'a', name:'Bengaluru'}, {id:'b', name:'Hyderabad'}];
'''

starters = {}
solutions = {}
starters[1] = '''
import { useState } from 'react';
import Original from './Original.jsx';
export default function App() {
  const [step, setStep] = useState(1);
  return <><label>Step <input type="number" value={step} onChange={e => setStep(Number(e.target.value))}/></label>
    <h2>Original class component</h2><Original step={step}/>
    <h2>Your function component</h2><Counter step={step}/></>;
}
function Counter({step}) {
  // TODO: replace this placeholder with your function component.
  return <p>Implement the counter here. Step: {step}</p>;
}
'''
solutions[1] = '''
import { useEffect, useState } from 'react';
function Counter({step}) {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCount(c => c + step), 1000);
    return () => clearInterval(timer);
  }, [step, paused]);
  useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return <><p>Count: {count}</p><button onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</button></>;
}
export default function App() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  return <><label>Step <input type="number" value={step} onChange={e => setStep(Number(e.target.value))}/></label>
    <button onClick={() => setVisible(v => !v)}>Mount / Unmount</button>{visible && <Counter step={step}/>}</>;
}
'''
starters[2] = '''
import {useReducer} from 'react';
import {products} from './data.js';
function reducer(state, action) {
  // TODO: implement add/increment/decrement/remove/clear without mutation.
  return state;
}
export default function App() {
  const [items, dispatch] = useReducer(reducer, []);
  return <><button onClick={() => dispatch({type:'add', product:products[0]})}>Add Product 1</button>
    <button onClick={() => dispatch({type:'clear'})}>Clear</button>
    {items.map(item => <p key={item.id}>{item.title}: {item.quantity}
      <button onClick={() => dispatch({type:'increment', id:item.id})}>+</button>
      <button onClick={() => dispatch({type:'decrement', id:item.id})}>-</button>
      <button onClick={() => dispatch({type:'remove', id:item.id})}>Remove</button></p>)}</>;
}
'''
solutions[2] = starters[2].replace("  // TODO: implement add/increment/decrement/remove/clear without mutation.\n  return state;", '''  switch (action.type) {
    case 'add':
      return state.some(i => i.id === action.product.id)
        ? state.map(i => i.id === action.product.id ? {...i, quantity:i.quantity+1} : i)
        : [...state, {...action.product, quantity:1}];
    case 'increment': return state.map(i => i.id === action.id ? {...i, quantity:i.quantity+1} : i);
    case 'decrement': return state.map(i => i.id === action.id ? {...i, quantity:i.quantity-1} : i).filter(i => i.quantity > 0);
    case 'remove': return state.filter(i => i.id !== action.id);
    case 'clear': return [];
    default: return state;
  }''')
starters[3] = '''
import {useState} from 'react';
import {products} from './data.js';
function SearchInput() {
  const [query, setQuery] = useState('');
  return <input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)}/>;
}
function Results() {
  return <><button>Clear</button>{products.map(p => <p key={p.id}>{p.title}</p>)}</>;
}
export default function App() {
  // TODO: coordinate these siblings through shared parent state.
  return <><SearchInput/><Results/></>;
}
'''
solutions[3] = '''
import {useState} from 'react';
import {products} from './data.js';
function SearchInput({query, onQueryChange}) {
  return <input aria-label="Search" value={query} onChange={e => onQueryChange(e.target.value)}/>;
}
function Results({items, onClear}) {
  return <><button onClick={onClear}>Clear</button>{items.map(p => <p key={p.id}>{p.title}</p>)}</>;
}
export default function App() {
  const [query, setQuery] = useState('');
  const items = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  return <><SearchInput query={query} onQueryChange={setQuery}/><Results items={items} onClear={() => setQuery('')}/></>;
}
'''
starters[4] = '''
import {useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [query, setQuery] = useState('');
  // TODO: add a settled query and timer cleanup.
  const visible = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  return <><label>Search <input value={query} onChange={e => setQuery(e.target.value)}/></label>
    <p>Filtering for: {query}</p>{visible.map(p => <p key={p.id}>{p.title}</p>)}</>;
}
'''
solutions[4] = '''
import {useEffect, useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [query, setQuery] = useState('');
  const [settledQuery, setSettledQuery] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSettledQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  const visible = products.filter(p => p.title.toLowerCase().includes(settledQuery.toLowerCase()));
  return <><label>Search <input value={query} onChange={e => setQuery(e.target.value)}/></label>
    <p>Filtering for: {settledQuery}</p>{visible.map(p => <p key={p.id}>{p.title}</p>)}</>;
}
'''
starters[5] = '''
import {useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [selected, setSelected] = useState(null);
  // TODO: keep page here, render a slice, and preserve page across details.
  if (selected) return <><h2>{selected.title}</h2><p>${selected.price.toFixed(2)}</p><button onClick={() => setSelected(null)}>Back</button></>;
  return <><ul>{products.map(p => <li key={p.id}><button onClick={() => setSelected(p)}>{p.title}</button></li>)}</ul>
    <button>Previous</button><span> Page 1 </span><button>Next</button></>;
}
'''
solutions[5] = '''
import {useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const visible = products.slice((page-1)*pageSize, page*pageSize);
  if (selected) return <><h2>{selected.title}</h2><p>${selected.price.toFixed(2)}</p><button onClick={() => setSelected(null)}>Back</button></>;
  return <><ul>{visible.map(p => <li key={p.id}><button onClick={() => setSelected(p)}>{p.title}</button></li>)}</ul>
    <button disabled={page === 1} onClick={() => setPage(p => p-1)}>Previous</button>
    <span> Page {page} of {totalPages} </span>
    <button disabled={page === totalPages} onClick={() => setPage(p => p+1)}>Next</button></>;
}
'''
starters[6] = '''
import {useEffect, useState} from 'react';
import {requestProduct} from './mockApi.js';
function useFetch(id, mode, delay, retry) {
  const [state, setState] = useState({data:null, loading:true, error:''});
  useEffect(() => {
    // BUG: no reset, no catch, no cleanup, and failure falls through to success.
    (async () => {
      const response = await requestProduct(id, {mode, delay});
      if (!response.ok) setState({data:null, loading:false, error:'HTTP error'});
      const data = await response.json();
      setState({data, loading:false, error:''});
    })();
  }, [id, mode, delay, retry]);
  return state;
}
function ViewProduct(props) {
  const {data, loading, error} = useFetch(props.id, props.mode, props.delay, props.retry);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  // TODO: display all requested fields safely.
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default function App() {
  const [id, setId] = useState(1);
  const [mode, setMode] = useState('ok');
  const [delay, setDelay] = useState(800);
  const [retry, setRetry] = useState(0);
  return <><label>Product <select value={id} onChange={e => setId(Number(e.target.value))}>{[1,2,3].map(i => <option key={i}>{i}</option>)}</select></label>
    <label>Response <select value={mode} onChange={e => setMode(e.target.value)}>{['ok','http-error','network-error'].map(m => <option key={m}>{m}</option>)}</select></label>
    <label>Delay ms <input type="number" min="0" value={delay} onChange={e => setDelay(Number(e.target.value))}/></label>
    <button onClick={() => setRetry(r => r+1)}>Retry</button><ViewProduct id={id} mode={mode} delay={delay} retry={retry}/></>;
}
'''
solutions[6] = starters[6].replace('useEffect, useState', 'useEffect, useState').replace('''    // BUG: no reset, no catch, no cleanup, and failure falls through to success.
    (async () => {
      const response = await requestProduct(id, {mode, delay});
      if (!response.ok) setState({data:null, loading:false, error:'HTTP error'});
      const data = await response.json();
      setState({data, loading:false, error:''});
    })();''', '''    const controller = new AbortController();
    setState({data:null, loading:true, error:''});
    (async () => {
      try {
        const response = await requestProduct(id, {mode, delay, signal:controller.signal});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!controller.signal.aborted) setState({data, loading:false, error:''});
      } catch (error) {
        if (!controller.signal.aborted) setState({data:null, loading:false, error:error.message});
      }
    })();
    return () => controller.abort();''').replace('''  // TODO: display all requested fields safely.
  return <pre>{JSON.stringify(data, null, 2)}</pre>;''', '''  if (!data) return <p>No product found.</p>;
  return <><h2><strong>{data.title}</strong></h2><p>Category: {data.category}</p>
    <p>Price: ${data.price.toFixed(2)}</p><p>Discount: {data.discountPercentage}%</p>
    <p>{data.description}</p><img src={data.thumbnail} alt={data.title}/></>;''')
starters[7] = '''
import {useState} from 'react';
import {products} from './data.js';
function List({changeLocation}) {
  return <ul>{products.slice(0,3).map(p => <li key={p.id}><button onClick={() => changeLocation('view',{id:p.id})}>{p.title}</button></li>)}</ul>;
}
function Detail({id, changeLocation}) {
  const product = products.find(p => p.id === id);
  return <><h2>{product.title}</h2><button onClick={() => changeLocation('list')}>Back</button></>;
}
export default function App() {
  const [location, setLocation] = useState({page:'list', params:{}});
  const changeLocation = (page, params={}) => setLocation({page, params});
  // TODO: move routing state into a provider and remove navigation props.
  return location.page === 'list' ? <List changeLocation={changeLocation}/> : <Detail id={location.params.id} changeLocation={changeLocation}/>;
}
'''
solutions[7] = '''
import {createContext, useContext, useState} from 'react';
import {products} from './data.js';
const RouterContext = createContext(null);
function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error('useRouter requires RouterProvider');
  return router;
}
function RouterProvider({children}) {
  const [location, setLocation] = useState({page:'list', params:{}});
  const changeLocation = (page, params={}) => setLocation({page, params});
  return <RouterContext.Provider value={{location, changeLocation}}>{children}</RouterContext.Provider>;
}
function List() {
  const {changeLocation} = useRouter();
  return <ul>{products.slice(0,3).map(p => <li key={p.id}><button onClick={() => changeLocation('view',{id:p.id})}>{p.title}</button></li>)}</ul>;
}
function Detail() {
  const {location, changeLocation} = useRouter();
  const product = products.find(p => p.id === location.params.id);
  return <><h2>{product?.title ?? 'Product not found'}</h2><button onClick={() => changeLocation('list')}>Back</button></>;
}
function Pages() {
  const {location} = useRouter();
  return location.page === 'list' ? <List/> : <Detail/>;
}
export default function App() { return <RouterProvider><Pages/></RouterProvider>; }
'''
starters[8] = '''
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
'''
solutions[8] = '''
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
'''
starters[9] = '''
import {useState} from 'react';
import {initialUsers} from './data.js';
export default function App() {
  const [users, setUsers] = useState(initialUsers);
  // TODO: add editingId and draftBirthDate; derive sorted groups.
  return <>{['Before 2000','2000 or later'].map((title,index) => <section key={title}><h2>{title}</h2>
    {users.filter(u => (Number(u.birthDate.slice(0,4)) < 2000) === (index === 0)).map(u => <p key={u.id}>{u.name} — {u.birthDate} <button>Edit</button></p>)}</section>)}</>;
}
'''
solutions[9] = '''
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
'''

main_template = '''
import React, {Component} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import Solution from './Solution.jsx';
import './style.css';
class ErrorBoundary extends Component {
  state = {error:null};
  static getDerivedStateFromError(error) { return {error}; }
  render() {return this.state.error ? <pre role="alert">{this.state.error.message}\nRead the console and repair App.jsx, then reload.</pre> : this.props.children;}
}
const solution = new URLSearchParams(location.search).get('solution') === '1';
const Exercise = solution ? Solution : App;
createRoot(document.getElementById('root')).render(<React.StrictMode>
  <main><h1>__TITLE__</h1><p>{solution ? 'Reference solution' : 'Your practice starter'}</p>
  <nav><a href="/">Practice</a> · <a href="/?solution=1">Reveal solution</a></nav>
  <p>Edit App.jsx; read README.md for the requirements.</p><hr/>
  <ErrorBoundary><Exercise/></ErrorBoundary></main></React.StrictMode>);
'''

for number, (folder, title, source, minutes, prompt, checks, hint) in enumerate(questions, 1):
    write(folder, 'README.md', f'''# Question {number}: {title}

Suggested time: {minutes} minutes. Source: {source} in KARAT_Assessment_Question_Template.xlsx.

## Your task

{prompt}

## Start practicing

Open this folder as its own editor workspace using the included `{folder}.code-workspace` file.
From a terminal in THIS folder, run `npm run dev` {'and open the local URL. Edit `App.jsx`. The browser starts in practice mode; use Reveal solution only after attempting the task.' if number <= 9 else 'to see a sample run. Edit `answer.js`, then run `npm test` to check your solution.'}

You can also use `npm run solution` {'to serve the same app and open `/?solution=1`.' if number <= 9 else 'to run the reference example, or `npm run test:solution` to verify it.'}

Dependencies for React workspaces are shared with the parent Karat project. If moved outside it, these folders need React, React DOM, Vite, and the React Vite plugin installed.

## Acceptance checklist

''' + '\n'.join('- [ ] ' + check for check in checks) + '''

## Interview practice

1. Restate the requirements aloud before coding.
2. Identify state, data structures, assumptions, and boundary cases.
3. Implement a small working version and check the acceptance list.
4. Explain your choices and one alternative.
5. Read HINTS.md if stuck. Read Solution.jsx/solution.js only after your attempt.

## Source and reconstruction notes

The question requirements above come from the cited cells; fixtures, starters, and reference solutions were created for practice. Workbook code is candidate-reported material and can be incomplete or incorrect. See `../_source/react-reports.md` for the original cell contents.
''')
    write(folder, 'HINTS.md', f'# Hint\n\n{hint}\n\nTry implementing this before opening the solution.\n')
    write(folder, 'NOTES.md', '# My attempt\n\nTime spent:\n\nMy explanation:\n\nMistakes and fixes:\n\nQuestions to ask the interviewer:\n\nNext attempt date:\n')
    workspace = {'folders':[{'path':'.'}], 'tasks':{'version':'2.0.0', 'tasks':[
        {'label':'Start practice','type':'shell','command':'npm run dev','problemMatcher':[]},
        {'label':'Check practice','type':'shell','command':'npm run build' if number<=9 else 'npm test','problemMatcher':[]},
    ]}}
    write(folder, f'{folder}.code-workspace', json.dumps(workspace, indent=2))
    if number <= 9:
        write(folder, '.gitignore', 'dist/\nnode_modules/')
        write(folder, 'App.jsx', starters[number])
        write(folder, 'Solution.jsx', solutions[number])
        write(folder, 'data.js', fixtures)
        write(folder, 'main.jsx', main_template.replace('__TITLE__', f'{number:02}. {title}'))
        write(folder, 'style.css', 'body{font:17px system-ui;color:#17212f;background:#f4f7fa;margin:0}main{max-width:900px;margin:24px auto;padding:28px;background:white;border-radius:12px}button,input,select{font:inherit;margin:6px;padding:8px}button{cursor:pointer}button:disabled{cursor:default}label{display:inline-block}section{margin:20px 0;padding:12px;border:1px solid #ccd5df}pre{white-space:pre-wrap;color:#b42318}li{margin:6px 0}img{max-width:200px}a{color:#155eef}')
        write(folder, 'index.html', '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>React interview practice</title></head><body><div id="root"></div><script type="module" src="/main.jsx"></script></body></html>')
        write(folder, 'vite.config.js', "import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({plugins:[react()]});")
        write(folder, 'package.json', json.dumps({'name':folder,'private':True,'type':'module','scripts':{'dev':'node ../../node_modules/vite/bin/vite.js --host 127.0.0.1','solution':'node ../../node_modules/vite/bin/vite.js --host 127.0.0.1','build':'node ../../node_modules/vite/bin/vite.js build'}},indent=2))

write('01-class-to-function','Original.jsx', '''
import {Component} from 'react';
export default class Original extends Component {
  state = {count:0};
  startTimer = () => { this.timer = setInterval(() => this.setState(s => ({count:s.count+this.props.step})), 1000); };
  componentDidMount() {this.startTimer(); document.title = `Count: ${this.state.count}`;}
  componentDidUpdate(previousProps) {
    if (previousProps.step !== this.props.step) {clearInterval(this.timer); this.startTimer();}
    document.title = `Count: ${this.state.count}`;
  }
  componentWillUnmount() {clearInterval(this.timer);}
  render() {return <p>Count: {this.state.count}</p>;}
}
''')
write('06-fetch-and-product-details','mockApi.js', '''
import {products} from './data.js';
export function requestProduct(id, {mode='ok', delay=800, signal}={}) {
  return new Promise((resolve,reject) => {
    const abort = () => {clearTimeout(timer); reject(new DOMException('Aborted','AbortError'));};
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort',abort);
      if (mode === 'network-error') {reject(new Error('Network disconnected')); return;}
      const product = products.find(p => p.id === id);
      const ok = mode !== 'http-error' && !!product;
      resolve({ok, status:ok ? 200 : 500, json:async () => ok ? product : {message:'Request failed'}});
    }, Math.max(0,delay));
    if (signal?.aborted) abort(); else signal?.addEventListener('abort',abort,{once:true});
  });
}
''')

algorithm_sources = {
10: '''
export function possibleSquares(teleporters, dieSides, start, lastSquare) {
  const jumps = new Map(teleporters.map(t => t.split(',').map(Number)));
  const destinations = new Set();
  for (let roll=1; roll<=dieSides; roll++) {
    const landing = start+roll;
    if (landing > lastSquare) continue;
    destinations.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...destinations].sort((a,b) => a-b);
}
''',
11: '''
export function reflowAndJustify(lines, maxWidth) {
  if (!Number.isInteger(maxWidth) || maxWidth < 1) throw new Error('Width must be a positive integer');
  const words = lines.join(' ').trim().split(/\\s+/).filter(Boolean);
  if (words.some(w => w.length > maxWidth)) throw new Error('Word longer than width');
  const output = [];
  let index = 0;
  while (index < words.length) {
    const row = [];
    let letters = 0;
    while (index < words.length && letters + words[index].length + row.length <= maxWidth) {
      const word = words[index++]; row.push(word); letters += word.length;
    }
    if (row.length === 1) {output.push(row[0]); continue;}
    const gaps = row.length-1;
    const total = maxWidth-letters;
    const base = Math.floor(total/gaps), extra = total%gaps;
    output.push(row.map((word,i) => word + (i < gaps ? '-'.repeat(base+(i<extra ? 1:0)) : '')).join(''));
  }
  return output;
}
''',
12: '''
export function grouping(events, N) {
  const neighbors = new Map();
  for (const [type,a,b] of events) {
    if (!['CONNECT','DISCONNECT'].includes(type)) throw new Error('Unknown event');
    if (a === b) throw new Error('Self-connection');
    if (!neighbors.has(a)) neighbors.set(a,new Set());
    if (!neighbors.has(b)) neighbors.set(b,new Set());
    if (type === 'CONNECT') {neighbors.get(a).add(b); neighbors.get(b).add(a);}
    else {neighbors.get(a).delete(b); neighbors.get(b).delete(a);}
  }
  const below=[], atLeast=[];
  for (const [user,connections] of neighbors) (connections.size < N ? below : atLeast).push(user);
  return [below,atLeast];
}
'''
}
test_sources = {
10: '''
import {test} from 'node:test';
import assert from 'node:assert/strict';
const {possibleSquares} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
test('ordinary die outcomes', () => assert.deepEqual(possibleSquares([],3,0,10),[1,2,3]));
test('teleport once, never chain', () => assert.deepEqual(possibleSquares(['1,3','3,8'],1,0,10),[3]));
test('duplicate destinations', () => assert.deepEqual(possibleSquares(['1,5','2,5'],3,0,10),[3,5]));
test('overshoots ignored', () => assert.deepEqual(possibleSquares([],6,9,10),[10]));
test('last square has no next move', () => assert.deepEqual(possibleSquares([],6,10,10),[]));
test('backward and zero destinations', () => assert.deepEqual(possibleSquares(['3,1','4,0','5,10'],3,2,10),[0,1,10]));
''',
11: '''
import {test} from 'node:test';
import assert from 'node:assert/strict';
const {reflowAndJustify} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
const lines=['The day began as still as the','night abruptly lighted with','brilliant flame'];
test('workbook width 24', () => assert.deepEqual(reflowAndJustify(lines,24),['The--day--began-as-still','as--the--night--abruptly','lighted--with--brilliant','flame']));
test('single line and uneven gaps', () => assert.deepEqual(reflowAndJustify(['a b','c d'],20),['a------b-----c-----d']));
test('short width', () => assert.deepEqual(reflowAndJustify(['a b','c d'],4),['a--b','c--d']));
test('single words not padded', () => assert.deepEqual(reflowAndJustify(['a b','c d'],2),['a','b','c','d']));
test('empty input', () => assert.deepEqual(reflowAndJustify([],10),[]));
test('reject oversized word', () => assert.throws(() => reflowAndJustify(['oversized'],3)));
test('reject zero width', () => assert.throws(() => reflowAndJustify(['a'],0)));
''',
12: '''
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {events} from './examples.js';
const {grouping} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
test('workbook N=3', () => assert.deepEqual(grouping(events,3),[['Alice','Charlie','Pam','Nicole'],['Bob','Dennis','Edward']]));
test('workbook N=1', () => assert.deepEqual(grouping(events,1),[[],['Alice','Bob','Charlie','Dennis','Pam','Edward','Nicole']]));
test('workbook N=10', () => assert.deepEqual(grouping(events,10),[['Alice','Bob','Charlie','Dennis','Pam','Edward','Nicole'],[]]));
test('reversed disconnect and zero counts', () => assert.deepEqual(grouping([['CONNECT','a','b'],['DISCONNECT','b','a']],1),[['a','b'],[]]));
test('repeated connect', () => assert.deepEqual(grouping([['CONNECT','a','b'],['CONNECT','b','a']],2),[['a','b'],[]]));
test('empty input', () => assert.deepEqual(grouping([],3),[[],[]]));
test('self connection rejected', () => assert.throws(() => grouping([['CONNECT','a','a']],1)));
'''
}
for number in [10,11,12]:
    folder = questions[number-1][0]
    signature = {10:'possibleSquares(teleporters, dieSides, start, lastSquare)',11:'reflowAndJustify(lines, maxWidth)',12:'grouping(events, N)'}[number]
    write(folder,'answer.js', f'export function {signature} {{\n  // TODO: implement your solution.\n  throw new Error("Not implemented yet");\n}}')
    write(folder,'solution.js',algorithm_sources[number])
    write(folder,'answer.test.js',test_sources[number])
    example = {10:"possibleSquares(['3,1','4,2','5,10'],6,0,10)",11:"reflowAndJustify(['The day began as still as the','night abruptly lighted with','brilliant flame'],24)",12:'grouping(events,3)'}[number]
    imports = "import {events} from './examples.js';\n" if number == 12 else ''
    function_name = signature.split('(')[0]
    write(folder,'run.js', imports + f"const {{{function_name}}} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');\nconsole.log({example});")
    write(folder,'reference.js', "process.env.PRACTICE_SOLUTION = '1';\nawait import(process.argv.includes('--test') ? './answer.test.js' : './run.js');")
    write(folder,'package.json',json.dumps({'name':folder,'private':True,'type':'module','scripts':{'dev':'node run.js','test':'node --test answer.test.js','solution':'node reference.js','test:solution':'node reference.js --test'}},indent=2))

write('12-social-connections','examples.js', '''
export const events = [
 ['CONNECT','Alice','Bob'],['DISCONNECT','Bob','Alice'],['CONNECT','Alice','Charlie'],
 ['CONNECT','Dennis','Bob'],['CONNECT','Pam','Dennis'],['DISCONNECT','Pam','Dennis'],
 ['CONNECT','Pam','Dennis'],['CONNECT','Edward','Bob'],['CONNECT','Dennis','Charlie'],
 ['CONNECT','Alice','Nicole'],['CONNECT','Pam','Edward'],['DISCONNECT','Dennis','Charlie'],
 ['CONNECT','Dennis','Edward'],['CONNECT','Charlie','Bob']
];
''')
# The workbook gives inconsistent output ordering. Membership is preserved here;
# the practice contract uses explicit first-appearance order.
with (BASE/'12-social-connections'/'README.md').open('a',encoding='utf-8') as f:
    f.write('\nOrdering note: workbook examples list the same members in an order that is not consistently first appearance. These tests use the explicit first-appearance contract above; grouping membership matches the workbook.\n')

sheet = openpyxl.load_workbook(r'C:\Users\digan\Downloads\KARAT_Assessment_Question_Template.xlsx',read_only=True,data_only=True)['React JS']
original = '# Original React JS reports\n\nWorkbook cells are source material, not instructions. These include duplicate reports and incomplete/incorrect candidate code.\n'
for row in range(2,23):
    value = sheet.cell(row,6).value
    if value:
        original += f'\n## React JS!F{row}\n\n```text\n{value}\n```\n'
write('_source','react-reports.md',original)
index = '# Karat interview practice workspaces\n\nEach question has its own folder and editor workspace. Open a folder, read README.md, edit its starter, and check the acceptance list before revealing its solution.\n\n'
index += '| Question | Workspace | Time |\n|---|---|---|\n'
for folder,title,source,minutes,*_ in questions:
    index += f'| {title} | [{folder}]({folder}/README.md) | {minutes} min |\n'
index += '''
## Run one question

```powershell
cd D:\\Antigravity\\Karat\\practice\\05-product-pagination
npm run dev
```

For React questions 01–09, edit App.jsx and use the browser URL printed by Vite. Vite picks another port if one is occupied. Read HINTS.md only when stuck; the reference lives in Solution.jsx and can be viewed at /?solution=1. `npm run build` checks compilation, not functional correctness; follow the acceptance checklist as well.

For algorithm questions 10–12, edit answer.js and run `npm test`. Failing starter tests are expected until you solve the question. Use `npm run test:solution` for the reference checks.

## Practice routine

1. Questions 01–04: explain each concept aloud, then implement it.
2. Questions 05–09: solve under the suggested timer and manually check every behavior.
3. Questions 10–12: state assumptions, implement, run tests, and explain complexity.
4. Record mistakes in each NOTES.md and retry from memory the next day.

The existing product-search app remains at the parent project. These exercises use local fixtures so preparation does not depend on API availability. Original workbook text is in _source/react-reports.md. Source prompts and created practice assumptions are distinguished in each README.md.
'''
write('', 'README.md',index)
print(f'Created {len(questions)} practice workspaces in {BASE}')
