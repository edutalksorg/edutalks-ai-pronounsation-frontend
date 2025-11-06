// src/lib/api/subscriptions.ts
import axiosClient from "./axiosClient";

export const getPlans = () => axiosClient.get("/Subscriptions/plans");
export const createPlan = (data: any) => axiosClient.post("/Subscriptions/plans", data);
export const updatePlan = (planId: string, data: any) => axiosClient.put(`/Subscriptions/plans/${planId}`, data);
export const deletePlan = (planId: string) => axiosClient.delete(`/Subscriptions/plans/${planId}`);

export const addFeature = (planId: string, data: any) =>
  axiosClient.post(`/Subscriptions/plans/${planId}/features`, data);

export const updateFeature = (planId: string, featureKey: string, data: any) =>
  axiosClient.put(`/Subscriptions/plans/${planId}/features/${featureKey}`, data);

export const deleteFeature = (planId: string, featureKey: string) =>
  axiosClient.delete(`/Subscriptions/plans/${planId}/features/${featureKey}`);

export const subscribe = (data: any) => axiosClient.post("/Subscriptions/subscribe", data);
export const getCurrentSubscription = () => axiosClient.get("/Subscriptions/current");
export const changePlan = (data: any) => axiosClient.put("/Subscriptions/change-plan", data);
export const cancelSubscription = (data: any) => axiosClient.post("/Subscriptions/cancel", data);
export const renewSubscription = (data: any) => axiosClient.post("/Subscriptions/renew", data);
