import axiosClient from "./axiosClient";

export const getAllTransactions = (params?: any) =>
  axiosClient.get("/admin/payments/transactions", { params });

export const getPendingWithdrawals = () =>
  axiosClient.get("/admin/payments/withdrawals/pending");

export const approveWithdrawal = (withdrawalId: string) =>
  axiosClient.post(`/admin/payments/withdrawals/${withdrawalId}/approve`);

export const rejectWithdrawal = (withdrawalId: string) =>
  axiosClient.post(`/admin/payments/withdrawals/${withdrawalId}/reject`);

export const completeWithdrawal = (withdrawalId: string) =>
  axiosClient.post(`/admin/payments/withdrawals/${withdrawalId}/complete`);

export const getPendingRefunds = () =>
  axiosClient.get("/admin/payments/refunds/pending");

export const approveRefund = (refundId: string) =>
  axiosClient.post(`/admin/payments/refunds/${refundId}/approve`);

export const rejectRefund = (refundId: string) =>
  axiosClient.post(`/admin/payments/refunds/${refundId}/reject`);
