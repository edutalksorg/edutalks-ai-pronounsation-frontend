import axiosClient from "./axiosClient";

export const processPayment = (data: any) =>
  axiosClient.post("/payments/process", data);

export const getPaymentStatus = (transactionId: string) =>
  axiosClient.get(`/payments/${transactionId}/status`);

export const getPaymentHistory = () =>
  axiosClient.get("/payments/history");

export const requestRefund = (transactionId: string) =>
  axiosClient.post(`/payments/${transactionId}/refund`);

export const phonePeCallback = (data: any) =>
  axiosClient.post("/payments/phonepe/callback", data);

export const phonePeRedirect = (data: any) =>
  axiosClient.post("/payments/phonepe/redirect", data);
