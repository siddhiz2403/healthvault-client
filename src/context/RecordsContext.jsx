// src/context/RecordsContext.jsx
import React, { createContext, useEffect, useState } from 'react';

export const RecordsContext = createContext();

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hv_records')) || [];
    } catch {
      return [];
    }
  });

  const [pending, setPending] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hv_pending')) || [];
    } catch {
      return [];
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
    // remove from pending
    setPending(prev => prev.filter(x => x.id !== id));
    // add to records with source 'doctor' and approvedAt
    setRecords(prev => [{ ...item, approvedAt: new Date().toISOString(), source: 'doctor' }, ...prev]);
  };

  const denyPending = (id) => {
    setPending(prev => prev.filter(x => x.id !== id));
  };

  return (
    <RecordsContext.Provider value={{
      records,
      pending,
      addRecord,
      addPending,
      approvePending,
      denyPending
    }}>
      {children}
    </RecordsContext.Provider>
  );
}
