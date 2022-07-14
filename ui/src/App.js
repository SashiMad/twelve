import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import ToDos from "./ToDos";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(undefined);

  return !loggedInUser ? (
    <Login setLoggedInUser={setLoggedInUser} />
  ) : (
    <ToDos loggedInUser={loggedInUser} />
  );
}

export default App;
