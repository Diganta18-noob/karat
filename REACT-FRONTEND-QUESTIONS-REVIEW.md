# React frontend interview questions: errors and fixes

Source: KARAT Assessment Question Template.xlsx, React JS!F2:F27. The source workbook is unchanged. This guide reviews supplied code without executing the external APIs. Repeated reports are retained in the source appendix. Discussion snippets absent from the workbook are explicitly identified.

## Reading the workbook correctly

The numbers in column A identify interview reports, not one consistent set of question numbers. One cell may include multiple questions. Doubled quotes, nested comment delimiters, standalone prose and +F9 appear to be copying artifacts; normalize them only when they are present in actual source code. ReactDOM.render is an older mounting style, not proof that the original snippet failed in its original React environment. Modernizing the mounting API is separate from fixing the demonstrated bug.

## Discussion topics

Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.

## Shared fetch Hook

The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

## Product pagination

Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.

## Fetch and product details

Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.

## Context navigation

Question: share location and changeLocation through Context rather than navigation props. Fix createContex to createContext; import useContext; use HandlePageContext consistently instead of handlePageContext; change .provider to .Provider; pass value={{location, changeLocation}} instead of separate provider props. Remove changeLocation from ListProducts props before declaring it from Context (duplicate declaration). location and changeLocation are undefined in App: read Context in a Pages child below the provider. A provider returned by App does not supply Context to App itself. Remove provider={handlePageContext} from RouterComponent; it does not set a Context value. Remove stray +F9. Add list keys, image alt and accessible navigation buttons. Apply the shared fetch fixes.

## Edit user birth dates

Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.

## Every report: question and exact review

### React JS!F2

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
"Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have beeen given a code snippet and asked the change the code of given snippet.
  
/*


coding question answered by resource 1:


/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.
*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
  const [location, setLocation] = useState({ page: ""list"", params: {} });
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))



coding question answered by another resource:

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

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
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
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}


```

</details>

### React JS!F3

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Hi Team, My interview is completed, Below is the analysis
Introduction for 30 sec

Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to optimize filter products function (Debounce is expected)

/*


4.coding question:



/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
        {data.products.map(product => (
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
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

</details>

### React JS!F4

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Dice/teleporter question is a statement only. Build a teleporter lookup, enumerate die outcomes, apply only one teleport and deduplicate final squares. Ask what happens when a roll overshoots last_square; the supplied report does not specify this.

<details><summary>Original question and supplied code</summary>

```text
Hi team i have completed Karat Interview Here are my questions 
Introduction for one minute
Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. I have been asked to tell him the ways how two components can communicate, also advantages and disadvantages of explained method.
4. I have been given a code snippet and asked to optimize filter products function (Debounce is expected)

Coding Question

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
 
```

</details>

### React JS!F5

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Hi Team, My interview is completed, Below is the analysis
Introduction for 30 sec

Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked the change the code of given snippet.

/*


4.coding question:



/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
        {data.products.map(product => (
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
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

</details>

### React JS!F6

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Hi Team, My interview is completed, Below is the analysis
Introduction for 30 sec

Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.

/*


4.coding question:



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

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
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

### React JS!F7

- Reflow/justification code is incomplete: dangling let in reflowAndJustify is a syntax error; words1 through words6 in console calls are undefined in this cell. wrapLines packs with single hyphens but does not fully justify. Flatten lines into words, greedily pack groups, distribute width-letterCount across gaps with floor/remainder, and leave single-word lines unpadded. Avoid emitting an empty line for an oversized word; clarify whether such words are permitted.

<details><summary>Original question and supplied code</summary>

```text
Hi team i have completed Karat Interview Here are my questions 
Introduction for one minute

Coding Question:

/*
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

*/

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

console.log(wrapLines(words1, 13));
console.log(wrapLines(words1, 12));
console.log(wrapLines(words1, 20));
console.log(wrapLines(words2, 5));
console.log(wrapLines(words2, 30));
console.log(wrapLines(words3, 5));
console.log(wrapLines(words4, 5));
console.log(wrapLines(words5, 20));
console.log(wrapLines(words6, 20));
console.log(wrapLines(words6, 4));
console.log(wrapLines(words6, 1));



function reflowAndJustify(lines, maxWidth) {
  let words = lines.join(" ").split(/\s+/);
  
  let 
}
```

</details>

### React JS!F8

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Same dice/teleporter statement as F4; no algorithm implementation is supplied.

<details><summary>Original question and supplied code</summary>

```text
Hi team i have completed Karat Interview Here are my questions 
Introduction for one minute
Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. I have been asked to tell him the ways how two components can communicate, also advantages and disadvantages of explained method.
4. I have been given a code snippet and asked to optimize filter products function (Debounce is expected)

Coding Question

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
 
 
 

  


 
```

</details>

### React JS!F9

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Same dice/teleporter statement as F4; no algorithm implementation is supplied.

<details><summary>Original question and supplied code</summary>

```text
Hi team i have completed Karat Interview Here are my questions 
Introduction for one minute
Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. I have been asked to tell him the ways how two components can communicate, also advantages and disadvantages of explained method.
4. I have been given a code snippet and asked to optimize filter products function (Debounce is expected)

Coding Question

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
 
 
 

  


 
```

</details>

### React JS!F10

- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
/*
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

*/


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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F11

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Hi Team, My interview is completed here are my questions,
Introduction for 1 min

Code snippets were given for the below four questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. I have been given a code snippet and we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to optimize search products function (Debounce is expected)

/*
4.coding question:
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

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
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

### React JS!F12

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
"Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked the change the code of given snippet.

/*


coding question answered by resource 1:


/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
  const [location, setLocation] = useState({ page: ""list"", params: {} });
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))



coding question answered by another resource:

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

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
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
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));"
```

</details>

### React JS!F13

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
"Code snippets were given for the below three questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked the change the code of given snippet.

/*


Coding Question 1:


/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
  const [location, setLocation] = useState({ page: ""list"", params: {} });
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))



coding question answered by another resource:

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

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
    <div>View</div>
    </div>
  );
}

const ListProducts = ({changeLocation}) => {
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
  const [location, setLocation] = useState({ page: ""view"", params: { id: 1 } });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation}/>}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));"


Coding Question 2:

/*
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

*/


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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F14

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
"Code snippets were given for the below four questions.
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to tell how to improve the code functionality.

/*


Coding Question 1:


/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/

import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  alert(""hello"");
}

const ListProducts = ({changeLocation,pages}) => {
  const {loading, error, data} = useFetch(""https://dummyjson.com/products"")

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
   console.log(data.products.length);
     
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
  const [location, setLocation] = useState({ page: ""list"", params: {} });
  const [pages,setPages] = useState(10);
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
 
  return (
    <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} pages={pages} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}
      <button>Prev</button>
      <button onClick={displayList}>1</button>
      <button>Next</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


Coding Question 2:

/*
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

*/


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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F15

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: show ten products at a time with Previous and Next. data.products.map renders every fetched item, pages=10 is not a page index, pages is not used to slice, setPages is unused, Prev/Next have no handlers, and displayList only alerts. Store currentPage starting at 1, use pageSize=10, slice((page-1)*10, page*10), calculate totalPages, and disable boundary buttons. Put controls on the list screen. Client-side pagination only paginates the records already fetched; obtain the full required dataset first or explicitly implement server pagination if allowed. Add key={product.id} to each mapped li. Use buttons for navigation actions and alt on images.
- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
The interview is divided into two sections:

1.) Discussion Round (comprises of four code snippets)
2.) Coding section (one or more coding questions depends on the time left)

Discussion Round:
1.) I was given a code where useReducer is used. The reducer function will consist of an empty switch case. We need to fill the switch cases with appropriate action types.
2.) A class component is given and asked to change to functional component. 
3.) A code is given which mimics the filtering of products through a search bar. I was asked to optimize it. (Debouncing).

The interviewer may ask you to code the above questions.

Coding section: 
 
Question 1: 


/*

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

*/



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
    (async () => {
      let response = await fetch(url, { method });
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


Question 2 : 

/*
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
 
*/
 
 
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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);
 
      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}
 
const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F16

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Question: repair fetching and render title, category, dollar price with two decimals, description and thumbnail; F16 additionally requires discount percentage. Fetch(...) is undefined: call useFetch(...). The View placeholder renders no product fields. Add loading/error/null guards, <strong>{data.title}</strong>, ${data.price.toFixed(2)}, category, description, and <img src={data.thumbnail} alt={data.title}/>. If discount is required, add discountPercentage to the select fields (or request the full product), then render it. A missing method argument is not an error: GET is the fetch default.
- Question: share location and changeLocation through Context rather than navigation props. Fix createContex to createContext; import useContext; use HandlePageContext consistently instead of handlePageContext; change .provider to .Provider; pass value={{location, changeLocation}} instead of separate provider props. Remove changeLocation from ListProducts props before declaring it from Context (duplicate declaration). location and changeLocation are undefined in App: read Context in a Pages child below the provider. A provider returned by App does not supply Context to App itself. Remove provider={handlePageContext} from RouterComponent; it does not set a Context value. Remove stray +F9. Add list keys, image alt and accessible navigation buttons. Apply the shared fetch fixes.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
"The interview is divided into two sections (1 hour Time limit):
                            |
                            V 
1.) Discussion Round (comprises of four code snippets) (30 Minutes)
2.) Coding section (one or more coding questions depends on the time left) (30 minutes)

Discussion Round:
1.) A class component is given and we need to convert it into functional component (we need to say him the changes for converting it to functional).
2.) Code is given and he asked me to explain useReducer concept and what reducer actions would you define.
3.) Code id given , we need to optimize the code (debounce expected).
4.) How do react components communicate with each other?.

The interviewer may ask you to code the above questions.

Coding section: 
 
Question 1: 

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

*/


import React, {useEffect, useState, useCallback} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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
  const {data, error, loading} = Fetch(`https://dummyjson.com/products/${id}?select=id,title,category,description,price,thumbnail`);
  console.log(data);
  return (
    <div>
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

Question 2:

"/*
 
We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.
 
*/
 
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
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
    (async () => {
      let response = await fetch(url, { method });
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
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
    <RouterComponent provider={handlePageContext}>
      <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));

```

</details>

### React JS!F17

- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.
- The client-side pagination arithmetic is largely correct in this attempt. Remaining issues: mapped li has no key, fetch Hook is unsafe, pages state/prop is unused, no empty-data handling, and Next is enabled for totalPages=0 because currentPage===totalPages is false. Disable Next for currentPage>=totalPages. The total uses only fetched products, not necessarily the complete catalog. currentPage state resets when the list unmounts for details; lift it if returning should preserve the page. Hooks are already above early returns, which is correct.

<details><summary>Original question and supplied code</summary>

```text
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
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

### React JS!F18

- This cell is truncated at se inside an if block. It is not runnable and cannot be completely reviewed. Request the missing portion rather than claiming a specific complete implementation.

<details><summary>Original question and supplied code</summary>

```text
const useFetch = (url, method) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ''
  });
  useEffect(() => {
    (async () => {
      let response = await fetch(url, { method });
      if(!response.ok) {
        se
```

</details>

### React JS!F19

- OfficeList/Context/UserList errors are mentioned but no snippet is included. Exact errors cannot be identified. Coding requirements are display products, fix Context, back/forward screen navigation and frontend-only pagination. Keep routing state in a provider, place consumers below it, and paginate a local/fetched array with slice. Do not substitute server-side pagination for this particular frontend-only requirement.

<details><summary>Original question and supplied code</summary>

```text
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
```

</details>

### React JS!F20

- Question: share location and changeLocation through Context rather than navigation props. Fix createContex to createContext; import useContext; use HandlePageContext consistently instead of handlePageContext; change .provider to .Provider; pass value={{location, changeLocation}} instead of separate provider props. Remove changeLocation from ListProducts props before declaring it from Context (duplicate declaration). location and changeLocation are undefined in App: read Context in a Pages child below the provider. A provider returned by App does not supply Context to App itself. Remove provider={handlePageContext} from RouterComponent; it does not set a Context value. Remove stray +F9. Add list keys, image alt and accessible navigation buttons. Apply the shared fetch fixes.
- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Question 1:

"/*
 
We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.
 
*/
 
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
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
    (async () => {
      let response = await fetch(url, { method });
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
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
    <RouterComponent provider={handlePageContext}>
      <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));
Coding Question 2:

/*
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

*/


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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F21

- Question: share location and changeLocation through Context rather than navigation props. Fix createContex to createContext; import useContext; use HandlePageContext consistently instead of handlePageContext; change .provider to .Provider; pass value={{location, changeLocation}} instead of separate provider props. Remove changeLocation from ListProducts props before declaring it from Context (duplicate declaration). location and changeLocation are undefined in App: read Context in a Pages child below the provider. A provider returned by App does not supply Context to App itself. Remove provider={handlePageContext} from RouterComponent; it does not set a Context value. Remove stray +F9. Add list keys, image alt and accessible navigation buttons. Apply the shared fetch fixes.
- Question: edit birth dates with Apply/Cancel, allow one user in edit mode, discard drafts when switching users, and move users between groups after Apply. The Edit button has no handler, no editing state/input/Apply/Cancel exists, and there is no update callback. Keep one users array, editingId, and draftBirthDate in the parent. Derive both groups from users; update the matching user immutably using map on Apply. Cancel clears only the edit state. Beginning another edit replaces editingId and draftBirthDate. Add stable keys to the outer mapped divs. Render loading/errors. Fix the shared fetch problems; the hasError read inside the effect captures an old render, so explicitly reset it at request start instead. The sort comparator must return 0 for equal dates: use birthdayToTime(a.birthDate)-birthdayToTime(b.birthDate). Clarify the year-2000 boundary: code uses >=2000, although the heading says after 2000. Validate dates; handle date-only years consistently rather than allowing timezone conversions to shift a boundary.
- The shared useFetch Hook continues after !response.ok, allowing an HTTP failure to be treated as success. Throw inside try/catch, reset loading/error for each request, and abort/ignore old requests during cleanup. Network/JSON failures must produce an error state. fetch(url, {method: undefined}) defaults to GET; the optional method argument is not the cause of the failure. Check loading/error/data before rendering fields.

<details><summary>Original question and supplied code</summary>

```text
Question 1:

"/*
 
We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.
 
*/
 
import React, {useEffect, useState, useCallback,createContex} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
 
 
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
  const [location, setLocation] = useState({ page: ""list"", params: {} });
 
  const changeLocation = useCallback((page, params) => {
    setLocation({page, params: params || {}});
  }, [setLocation])
  return(
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
    (async () => {
      let response = await fetch(url, { method });
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
  const {loading, error, data} = useFetch(""https://dummyjson.com/products?limit=25"")
 
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map(product => (
          <li>
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
    <RouterComponent provider={handlePageContext}>
      <div className=""App"">
      {location.page === ""list"" && <ListProducts changeLocation={changeLocation} />}
      {location.page === ""view"" && <ViewProduct id={location.params.id}/>}
      { location.page !== ""list"" && (
        <div>
          <a className=""link"" onClick={() => changeLocation(""list"")}>Return to list</a>
        </div>
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 
ReactDOM.render(<App />, document.getElementById('root'));
Coding Question 2:

/*
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

*/


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
    (async () => {
      const response = await fetch(url, { method });
      if (!response.ok) {
        setHasError(true);
        setIsLoading(false);
      }
      const data = await response.json();
      setResponse(data);
      setIsLoading(false);

      if (hasError) {
        setHasError(false);
      }
    })();
  }, [url, method]);
  
  return { response, isLoading, hasError, };
}

const getBeforeAndAfterLists = (users) => {
    const internalUsers = users.map(user => ({ name: user.name || `${user.firstName} ${user.lastName}`, birthDate: user.birthDate, id: user.id }));
    
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

### React JS!F22

- Social connections: statement and data only; no algorithm to debug. Connections are explicitly symmetric. Use Map<user, Set<user>>, add/delete both directions, retain zero-connection users, then group with count<N versus count>=N. Treat reversed pairs as the same edge. Average time O(E+U), auxiliary space O(U+C), where C is final connections.

<details><summary>Original question and supplied code</summary>

```text
/*
You are analyzing data for Aquaintly, a hot new social network.

On Aquaintly, connections are always symmetrical. If a user Alice is connected to Bob, then Bob is also connected to Alice.

You are given a sequential log of CONNECT and DISCONNECT events of the following form:
- This event connects users Alice and Bob: ["CONNECT", "Alice", "Bob"]
- This event disconnects the same users: ["DISCONNECT", "Bob", "Alice"] (order of users does not matter)

We want to separate users based on their popularity (number of connections). To do this, write a function that takes in the event log and a number N and returns two collections:
[Users with fewer than N connections], [Users with N or more connections]

Example:
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

Using a target of 3 connections, the expected results are:
Users with less than 3 connections: ["Alice", "Charlie", "Pam", "Nicole"]
Users with 3 or more connections: ["Dennis", "Bob", "Edward"]

All test cases:
grouping(events, 3) => [["Alice", "Charlie", "Pam", "Nicole"], ["Dennis", "Bob", "Edward"]]
grouping(events, 1) => [[], ["Alice", "Charlie", "Dennis", "Bob", "Pam", "Edward", "Nicole"]]
grouping(events, 10) => [["Alice", "Charlie", "Dennis", "Bob", "Pam", "Edward", "Nicole"], []]
Complexity Variable:
E = number of events

*/
"use strict";
```

</details>

### React JS!F23

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Word wrapping: the helper incorrectly fully justifies even though the question asks for one hyphen between words. Replace jsutWrap(...) with current.join("-"). It also inserts underscores instead of hyphens. if(!wordCount===0) always compares a boolean with the number 0; use if(wordCount===0). if(words.length===0) words[0] neither returns nor handles a single word. A justification helper would need an explicit single-word return before dividing by gaps; plain wrapping needs no such helper. Clarify oversized-word behavior.

<details><summary>Original question and supplied code</summary>

```text
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to optimise it.
 
 
/*
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
*/
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
       result.push(jsutWrap(current, letterSum, maxWidth))
       current = [w]
       letterSum = w.length;
     }
   }
   
   if(current.length > 0){
      result.push(jsutWrap(current, letterSum, maxWidth))
   }
 
  return result;
}
 
function jsutWrap(words, letterSum, maxWidth){
   
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

### React JS!F24

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Robot parts: the first part is inserted twice because initialization uses [part] and then unconditionally pushes part. Initialize with [] or, better, a Set. The final loop contains only partsWithRobots and computes nothing. There is no returned result. For each robot check requiredParts.every(part=>available.has(part)), then return qualifying names. Duplicate parts must not count as different required part types.

<details><summary>Original question and supplied code</summary>

```text
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to optimise it.
 
Coding DSA question . No React coding question
/*
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
 */
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
        if(!partsWithRobots[robot]) partsWithRobots[robot]=[part];
        partsWithRobots[robot].push(part)
    }
    console.log(partsWithRobots)
    const reqParts=required_parts_1.split(",");
    console.log(reqParts)
    
    for(var i=0;i<reqParts.length;i++){
      partsWithRobots
    }
    
  }
  
  get_robots(all_parts,required_parts_1)
```

</details>

### React JS!F25

- Discussion questions: class-to-function conversion, reducers/actions, component communication and sometimes search optimization. The original class/reducer/search review snippets are not preserved here, so exact line errors cannot be established. Explain state via useState/useReducer, render via a direct JSX return, props via parameters, effects and cleanup for lifecycle work, pure immutable reducer updates, and props/callbacks/lifted state/Context for communication. Debounce search with a timeout canceled by effect cleanup; use the debounced value in the actual filtering/request.
- Two algorithm questions; no solution functions are supplied. 1) Scrambled word in note: count character frequencies and ensure each candidate word uses no letter more often than the note; return the match or "-". Substring/Set checks are insufficient. 2) Grid word: search all possible start cells with DFS, moving only right/down and tracking the word index and coordinate path. Backtrack on a mismatch; return a path or an agreed no-match result.

<details><summary>Original question and supplied code</summary>

```text
1. I have been given a class component and asked to check what change it to functional component.
2. I have been given a code snippet and asked the concept of reducers.
3. we need to tell them the ways how two components can communicate.
4. I have been given a code snippet and asked to optimise it.
 
Coding: 2 DSA question . No React coding question
1)
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
 
2)
You are running a classroom and suspect that some of your students are passing around the answer to a multiple-choice question in 2D grids of letters. The word may start anywhere in the grid, and consecutive letters can be either immediately below or immediately to the right of the previous letter.
Given a grid and a word, write a function that returns the location of the word in the grid as a list of coordinates. If there are multiple matches, return any one.
grid1 = [
   ['b', 'b', 'b', 'a', 'l', 'l', 'o', 'o'],
   ['b', 'a', 'c', 'c', 'e', 's', 'c', 'n'],
   ['a', 'l', 't', 'e', 'w', 'c', 'e', 'w'],
   ['a', 'l', 'o', 's', 's', 'e', 'c', 'c'],
   ['w', 'o', 'o', 'w', 'a', 'c', 'a', 'w'],
   ['i', 'b', 'w', 'o', 'w', 'w', 'o', 'w']
]
word1_1 = "access"      # [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
word1_2 = "balloon"     # [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
word1_3 = "wow"         # [(4, 3), (5, 3), (5, 4)] OR 
                       # [(5, 2), (5, 3), (5, 4)] OR 
                       # [(5, 5), (5, 6), (5, 7)]
                        
word1_4 = "sec"         # [(3, 4), (3, 5), (3, 6)] OR 
                       # [(3, 4), (3, 5), (4, 5)]   
word1_5 = "bbaal"       # [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1)]
 
grid2 = [
 ['a'],
]
word2_1 = "a"
grid3 = [
   ['c', 'a'],
   ['t', 't'],
   ['h', 'a'],
   ['a', 'c'],
   ['t', 'g']
]
word3_1 = "cat"
word3_2 = "hat"
grid4 = [
   ['c', 'c', 'x', 't', 'i', 'b'],
   ['c', 'a', 't', 'n', 'i', 'i'],
   ['a', 'x', 'n', 'x', 'p', 't'],
   ['t', 'x', 'i', 'x', 't', 't']
]
word4_1 = "catnip"      # [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                       # [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]
 
All test cases:
search(grid1, word1_1) => [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
search(grid1, word1_2) => [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
search(grid1, word1_3) => [(4, 3), (5, 3), (5, 4)] OR 
                         [(5, 2), (5, 3), (5, 4)] OR 
                         [(5, 5), (5, 6), (5, 7)]
search(grid1, word1_4) => [(3, 4), (3, 5), (3, 6)] OR
                         [(3, 4), (3, 5), (4, 5)]                          
search(grid1, word1_5) => [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1)]
search(grid2, word2_1) => [(0, 0)]
search(grid3, word3_1) => [(0, 0), (0, 1), (1, 1)]
search(grid3, word3_2) => [(2, 0), (3, 0), (4, 0)]
search(grid4, word4_1) => [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                         [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]
Complexity analysis variables:
r = number of rows
c = number of columns
w = length of the word
*/
 
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

### React JS!F26

- Song pair: no implementation is supplied. Convert m:ss to integer seconds, then use a Map to find the complement to 420 seconds. Check the Map before storing the current song to avoid pairing an entry with itself. Do not treat 3:41 as 3.41 minutes.

<details><summary>Original question and supplied code</summary>

```text
Problem Statement
We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.
Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection.
Example Data
Sample Input 1
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
 
Expected Output:
find_pair(song_times_1) // => ["Rock and Roll", "Hot Dog"] (Reason: 3:41 + 3:19 = 7:00)
 
Sample Input 2 (Additional Input)
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

### React JS!F27

- Four example topics plus hooks/lifecycle discussion. Debounce example correctly updates debouncedQuery but never uses it, so no search is actually debounced. Use debouncedQuery in filtering or a request effect. ProductSearch is correct for a small array, but uses immediate search; add debounce if requested. Lazy/Suspense example is valid provided Dashboard exists and is a default export; use an error boundary to handle a failed chunk import when required. UsersList handles HTTP/network errors but lacks effect cleanup: add AbortController/ignore protection and do not update state after cancellation. These examples are separate components/files, not one pasted module with repeated imports/default exports. Empty dependency array means no dependency-triggered reruns, not a guarantee of exactly one setup in development Strict Mode.

<details><summary>Original question and supplied code</summary>

```text
"The interview was divided into two sections:

Discussion Round (included discussion around multiple code snippets)
Coding Round (one or more coding questions, depending on the remaining time)

Discussion Round
The discussion covered the following topics:


Introduction and Technical Background

Questions about my experience, projects, and technical expertise.



React Hooks

Asked to write the syntax of the useEffect hook.
Discussed the advantages and use cases of React Hooks.



Debugging React Components

Given several functional components and asked to identify and fix existing errors.



Performance Optimization

Questions on React optimization techniques.
Explained concepts such as lazy loading and its benefits.



React Lifecycle

Discussed React component lifecycle and how lifecycle methods relate to functional components and hooks.



Search Optimization Scenario

Given a code example that implemented product filtering through a search bar.
Asked to optimize the solution, where debouncing was expected as the preferred approach.




Note: The interviewer asked me to write code for the above discussion topics.

Coding Round
The coding section consisted of React.js and JavaScript-based coding questions. The number and complexity of questions depended on the time available after the discussion round."

What is Debouncing?Why and where do we use Debouncing?​‌
Difference Between Debouncing and Throttling​‌

How do you implement Debouncing in React?
Answer:
import { useState, useEffect } from "react";
function Search() {
const [query, setQuery] = useState("");
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

What is Lazy Loading?What problem does Lazy Loading solve?
What is React.lazy()? Advantages of lazy loading?
How do you implement Lazy Loading in React?​‌
Answer:
import React, { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./Dashboard"));
function App() {
return (
<Suspense fallback={<h1>Loading...</h1>}>
<Dashboard />
</Suspense>
);
}

Display a list of products and filter them based on user search input.
Answer:
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
Fetch users from an API and display loading, error, and success states.
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

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
Follow-up questions
Q: Why is dependency array empty?
Because we want to fetch users only once when the component mounts.
Q: How will you avoid setting state after unmount?
Use cleanup with AbortController.
```

</details>

