import { useState } from "react";
import "./App.css";
import UploadFile from "./UploadFile";
import Transactions from "./Transactions";
import CategoryChart from "./CategoryChart";
import MonthlyChart from "./MonthlyChart";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-header-left">
          <div className="header-logo">💳</div>
          <div>
            <div className="app-title">
              Bank<span>Statement</span>
            </div>
            <div className="app-subtitle">Transaction Analytics</div>
          </div>
        </div>
        <div className="header-badge">LIVE DASHBOARD</div>
      </header>

      <div className="dashboard-grid">
        {/* ── Upload ── */}
        <UploadFile onUploadSuccess={() => setRefresh(refresh + 1)} />

        {/* ── Transactions Table ── */}
        <Transactions refresh={refresh} />

        {/* ── Charts ── */}
        <div className="charts-row">
          <CategoryChart />
          <MonthlyChart />
        </div>
      </div>
    </div>
  );
}

export default App;