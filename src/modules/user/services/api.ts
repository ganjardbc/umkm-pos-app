import api from '@/plugins/axios.ts';

export const getListuser = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/user',
    { params: data, ...(options || {}) },
  );
};

export const getDetailuser = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/user/${id}`,
    { ...(options || {}) },
  );
};

export const postuser = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/user`,
    data,
    { ...(options || {}) },
  );
};

export const putuser = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/user/${id}`,
    data,
    { ...(options || {}) },
  );
};
