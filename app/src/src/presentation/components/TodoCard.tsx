import { IonItem, IonLabel, IonBadge, IonList, IonCheckbox, IonButton } from '@ionic/react';
import { Todo } from '../../domain/entities/Todo';

interface TodoCardProps {
  todo: Todo;
  onClick: () => void;
  onDelete: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onClick, onDelete }) => {
  const statusColors: Record<string, 'warning' | 'primary' | 'success'> = {
    pending: 'warning',
    in_progress: 'primary',
    complete: 'success',
  };

  const completedSubTodos = todo.subTodos.filter(st => st.completed).length;

  return (
    <IonItem button onClick={onClick}>
      <IonLabel>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <IonBadge color="medium">{todo.category}</IonBadge>
          <IonBadge color={statusColors[todo.status]}>{todo.status.replace('_', ' ')}</IonBadge>
          <IonBadge color="secondary">{completedSubTodos}/{todo.subTodos.length} subtasks</IonBadge>
        </div>
      </IonLabel>
      <IonButton slot="end" fill="clear" color="danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        Delete
      </IonButton>
    </IonItem>
  );
};
