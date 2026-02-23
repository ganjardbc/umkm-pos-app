import api from '@/plugins/axios.ts';

export const getListShift = async (data: any, options: any = {}) => {
  return await api.get(
    '/api/v1/shifts',
    { params: data, ...(options || {}) },
  );
};

export const getDetailShift = async (id: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/shifts/${id}`,
    { ...(options || {}) },
  );
};

export const postShift = async (data: any, options: any = {}) => {
  return await api.post(
    `/api/v1/shifts`,
    data,
    { ...(options || {}) },
  );
};

export const putShift = async (id: string | number, data: any, options: any = {}) => {
  return await api.put(
    `/api/v1/shifts/${id}`,
    data,
    { ...(options || {}) },
  );
};
