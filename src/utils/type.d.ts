declare interface ITask {
  id: string;
  title?: string;
  priority: 'High' | 'Medium';
  status: 'Todo' | 'Done';
}
