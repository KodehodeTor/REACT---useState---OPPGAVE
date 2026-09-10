import { useState } from "react";
import "./App.css";

//Cat API thingie
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch API
        const response = await fetch("https://catfact.ninja/facts?limit=5");
        // If response is not OK throw error message
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        // pauses until the data is requested fully and converted to JS
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Catch errors
        setError(err.message);
      } finally {
        // Stop loading
        setLoading(false);
      }
    };
    // Fetch data
    fetchData();
    // Empty dependency array
  }, []);

  // Return
  return (
    <>
      {/* If loading */}
      {loading && <h1>Loading...</h1>}
      {/* If errors */}
      {error && <h2 style={{ color: "red" }}>Error: {error.message}</h2>}
      {/* Append data */}
      data && (
      <div>
        <h2>{data.title}</h2>
        <p>Post id: {data.id}</p>
      </div>
      )
    </>
  );
}
// Export function
export default App;
