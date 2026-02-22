import api from '@/plugins/axios.ts';

export const getListshift = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/shift',
    { params: data, ...(options || {}) },
  );
};

export const getDetailshift = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/shift/${id}`,
    { ...(options || {}) },
  );
};

export const postshift = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/shift`,
    data,
    { ...(options || {}) },
  );
};

export const putshift = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/shift/${id}`,
    data,
    { ...(options || {}) },
  );
};
