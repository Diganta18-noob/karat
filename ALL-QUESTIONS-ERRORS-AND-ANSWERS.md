# Every original code question: errors and corrected answers

[Start with the simple commented answers and run commands](BEGINNER-FRONTEND-ANSWERS.md).

This document reviews the supplied question-and-code attachment. Each source question is followed by its original code, specific problems, and a corrected answer. Repeated rows are retained. Discussion-round answers are excluded. Where there is only input data or a missing snippet, no implementation error is invented.

## Contents

- [React JS!F2](#react-jsf2)
- [React JS!F3](#react-jsf3)
- [React JS!F4](#react-jsf4)
- [React JS!F5](#react-jsf5)
- [React JS!F6](#react-jsf6)
- [React JS!F7](#react-jsf7)
- [React JS!F8](#react-jsf8)
- [React JS!F9](#react-jsf9)
- [React JS!F10](#react-jsf10)
- [React JS!F11](#react-jsf11)
- [React JS!F12](#react-jsf12)
- [React JS!F13](#react-jsf13)
- [React JS!F14](#react-jsf14)
- [React JS!F15](#react-jsf15)
- [React JS!F16](#react-jsf16)
- [React JS!F17](#react-jsf17)
- [React JS!F18](#react-jsf18)
- [React JS!F19](#react-jsf19)
- [React JS!F20](#react-jsf20)
- [React JS!F21](#react-jsf21)
- [React JS!F22](#react-jsf22)
- [React JS!F23](#react-jsf23)
- [React JS!F24](#react-jsf24)
- [React JS!F25](#react-jsf25)
- [React JS!F26](#react-jsf26)
- [React JS!F27](#react-jsf27)

## Error comments

Short comments above the relevant lines explain the error. Comments marked "Missing" identify required functionality that has not been implemented.

## Shared corrected fetch Hook: useFetch.js

The workbook repeats an unsafe fetch Hook. Its error branch falls through into success, network failures are uncaught, loading is not reset, and older requests are not cleaned up. The optional method being absent is not a bug: fetch defaults to GET.

Save this shared Hook as `useFetch.js` beside each App.jsx below. These are separate example apps; do not combine their multiple default exports into one file.

```jsx
import { useEffect, useState } from "react";

export default function useFetch(url, method = "GET") {
  const [state, setState] = useState({
    data: null, loading: true, error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState({ data: null, loading: true, error: "" });
      try {
        const response = await fetch(url, {
          method, signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: "" });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [url, method]);

  return state;
}
```




## React JS!F2

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Use normal quotes, e.g. "list", not ""list"".
// Error: Change the page here instead of showing an alert.
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

### Question 2 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  ""id"": 1,
  ""title"": ""iPhone 9"",
  ""description"": ""An apple mobile which is nothing like apple"",
  ""price"": 549.99,
  ""discountPercentage"": 12.96,
  ""rating"": 4.69,
  ""stock"": 94,
  ""brand"": ""Apple"",
  ""category"": ""smartphones"",
  ""thumbnail"": ""https://dummyjson.com/image/i/products/1/thumbnail.jpg"",
  ""images"": [
    ""https://dummyjson.com/image/i/products/1/1.jpg"", ...
  ]
  .
  .
  .
}

In the below code, try to do code optimization so that the performance is improved

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

## React JS!F3

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
  const {data, error, loading} = useFetch("https://dummyjson.com/products/" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Change the page here instead of showing an alert.
  alert("hello");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
            <a className="link" onClick={() => changeLocation("view", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "list", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

## React JS!F4

### Question 1 in this cell

This is a game simulation problem where you are to determine all the possible squares a player can move to in a single turn, accounting for die rolls and teleporters. Let's break it down.
 
 
---
 
✅ Problem Summary:
 
You have:
 
A board from square 0 to last_square.
 
A player starts on a given square.
 
On each turn, the player rolls a die (numbered 1 to die_sides).
 
They move forward that number of squares.
 
If they land on a square that is the start of a teleporter, they jump to the teleporter's end.
 
Only one teleporter is followed per turn.
 

 
✍️ Input:
 
teleporters: list of strings like ["3,1", "4,2", "5,10"]
 
die_sides: number of sides on the die
 
start: starting square
 
last_square: last square on the board

**Code:** No implementation snippet was included in this cell.

#### Problems in this snippet

- The report contains a question statement but no implementation to debug.
- The overshoot rule is missing; clarify it before choosing an implementation.

#### Corrected answer and explanation

#### 11. Dice and teleporters

**Question:** Return all final squares reachable after one die roll and at most one teleport.

**Source limitation:** No algorithm is supplied. The report does not specify overshoot behavior. This answer assumes an overshooting roll is invalid and contributes no destination. Change that rule only after clarification.

```js
function destinations(teleporters, dieSides, start, lastSquare) {
  const jumps = new Map(teleporters.map((value) => value.split(",").map(Number)));
  const result = new Set();

  for (let roll = 1; roll <= dieSides; roll++) {
    const landing = start + roll;
    if (landing > lastSquare) continue;
    result.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...result];
}
```

**Explanation:** Build lookup once, enumerate rolls, then perform only one lookup for the landing square. A Set merges repeated destinations. Time O(T+D), space O(T+D), for T teleporters and D die sides.

## React JS!F5

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
  const {data, error, loading} = useFetch("https://dummyjson.com/products/" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Change the page here instead of showing an alert.
  alert("hello");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
            <a className="link" onClick={() => changeLocation("view", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "list", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

## React JS!F6

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549.99,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  "images": [
    "https://dummyjson.com/image/i/products/1/1.jpg", ...
  ]
  .
  .
  .
}

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "view", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

## React JS!F7

### Question 1 in this cell

We are building a word processor and we would like to implement a "reflow" functionality that also applies full justification to the text.

Given an array containing lines of text and a new maximum width, re-flow the text to fit the new width. Each line should have the exact specified width. If any line is too short, insert '-' (as stand-ins for spaces) between words as equally as possible until it fits.

Note: we are using '-' instead of spaces between words to make testing and visual verification of the results easier.


lines = [ "The day began as still as the",
          "night abruptly lighted with",
          "brilliant flame" ]

reflowAndJustify(lines, 24) "reflow lines and justify to length 24" =>

        [ "The--day--began-as-still",
          "as--the--night--abruptly",
          "lighted--with--brilliant",
          "flame" ] // <--- a single word on a line is not padded with spaces

reflowAndJustify(lines, 25) "reflow lines and justify to length 25" =>

        [ "The-day-began-as-still-as"
          "the-----night----abruptly"
          "lighted---with--brilliant"
          "flame" ]

reflowAndJustify(lines, 26) "reflow lines and justify to length 26" =>

        [ "The--day-began-as-still-as",
          "the-night-abruptly-lighted",
          "with----brilliant----flame" ]

reflowAndJustify(lines, 40) "reflow lines and justify to length 40" =>

        [ "The--day--began--as--still--as-the-night",
          "abruptly--lighted--with--brilliant-flame" ]

reflowAndJustify(lines, 14) "reflow lines and justify to length 14" =>

        ['The--day-began',
         'as---still--as',
         'the------night',
         'abruptly',
         'lighted---with',
         'brilliant',
         'flame']

reflowAndJustify(lines, 15) "reflow lines and justify to length 15" =>

        ['The--day--began',
         'as-still-as-the',
         'night--abruptly',
         'lighted----with',
         'brilliant-flame']

lines2 = [ "a b", "c d" ]         

reflowAndJustify(lines2, 20) "reflow lines2 and justify to length 20" =>

        ['a------b-----c-----d']

reflowAndJustify(lines2, 4) "reflow lines2 and justify to length 4" =>

        ['a--b',
         'c--d']

reflowAndJustify(lines2, 2) "reflow lines2 and justify to length 2" =>

        ['a',
         'b',
         'c',
         'd']

All Test Cases:
                 lines, reflow width
reflowAndJustify(lines, 24)
reflowAndJustify(lines, 25)
reflowAndJustify(lines, 26)
reflowAndJustify(lines, 40)
reflowAndJustify(lines, 14)
reflowAndJustify(lines, 15)
reflowAndJustify(lines2, 20)
reflowAndJustify(lines2, 4)
reflowAndJustify(lines2, 2)

n = number of words OR total characters

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
"use strict";

const lines = ["The day began as still as the","night abruptly lighted with","brilliant flame"];
const lines2 = ["a b","c d"];

const wrapLines=(value, maxLen) => {
  const lines = [];
  let currentLine = [];
  
  for(let val of value) {
    let linewithWord = currentLine.concat(val).join("-");
    
    if(linewithWord.length <= maxLen) {
      currentLine.push(val);
    } else {
      lines.push(currentLine.join("-"));
      currentLine = [val];
    }
  }
  
  if(currentLine.length > 0) {
    lines.push(currentLine.join("-"))
  }
  
  return lines;
}

// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words1, 13));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words1, 12));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words1, 20));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words2, 5));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words2, 30));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words3, 5));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words4, 5));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words5, 20));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words6, 20));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words6, 4));
// Error: This words variable is not defined. Define it before calling wrapLines.
console.log(wrapLines(words6, 1));



function reflowAndJustify(lines, maxWidth) {
  let words = lines.join(" ").split(/\s+/);
  
// Error: Incomplete let declaration. Finish the function and return the result.
  let 
}
```

</details>

#### Problems in this snippet

- reflowAndJustify is unfinished and ends with an incomplete let declaration.
- The test calls reference word arrays not defined in this cell.
- The supplied wrapLines packs words but does not implement full justification.

#### Corrected answer and explanation

#### 12. Reflow and full justification

**Question:** Reflow input lines to a specified width, inserting hyphens evenly between words. Single-word lines are not padded.

**Original problems:** The main function ends at an incomplete `let`; test calls reference undefined word arrays; the helper only wraps with one separator and never implements full justification.

```js
function reflowAndJustify(lines, width) {
  if (!Number.isInteger(width) || width <= 0) throw new Error("Invalid width");
  const text = lines.join(" ").trim();
  if (!text) return [];
  const words = text.split(/\s+/);
  if (words.some((word) => word.length > width)) {
    throw new Error("A word is wider than the line");
  }

  const result = [];
  let group = [];
  let letters = 0;

  function justify() {
    if (group.length === 1) return group[0];
    const gaps = group.length - 1;
    const hyphens = width - letters;
    const base = Math.floor(hyphens / gaps);
    const extra = hyphens % gaps;
    return group.map((word, index) =>
      word + (index < gaps ? "-".repeat(base + (index < extra ? 1 : 0)) : "")
    ).join("");
  }

  for (const word of words) {
    if (group.length > 0 && letters + word.length + group.length > width) {
      result.push(justify());
      group = [];
      letters = 0;
    }
    group.push(word);
    letters += word.length;
  }
  if (group.length) result.push(justify());
  return result;
}
```

**Explanation:** letters+newWordLength+existingWordCount is the minimum length with one separator per gap. When the next word does not fit, distribute the required hyphens using quotient/remainder. Unlike some text-justification variants, this question also justifies the final multiword line. This solution explicitly rejects oversized words; clarify that policy in the interview. Time O(input characters + output characters); space includes output.

## React JS!F8

### Question 1 in this cell

This is a game simulation problem where you are to determine all the possible squares a player can move to in a single turn, accounting for die rolls and teleporters. Let's break it down.
 
 
---
 
✅ Problem Summary:
 
You have:
 
A board from square 0 to last_square.
 
A player starts on a given square.
 
On each turn, the player rolls a die (numbered 1 to die_sides).
 
They move forward that number of squares.
 
If they land on a square that is the start of a teleporter, they jump to the teleporter's end.
 
Only one teleporter is followed per turn.
 

 ✍️ Input:
 
teleporters: list of strings like ["3,1", "4,2", "5,10"]
 
die_sides: number of sides on the die
 
start: starting square
 
last_square: last square on the board

**Code:** No implementation snippet was included in this cell.

#### Problems in this snippet

- The report contains a question statement but no implementation to debug.
- The overshoot rule is missing; clarify it before choosing an implementation.

#### Corrected answer and explanation

#### 11. Dice and teleporters

**Question:** Return all final squares reachable after one die roll and at most one teleport.

**Source limitation:** No algorithm is supplied. The report does not specify overshoot behavior. This answer assumes an overshooting roll is invalid and contributes no destination. Change that rule only after clarification.

```js
function destinations(teleporters, dieSides, start, lastSquare) {
  const jumps = new Map(teleporters.map((value) => value.split(",").map(Number)));
  const result = new Set();

  for (let roll = 1; roll <= dieSides; roll++) {
    const landing = start + roll;
    if (landing > lastSquare) continue;
    result.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...result];
}
```

**Explanation:** Build lookup once, enumerate rolls, then perform only one lookup for the landing square. A Set merges repeated destinations. Time O(T+D), space O(T+D), for T teleporters and D die sides.

## React JS!F9

### Question 1 in this cell

This is a game simulation problem where you are to determine all the possible squares a player can move to in a single turn, accounting for die rolls and teleporters. Let's break it down.
 
 
---
 
✅ Problem Summary:
 
You have:
 
A board from square 0 to last_square.
 
A player starts on a given square.
 
On each turn, the player rolls a die (numbered 1 to die_sides).
 
They move forward that number of squares.
 
If they land on a square that is the start of a teleporter, they jump to the teleporter's end.
 
Only one teleporter is followed per turn.
 

 ✍️ Input:
 
teleporters: list of strings like ["3,1", "4,2", "5,10"]
 
die_sides: number of sides on the die
 
start: starting square
 
last_square: last square on the board

**Code:** No implementation snippet was included in this cell.

#### Problems in this snippet

- The report contains a question statement but no implementation to debug.
- The overshoot rule is missing; clarify it before choosing an implementation.

#### Corrected answer and explanation

#### 11. Dice and teleporters

**Question:** Return all final squares reachable after one die roll and at most one teleport.

**Source limitation:** No algorithm is supplied. The report does not specify overshoot behavior. This answer assumes an overshooting roll is invalid and contributes no destination. Change that rule only after clarification.

```js
function destinations(teleporters, dieSides, start, lastSquare) {
  const jumps = new Map(teleporters.map((value) => value.split(",").map(Number)));
  const result = new Set();

  for (let roll = 1; roll <= dieSides; roll++) {
    const landing = start + roll;
    if (landing > lastSquare) continue;
    result.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...result];
}
```

**Explanation:** Build lookup once, enumerate rolls, then perform only one lookup for the landing square. A Set merges repeated destinations. Time O(T+D), space O(T+D), for T teleporters and D die sides.

## React JS!F10

### Question 1 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);

  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }

    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
  return (    
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>

        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>

      <div className="after">
        <h3>Users born after 2000</h3>

        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};

const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);

    return [before, after];
}

function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}

function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F11

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549.99,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  "images": [
    "https://dummyjson.com/image/i/products/1/1.jpg", ...
  ]
  .
  .
  .
}

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "view", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

## React JS!F12

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Use normal quotes, e.g. "list", not ""list"".
// Error: Change the page here instead of showing an alert.
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

### Question 2 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  ""id"": 1,
  ""title"": ""iPhone 9"",
  ""description"": ""An apple mobile which is nothing like apple"",
  ""price"": 549.99,
  ""discountPercentage"": 12.96,
  ""rating"": 4.69,
  ""stock"": 94,
  ""brand"": ""Apple"",
  ""category"": ""smartphones"",
  ""thumbnail"": ""https://dummyjson.com/image/i/products/1/thumbnail.jpg"",
  ""images"": [
    ""https://dummyjson.com/image/i/products/1/1.jpg"", ...
  ]
  .
  .
  .
}

In the below code, try to do code optimization so that the performance is improved

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));"
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

## React JS!F13

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Use normal quotes, e.g. "list", not ""list"".
// Error: Change the page here instead of showing an alert.
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

### Question 2 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  ""id"": 1,
  ""title"": ""iPhone 9"",
  ""description"": ""An apple mobile which is nothing like apple"",
  ""price"": 549.99,
  ""discountPercentage"": 12.96,
  ""rating"": 4.69,
  ""stock"": 94,
  ""brand"": ""Apple"",
  ""category"": ""smartphones"",
  ""thumbnail"": ""https://dummyjson.com/image/i/products/1/thumbnail.jpg"",
  ""images"": [
    ""https://dummyjson.com/image/i/products/1/1.jpg"", ...
  ]
  .
  .
  .
}

In the below code, try to do code optimization so that the performance is improved

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));"
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

### Question 3 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);


  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }

    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
  return (
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>

        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>

      <div className="after">
        <h3>Users born after 2000</h3>

        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};

const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);

    return [before, after];
}

function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}

function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F14

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
const displayList = () =>{
// Error: Use normal quotes, e.g. "list", not ""list"".
// Error: Change the page here instead of showing an alert.
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
    {/* Missing: Render only 10 products for the selected page. */}
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
// Missing: Track the current page separately from the page size (10).
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
    {/* Missing: Add onClick and disable this button at the page boundary. */}
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

### Question 2 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);


  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }

    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
  return (
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>

        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>

      <div className="after">
        <h3>Users born after 2000</h3>

        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};

const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);

    return [before, after];
}

function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}

function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F15

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'react'; // This line is added to make the code run in OneCompiler Platform. 
// import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';  [actual line used in karat studio.] 
// import ReactDOM from 'https://cdn.skypack.dev/react-dom'; [actual line used in karat studio] 

const useFetch = (url, method = "GET") => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

const ViewProduct = ({id}) => {
  const {data, error, loading} = useFetch("https://dummyjson.com/products/" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}


const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
            <a className="link" onClick={() => changeLocation("view", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "list", params: {} });
 
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation} />}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <button className="link" onClick={() => changeLocation("list")}>Return to list</button>
        </div>
      )}
      
    </div>
  )
}

// ReactDOM.render(<App />, document.getElementById('root')) // This is the actual line used in Karat studio
export default App; // This line is added to make the code run in OneCompiler Platform.
```

</details>

#### Problems in this snippet

- The list maps every fetched product instead of a ten-product slice.
- The pages state/prop does not implement navigation; setPages is unused.
- Previous/Next have no click handlers; displayList only shows an alert.
- The mapped li needs key={product.id}.
- The shared fetch Hook continues after HTTP failures, lacks catch/reset, and has no cleanup.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

### Question 2 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.
 
We have an initial code that fetches the user list and displays the modified lists.
 
We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.
 
The button actions:
 
* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.
 
Run the code to see the image of functionality needed.
 
If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.
 
Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);
  
 
  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }
 
    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
 
  
  return (
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>
 
        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>
 
      <div className="after">
        <h3>Users born after 2000</h3>
 
        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 
const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};
 
const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
 
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
 
// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}
 
const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);
 
    return [before, after];
}
 
function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}
 
function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F16

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website. Currently, the code fails when attempting to fetch the data. Please identify why and fix it.

Additionally, modify the given React application so that the ViewProduct component displays the following:

* The following information once the data is loaded:
    * Title, in bold
    * Category
    * Price retrieved from the API formatted as dollars and cents with the dollar symbol, e.g. $450.00
    * Discount Percentage
    * Description
    * The thumbnail image

Treat this like a production application, using appropriate best practices.

The API data returned has the following shape:

{
  ""id"": 1,
  ""title"": ""iPhone 9"",
  ""description"": ""An apple mobile which is nothing like apple"",
  ""price"": 549.99,
  ""discountPercentage"": 12.96,
  ""rating"": 4.69,
  ""stock"": 94,
  ""brand"": ""Apple"",
  ""category"": ""smartphones"",
  ""thumbnail"": ""https://dummyjson.com/image/i/products/1/thumbnail.jpg"",
  ""images"": [
    ""https://dummyjson.com/image/i/products/1/1.jpg"", ...
  ]
  .
  .
  .
}

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])

  return state;
}

// Missing: Check loading and error before reading data.
const ViewProduct = ({id}) => {
// Error: Replace Fetch(...) with useFetch(...).
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    {/* Missing: Display the requested product details here. */}
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (<li onClick={() => changeLocation('view', {id: product.id})} key={product.id}>{product.title}</li>))}
      </ul>
    </div>
  );
}

const App = () => {
  const [location, setLocation] = useState({ page: "view", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

</details>

#### Problems in this snippet

- Fetch(...) is undefined; the declared Hook is useFetch(...).
- The component only displays View, not the requested product fields.
- Loading/error/null guards are missing from ViewProduct.
- The shared fetch Hook continues after HTTP failure and does not catch failures, reset loading, or clean up.
- If the question requires discountPercentage, request that field and display it.

#### Corrected answer and explanation

#### 6. Repair fetch and render product details

**Question:** Fix the fetch failure and display bold title, category, dollar price, description and thumbnail. F16 additionally requires discount percentage.

**Exact error:** `Fetch(...)` is undefined; call `useFetch(...)`. The original component only returns `View`. F16 selects fields without `discountPercentage`. The shared Hook has the errors explained above.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ViewProduct({ id }) {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail,discountPercentage`
  );
  if (loading) return <p>Loading product...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
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

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  return selectedId === null ? <ListProducts openProduct={setSelectedId} /> : (
    <>
      <ViewProduct id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** Loading/error/null guards run before data fields are read. `toFixed(2)` formats the supplied numeric price with two decimal places. Image alt text describes the thumbnail. Buttons provide keyboard-accessible navigation actions. The requested field selection includes discount.

### Question 2 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
// Error: Spell it createContext and import useContext.
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
// Error: Spell it createContext and import useContext.
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
    {/* Error: Use .Provider with value={{ location, changeLocation }}. */}
    <HandlePageContext.provider location={location} changeLocation={changeLocation}>
        {children}
 
    </HandlePageContext.provider>
  )
}
 
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
 
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])
 
  return state;
}
 
const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
 
const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
// Error: Import useContext, use HandlePageContext, and remove the duplicate changeLocation prop.
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
const App = () => {
 
 
  return (
    {/* Error: Use HandlePageContext; consume it inside a child of the Provider. */}
    <RouterComponent provider={handlePageContext}>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
    {/* Error: Remove the accidentally pasted +F9. */}
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- createContex is misspelled; useContext is not imported.
- HandlePageContext.provider needs uppercase Provider.
- The provider must receive value={{ location, changeLocation }}.
- handlePageContext and HandlePageContext are different identifiers.
- ListProducts declares changeLocation twice: as a prop and a local Context value.
- App reads location/changeLocation that are not defined in its scope; move consuming UI below the provider.
- Remove the irrelevant provider prop and stray +F9.
- Add missing list keys and fix shared fetch error handling.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 7. Replace navigation prop passing with Context

**Question:** Share current location and its update function through Context, keeping list/detail/Back behavior.

##### Original problems and corrections

| Faulty code | Correction |
|---|---|
| `createContex` | `createContext` |
| useContext is not imported | Import it |
| `.provider` | `.Provider` |
| Separate location/changeLocation provider props | `value={{location, changeLocation}}` |
| `handlePageContext` vs `HandlePageContext` | Use one name consistently |
| changeLocation prop plus same-named local declaration | Remove the navigation prop |
| App reads undefined location/changeLocation | Read Context in a child below the provider |
| `provider={handlePageContext}` on the wrapper | Remove it; the real Context Provider supplies value |
| Stray `+F9` | Remove the copied text |

##### Corrected App.jsx

```jsx
import { createContext, useContext, useState } from "react";
import useFetch from "./useFetch.js";

const RouterContext = createContext(null);

function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter requires RouterProvider");
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

function ListProducts() {
  const { changeLocation } = useRouter();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;
  return (
    <ul>{data.products.map((product) => (
      <li key={product.id}>
        <button onClick={() => changeLocation("view", { id: product.id })}>
          {product.title}
        </button>
      </li>
    ))}</ul>
  );
}

function Detail() {
  const { location, changeLocation } = useRouter();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${location.params.id}`
  );
  return (
    <>
      {loading ? <p>Loading...</p> : error ? <p role="alert">{error}</p> : (
        <article>
          <h1>{data?.title ?? "Product not found"}</h1>
          {data && <>
            <p>Category: {data.category}</p>
            <p>Price: ${data.price.toFixed(2)}</p>
            <p>{data.description}</p>
            <img src={data.thumbnail} alt={data.title} width="200" />
          </>}
        </article>
      )}
      <button onClick={() => changeLocation("list")}>Return to list</button>
    </>
  );
}

function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <ListProducts /> : <Detail />;
}

export default function App() {
  return <RouterProvider><Pages /></RouterProvider>;
}
```

**Explanation:** The provider owns location state. The custom Hook reads it. List sets the selected product ID; Pages switches screens; Detail reads the ID and Back changes the page to list. A component cannot consume a provider it only returns below itself. Context shares navigation; it does not by itself update the browser URL or implement browser history.

## React JS!F17

### Question 1 in this cell

No separate question statement accompanies this snippet in the cell. The code is an attempted product-pagination implementation.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])
  return state;
}
const ViewProduct = ({id}) => {
  const {data, error, loading} = useFetch("https://dummyjson.com/products/" + id);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products")
  

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   //console.log(data.products.length);

  // console.log(data?.products);

  const totalProducts = data.products.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  //console.log(totalProducts); 

  const startIndex = (currentPage-1) * productsPerPage
  const endIndex = startIndex + productsPerPage

  console.log(startIndex,endIndex);
  const currentProducts = data.products.slice(startIndex,endIndex)
  console.log(currentProducts);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {currentProducts.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
            <a className="link" onClick={() => changeLocation("view", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}>Prev</button>
        <button>{currentPage} of {totalPages}</button>
    {/* Error: When totalPages is 0, Next stays enabled. Handle the empty list. */}
        <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}>Next</button>
      </div>

    </div>
  );
}
const App = () => {
  const [location, setLocation] = useState({ page: "list", params: {} });
  const [pages,setPages] = useState(10);
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return (
    <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}      
    </div>
  )
}
```

</details>

#### Problems in this snippet

- The existing slice arithmetic is correct.
- Each mapped li needs key={product.id}.
- The shared fetch Hook needs failure handling, loading reset and cleanup.
- Unused pages state/prop should be removed.
- Next is enabled with zero products because currentPage===totalPages is false; use >= and handle empty results.
- Only fetched products are paginated; preserving page on returning from details requires page state above the screen switch.

#### Corrected answer and explanation

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

## React JS!F18

### Question 1 in this cell

No separate question statement accompanies this snippet in the cell. The supplied fetch snippet is truncated.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
// Error: The snippet ends mid-statement. The remaining code is missing.
        se
```

</details>

#### Problems in this snippet

- The code is cut off at se inside the HTTP error branch.
- The snippet cannot run as supplied; the missing remainder cannot be reconstructed reliably.

#### Corrected answer and explanation

#### 19. Truncated source and copying artifacts

F18 ends at `se` inside a fetch condition. A complete solution cannot be derived from that incomplete fragment alone; the shared Hook above is a complete implementation of the apparent fetch task, not a reconstruction of the missing source.

Normalize copied quotes such as `""list""` only when they appear in actual code. Remove unrelated prose, stray spreadsheet text and unmatched comment delimiters before running snippets. The original ReactDOM.render lines reflect an older React setup; they are not the demonstrated cause of the fetch/Context bugs. The examples in this guide use separate App.jsx modules with normal package imports and assume the React project already mounts App. Do not paste several example applications into the same module.

For a complete fetch implementation, use the shared useFetch.js at the beginning of this document.

## React JS!F19

### Question 1 in this cell

OfficeList, Context component and User list component.
Questions:
1. Go through and explain.
2. Find errors
3. How to resolve errors

Coding question- List of products.
- Show products
- fix context
- Create back and forth navigation to products and list
- Create pagination for list of products.
Specifically to be created in frontend only, not to be using API.
As mentioned in row 17.

**Code:** No implementation snippet was included in this cell.

#### Problems in this snippet

- The OfficeList/UserList component code is not included, so exact code errors cannot be identified.
- The stated product task requires Context navigation and frontend-only pagination.

#### Corrected answer and explanation

#### 9. OfficeList / UserList / Context debugging

**Question:** Explain components, find errors, fix Context, display products, navigate and paginate on the frontend.

**Source limitation:** F19 only names the components; the actual OfficeList/UserList snippet is absent. Specific line errors cannot be established.

**Answer:** Explain provider placement, stable keys, state ownership and callbacks as relevant once the actual snippet is provided. For the product task, combine the Context structure from solution 7 with the frontend `slice` calculation from solution 5. If data is local, import it instead of calling useFetch. Do not replace its explicit frontend-only pagination with API pagination.

**Product implementation:** use the Context solution below with frontend slicing.

#### 7. Replace navigation prop passing with Context

**Question:** Share current location and its update function through Context, keeping list/detail/Back behavior.

##### Original problems and corrections

| Faulty code | Correction |
|---|---|
| `createContex` | `createContext` |
| useContext is not imported | Import it |
| `.provider` | `.Provider` |
| Separate location/changeLocation provider props | `value={{location, changeLocation}}` |
| `handlePageContext` vs `HandlePageContext` | Use one name consistently |
| changeLocation prop plus same-named local declaration | Remove the navigation prop |
| App reads undefined location/changeLocation | Read Context in a child below the provider |
| `provider={handlePageContext}` on the wrapper | Remove it; the real Context Provider supplies value |
| Stray `+F9` | Remove the copied text |

##### Corrected App.jsx

```jsx
import { createContext, useContext, useState } from "react";
import useFetch from "./useFetch.js";

const RouterContext = createContext(null);

function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter requires RouterProvider");
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

function ListProducts() {
  const { changeLocation } = useRouter();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;
  return (
    <ul>{data.products.map((product) => (
      <li key={product.id}>
        <button onClick={() => changeLocation("view", { id: product.id })}>
          {product.title}
        </button>
      </li>
    ))}</ul>
  );
}

function Detail() {
  const { location, changeLocation } = useRouter();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${location.params.id}`
  );
  return (
    <>
      {loading ? <p>Loading...</p> : error ? <p role="alert">{error}</p> : (
        <article>
          <h1>{data?.title ?? "Product not found"}</h1>
          {data && <>
            <p>Category: {data.category}</p>
            <p>Price: ${data.price.toFixed(2)}</p>
            <p>{data.description}</p>
            <img src={data.thumbnail} alt={data.title} width="200" />
          </>}
        </article>
      )}
      <button onClick={() => changeLocation("list")}>Return to list</button>
    </>
  );
}

function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <ListProducts /> : <Detail />;
}

export default function App() {
  return <RouterProvider><Pages /></RouterProvider>;
}
```

**Explanation:** The provider owns location state. The custom Hook reads it. List sets the selected product ID; Pages switches screens; Detail reads the ID and Back changes the page to list. A component cannot consume a provider it only returns below itself. Context shares navigation; it does not by itself update the browser URL or implement browser history.

#### 5. Product pagination: ten products per page

**Question:** Add Previous/Next navigation and show ten products at a time.

**Original mistakes:** `pages=10` does not track the selected page; `pages`/`setPages` are unused; all products are mapped; Prev/Next have no handlers; `displayList` only alerts; list items lack keys. The fetch Hook also needs the shared fixes.

##### Corrected App.jsx

```jsx
import { useState } from "react";
import useFetch from "./useFetch.js";

function ProductDetail({ id }) {
  const { data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>Product not found.</p>;
  return (
    <article>
      <h2>{data.title}</h2>
      <p>Category: {data.category}</p>
      <p>Price: ${data.price.toFixed(2)}</p>
      <p>{data.description}</p>
      <img src={data.thumbnail} alt={data.title} width="200" />
    </article>
  );
}

function ProductList({ products, page, setPage, openProduct }) {
  const pageSize = 10;
  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleProducts = products.slice(start, start + pageSize);

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <ul>{visibleProducts.map((product) => (
        <li key={product.id}>
          <button onClick={() => openProduct(product.id)}>{product.title}</button>
        </li>
      ))}</ul>
      <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}

export default function App() {
  // Paginate the fetched list. This example explicitly requests 25 records.
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;

  return selectedId === null ? (
    <ProductList products={data.products} page={page} setPage={setPage}
      openProduct={setSelectedId} />
  ) : (
    <>
      <ProductDetail id={selectedId} />
      <button onClick={() => setSelectedId(null)}>Return to list</button>
    </>
  );
}
```

**Explanation:** For page 1, slice indexes 0–10; page 2, 10–20. Slice excludes the end index. Math.ceil accounts for a partial final page. Page state in App survives switching to details. Pagination applies to the fetched list, not automatically the entire catalog. If the requirement is the entire catalog, obtain all required records or implement supported server pagination when allowed.

**F17 specifically:** Its slice arithmetic is already correct. Add keys, fix the fetch Hook, remove unused `pages`, and handle zero products. Use `page >= totalPages` rather than equality for disabling Next.

## React JS!F20

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
// Error: Spell it createContext and import useContext.
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
// Error: Spell it createContext and import useContext.
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
    {/* Error: Use .Provider with value={{ location, changeLocation }}. */}
    <HandlePageContext.provider location={location} changeLocation={changeLocation}>
        {children}
 
    </HandlePageContext.provider>
  )
}
 
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
 
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])
 
  return state;
}
 
const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
 
const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
// Error: Import useContext, use HandlePageContext, and remove the duplicate changeLocation prop.
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
const App = () => {
 
 
  return (
    {/* Error: Use HandlePageContext; consume it inside a child of the Provider. */}
    <RouterComponent provider={handlePageContext}>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
    {/* Error: Remove the accidentally pasted +F9. */}
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- createContex is misspelled; useContext is not imported.
- HandlePageContext.provider needs uppercase Provider.
- The provider must receive value={{ location, changeLocation }}.
- handlePageContext and HandlePageContext are different identifiers.
- ListProducts declares changeLocation twice: as a prop and a local Context value.
- App reads location/changeLocation that are not defined in its scope; move consuming UI below the provider.
- Remove the irrelevant provider prop and stray +F9.
- Add missing list keys and fix shared fetch error handling.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 7. Replace navigation prop passing with Context

**Question:** Share current location and its update function through Context, keeping list/detail/Back behavior.

##### Original problems and corrections

| Faulty code | Correction |
|---|---|
| `createContex` | `createContext` |
| useContext is not imported | Import it |
| `.provider` | `.Provider` |
| Separate location/changeLocation provider props | `value={{location, changeLocation}}` |
| `handlePageContext` vs `HandlePageContext` | Use one name consistently |
| changeLocation prop plus same-named local declaration | Remove the navigation prop |
| App reads undefined location/changeLocation | Read Context in a child below the provider |
| `provider={handlePageContext}` on the wrapper | Remove it; the real Context Provider supplies value |
| Stray `+F9` | Remove the copied text |

##### Corrected App.jsx

```jsx
import { createContext, useContext, useState } from "react";
import useFetch from "./useFetch.js";

const RouterContext = createContext(null);

function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter requires RouterProvider");
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

function ListProducts() {
  const { changeLocation } = useRouter();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;
  return (
    <ul>{data.products.map((product) => (
      <li key={product.id}>
        <button onClick={() => changeLocation("view", { id: product.id })}>
          {product.title}
        </button>
      </li>
    ))}</ul>
  );
}

function Detail() {
  const { location, changeLocation } = useRouter();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${location.params.id}`
  );
  return (
    <>
      {loading ? <p>Loading...</p> : error ? <p role="alert">{error}</p> : (
        <article>
          <h1>{data?.title ?? "Product not found"}</h1>
          {data && <>
            <p>Category: {data.category}</p>
            <p>Price: ${data.price.toFixed(2)}</p>
            <p>{data.description}</p>
            <img src={data.thumbnail} alt={data.title} width="200" />
          </>}
        </article>
      )}
      <button onClick={() => changeLocation("list")}>Return to list</button>
    </>
  );
}

function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <ListProducts /> : <Detail />;
}

export default function App() {
  return <RouterProvider><Pages /></RouterProvider>;
}
```

**Explanation:** The provider owns location state. The custom Hook reads it. List sets the selected product ID; Pages switches screens; Detail reads the ID and Back changes the page to list. A component cannot consume a provider it only returns below itself. Context shares navigation; it does not by itself update the browser URL or implement browser history.

### Question 2 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);


  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }

    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
  return (
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>

        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>

      <div className="after">
        <h3>Users born after 2000</h3>

        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};

const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);

    return [before, after];
}

function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}

function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F21

### Question 1 in this cell

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
// Error: Spell it createContext and import useContext.
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
// Error: Spell it createContext and import useContext.
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
// Error: Use normal quotes, e.g. "list", not ""list"".
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
    {/* Error: Use .Provider with value={{ location, changeLocation }}. */}
    <HandlePageContext.provider location={location} changeLocation={changeLocation}>
        {children}
 
    </HandlePageContext.provider>
  )
}
 
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
 
  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      let response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if(!response.ok) {
        setState({
          data: null,
          loading: false,
          error: 'An error occurred'
        });
      }
      let data = await response.json();
      setState({
        data,
        loading: false,
        error: ''
      });
    })();
  }, [url, method])
 
  return state;
}
 
const ViewProduct = ({id}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {data, error, loading} = useFetch(""https://dummyjson.com/products/"" + id);
 
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <>
      <h1>{data.title}</h1>
      <div>Category: {data.category}</div>
      <div>Price: ${data.price.toFixed(2)}</div>
      <div>Description: {data.description}</div>
      <div><img src={data.thumbnail} /></div>
    </>
  );
}
 
const ListProducts = ({changeLocation}) => {
// Error: Use normal quotes, e.g. "list", not ""list"".
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
// Error: Import useContext, use HandlePageContext, and remove the duplicate changeLocation prop.
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
    {/* Missing: Add key={product.id} to this li. */}
          <li>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
            <a className=""link"" onClick={() => changeLocation(""view"", {id: product.id})}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
const App = () => {
 
 
  return (
    {/* Error: Use HandlePageContext; consume it inside a child of the Provider. */}
    <RouterComponent provider={handlePageContext}>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
      <div className=""App"">
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
      { location.page !== ""list"" && (
        <div>
    {/* Error: Use normal quotes, e.g. "list", not ""list"". */}
    {/* Error: location and changeLocation are not defined in App. Read them from Context. */}
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
    {/* Error: Remove the accidentally pasted +F9. */}
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- createContex is misspelled; useContext is not imported.
- HandlePageContext.provider needs uppercase Provider.
- The provider must receive value={{ location, changeLocation }}.
- handlePageContext and HandlePageContext are different identifiers.
- ListProducts declares changeLocation twice: as a prop and a local Context value.
- App reads location/changeLocation that are not defined in its scope; move consuming UI below the provider.
- Remove the irrelevant provider prop and stray +F9.
- Add missing list keys and fix shared fetch error handling.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 7. Replace navigation prop passing with Context

**Question:** Share current location and its update function through Context, keeping list/detail/Back behavior.

##### Original problems and corrections

| Faulty code | Correction |
|---|---|
| `createContex` | `createContext` |
| useContext is not imported | Import it |
| `.provider` | `.Provider` |
| Separate location/changeLocation provider props | `value={{location, changeLocation}}` |
| `handlePageContext` vs `HandlePageContext` | Use one name consistently |
| changeLocation prop plus same-named local declaration | Remove the navigation prop |
| App reads undefined location/changeLocation | Read Context in a child below the provider |
| `provider={handlePageContext}` on the wrapper | Remove it; the real Context Provider supplies value |
| Stray `+F9` | Remove the copied text |

##### Corrected App.jsx

```jsx
import { createContext, useContext, useState } from "react";
import useFetch from "./useFetch.js";

const RouterContext = createContext(null);

function useRouter() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useRouter requires RouterProvider");
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

function ListProducts() {
  const { changeLocation } = useRouter();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=25");
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return <p>No product data.</p>;
  return (
    <ul>{data.products.map((product) => (
      <li key={product.id}>
        <button onClick={() => changeLocation("view", { id: product.id })}>
          {product.title}
        </button>
      </li>
    ))}</ul>
  );
}

function Detail() {
  const { location, changeLocation } = useRouter();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${location.params.id}`
  );
  return (
    <>
      {loading ? <p>Loading...</p> : error ? <p role="alert">{error}</p> : (
        <article>
          <h1>{data?.title ?? "Product not found"}</h1>
          {data && <>
            <p>Category: {data.category}</p>
            <p>Price: ${data.price.toFixed(2)}</p>
            <p>{data.description}</p>
            <img src={data.thumbnail} alt={data.title} width="200" />
          </>}
        </article>
      )}
      <button onClick={() => changeLocation("list")}>Return to list</button>
    </>
  );
}

function Pages() {
  const { location } = useRouter();
  return location.page === "list" ? <ListProducts /> : <Detail />;
}

export default function App() {
  return <RouterProvider><Pages /></RouterProvider>;
}
```

**Explanation:** The provider owns location state. The custom Hook reads it. List sets the selected product ID; Pages switches screens; Detail reads the ID and Back changes the page to list. A component cannot consume a provider it only returns below itself. Context shares navigation; it does not by itself update the browser URL or implement browser history.

### Question 2 in this cell

We have a list of users, and we separate this list into two lists:
1. Born before 2000.
2. Born after 2000.

We have an initial code that fetches the user list and displays the modified lists.

We want to add a button to edit users in the list. You can use any react in-build functionality to manage the state.

The button actions:

* The Edit button should display an input field for birth date together with Apply and Cancel buttons.
* The Apply button should apply changes to the user and leave the edit mode. After the modification, the user should be in the correct list.
* The Cancel button should leave the edit mode without applying any changes.

Run the code to see the image of functionality needed.

If the user is already in edit mode and clicks on another user’s Edit button, the open Edit mode should be closed, discarding the changes, and the new Edit mode should be opened for the other user.

Note that the UI styles are not required to match the expected styles.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, {useEffect, useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  const { response, isLoading, hasError } = useFetch("https://dummyjson.com/users?limit=100", "GET");
  const [beforeList, setBeforeList] = useState([]);
  const [afterList, setAfterList] = useState([]);


  useEffect(() => {
    if (response === undefined || isLoading || hasError) {
      return;
    }

    const { users } = response;
    const [before, after] = getBeforeAndAfterLists(users);
    setBeforeList(before);
    setAfterList(after);
  }, [response, isLoading, hasError]);
  
  return (
    <div className="list-of-users">
      <div className="before">
        <h3>Users born before 2000</h3>

        <div className="content">
          {beforeList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user}/>
            </div>
          ))}
        </div>
      </div>

      <div className="after">
        <h3>Users born after 2000</h3>

        <div className="content">
          {afterList.map(user => (
    {/* Missing: Add key={user.id} to this wrapper. */}
            <div className="user-item">
              <UserView user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const UserView = ({user}) => {
  return (
    <div className="user-view">
      <div className="user">{user.name} - {user.birthDate}</div>
        <div className="buttons">
    {/* Missing: Add Edit, Apply, and Cancel handlers with a birth-date input. */}
          <button className="edit btn btn-blue">Edit</button>
        </div>
    </div>
  )
};

const useFetch = (url, method) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
// Missing: Reset loading and error when a new request starts.
    (async () => {
// Missing: Add request cleanup and handle request failures.
      const response = await fetch(url, { method });
// Error: Throw or return here; otherwise the error is overwritten by success.
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

// Error: Reset hasError at request start instead of reading an old state value here.
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
// Error: Equal dates must return 0. Subtract the two timestamps.
    internalUsers.sort((a, b) => birthdayToTime(a.birthDate) > birthdayToTime(b.birthDate) ? 1 : -1);
    const before = internalUsers.filter(user => birthdayToYear(user.birthDate) < 2000);
    const after = internalUsers.filter(user => birthdayToYear(user.birthDate) >= 2000);

    return [before, after];
}

function birthdayToTime(birthDate) {
  return new Date(birthDate).getTime();
}

function birthdayToYear(birthDate) {
  return new Date(birthDate).getFullYear();
}
ReactDOM.render(<App />, document.getElementById('root'));
```

</details>

#### Problems in this snippet

- Edit has no handler and there is no editing ID/draft state.
- The date input, Apply and Cancel are missing.
- There is no update function to change a user and move it between groups.
- Mapped user wrappers need stable keys.
- The date comparator does not return zero for equal dates.
- The text says after 2000 but code includes 2000; clarify the boundary.
- Fix the fetch Hook: stop on HTTP failure, catch errors, reset request state and clean up.

#### Corrected answer and explanation

#### 8. Edit birth dates with Apply and Cancel

**Question:** Show users before 2000 and in/after 2000; allow one active edit, Apply, Cancel, and moving between lists after a date change.

**Original problems:** Edit has no handler; no edit state/input/Apply/Cancel exists; no user update exists; outer mapped divs lack keys; the fetch Hook is unsafe; its effect reads a stale hasError value; sorting does not return zero for equal dates. The heading says after 2000 while the code uses >=2000. This solution explicitly puts year 2000 in the second list.

##### Corrected App.jsx

```jsx
import { useEffect, useState } from "react";
import useFetch from "./useFetch.js";

function yearOf(date) {
  return Number(date.slice(0, 4));
}

function UserList({ title, users, editingId, draft, setDraft, onEdit, onApply, onCancel }) {
  return (
    <section>
      <h2>{title}</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}: {user.birthDate}</p>
          {editingId === user.id ? (
            <>
              <input type="date" aria-label={`Birth date for ${user.name}`}
                value={draft} onChange={(event) => setDraft(event.target.value)} />
              <button disabled={!draft} onClick={onApply}>Apply</button>
              <button onClick={onCancel}>Cancel</button>
            </>
          ) : <button onClick={() => onEdit(user)}>Edit</button>}
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useFetch("https://dummyjson.com/users?limit=100");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users.map((user) => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        // The exercise assumes valid ISO date-only values: YYYY-MM-DD.
        birthDate: user.birthDate,
      })));
    }
  }, [data]);

  function editUser(user) {
    setEditingId(user.id);
    setDraft(user.birthDate);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  function applyEdit() {
    if (!draft) return;
    setUsers((previous) => previous.map((user) =>
      user.id === editingId ? { ...user, birthDate: draft } : user
    ));
    cancelEdit();
  }

  const sortedUsers = [...users].sort((a, b) =>
    a.birthDate.localeCompare(b.birthDate)
  );
  const before = sortedUsers.filter((user) => yearOf(user.birthDate) < 2000);
  const after = sortedUsers.filter((user) => yearOf(user.birthDate) >= 2000);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  const editingProps = {
    editingId, draft, setDraft,
    onEdit: editUser, onApply: applyEdit, onCancel: cancelEdit,
  };

  return (
    <main>
      <UserList title="Born before 2000" users={before} {...editingProps} />
      <UserList title="Born in or after 2000" users={after} {...editingProps} />
    </main>
  );
}
```

**Explanation:** Keep one authoritative users array. Before/after lists are derived. Editing changes a draft, not the user. Apply copies and updates one user; Cancel discards the draft. Selecting another user overwrites the active ID/draft. Sorting ISO date-only strings avoids timezone boundary shifts and preserves the original users array. If API dates use other formats, normalize and validate them before rendering. This changes local UI state; backend persistence is not requested by this question.

## React JS!F22

### Question 1 in this cell

You are analyzing data for Aquaintly, a hot new social network.

On Aquaintly, connections are always symmetrical. If a user Alice is connected to Bob, then Bob is also connected to Alice.

You are given a sequential log of CONNECT and DISCONNECT events of the following form:
- This event connects users Alice and Bob: ["CONNECT", "Alice", "Bob"]
- This event disconnects the same users: ["DISCONNECT", "Bob", "Alice"] (order of users does not matter)

We want to separate users based on their popularity (number of connections). To do this, write a function that takes in the event log and a number N and returns two collections:
[Users with fewer than N connections], [Users with N or more connections]

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
events = [
    ["CONNECT","Alice","Bob"],
    ["DISCONNECT","Bob","Alice"],
    ["CONNECT","Alice","Charlie"],
    ["CONNECT","Dennis","Bob"],
    ["CONNECT","Pam","Dennis"],
    ["DISCONNECT","Pam","Dennis"],
    ["CONNECT","Pam","Dennis"],
    ["CONNECT","Edward","Bob"],
    ["CONNECT","Dennis","Charlie"],
    ["CONNECT","Alice","Nicole"],
    ["CONNECT","Pam","Edward"],
    ["DISCONNECT","Dennis","Charlie"],
    ["CONNECT","Dennis","Edward"],
    ["CONNECT","Charlie","Bob"]
]
```

</details>

#### Problems in this snippet

- There is no supplied solution function to debug; the block contains only example events.
- The answer must treat connections as symmetric and retain users with zero final connections.

#### Corrected answer and explanation

#### 13. Group users by final social connections

**Question:** Process CONNECT/DISCONNECT events, then return users with fewer than N connections and users with N or more. Connections are explicitly symmetric.

**Source limitation:** No algorithm implementation is supplied.

```js
function grouping(events, n) {
  const connections = new Map();
  for (const [type, a, b] of events) {
    if (!connections.has(a)) connections.set(a, new Set());
    if (!connections.has(b)) connections.set(b, new Set());
    if (type === "CONNECT") {
      connections.get(a).add(b);
      connections.get(b).add(a);
    } else if (type === "DISCONNECT") {
      connections.get(a).delete(b);
      connections.get(b).delete(a);
    }
  }
  const fewer = [];
  const atLeast = [];
  for (const [user, friends] of connections) {
    (friends.size < n ? fewer : atLeast).push(user);
  }
  return [fewer, atLeast];
}
```

**Explanation:** Update both directions and use Sets to avoid duplicates. Keep empty Sets so disconnected users remain in the answer. Pair order does not matter. Output order follows first appearance; sorting is unnecessary unless requested. Average time O(E+U), space O(U+C), for E events, U users and C final connections.

## React JS!F23

### Question 1 in this cell

We are building a word processor and we would like to implement a "word-wrap" functionality.
 
Given a list of words followed by a maximum number of characters in a line, return a collection of strings where each string element represents a line that contains as many words as possible, with the words in each line being concatenated with a single '-' (representing a space, but easier to see for testing). The length of each string must not exceed the maximum character length per line.
 
Your function should take in the maximum characters per line and return a data structure representing all lines in the indicated max length.
 
Examples:
 
words1 = [ "The", "day", "began", "as", "still", "as", "the",
          "night", "abruptly", "lighted", "with", "brilliant",
          "flame" ]
 
wrapLines(words1, 13) "wrap words1 to line length 13" =>
 
  [ "The-day-began",
    "as-still-as",
    "the-night",
    "abruptly",
    "lighted-with",
    "brilliant",
    "flame" ]
 
wrapLines(words1, 12) "wrap words1 to line length 12" =>
 
  [ "The-day",
    "began-as",
    "still-as-the",
    "night",
    "abruptly",
    "lighted-with",
    "brilliant",
    "flame" ]    
 
 
wrapLines(words1, 20) "wrap words1 to line length 20" =>
 
  [ "The-day-began-as",
    "still-as-the-night",
    "abruptly-lighted",
    "with-brilliant-flame" ]
 
words2 = [ "Hello" ]
 
wrapLines(words2, 5) "wrap words2 to line length 5" =>
 
  [ "Hello" ]
 
 
wrapLines(words2, 30) "wrap words2 to line length 30" =>
 
  [ "Hello" ]  
 
words3 = [ "Hello", "Hello" ]
 
wrapLines(words3, 5) "wrap words3 to line length 5" =>
 
  [ "Hello",
  "Hello" ]
 
words4 = ["Well", "Hello", "world" ]
 
wrapLines(words4, 5) "wrap words4 to line length 5" =>
 
  [ "Well",
  "Hello",
  "world" ]
 
words5 = ["Hello", "HelloWorld", "Hello", "Hello"]
 
wrapLines(words5, 20) "wrap words 5 to line length 20 =>
 
  [ "Hello-HelloWorld",
    "Hello-Hello" ]
 
 
words6 = [ "a", "b", "c", "d" ]
wrapLines(words6, 20) "wrap words 6 to line length 20 =>
 
  [ "a-b-c-d" ]
 
wrapLines(words6, 4) "wrap words 6 to line length 4 =>
 
  [ "a-b",
    "c-d" ]
 
wrapLines(words6, 1) "wrap words 6 to line length 1 =>
 
  [ "a",
    "b",
    "c",
    "d" ]
 
All Test Cases:
          words,  max line length
wrapLines(words1, 13)
wrapLines(words1, 12)
wrapLines(words1, 20)
wrapLines(words2, 5)
wrapLines(words2, 30)
wrapLines(words3, 5)
wrapLines(words4, 5)
wrapLines(words5, 20)
wrapLines(words6, 20)
wrapLines(words6, 4)
wrapLines(words6, 1)
 
n = number of words OR total characters

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
"use strict";
 
const words1 = [
  "The",
  "day",
  "began",
  "as",
  "still",
  "as",
  "the",
  "night",
  "abruptly",
  "lighted",
  "with",
  "brilliant",
  "flame"
];
 
function wrapLines(words, maxWidth){
  
  let result =[]
  let current =[]
  let letterSum = 0
  
   const minLength = (letters, wordCount)=>{
// Error: Use wordCount === 0, not !wordCount === 0.
     if(!wordCount === 0) return 0;
     return letters + (wordCount-1);
     
   }
 
   for(const w of words){
     const newLetters = letterSum + w.length;
     const newCurrent = current.length + 1;
     
     if(minLength(newLetters, newCurrent) <= maxWidth || current.length ===0){
       current.push(w);
       letterSum = newLetters;
     }else{
// Error: This question needs plain wrapping. Use current.join("-").
       result.push(jsutWrap(current, letterSum, maxWidth))
       current = [w]
       letterSum = w.length;
     }
   }
   
   if(current.length > 0){
// Error: This question needs plain wrapping. Use current.join("-").
      result.push(jsutWrap(current, letterSum, maxWidth))
   }
 
  return result;
}
 
function jsutWrap(words, letterSum, maxWidth){
   
// Error: Use if (words.length === 1) return words[0] for a single word.
   if(words.length === 0) words[0];
   
   const gap = words.length - 1; 
   const totalhyphen = maxWidth - letterSum;
   
   const base = Math.floor(totalhyphen/gap);
   const extra = totalhyphen%gap
   
   let out=""
   
  for(let i=0; i<words.length; i++){
     
     out += words[i];
     if(i < gap){
      const hyphen = base +  (i < extra ? 1 : 0)
// Error: Use one "-" between words, not padded underscores.
       out += '_'.repeat(hyphen)
     }
   }
   
  return out
}
 
 
const words2 = [ "Hello" ];
const words3 = [ "Hello", "Hello" ];
const words4 = [ "Well", "Hello", "world" ];
const words5 = ["Hello", "HelloWorld", "Hello", "Hello"];
const words6 = ["a", "b", "c", "d"];
```

</details>

#### Problems in this snippet

- if (!wordCount === 0) compares a boolean with zero; use wordCount === 0 if retaining this helper.
- jsutWrap fully justifies lines although this question requires a single hyphen between words.
- The helper uses underscores rather than hyphens.
- if (words.length === 0) words[0] does not return a value or correctly handle the single-word case.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 14. Word wrapping with single hyphens

**Question:** Fit as many words as possible on each line using exactly one hyphen between adjacent words.

**Exact problems:** `if (!wordCount === 0)` compares a boolean with zero; the helper distributes padding although this is not a justification question; it emits underscores rather than hyphens; `if(words.length===0) words[0]` does not return anything useful.

```js
function wrapLines(words, width) {
  if (!Number.isInteger(width) || width <= 0) throw new Error("Invalid width");
  const result = [];
  let group = [];
  let length = 0;

  for (const word of words) {
    if (word.length > width) throw new Error("A word is wider than the line");
    const required = length + (group.length ? 1 : 0) + word.length;
    if (group.length && required > width) {
      result.push(group.join("-"));
      group = [];
      length = 0;
    }
    length += (group.length ? 1 : 0) + word.length;
    group.push(word);
  }
  if (group.length) result.push(group.join("-"));
  return result;
}
```

**Explanation:** Count the separator when deciding whether the next word fits. Flush the current line only when necessary. No padding is added. Oversized words are explicitly rejected here; confirm the interview's expected policy. Time O(total input/output characters), space O(output).

## React JS!F24

### Question 1 in this cell

We have a bin of robot parts in a factory. Each part goes to a robot with a specific, unique name. Each part will be described by a string, with the name of the robot and the part name separated by an underscore, like "Rosie_arm".
 
All robots are made of the same types of parts, and we have a string of all of the parts required to form a complete robot. Given a list of available parts, return the collection of robot names for which we can build at least one complete robot.
 
Sample Input:
 
all_parts = [
    "Rosie_claw",
    "Rosie_sensors",
    "Dustie_case", 
    "Optimus_sensors",
    "Rust_sensors",
    "Rosie_case",
    "Rust_case",
    "Optimus_speaker",
    "Rosie_wheels",
    "Rosie_speaker",
    "Dustie_case",
    "Dustie_arms",
    "Rust_claw",
    "Dustie_case",
    "Dustie_speaker",
    "Optimus_case",
    "Optimus_wheels",
    "Rust_legs",
    "Optimus_sensors" ]
    
    ["Rosie","Optimus","Rust","Optimus"]
    ["Dustie","Rosie","Rust","Optimus"]
    ["Optimus","Rosie","Dustie"]
    ["Rosie","Optimus"]
    ["Rosie","Rust"]
    
 
required_parts_1 = "sensors,case,speaker,wheels"
required_parts_2 = "sensors,case,speaker,wheels,claw"
required_parts_3 = "sensors,case,screws"
 
Expected Output (output can be in any order):
 
get_robots(all_parts, required_parts_1) => ["Optimus", "Rosie"]
get_robots(all_parts, required_parts_2) => ["Rosie"]
get_robots(all_parts, required_parts_3) => []
 
N: Number of elements in `all_parts`
P: Number of elements in `required_parts`
 
{
  "sensors":["Optimus","Rosie","Rust"]
  "case":["Dustie","Rosie"]
}

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
"use strict";
 
const required_parts_1 = "sensors,case,speaker,wheels";
const required_parts_2 = "sensors,case,speaker,wheels,claw";
const required_parts_3 = "sensors,case,screws";
 
const all_parts = [
  "Rosie_claw", 
  "Rosie_sensors", 
  "Dustie_case", 
  "Optimus_sensors", 
  "Rust_sensors", 
  "Rosie_case", 
  "Rust_case", 
  "Optimus_speaker", 
  "Rosie_wheels", 
  "Rosie_speaker", 
  "Dustie_case", 
  "Dustie_arms", 
  "Rust_claw", 
  "Dustie_case", 
  "Dustie_speaker", 
  "Optimus_case", 
  "Optimus_wheels", 
  "Rust_legs", 
  "Optimus_sensors"];
  
  function get_robots(all_parts, required_parts_1){
    let partsWithRobots={};
    
    for(var i=0;i<all_parts.length;i++){
        const allPart=all_parts[i].split("_")
        let robot=allPart[0];
        let part=allPart[1]
        // console.log(robot,part)
// Error: The first part is added twice. Initialize with [] before push.
        if(!partsWithRobots[robot]) partsWithRobots[robot]=[part];
        partsWithRobots[robot].push(part)
    }
    console.log(partsWithRobots)
    const reqParts=required_parts_1.split(",");
    console.log(reqParts)
    
    for(var i=0;i<reqParts.length;i++){
// Missing: Check required parts, collect complete robots, and return their names.
      partsWithRobots
    }
    
  }
  
  get_robots(all_parts,required_parts_1)
```

</details>

#### Problems in this snippet

- The first part is inserted twice: initialization uses [part], followed by push(part).
- The final loop does not check any requirement.
- The function does not return the matching robots.
- Use a Set so repeated parts do not count as distinct required types.

#### Corrected answer and explanation

#### 15. Build complete robots

**Question:** Return robots that have at least one of every required part type.

**Original problems:** Initializing `[part]` and then pushing part inserts the first part twice. The final loop computes nothing, and the function has no return value.

```js
function getRobots(allParts, requiredPartsText) {
  const required = requiredPartsText.split(",").map((part) => part.trim());
  const robots = new Map();

  for (const value of allParts) {
    // Assumes robot and part names follow the supplied Robot_part format.
    const [robot, part] = value.split("_");
    if (!robots.has(robot)) robots.set(robot, new Set());
    robots.get(robot).add(part);
  }

  const result = [];
  for (const [robot, available] of robots) {
    if (required.every((part) => available.has(part))) result.push(robot);
  }
  return result;
}
```

**Explanation:** Group by robot, store distinct part types, then test every requirement. Extra parts do not matter. Time O(N+R*P), space O(N+P), ignoring string parsing lengths; R is number of robots and P required part types.

## React JS!F25

### Question 1 in this cell

You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question disguised as a random note.
 
Your task is to write a function that, given a list of words and a note, finds and returns the word in the list that is scrambled inside the note, if any exists. If none exist, it returns the result "-" as a string. There will be at most one matching word. The letters don't need to be in order or next to each other. The letters cannot be reused.
 
Example:
words = ["baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"]
note1 = "ctay"
find(words, note1) => "cat"   (the letters do not have to be in order) 
 
note2 = "bcanihjsrrrferet"
find(words, note2) => "cat"   (the letters do not have to be together) 
 
note3 = "tbaykkjlga"
find(words, note3) => "-"     (the letters cannot be reused) 
 
note4 = "bbbblkkjbaby"
find(words, note4) => "baby"   
 
note5 = "dad"
find(words, note5) => "-"   
 
note6 = "breadmaking"
find(words, note6) => "bird"   
 
note7 = "dadaa"
find(words, note7) => "dada"   
 
All Test Cases:
find(words, note1) -> "cat"
find(words, note2) -> "cat"
find(words, note3) -> "-"
find(words, note4) -> "baby"
find(words, note5) -> "-"
find(words, note6) -> "bird"
find(words, note7) -> "dada"
 
Complexity analysis variables: 
 
W = number of words in `words`
S = maximal length of each word or of the note
"-" note6 = "breadmaking" find(words, note6) => "bird" note7 = "dadaa" find(words, note7) => "dada" All Test Cases: find(words, note1) -> "cat" find(words, note2) -> "cat" find(words, note3) -> "-" find(words, note4) -> "baby" find(words, note5) -> "-" find(words, note6) -> "bird" find(words, note7) -> "dada" Complexity analysis variables: W = number of words in `words` S = maximal length of each word or of the note 
 
2)
You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question in 2D grids of letters. The word may start anywhere in the grid, and consecutive letters can be either immediately below or immediately to the right of the previous letter.
Given a grid and a word, write a function that returns the location of the word in the grid as a list of coordinates. If there are multiple matches, return any one.

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
"use strict";
const grid1 = [
 ['b', 'b', 'b', 'a', 'l', 'l', 'o', 'o'],
 ['b', 'a', 'c', 'c', 'e', 's', 'c', 'n'],
 ['a', 'l', 't', 'e', 'w', 'c', 'e', 'w'],
 ['a', 'l', 'o', 's', 's', 'e', 'c', 'c'],
 ['w', 'o', 'o', 'w', 'a', 'c', 'a', 'w'],
 ['i', 'b', 'w', 'o', 'w', 'w', 'o', 'w']
];
const word1_1 = "access";
const word1_2 = "balloon";
const word1_3 = "wow";
const word1_4 = "sec";
const word1_5 = "bbaal";
const grid2 = [
 ['a']
];
const word2_1 = "a";
const grid3 = [
 ['c', 'a'],
 ['t', 't'],
 ['h', 'a'],
 ['a', 'c'],
 ['t', 'g']
];
const word3_1 = "cat";
const word3_2 = "hat";
const grid4 = [
 ['c', 'c', 'x', 't', 'i', 'b'],
 ['c', 'a', 't', 'n', 'i', 'i'],
 ['a', 'x', 'n', 'x', 'p', 't'],
 ['t', 'x', 'i', 'x', 't', 't']
];
const word4_1 = "catnip";
```

</details>

#### Problems in this snippet

- Only grid input data is supplied; no search function exists.
- Implement a path search that moves only right/down and returns one complete matching path.

#### Corrected answer and explanation

#### 17. Find a word in a grid moving right or down

**Question:** Return one coordinate path spelling the word; start anywhere, move only right/down.

**Source limitation:** No search function is supplied. This answer returns [] when no path exists.

```js
function search(grid, word) {
  if (!grid.length || !grid[0].length || !word.length) return [];
  const rows = grid.length;
  const columns = grid[0].length;
  const path = [];
  const failed = new Set();

  function dfs(row, column, index) {
    if (row >= rows || column >= columns || grid[row][column] !== word[index]) {
      return false;
    }
    const key = `${row},${column},${index}`;
    if (failed.has(key)) return false;

    path.push([row, column]);
    if (index === word.length - 1) return true;
    if (dfs(row + 1, column, index + 1) || dfs(row, column + 1, index + 1)) {
      return true;
    }
    path.pop();
    failed.add(key);
    return false;
  }

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (dfs(row, column, 0)) return [...path];
    }
  }
  return [];
}
```

**Explanation:** Try every starting position. DFS checks the current character, appends its coordinates, then explores permitted moves. Remove coordinates when a branch fails. Right/down movement cannot revisit a cell in a path, so no visited-cell set is required. Memoizing failed row/column/index states gives O(r*c*w) time and O(r*c*w + w) auxiliary space; plain DFS can take O(r*c*2^w).

### Question 2 in this cell

You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question disguised as a random note. Your task is to write a function that, given a list of words and a note, finds and returns the word in the list that is scrambled inside the note, if any exists. If none exist, it returns the result "-" as a string. There will be at most one matching word. The letters don't need to be in order or next to each other. The letters cannot be reused. Example: words = ["baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"] note1 = "ctay" find(words, note1) => "cat" (the letters do not have to be in order) note2 = "bcanihjsrrrferet" find(words, note2) => "cat" (the letters do not have to be together) note3 = "tbaykkjlga" find(words, note3) => "-" (the letters cannot be reused) note4 = "bbbblkkjbaby" find(words, note4) => "baby" note5 = "dad" find(words, note5) =>
You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question disguised as a random note.
 
Your task is to write a function that, given a list of words and a note, finds and returns the word in the list that is scrambled inside the note, if any exists. If none exist, it returns the result "-" as a string. There will be at most one matching word. The letters don't need to be in order or next to each other. The letters cannot be reused.
 
Example:
words = ["baby", "referee", "cat", "dada", "dog", "bird", "ax", "baz"]
note1 = "ctay"
find(words, note1) => "cat"   (the letters do not have to be in order) 
 
note2 = "bcanihjsrrrferet"
find(words, note2) => "cat"   (the letters do not have to be together) 
 
note3 = "tbaykkjlga"
find(words, note3) => "-"     (the letters cannot be reused) 
 
note4 = "bbbblkkjbaby"
find(words, note4) => "baby"   
 
note5 = "dad"
find(words, note5) => "-"   
 
note6 = "breadmaking"
find(words, note6) => "bird"   
 
note7 = "dadaa"
find(words, note7) => "dada"   
 
All Test Cases:
find(words, note1) -> "cat"
find(words, note2) -> "cat"
find(words, note3) -> "-"
find(words, note4) -> "baby"
find(words, note5) -> "-"
find(words, note6) -> "bird"
find(words, note7) -> "dada"
 
Complexity analysis variables: 
 
W = number of words in `words`
S = maximal length of each word or of the note
"-" note6 = "breadmaking" find(words, note6) => "bird" note7 = "dadaa" find(words, note7) => "dada" All Test Cases: find(words, note1) -> "cat" find(words, note2) -> "cat" find(words, note3) -> "-" find(words, note4) -> "baby" find(words, note5) -> "-" find(words, note6) -> "bird" find(words, note7) -> "dada" Complexity analysis variables: W = number of words in `words` S = maximal length of each word or of the note

No solution implementation is supplied for this question.

#### Problems in this snippet

- No solution function is supplied, so there is no demonstrated implementation bug.
- The solution must count repeated letters rather than using only includes or a Set.

#### Corrected answer and explanation

#### 16. Find a scrambled word in a note

**Question:** Return the one candidate whose letters can be taken from the note, without reusing letter occurrences. Return '-' if none matches.

**Source limitation:** The prompt and test data are supplied, but no solution function is included.

```js
function findWord(words, note) {
  const available = new Map();
  for (const letter of note) available.set(letter, (available.get(letter) || 0) + 1);

  for (const word of words) {
    const needed = new Map();
    let matches = true;
    for (const letter of word) {
      const count = (needed.get(letter) || 0) + 1;
      needed.set(letter, count);
      if (count > (available.get(letter) || 0)) {
        matches = false;
        break;
      }
    }
    if (matches) return word;
  }
  return "-";
}
```

**Explanation:** Order and adjacency do not matter; counts do. A Set would incorrectly accept a candidate requiring two occurrences when the note contains only one. Time O(note length + sum of candidate lengths), or O(W*S) with the prompt's variables. Auxiliary space O(distinct characters), bounded by O(S) for arbitrary characters.

## React JS!F26

### Question 1 in this cell

Problem Statement
We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.
Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection.

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
const song_times_1 = [
    ["Stairway to Heaven", "8:05"],
    ["Immigrant Song", "2:27"],
    ["Rock and Roll", "3:41"],
    ["Communication Breakdown", "2:29"],
    ["Good Times Bad Times", "2:48"],
    ["Hot Dog", "3:19"],
    ["The Crunge", "3:18"],
    ["Achilles Last Stand", "10:26"],
    ["Black Dog", "4:55"]
];
```

</details>

#### Problems in this snippet

- Only song data is supplied; no pair-finding function exists.
- Convert minutes:seconds to integer seconds and find two distinct entries totaling 420.

#### Corrected answer and explanation

#### 18. Two songs totaling seven minutes

**Question:** Return two distinct entries totaling exactly 7:00, or an empty array.

**Source limitation:** No implementation is supplied.

```js
function findPair(songs) {
  const seen = new Map();
  for (const [title, duration] of songs) {
    const [minutes, seconds] = duration.split(":").map(Number);
    const total = minutes * 60 + seconds;
    const needed = 420 - total;
    if (seen.has(needed)) return [seen.get(needed), title];
    seen.set(total, title);
  }
  return [];
}
```

**Explanation:** Convert time to integer seconds; 3:41 means 221 seconds, not 3.41 minutes. Check for a previously seen complement before storing the current song. That ensures different entries, including when two separate songs are both 3:30. Time O(N), space O(N), assuming bounded duration strings.

### Question 2 in this cell

Problem Statement
We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.
Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection.

<details open>
<summary>Original supplied code with simple error comments</summary>

```js
const song_times_2 = [
    ["Stairway to Heaven", "8:05"],
    ["Immigrant Song", "2:27"],
    ["Rock and Roll", "3:41"],
    ["Communication Breakdown", "2:29"],
    ["Good Times Bad Times", "2:48"],
    ["Black Dog", "4:55"],
    ["The Crunge", "3:18"],
    ["Achilles Last Stand", "10:26"],
    ["The Ocean", "4:31"],
    ["Hot Dog", "3:19"]
];
```

</details>

#### Problems in this snippet

- Only song data is supplied; no pair-finding function exists.
- Convert minutes:seconds to integer seconds and find two distinct entries totaling 420.

#### Corrected answer and explanation

#### 18. Two songs totaling seven minutes

**Question:** Return two distinct entries totaling exactly 7:00, or an empty array.

**Source limitation:** No implementation is supplied.

```js
function findPair(songs) {
  const seen = new Map();
  for (const [title, duration] of songs) {
    const [minutes, seconds] = duration.split(":").map(Number);
    const total = minutes * 60 + seconds;
    const needed = 420 - total;
    if (seen.has(needed)) return [seen.get(needed), title];
    seen.set(total, title);
  }
  return [];
}
```

**Explanation:** Convert time to integer seconds; 3:41 means 221 seconds, not 3.41 minutes. Check for a previously seen complement before storing the current song. That ensures different entries, including when two separate songs are both 3:30. Time O(N), space O(N), assuming bounded duration strings.

## React JS!F27

### Question 1 in this cell

What is Debouncing?Why and where do we use Debouncing?
Difference Between Debouncing and Throttling
How do you implement Debouncing in React?

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import { useState, useEffect } from "react";
function Search() {
const [query, setQuery] = useState("");
// Missing: Use debouncedQuery for the actual search/filter.
const [debouncedQuery, setDebouncedQuery] = useState("");
useEffect(() => {
const timer = setTimeout(() => {
setDebouncedQuery(query);
}, 500);
return () => clearTimeout(timer);
}, [query]);
return (
<input
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
);
}​‌
```

</details>

#### Problems in this snippet

- The debounce example updates debouncedQuery but never uses it for the search.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 4. Optimize product filtering with debounce

**Question:** Avoid executing search work after every keystroke.

**Problem:** Earlier reports do not include their original search code. In F27, one example updates `debouncedQuery` but never uses it; the ProductSearch example filters immediately and is otherwise valid.

##### Corrected search

```jsx
import { useEffect, useMemo, useState } from "react";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Headphones" },
  { id: 4, name: "Keyboard" },
];

export default function ProductSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [debouncedSearch]);

  return (
    <div>
      <label htmlFor="search">Search products</label>
      <input id="search" value={search}
        onChange={(event) => setSearch(event.target.value)} />
      {filteredProducts.length === 0 ? <p>No products found.</p> : (
        <ul>{filteredProducts.map((product) =>
          <li key={product.id}>{product.name}</li>
        )}</ul>
      )}
    </div>
  );
}
```

**Explanation:** The input updates immediately. Cleanup cancels the earlier timeout. After 500 ms without typing, the delayed query changes. `useMemo` avoids repeating the filter during renders caused only by immediate typing; it is unnecessary for a tiny list but useful to demonstrate avoiding repeated calculation. For server search, fetch using the delayed query and clean up outdated requests.

**Debounce versus throttle:** Debounce waits for inactivity; throttle limits execution frequency during continuing activity.

### Question 2 in this cell

What is Lazy Loading?What problem does Lazy Loading solve?
What is React.lazy()? Advantages of lazy loading?
How do you implement Lazy Loading in React?

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import React, { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./Dashboard"));
function App() {
return (
<Suspense fallback={<h1>Loading...</h1>}>
<Dashboard />
</Suspense>
);
}
```

</details>

#### Problems in this snippet

- The lazy/Suspense code is valid if Dashboard exists and has the expected default export. No demonstrated syntax correction is needed.

#### Corrected answer and explanation

##### Lazy loading

**Question:** Load a component's code when needed.

**Status of supplied example:** Valid if Dashboard is a valid default-exported component. No demonstrated syntax bug.

```jsx
import { lazy, Suspense, useState } from "react";

const Dashboard = lazy(() => import("./Dashboard.jsx"));

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open dashboard</button>
      {open && <Suspense fallback={<p>Loading dashboard...</p>}>
        <Dashboard />
      </Suspense>}
    </>
  );
}

// In a separate Dashboard.jsx file:
// export default function Dashboard() { return <h1>Dashboard</h1>; }
```

### Question 3 in this cell

Display a list of products and filter them based on user search input.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import { useState } from "react";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Headphones" },
  { id: 4, name: "Keyboard" },
];

export default function ProductSearch() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Product Search</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product"
      />

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

</details>

#### Problems in this snippet

- The product-filter example is correct for immediate filtering. If the requirement is debounce, it is not implemented.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

#### 4. Optimize product filtering with debounce

**Question:** Avoid executing search work after every keystroke.

**Problem:** Earlier reports do not include their original search code. In F27, one example updates `debouncedQuery` but never uses it; the ProductSearch example filters immediately and is otherwise valid.

##### Corrected search

```jsx
import { useEffect, useMemo, useState } from "react";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Headphones" },
  { id: 4, name: "Keyboard" },
];

export default function ProductSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [debouncedSearch]);

  return (
    <div>
      <label htmlFor="search">Search products</label>
      <input id="search" value={search}
        onChange={(event) => setSearch(event.target.value)} />
      {filteredProducts.length === 0 ? <p>No products found.</p> : (
        <ul>{filteredProducts.map((product) =>
          <li key={product.id}>{product.name}</li>
        )}</ul>
      )}
    </div>
  );
}
```

**Explanation:** The input updates immediately. Cleanup cancels the earlier timeout. After 500 ms without typing, the delayed query changes. `useMemo` avoids repeating the filter during renders caused only by immediate typing; it is unnecessary for a tiny list but useful to demonstrate avoiding repeated calculation. For server search, fetch using the delayed query and clean up outdated requests.

**Debounce versus throttle:** Debounce waits for inactivity; throttle limits execution frequency during continuing activity.

### Question 4 in this cell

Fetch users from an API and display loading, error, and success states.

<details open>
<summary>Original supplied code with simple error comments</summary>

```jsx
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
// Missing: Add request cleanup and handle request failures.
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

// Error: Throw or return here; otherwise the error is overwritten by success.
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

</details>

#### Problems in this snippet

- HTTP/network errors are already handled.
- The effect does not cancel or ignore the request after unmount; add cleanup.
- Repeated quotes are preserved in the source. If present literally in the editor, normalize them before running the code.

#### Corrected answer and explanation

##### Fetch users and show loading/error/success

**Problem:** The F27 example catches failures but does not clean up requests. Use the shared useFetch.js to supply cleanup.

```jsx
import useFetch from "./useFetch.js";

export default function UsersList() {
  const { data: users, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!users || users.length === 0) return <p>No users found.</p>;
  return <ul>{users.map((user) =>
    <li key={user.id}>{user.name} — {user.email}</li>
  )}</ul>;
}
```

## Verification and use

The corrected examples are the same examples verified in the full answer guide: 12 JSX modules compiled and representative algorithm checks passed. External API requests and browser interactions were not tested. React examples use normal package imports and an existing project entry point; keep each App.jsx example separate and save the shared Hook as useFetch.js where imported. Original code lines are preserved; simple error comments have been added.
