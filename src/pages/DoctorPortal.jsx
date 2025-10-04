import React, { useContext, useRef, useState, useEffect } from 'react';
import { RecordsContext } from '../context/RecordsContext';
import * as faceapi from 'face-api.js';

export default function DoctorPortal() {
  const { addPending } = useContext(RecordsContext);

  // form state
  const [patientId, setPatientId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileObj, setFileObj] = useState(null);

  // camera & face detection state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [faceImage, setFaceImage] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  const [busy, setBusy] = useState(false);

  // load models from public/models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.load('/models/');
        console.log('✅ Face model loaded successfully');
        setLoadingModels(false);
      } catch (e) {
        console.error('❌ Failed to load model:', e);
        alert('Could not load face detection model. Check if /public/models has the files.');
      }
    };
    loadModels();
  }, []);

  // attach any pending stream
  useEffect(() => {
    if (window.__hv_pending_stream && videoRef.current) {
      try {
        videoRef.current.srcObject = window.__hv_pending_stream;
        videoRef.current.play().catch(() => {
          setTimeout(() => { videoRef.current && videoRef.current.play().catch(()=>{}); }, 200);
        });
        window.__hv_pending_stream = null;
      } catch (e) {
        console.warn('attach pending stream failed', e);
      }
    }
  }, [videoRef.current]);

  // robust startCamera
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return alert('Camera API not supported in this browser.');
      }

      // try facingMode then fallback to any camera
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      } catch (err) {
        console.warn('facingMode failed, falling back to default', err);
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      // attach to video element, try play immediately and retry if blocked
      if (videoRef.current) {
        try {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current.autoplay = true;
          videoRef.current.playsInline = true;
          await videoRef.current.play().catch(() => {
            return new Promise((res) => {
              setTimeout(() => {
                try { videoRef.current && videoRef.current.play().catch(()=>{}); } catch(e){}
                res();
              }, 200);
            });
          });
        } catch (e) {
          console.warn('attach/play attempt failed', e);
          window.__hv_pending_stream = stream;
        }
      } else {
        window.__hv_pending_stream = stream;
      }

      setCameraOn(true);
    } catch (err) {
      console.error('startCamera error', err);
      alert('Unable to access camera. Check permissions or try another browser.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  };

  // capture and detect face
  const captureFace = async () => {
    if (loadingModels) return alert('Please wait — model is still loading.');
    if (!cameraOn) return alert('Please start the camera first.');

    setBusy(true);
    const video = videoRef.current;
    const w = video.videoWidth || 320;
    const h = video.videoHeight || 240;

    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    try {
      const detection = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions());
      if (!detection) {
        setFaceDetected(false);
        alert('⚠️ No face detected! Please ensure your face is clearly visible and well-lit.');
        setBusy(false);
        return;
      }

      const faceArea = detection.box.width * detection.box.height;
      if (faceArea < (w * h * 0.02)) {
        setFaceDetected(false);
        alert('⚠️ Face is too small. Move closer to the camera.');
        setBusy(false);
        return;
      }

      setFaceDetected(true);
      setFaceImage(canvas.toDataURL('image/jpeg'));
      alert('✅ Face captured successfully!');
    } catch (err) {
      console.error('Face capture error:', err);
      alert('Error while detecting face.');
    } finally {
      setBusy(false);
    }
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileObj(f);
      setFileName(f.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientId.trim()) return alert('Please enter patient ID.');
    if (!doctorId.trim()) return alert('Please enter doctor ID.');
    if (!note.trim()) return alert('Please enter record details.');
    if (!fileObj && !fileName) return alert('Please upload a document.');
    if (!faceDetected || !faceImage) return alert('Face must be verified before submitting.');

    const pending = {
      patientId,
      doctor: doctorName,
      doctorId,
      type,
      note,
      faceImage,
      fileName,
      date: new Date().toLocaleDateString(),
    };

    addPending(pending);
    alert('✅ Record submitted successfully for patient approval!');
    stopCamera();
    setPatientId('');
    setNote('');
    setFileName('');
    setFileObj(null);
    setFaceImage(null);
    setFaceDetected(false);
  };

  return (
    <div className="page-card">
      <h1>Doctor Portal</h1>
      <p style={{ color: 'gray', marginTop: 4 }}>
        Submit a patient record — all fields are mandatory. Face verification ensures secure submission.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', maxWidth: '720px', marginTop: '18px' }}>
        <input placeholder="Patient Health ID" value={patientId} onChange={e=>setPatientId(e.target.value)} required />
        <input placeholder="Doctor Name" value={doctorName} onChange={e=>setDoctorName(e.target.value)} required />
        <input placeholder="Doctor Unique ID" value={doctorId} onChange={e=>setDoctorId(e.target.value)} required />
        
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option>Prescription</option>
          <option>Lab Report</option>
          <option>Surgery</option>
          <option>Vaccination</option>
        </select>

        <textarea placeholder="Record Details" value={note} onChange={e=>setNote(e.target.value)} rows={4} required />

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input type="file" accept=".pdf,image/*" onChange={onFileChange} required />
          {fileName && <span style={{ color: '#555', fontSize: '14px' }}>📄 {fileName}</span>}
        </div>

        {/* Camera Section */}
        <div style={{ display: 'grid', gap: '10px', marginTop: '8px' }}>
          {!cameraOn ? (
            <button type="button" className="cta-btn" onClick={startCamera}>Open Camera</button>
          ) : (
            <button type="button" onClick={stopCamera}>Stop Camera</button>
          )}

          <button type="button" onClick={captureFace} disabled={busy}>Capture Face</button>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {cameraOn ? (
              <video ref={videoRef} autoPlay muted playsInline style={{ width: 160, height: 120, borderRadius: 8, background: '#000' }} />
            ) : (
              <div style={{ width: 160, height: 120, borderRadius: 8, background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                Camera Off
              </div>
            )}
            {faceImage ? (
              <img src={faceImage} alt="Captured Face" style={{ width: 160, height: 120, borderRadius: 8, border: '1px solid #ddd' }} />
            ) : (
              <div style={{ width: 160, height: 120, borderRadius: 8, background: '#fff', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                No Face Captured
              </div>
            )}
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <button type="submit" className="cta-btn" style={{ marginTop: '12px' }}>Submit Record</button>
      </form>
    </div>
  );
}
