import {atom, createStore} from 'jotai';
export const Tasks = atom<ITask[]>([]);
export const DeviceId = atom<string>('');
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
    const newTasks = currentTasks?.filter(item => item._id !== id);
    set(Tasks, newTasks);
  },
);
export const updateTaskStatus = atom(
  () => '',
  (get, set, {task}: {task: ITask}) => {
    const currentTasks = get(Tasks);
    const updatedTasks = currentTasks.map(item =>
      item._id === task._id ? {...task, status: !task.status} : item,
    ) as ITask[];
    set(Tasks, [...updatedTasks]);
  },
);
export const updateTask = atom(
  () => '',
  (get, set, {task}: {task: ITask}) => {
    const currentTasks = get(Tasks);
    const updatedTasks = currentTasks.map(item =>
      item._id === task._id ? {...task} : item,
    ) as ITask[];
    set(Tasks, [...updatedTasks]);
  },
);

export const addTasks = atom(
  null,
  (get, set, {newTasks}: {newTasks: ITask[]}) => {
    set(Tasks, currentTasks => [...currentTasks, ...newTasks]);
  },
);

export const updateDeviceId = atom(
  get => get(DeviceId),
  (get, set, deviceId: string) => {
    set(DeviceId, deviceId);
  },
);
