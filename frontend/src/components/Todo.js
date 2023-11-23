import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import TodoService from '../Services/TodoService';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const [todos, setTodos] = useState([]);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(0);
  const [renderedTodos, setRenderedTodos] = useState([]);

  useEffect(() => {
    // Fetch todos when the component mounts
    console.log('started...........');
    TodoService.getTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  useEffect(() => {
    // Set the initial current todo
    setRenderedTodos([todos[currentTodoIndex]]);
  }, [todos, currentTodoIndex]);

  const handleNextTodo = () => {
    // Show the next todo
    const nextIndex = (currentTodoIndex + 1) % todos.length;
    setCurrentTodoIndex(nextIndex);
    setRenderedTodos([todos[nextIndex]]);
  };

  return (
    <div className='Todo'>
      {renderedTodos.map((todo) => (
        <div key={todo.id} className={`todo-card ${todo && todo.isActive ? 'completed' : 'incompleted'}`}>
          {todo && (
            <>
              <h3>
                <span className='tag'>{todo.tag}</span>
                <strong>{todo.title}</strong>
              </h3>
              <p className='description'>{todo.description}</p>
              <div className='footer'>
                <div className='createdAt'>{new Date(todo.createdAt).toLocaleString()}</div>
                <label className='switch'>
                  <input type='checkbox' checked={todo.isActive} onChange={() => toggleComplete(todo.id)} />
                  <span className='slider'></span>
                </label>
                <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => editTodo(todo.id)} />
                <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => deleteTodo(todo.id)} />
              </div>
              <button onClick={handleNextTodo}>Next Todo</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
