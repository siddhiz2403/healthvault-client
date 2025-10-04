import React, { useContext, useState } from 'react';
import { RecordsContext } from '../context/RecordsContext';
import { AuthContext } from '../context/AuthContext';
import RecordModal from '../components/RecordModal';

export default function MyRecords() {
  const { records } = useContext(RecordsContext);
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);

  const myRecords = records.filter(r => r.patientId === user?.healthId);

  return (
    <div className="page-card">
      <h1>My Health Records</h1>

      {myRecords.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No records yet.</p>
      ) : (
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e6f2fb', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Type</th>
              <th style={{ padding: '8px' }}>Source</th>
              <th style={{ padding: '8px' }}>Doctor</th>
              <th style={{ padding: '8px' }}>Date</th>
              <th style={{ padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myRecords.map((rec) => (
              <tr key={rec.id} style={{ borderBottom: '1px solid #eef6fb' }}>
                <td style={{ padding: '8px' }}>{rec.type}</td>
                <td style={{ padding: '8px' }}>{rec.source || (rec.doctor === 'Self' ? 'Patient' : 'Doctor')}</td>
                <td style={{ padding: '8px' }}>{rec.doctor}</td>
                <td style={{ padding: '8px' }}>{rec.date}</td>
                <td style={{ padding: '8px' }}>
                  <button className="cta-btn" style={{ padding: '6px 12px' }} onClick={() => setSelected(rec)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <RecordModal record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}