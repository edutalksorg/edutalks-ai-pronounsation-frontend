import axiosInstance from "../axiosConfig";

export const getWalletBalance = () => axiosInstance.get("/wallet/balance");
export const addFunds = (data: any) => axiosInstance.post("/wallet/add-funds", data);
export const getWalletTransactions = (params?: any) => axiosInstance.get("/wallet/transactions", { params });
export const requestWithdrawal = (data: any) => axiosInstance.post("/wallet/withdraw", data);
