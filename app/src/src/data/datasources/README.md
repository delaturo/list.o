# Data Sources

Sources of data for the application:
- **Remote**: API clients (HTTP requests)
- **Local**: LocalStorage, IndexedDB, etc.

Each datasource handles raw data retrieval and doesn't format data for the domain layer.

## Example

```typescript
// src/data/datasources/TodoApi.ts
export class TodoApi {
  private baseUrl = 'https://api.example.com';

  async fetchTodos(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/todos`);
    return response.json();
  }

  async postTodo(data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
```
