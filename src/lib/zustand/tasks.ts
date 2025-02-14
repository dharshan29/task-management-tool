import { create } from "zustand";
import { persist } from "zustand/middleware";
interface TaskState {
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  addTask: (task: any) => void;
  updateTask: (task: any) => void;
  deleteTasks: (taskIds: any) => void;
  taskStatusUpdate: (ids: any[], status: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTasks: (taskIds) => set((state) => ({
        tasks: state.tasks.filter(task => !taskIds.includes(task._id))
      })),
      updateTask: (task) => set((state) => ({
        tasks: state.tasks.map(t => t._id === task._id ? task : t)
      })),
      taskStatusUpdate: (ids, status) => set((state) => ({
        tasks: state.tasks.map(t => ids.includes(t._id) ? { ...t, status } : t)
      }))
    }),
    {
      name: 'task-storage', // name of the item in local storage
    }
  )
);