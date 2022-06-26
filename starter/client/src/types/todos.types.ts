export interface Todos {
  todos: Todo[];
}

interface Todo {
  _id: string;
  title: string;
  status: 'completed' | 'uncompleted';
  createdAt: string;
  upatedAt: string;
  __v: number;
}

export interface getTodoResult {
  result: Todo;
}

export interface TodoBody {
  title: string;
  status: 'completed' | 'uncompleted';
}