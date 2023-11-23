import axios from 'axios';

const API_BASE_URL = 'https://localhost:7011/api/v1';

class TodoService {
  static async createTodo(todo) {
    try {
      const response = await axios.post(`${API_BASE_URL}/Todos`, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  static async getTodos() {
    try {
      const response = await axios.get(`${API_BASE_URL}/Todos`);
      return response.data;
    } catch (error) {
      console.error('Error getting todos:', error);
      throw error;
    }
  }

  static async getTodoById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/Todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting todo with id ${id}:`, error);
      throw error;
    }
  }

  static async updateTodo(id, updatedTodo) {
    try {
      const response = await axios.put(`${API_BASE_URL}/Todos/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo with id ${id}:`, error);
      throw error;
    }
  }

  static async deleteTodo(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo with id ${id}:`, error);
      throw error;
    }
  }
}

export default TodoService;
