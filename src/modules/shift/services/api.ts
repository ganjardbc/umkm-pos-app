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

export const getUserShift = async (userId: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/shifts/user/${userId}`,
    { ...(options || {}) },
  );
};

export const getOutletShift = async (outletId: string | number, options: any = {}) => {
  return await api.get(
    `/api/v1/shifts/outlet/${outletId}`,
    { ...(options || {}) },
  );
};

export const openShift = async (data: any, options: any = {}) => {
  return await api.post(
    `/api/v1/shifts`,
    data,
    { ...(options || {}) },
  );
};

export const closeShift = async (id: string | number, options: any = {}) => {
  return await api.patch(
    `/api/v1/shifts/${id}/close`,
    { ...(options || {}) },
  );
};
