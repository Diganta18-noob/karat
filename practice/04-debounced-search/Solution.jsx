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
