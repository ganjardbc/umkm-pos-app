import api from '@/plugins/axios.ts';

export const getListrole = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/role',
    { params: data, ...(options || {}) },
  );
};

export const getDetailrole = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/role/${id}`,
    { ...(options || {}) },
  );
};

export const postrole = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/role`,
    data,
    { ...(options || {}) },
  );
};

export const putrole = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/role/${id}`,
    data,
    { ...(options || {}) },
  );
};
