import axiosInstance from "../axiosConfig";

export const getUsers = () => axiosInstance.get("/users");
export const createUser = (data: any) => axiosInstance.post("/users", data);
export const getProfile = () => axiosInstance.get("/users/profile");
export const updateProfile = (data: any) => axiosInstance.put("/users/profile", data);
export const uploadAvatar = (data: any) => axiosInstance.post("/users/profile/avatar", data);
export const lockUser = (id: string) => axiosInstance.patch(`/users/${id}/lock`);
export const unlockUser = (id: string) => axiosInstance.patch(`/users/${id}/unlock`);
