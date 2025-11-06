// src/layouts/AppLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

// (Optional) if you have a Navbar, import it here
// import { Navbar } from "@/components/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/5">
      {/* <Navbar />  ← uncomment if you have one */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
