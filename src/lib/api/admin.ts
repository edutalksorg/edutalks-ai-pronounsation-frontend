import axiosInstance from "../axiosConfig";

// ✅ Review instructor
export const reviewInstructor = (id: string, data: any) =>
  axiosInstance.post(`/Admin/instructors/${id}/review`, data);
