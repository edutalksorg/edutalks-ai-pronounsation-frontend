import axiosInstance from "../axiosConfig";

export const getAllTransactions = (params?: any) =>
  axiosInstance.get("/admin/payments/transactions", { params });

export const getPendingWithdrawals = () =>
  axiosInstance.get("/admin/payments/withdrawals/pending");

export const approveWithdrawal = (withdrawalId: string) =>
  axiosInstance.post(`/admin/payments/withdrawals/${withdrawalId}/approve`);

export const rejectWithdrawal = (withdrawalId: string) =>
  axiosInstance.post(`/admin/payments/withdrawals/${withdrawalId}/reject`);

export const completeWithdrawal = (withdrawalId: string) =>
  axiosInstance.post(`/admin/payments/withdrawals/${withdrawalId}/complete`);

export const getPendingRefunds = () =>
  axiosInstance.get("/admin/payments/refunds/pending");

export const approveRefund = (refundId: string) =>
  axiosInstance.post(`/admin/payments/refunds/${refundId}/approve`);

export const rejectRefund = (refundId: string) =>
  axiosInstance.post(`/admin/payments/refunds/${refundId}/reject`);

export const adjustWalletBalance = (data: any) =>
  axiosInstance.post("/admin/payments/wallets/adjust-balance", data);
