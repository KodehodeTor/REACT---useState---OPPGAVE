import { useState, useEffect } from "react";
import "./App.css";
import confetti from "canvas-confetti";

// Cookie clicker
const CookieClicker = ({ size = "150px" }) => {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  // Handler for 100 clicks:
  const handleCookie = () => {
    setCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 100) {
        triggerCelebration();
      }
      return nextCount;
    });
  };

  // Confetti logic
  const triggerCelebration = () => {
    // Left side
    ({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.2, y: 0.6 },
    })(
      // Right side
      {
        particleCount: 150,
        spread: 80,
        origin: { x: 0.8, y: 0.6 },
      },
    );
  };

  return (
    <div>
      <h1 style={{ color: count >= 100 ? "#ffcc00" : "inherit" }}>
        {/* When hitting 100= GZ */}
        Cookies: {count} {count >= 100 && "🎉 GZ!"}
      </h1>
      <img
        src={isClicked ? "/COOKIE_DOWN.png" : "/COOKIE_UP.png"}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onClick={handleCookie}
        alt="Cookie button"
        style={{
          cursor: "pointer",
          width: size,
          height: "auto",
          transition: "transform 0.1s ease",
          transform: isClicked ? "scale (0.95)" : "scale(1)",
        }}
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
