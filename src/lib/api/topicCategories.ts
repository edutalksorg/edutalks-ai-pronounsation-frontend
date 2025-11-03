import axiosInstance from "../axiosConfig";

export const getTopicCategories = () => axiosInstance.get("/topics/categories");
export const createTopicCategory = (data: any) => axiosInstance.post("/topics/categories", data);
export const updateTopicCategory = (id: string, data: any) => axiosInstance.put(`/topics/categories/${id}`, data);
export const deleteTopicCategory = (id: string) => axiosInstance.delete(`/topics/categories/${id}`);
