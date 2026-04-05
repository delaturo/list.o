export interface SubTodoModel {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoModel {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'complete';
  category: string;
  subTodos: SubTodoModel[];
  createdAt: string;
  updatedAt: string;
}
