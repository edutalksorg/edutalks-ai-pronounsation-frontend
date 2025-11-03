import axiosInstance from "../axiosConfig";

export const processPayment = (data: any) => axiosInstance.post("/payments/process", data);
export const getPaymentStatus = (transactionId: string) => axiosInstance.get(`/payments/${transactionId}/status`);
export const getPaymentHistory = () => axiosInstance.get("/payments/history");
export const requestRefund = (transactionId: string) => axiosInstance.post(`/payments/${transactionId}/refund`);
export const phonePeCallback = (data: any) => axiosInstance.post("/payments/phonepe/callback", data);
export const phonePeRedirect = (data: any) => axiosInstance.post("/payments/phonepe/redirect", data);
