import { CONFIG } from 'global/Config';

export const ApiEndpoint = {
  getTodos: `${CONFIG.BASE_URL}/todos`,
  getTodo: (id: string) => `${CONFIG.BASE_URL}/todo/${id}`,
  addTodo: `${CONFIG.BASE_URL}/add-todo`,
  updateTodo: (id: string) => `${CONFIG.BASE_URL}/update-todo/${id}`,
  removeTodo: (id: string) => `${CONFIG.BASE_URL}/todo/${id}`,
}