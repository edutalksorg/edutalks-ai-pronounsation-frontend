import axiosClient from "./axiosClient";

export interface TopicPayload {
  title: string;
  description?: string;
  categoryId?: string;
  content?: string;
  isFeatured?: boolean;
}

export interface UpdateTopicPayload extends Partial<TopicPayload> {
  status?: string; // "active" | "inactive" etc.
}

const DailyTopicsAPI = {
  /** GET /api/v1/topics */
  list: async (params?: any) => {
    const { data } = await axiosClient.get("/topics", { params });
    return data;
  },

  /** POST /api/v1/topics */
  create: async (payload: TopicPayload) => {
    const { data } = await axiosClient.post("/topics", payload);
    return data;
  },

  /** GET /api/v1/topics/{id} */
  getById: async (id: string) => {
    const { data } = await axiosClient.get(`/topics/${id}`);
    return data;
  },

  /** PUT /api/v1/topics/{id} */
  update: async (id: string, payload: UpdateTopicPayload) => {
    const { data } = await axiosClient.put(`/topics/${id}`, payload);
    return data;
  },

  /** DELETE /api/v1/topics/{id} */
  remove: async (id: string) => {
    const { data } = await axiosClient.delete(`/topics/${id}`);
    return data;
  },

  /** PATCH /api/v1/topics/{id}/featured */
  toggleFeatured: async (id: string) => {
    const { data } = await axiosClient.patch(`/topics/${id}/featured`);
    return data;
  },

  /** POST /api/v1/topics/{id}/favorite */
  addFavorite: async (id: string) => {
    const { data } = await axiosClient.post(`/topics/${id}/favorite`);
    return data;
  },

  /** DELETE /api/v1/topics/{id}/favorite */
  removeFavorite: async (id: string) => {
    const { data } = await axiosClient.delete(`/topics/${id}/favorite`);
    return data;
  },

  /** GET /api/v1/topics/favorites */
  listFavorites: async () => {
    const { data } = await axiosClient.get("/topics/favorites");
    return data;
  },

  /** PATCH /api/v1/topics/{id}/status */
  updateStatus: async (id: string, status: string) => {
    const { data } = await axiosClient.patch(`/topics/${id}/status`, { status });
    return data;
  },
};

export default DailyTopicsAPI;
