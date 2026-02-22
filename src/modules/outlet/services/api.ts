import api from '@/plugins/axios.ts';

export const getListoutlet = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/outlet',
    { params: data, ...(options || {}) },
  );
};

export const getDetailoutlet = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/outlet/${id}`,
    { ...(options || {}) },
  );
};

export const postoutlet = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/outlet`,
    data,
    { ...(options || {}) },
  );
};

export const putoutlet = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/outlet/${id}`,
    data,
    { ...(options || {}) },
  );
};
