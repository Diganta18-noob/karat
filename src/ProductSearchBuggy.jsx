import { useEffect, useState } from "react";

export default function ProductSearch({ category = "" }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    // Begin a new search cycle.
    setLoading(true);
    setError("");
    setProducts([]);

    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query.trim(),
          category,
        });

        const response = await fetch(
          `/api/products?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to fetch products (${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
          throw new Error("The API returned an invalid product list.");
        }

        if (active) {
          setProducts(data.products);
        }
      } catch (err) {
        if (active && !controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category]);

  return (
    <section>
      <label htmlFor="product-search">Search products</label>

      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for iPhone..."
      />

      {loading && <p role="status">Loading...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}