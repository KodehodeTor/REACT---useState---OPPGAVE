import { mockData } from "../data/mockData.js";
import { useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState(mockData);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = (e) => {
    // Handles submitting
    e.preventDefault();
    // Checks if username or email is empty
    if (!username || !email) return;

    // Creates a new user object if both username and email exists.
    const newUser = { username, email };

    // Update state using spread
    setUsers([...users, newUser]);

    // Clear input fields:
    setUsername("");
    setEmail("");
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Add user form */}
      <form onSubmit={handleAddUser} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add users</button>
      </form>
      {/* Render list */}
      <ul>
        {users.map((item, index) => (
          <li key={index}>
            {/* Strong = important! */}
            <strong>{item.username}</strong> {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
