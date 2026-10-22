import { useState } from "react";
import { products } from "./data.js";
function List({ changeLocation }) {
  return (
    <ul>
      {products.slice(0, 3).map((p) => (
        <li key={p.id}>
          <button onClick={() => changeLocation("view", { id: p.id })}>
            {p.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
function Detail({ id, changeLocation }) {
  const product = products.find((p) => p.id === id);
  return (
    <>
      <h2>{product.title}</h2>
      <button onClick={() => changeLocation("list")}>Back</button>
    </>
  );
}
export default function App() {
  const [location, setLocation] = useState({ page: "list", params: {} });
  const changeLocation = (page, params = {}) => setLocation({ page, params });
  // TODO: move routing state into a provider and remove navigation props.
  return location.page === "list" ? (
    <List changeLocation={changeLocation} />
  ) : (
    <Detail id={location.params.id} changeLocation={changeLocation} />
  );
}
