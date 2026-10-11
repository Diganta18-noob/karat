import { useReducer } from "react";
import { products } from "./data.js";
function reducer(state, action) {
  switch (action.type) {

    case "load":
      return action.products;

    // case "add": {
    //   const existingItem = state.find((item) => item.id === action.product.id);
    //   if (existingItem) {
    //     return state.map((item) =>
    //       item.id === action.product.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item,
    //     );
    //   }
    //   return [...state, { ...action.product, quantity: 1 }];
    // }
case "add":{
  const existingItem = state.find((item)=> item.id === action.product.id);
  if(existingItem){
   {
      return state.map((item)=> item.id === action.product.id ? {...item,quantity: item.quantity +1}:item, );

    }
  }
  return [...state, {...action.product, quantity :1}];
}
    // case "increment":
    //   return state.map((item) =>
    //     item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
    //   );
      
    case "increment":
      return state.map((item)=>
        item.id === action.id ? {...item, quantity : item.quantity +1 } :item
      );

    case "decrement":
      
     return state.map((item)=> item.id === action.id ? {...item, quantity: item.quantity - 1}: item).filter((item)=> item.quantity >0);


     case "remove":
      return state.filter((item)=> item.id !== action.id);
    case "clear":
      return [];

    default:
      return state;
  }
}
export default function App() {
  const [items, dispatch] = useReducer(reducer, []);
  return (
    <>
      <button onClick={() => dispatch({ type: "add", product: products[0] })}>
        Add Product 1
      </button>
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
      {items.map((item) => (
        <p key={item.id}>
          {item.title}: {item.quantity}
          <button onClick={() => dispatch({ type: "increment", id: item.id })}>
            +
          </button>
          <button onClick={() => dispatch({ type: "decrement", id: item.id })}>
            -
          </button>
          <button onClick={() => dispatch({ type: "remove", id: item.id })}>
            Remove
          </button>
        </p>
      ))}
    </>
  );
}
