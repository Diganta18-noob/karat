import React, { useEffect, useState } from "react";


// CHANGE: Handle failed requests with try/catch.
const useFetch = (url, method = "GET") => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: "" });

      try {
        const response = await fetch(url, { method });

        if (!response.ok) {
          throw new Error("Could not load data");
        }

        const data = await response.json();

        setState({
          data,
          loading: false,
          error: "",
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [url, method]);

  return state;
};

function ViewProduct({ id }) {
  // CHANGE: Call useFetch, not the undefined Fetch function.
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      {/* CHANGE: Display the required product fields. */}
      <h1><strong>{data.title}</strong></h1>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>Discount: {data.discountPercentage}%</p>
      <p>Description: {data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ListProducts({ openProduct }) {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data || data.products.length === 0) return <p>No products found.</p>;
  return (
    <ul>{data.products.map((product) => (
      <li key={product.id}>
        <button onClick={() => openProduct(product.id)}>{product.title}</button>
      </li>
    ))}</ul>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}



export default App;
