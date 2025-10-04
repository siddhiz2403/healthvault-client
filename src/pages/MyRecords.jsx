import React, { useContext, useState, useEffect } from "react";
import { RecordsContext } from "../context/RecordsContext";
import RecordModal from "../components/RecordModal";

export default function MyRecords() {
  const { records, removeRecord } = useContext(RecordsContext);
  const [selected, setSelected] = useState(null);
  const [deletedRecord, setDeletedRecord] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  // auto-hide undo snackbar after 5 sec if not clicked
  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => {
        if (deletedRecord) {
          removeRecord(deletedRecord.id);
        }
        setShowUndo(false);
        setDeletedRecord(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndo, deletedRecord, removeRecord]);

  const handleDelete = (rec) => {
    // remove visually but keep backup for undo
    setDeletedRecord(rec);
    setShowUndo(true);
  };

  const handleUndo = () => {
    if (deletedRecord) {
      // restore record by just adding it back to localStorage
      const existing = JSON.parse(localStorage.getItem("hv_records")) || [];
      const updated = [deletedRecord, ...existing];
      localStorage.setItem("hv_records", JSON.stringify(updated));
      window.location.reload(); // quick refresh to sync context
    }
    setShowUndo(false);
    setDeletedRecord(null);
  };

  if (!records) return <div className="page-card"><p>Loading...</p></div>;

  return (
    <div className="page-card">
      <h1>My Health Records</h1>

      {records.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No records yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {records.map((rec) => (
            <div
              key={rec.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #eef6fb",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>
                  {rec.type}{" "}
                  {rec.fileName ? (
                    <small style={{ marginLeft: 8, color: "#666" }}>
                      ({rec.fileName})
                    </small>
                  ) : null}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {rec.doctor} · {rec.date}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="cta-btn" onClick={() => setSelected(rec)}>
                  Details
                </button>
                <button
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "8px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(rec)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal for details */}
      <RecordModal record={selected} onClose={() => setSelected(null)} />

      {/* Snackbar for Undo */}
      {showUndo && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#333",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 9999,
          }}
        >
          <span>Record deleted</span>
          <button
            onClick={handleUndo}
            style={{
              background: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "5px",
              padding: "3px 10px",
              cursor: "pointer",
            }}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}