import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskState {
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  addTask: (task: any) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    }),
    {
      name: 'task-storage', // name of the item in local storage
    }
  )
);