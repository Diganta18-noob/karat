import {useState} from 'react';
import {products} from './data.js';
export default function App() {
  const [selected, setSelected] = useState(null);
  // TODO: keep page here, render a slice, and preserve page across details.
  if (selected) return <><h2>{selected.title}</h2><p>${selected.price.toFixed(2)}</p><button onClick={() => setSelected(null)}>Back</button></>;
  return <><ul>{products.map(p => <li key={p.id}><button onClick={() => setSelected(p)}>{p.title}</button></li>)}</ul>
    <button>Previous</button><span> Page 1 </span><button>Next</button></>;
}
