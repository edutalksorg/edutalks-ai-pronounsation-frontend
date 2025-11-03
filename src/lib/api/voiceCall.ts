import axiosInstance from "../axiosConfig";

export const getAvailableUsers = () => axiosInstance.get("/calls/available-users");
export const searchUsers = (params: any) => axiosInstance.get("/calls/search-users", { params });
export const updateAvailability = (data: any) => axiosInstance.put("/calls/availability", data);
export const initiateCall = (data: any) => axiosInstance.post("/calls/initiate", data);
export const respondToCall = (callId: string, data: any) => axiosInstance.post(`/calls/${callId}/respond`, data);
export const endCall = (callId: string) => axiosInstance.post(`/calls/${callId}/end`);
export const rateCall = (callId: string, data: any) => axiosInstance.post(`/calls/${callId}/rate`, data);
export const getCallHistory = (params?: any) => axiosInstance.get("/calls/history", { params });
export const getWebRTCConfig = () => axiosInstance.get("/calls/webrtc-config");
