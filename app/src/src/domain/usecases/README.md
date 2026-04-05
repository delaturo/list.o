# Use Cases

Application-specific business rules. Each use case represents a single action or business operation.

Use cases should be independent of frameworks, UI, and data sources. They orchestrate entities and repositories.

## Example

```typescript
// src/domain/usecases/GetAllTodos.ts
import { Todo } from '../entities/Todo';
import { TodoRepository } from '../repositories/TodoRepository';

export class GetAllTodos {
  constructor(private repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.repository.getAll();
  }
}
```
