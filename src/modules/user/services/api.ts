import api from '@/plugins/axios.ts';

export const getListUser = async (data: any, options: any = {}) => {
  return await api.get(
    '/api/v1/users',
    { params: data, ...(options || {}) },
  );
};

export const getDetailUser = async (id: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/users/${id}`,
    { ...(options || {}) },
  );
};

export const postUser = async (data: any, options: any = {}) => {
  return await api.post(
    `/api/v1/users`,
    data,
    { ...(options || {}) },
  );
};

export const putUser = async (id: string | number, data: any, options: any = {}) => {
  return await api.put(
    `/api/v1/users/${id}`,
    data,
    { ...(options || {}) },
  );
};
