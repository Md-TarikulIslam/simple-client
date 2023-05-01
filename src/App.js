import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch((error) => console.error(error));
    form.reset();
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder="name" />
        <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br />
        <button type="submit">Add new user</button>
      </form>
      <h2>Users: {users.length}</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} <br /> {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
