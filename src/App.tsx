// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ---------- Public Pages ----------
import Index from "@/pages/Index";
import LoginPage from "@/pages/Login";
import Register from "@/pages/Register";
import Diagnostics from "@/pages/Diagnostics"; // ✅ Added diagnostics page

// ---------- User Pages ----------
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";

// ---------- Admin Pages ----------
import AdminDashboard from "@/pages/AdminDashboard";
import ApplicationsPage from "@/pages/Admin/Applications";
import ReviewInstructorPage from "@/pages/Admin/ReviewInstructor";
import AdminQuickTester from "@/pages/Admin/QuickTester";
import ReferralsSettingsPage from "@/pages/Admin/ReferralsSettings";

// ---------- Layout & Guards ----------
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/lib/routing/ProtectedRoute";
// NOTE: RoleRoute intentionally NOT used in this temp setup

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <Routes>
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- Diagnostics (public) ---------- */}
        <Route path="/diagnostics" element={<Diagnostics />} /> {/* ✅ Added */}

        {/* ---------- TEMP PUBLIC ADMIN TOOLS (no guards) ---------- */}
        <Route element={<AppLayout />}>
          <Route path="/admin/test" element={<AdminQuickTester />} />
          <Route path="/admin/referrals-settings" element={<ReferralsSettingsPage />} />
        </Route>

        {/* ---------- Protected Shell ---------- */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* user routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* admin sections (temporarily no RoleRoute) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route path="/admin/review" element={<ReviewInstructorPage />} />
        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
