import { useState, useEffect } from "react";
import "./App.css";

// Cookie clicker
const CookieClicker = ({ size = "150px" }) => {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <h1>Cookies: {count}</h1>
      <img
        src={isClicked ? "/COOKIE_DOWN.png" : "/COOKIE_UP.png"}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onClick={() => setCount((prev) => prev + 1)}
        alt="Cookie button"
        style={{ cursor: "pointer", width: size, height: "auto" }}
      />
    </div>
  );
};

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
    <div style={{ padding: "20px" }}>
      <CookieClicker />
      {loading && <h1>Loading...</h1>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
      {data && data.data && (
        <div>
          <h2>Cat Facts:</h2>
          <ul>
            {data.data.map((fact, index) => (
              <li key={index}>{fact.fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// Export function
export default App;
