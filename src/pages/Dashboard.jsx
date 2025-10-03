// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Features from '../components/Features';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="page-card" style={{ textAlign: 'left' }}>
        <h1>Welcome, {user?.name || 'Patient'}</h1>
        <p style={{ color: 'var(--muted)' }}>Health ID: {user?.healthId}</p>
        <div style={{ marginTop: 12 }}>
          <strong>Total records:</strong> 0
        </div>
      </div>

      <div style={{ height: 18 }} />

      <div className="page-card">
        <h2 style={{ marginTop: 0 }}>Quick Features</h2>
        <Features />
      </div>
    </div>
  );
}
