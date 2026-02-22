import api from '@/plugins/axios.ts';

export const getListtransaction = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/transaction',
    { params: data, ...(options || {}) },
  );
};

export const getDetailtransaction = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/transaction/${id}`,
    { ...(options || {}) },
  );
};

export const posttransaction = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/transaction`,
    data,
    { ...(options || {}) },
  );
};

export const puttransaction = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/transaction/${id}`,
    data,
    { ...(options || {}) },
  );
};
