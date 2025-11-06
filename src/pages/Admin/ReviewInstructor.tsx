import React, { useState } from "react";
import AdminAPI from "@/lib/api/admin";

export default function ReviewInstructorPage() {
  const [instructorId, setInstructorId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [approve, setApprove] = useState(true);
  const [notes, setNotes] = useState("");
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setResp(null); setLoading(true);
    try {
      const data = await AdminAPI.reviewInstructor(instructorId, {
        applicationId,
        approve,
        notes,
      });
      setResp(data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: "0 auto", fontFamily: "system-ui" }}>
      <h2 style={{ marginBottom: 12 }}>Admin • Review Instructor</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Instructor ID</label>
          <input value={instructorId} onChange={(e) => setInstructorId(e.target.value)}
                 placeholder="paste {id} from Swagger or list API" style={{ width: "100%", padding: 8 }} />
        </div>
        <div>
          <label>Application ID</label>
          <input value={applicationId} onChange={(e) => setApplicationId(e.target.value)}
                 placeholder="paste applicationId" style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input id="approve" type="checkbox" checked={approve} onChange={(e) => setApprove(e.target.checked)} />
          <label htmlFor="approve">Approve</label>
        </div>
        <div>
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder="optional notes" rows={3} style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {resp && (
        <pre style={{ marginTop: 16, background: "#111", color: "#eee", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(resp, null, 2)}
        </pre>
      )}
      {err && <div style={{ marginTop: 12, color: "crimson" }}><b>Error:</b> {err}</div>}
    </div>
  );
}
