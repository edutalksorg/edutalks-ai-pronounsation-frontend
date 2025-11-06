// src/lib/api/quizzes.ts
import axiosClient from "./axiosClient";

export const QuizzesAPI = {
  /** GET /api/v1/quizzes — list all quizzes */
  getAll: async () => {
    const { data } = await axiosClient.get("/quizzes");
    return data;
  },

  /** POST /api/v1/quizzes — create new quiz */
  create: async (payload: any) => {
    const { data } = await axiosClient.post("/quizzes", payload);
    return data;
  },

  /** GET /api/v1/quizzes/{id} — get a quiz by id */
  getById: async (id: string) => {
    const { data } = await axiosClient.get(`/quizzes/${id}`);
    return data;
  },

  /** PUT /api/v1/quizzes/{id} — update quiz */
  update: async (id: string, payload: any) => {
    const { data } = await axiosClient.put(`/quizzes/${id}`, payload);
    return data;
  },

  /** DELETE /api/v1/quizzes/{id} — delete quiz */
  remove: async (id: string) => {
    const { data } = await axiosClient.delete(`/quizzes/${id}`);
    return data;
  },

  /** POST /api/v1/quizzes/{id}/submit — submit quiz answers */
  submit: async (id: string, payload: any) => {
    const { data } = await axiosClient.post(`/quizzes/${id}/submit`, payload);
    return data;
  },

  /** POST /api/v1/quizzes/{id}/publish — publish quiz */
  publish: async (id: string, payload: any) => {
    const { data } = await axiosClient.post(`/quizzes/${id}/publish`, payload);
    return data;
  },

  /** GET /api/v1/quizzes/{id}/attempts — list quiz attempts */
  getAttempts: async (id: string) => {
    const { data } = await axiosClient.get(`/quizzes/${id}/attempts`);
    return data;
  },

  /** GET /api/v1/quizzes/{id}/attempts/{attemptId} — get specific attempt details */
  getAttemptDetails: async (id: string, attemptId: string) => {
    const { data } = await axiosClient.get(`/quizzes/${id}/attempts/${attemptId}`);
    return data;
  },
};

export default QuizzesAPI;
