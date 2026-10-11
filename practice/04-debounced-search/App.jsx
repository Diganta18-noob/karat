import {useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [query, setQuery] = useState('');
  // TODO: add a settled query and timer cleanup.
  const visible = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  return <><label>Search <input value={query} onChange={e => setQuery(e.target.value)}/></label>
    <p>Filtering for: {query}</p>{visible.map(p => <p key={p.id}>{p.title}</p>)}</>;
}
