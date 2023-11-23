import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import TodoService from '../Services/TodoService'
import {
  Card,
  H2,
  P,
  IconsWrapper,
  ToggleSwitchLabel,
  ToggleSwitchSlider,
  EditIcon,
  DeleteIcon
} from './TodoCardStyle';

const TodoCardview = () => {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await TodoService.getTodos();
        setTodos(todosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const editTodo = (id) => {
    // Should add logic
    console.log(`Editing todo with id ${id}`);
  };

  const deleteTodo = (id) => {
    // Should add logic
    console.log(`Deleting todo with id ${id}`);
  };

  const handleToggle = (id, isActive) => {
    // Should add logic
    console.log(`Toggling todo with id ${id}. New active status: ${!isActive}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <Card key={todo.id}>
              <H2>{todo.title}</H2>
              <P>{todo.description}</P>
              <P>Tag: {todo.tag}</P>
              <P>Created At: {new Date(todo.createdAt).toLocaleString()}</P>
              <IconsWrapper>
                <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => editTodo(todo.id)} />
                <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                <ToggleSwitchLabel>
                  <input
                    type="checkbox"
                    checked={todo.isActive}
                    onChange={() => handleToggle(todo.id, todo.isActive)}
                  />
                  <ToggleSwitchSlider />
                </ToggleSwitchLabel>
              </IconsWrapper>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoCardview