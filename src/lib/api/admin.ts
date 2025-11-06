// src/lib/api/admin.ts
import { request } from "./request";

// ---------- Types ----------
export interface ReviewInstructorPayload {
  applicationId: string;
  approve: boolean;
  notes?: string;
}

// ---------- API ----------
export const AdminAPI = {
  /**
   * Review instructor application
   * POST /api/v1/Admin/instructors/{id}/review
   */
  reviewInstructor: (id: string, payload: ReviewInstructorPayload) =>
    request({
      method: "POST",
      url: `/Admin/instructors/${id}/review`,
      data: payload,
    }),

  /**
   * List all instructor applications
   * GET /api/v1/Admin/instructors/applications
   */
  listInstructorApplications: (params?: Record<string, any>) =>
    request({
      method: "GET",
      url: `/Admin/instructors/applications`,
      params,
    }),

  /**
   * List all instructors
   * GET /api/v1/Admin/instructors
   */
  listInstructors: (params?: Record<string, any>) =>
    request({
      method: "GET",
      url: `/Admin/instructors`,
      params,
    }),
};

export default AdminAPI;
