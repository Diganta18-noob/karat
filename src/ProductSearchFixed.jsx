import React from "react";

/**
 * PRODUCTION-GRADE / INTERVIEW CORRECTED VERSION:
 * 
 * 1. Debounce timer cleanup via effect return function.
 * 2. Race condition prevention using AbortController.
 * 3. HTTP status error checking (response.ok) before parsing JSON.
 * 4. Error state cleared at the start of a new query/category change.
 * 5. Full dependency array [query, category].
 * 6. Stable unique key (product.id) instead of array index.
 * 7. Ignores AbortError silently without updating error state.
 * 8. Resets loading state safely only for the active request.
 * 9. Defensive handling for empty/undefined responses.
 */
export function ProductSearchFixed({ category }) {
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // 1. Reset error state when a new search cycle begins
    setError("");

    // 2. Abort controller to cancel in-flight network requests
    const controller = new AbortController();

    // 3. Debounce timer
    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const encodedQuery = encodeURIComponent(query.trim());
        const encodedCategory = encodeURIComponent(category ?? "");

        const response = await fetch(
          `/api/products?q=${encodedQuery}&category=${encodedCategory}`,
          { signal: controller.signal }
        );

        // HTTP error check: fetch only rejects on network failures, not 4xx/5xx
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch (err) {
        // Do not record error if the fetch was intentionally aborted
        if (err.name !== "AbortError") {
          setError(err.message || "An unexpected error occurred");
          setProducts([]);
        }
      } finally {
        // Only turn off loading if this request was not cancelled
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    // Effect cleanup: runs whenever `query` or `category` changes, or on unmount
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category]);

  return (
    <div className="search-box">
      <input
        aria-label="Search query"
        placeholder="Type to search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {loading && <p role="status">Loading...</p>}
      {error && <p role="alert" className="error-text">{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id || product.title}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
