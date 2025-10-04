import React from 'react';

export default function RecordModal({ record, onClose }) {
  if (!record) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{record.type} — {record.fileName || ''}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <div><strong>Patient ID:</strong> {record.patientId}</div>
          <div><strong>Doctor:</strong> {record.doctor}</div>
          <div><strong>Date:</strong> {record.date}</div>
          {record.source && <div><strong>Source:</strong> {record.source}</div>}
          {record.note && <div style={{ marginTop: 8 }}><strong>Notes</strong><p>{record.note}</p></div>}
          {record.fileName && <div style={{ marginTop: 8 }}><strong>File:</strong> {record.fileName}</div>}
        </div>

        <div style={{ marginTop: 14, textAlign: 'right' }}>
          <button className="cta-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
