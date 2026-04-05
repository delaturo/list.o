# Data Models

Data transfer objects (DTOs) and schemas that represent how data is stored or transmitted.

These models may differ from domain entities to accommodate storage/network requirements.

## Example

```typescript
// src/data/models/TodoModel.ts
export interface TodoModel {
  _id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
}
```
