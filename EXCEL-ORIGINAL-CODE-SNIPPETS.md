# Original code snippets from the React JS sheet

Source: KARAT Assessment Question Template.xlsx, React JS!F2:F27. Code is extracted without correcting errors, quote artifacts, incomplete functions, or duplicate versions. Each block names its original cell. Discussion answers and corrected solutions are excluded.

## React JS!F2

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

No standalone implementation snippet is supplied in this cell.

## React JS!F5

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

No standalone implementation snippet is supplied in this cell.

## React JS!F9

No standalone implementation snippet is supplied in this cell.

## React JS!F10

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

No standalone implementation snippet is supplied in this cell.

## React JS!F20

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

## React JS!F26

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
