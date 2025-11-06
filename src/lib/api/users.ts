import axiosClient from "./axiosClient";

export interface CreateUserDto {
  email?: string;
  phoneNumber?: string;
  password?: string;
  fullName?: string;
  role?: string; // "user" | "admin" | "instructor" etc.
}

export interface UpdateProfileDto {
  fullName?: string;
  phoneNumber?: string;
  bio?: string;
}

const UsersAPI = {
  // GET /api/v1/users
  list: async (params?: any) => {
    const { data } = await axiosClient.get("/users", { params });
    return data;
  },

  // POST /api/v1/users
  create: async (payload: CreateUserDto) => {
    const { data } = await axiosClient.post("/users", payload);
    return data;
    // some backends return { id, ... } or { data: {...} }
  },

  // GET /api/v1/users/profile
  getProfile: async () => {
    const { data } = await axiosClient.get("/users/profile");
    return data;
  },

  // PUT /api/v1/users/profile
  updateProfile: async (payload: UpdateProfileDto) => {
    const { data } = await axiosClient.put("/users/profile", payload);
    return data;
  },

  // POST /api/v1/users/profile/avatar  (form-data)
  uploadAvatar: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const { data } = await axiosClient.post("/users/profile/avatar", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  // PATCH /api/v1/users/{id}/lock
  lock: async (id: string) => {
    const { data } = await axiosClient.patch(`/users/${id}/lock`);
    return data;
  },

  // PATCH /api/v1/users/{id}/unlock
  unlock: async (id: string) => {
    const { data } = await axiosClient.patch(`/users/${id}/unlock`);
    return data;
  },
};

export default UsersAPI;
