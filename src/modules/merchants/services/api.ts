import api from '@/plugins/axios.ts';

export const getListmerchants = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/merchants',
    { params: data, ...(options || {}) },
  );
};

export const getDetailmerchants = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/merchants/${id}`,
    { ...(options || {}) },
  );
};

export const postmerchants = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/merchants`,
    data,
    { ...(options || {}) },
  );
};

export const putmerchants = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/merchants/${id}`,
    data,
    { ...(options || {}) },
  );
};
