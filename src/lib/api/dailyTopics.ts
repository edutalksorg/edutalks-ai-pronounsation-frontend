import axiosInstance from "../axiosConfig";

export const getTopics = () => axiosInstance.get("/topics");
export const createTopic = (data: any) => axiosInstance.post("/topics", data);
export const getTopicById = (id: string) => axiosInstance.get(`/topics/${id}`);
export const updateTopic = (id: string, data: any) => axiosInstance.put(`/topics/${id}`, data);
export const deleteTopic = (id: string) => axiosInstance.delete(`/topics/${id}`);
export const featureTopic = (id: string) => axiosInstance.patch(`/topics/${id}/featured`);
export const favoriteTopic = (id: string) => axiosInstance.post(`/topics/${id}/favorite`);
export const unfavoriteTopic = (id: string) => axiosInstance.delete(`/topics/${id}/favorite`);
export const getFavorites = () => axiosInstance.get("/topics/favorites");
export const updateTopicStatus = (id: string, data: any) => axiosInstance.patch(`/topics/${id}/status`, data);
