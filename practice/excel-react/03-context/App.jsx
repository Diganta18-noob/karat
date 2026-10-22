import React, {useEffect, useState, useCallback,createContex} from 'react';

 
 
const HandlePageContext=createContex();
 
const RouterComponent=({children})=>{
  const [location, setLocation] = useState({ page: "list", params: {} });
 
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
 
const ListProducts = ({changeLocation}) => {
  const {loading, error, data} = useFetch("https://dummyjson.com/products?limit=25")
 
const {location,changeLocation}=useContext(handlePageContext);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error!</div>
 
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
 
 
  return (
    <RouterComponent provider={handlePageContext}>
      <div className="App">
      {location.page === "list" && <ListProducts changeLocation={changeLocation} />}
      {location.page === "view" && <ViewProduct id={location.params.id}/>}
      { location.page !== "list" && (
        <div>
          <a className="link" onClick={() => changeLocation("list")}>Return to list</a>
        </div>
      )}+F9
    </div>
    </RouterComponent>
  
  )
}
 


export default App;
