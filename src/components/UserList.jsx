import { mockData } from "../data/mockData.js";
import { useState } from "react";


// export const mockData = [
//   { username: "Ola Normann", email: "ola.normann@norge.no" },
//   { username: "Torleif", email: "torleif@kodehode.no" },
//   { username: "Jan Egil", email: "jan.egil@kodehode.no" },
//   { username: "Sander", email: "sander@kodehode.no" },
// ];


export default function UserList() {
    const [user, setUser] = useState(mockData)
    const [username, setUsername] = useState ("")
    const [email, setEmail] = useState ("")

    const handleAddUser = (e) => {
        // Handles submitting
        e.preventDefault();
        if (!username || !email) return;

        // Creates a new user object
        const newUser = { username, email };

        // Update state using spread 
        setUsers([...users, newUser]);

        // Clear input fields:
        setUsername("");
        setEmail("");


        return (
            <div style= {{padding: "1.5rem"}}>
                {/* Add user form */}
                <form onSubmit={handleAddUser} style={{marginBottom: "2rem"}}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>                
                {/* Email input */}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Add users</button>
                </form> 
                {/* Render list */}
                <ul>
                    {user.map((item, index) => (
                        <li key={index}>
                            {/* Strong = important! */}
                            <strong>{item.username}</strong> {item.email}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
  }



/