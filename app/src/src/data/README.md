# Data Layer

Implements the interfaces defined in the domain layer. Contains:
- **Datasources**: Data sources (API, local storage, etc.)
- **Models**: Data transfer objects and schemas
- **Repositories**: Concrete implementations of domain repository interfaces

## Example Structure

```
data/
├── datasources/
│   └── TodoApi.ts
├── models/
│   └── TodoModel.ts
└── repositories/
    └── TodoRepositoryImpl.ts
```
