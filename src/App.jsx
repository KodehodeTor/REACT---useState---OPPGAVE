import { CatFact } from "./components/CatFacts.jsx";
import { CookieClicker } from "./components/CookieClicker.jsx";

// Main App
function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <CookieClicker />
      <CatFact />
      <mockData />
    </div>
  );
}
// Export function
export default App;
