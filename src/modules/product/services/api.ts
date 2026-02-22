import api from '@/plugins/axios.ts';

export const getListproduct = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/product',
    { params: data, ...(options || {}) },
  );
};

export const getDetailproduct = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/product/${id}`,
    { ...(options || {}) },
  );
};

export const postproduct = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/product`,
    data,
    { ...(options || {}) },
  );
};

export const putproduct = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/product/${id}`,
    data,
    { ...(options || {}) },
  );
};
