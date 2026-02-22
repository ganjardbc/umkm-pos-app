import api from '@/plugins/axios.ts';

export const getListpermission = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/permission',
    { params: data, ...(options || {}) },
  );
};

export const getDetailpermission = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/permission/${id}`,
    { ...(options || {}) },
  );
};

export const postpermission = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/permission`,
    data,
    { ...(options || {}) },
  );
};

export const putpermission = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/permission/${id}`,
    data,
    { ...(options || {}) },
  );
};
