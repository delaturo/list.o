# Presentation Layer

The outermost layer that interacts with users. Contains:
- **Pages**: Screen-level components
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for stateful logic
- **Context**: React context providers for global state

This layer depends on domain and data layers but shouldn't contain business logic.

## Example Structure

```
presentation/
├── pages/
│   ├── HomePage.tsx
│   └── TodoPage.tsx
├── components/
│   ├── TodoItem.tsx
│   └── TodoForm.tsx
├── hooks/
│   └── useTodos.ts
└── context/
    └── AuthContext.tsx
```
