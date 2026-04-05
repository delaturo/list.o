# Entities

Core business objects that represent the fundamental data model of the application.

Examples:
- User
- Product
- Order
- Todo

These are pure TypeScript/TypeScript classes with no external dependencies.

## Example

```typescript
// src/domain/entities/Todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
```
