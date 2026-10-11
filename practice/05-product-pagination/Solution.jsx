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
