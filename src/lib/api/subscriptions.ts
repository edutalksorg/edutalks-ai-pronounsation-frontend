import axiosInstance from "../axiosConfig";

export const getPlans = () => axiosInstance.get("/Subscriptions/plans");
export const createPlan = (data: any) => axiosInstance.post("/Subscriptions/plans", data);
export const updatePlan = (planId: string, data: any) => axiosInstance.put(`/Subscriptions/plans/${planId}`, data);
export const deletePlan = (planId: string) => axiosInstance.delete(`/Subscriptions/plans/${planId}`);
export const addFeature = (planId: string, data: any) => axiosInstance.post(`/Subscriptions/plans/${planId}/features`, data);
export const updateFeature = (planId: string, featureKey: string, data: any) =>
  axiosInstance.put(`/Subscriptions/plans/${planId}/features/${featureKey}`, data);
export const deleteFeature = (planId: string, featureKey: string) =>
  axiosInstance.delete(`/Subscriptions/plans/${planId}/features/${featureKey}`);
export const subscribe = (data: any) => axiosInstance.post("/Subscriptions/subscribe", data);
export const getCurrentSubscription = () => axiosInstance.get("/Subscriptions/current");
export const changePlan = (data: any) => axiosInstance.put("/Subscriptions/change-plan", data);
export const cancelSubscription = (data: any) => axiosInstance.post("/Subscriptions/cancel", data);
export const renewSubscription = (data: any) => axiosInstance.post("/Subscriptions/renew", data);
