import React, { useState, useContext } from "react";
import { RecordsContext } from "../context/RecordsContext";

export default function Upload() {
  const { addRecord } = useContext(RecordsContext);
  const [form, setForm] = useState({
    patientId: "",
    doctor: "",
    type: "",
    details: "",
    file: null,
    fileName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // convert file to base64 (so we can save & view later)
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          file: reader.result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if all mandatory fields are filled
    if (
      !form.patientId.trim() ||
      !form.doctor.trim() ||
      !form.type.trim() ||
      !form.details.trim() ||
      !form.file
    ) {
      alert("⚠ Please fill all fields and upload a file before submitting.");
      return;
    }

    addRecord({
      id: Date.now(),
      patientId: form.patientId,
      doctor: form.doctor,
      type: form.type,
      details: form.details,
      date: new Date().toISOString().split("T")[0],
      file: form.file,
      fileName: form.fileName,
      source: "self",
    });

    alert("✅ Record uploaded successfully!");
    setForm({
      patientId: "",
      doctor: "",
      type: "",
      details: "",
      file: null,
      fileName: "",
    });
  };

  return (
    <div className="upload-page">
      <h2>📤 Upload New Record</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>
          Patient Health ID:
          <input
            type="text"
            name="patientId"
            placeholder="Enter your HealthVault ID"
            value={form.patientId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Doctor Name:
          <input
            type="text"
            name="doctor"
            placeholder="Enter doctor name"
            value={form.doctor}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Record Type:
          <input
            type="text"
            name="type"
            placeholder="E.g. Prescription, Lab Report..."
            value={form.type}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Details / Notes:
          <textarea
            name="details"
            placeholder="Describe the report or prescription details"
            value={form.details}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Upload File:
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
          />
          {form.fileName && (
            <p style={{ fontSize: "13px", color: "#555" }}>
              📎 Selected File: {form.fileName}
            </p>
          )}
        </label>

        <button type="submit" className="cta-btn">
          Upload Record
        </button>
      </form>
    </div>
  );
}