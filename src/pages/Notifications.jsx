import React, { useContext } from 'react';
import { RecordsContext } from '../context/RecordsContext';
import { AuthContext } from '../context/AuthContext';

export default function Notifications() {
  const { pending, approvePending, denyPending } = useContext(RecordsContext);
  const { user } = useContext(AuthContext);

  const myPending = pending.filter(p => p.patientId === user?.healthId);

  if (!user) return <div className="page-card"><p>Please login to view notifications.</p></div>;

  return (
    <div className="page-card">
      <h1>Notifications</h1>
      {myPending.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No pending submissions.</p>
      ) : (
        myPending.map(p => (
          <div key={p.id} style={{ border: '1px solid #e6e6e6', padding: 12, marginTop: 12, borderRadius: 8, textAlign: 'left' }}>
            <div><strong>{p.type}</strong> &middot; {p.doctor} &middot; {p.date}</div>
            <div style={{ marginTop: 8 }}>{p.note}</div>
            <div style={{ marginTop: 8 }}>
              <button className="cta-btn" onClick={() => approvePending(p.id)} style={{ marginRight: 8 }}>Approve</button>
              <button onClick={() => denyPending(p.id)} style={{ padding: '8px 12px' }}>Deny</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}