import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, TodoStatus, SubTodo } from '../../domain/entities/Todo';
import { TodoRepository, CreateTodoInput, UpdateTodoInput } from '../../domain/repositories/TodoRepository';
import { TodoRepositoryImpl } from '../../data/repositories/TodoRepositoryImpl';
import { LocalTodoDataSource } from '../../data/datasources/LocalTodoDataSource';

const seedTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the Q2 project proposal',
    status: 'in_progress',
    category: 'Work',
    subTodos: [
      { id: '1a', title: 'Research topics', description: 'Find relevant industry trends', completed: true },
      { id: '1b', title: 'Outline sections', description: 'Create document structure', completed: true },
      { id: '1c', title: 'Write final draft', description: 'Complete the full proposal', completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Grocery shopping',
    description: 'Buy weekly groceries',
    status: 'pending',
    category: 'Personal',
    subTodos: [
      { id: '2a', title: 'Make list', description: 'Write down items needed', completed: true },
      { id: '2b', title: 'Go to store', description: 'Visit the supermarket', completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Fix bug in login',
    description: 'Resolve authentication issue reported by users',
    status: 'complete',
    category: 'Development',
    subTodos: [
      { id: '3a', title: 'Reproduce bug', description: 'Test login flow', completed: true },
      { id: '3b', title: 'Find root cause', description: 'Debug the issue', completed: true },
      { id: '3c', title: 'Implement fix', description: 'Write the solution', completed: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Plan vacation',
    description: 'Plan summer vacation itinerary',
    status: 'pending',
    category: 'Personal',
    subTodos: [
      { id: '4a', title: 'Research destinations', description: 'Look up potential places', completed: false },
      { id: '4b', title: 'Book flights', description: 'Find and reserve flights', completed: false },
      { id: '4c', title: 'Reserve hotel', description: 'Find accommodation', completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Review pull requests',
    description: 'Review pending PRs from team',
    status: 'in_progress',
    category: 'Development',
    subTodos: [
      { id: '5a', title: 'Check PR #123', description: 'Review backend changes', completed: true },
      { id: '5b', title: 'Check PR #124', description: 'Review UI changes', completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  createTodo: (input: CreateTodoInput) => Promise<void>;
  updateTodo: (id: string, input: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  getTodosByStatus: (status: TodoStatus) => Todo[];
}

const TodoContext = createContext<TodoContextType | null>(null);

const dataSource = new LocalTodoDataSource();
const repository = new TodoRepositoryImpl(dataSource);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(seedTodos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    const data = await repository.getAll();
    if (data.length > 0) {
      setTodos(data);
    }
    setLoading(false);
  };

  const createTodo = async (input: CreateTodoInput) => {
    const newTodo = await repository.create(input);
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = async (id: string, input: UpdateTodoInput) => {
    const updated = await repository.update(id, input);
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id: string) => {
    await repository.delete(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const getTodosByStatus = (status: TodoStatus): Todo[] => {
    return todos.filter(t => t.status === status);
  };

  return (
    <TodoContext.Provider value={{ todos, loading, createTodo, updateTodo, deleteTodo, getTodosByStatus }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodoProvider');
  return context;
};
