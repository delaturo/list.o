import { useState } from 'react';
import { IonContent, IonPage, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonButton } from '@ionic/react';
import { useTodos } from '../context/TodoContext';
import { TodoForm } from '../components/TodoForm';
import { AppHeader } from '../components/AppHeader';
import { CreateTodoInput, UpdateTodoInput } from '../../domain/repositories/TodoRepository';
import { Todo, TodoStatus } from '../../domain/entities/Todo';

const KanbanColumn: React.FC<{
  title: string;
  status: TodoStatus;
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}> = ({ title, status, todos, onEdit, onDelete }) => {
  return (
    <IonCard style={{ flex: 1, margin: '8px', minWidth: '250px' }}>
      <IonCardHeader>
        <IonCardTitle>{title} ({todos.length})</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {todos.map(todo => (
          <IonCard key={todo.id} button onClick={() => onEdit(todo)} style={{ marginBottom: '8px' }}>
            <IonCardContent>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <IonBadge color="medium">{todo.category}</IonBadge>
              <span style={{ marginLeft: '8px' }}>
                {todo.subTodos.filter(st => st.completed).length}/{todo.subTodos.length} subtasks
              </span>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                size="small"
                onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
              >
                Delete
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonCardContent>
    </IonCard>
  );
};

export const KanbanView: React.FC = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  const pendingTodos = todos.filter(t => t.status === 'pending');
  const inProgressTodos = todos.filter(t => t.status === 'in_progress');
  const completeTodos = todos.filter(t => t.status === 'complete');

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
      <AppHeader title="Kanban Board" onAdd={() => setShowForm(true)} />
      <IonContent>
        <IonLoading isOpen={loading} message="Loading..." />
        
        <div style={{ display: 'flex', overflowX: 'auto', padding: '8px', height: '100%' }}>
          <KanbanColumn
            title="To Do"
            status="pending"
            todos={pendingTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <KanbanColumn
            title="In Progress"
            status="in_progress"
            todos={inProgressTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <KanbanColumn
            title="Done"
            status="complete"
            todos={completeTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

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

export default KanbanView;
