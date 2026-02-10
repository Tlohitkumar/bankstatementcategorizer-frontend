import { useState } from "react";
import "./App.css";
import UploadFile from "./UploadFile";
import Transactions from "./Transactions";
import CategoryChart from "./CategoryChart";
import MonthlyChart from "./MonthlyChart";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container">
      <h2>Bank Statement Transaction System</h2>

      <div className="section">
        <UploadFile onUploadSuccess={() => setRefresh(refresh + 1)} />
      </div>

      <div className="section">
        <Transactions refresh={refresh} />
      </div>

      <div className="section">
        <CategoryChart />
      </div>

      <div className="section">
        <MonthlyChart />
      </div>
    </div>
  );
}

export default App;
