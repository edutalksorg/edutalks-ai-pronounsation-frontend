import React from "react";

type Probe = {
  key: string;
  label: string;
  method: "GET" | "POST";
  path: string;           // absolute path starting with /api/v1
  body?: any;             // optional JSON body for POST
  note?: string;          // explains why non-2xx can still mean "reachable"
};

// We intentionally DO NOT use the absolute backend URL here.
// Vite dev proxy forwards /api/v1/* to VITE_API_URL, avoiding CORS.
const REACHABLE_STATUSES = new Set([200, 201, 202, 204, 400, 401, 403, 404, 415, 422, 429]);

const PROBES: Probe[] = [
  // Auth
  { key: "auth-confirm-email", label: "Auth", method: "GET", path: "/api/v1/auth/confirm-email?userId=x&token=y", note: "200/400 proves route" },

  // Coupons
  { key: "coupon-list", label: "Coupon (list)", method: "GET", path: "/api/v1/coupons?page=1&pageSize=1" },
  { key: "coupon-by-code", label: "Coupon (by code)", method: "GET", path: "/api/v1/coupons/DOES_NOT_EXIST", note: "404 still proves route" },

  // DailyTopics
  { key: "topics-list", label: "DailyTopics (list)", method: "GET", path: "/api/v1/topics?PageNumber=1&PageSize=1" },

  // Quizzes
  { key: "quizzes-list", label: "Quizzes (list)", method: "GET", path: "/api/v1/quizzes?Page=1&PageSize=1", note: "401/403 likely until login" },

  // Payments (user)
  { key: "payments-history", label: "Payments (history)", method: "GET", path: "/api/v1/payments/history?pageNumber=1&pageSize=1", note: "401/403 likely" },
  { key: "payments-status", label: "Payments (status by id)", method: "GET", path: "/api/v1/payments/does-not-exist/status", note: "404 OK to prove route" },

  // Payments (PhonePe hooks)
  { key: "payments-phonepe-redirect", label: "Payments (PhonePe redirect)", method: "POST", path: "/api/v1/payments/phonepe/redirect", body: {}, note: "200/400/415 acceptable" },
  { key: "payments-phonepe-callback", label: "Payments (PhonePe callback)", method: "POST", path: "/api/v1/payments/phonepe/callback", body: {}, note: "200/400/415 acceptable" },

  // Pronunciation
  { key: "pronunciation-paragraphs", label: "Pronunciation (list)", method: "GET", path: "/api/v1/pronunciation/paragraphs?pageNumber=1&pageSize=1" },
  { key: "pronunciation-history", label: "Pronunciation (history)", method: "GET", path: "/api/v1/pronunciation/history?pageNumber=1&pageSize=1", note: "401/403 likely" },

  // AdminPayments
  { key: "admin-payments-transactions", label: "AdminPayments (transactions)", method: "GET", path: "/api/v1/admin/payments/transactions?pageNumber=1&pageSize=1", note: "401/403 expected (admin)" },

  // Admin Referrals
  { key: "admin-referrals-settings", label: "AdminReferrals (settings)", method: "GET", path: "/api/v1/admin/referrals/settings", note: "401/403 expected (admin)" },

  // Admin – Review Instructor
  { key: "admin-review-instructor", label: "Admin (review instructor)", method: "POST", path: "/api/v1/admin/instructors/does-not-exist/review", body: {}, note: "401/403/404 OK (admin)" },
];

type Result = {
  status: number | null;
  ok: boolean;
  latencyMs?: number;
  error?: string;
};

export default function Diagnostics() {
  const [results, setResults] = React.useState<Record<string, Result>>({});
  const [running, setRunning] = React.useState(false);

  const run = async () => {
    setRunning(true);
    const out: Record<string, Result> = {};

    for (const probe of PROBES) {
      const started = performance.now();
      try {
        const url = probe.path; // use relative URL so Vite proxy handles it
        const res = await fetch(url, {
          method: probe.method,
          headers: {
            "Content-Type": "application/json",
            // If you already have a token, uncomment:
            // Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
          body: probe.method === "POST" ? JSON.stringify(probe.body ?? {}) : undefined,
        });

        const latencyMs = Math.round(performance.now() - started);

        out[probe.key] = {
          status: res.status,
          ok: REACHABLE_STATUSES.has(res.status),
          latencyMs,
          error: res.ok ? undefined : (await safeText(res)),
        };
      } catch (e: any) {
        const latencyMs = Math.round(performance.now() - started);
        out[probe.key] = {
          status: null,
          ok: false,
          latencyMs,
          error: e?.message ?? String(e),
        };
      }
      setResults({ ...out }); // progressive updates
    }

    setRunning(false);
  };

  React.useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = PROBES.map(p => {
    const r = results[p.key];
    let badge = "bg-gray-600";
    let label = "Pending...";
    if (r) {
      if (r.ok && r.status && r.status >= 200 && r.status < 300) { badge = "bg-green-600"; label = `OK ${r.status}`; }
      else if (r?.status === 401 || r?.status === 403) { badge = "bg-yellow-600"; label = `Auth ${r.status}`; }
      else if (r?.status && REACHABLE_STATUSES.has(r.status)) { badge = "bg-blue-600"; label = `Reachable ${r.status}`; }
      else if (r?.status) { badge = "bg-red-600"; label = `Fail ${r.status}`; }
      else { badge = "bg-red-700"; label = "Network error"; }
    }
    return (
      <tr key={p.key} className="border-b border-zinc-800">
        <td className="py-2 px-3">{p.label}</td>
        <td className="py-2 px-3 text-zinc-400">{p.method} {p.path}</td>
        <td className="py-2 px-3">
          <span className={`text-white text-xs px-2 py-1 rounded ${badge}`}>{label}</span>
        </td>
        <td className="py-2 px-3 text-zinc-400 text-xs">{r?.latencyMs != null ? `${r.latencyMs} ms` : ""}</td>
        <td className="py-2 px-3 text-zinc-400 text-xs">{p.note || ""}</td>
        <td className="py-2 px-3 text-zinc-400 text-xs break-all">{r?.error || ""}</td>
      </tr>
    );
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">API Connectivity Diagnostics</h1>
      <p className="text-sm text-zinc-400 mb-4">
        Green = 2xx, Yellow = 401/403 (auth needed), Blue = 400/404/415/422/429 (route exists), Red = network/server failure.
      </p>
      <button
        onClick={run}
        disabled={running}
        className="rounded-2xl px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {running ? "Running..." : "Re-run"}
      </button>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-zinc-800">
              <th className="py-2 px-3">Module</th>
              <th className="py-2 px-3">Endpoint</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Latency</th>
              <th className="py-2 px-3">Notes</th>
              <th className="py-2 px-3">Error</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

async function safeText(res: Response) {
  try { return await res.text(); } catch { return ""; }
}
