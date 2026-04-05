# Repository Interfaces

Abstract interfaces that define contracts for data operations.

These interfaces define what operations are possible without knowing how they're implemented. Implementation is deferred to the data layer.

## Example

```typescript
// src/domain/repositories/TodoRepository.ts
import { Todo } from '../entities/Todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(todo: Omit<Todo, 'id'>): Promise<Todo>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<void>;
}
```
