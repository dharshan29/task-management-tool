import { http } from './http';
import { TaskType } from './types';

//----------------------------------

export const google = async (payload :{ token: string }) => {
  const { data } = await http.post(`/api/auth/google`, payload);
  return data;
};

export const getTasks = async ({ search, category, dueOnStart, dueOnEnd, sort }: { search: string, category: string, dueOnStart?: string, dueOnEnd?: string, sort: string }) => {
  const params: Record<string, string> = {
    search,
    category,
    ...(dueOnStart && { dueOnStart }),
    ...(dueOnEnd && { dueOnEnd }),
    sort
  };
  const query = new URLSearchParams(params).toString();
  const { data } = await http.get(`/api/task/getTasks?${query}`);
  return data;
}

export const add_task = async (payload: TaskType) => {
  const { data } = await http.post(`/api/task/addTask`, payload);
  return data;
};

export const update_Task = async (payload: TaskType) => {
  const { data } = await http.post(`/api/task/updateTask`, payload);
  return data;
};

export const removeTasks = async (payload: any) => {
  const { data } = await http.post(`/api/task/deleteTasks`, payload);
  return data;
};

export const updateTaskStatus = async (payload: any) => {
  const { data } = await http.post(`/api/task/updateTaskStatus`, payload);
  return data;
};

export const getTaskActivities = async (taskId: string) => {
  const { data } = await http.get(`/api/tasks/${taskId}/activities`);
  return data;
};

