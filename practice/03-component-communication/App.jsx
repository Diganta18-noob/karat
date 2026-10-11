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
