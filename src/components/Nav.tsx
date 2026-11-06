type Page = "landing" | "dashboard" | "scan" | "records";

interface NavProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

export default function Nav({ page, onNavigate }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(235,242,247,0.92)", backdropFilter: "blur(12px)", borderColor: "#CBD5E1" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#0D1B2A" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-sm leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0D1B2A" }}>MedOCR</div>
            <div className="text-xs tracking-widest" style={{ color: "#0B8A7E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>REGISTERS → DATA</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "#475569" }}>
          <button onClick={() => onNavigate("dashboard")} className={`transition-colors hover:text-[#0D1B2A] ${page === "dashboard" ? "text-[#0D1B2A] font-semibold" : ""}`}>Dashboard</button>
          <button onClick={() => onNavigate("scan")} className={`transition-colors hover:text-[#0D1B2A] ${page === "scan" ? "text-[#0D1B2A] font-semibold" : ""}`}>Scan Record</button>
          <button onClick={() => onNavigate("records")} className={`transition-colors hover:text-[#0D1B2A] ${page === "records" ? "text-[#0D1B2A] font-semibold" : ""}`}>Records</button>
        </div>

        <button
          onClick={() => onNavigate("scan")}
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-80 flex items-center gap-1.5"
          style={{ background: "#0D1B2A", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span>📷</span> Scan a Record
        </button>
      </div>
    </nav>
  );
}
