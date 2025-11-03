import axiosInstance from "../axiosConfig";

export const getParagraphs = () => axiosInstance.get("/pronunciation/paragraphs");
export const createParagraph = (data: any) => axiosInstance.post("/pronunciation/paragraphs", data);
export const getParagraphById = (id: string) => axiosInstance.get(`/pronunciation/paragraphs/${id}`);
export const updateParagraph = (id: string, data: any) => axiosInstance.put(`/pronunciation/paragraphs/${id}`, data);
export const deleteParagraph = (id: string) => axiosInstance.delete(`/pronunciation/paragraphs/${id}`);
export const assessAudio = (data: any) => axiosInstance.post("/pronunciation/assess", data);
export const getAssessmentHistory = () => axiosInstance.get("/pronunciation/history");
export const getAssessmentAttempt = (id: string) => axiosInstance.get(`/pronunciation/attempts/${id}`);
