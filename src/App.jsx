import { CatFact } from "./components/CatFacts.jsx";
import { CookieClicker } from "./components/CookieClicker.jsx";
import UserList from "./components/UserList.jsx";

// Main App
function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <CookieClicker />
      <CatFact />
      <UserList />
    </div>
  );
}
// Export function
export default App;
