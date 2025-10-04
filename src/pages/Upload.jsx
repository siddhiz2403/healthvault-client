import React, { useContext, useState } from 'react';
import { RecordsContext } from '../context/RecordsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const { addRecord } = useContext(RecordsContext);
  const { user } = useContext(AuthContext);
  const [type, setType] = useState('Prescription');
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert('Please login first');
    addRecord({
      type,
      note,
      fileName,
      patientId: user.healthId,
      doctor: 'Self',
      source: 'patient',
      date: new Date().toISOString().split('T')[0],
    });
    alert('Record added to your vault (demo).');
    navigate('/records');
  };

  return (
    <div className="page-card">
      <h1>Upload Record</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, width: '100%', maxWidth: 420, margin: '18px auto' }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Prescription</option>
          <option>Lab Report</option>
          <option>Surgery</option>
          <option>Vaccination</option>
          <option>Other</option>
        </select>
        <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="File name (e.g., report.pdf)" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Notes" rows={4} />
        <button className="cta-btn" type="submit">Upload (Mock)</button>
      </form>
    </div>
  );
}