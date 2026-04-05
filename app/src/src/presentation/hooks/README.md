# Hooks

Custom React hooks that encapsulate stateful logic.

Hooks bridge the presentation layer with domain use cases and handle:
- State management
- Data fetching
- Side effects
- UI interactions

## Example

```typescript
// src/presentation/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import { GetAllTodos } from '../../domain/usecases/GetAllTodos';
import { TodoRepository } from '../../domain/repositories/TodoRepository';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTodos = new GetAllTodos(/* repository */);
    getAllTodos.execute()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return { todos, loading };
};
```
