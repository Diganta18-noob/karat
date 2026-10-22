import { createContext, useContext, useState } from "react";
import { products } from "./data.js";
const RouterContext = createContext(null);
function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter requires RouterProvider");
  return router;
}
function RouterProvider({ children }) {
  const [location, setLocation] = useState({ page: "list", params: {} });
  const changeLocation = (page, params = {}) => setLocation({ page, params });
  return (
    <RouterContext.Provider value={{ location, changeLocation }}>
      {children}
    </RouterContext.Provider>
  );
}
function List() {
  const { changeLocation } = useRouter();
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
function Detail() {
  const { location, changeLocation } = useRouter();
  const product = products.find((p) => p.id === location.params.id);
  return (
    <>
      <h2>{product?.title ?? "Product not found"}</h2>
      <button onClick={() => changeLocation("list")}>Back</button>
    </>
  );
}
function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <List /> : <Detail />;
}
export default function App() {
  return (
    <RouterProvider>
      <Pages />
    </RouterProvider>
  );
}
