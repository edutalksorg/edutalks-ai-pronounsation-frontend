// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Index from "@/pages/Index";
import LoginPage from "@/pages/Login";
import Register from "@/pages/Register";

// User pages (protected)
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";

// Admin pages
import AdminDashboard from "@/pages/AdminDashboard";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import ApplicationsPage from "@/pages/Admin/Applications";
import ReviewInstructorPage from "@/pages/Admin/ReviewInstructor";

// Admin tools (we want to access these right now without redirect)
import AdminQuickTester from "@/pages/Admin/QuickTester";
import ReferralsSettingsPage from "@/pages/Admin/ReferralsSettings";

// Layout & guards
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/lib/routing/ProtectedRoute";
// NOTE: RoleRoute intentionally not used for the two public admin tool routes below

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* TEMP: make these public so you can test APIs right away */}
        <Route element={<AppLayout />}>
          <Route path="/admin/test" element={<AdminQuickTester />} />
          <Route path="/admin/referrals-settings" element={<ReferralsSettingsPage />} />
        </Route>

        {/* Protected shell */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin sections (you can re-add RoleRoute later) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route path="/admin/review" element={<ReviewInstructorPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
