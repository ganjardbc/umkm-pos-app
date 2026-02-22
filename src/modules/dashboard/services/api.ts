import api from "@/plugins/axios.ts";

export const getDashboardTotalAnggaran = (data: any, options: any = {}) => {
  return api.get("/api/dashboard/total-anggaran", { params: data, ...(options || {}) });
};

export const getDashboardTotalAnggaranPerTipe = (data: any, options: any = {}) => {
  return api.get("/api/dashboard/total-anggaran-per-tipe-anggaran", { params: data, ...(options || {}) });
};

export const getDashboardTotalAnggaranPerBagian = (data: any, options: any = {}) => {
  return api.get("/api/dashboard/total-anggaran-per-bagian", { params: data, ...(options || {}) });
};
