declare interface ITask {
  id: string;
  taskName: string;
  priority: 'High' | 'Medium';
  status: 'Todo' | 'Done';
  createdAt?: number;
  description?: string;
  updatedAt?: number;
}
