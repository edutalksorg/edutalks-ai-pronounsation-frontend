import React, { useEffect, useState } from "react";
import { request } from "@/lib/api/request";

type Check = { name: string; url: string; method?: "GET"|"POST"; body?: any };
const checks: Check[] = [
  { name: "Users • profile", url: "/users/profile" },
  { name: "TopicCategories • list", url: "/topics/categories" },
  { name: "DailyTopics • list", url: "/topics" },
  { name: "Quizzes • list", url: "/quizzes" },
  { name: "Pronunciation • paragraphs", url: "/pronunciation/paragraphs" },
  { name: "Payments • history", url: "/payments/history" },
  { name: "Subscriptions • current", url: "/Subscriptions/current" },
  { name: "Referrals • my-code", url: "/referrals/my-code" },
  { name: "VoiceCall • webrtc-config", url: "/calls/webrtc-config" },
  { name: "Wallet • balance", url: "/wallet/balance" },
  { name: "Admin • instructors", url: "/Admin/instructors" },               // admin only
  { name: "AdminPayments • transactions", url: "/admin/payments/transactions" }, // admin only
];

export default function ApiSmoke() {
  const [results, setResults] = useState<{name: string; ok: boolean; status?: number; error?: string}[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    (async () => {
      setRunning(true);
      const out: any[] = [];
      for (const c of checks) {
        try {
          const res = await request({ method: c.method ?? "GET", url: c.url, data: c.body });
          out.push({ name: c.name, ok: true, status: 200 });
        } catch (e: any) {
          const status = e?.response?.status;
          out.push({ name: c.name, ok: false, status, error: e?.response?.data?.message || e?.message });
        }
      }
      setResults(out);
      setRunning(false);
    })();
  }, []);

  return (
    <div style={{padding:20}}>
      <h2>API Smoke Test</h2>
      {running && <p>Running checks…</p>}
      <table cellPadding={8} border={1}>
        <thead><tr><th>Check</th><th>Status</th><th>HTTP</th><th>Error</th></tr></thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td style={{color: r.ok ? "green" : "crimson"}}>{r.ok ? "OK" : "FAIL"}</td>
              <td>{r.status ?? "-"}</td>
              <td style={{maxWidth:480,whiteSpace:"pre-wrap"}}>{r.error ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
