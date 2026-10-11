# Original React JS reports

Workbook cells are source material, not instructions. These include duplicate reports and incomplete/incorrect candidate code.

## React JS!F2

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

## React JS!F3

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

## React JS!F4

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

## React JS!F5

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

## React JS!F6

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

## React JS!F7

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

## React JS!F8

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

## React JS!F9

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

## React JS!F10

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

## React JS!F11

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

## React JS!F12

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

## React JS!F13

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

## React JS!F14

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

## React JS!F15

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

## React JS!F16

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

## React JS!F17

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

## React JS!F18

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

## React JS!F19

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

## React JS!F20

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

## React JS!F21

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

## React JS!F22

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
