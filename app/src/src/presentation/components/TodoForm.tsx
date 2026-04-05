import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonBadge, IonIcon, IonCheckbox } from '@ionic/react';
import { SubTodo } from '../../domain/entities/Todo';
import { CreateTodoInput, UpdateTodoInput } from '../../domain/repositories/TodoRepository';
import { generateId } from '../../infrastructure/utils/helpers';

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateTodoInput | UpdateTodoInput) => void;
  initialData?: {
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'complete';
    category: string;
    subTodos: SubTodo[];
  };
}

export const TodoForm: React.FC<TodoFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'complete'>(initialData?.status || 'pending');
  const [category, setCategory] = useState(initialData?.category || '');
  const [subTodos, setSubTodos] = useState<SubTodo[]>(initialData?.subTodos || []);

  const [newSubTodoTitle, setNewSubTodoTitle] = useState('');
  const [newSubTodoDesc, setNewSubTodoDesc] = useState('');

  const addSubTodo = () => {
    if (newSubTodoTitle.trim()) {
      setSubTodos([...subTodos, {
        id: generateId(),
        title: newSubTodoTitle,
        description: newSubTodoDesc,
        completed: false,
      }]);
      setNewSubTodoTitle('');
      setNewSubTodoDesc('');
    }
  };

  const removeSubTodo = (id: string) => {
    setSubTodos(subTodos.filter(st => st.id !== id));
  };

  const toggleSubTodo = (id: string) => {
    setSubTodos(subTodos.map(st => st.id === id ? { ...st, completed: !st.completed } : st));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description, status, category, subTodos });
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{initialData ? 'Edit Todo' : 'New Todo'}</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>Cancel</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} placeholder="Enter title" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} placeholder="Enter description" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Status</IonLabel>
            <IonSelect value={status} onIonChange={e => setStatus(e.detail.value!)}>
              <IonSelectOption value="pending">Pending</IonSelectOption>
              <IonSelectOption value="in_progress">In Progress</IonSelectOption>
              <IonSelectOption value="complete">Complete</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Category</IonLabel>
            <IonInput value={category} onIonChange={e => setCategory(e.detail.value!)} placeholder="Enter category" />
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <h3>Sub-todos</h3>
          {subTodos.map(st => (
            <IonItem key={st.id}>
              <IonCheckbox slot="start" checked={st.completed} onIonChange={() => toggleSubTodo(st.id)} />
              <IonLabel>
                <h4>{st.title}</h4>
                <p>{st.description}</p>
              </IonLabel>
              <IonButton slot="end" fill="clear" color="danger" onClick={() => removeSubTodo(st.id)}>Remove</IonButton>
            </IonItem>
          ))}
          <IonItem>
            <IonLabel position="stacked">Add Sub-todo</IonLabel>
            <IonInput value={newSubTodoTitle} onIonChange={e => setNewSubTodoTitle(e.detail.value!)} placeholder="Title" />
            <IonInput value={newSubTodoDesc} onIonChange={e => setNewSubTodoDesc(e.detail.value!)} placeholder="Description" />
            <IonButton onClick={addSubTodo}>Add</IonButton>
          </IonItem>
        </div>

        <IonButton expand="block" onClick={handleSubmit} disabled={!title.trim()}>
          {initialData ? 'Update' : 'Create'}
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
