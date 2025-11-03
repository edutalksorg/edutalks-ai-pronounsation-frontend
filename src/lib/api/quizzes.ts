import axiosInstance from "../axiosConfig";

export const getQuizzes = () => axiosInstance.get("/quizzes");
export const createQuiz = (data: any) => axiosInstance.post("/quizzes", data);
export const getQuizById = (id: string) => axiosInstance.get(`/quizzes/${id}`);
export const updateQuiz = (id: string, data: any) => axiosInstance.put(`/quizzes/${id}`, data);
export const deleteQuiz = (id: string) => axiosInstance.delete(`/quizzes/${id}`);
export const submitQuiz = (id: string, data: any) => axiosInstance.post(`/quizzes/${id}/submit`, data);
export const publishQuiz = (id: string, data: any) => axiosInstance.post(`/quizzes/${id}/publish`, data);
export const getQuizAttempts = (id: string) => axiosInstance.get(`/quizzes/${id}/attempts`);
export const getQuizAttemptDetails = (id: string, attemptId: string) =>
  axiosInstance.get(`/quizzes/${id}/attempts/${attemptId}`);
