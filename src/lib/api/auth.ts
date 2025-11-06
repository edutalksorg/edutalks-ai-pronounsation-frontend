// src/lib/api/auth.ts
import axiosClient from "./axiosClient";

// ---------- Types ----------
export interface RegisterPayload {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role: string; // e.g. "user" | "admin" | "instructor"
  referralCode?: string;
  referralSource?: string;
  instructorBio?: string;
  instructorExpertise?: string[];
}

export interface LoginPayload {
  identifier: string; // email or phone
  password: string;
  deviceId?: string; // e.g. "web-client"
  rememberMe?: boolean;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ---------- API ----------
const AuthAPI = {
  register: async (payload: RegisterPayload) => {
    const { data } = await axiosClient.post("/api/v1/auth/register", payload);
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await axiosClient.post("/api/v1/auth/login", payload);
    return data; // expect { accessToken?, refreshToken?, user? ... }
  },

  confirmEmail: async (userId: string, token: string) => {
    const { data } = await axiosClient.get("/api/v1/auth/confirm-email", {
      params: { userId, token },
    });
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await axiosClient.post("/api/v1/auth/forgot-password", { email });
    return data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const { data } = await axiosClient.put("/api/v1/auth/change-password", payload);
    return data;
  },

  logout: async (refreshToken: string, logoutFromAllDevices = false) => {
    const { data } = await axiosClient.post("/api/v1/auth/logout", {
      refreshToken,
      logoutFromAllDevices,
    });
    return data;
  },

  resendEmailConfirmation: async (email: string) => {
    const { data } = await axiosClient.post(
      "/api/v1/auth/resend-email-confirmation",
      { email }
    );
    return data;
  },

  refreshToken: async (refreshToken: string) => {
    const { data } = await axiosClient.post("/api/v1/auth/refresh-token", {
      refreshToken,
    });
    return data; // expect { accessToken }
  },
};

export default AuthAPI;
