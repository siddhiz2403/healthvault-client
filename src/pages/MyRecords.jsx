// src/pages/MyRecords.jsx
import React, { useContext, useState } from 'react';
import { RecordsContext } from '../context/RecordsContext';
import RecordModal from '../components/RecordModal';

export default function MyRecords() {
  const { records, removeRecord } = useContext(RecordsContext);
  const [selected, setSelected] = useState(null);

  if (!records) return <div className="page-card"><p>Loading...</p></div>;

  return (
    <div className="page-card">
      <h1>My Health Records</h1>

      {records.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No records yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {records.map((rec) => (
            <div key={rec.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eef6fb', padding: 12, borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{rec.type} {rec.fileName ? <small style={{ marginLeft: 8, color:'#666' }}>({rec.fileName})</small> : null}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>{rec.doctor} · {rec.date}</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="cta-btn" onClick={() => setSelected(rec)}>Details</button>
                <button style={{ background:'#ef4444', color:'#fff', border:'none', padding:'8px 10px', borderRadius:8, cursor:'pointer' }}
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this record?')) {
                            removeRecord(rec.id);
                            alert('Record deleted.');
                          }
                        }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal to show full details */}
      <RecordModal record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}