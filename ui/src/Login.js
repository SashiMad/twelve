import React, { useState, useCallback } from "react";
import "./Login.css";

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");

  const login = useCallback(
    async (username) => {
      const dbUser = await (
        await fetch(`http://localhost:3001/users?name=${username}`)
      ).json();

      if (dbUser.length > 0) {
        setLoggedInUser(dbUser[0].id);
      }
    },
    [setLoggedInUser]
  );

  return (
    <div className="login">
      <input
        className="input"
        type="text"
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={() => login(username)}
        className="btn btn-dark submitBtn"
      >
        Submit
      </button>
      <div className="hint">hint: try the username "Sashi"</div>
    </div>
  );
};

export default Login;
