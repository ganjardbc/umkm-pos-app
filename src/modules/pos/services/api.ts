import api from '@/plugins/axios.ts';

export const getListpos = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/pos',
    { params: data, ...(options || {}) },
  );
};

export const getDetailpos = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/pos/${id}`,
    { ...(options || {}) },
  );
};

export const postpos = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/pos`,
    data,
    { ...(options || {}) },
  );
};

export const putpos = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/pos/${id}`,
    data,
    { ...(options || {}) },
  );
};
