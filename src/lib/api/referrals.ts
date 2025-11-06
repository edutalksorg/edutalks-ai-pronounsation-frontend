import axiosClient from "./axiosClient";

export const ReferralsAPI = {
  getMyCode: async () => {
    const { data } = await axiosClient.get("/referrals/my-code");
    return data;
  },

  getStats: async () => {
    const { data } = await axiosClient.get("/referrals/stats");
    return data;
  },

  getHistory: async () => {
    const { data } = await axiosClient.get("/referrals/history");
    return data;
  },

  validateCode: async (code: string) => {
    const { data } = await axiosClient.get(`/referrals/validate/${code}`);
    return data;
  },
};

export default ReferralsAPI;
