# Domain Layer

This is the innermost layer of Clean Architecture. It contains:
- **Entities**: Core business objects that represent the fundamental data model
- **Repositories**: Interface definitions (abstractions) for data operations
- **Usecases**: Application business rules and logic

This layer should have no dependencies on external frameworks or tools.

## Example Structure

```
domain/
├── entities/
│   └── Todo.ts
├── repositories/
│   └── TodoRepository.ts
└── usecases/
    ├── GetAllTodos.ts
    ├── CreateTodo.ts
    └── ToggleTodo.ts
```
