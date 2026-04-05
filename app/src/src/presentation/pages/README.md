# Pages

Top-level screen components that compose the application views.

Pages typically:
- Import use cases from domain layer
- Manage page-specific state
- Render child components
- Handle routing logic

## Example

```typescript
// src/presentation/pages/TodoPage.tsx
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';

export const TodoPage: React.FC = () => {
  const { todos, loading, createTodo } = useTodos();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? <IonLoading /> : todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </IonContent>
    </IonPage>
  );
};
```
