import React, { useEffect, useState } from "react";

export default function FastApiDemo() {
  const [hello, setHello] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then(res => res.json())
      .then(data => setHello(data.message))
      .catch(err => setError("Failed to fetch hello: " + err));

    fetch("http://localhost:8000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => setError("Failed to fetch users: " + err));
  }, []);

  return (
    <div>
      <h2>FastAPI Demo</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <div>
        <strong>Hello endpoint:</strong> {hello}
      </div>
      <div>
        <strong>Users endpoint:</strong>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
  );
}