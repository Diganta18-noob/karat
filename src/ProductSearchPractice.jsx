import React from "react";

/**
 * YOUR PRACTICE COMPONENT:
 * 
 * Edit this file to practice writing the solution yourself from scratch!
 * You can run `npm run test:practice` to check your implementation against the test suite,
 * or toggle to this component in the browser UI to interactively test it.
 */
export function ProductSearchPractice({ category }) {
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // TODO: Implement your solution here!
    // 1. Clear previous errors
    // 2. Setup AbortController
    // 3. Setup debounce timer (300ms)
    // 4. Handle fetch, status check, AbortError filtering
    // 5. Cleanup timer and abort controller
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
        {products.map((product, index) => (
          <li key={product.id || index}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
