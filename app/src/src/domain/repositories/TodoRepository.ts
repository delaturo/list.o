import { Todo, TodoStatus, SubTodo } from '../entities/Todo';

export interface CreateTodoInput {
  title: string;
  description: string;
  status: TodoStatus;
  category: string;
  subTodos: SubTodo[];
}

export interface UpdateTodoInput extends Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(todo: CreateTodoInput): Promise<Todo>;
  update(id: string, data: UpdateTodoInput): Promise<Todo>;
  delete(id: string): Promise<void>;
  getByStatus(status: TodoStatus): Promise<Todo[]>;
}
