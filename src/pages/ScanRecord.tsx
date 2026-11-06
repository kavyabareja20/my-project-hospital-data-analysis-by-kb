import { useState, useRef, useCallback } from "react";

type Page = "landing" | "dashboard" | "scan" | "records";
interface Props { onNavigate: (p: Page) => void; }

type Stage = "idle" | "uploading" | "preprocessing" | "ocr" | "structuring" | "ready";

const STAGES: { key: Stage; label: string; desc: string; icon: string }[] = [
  { key: "uploading", label: "Upload", desc: "Image received", icon: "📤" },
  { key: "preprocessing", label: "Preprocess", desc: "Contrast & deskew", icon: "⚙️" },
  { key: "ocr", label: "OCR", desc: "Text extraction", icon: "🔍" },
  { key: "structuring", label: "AI Structure", desc: "Gemini mapping", icon: "🤖" },
  { key: "ready", label: "Ready", desc: "Verify & save", icon: "✅" },
];

const STAGE_ORDER: Stage[] = ["idle", "uploading", "preprocessing", "ocr", "structuring", "ready"];

const DEMO_OCR = `Date: 12/02/2026
Patient: Anita Sharma
Age 34 Sex F
Complaints: fever, headache, body ache
Dx: Viral fever
Rx: Paracetamol 500 TID, ORS, fluids`;

const DEMO_RECORD = {
  patient: "Anita Sharma",
  id: "RHC-2451",
  age: "34",
  sex: "Female",
  date: "12/02/2026",
  diagnosis: "Viral fever",
  symptoms: "fever, headache, body ache",
  treatment: "Paracetamol 500 TID, ORS, fluids",
  notes: "",
};

const TEAL = "#0B8A7E";
const NAVY = "#0D1B2A";

function stageIndex(s: Stage) { return STAGE_ORDER.indexOf(s); }

export default function ScanRecord({ onNavigate }: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [record, setRecord] = useState({ ...DEMO_RECORD });
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const runPipeline = useCallback((src: string) => {
    setImgSrc(src);
    setStage("uploading");
    const steps: Stage[] = ["uploading", "preprocessing", "ocr", "structuring", "ready"];
    steps.forEach((s, i) => {
      setTimeout(() => setStage(s), (i + 1) * 900);
    });
  }, []);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => runPipeline(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const useDemo = () => runPipeline("demo");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { onNavigate("records"); }, 1500);
  };

  const currentIdx = stageIndex(stage);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Scan Record</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>Upload a photo of the handwritten register page</p>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: "rgba(11,138,126,0.08)", color: TEAL, border: "1px solid rgba(11,138,126,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          🟢 Demo Mode
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Upload */}
        <div className="space-y-5">
          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className="rounded-2xl transition-all cursor-pointer relative overflow-hidden"
            style={{
              border: `2px dashed ${dragging ? TEAL : "#CBD5E1"}`,
              background: dragging ? "rgba(11,138,126,0.04)" : "white",
              minHeight: "260px"
            }}
            onClick={() => !imgSrc && fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

            {imgSrc && imgSrc !== "demo" ? (
              <img src={imgSrc} alt="Uploaded register" className="w-full h-full object-contain" style={{ maxHeight: "320px" }} />
            ) : imgSrc === "demo" ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center" style={{ minHeight: "260px" }}>
                <div className="text-5xl mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
                  <div style={{ color: "#475569", lineHeight: 1.6 }}>
                    <div>Date: 12/02/2026</div>
                    <div>Patient: Anita Sharma</div>
                    <div>Age 34 Sex F</div>
                    <div>Dx: Viral fever</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center" style={{ minHeight: "260px" }}>
                <div className="text-5xl mb-4">📷</div>
                <div className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Drop image here</div>
                <div className="text-sm mb-4" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>or click to browse · JPG, PNG, HEIC</div>
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: NAVY, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Browse File
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); useDemo(); }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white"
                    style={{ border: `1.5px solid ${NAVY}`, color: NAVY, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Use Demo Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset */}
          {stage !== "idle" && (
            <button onClick={() => { setStage("idle"); setImgSrc(null); setSaved(false); setRecord({ ...DEMO_RECORD }); }}
              className="text-sm font-semibold transition-colors hover:text-red-600"
              style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              ← Start over
            </button>
          )}

          {/* Pipeline stages */}
          {stage !== "idle" && (
            <div className="rounded-2xl p-5 space-y-3" style={{ background: "white", border: "1px solid #E2E8F0" }}>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PROCESSING PIPELINE</div>
              {STAGES.map((s, i) => {
                const idx = STAGE_ORDER.indexOf(s.key);
                const done = currentIdx > idx;
                const active = currentIdx === idx;
                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 transition-all"
                      style={{
                        background: done ? TEAL : active ? "rgba(11,138,126,0.1)" : "#F1F5F9",
                        border: active ? `2px solid ${TEAL}` : "2px solid transparent"
                      }}>
                      {done ? "✓" : active ? <span style={{ animation: "pulse 1s infinite" }}>⟳</span> : <span style={{ opacity: 0.3 }}>{i + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: done || active ? NAVY : "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.label}</div>
                      <div className="text-xs" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>{s.desc}</div>
                    </div>
                    {done && <div className="text-xs font-bold" style={{ color: TEAL }}>✓</div>}
                    {active && <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: TEAL, borderTopColor: "transparent" }}></div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Raw OCR */}
          {(stage === "ocr" || stage === "structuring" || stage === "ready") && (
            <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid #E2E8F0" }}>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>RAW OCR TEXT</div>
              <pre className="text-sm whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Caveat', cursive", color: "#475569", fontSize: "1rem" }}>{DEMO_OCR}</pre>
            </div>
          )}
        </div>

        {/* Right: Structured record */}
        <div>
          {stage === "idle" && (
            <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full"
              style={{ background: "white", border: "2px dashed #E2E8F0", minHeight: "300px" }}>
              <div className="text-4xl mb-4 opacity-30">🗃️</div>
              <div className="font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#94A3B8" }}>Structured record</div>
              <div className="text-sm" style={{ color: "#CBD5E1", fontFamily: "'Inter', sans-serif" }}>Will appear here after scanning</div>
            </div>
          )}

          {(stage === "uploading" || stage === "preprocessing") && (
            <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full"
              style={{ background: "white", border: "1px solid #E2E8F0", minHeight: "300px" }}>
              <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mb-5" style={{ borderColor: TEAL, borderTopColor: "transparent" }}></div>
              <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Processing image…</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>Applying {stage === "uploading" ? "upload" : "preprocessing"}</div>
            </div>
          )}

          {stage === "ocr" && (
            <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full"
              style={{ background: "white", border: "1px solid #E2E8F0", minHeight: "300px" }}>
              <div className="text-4xl mb-4">🔍</div>
              <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Reading handwriting…</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>OCR engine extracting text</div>
            </div>
          )}

          {stage === "structuring" && (
            <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full"
              style={{ background: "white", border: "1px solid #E2E8F0", minHeight: "300px" }}>
              <div className="text-4xl mb-4">🤖</div>
              <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>AI structuring…</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>Gemini mapping to medical fields</div>
            </div>
          )}

          {stage === "ready" && (
            <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #E2E8F0" }}>
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "#F1F5F9", background: "#FAFBFC" }}>
                <div>
                  <div className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: NAVY }}>Structured Record</div>
                  <div className="text-xs mt-0.5" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>AI-generated · verify before saving</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(11,138,126,0.1)", color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  🤖 AI Draft
                </span>
              </div>

              <div className="p-6 space-y-4">
                {[
                  { label: "Patient Name", key: "patient" },
                  { label: "Patient ID", key: "id" },
                  { label: "Age", key: "age" },
                  { label: "Sex", key: "sex" },
                  { label: "Date", key: "date" },
                  { label: "Diagnosis", key: "diagnosis" },
                  { label: "Symptoms", key: "symptoms" },
                  { label: "Treatment", key: "treatment" },
                  { label: "Notes", key: "notes" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase mb-1.5" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
                    <input
                      value={record[key as keyof typeof record]}
                      onChange={(e) => setRecord(r => ({ ...r, [key]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none"
                      style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: NAVY, fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                ))}

                {saved ? (
                  <div className="w-full py-3 rounded-xl text-center font-bold text-sm" style={{ background: "rgba(11,138,126,0.1)", color: TEAL, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    ✓ Saved! Redirecting to Records…
                  </div>
                ) : (
                  <button onClick={handleSave}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-80"
                    style={{ background: NAVY, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Save Record →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
