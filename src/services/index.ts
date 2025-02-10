import { http } from './http';

//----------------------------------

export const google = async (payload :{ token: string }) => {
  const { data } = await http.post(`/api/auth/google`, payload);
  return data;
};