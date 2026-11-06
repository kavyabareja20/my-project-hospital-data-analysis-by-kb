import { useState } from "react";

type Page = "landing" | "dashboard" | "scan" | "records";
interface Props { onNavigate: (p: Page) => void; }

const DIAGNOSES = [
  { name: "Viral fever", count: 84, pct: 85 },
  { name: "Malaria", count: 52, pct: 53 },
  { name: "Diarrhea", count: 41, pct: 42 },
  { name: "Hypertension", count: 38, pct: 39 },
  { name: "Respiratory infection", count: 29, pct: 30 },
  { name: "Anaemia", count: 21, pct: 22 },
];

const RECENT = [
  { id: "RHC-2451", name: "Anita Sharma", age: 34, sex: "F", diagnosis: "Viral fever", date: "12/02/2026" },
  { id: "RHC-2450", name: "Rajesh Kumar", age: 52, sex: "M", diagnosis: "Hypertension", date: "12/02/2026" },
  { id: "RHC-2449", name: "Priya Devi", age: 27, sex: "F", diagnosis: "Malaria", date: "11/02/2026" },
  { id: "RHC-2448", name: "Mohammed Iqbal", age: 61, sex: "M", diagnosis: "Diarrhea", date: "11/02/2026" },
  { id: "RHC-2447", name: "Sunita Bai", age: 19, sex: "F", diagnosis: "Anaemia", date: "10/02/2026" },
];

const TEAL = "#0B8A7E";
const NAVY = "#0D1B2A";

export default function Dashboard({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<"week" | "month" | "year">("month");

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>Rural Health Centre · Demo Mode</p>
        </div>
        <button
          onClick={() => onNavigate("scan")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
          style={{ background: NAVY, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          + New Scan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Records", value: "2,451", delta: "+12 this week", icon: "🗃️" },
          { label: "Records Today", value: "14", delta: "+3 vs yesterday", icon: "📋" },
          { label: "Avg. Process Time", value: "8.3s", delta: "-0.4s vs last week", icon: "⚡" },
          { label: "AI Accuracy", value: "94.2%", delta: "Verified records", icon: "🤖" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid #E2E8F0" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{s.icon}</div>
            </div>
            <div className="text-2xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>{s.value}</div>
            <div className="text-xs font-medium mb-1" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</div>
            <div className="text-[11px]" style={{ color: TEAL, fontFamily: "'Inter', sans-serif" }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6 mb-8">
        {/* Diagnosis chart */}
        <div className="md:col-span-3 rounded-2xl p-6" style={{ background: "white", border: "1px solid #E2E8F0" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Common Diagnoses</div>
              <div className="text-xs mt-0.5" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>Records in selected period</div>
            </div>
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#F1F5F9" }}>
              {(["week", "month", "year"] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className="px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all"
                  style={{
                    background: activeTab === t ? "white" : "transparent",
                    color: activeTab === t ? NAVY : "#94A3B8",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: activeTab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {DIAGNOSES.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="text-xs font-medium w-36 shrink-0" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>{d.name}</div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: TEAL, opacity: 0.8 + d.pct * 0.002 }}></div>
                </div>
                <div className="text-xs font-bold w-8 text-right" style={{ color: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{d.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #E2E8F0" }}>
            <div className="font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Quick Actions</div>
            <div className="space-y-2">
              {[
                { label: "Scan new record", icon: "📷", action: "scan" as Page },
                { label: "View all records", icon: "📋", action: "records" as Page },
              ].map((a) => (
                <button key={a.label} onClick={() => onNavigate(a.action)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors text-left hover:bg-slate-50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY, border: "1px solid #F1F5F9" }}>
                  <span className="text-lg">{a.icon}</span>
                  {a.label}
                </button>
              ))}
              <button
                onClick={() => {
                  const csv = "ID,Name,Age,Sex,Diagnosis,Date\n" + RECENT.map(r => `${r.id},${r.name},${r.age},${r.sex},${r.diagnosis},${r.date}`).join("\n");
                  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
                  const a = document.createElement("a"); a.href = url; a.download = "medocr_records.csv"; a.click();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors text-left hover:bg-slate-50"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY, border: "1px solid #F1F5F9" }}>
                <span className="text-lg">📤</span>
                Export CSV
              </button>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ background: "rgba(11,138,126,0.06)", border: "1px solid rgba(11,138,126,0.2)" }}>
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>DEMO MODE</div>
            <p className="text-xs leading-relaxed" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>
              All data shown is synthetic. No real patient information is stored or transmitted.
            </p>
          </div>
        </div>
      </div>

      {/* Recent records */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #E2E8F0" }}>
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "#F1F5F9" }}>
          <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Recent Records</div>
          <button onClick={() => onNavigate("records")} className="text-xs font-semibold" style={{ color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {["ID", "Patient", "Age / Sex", "Diagnosis", "Date"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < RECENT.length - 1 ? "1px solid #F8FAFC" : "none" }}
                  className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-3.5 text-xs font-mono font-semibold" style={{ color: TEAL }}>{r.id}</td>
                  <td className="px-6 py-3.5 font-medium" style={{ color: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.name}</td>
                  <td className="px-6 py-3.5" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{r.age} · {r.sex === "F" ? "Female" : "Male"}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(11,138,126,0.1)", color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {r.diagnosis}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-xs" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
