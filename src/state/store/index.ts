import {atom, createStore} from 'jotai';
export const Tasks = atom<ITask[]>([]);
export const store = createStore();
export const addTask = atom(
  () => '',
  (get, set, {newItem}: {newItem: ITask}) => {
    const currentTasks = get(Tasks);
    set(Tasks, [newItem, ...currentTasks]);
  },
);
export const removeTask = atom(
  () => '',
  (get, set, {id}: {id: string}) => {
    const currentTasks = get(Tasks);
    const newTasks = currentTasks?.filter(item => item.id !== id);
    set(Tasks, newTasks);
  },
);
export const updateTaskStatus = atom(
  () => '',
  (get, set, {task}: {task: ITask}) => {
    const currentTasks = get(Tasks);
    const updatedTasks = currentTasks.map(item =>
      item.id === task.id
        ? {...task, status: task.status === 'Todo' ? 'Done' : 'Todo'}
        : item,
    ) as ITask[];
    set(Tasks, [...updatedTasks]);
  },
);
export const updateTask = atom(
  () => '',
  (get, set, {task}: {task: ITask}) => {
    const currentTasks = get(Tasks);
    const updatedTasks = currentTasks.map(item =>
      item.id === task.id ? {...task} : item,
    ) as ITask[];
    set(Tasks, [...updatedTasks]);
  },
);

export const addTasks = atom(
  null,
  (get, set, { newTasks }: { newTasks: ITask[] }) => {
    set(Tasks, (currentTasks) => [...currentTasks, ...newTasks]);
  }
);
