import { useState, useMemo } from "react";

type Page = "landing" | "dashboard" | "scan" | "records";
interface Props { onNavigate: (p: Page) => void; }

const ALL_RECORDS = [
  { id: "RHC-2451", name: "Anita Sharma", age: 34, sex: "F", diagnosis: "Viral fever", symptoms: "fever, headache, body ache", treatment: "Paracetamol 500 TID, ORS, fluids", date: "12/02/2026" },
  { id: "RHC-2450", name: "Rajesh Kumar", age: 52, sex: "M", diagnosis: "Hypertension", symptoms: "headache, dizziness", treatment: "Amlodipine 5mg, lifestyle advice", date: "12/02/2026" },
  { id: "RHC-2449", name: "Priya Devi", age: 27, sex: "F", diagnosis: "Malaria", symptoms: "fever, chills, sweating", treatment: "Artemether-Lumefantrine 6-dose", date: "11/02/2026" },
  { id: "RHC-2448", name: "Mohammed Iqbal", age: 61, sex: "M", diagnosis: "Diarrhea", symptoms: "loose stools, abdominal cramps", treatment: "ORS, Zinc 20mg, diet advice", date: "11/02/2026" },
  { id: "RHC-2447", name: "Sunita Bai", age: 19, sex: "F", diagnosis: "Anaemia", symptoms: "fatigue, pallor, weakness", treatment: "Iron + Folic acid, diet counseling", date: "10/02/2026" },
  { id: "RHC-2446", name: "Dinesh Patel", age: 44, sex: "M", diagnosis: "Respiratory infection", symptoms: "cough, fever, chest pain", treatment: "Amoxicillin 500mg TID, steam inhalation", date: "10/02/2026" },
  { id: "RHC-2445", name: "Kavitha Rao", age: 31, sex: "F", diagnosis: "Viral fever", symptoms: "fever, bodyache, fatigue", treatment: "Paracetamol 650mg, rest, fluids", date: "09/02/2026" },
  { id: "RHC-2444", name: "Suresh Yadav", age: 67, sex: "M", diagnosis: "Hypertension", symptoms: "high BP, fatigue", treatment: "Losartan 50mg, salt restriction", date: "09/02/2026" },
  { id: "RHC-2443", name: "Meena Kumari", age: 23, sex: "F", diagnosis: "Malaria", symptoms: "high fever, headache, nausea", treatment: "Artemether-Lumefantrine, Paracetamol", date: "08/02/2026" },
  { id: "RHC-2442", name: "Ashok Singh", age: 38, sex: "M", diagnosis: "Diarrhea", symptoms: "vomiting, loose stools, weakness", treatment: "IV fluids, ORS, Metronidazole 400mg", date: "08/02/2026" },
];

const TEAL = "#0B8A7E";
const NAVY = "#0D1B2A";

export default function Records({ onNavigate }: Props) {
  const [search, setSearch] = useState("");
  const [filterDx, setFilterDx] = useState("All");
  const [editId, setEditId] = useState<string | null>(null);
  const [records, setRecords] = useState(ALL_RECORDS);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRecord, setEditRecord] = useState<typeof ALL_RECORDS[0] | null>(null);

  const diagnoses = useMemo(() => ["All", ...Array.from(new Set(records.map(r => r.diagnosis)))], [records]);

  const filtered = useMemo(() =>
    records.filter(r => {
      const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.diagnosis.toLowerCase().includes(search.toLowerCase());
      const matchDx = filterDx === "All" || r.diagnosis === filterDx;
      return matchSearch && matchDx;
    }),
    [records, search, filterDx]
  );

  const exportCSV = () => {
    const header = "ID,Name,Age,Sex,Diagnosis,Symptoms,Treatment,Date";
    const rows = filtered.map(r => `${r.id},"${r.name}",${r.age},${r.sex},"${r.diagnosis}","${r.symptoms}","${r.treatment}",${r.date}`);
    const csv = [header, ...rows].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "medocr_records.csv"; a.click();
  };

  const startEdit = (r: typeof ALL_RECORDS[0]) => { setEditId(r.id); setEditRecord({ ...r }); };
  const saveEdit = () => {
    if (!editRecord) return;
    setRecords(rs => rs.map(r => r.id === editRecord.id ? editRecord : r));
    setEditId(null); setEditRecord(null);
  };
  const deleteRecord = (id: string) => { setRecords(rs => rs.filter(r => r.id !== id)); setDeleteId(null); };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Records</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{filtered.length} of {records.length} records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white"
            style={{ border: `1.5px solid ${NAVY}`, color: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            📤 Export CSV
          </button>
          <button onClick={() => onNavigate("scan")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: NAVY, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            + New Scan
          </button>
        </div>
      </div>

      {/* Search & filter */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-48 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#94A3B8" }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or diagnosis…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
            style={{ background: "white", border: "1px solid #E2E8F0", color: NAVY, fontFamily: "'Inter', sans-serif" }}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {diagnoses.map(dx => (
            <button key={dx} onClick={() => setFilterDx(dx)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: filterDx === dx ? NAVY : "white",
                color: filterDx === dx ? "white" : "#64748B",
                border: filterDx === dx ? `1px solid ${NAVY}` : "1px solid #E2E8F0",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>
              {dx}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #E2E8F0" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9", background: "#FAFBFC" }}>
                {["ID", "Patient", "Age / Sex", "Diagnosis", "Symptoms", "Treatment", "Date", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-wider"
                    style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                  className="hover:bg-slate-50 transition-colors">
                  {editId === r.id && editRecord ? (
                    <td colSpan={8} className="px-4 py-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { label: "Name", key: "name" }, { label: "Age", key: "age" }, { label: "Sex", key: "sex" },
                          { label: "Diagnosis", key: "diagnosis" }, { label: "Symptoms", key: "symptoms" }, { label: "Treatment", key: "treatment" },
                        ].map(({ label, key }) => (
                          <div key={key}>
                            <label className="text-[10px] font-semibold tracking-wider uppercase mb-1 block" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
                            <input
                              value={editRecord[key as keyof typeof editRecord] as string}
                              onChange={(e) => setEditRecord(er => er ? { ...er, [key]: e.target.value } : er)}
                              className="w-full px-2.5 py-1.5 rounded-lg text-sm focus:outline-none"
                              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: NAVY, fontFamily: "'Inter', sans-serif" }}
                            />
                          </div>
                        ))}
                        <div className="col-span-2 md:col-span-4 flex gap-2 pt-1">
                          <button onClick={saveEdit} className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                            style={{ background: TEAL, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Save</button>
                          <button onClick={() => { setEditId(null); setEditRecord(null); }} className="px-4 py-2 rounded-lg text-sm font-semibold"
                            style={{ background: "#F1F5F9", color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cancel</button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: TEAL }}>{r.id}</td>
                      <td className="px-4 py-3 font-semibold text-sm" style={{ color: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{r.age} · {r.sex === "F" ? "F" : "M"}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(11,138,126,0.1)", color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.diagnosis}</span>
                      </td>
                      <td className="px-4 py-3 text-xs max-w-32" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{r.symptoms}</td>
                      <td className="px-4 py-3 text-xs max-w-36" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{r.treatment}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>{r.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => startEdit(r)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold transition-all hover:bg-blue-50"
                            style={{ color: "#3B82F6", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Edit</button>
                          <button onClick={() => setDeleteId(r.id)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold transition-all hover:bg-red-50"
                            style={{ color: "#EF4444", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Del</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
                    No records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="rounded-2xl p-7 max-w-sm w-full mx-4" style={{ background: "white" }}>
            <div className="text-lg font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Delete record?</div>
            <p className="text-sm mb-5" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => deleteRecord(deleteId!)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
                style={{ background: "#EF4444", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Delete</button>
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: "#F1F5F9", color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
