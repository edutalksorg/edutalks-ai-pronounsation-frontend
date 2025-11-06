// src/lib/api/voiceCall.ts
import axiosClient from "./axiosClient";

/** GET: list of online users available for calls */
export const getAvailableUsers = (params?: {
  language?: string;
  minRating?: number;
  page?: number;
  pageSize?: number;
}) => axiosClient.get("/api/v1/calls/available-users", { params });

/** GET: search users by name/language */
export const searchUsers = (params: {
  q?: string;
  language?: string;
  page?: number;
  pageSize?: number;
}) => axiosClient.get("/api/v1/calls/search-users", { params });

/** PUT: update your availability (online/offline) */
export const setAvailability = (online: boolean) =>
  axiosClient.put("/api/v1/calls/availability", { online });

/** POST: initiate a call to another user */
export const initiateCall = (payload: {
  calleeUserId: string;
  topicId?: string;
}) => axiosClient.post("/api/v1/calls/initiate", payload);

/** POST: respond to invitation (accept/reject) */
export const respondToCall = (callId: string, action: "accept" | "reject") =>
  axiosClient.post(`/api/v1/calls/${callId}/respond`, { action });

/** POST: end an active call */
export const endCall = (callId: string) =>
  axiosClient.post(`/api/v1/calls/${callId}/end`);

/** POST: rate a completed call (1–5) */
export const rateCall = (callId: string, rating: number, notes?: string) =>
  axiosClient.post(`/api/v1/calls/${callId}/rate`, { rating, notes });

/** GET: call history with pagination/filters */
export const getCallHistory = (params?: {
  page?: number;
  pageSize?: number;
  from?: string; // ISO date
  to?: string;   // ISO date
}) => axiosClient.get("/api/v1/calls/history", { params });

/** GET: ICE / STUN server config for WebRTC (read-only) */
export const getWebrtcConfig = () =>
  axiosClient.get("/api/v1/calls/webrtc-config");
