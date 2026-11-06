import { useState } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ScanRecord from "./pages/ScanRecord";
import Records from "./pages/Records";
import Nav from "./components/Nav";

type Page = "landing" | "dashboard" | "scan" | "records";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  if (page === "landing") {
    return <Landing onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "#EBF2F7" }}>
      <Nav page={page} onNavigate={navigate} />
      {page === "dashboard" && <Dashboard onNavigate={navigate} />}
      {page === "scan" && <ScanRecord onNavigate={navigate} />}
      {page === "records" && <Records onNavigate={navigate} />}
    </div>
  );
}
