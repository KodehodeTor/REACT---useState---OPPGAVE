import { useState, useEffect } from "react";
import * as confetti from "canvas-confetti";

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
    try {
      // Left side
      confetti.default({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.2, y: 0.6 },
      });
      confetti.default(
        // Right side
        {
          particleCount: 150,
          spread: 80,
          origin: { x: 0.8, y: 0.6 },
        },
      );
    } catch (err) {
      console.log("Confetti animation failed: ", err);
    }
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
      <p style={{ fontSize: "9px" }}>psst! click me 100 times</p>
      <br />
      <br />
      <br />
    </div>
  );
};

//Cat  thingie
function App() {
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
      <CookieClicker />
      {loading && <h1>Loading...</h1>}
      {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
      {data.length > 0 && (
        <div>
          <h2>🐈Cat Fact:</h2>
          <ul className="cat_list">
            {data.map((catfact, index) => (
              <li key={index}>{catfact.fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// Export function
export default App;

// Psuedo code for list

// <input type=txt value=username onchange={(e) => setUsername(e.target.value)} />
//
// const newUser = {info}
//
//  setUser ((prev) => [...prev] somethingsomething)
//
// {user.map((user) => ( div p username /p p email /p div ))}
//
// Date.now
//
// const userList = () => {
// const [user, setUser] = useState ([])
// const [username, setUsername] = useState ("")
// const [email, setEmail] = useState("")
//
// const addUser = () => {
//
// create new user
//
// add new user
//
// Clear username and email input

// return (
//   <div>
//     {/* username input */}
//     {/* email input */}
//     <button onClick={addUser}>Add User</button>
//     {/* .map(user) */}
//   </div>
// )

// export default userList
