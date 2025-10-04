import React from "react";

export default function About() {
  return (
    <div className="page-card">
      <h1>About HealthVault</h1>
      <p>
        <strong>HealthVault</strong> is a secure digital vault designed to store,
        manage, and share your medical records in one place. Each patient is
        assigned a unique <strong>Health ID</strong>, which acts as the key to
        their medical history.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>
          <strong>For Patients:</strong> Login with your Health ID to access
          your prescriptions, lab reports, vaccination history, and more — all
          updated in real-time.
        </li>
        <li>
          <strong>For Doctors:</strong> Use the Doctor Portal to securely upload
          diagnoses, treatments, and prescriptions. Records are linked to the
          patient’s Health ID and require patient approval before being saved.
        </li>
        <li>
          <strong>Secure & Verified:</strong> Every doctor submission can be
          tied to a verified account and biometric confirmation to prevent fraud
          or malpractice.
        </li>
      </ul>

      <h2>Why HealthVault?</h2>
      <p>
        Healthcare information is often fragmented across clinics and hospitals.
        HealthVault brings it together in a single, government-verifiable
        profile. Patients always stay in control of their data — no record is
        added without their consent.
      </p>

      <h2>Our Vision</h2>
      <p>
        To make health records as easy to access as your ID in DigiLocker,
        ensuring transparency, reducing scams, and empowering patients with a
        360° view of their medical history.
      </p>
    </div>
  );
}