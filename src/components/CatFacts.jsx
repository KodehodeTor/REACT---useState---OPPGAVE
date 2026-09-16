import { useState } from "react";
import { useEffect } from "react";

export function CatFact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch facts
        const response = await fetch("https://catfact.ninja/facts?limit=5");
        // If response is not OK throw error message
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        // pauses until the data is requested fully and converted to JS
        const result = await response.json();
        setData(result.data);
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
      {/* Loading ... rendering */}
      {loading && <h1>Loading...</h1>}
      {/* Error rendering */}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
      {/* Only show list if there is data to display */}
      {data.length > 0 && (
        <div>
          {/* Render cat fact list */}
          <h2>🐈Cat Fact:</h2>
          <ul className="cat_list">
            {/* Loop through catfact array, arrow function for fact and index number */}
            {data.map((catfact, index) => (
              // Shows text string from object and places it in a list order.
              <li key={index}>{catfact.fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
