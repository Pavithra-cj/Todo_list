import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [renderedTodos, setRenderedTodos] = useState([]);

  useEffect(() => {
    // Simulate fetching todos from an API
    const fetchData = async () => {
      // Mock API call or fetch from your service
      const mockTodos = [
        { id: uuidv4(), task: "Task 1", completed: false, isEditing: false },
        { id: uuidv4(), task: "Task 2", completed: false, isEditing: false },
        // Add more mock todos as needed
      ];

      // Introduce a delay between rendering each todo
      for (let i = 0; i < mockTodos.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay as needed
        setRenderedTodos((prevRenderedTodos) => [...prevRenderedTodos, mockTodos[i]]);
      }
    };

    fetchData();
  }, []);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* Display rendered todos */}
      {renderedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
