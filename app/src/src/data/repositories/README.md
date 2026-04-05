# Repository Implementations

Concrete implementations of the repository interfaces defined in the domain layer.

These classes implement the data access logic and bridge domain and data sources.

## Example

```typescript
// src/data/repositories/TodoRepositoryImpl.ts
import { Todo } from '../../domain/entities/Todo';
import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { TodoApi } from '../datasources/TodoApi';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private api: TodoApi) {}

  async getAll(): Promise<Todo[]> {
    const models = await this.api.fetchTodos();
    return models.map(this.mapToEntity);
  }

  private mapToEntity(model: any): Todo {
    return {
      id: model._id,
      title: model.title,
      completed: model.is_completed,
      createdAt: new Date(model.created_at),
    };
  }
  // ... other methods
}
```
