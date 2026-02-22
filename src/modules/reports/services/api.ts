import api from '@/plugins/axios.ts';

export const getListreports = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/reports',
    { params: data, ...(options || {}) },
  );
};

export const getDetailreports = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/reports/${id}`,
    { ...(options || {}) },
  );
};

export const postreports = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/reports`,
    data,
    { ...(options || {}) },
  );
};

export const putreports = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/reports/${id}`,
    data,
    { ...(options || {}) },
  );
};
