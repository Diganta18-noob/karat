import {useReducer} from 'react';
import {products} from './data.js';
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.some(i => i.id === action.product.id)
        ? state.map(i => i.id === action.product.id ? {...i, quantity:i.quantity+1} : i)
        : [...state, {...action.product, quantity:1}];
    case 'increment': return state.map(i => i.id === action.id ? {...i, quantity:i.quantity+1} : i);
    case 'decrement': return state.map(i => i.id === action.id ? {...i, quantity:i.quantity-1} : i).filter(i => i.quantity > 0);
    case 'remove': return state.filter(i => i.id !== action.id);
    case 'clear': return [];
    default: return state;
  }
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
