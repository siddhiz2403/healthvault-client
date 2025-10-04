import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="page-card">
        <h2 style={{ marginTop: 0 }}>Welcome to HealthVault</h2>
        <p style={{ color: 'var(--muted)' }}>
          Securely store and manage prescriptions, lab reports, vaccination records and full medical history — all tied to your unique Health ID.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Secure</strong>
            <p style={{ margin: 6, color: 'var(--muted)' }}>Encrypted local demo (replace with backend for production).</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Patient first</strong>
            <p style={{ margin: 6, color: 'var(--muted)' }}>Records require patient approval before moving to their vault.</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Fast demo</strong>
            <p style={{ margin: 6, color: 'var(--muted)' }}>Seeded demo records let judges try the full flow immediately.</p>
          </div>
        </div>
      </div>
    </>
  );
}
