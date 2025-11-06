// src/pages/Register.tsx (UI-only)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || password !== confirm) {
      setMsg("Please fill all fields and ensure passwords match.");
      return;
    }
    setBusy(true);
    setMsg("✅ Registration successful (demo). Redirecting to login…");
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 420, borderRadius: 10, boxShadow: "0 6px 20px rgba(20,20,40,0.06)", padding: 28, background: "#fff", border: "1px solid #eef2f6" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Create account</h2>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>Register to access the platform</p>
        </div>

        <form onSubmit={submit}>
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

          {msg && <div style={{ color: msg.startsWith("✅") ? "#065f46" : "#b91c1c", marginBottom: 12 }}>{msg}</div>}

          <button type="submit" disabled={busy} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none",
            background: busy ? "#9fd0ff" : "linear-gradient(90deg,#0074ff,#0fb7b7)", color: "white", fontWeight: 700, fontSize: 16 }}>
            {busy ? "Registering..." : "Create account"}
          </button>
        </form>

        <div style={{ marginTop: 14, textAlign: "center", fontSize: 14 }}>
          Already registered? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
