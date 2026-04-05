# Components

Reusable UI components that render the interface.

Components should be presentational (dumb) or connected to state via hooks/context. They shouldn't contain business logic.

## Example

```typescript
// src/presentation/components/TodoItem.tsx
import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import { Todo } from '../../domain/entities/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={todo.completed}
        onIonChange={() => onToggle(todo.id)}
      />
      <IonLabel>{todo.title}</IonLabel>
    </IonItem>
  );
};
```
