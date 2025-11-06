// src/pages/Admin/Applications.tsx
import React, { useEffect, useState } from "react";
import AdminAPI from "@/lib/api/admin";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await AdminAPI.listInstructorApplications();
        setApplications(res?.data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Instructor Applications</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length === 0 && !loading ? (
        <p>No applications found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Instructor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a: any) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.instructorName || "N/A"}</td>
                <td>{a.status || "pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
