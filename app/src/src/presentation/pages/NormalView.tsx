import { useState } from 'react';
import { IonContent, IonPage, IonList, IonLoading, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { useTodos } from '../context/TodoContext';
import { TodoCard } from '../components/TodoCard';
import { TodoForm } from '../components/TodoForm';
import { AppHeader } from '../components/AppHeader';
import { CreateTodoInput, UpdateTodoInput } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

export const NormalView: React.FC = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [view, setView] = useState<'all' | 'pending' | 'in_progress'>('all');

  const filteredTodos = todos.filter(todo => {
    if (view === 'all') return todo.status !== 'complete';
    return todo.status === view;
  });

  const handleCreate = async (input: CreateTodoInput | UpdateTodoInput) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, input as UpdateTodoInput);
      setEditingTodo(undefined);
    } else {
      await createTodo(input as CreateTodoInput);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  return (
    <IonPage>
      <AppHeader title="To-dos" onAdd={() => setShowForm(true)} />
      <IonContent>
        <IonSegment value={view} onIonChange={e => setView(e.detail.value as any)}>
          <IonSegmentButton value="all">
            <IonLabel>Pending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pending">
            <IonLabel>To Do</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="in_progress">
            <IonLabel>In Progress</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonLoading isOpen={loading} message="Loading..." />
        
        <IonList>
          {filteredTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onClick={() => handleEdit(todo)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))}
        </IonList>

        <TodoForm
          isOpen={showForm}
          onClose={handleClose}
          onSubmit={handleCreate}
          initialData={editingTodo}
        />
      </IonContent>
    </IonPage>
  );
};

export default NormalView;
