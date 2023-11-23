import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoCardview from "./TodoCardview";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [renderedTodos, setRenderedTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mockTodos = [
        { id: uuidv4(), task: "Task 1", completed: false, isEditing: false },
        { id: uuidv4(), task: "Task 2", completed: false, isEditing: false },
      ];

      for (let i = 0; i < mockTodos.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
      <button type="button" className="todo-btn">ADD TASK</button>
      <TodoCardview todos={renderedTodos} />
    </div>
  );
};
