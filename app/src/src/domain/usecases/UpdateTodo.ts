import { Todo, SubTodo } from '../entities/Todo';
import { TodoRepository } from '../repositories/TodoRepository';

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'complete';
  category?: string;
  subTodos?: SubTodo[];
}

export class UpdateTodo {
  constructor(private repository: TodoRepository) {}

  async execute(id: string, input: UpdateTodoInput): Promise<Todo> {
    return this.repository.update(id, input);
  }
}
