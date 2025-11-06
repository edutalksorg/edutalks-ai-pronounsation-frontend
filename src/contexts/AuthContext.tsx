// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AuthAPI, { LoginPayload } from "../lib/api/auth";

export type UserRole = "superadmin" | "admin" | "user";

export interface User {
  id?: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
  role?: UserRole;
  [k: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted user on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("edulearn_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error loading stored user:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const payload: LoginPayload = {
        identifier,
        password,
        deviceId: "web-client",
        rememberMe: true,
      };

      const response = await AuthAPI.login(payload);
      console.log("Login response:", response);

      const accessToken = response?.accessToken || response?.data?.accessToken;
      const refreshToken = response?.refreshToken || response?.data?.refreshToken;
      const userData =
        response?.user || response?.data?.user || response?.data || null;

      if (!userData) throw new Error("User data not returned from API");

      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("edulearn_user", JSON.stringify(userData));

      setUser(userData);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const refreshToken = localStorage.getItem("refresh_token") || "";
      await AuthAPI.logout(refreshToken, false);
    } catch (error) {
      console.warn("Logout error:", error);
    } finally {
      localStorage.clear();
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
