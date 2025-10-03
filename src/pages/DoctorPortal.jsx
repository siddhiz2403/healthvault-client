// src/pages/DoctorPortal.jsx
import React, { useContext, useState } from 'react';
import { RecordsContext } from '../context/RecordsContext';

export default function DoctorPortal() {
  const { addPending } = useContext(RecordsContext);
  const [patientId, setPatientId] = useState('');
  const [doctor, setDoctor] = useState('Dr. Sharma');
  const [type, setType] = useState('Prescription');
  const [note, setNote] = useState('');
  const [biometric, setBiometric] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId) return alert('Enter patient Health ID');
    addPending({ patientId, doctor, type, note, biometric, date: new Date().toISOString().split('T')[0] });
    alert('Submission sent (pending patient approval)');
    setPatientId(''); setNote(''); setBiometric(false);
  };

  return (
    <div className="page-card">
      <h1>Doctor Portal (Demo)</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 420, margin: '18px auto' }}>
        <input value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient Health ID" />
        <input value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Doctor name" />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Prescription</option>
          <option>Lab Report</option>
          <option>Surgery</option>
          <option>Vaccination</option>
        </select>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Details" rows={4} />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={biometric} onChange={(e) => setBiometric(e.target.checked)} /> Simulate doctor biometric verification
        </label>
        <button className="cta-btn" type="submit">Submit for Patient Approval</button>
      </form>
    </div>
  );
}
