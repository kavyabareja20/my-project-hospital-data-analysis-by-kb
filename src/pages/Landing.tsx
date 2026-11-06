type Page = "landing" | "dashboard" | "scan" | "records";

interface LandingProps {
  onNavigate: (p: Page) => void;
}

const WORKFLOW_STEPS = [
  { num: "01", icon: "📷", title: "Capture", desc: "Photograph the register page with any phone camera." },
  { num: "02", icon: "⚙️", title: "Preprocess", desc: "OpenCV corrects skew, boosts contrast, removes noise." },
  { num: "03", icon: "🔍", title: "Extract", desc: "OCR engine reads handwritten text with high accuracy." },
  { num: "04", icon: "🤖", title: "Structure", desc: "Gemini AI maps raw text to standard medical fields." },
  { num: "05", icon: "🗃️", title: "Archive", desc: "Records saved, searchable, and exportable as CSV." },
];

const FEATURES = [
  { icon: "🏥", title: "Built for rural clinics", desc: "No internet required in demo mode. Works on any device with a camera." },
  { icon: "🔒", title: "HIPAA-aware design", desc: "Synthetic demo data by default. Zero PHI leaves the device in demo mode." },
  { icon: "📊", title: "Searchable records", desc: "Filter by patient name, date, diagnosis, or treatment. Export to CSV." },
  { icon: "✏️", title: "Human-in-the-loop", desc: "AI suggestions are editable. Every record is verified before saving." },
  { icon: "⚡", title: "Instant processing", desc: "Upload to structured record in under 10 seconds on average." },
  { icon: "📈", title: "Diagnosis analytics", desc: "Track trends across date ranges and identify common conditions." },
];

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen" style={{ background: "#EBF2F7" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(235,242,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #CBD5E1" }}
        className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#0D1B2A" }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white" opacity="0.9"/>
                <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#0B8A7E"/>
                <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#0B8A7E"/>
                <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-sm leading-none tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A" }}>MedOCR</div>
              <div className="text-[10px] tracking-[0.2em] font-semibold mt-0.5" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>REGISTERS → DATA</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "#475569", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <a href="#workflow" className="hover:text-[#0D1B2A] transition-colors">How it works</a>
            <a href="#features" className="hover:text-[#0D1B2A] transition-colors">Features</a>
            <a href="#why" className="hover:text-[#0D1B2A] transition-colors">Why MedOCR</a>
            <button onClick={() => onNavigate("dashboard")} className="hover:text-[#0D1B2A] transition-colors">About</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate("dashboard")} className="text-sm font-semibold hidden md:block" style={{ color: "#0D1B2A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              View Demo
            </button>
            <button
              onClick={() => onNavigate("scan")}
              className="text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ background: "#0D1B2A", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Scan a Record <span>→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-sm font-medium"
            style={{ background: "rgba(11,138,126,0.08)", border: "1px solid rgba(11,138,126,0.2)", color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#0B8A7E" }}></span>
            Built for rural clinics · Photo-first workflow
          </div>

          {/* Heading */}
          <h1 className="leading-[1.05] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4rem)", color: "#0D1B2A", letterSpacing: "-0.02em" }}>
            From{" "}
            <em style={{ color: "#0B8A7E", fontStyle: "italic" }}>handwritten</em>{" "}
            <br className="hidden md:block" />registers
            <br />
            to{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span>digital</span>
              <span style={{ position: "absolute", bottom: "-2px", left: 0, right: 0, height: "3px", background: "#0B8A7E", borderRadius: "2px" }}></span>
            </span>{" "}
            healthcare
            <br />data.
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "#475569", fontFamily: "'Inter', sans-serif", maxWidth: "440px" }}>
            Rural clinics keep decades of patient history on paper. MedOCR turns a phone photo of a handwritten register into structured, searchable records — without asking anyone to change how they already work.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => onNavigate("scan")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-opacity hover:opacity-85"
              style={{ background: "#0D1B2A", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              📷 Scan a Record
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-white"
              style={{ border: "1.5px solid #0D1B2A", color: "#0D1B2A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View Demo →
            </button>
          </div>

          <div className="flex flex-wrap gap-5 text-sm" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#0B8A7E" opacity=".3" stroke="#0B8A7E" strokeWidth="1.5"/></svg>
              Synthetic demo data · HIPAA-safe
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0B8A7E" opacity=".3" stroke="#0B8A7E" strokeWidth="1.5"/></svg>
              Works offline in Demo Mode
            </span>
          </div>
        </div>

        {/* Mock browser preview */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "white", border: "1px solid #E2E8F0" }}>
            {/* Browser bar */}
            <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }}></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs px-3 py-1 rounded" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
                  medocr / scan / RHC-2451
                </span>
              </div>
            </div>

            {/* Content panels */}
            <div className="grid grid-cols-2 min-h-64">
              {/* Left: Handwritten */}
              <div className="p-4 border-r" style={{ borderColor: "#F1F5F9" }}>
                <div className="text-[10px] font-semibold tracking-widest mb-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>HANDWRITTEN INPUT</div>
                <div className="text-sm leading-relaxed" style={{ fontFamily: "'Caveat', cursive", color: "#334155", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  <div>Date: 12/02/2026</div>
                  <div>Patient: Anita Sharma</div>
                  <div>Age 34 Sex F</div>
                  <div>Complaints: fever,</div>
                  <div>&nbsp;&nbsp;headache, body ache</div>
                  <div>Dx: Viral fever</div>
                  <div>Rx: Paracetamol 500 TID,</div>
                  <div>&nbsp;&nbsp;ORS, fluids</div>
                </div>
              </div>

              {/* Right: Structured */}
              <div className="p-4">
                <div className="text-[10px] font-semibold tracking-widest mb-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>STRUCTURED RECORD</div>
                <div className="space-y-2 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {[
                    { label: "PATIENT", value: "Anita Sharma" },
                    { label: "ID", value: "RHC-2451" },
                    { label: "AGE / SEX", value: "34 · Female" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", letterSpacing: "0.05em" }}>{label}</span>
                      <span style={{ color: "#0D1B2A", fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", letterSpacing: "0.05em" }}>DIAGNOSIS</span>
                    <span className="px-2 py-0.5 rounded text-white text-[10px] font-semibold" style={{ background: "#0B8A7E" }}>Viral fever</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", letterSpacing: "0.05em" }}>SYMPTOMS</span>
                    <span style={{ color: "#0D1B2A", fontWeight: 500, textAlign: "right" }}>fever · headache<br/>· body ache</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", letterSpacing: "0.05em" }}>TREATMENT</span>
                    <span style={{ color: "#0D1B2A", fontWeight: 500 }}>Paracetamol · ORS</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
                  style={{ background: "rgba(11,138,126,0.08)", color: "#0B8A7E", border: "1px solid rgba(11,138,126,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ✓ Structured by AI · verify before save
                </button>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg"
            style={{ background: "white", color: "#0D1B2A", border: "1px solid #E2E8F0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            🟢 Demo Mode Active
          </div>
        </div>
      </section>

      {/* Workflow section */}
      <section id="workflow" className="py-20 border-t" style={{ borderColor: "#CBD5E1" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
            <div>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>THE WORKFLOW</div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A", letterSpacing: "-0.02em" }}>
                Five steps.<br />One photo.
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>
              Clinics keep using their paper registers. MedOCR runs alongside as a lightweight digitisation layer — not a replacement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.num} className="rounded-2xl p-5 flex flex-col gap-3 transition-transform hover:-translate-y-1"
                style={{ background: "white", border: "1px solid #E2E8F0" }}>
                <div className="text-2xl">{step.icon}</div>
                <div className="text-[10px] font-bold tracking-widest" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.num}</div>
                <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A" }}>{step.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>FEATURES</div>
            <h2 className="text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A", letterSpacing: "-0.02em" }}>
              Everything a clinic needs.
              <br /><span style={{ color: "#0B8A7E" }}>Nothing it doesn&apos;t.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
                style={{ background: "white", border: "1px solid #E2E8F0" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A" }}>{f.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MedOCR section */}
      <section id="why" className="py-20 border-t" style={{ borderColor: "#CBD5E1" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center"
            style={{ background: "#0D1B2A" }}>
            <div>
              <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WHY MEDOCR</div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "white", letterSpacing: "-0.02em" }}>
                Paper isn&apos;t going away.<br />
                <span style={{ color: "#14B8A6" }}>That&apos;s okay.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
                Most digitisation projects fail because they force clinics to change workflows overnight. MedOCR layers on top of existing paper processes — photo in, structured record out. No training required.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[["1.2B+", "people served by rural clinics globally"], ["94%", "OCR accuracy on standard handwriting"], ["&lt;10s", "average processing time per record"], ["Zero", "workflow changes required"]].map(([stat, label]) => (
                  <div key={stat}>
                    <div className="text-2xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "white" }} dangerouslySetInnerHTML={{ __html: stat }} />
                    <div className="text-xs" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { q: "Does it replace our paper register?", a: "No. You keep writing in paper as always. MedOCR just photographs and digitises a copy." },
                { q: "What if the AI gets it wrong?", a: "Every AI-structured record shows a verification screen before saving. You review and edit first." },
                { q: "Does it need internet?", a: "Demo mode works fully offline. Production mode uses a secure cloud API for AI structuring." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="font-semibold text-sm mb-1.5" style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{q}</div>
                  <div className="text-sm" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A", letterSpacing: "-0.02em" }}>
            Start digitising today.
          </h2>
          <p className="text-lg mb-8" style={{ color: "#64748B", fontFamily: "'Inter', sans-serif" }}>
            No signup required. Open the demo and scan your first record in under a minute.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate("scan")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-85"
              style={{ background: "#0D1B2A", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              📷 Scan a Record
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-white"
              style={{ border: "1.5px solid #0D1B2A", color: "#0D1B2A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View Dashboard →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: "#CBD5E1" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
          <div>© 2026 MedOCR · Demo project · Not for clinical use</div>
          <div className="text-xs">⚠️ This is a demonstration. Not a certified medical device. All data is synthetic.</div>
        </div>
      </footer>
    </div>
  );
}
