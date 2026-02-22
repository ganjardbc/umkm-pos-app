import api from '@/plugins/axios.ts';

export const postLogin = (data: any, options:any = {}) => {
  return api.post(
    '/api/v1/auth/login',
    data,
    { ...(options || {}) },
  );
}
