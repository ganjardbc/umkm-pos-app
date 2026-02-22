import api from '@/plugins/axios.ts';

export const getListprofile = async (data: any, options:any = {}) => {
  return await api.get(
    '/api/profile',
    { params: data, ...(options || {}) },
  );
};

export const getDetailprofile = async (id: string|number, options:any = {}) => {
  return await api.get(
    `/api/profile/${id}`,
    { ...(options || {}) },
  );
};

export const postprofile = async (data: any, options:any = {}) => {
  return await api.post(
    `/api/profile`,
    data,
    { ...(options || {}) },
  );
};

export const putprofile = async (id: string|number, data: any, options:any = {}) => {
  return await api.put(
    `/api/profile/${id}`,
    data,
    { ...(options || {}) },
  );
};
