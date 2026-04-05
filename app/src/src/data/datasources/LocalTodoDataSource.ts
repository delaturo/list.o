import { TodoModel } from '../models/TodoModel';

const STORAGE_KEY = 'todos';

const seedData: TodoModel[] = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class LocalTodoDataSource {
  getAll(): TodoModel[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(data);
  }

  getById(id: string): TodoModel | null {
    const todos = this.getAll();
    return todos.find(t => t.id === id) || null;
  }

  save(todo: TodoModel): TodoModel {
    const todos = this.getAll();
    const existingIndex = todos.findIndex(t => t.id === todo.id);
    
    if (existingIndex >= 0) {
      todos[existingIndex] = todo;
    } else {
      todos.push(todo);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return todo;
  }

  delete(id: string): void {
    const todos = this.getAll().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  getByStatus(status: string): TodoModel[] {
    return this.getAll().filter(t => t.status === status);
  }
}
