export type TodoStatus = 'pending' | 'in_progress' | 'complete';

export interface SubTodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  category: string;
  subTodos: SubTodo[];
  createdAt: Date;
  updatedAt: Date;
}
