// client/src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { RecordsContext } from "../context/RecordsContext";

export default function Dashboard() {
  const { records = [], pending = [] } = useContext(RecordsContext);

  const [totalRecords, setTotalRecords] = useState(0);
  const [approvedRecords, setApprovedRecords] = useState(0);
  const [pendingRecords, setPendingRecords] = useState(0);

  useEffect(() => {
    // records = already-approved / self records
    // pending = doctor-submitted awaiting approval
    const total = (records?.length || 0) + (pending?.length || 0);
    const approved = (records?.length || 0); // records array contains approved/self entries
    const pend = (pending?.length || 0);

    setTotalRecords(total);
    setApprovedRecords(approved);
    setPendingRecords(pend);
  }, [records, pending]);

  return (
    <div className="dashboard-container">
      <h2>📊 HealthVault Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card total">
          <h3>Total Records</h3>
          <p>{totalRecords}</p>
        </div>
        <div className="card approved">
          <h3>Approved Records</h3>
          <p>{approvedRecords}</p>
        </div>
        <div className="card pending">
          <h3>Pending Records</h3>
          <p>{pendingRecords}</p>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "18px auto 0", color: "#666", fontSize: 14 }}>
        <p style={{ margin: 0 }}>
          <strong>Note:</strong> “Approved” includes records added by the patient (self) and those approved from doctor submissions.
        </p>
      </div>
    </div>
  );
}
