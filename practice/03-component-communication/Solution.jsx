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
