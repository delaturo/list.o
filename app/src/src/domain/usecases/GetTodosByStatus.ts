import { Todo, TodoStatus } from '../entities/Todo';
import { TodoRepository } from '../repositories/TodoRepository';

export class GetTodosByStatus {
  constructor(private repository: TodoRepository) {}

  async execute(status: TodoStatus): Promise<Todo[]> {
    return this.repository.getByStatus(status);
  }
}
