// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [healthId, setHealthId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!healthId || !password) return alert('Enter Health ID and password');
    // Mock login – in real app you'd verify on server
    login({ healthId, name: `Patient ${healthId.slice(-4)}` });
    navigate('/dashboard');
  };

  return (
    <div className="page-card">
      <h1>Patient Login</h1>
      <p style={{ color: 'var(--muted)' }}>Login with your Health ID (demo)</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, width: '100%', maxWidth: 420, margin: '18px auto' }}>
        <input value={healthId} onChange={(e) => setHealthId(e.target.value)} placeholder="Health ID"/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="cta-btn" type="submit">Login</button>
      </form>

      <p style={{ color: 'var(--muted)' }}>Demo: any Health ID + password will log in.</p>
    </div>
  );
}
