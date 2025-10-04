import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function storageKey(healthId) {
  return `hv_profile_${healthId}`;
}

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (!user?.healthId) return;
    try {
      const raw = localStorage.getItem(storageKey(user.healthId));
      if (raw) setProfile(JSON.parse(raw));
      else setProfile(prev => ({ ...prev, name: user.name || '' }));
    } catch (e) { }
  }, [user]);

  const save = () => {
    if (!user?.healthId) return alert('Please login first');
    localStorage.setItem(storageKey(user.healthId), JSON.stringify(profile));
    alert('Profile saved (demo).');
  };

  return (
    <div className="page-card">
      <h1>My Profile</h1>
      {!user ? (
        <p style={{ color: 'var(--muted)' }}>Please log in to edit your profile.</p>
      ) : (
        <div style={{ width: '100%', maxWidth: 520, margin: '12px auto' }}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Full name
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Age
            <input value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Gender
            <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Blood Group
            <input value={profile.bloodGroup} onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })} placeholder="e.g., B+" />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Phone
            <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            Email
            <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </label>

          <div style={{ marginTop: 12 }}>
            <button className="cta-btn" onClick={save}>Save Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}
