import api from '@/plugins/axios.ts';

export const getListMerchants = async (data: any, options: any = {}) => {
  return await api.get(
    '/api/v1/merchants',
    { params: data, ...(options || {}) },
  );
};

export const getDetailMerchants = async (id: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/merchants/${id}`,
    { ...(options || {}) },
  );
};

export const postMerchants = async (data: any, options: any = {}) => {
  return await api.post(
    `/api/v1/merchants`,
    data,
    { ...(options || {}) },
  );
};

export const putMerchants = async (id: string | number, data: any, options: any = {}) => {
  return await api.put(
    `/api/v1/merchants/${id}`,
    data,
    { ...(options || {}) },
  );
};
