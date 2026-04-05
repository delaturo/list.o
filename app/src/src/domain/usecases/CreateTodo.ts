import { Todo, SubTodo } from '../entities/Todo';
import { TodoRepository } from '../repositories/TodoRepository';

export interface CreateTodoInput {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'complete';
  category: string;
  subTodos: SubTodo[];
}

export class CreateTodo {
  constructor(private repository: TodoRepository) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    return this.repository.create(input);
  }
}
