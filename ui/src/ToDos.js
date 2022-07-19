import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

import "./ToDos.css";

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

  const [addTodoDescription, setAddTodoDescription] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  const deleteTodo = useCallback(
    async (id) => {
      await fetch(`http://localhost:3001/toDoItems/${id}`, {
        method: "DELETE",
      });
      fetchTodosAndUpdate(loggedInUser, setToDoList);
    },
    [loggedInUser]
  );

  const toggleComplete = useCallback(
    async (id) => {
      const todoToToggle = toDoList.toDoItems.find((todo) => todo.id === id);

      await fetch(`http://localhost:3001/toDoItems/${id}`, {
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

  const editTodo = useCallback(
    async (id, newDescription) => {
      await fetch(`http://localhost:3001/toDoItems/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ description: newDescription }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setTodoEditing(null);
      setEditingText("");
      fetchTodosAndUpdate(loggedInUser, setToDoList);
    },
    [loggedInUser]
  );

  const addTodo = useCallback(
    async (listId, description) => {
      await fetch("http://localhost:3001/toDoItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          toDoListId: listId,
          description,
          isDone: false,
        }),
      });
      fetchTodosAndUpdate(loggedInUser, setToDoList);
      setAddTodoDescription("");
    },
    [loggedInUser]
  );

  return !toDoList ? (
    <>Loading your data</>
  ) : (
    <div className="Todos">
      <div className="title">{toDoList.title}</div>
      <div className="description">{toDoList.description}</div>
      <div>
        <input
          className="todosInput"
          type="text"
          onChange={(e) => setAddTodoDescription(e.target.value)}
          value={addTodoDescription}
          maxLength={256}
          placeholder="Type a todo"
        />
        <button
          type="submit"
          onClick={() => addTodo(toDoList.id, addTodoDescription)}
          className="btn btn-dark addBtn"
        >
          <strong> Add Todo</strong>
        </button>
      </div>
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
              <div className="todoDescription">{todo.description}</div>
            )}

            <input
              type="checkbox"
              onChange={() => toggleComplete(todo.id)}
              checked={todo.isDone}
              className="checkbox"
            />

            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-secondary deleteBtn"
            >
              Delete
            </button>

            {todoEditing === todo.id ? (
              <button
                onClick={() => editTodo(todo.id, editingText)}
                className="btn btn-secondary submiteditBtn"
              >
                Submit Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setTodoEditing(todo.id);
                  setEditingText(todo.description);
                }}
                className="btn btn-secondary editBtn"
              >
                Edit
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ToDos;
