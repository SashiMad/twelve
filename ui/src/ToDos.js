import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

const fetchTodosAndUpdate = (userId, setToDos) => {
  fetch(`http://localhost:3001/toDoLists?authorId=${userId}&_embed=toDoItems`)
    .then((res) => res.json())
    .then((res) => setToDos(res[0]));
};

const ToDos = ({ loggedInUser }) => {
  const [toDoList, setToDoList] = useState(undefined);

  useEffect(() => {
    fetchTodosAndUpdate(loggedInUser, setToDoList);
  }, [loggedInUser]);

  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    fetch(`http://localhost:3001/toDoItems/${id}`, {
      method: "DELETE",
    });

    setTodos(updatedTodos);
  }

  const toggleComplete = useCallback(
    (id) => {
      const todoToToggle = toDoList.toDoItems.find((todo) => todo.id === id);

      fetch(`http://localhost:3001/toDoItems/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isDone: !todoToToggle.isDone,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      fetchTodosAndUpdate(loggedInUser, setToDoList);
    },
    [toDoList, loggedInUser]
  );

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      fetch(`http://localhost:3001/toDoItems/${id}`, {
        method: "PUT",
        body: JSON.stringify(editingText),
      });
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  function addTodo(e) {
    fetch("http://localhost:3001/toDoItems", {
      method: "POST",
      body: JSON.stringify(e.target.value),
    }).then((result) => {
      result.json();
    });
  }

  return !toDoList ? (
    <>Loading your data</>
  ) : (
    <div className="App">
      <div>{toDoList.title}</div>
      <div>{toDoList.description}</div>
      {toDoList.toDoItems &&
        toDoList.toDoItems.map((todo) => (
          <div key={todo.id}>
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div>{todo.description}</div>
            )}

            <input
              type="checkbox"
              onChange={() => toggleComplete(todo.id)}
              checked={todo.isDone}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>

            {todoEditing === todo.id ? (
              <button onClick={() => editTodo(todo.id)}>Submit Edit</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>
            )}
          </div>
        ))}
      <div>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          maxLength={256}
        />
        <button type="submit" onClick={addTodo}>
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default ToDos;
