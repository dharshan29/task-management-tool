import { http } from './http';

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

// export const google = async (payload :{ token: string }) => {
//   const { data } = await http.post(`/api/auth/google`, payload);
//   return data;
// };