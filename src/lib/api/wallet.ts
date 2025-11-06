import axiosClient from "./axiosClient";

export const WalletAPI = {
  getBalance: async () => {
    const { data } = await axiosClient.get("/wallet/balance");
    return data;
  },

  addFunds: async (payload: any) => {
    const { data } = await axiosClient.post("/wallet/add-funds", payload);
    return data;
  },

  getTransactions: async () => {
    const { data } = await axiosClient.get("/wallet/transactions");
    return data;
  },

  withdraw: async (payload: any) => {
    const { data } = await axiosClient.post("/wallet/withdraw", payload);
    return data;
  },
};

export default WalletAPI;
