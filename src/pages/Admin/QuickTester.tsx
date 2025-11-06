import React, { useState } from "react";
import { request } from "@/lib/api/request";

type Http = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function safeParse<T = any>(txt: string): T | undefined {
  const trimmed = (txt || "").trim();
  if (!trimmed || trimmed === "{}") return {} as T;
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}

export default function AdminQuickTester() {
  const [method, setMethod] = useState<Http>("GET");
  const [url, setUrl] = useState("/Admin/instructors"); // ← pick a real one
  const [paramsText, setParamsText] = useState("{}");
  const [bodyText, setBodyText] = useState("{}");

  const [resp, setResp] = useState<any>(null);
  const [respMeta, setRespMeta] = useState<{status:number; time:number; headers:any} | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setErr(null);
    setResp(null);
    setRespMeta(null);

    try {
      const params = safeParse(paramsText);
      const data = safeParse(bodyText);

      let path = url.startsWith("/") ? url : `/${url}`;

      const t0 = performance.now();
      const res = await request<any>({
        method,
        url: path,                                  // request() already hits /api/v1
        params: method === "GET" ? (params as any) : undefined,
        data: method !== "GET" ? (data as any) : undefined,
      });
      const t1 = performance.now();

      // request() returns only data; to show status/headers, catch them via error handler or extend request()
      setResp(res);
      setRespMeta({ status: 200, time: +(t1 - t0).toFixed(0), headers: {} });
    } catch (e: any) {
      // Axios error shape
      const status = e?.response?.status;
      const headers = e?.response?.headers;
      const data = e?.response?.data;
      const message = data?.message || e?.message || "Request failed";

      setErr(`${status ? `[${status}] ` : ""}${message}`);
      setResp(data ?? null);
      setRespMeta(status ? { status, time: 0, headers } : null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui" }}>
      <h2 style={{ marginBottom: 12 }}>Admin API Quick Tester</h2>

      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 140px", gap: 8, marginBottom: 8 }}>
        <select value={method} onChange={(e) => setMethod(e.target.value as Http)}>
          {["GET","POST","PUT","PATCH","DELETE"].map(m => <option key={m}>{m}</option>)}
        </select>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/Admin/..." />
        <button onClick={run} disabled={loading}>{loading ? "Running..." : "Send"}</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Query params (JSON)</div>
          <textarea rows={10} value={paramsText} onChange={(e) => setParamsText(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Body (JSON)</div>
          <textarea rows={10} value={bodyText} onChange={(e) => setBodyText(e.target.value)} style={{ width: "100%" }} />
        </div>
      </div>

      {respMeta && (
        <div style={{ marginTop: 12, fontSize: 14 }}>
          <b>Status:</b> {respMeta.status} &nbsp;|&nbsp; <b>Time:</b> {respMeta.time} ms
        </div>
      )}

      {resp && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Response</div>
          <pre style={{ background: "#111", color: "#eee", padding: 12, borderRadius: 8, overflowX: "auto" }}>
            {JSON.stringify(resp, null, 2)}
          </pre>
        </div>
      )}

      {err && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          <b>Error:</b> {err}
        </div>
      )}
    </div>
  );
}
