import { Todo, SubTodo, TodoStatus } from '../../domain/entities/Todo';
import { TodoRepository, CreateTodoInput, UpdateTodoInput } from '../../domain/repositories/TodoRepository';
import { LocalTodoDataSource } from '../datasources/LocalTodoDataSource';
import { TodoModel } from '../models/TodoModel';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private dataSource: LocalTodoDataSource) {}

  async getAll(): Promise<Todo[]> {
    const models = this.dataSource.getAll();
    return models.map(this.mapToEntity);
  }

  async getById(id: string): Promise<Todo | null> {
    const model = this.dataSource.getById(id);
    return model ? this.mapToEntity(model) : null;
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const now = new Date();
    const id = crypto.randomUUID();
    
    const model: TodoModel = {
      id,
      title: input.title,
      description: input.description,
      status: input.status,
      category: input.category,
      subTodos: input.subTodos.map(st => ({
        id: crypto.randomUUID(),
        title: st.title,
        description: st.description,
        completed: st.completed,
      })),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this.dataSource.save(model);
    return this.mapToEntity(model);
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const existing = this.dataSource.getById(id);
    if (!existing) throw new Error('Todo not found');

    const updated: TodoModel = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };

    this.dataSource.save(updated);
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    this.dataSource.delete(id);
  }

  async getByStatus(status: TodoStatus): Promise<Todo[]> {
    const models = this.dataSource.getByStatus(status);
    return models.map(this.mapToEntity);
  }

  private mapToEntity(model: TodoModel): Todo {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      status: model.status,
      category: model.category,
      subTodos: model.subTodos as SubTodo[],
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    };
  }
}
