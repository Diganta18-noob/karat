# Frontend answers in simple steps

Each answer has a question, a short list of mistakes, simple code with comments, and an explanation. Repeated Excel reports use the same answer. These are separate examples: use one App.jsx at a time.

## How to run a React answer

Open the named practice folder, put the answer in App.jsx, and run its dev command. These instructions assume the parent project's dependencies are already installed, as in your existing workspace.

```powershell
cd D:\Antigravity\Karat\practice\05-product-pagination
npm run dev
```

Open the Local URL printed in the terminal. Keep the terminal running. Press Ctrl+C to stop it. For another exercise, change the folder name as shown below. Normal imports from "react" are for your existing Vite workspace; do not mix them with CDN imports and ReactDOM.render in App.jsx.

## The small fetch Hook used in answers 1, 2, 4 and 6

**Original problem:** A failed HTTP request can continue into the success code. Network errors are not caught, and a new request does not reset loading.

Save this once as **useFetch.js**, in the same exercise folder as App.jsx. The applications below import it.

```jsx
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Stop an old request from updating the current screen.
    let ignore = false;

    async function loadData() {
      // A new request is starting.
      setLoading(true);
      setError("");

      try {
        const response = await fetch(url);

        // A response like 404 or 500 is not a success.
        if (!response.ok) {
          throw new Error("Could not load data");
        }

        const result = await response.json();

        // Use the result only if this request is still relevant.
        if (!ignore) {
          setData(result);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    // Runs before the next effect setup and on unmount.
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
```

**Understand it:** request data, check the response, read its JSON, then save it. Catch failures. `ignore` prevents an old result from changing the screen; it does not cancel the network transfer.

## 1. Show 10 products per page

**Excel:** F2, F3, F5, F12–F15 and F17.

**Question:** Show ten products and let the user move to the next or previous page.

**Mistakes:** The original maps every product, the page state is unused, and the navigation buttons do nothing. Some copies have missing list keys and copied extra quotes. F17 already has the correct slice calculation; it mainly needs keys, fetch fixes, and empty-result handling.

**Folder:** practice/05-product-pagination. Save the Hook above as useFetch.js and this as App.jsx.

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Product not found.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="150" />
    </div>
  );
}

function ListProducts({ changeLocation }) {
  // Start at page 1.
  const [page, setPage] = useState(1);

  // Show 10 products on each page.
  const limit = 10;

  // Page 1 skips 0; page 2 skips 10; page 3 skips 20.
  const skip = (page - 1) * limit;

  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data || data.products.length === 0) return <p>No products.</p>;

  return (
    <div>
      <h1>Products</h1>

      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <button onClick={() => changeLocation("view", { id: product.id })}>
              {product.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Do not go below page 1. */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      <span> Page {page} </span>

      {/* Stop when all products have been covered. */}
      <button disabled={skip + limit >= data.total} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState({ page: "list", params: {} });

  function changeLocation(page, params = {}) {
    setLocation({ page, params });
  }

  return (
    <div>
      {location.page === "list" ? (
        <ListProducts changeLocation={changeLocation} />
      ) : (
        <>
          <ViewProduct id={location.params.id} />
          <button onClick={() => changeLocation("list")}>Return to list</button>
        </>
      )}
    </div>
  );
}
```

**Explain:** `page` remembers the selected page. `limit` is the page size. `skip` tells the API how many products to skip. Changing page changes the URL and starts a new request. Returning from details starts the list at page 1 in this simple version.

**Test:** Page 1 has up to ten products. Next shows different products. Previous is disabled on page 1. Next is disabled on the last page.

**Important different requirement in F19:** Its question explicitly asks for frontend-only pagination. Use the following calculation on an already available products array rather than making a new API request for each page:

```js
const limit = 10;
const start = (page - 1) * limit;
const visibleProducts = products.slice(start, start + limit);
const totalPages = Math.ceil(products.length / limit);
```

Render visibleProducts, and disable Next when page >= totalPages. Do not fetch again solely because the frontend page changed.

## 2. Fix fetching and show product details

**Excel:** F2, F6, F11–F13 and F16.

**Question:** Fix fetching, then display the product title, category, price, description and thumbnail. F16 also requests discount percentage.

**Mistakes:** `Fetch()` is not the declared `useFetch()` Hook. The original returns only `View`. It has no loading/error display in that component. The F16 field selection also omits the requested discount.

**Folder:** practice/06-fetch-and-product-details. Use the shared useFetch.js and this App.jsx.

```powershell
cd D:\Antigravity\Karat\practice\06-fetch-and-product-details
npm run dev
```

```jsx
import useFetch from "./useFetch.js";

export default function App() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products/1"
  );

  // Wait for the response before reading product fields.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Product not found.</p>;

  return (
    <div>
      {/* Display the title in bold. */}
      <h1><strong>{data.title}</strong></h1>

      <p>Category: {data.category}</p>

      {/* Always show two digits after the decimal point. */}
      <p>Price: ${data.price.toFixed(2)}</p>

      <p>Discount: {data.discountPercentage}%</p>
      <p>Description: {data.description}</p>

      {/* alt describes the image. */}
      <img src={data.thumbnail} alt={data.title} width="200" />
    </div>
  );
}
```

**Explain:** First fix the Hook name and request handling. Then check loading/error before accessing the data. The shared Hook solves the request bug; JSX solves the missing display. This small example shows Product 1. If the provided app already passes an id, keep ViewProduct({ id }) and use that id in the URL, as in answer 1.

## 3. Share navigation using Context

**Excel:** F16, F20 and F21; related Context requirement in F19.

**Question:** Share location and changeLocation through Context instead of repeatedly passing navigation props.

**Mistakes:** Misspelled createContext, missing useContext import, lowercase provider, missing value object, different Context capitalization, duplicate changeLocation, and navigation variables used outside their scope.

**Folder:** practice/07-router-context. This answer uses the existing data.js.

```powershell
cd D:\Antigravity\Karat\practice\07-router-context
npm run dev
```

```jsx
import { createContext, useContext, useState } from "react";
import { products } from "./data.js";

// Create a place to share navigation.
const RouterContext = createContext(null);

function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("Put this component inside RouterProvider");
  return router;
}

function RouterProvider({ children }) {
  const [location, setLocation] = useState({ page: "list", params: {} });

  function changeLocation(page, params = {}) {
    setLocation({ page, params });
  }

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
      {products.slice(0, 3).map((product) => (
        <li key={product.id}>
          <button onClick={() => changeLocation("view", { id: product.id })}>
            {product.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Detail() {
  const { location, changeLocation } = useRouter();

  // Find the product selected in the list.
  const product = products.find((item) => item.id === location.params.id);

  return (
    <div>
      <h2>{product ? product.title : "Product not found"}</h2>
      <button onClick={() => changeLocation("list")}>Back</button>
    </div>
  );
}

function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <List /> : <Detail />;
}

export default function App() {
  // All components using useRouter must be below this provider.
  return <RouterProvider><Pages /></RouterProvider>;
}
```

**Explain:** The provider owns the screen state. List and Detail read it through useRouter. Clicking a product changes the page and stores its ID. Back changes the page to list. It looks the same as props-based navigation; the code gets navigation differently. Context itself does not manage browser URLs or history.

## 4. Edit birth dates with Apply and Cancel

**Excel:** F10, F13–F15, F20 and F21.

**Question:** Edit a user's birth date. Apply saves it and moves the user to the correct group. Cancel discards typing. Only one user is edited at a time.

**Mistakes:** The original Edit button has no handler, no input or Apply/Cancel, no update logic and missing keys. The date comparator should return zero for equal values. The heading says after 2000 but code includes 2000; this answer explicitly includes 2000 in the second group.

**Folder:** practice/09-edit-user-birthdates. Save the shared useFetch.js above beside this App.jsx.

```powershell
cd D:\Antigravity\Karat\practice\09-edit-user-birthdates
npm run dev
```

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

export default function App() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/users?limit=100"
  );
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [birthDate, setBirthDate] = useState("");

  // Save the fetched users in editable state.
  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    // Starting another edit replaces the previous draft.
    setEditingId(user.id);
    setBirthDate(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setBirthDate("");
  }

  function applyEdit() {
    if (!birthDate) return;

    // Update only the selected user.
    const updatedUsers = users.map((user) =>
      user.id === editingId ? { ...user, birthDate } : user
    );

    setUsers(updatedUsers);
    cancelEdit();
  }

  // Valid YYYY-MM-DD dates can be sorted as strings.
  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );

  const before = sortedUsers.filter((user) => Number(user.birthDate.slice(0, 4)) < 2000);
  const after = sortedUsers.filter((user) => Number(user.birthDate.slice(0, 4)) >= 2000);

  function showUsers(list) {
    return list.map((user) => (
      <div key={user.id}>
        <p>{user.name}: {user.birthDate}</p>

        {editingId === user.id ? (
          <>
            <input type="date" value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)} />
            <button onClick={applyEdit}>Apply</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : <button onClick={() => editUser(user)}>Edit</button>}
      </div>
    ));
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Born before 2000</h2>
      {showUsers(before)}

      <h2>Born in or after 2000</h2>
      {showUsers(after)}
    </div>
  );
}
```

**Explain:** users contains saved values. birthDate contains only the current draft. Apply updates one user. The groups are calculated from users, so movement happens automatically. Cancel does not change users.

This assumes the supplied birth dates use YYYY-MM-DD. Normalize other date formats before using a date input.

## 5. Make the supplied search example actually use debounce

**Excel:** F27. Earlier rows mention search discussion without the original snippet.

**Mistake:** The supplied debounce example calculates a delayed query but never uses it for searching. The separate immediate-filter example is valid, but does not debounce.

**Folder:** practice/04-debounced-search. Put this in App.jsx.

```powershell
cd D:\Antigravity\Karat\practice\04-debounced-search
npm run dev
```

```jsx
import { useEffect, useState } from "react";

const products = ["Laptop", "Mobile", "Headphones", "Keyboard"];

export default function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState(products);

  useEffect(() => {
    // Search only after typing has stopped for 500 ms.
    const timer = setTimeout(() => {
      const matches = products.filter((product) =>
        product.toLowerCase().includes(text.toLowerCase())
      );
      setResults(matches);
    }, 500);

    // Cancel the earlier search when the user types again.
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      {results.map((product) => <p key={product}>{product}</p>)}
      {results.length === 0 && <p>No products found.</p>}
    </div>
  );
}
```

**Explain:** Typing updates the input immediately. The timer delays only the filtering. Every new character cancels the previous timer. No extra memoization is needed in this small version.

## 6. Fetch users and show loading/error/success

**Excel:** F27.

**Mistake:** The original handles errors but does not stop an outdated request from updating the component. The shared Hook above supplies that protection.

Use a React practice folder with useFetch.js beside App.jsx, for example practice/06-fetch-and-product-details.

```jsx
import useFetch from "./useFetch.js";

export default function App() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (!data || data.length === 0) return <p>No users.</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}: {user.email}</li>
      ))}
    </ul>
  );
}
```

## 7. Lazy loading

**Excel:** F27.

**Status:** The supplied lazy/Suspense code is valid if the imported component exists and has a default export. This example adds a button so you can see when the component is requested.

Save **Dashboard.jsx** beside App.jsx:

```jsx
export default function Dashboard() {
  return <h1>Dashboard loaded</h1>;
}
```

Save **App.jsx**:

```jsx
import { lazy, Suspense, useState } from "react";

// The component's module is loaded when React first renders it.
const Dashboard = lazy(() => import("./Dashboard.jsx"));

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Open dashboard</button>
      {show && (
        <Suspense fallback={<p>Loading...</p>}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  );
}
```

**Explain:** lazy loads the component code when needed. Suspense displays a message while it loads. A failed download needs an error boundary in a production application.

## Remaining code questions: small JavaScript functions

The frontend sheet also includes word wrapping, justification and robot parts. Their simple runnable answers are in [the beginner JavaScript/backend guide](BEGINNER-BACKEND-ANSWERS.md). The same guide covers social connections, teleporters, scrambled words, grid search and song pairs where the frontend workbook supplies prompts rather than solution code.

## Source rows without a supplied implementation

- F4/F8/F9: teleporter problem statements; see the JavaScript guide.
- F18: the fetch snippet is cut off. Use the full Hook above; do not claim to reconstruct its missing source.
- F19: OfficeList/UserList code is not provided. Exact defects cannot be identified. Its navigation and frontend-only pagination are explained in answers 1 and 3.
- F22: social connections; no function supplied.
- F23: faulty word wrapping; F24: incomplete robot parts; F25: scrambled-word/grid prompts; F26: song pair.

All original statements and the full row mapping remain in [the source review](REACT-FRONTEND-QUESTIONS-REVIEW.md). No class/reducer/communication discussion answers are added here.

## Checks completed

The seven React examples compile. All 20 JavaScript answer blocks parse, and the Node demonstration calls run. The simplified stock and gym answers pass the original workbook tests. External API requests, MySQL connections and interactive browser behavior were not integration-tested. Existing practice files were not edited.
