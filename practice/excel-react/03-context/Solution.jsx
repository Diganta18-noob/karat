import React, {
  useEffect,
  useState,
  useCallback,
  createContext, // CHANGE: createContex -> createContext
  useContext, // CHANGE: import useContext
} from "react";



/* ==========================================
   CHANGE 1: Create Context
========================================== */

const HandlePageContext = createContext();

/* ==========================================
   CHANGE 2: Create our Router Provider
========================================== */

const RouterComponent = ({ children }) => {
  const [location, setLocation] = useState({
    page: "list",
    params: {},
  });

  const changeLocation = useCallback((page, params) => {
    setLocation({
      page,
      params: params || {},
    });
  }, []);

  return (
    // CHANGE:
    // Provider must have capital P
    // Pass location + changeLocation using value
    <HandlePageContext.Provider value={{ location, changeLocation }}>
      {children}
    </HandlePageContext.Provider>
  );
};

/* ==========================================
   CHANGE 3: Simple custom hook
========================================== */

const useRouter = () => {
  return useContext(HandlePageContext);
};

/* ==========================================
   Existing useFetch
========================================== */

// CHANGE: Handle failed requests with try/catch.
const useFetch = (url, method = "GET") => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: "" });

      try {
        const response = await fetch(url, { method });

        if (!response.ok) {
          throw new Error("Could not load data");
        }

        const data = await response.json();

        setState({
          data,
          loading: false,
          error: "",
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [url, method]);

  return state;
};

const ViewProduct = ({ id }) => {
  const { data, error, loading } = useFetch(
    `https://dummyjson.com/products/${id}`,
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <>
      <h1>{data.title}</h1>

      <div>Category: {data.category}</div>

      <div>Price: ${data.price.toFixed(2)}</div>

      <div>Description: {data.description}</div>

      <div>
        <img src={data.thumbnail} alt={data.title} />
      </div>
    </>
  );
};

/* ==========================================
   List Products
========================================== */

// CHANGE:
// No need to receive changeLocation through props anymore
const ListProducts = () => {
  const { loading, error, data } = useFetch(
    "https://dummyjson.com/products?limit=25",
  );

  // CHANGE:
  // Get changeLocation directly from Context
  const { changeLocation } = useRouter();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div>
      <h1>Products</h1>

      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <button
              onClick={() =>
                changeLocation("view", {
                  id: product.id,
                })
              }
            >
              {product.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ==========================================
   App Content
========================================== */

// CHANGE:
// Created this component because it is INSIDE Provider.
// Therefore it can access the Context.
const AppContent = () => {
  // CHANGE:
  // location and changeLocation now come from Context
  const { location, changeLocation } = useRouter();

  return (
    <div className="App">
      {location.page === "list" && (
        // CHANGE:
        // No need to pass changeLocation
        <ListProducts />
      )}

      {location.page === "view" && <ViewProduct id={location.params.id} />}

      {location.page !== "list" && (
        <div>
          <button onClick={() => changeLocation("list")}>Return to list</button>
        </div>
      )}
    </div>
  );
};

/* ==========================================
   Main App
========================================== */

const App = () => {
  return (
    // CHANGE:
    // Wrap application with Context Provider
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
};




export default App;
