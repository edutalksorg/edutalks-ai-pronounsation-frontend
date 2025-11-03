// src/pages/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Role = "user" | "admin" | "superadmin" | "student" | "instructor";

//const backendBase = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:8080";
const backendBase = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8080";

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setBusy(true);
    try {
      const payload = { name, email, password, role };

      const res = await fetch(`${backendBase}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1400); // <-- navigate to /login
      } else {
        let text = await res.text();
        try {
          const json = JSON.parse(text);
          text = json.message || JSON.stringify(json) || text;
        } catch {}
        setError(`Registration failed: ${text}`);
      }
    } catch (err: any) {
      setError("Network/server error: " + (err?.message || String(err)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{
        width: 420, borderRadius: 10, boxShadow: "0 6px 20px rgba(20,20,40,0.06)",
        padding: 28, background: "#fff", border: "1px solid #eef2f6"
      }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Create account</h2>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>Register to access the platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required
                 style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", marginTop: 6, marginBottom: 12 }} />

          <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                 style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", marginTop: 6, marginBottom: 12 }} />

          <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required
                 style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", marginTop: 6, marginBottom: 12 }} />

          <label style={{ fontSize: 13, fontWeight: 600 }}>Confirm password</label>
          <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" required
                 style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", marginTop: 6, marginBottom: 12 }} />

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Register as</label>
            <select value={role} onChange={(e) => setRole(e.target.value as Role)}
                    style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", marginTop: 6 }}>
              <option value="student">Student / Learner</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {error && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: "#065f46", marginBottom: 12 }}>{success}</div>}

          <button type="submit" disabled={busy} style={{
            width: "100%", padding: 12, borderRadius: 10, border: "none",
            background: busy ? "#9fd0ff" : "linear-gradient(90deg,#0074ff,#0fb7b7)",
            color: "white", fontWeight: 700, fontSize: 16, cursor: busy ? "default" : "pointer"
          }}>
            {busy ? "Registering..." : "Create account"}
          </button>
        </form>

        <div style={{ marginTop: 14, textAlign: "center", fontSize: 14 }}>
          Already registered? <Link to="/login">Sign in</Link> {/* <-- link to /login */}
        </div>
      </div>
    </div>
  );
}
