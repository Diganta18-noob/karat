import React, {
  useEffect,
  useState,
  useCallback
} from "react";



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
    `https://dummyjson.com/products/${id}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <>
      <h1>{data.title}</h1>

      <div>Category: {data.category}</div>

      <div>
        Price: ${data.price.toFixed(2)}
      </div>

      <div>
        Description: {data.description}
      </div>

      <div>
        <img
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
    </>
  );
};

const ListProducts = ({ changeLocation }) => {

  // Current page
  const [page, setPage] = useState(1);

  // 10 products per page
  const limit = 10;

  // Calculate products to skip
  const skip = (page - 1) * limit;

  // Fetch only 10 products
  const { loading, error, data } = useFetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

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
                  id: product.id
                })
              }
            >
              {product.title}
            </button>

          </li>
        ))}
      </ul>

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      <span>
        {" "}Page {page}{" "}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={skip + limit >= data.total}
      >
        Next
      </button>

    </div>
  );
};

const App = () => {
  const [location, setLocation] = useState({
    page: "list",
    params: {}
  });

  const changeLocation = useCallback((page, params) => {
    setLocation({
      page,
      params: params || {}
    });
  }, []);

  return (
    <div className="App">

      {location.page === "list" && (
        <ListProducts
          changeLocation={changeLocation}
        />
      )}

      {location.page === "view" && (
        <ViewProduct
          id={location.params.id}
        />
      )}

      {location.page !== "list" && (
        <div>

          <button
            onClick={() => changeLocation("list")}
          >
            Return to list
          </button>

        </div>
      )}

    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

export default App;
