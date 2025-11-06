import axiosClient from "./axiosClient";

export const CouponsAPI = {
  create: async (payload: any) => {
    const { data } = await axiosClient.post("/coupons", payload);
    return data;
  },

  getAll: async () => {
    const { data } = await axiosClient.get("/coupons");
    return data;
  },

  getByCode: async (code: string) => {
    const { data } = await axiosClient.get(`/coupons/${code}`);
    return data;
  },

  validate: async (payload: any) => {
    const { data } = await axiosClient.post("/coupons/validate", payload);
    return data;
  },

  apply: async (payload: any) => {
    const { data } = await axiosClient.post("/coupons/apply", payload);
    return data;
  },

  update: async (id: string, payload: any) => {
    const { data } = await axiosClient.put(`/coupons/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axiosClient.delete(`/coupons/${id}`);
    return data;
  },
};

export default CouponsAPI;
