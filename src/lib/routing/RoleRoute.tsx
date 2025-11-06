// src/lib/routing/RoleRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RoleRoute({
  allowed,
  children,
}: {
  allowed: string[]; // e.g. ["admin", "superadmin"]
  children: ReactNode;
}) {
  const { user } = useAuth();
  if (!user || !allowed.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
