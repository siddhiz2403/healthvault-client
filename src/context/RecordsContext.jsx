// src/context/RecordsContext.jsx
import React, { createContext, useEffect, useState } from 'react';

export const RecordsContext = createContext();

const demoRecords = [
  {
    id: 1001,
    patientId: 'HV1234',
    type: 'Prescription',
    doctor: 'Dr. Mehta',
    date: '2025-09-20',
    note: 'Paracetamol 500mg - 3 times a day for 5 days',
    fileName: 'prescription_mehta_20250920.pdf',
    source: 'doctor'
  },
  {
    id: 1002,
    patientId: 'HV1234',
    type: 'Lab Report',
    doctor: 'Dr. Kapoor',
    date: '2025-09-28',
    note: 'CBC normal. No anomalies.',
    fileName: 'cbc_20250928.pdf',
    source: 'doctor'
  }
];

const demoPending = [
  {
    id: 2001,
    patientId: 'HV1234',
    type: 'Prescription',
    doctor: 'Dr. Sharma',
    date: '2025-10-02',
    note: 'Azithromycin 500mg - 3 days (demo pending)',
    biometric: true
  }
];

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('hv_records'));
      if (raw && raw.length) return raw;
      localStorage.setItem('hv_records', JSON.stringify(demoRecords));
      return demoRecords;
    } catch {
      return demoRecords;
    }
  });

  const [pending, setPending] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('hv_pending'));
      if (raw && raw.length) return raw;
      localStorage.setItem('hv_pending', JSON.stringify(demoPending));
      return demoPending;
    } catch {
      return demoPending;
    }
  });

  useEffect(() => {
    localStorage.setItem('hv_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('hv_pending', JSON.stringify(pending));
  }, [pending]);

  const addRecord = (record) => {
    const r = {
      ...record,
      id: Date.now(),
      date: record.date || new Date().toISOString().split('T')[0],
    };
    setRecords(prev => [r, ...prev]);
  };

  const addPending = (p) => {
    const item = {
      ...p,
      id: Date.now(),
      date: p.date || new Date().toISOString().split('T')[0],
    };
    setPending(prev => [item, ...prev]);
  };

  const approvePending = (id) => {
    const item = pending.find(x => x.id === id);
    if (!item) return;
    setPending(prev => prev.filter(x => x.id !== id));
    // when approving, push into records
    setRecords(prev => [{ ...item, approvedAt: new Date().toISOString(), source: 'doctor' }, ...prev]);
  };

  const denyPending = (id) => {
    setPending(prev => prev.filter(x => x.id !== id));
  };

  // NEW: remove record (by id)
  const removeRecord = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <RecordsContext.Provider value={{
      records,
      pending,
      addRecord,
      addPending,
      approvePending,
      denyPending,
      removeRecord,
      // expose setter only if you need it (avoid direct usage)
      setRecords
    }}>
      {children}
    </RecordsContext.Provider>
  );
}