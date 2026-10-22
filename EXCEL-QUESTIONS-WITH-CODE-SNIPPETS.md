# Original React JS questions and code snippets

Questions and code are taken from the React JS sheet. Code, including errors and duplicate versions, is unchanged. Discussion answers and corrected solutions are excluded. If the source omits a question or implementation, that is noted.

## React JS!F2

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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
```

### Question

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

### Original code block 2

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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

### Question

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

## React JS!F5

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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

### Question

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

### Original code block 1

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

### Question

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

### Reflow and justification implementation (incomplete)

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

### Question

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

## React JS!F9

### Question

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

## React JS!F10

### Question

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

### Original code block 1

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

### Question

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

### Original code block 1

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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
```

### Question

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

### Original code block 2

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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
```

### Question

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

### Original code block 2

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

### Question

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

### Original code block 3

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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
```

### Question

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

### Original code block 2

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.

We would like to add pagination to the ListProducts page. The list should only show 10 products at a time, and the page should have links or buttons for navigating backwards and forwards in the list.

### Original code block 1

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
```

### Question

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

### Original code block 2

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

### Question

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

### Original code block 1

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
```

### Question

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

### Original code block 2

```jsx
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

### Question

No separate question statement accompanies this snippet in the cell. The code is an attempted product-pagination implementation.

### Pagination implementation

```jsx
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

### Question

No separate question statement accompanies this snippet in the cell. The supplied fetch snippet is truncated.

### Truncated fetch Hook

```jsx
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

### Question

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

## React JS!F20

### Question

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

### Original code block 1

```jsx
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

### Question

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

### Original code block 2

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

### Question

We are working on a back-office application that displays products available for purchase on our company's website.
 
We have a custom-built page routing system, but engineers are finding that there is too much boilerplate code for passing down the changeLocation function to every component that needs to manage navigation.
 
Create a new React Context for sharing the current location and location update function, and update the components to use it. Optionally, create a new React Hook to make it easy to get the current value from your new context.

### Original code block 1

```jsx
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

### Question

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

### Original code block 2

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

### Question

You are analyzing data for Aquaintly, a hot new social network.

On Aquaintly, connections are always symmetrical. If a user Alice is connected to Bob, then Bob is also connected to Alice.

You are given a sequential log of CONNECT and DISCONNECT events of the following form:
- This event connects users Alice and Bob: ["CONNECT", "Alice", "Bob"]
- This event disconnects the same users: ["DISCONNECT", "Bob", "Alice"] (order of users does not matter)

We want to separate users based on their popularity (number of connections). To do this, write a function that takes in the event log and a number N and returns two collections:
[Users with fewer than N connections], [Users with N or more connections]

### Social-connection input data (no solution function supplied)

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

## React JS!F23

### Question

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

### Word-wrap implementation

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

## React JS!F24

### Question

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

### Robot-parts implementation (incomplete)

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

## React JS!F25

### Question

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

### Grid-search data (no search function supplied)

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

### Additional original question: scrambled word

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

## React JS!F26

### Question

Problem Statement
We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.
Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection.

### Song input data 1 (no solution function supplied)

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

### Question

Problem Statement
We have a catalog of song titles (and their lengths) that we play at a local radio station. We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.
Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes. If there is no such pair, return an empty collection.

### Song input data 2 (no solution function supplied)

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

## React JS!F27

### Question

What is Debouncing?Why and where do we use Debouncing?
Difference Between Debouncing and Throttling
How do you implement Debouncing in React?

### Debounce example

```jsx
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
```

### Question

What is Lazy Loading?What problem does Lazy Loading solve?
What is React.lazy()? Advantages of lazy loading?
How do you implement Lazy Loading in React?

### Lazy-loading example

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

### Question

Display a list of products and filter them based on user search input.

### Product-search example

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

### Question

Fetch users from an API and display loading, error, and success states.

### Users-fetch example

```jsx
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
```
