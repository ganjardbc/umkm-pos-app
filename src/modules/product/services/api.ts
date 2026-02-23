import api from '@/plugins/axios.ts';

export const getListProduct = async (data: any, options: any = {}) => {
  return await api.get(
    '/api/v1/products',
    { params: data, ...(options || {}) },
  );
};

export const getDetailProduct = async (id: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/products/${id}`,
    { ...(options || {}) },
  );
};

export const postProduct = async (data: any, options: any = {}) => {
  return await api.post(
    `/api/v1/products`,
    data,
    { ...(options || {}) },
  );
};

export const putProduct = async (id: string | number, data: any, options: any = {}) => {
  return await api.put(
    `/api/v1/products/${id}`,
    data,
    { ...(options || {}) },
  );
};
