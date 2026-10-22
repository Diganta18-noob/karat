import { useEffect, useState } from "react";
import { requestProduct } from "./mockApi.js";
function useFetch(id, mode, delay, retry) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: "" });
    (async () => {
      try {
        const response = await requestProduct(id, {
          mode,
          delay,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!controller.signal.aborted)
          setState({ data, loading: false, error: "" });
      } catch (error) {
        if (!controller.signal.aborted)
          setState({ data: null, loading: false, error: error.message });
      }
    })();
    return () => controller.abort();
  }, [id, mode, delay, retry]);
  return state;
}
function ViewProduct(props) {
  const { data, loading, error } = useFetch(
    props.id,
    props.mode,
    props.delay,
    props.retry,
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product found.</p>;
  return (
    <>
      <h2>
        <strong>{data.title}</strong>
      </h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>Discount: {data.discountPercentage}%</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} />
    </>
  );
}
export default function App() {
  const [id, setId] = useState(1);
  const [mode, setMode] = useState("ok");
  const [delay, setDelay] = useState(800);
  const [retry, setRetry] = useState(0);
  return (
    <>
      <label>
        Product{" "}
        <select value={id} onChange={(e) => setId(Number(e.target.value))}>
          {[1, 2, 3].map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>
      <label>
        Response{" "}
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          {["ok", "http-error", "network-error"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        Delay ms{" "}
        <input
          type="number"
          min="0"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </label>
      <button onClick={() => setRetry((r) => r + 1)}>Retry</button>
      <ViewProduct id={id} mode={mode} delay={delay} retry={retry} />
    </>
  );
}
