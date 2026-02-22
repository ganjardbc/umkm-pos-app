import api from '@/plugins/axios.ts';

export const getListstock = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/stock',
    { params: data, ...(options || {}) },
  );
};

export const getDetailstock = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/stock/${id}`,
    { ...(options || {}) },
  );
};

export const poststock = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/stock`,
    data,
    { ...(options || {}) },
  );
};

export const putstock = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/stock/${id}`,
    data,
    { ...(options || {}) },
  );
};
