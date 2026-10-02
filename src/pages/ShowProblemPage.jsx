import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Camera, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Trash2,
  FolderOpen,
  RotateCcw,
  Eye,
  RefreshCw,
  AlertTriangle,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { diagnosisService } from '../services/diagnosisService';
import { ScannerAnimation } from '../components/common/ScannerAnimation';
import { PRODUCT_CATEGORIES } from '../data/mockDiagnoses';

export const ShowProblemPage = () => {
  const navigate = useNavigate();
  const { setCurrentDiagnosis } = useApp();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form State
  const [category, setCategory] = useState('appliances');
  const [productName, setProductName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [mediaType, setMediaType] = useState('image'); // 'image' | 'video'

  // Camera & File Input References & States
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (rear) | 'user' (front)
  const [isCapturing, setIsCapturing] = useState(false);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Single reliable effect to bind MediaStream to the video element and ensure playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cameraStream) return;

    let isSubscribed = true;

    try {
      if (video.srcObject !== cameraStream) {
        video.srcObject = cameraStream;
      }
      video.muted = true;
      video.playsInline = true;

      const triggerPlay = () => {
        if (!isSubscribed) return;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (isSubscribed) setIsVideoPlaying(true);
            })
            .catch((err) => {
              console.warn('Camera video play deferred:', err);
            });
        }
      };

      video.onloadedmetadata = triggerPlay;
      video.oncanplay = triggerPlay;
      video.onplaying = () => {
        if (isSubscribed) setIsVideoPlaying(true);
      };

      triggerPlay();
    } catch (err) {
      console.warn('Failed to bind stream to video element:', err);
    }

    return () => {
      isSubscribed = false;
      if (video) {
        video.onloadedmetadata = null;
        video.oncanplay = null;
        video.onplaying = null;
      }
    };
  }, [cameraStream, isLiveCameraActive]);

  // Clean up all camera tracks on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Voice Simulation State
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Diagnostic Detail Questions
  const [details, setDetails] = useState({
    whenStarted: 'A few days ago',
    workingPartially: 'Turns on but runs poorly',
    wasDropped: 'No',
    unusualSound: 'Humming / Vibrating',
    unusualSmell: 'No smell',
    visibleDamage: 'None visible externally'
  });

  // Sample quick templates for instant demo
  const samplePresets = [
    {
      name: 'Ceiling Fan (Slow Speed)',
      category: 'appliances',
      productName: 'Orient Electric Apex Ceiling Fan',
      modelNumber: 'APEX-1200-BR',
      description: 'The fan hums and rotates very slowly even at max speed 5 regulator setting.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      sound: 'Humming / Vibrating'
    },
    {
      name: 'Ergonomic Chair (Sinks)',
      category: 'furniture',
      productName: 'Green Soul Monster Chair',
      modelNumber: 'GS-734U-BLK',
      description: 'The chair slowly sinks to the lowest height setting whenever I sit down on it.',
      image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=500&auto=format&fit=crop&q=80',
      sound: 'None'
    },
    {
      name: 'Microwave (Plate Stuck)',
      category: 'appliances',
      productName: 'LG 28L Convection Microwave',
      modelNumber: 'MC2846SL',
      description: 'Microwave heats normally, but glass turntable plate jerks or does not spin.',
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80',
      sound: 'Clicking / Grinding'
    },
    {
      name: 'Laptop (Overheating Fan)',
      category: 'laptop_pc',
      productName: 'Dell XPS 15 (9570)',
      modelNumber: 'DELL-7590-4K',
      description: 'Laptop fan screams at full speed while idle and throttles CPU heavily.',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80',
      sound: 'High-pitched screaming fan'
    }
  ];

  const handleApplyPreset = (preset) => {
    setCategory(preset.category);
    setProductName(preset.productName);
    setModelNumber(preset.modelNumber);
    setProblemDescription(preset.description);
    setImagePreview(preset.image);
    setMediaType('image');
    setDetails((prev) => ({ ...prev, unusualSound: preset.sound }));
    showToast(`Loaded sample scenario: ${preset.name}`, 'cyan');
    setStep(2);
  };

  // Process captured/selected file
  const processSelectedFile = (file) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video');
    setMediaType(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      showToast(isVideo ? 'Video acquired successfully!' : 'Photo acquired successfully!', 'cyan');
    };
    reader.readAsDataURL(file);
  };

  const handleMediaCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  // Stop all camera tracks and release hardware (Requirement 8)
  const stopLiveCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsLiveCameraActive(false);
    setIsCameraLoading(false);
    setIsVideoPlaying(false);
  }, [cameraStream]);

  // Live in-browser camera stream (Requirement 1, 2, 8, 9)
  const startLiveCamera = async (targetMode = null, targetDeviceId = null) => {
    // 1. Stop any existing camera stream before starting anew
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }

    setCameraError(null);
    setIsCameraLoading(true);
    setIsVideoPlaying(false);
    setIsLiveCameraActive(true); // Open scanner area immediately so video element can mount

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support in-browser camera access. Please upload a photo instead.');
      }

      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
      // On mobile devices, default to rear 'environment' camera. On desktop/laptop, default to 'user' (front webcam)
      const requestedMode = targetMode || (isMobile ? 'environment' : 'user');
      setFacingMode(requestedMode);

      let constraints = {};
      if (targetDeviceId) {
        constraints = {
          video: {
            deviceId: { exact: targetDeviceId },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };
      } else if (isMobile) {
        constraints = {
          video: {
            facingMode: { ideal: requestedMode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };
      } else {
        // Laptop / desktop: request standard camera without forcing ideal environment
        constraints = {
          video: {
            facingMode: requestedMode === 'environment' ? { ideal: 'environment' } : { ideal: 'user' },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };
      }

      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (firstErr) {
        console.warn('Primary camera request failed, falling back to any available camera:', firstErr);
        // Fallback: any available camera without facingMode constraint
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      const videoTrack = stream.getVideoTracks()?.[0];
      if (videoTrack) {
        videoTrack.enabled = true;
      }

      streamRef.current = stream;
      setCameraStream(stream);

      // Enumerate devices to populate available cameras
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        setAvailableCameras(videoDevices);
        if (targetDeviceId) {
          const idx = videoDevices.findIndex((d) => d.deviceId === targetDeviceId);
          if (idx !== -1) setCurrentCameraIndex(idx);
        } else if (videoTrack && videoTrack.label) {
          const idx = videoDevices.findIndex((d) => d.label === videoTrack.label);
          if (idx !== -1) setCurrentCameraIndex(idx);
        }
      } catch (enumErr) {
        console.warn('Device enumeration non-critical notice:', enumErr);
      }
    } catch (err) {
      console.error('Camera stream access failed:', err);
      let errorMsg = 'Unable to access your camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = 'Camera permission denied. Please allow camera permission in your browser address bar and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = 'Camera is unavailable. No camera device found. Please upload a photo instead.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg = 'Camera is currently in use by another app or browser tab. Please close other camera apps and retry.';
      } else if (err.name === 'OverconstrainedError') {
        errorMsg = 'Requested camera resolution is not supported by your device.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      setCameraError(errorMsg);
      showToast(errorMsg, 'warning');
    } finally {
      setIsCameraLoading(false);
    }
  };

  const toggleCameraFacingMode = () => {
    if (availableCameras.length > 1) {
      const nextIndex = (currentCameraIndex + 1) % availableCameras.length;
      setCurrentCameraIndex(nextIndex);
      const nextDevice = availableCameras[nextIndex];
      startLiveCamera(null, nextDevice.deviceId);
      showToast(`Switched to: ${nextDevice.label || `Camera ${nextIndex + 1}`}`, 'info');
    } else {
      const nextMode = facingMode === 'environment' ? 'user' : 'environment';
      startLiveCamera(nextMode);
      showToast(`Switched to: ${nextMode === 'environment' ? 'Rear Camera' : 'Front/Webcam'}`, 'info');
    }
  };

  // Real canvas snapshot from live video element (Requirement 5 & 6)
  const captureLiveSnapshot = () => {
    const video = videoRef.current;
    if (!video) {
      showToast('Camera feed is not ready yet', 'warning');
      return;
    }

    setIsCapturing(true);

    try {
      const width = video.videoWidth || video.clientWidth || 1280;
      const height = video.videoHeight || video.clientHeight || 720;

      if (width === 0 || height === 0) {
        showToast('Camera video stream is still initializing. Please wait a moment...', 'warning');
        setIsCapturing(false);
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Draw real video frame onto canvas
      ctx.drawImage(video, 0, 0, width, height);

      // Convert frame to image data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setImagePreview(dataUrl);
      setMediaType('image');

      // Stop camera immediately after capture to release hardware
      stopLiveCamera();
      showToast('Photo captured successfully from camera!', 'success');
    } catch (err) {
      console.error('Failed to capture video snapshot:', err);
      showToast('Could not capture photo. Please try again.', 'danger');
    } finally {
      setIsCapturing(false);
    }
  };

  // Preview Action Handlers (Requirement 5)
  const handleRetake = () => {
    setImagePreview(null);
    startLiveCamera(facingMode);
  };

  const handleRemove = () => {
    setImagePreview(null);
    stopLiveCamera();
    showToast('Media removed', 'info');
  };

  const handleUseThisMedia = () => {
    stopLiveCamera();
    showToast('Visual evidence confirmed! Proceeding to problem details.', 'success');
    setStep(2);
  };

  // Simulated Voice recording
  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      showToast('Listening... Speak your problem clearly', 'cyan');
      setTimeout(() => {
        const simulatedTranscript = 'When I turn the power switch on, there is a buzzing sound and it does not rotate at normal speed.';
        setVoiceTranscript(simulatedTranscript);
        setProblemDescription((prev) => prev ? `${prev} ${simulatedTranscript}` : simulatedTranscript);
        setIsRecordingVoice(false);
        showToast('Voice transcribed into problem description!', 'success');
      }, 3200);
    } else {
      setIsRecordingVoice(false);
    }
  };

  // Trigger Analysis
  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);

    try {
      const diagnosisResult = await diagnosisService.analyzeProblem({
        productName: productName || 'Generic Electronic Device',
        category,
        modelNumber,
        problemDescription: problemDescription || 'Unit stopped operating normally.',
        imagePreview,
        voiceTranscript,
        details
      });

      setCurrentDiagnosis(diagnosisResult);
      showToast('Analysis complete! Redirecting to Diagnosis...', 'success');
      navigate('/diagnosis');
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      showToast('Diagnostic scan failed. Please retry.', 'danger');
    }
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container" style={{ maxWidth: '820px' }}>
        
        {/* If analyzing: display Scanner Animation */}
        {isAnalyzing ? (
          <div style={{ padding: '3rem 0', textAlign: 'center' }}>
            <ScannerAnimation />
            <div style={{ marginTop: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Note: FixIt uses prototype neural heuristics & verified hardware schematics to generate repair telemetry.
            </div>
          </div>
        ) : (
          <div>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.6rem' }}>
                AI-POWERED PROBLEM SUBMISSION
              </span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.5rem' }}>
                Show Your Problem
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Upload photos, describe symptoms, or choose a one-click sample to see FixIt repair intelligence in action.
              </p>
            </div>

            {/* Stepper Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                position: 'relative'
              }}
            >
              {[
                { num: 1, label: 'Visual Evidence' },
                { num: 2, label: 'Problem Description' },
                { num: 3, label: 'Diagnostic Details' }
              ].map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => setStep(s.num)}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: step >= s.num ? 'var(--grad-cyan)' : 'var(--bg-card-solid)',
                      color: step >= s.num ? '#070B16' : 'var(--text-muted)',
                      border: step >= s.num ? 'none' : '1px solid var(--border-subtle)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: step === s.num ? 'var(--shadow-glow-cyan)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {step > s.num ? <CheckCircle2 size={18} color="#070B16" /> : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: step === s.num ? 700 : 500,
                      color: step >= s.num ? '#fff' : 'var(--text-muted)'
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
              
              {/* Connecting Track Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '19px',
                  left: '12%',
                  right: '12%',
                  height: '2px',
                  background: 'var(--border-subtle)',
                  zIndex: 1
                }}
              />
            </div>

            {/* Step 1: Upload / Show Us The Problem */}
            {step === 1 && (
              <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>
                  Step 1: Show us the broken product
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Provide visual evidence using your device camera, browsing your photo gallery/files, or drag & drop.
                </p>

                {/* Hidden browser camera input: capture="environment" invokes rear camera directly on mobile browsers */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={handleMediaCapture}
                />

                {/* Hidden browse file input for gallery/device files */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={handleMediaCapture}
                />

                {/* ====================================================
                    VIEW A: LIVE IN-BROWSER CAMERA SCANNER & VIEWFINDER
                ==================================================== */}
                {isLiveCameraActive ? (
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      background: 'linear-gradient(180deg, #070D1C 0%, #040711 100%)',
                      border: '2px solid var(--neon-cyan)',
                      boxShadow: 'var(--shadow-glow-cyan)',
                      padding: '1.25rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {/* Viewfinder Header Bar */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                        padding: '0 4px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          className="fixit-badge fixit-badge-cyan"
                          style={{
                            fontSize: '0.74rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: isVideoPlaying ? '#10B981' : '#00F2FE',
                              boxShadow: isVideoPlaying ? '0 0 8px #10B981' : '0 0 8px #00F2FE',
                              animation: isVideoPlaying ? 'none' : 'pulseGlow 1.5s infinite'
                            }}
                          />
                          {isVideoPlaying ? 'LIVE CAMERA ACTIVE' : 'CONNECTING CAMERA...'}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-tertiary)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {availableCameras[currentCameraIndex]?.label || (facingMode === 'environment' ? 'CAM: REAR (DEFAULT)' : 'CAM: WEBCAM')}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Switch Camera Button (Rear / Front) */}
                        <button
                          type="button"
                          onClick={toggleCameraFacingMode}
                          title="Switch between front and rear or external cameras"
                          style={{
                            background: 'rgba(0, 242, 254, 0.08)',
                            border: '1px solid var(--neon-cyan-border)',
                            color: 'var(--neon-cyan)',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <RefreshCw size={13} />
                          <span>Flip</span>
                        </button>

                        {/* System Native Camera Fallback */}
                        <button
                          type="button"
                          onClick={() => {
                            stopLiveCamera();
                            cameraInputRef.current?.click();
                          }}
                          title="Take photo using your device's native camera app"
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--neon-teal)',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Camera size={13} />
                          <span>System Camera</span>
                        </button>

                        {/* Cancel / Close Viewfinder */}
                        <button
                          type="button"
                          onClick={stopLiveCamera}
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-secondary)',
                            padding: '5px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <X size={14} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Camera Scanner Viewport (Requirement 1, 3, 4) */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '380px',
                        minHeight: '300px',
                        maxHeight: '65vh',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#02050B',
                        marginBottom: '1.25rem',
                        border: '1px solid rgba(0, 242, 254, 0.25)',
                        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      {/* Real HTML5 Live Video Element */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        webkit-playsinline="true"
                        muted
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          zIndex: 1,
                          backgroundColor: '#02050B'
                        }}
                      />

                      {/* Subtle Dark Vignette Border (pointerEvents: none) */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(4,7,17,0.65) 100%)',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}
                      />

                      {/* Animated FixIt Neon Scanning Beam (Requirement 4) */}
                      <div
                        className="scanner-line"
                        style={{
                          pointerEvents: 'none',
                          zIndex: 3
                        }}
                      />

                      {/* Central Framing Reticle Guide */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '76%',
                          height: '70%',
                          border: '1.5px dashed rgba(0, 242, 254, 0.45)',
                          borderRadius: '16px',
                          pointerEvents: 'none',
                          zIndex: 3,
                          boxShadow: '0 0 25px rgba(0, 242, 254, 0.08)'
                        }}
                      />

                      {/* HUD Corner Brackets - Top Left */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          width: 22,
                          height: 22,
                          borderTop: '3px solid var(--neon-cyan)',
                          borderLeft: '3px solid var(--neon-cyan)',
                          borderRadius: '4px 0 0 0',
                          pointerEvents: 'none',
                          zIndex: 3,
                          filter: 'drop-shadow(0 0 4px var(--neon-cyan))'
                        }}
                      />
                      {/* HUD Corner Brackets - Top Right */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 14,
                          right: 14,
                          width: 22,
                          height: 22,
                          borderTop: '3px solid var(--neon-cyan)',
                          borderRight: '3px solid var(--neon-cyan)',
                          borderRadius: '0 4px 0 0',
                          pointerEvents: 'none',
                          zIndex: 3,
                          filter: 'drop-shadow(0 0 4px var(--neon-cyan))'
                        }}
                      />
                      {/* HUD Corner Brackets - Bottom Left */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 14,
                          left: 14,
                          width: 22,
                          height: 22,
                          borderBottom: '3px solid var(--neon-cyan)',
                          borderLeft: '3px solid var(--neon-cyan)',
                          borderRadius: '0 0 0 4px',
                          pointerEvents: 'none',
                          zIndex: 3,
                          filter: 'drop-shadow(0 0 4px var(--neon-cyan))'
                        }}
                      />
                      {/* HUD Corner Brackets - Bottom Right */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 14,
                          right: 14,
                          width: 22,
                          height: 22,
                          borderBottom: '3px solid var(--neon-cyan)',
                          borderRight: '3px solid var(--neon-cyan)',
                          borderRadius: '0 0 4px 0',
                          pointerEvents: 'none',
                          zIndex: 3,
                          filter: 'drop-shadow(0 0 4px var(--neon-cyan))'
                        }}
                      />

                      {/* Center Target Crosshair */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '16px',
                          height: '16px',
                          pointerEvents: 'none',
                          zIndex: 3,
                          opacity: 0.7
                        }}
                      >
                        <div style={{ position: 'absolute', top: '7px', left: 0, right: 0, height: '2px', background: 'var(--neon-cyan)' }} />
                        <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: 'var(--neon-cyan)' }} />
                      </div>

                      {/* Positioning Prompt Badge (Requirement 4) */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '18px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 4,
                          background: 'rgba(7, 11, 22, 0.85)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(0, 242, 254, 0.35)',
                          borderRadius: '24px',
                          padding: '7px 18px',
                          color: '#FFFFFF',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          letterSpacing: '-0.01em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                          pointerEvents: 'none'
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--neon-cyan)',
                            boxShadow: '0 0 8px var(--neon-cyan)'
                          }}
                        />
                        <span>Position the broken product inside the frame</span>
                      </div>

                      {/* Camera Loading Overlay */}
                      {isCameraLoading && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(7, 11, 22, 0.92)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            zIndex: 10
                          }}
                        >
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              border: '3px solid rgba(0, 242, 254, 0.2)',
                              borderTopColor: 'var(--neon-cyan)',
                              animation: 'spin 0.8s linear infinite'
                            }}
                          />
                          <span style={{ color: 'var(--neon-cyan)', fontSize: '0.88rem', fontWeight: 600 }}>
                            Connecting to Live Camera Feed...
                          </span>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                            Requesting device camera access
                          </span>
                        </div>
                      )}

                      {/* Camera Error State Overlay (Requirement 9) */}
                      {cameraError && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(7, 11, 22, 0.96)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            textAlign: 'center',
                            zIndex: 10
                          }}
                        >
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              background: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#EF4444',
                              marginBottom: '12px'
                            }}
                          >
                            <AlertTriangle size={24} />
                          </div>
                          <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                            Camera Stream Unavailable
                          </h4>
                          <p
                            style={{
                              color: 'var(--text-secondary)',
                              fontSize: '0.85rem',
                              maxWidth: '380px',
                              marginBottom: '1.25rem',
                              lineHeight: 1.5
                            }}
                          >
                            {cameraError}
                          </p>
                          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                              type="button"
                              onClick={() => startLiveCamera(facingMode)}
                              className="fixit-btn fixit-btn-cyan"
                              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                            >
                              <RotateCcw size={15} />
                              <span>Retry Camera</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                stopLiveCamera();
                                fileInputRef.current?.click();
                              }}
                              className="fixit-btn fixit-btn-ghost"
                              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                            >
                              <FolderOpen size={15} />
                              <span>Upload Photo Instead</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shutter / Capture Action Button (Requirement 5) */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={captureLiveSnapshot}
                        disabled={isCameraLoading || !!cameraError || isCapturing}
                        className="fixit-btn fixit-btn-cyan"
                        style={{
                          padding: '0.85rem 2.5rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                          borderRadius: '50px',
                          boxShadow: '0 0 25px rgba(0, 242, 254, 0.4)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: isCameraLoading || !!cameraError ? 'not-allowed' : 'pointer',
                          opacity: isCameraLoading || !!cameraError ? 0.6 : 1
                        }}
                      >
                        <Camera size={20} strokeWidth={2.2} />
                        <span>{isCapturing ? 'Capturing...' : 'Capture Photo'}</span>
                      </button>
                    </div>

                    {/* Privacy Shutter helper note */}
                    <div
                      style={{
                        marginTop: '12px',
                        fontSize: '0.74rem',
                        color: 'var(--text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>💡 If your camera feed is dark, ensure your laptop's physical webcam slider/privacy shutter is open.</span>
                    </div>
                  </div>
                ) : imagePreview ? (
                  /* ====================================================
                      VIEW B: MEDIA PREVIEW STATE WITH 3 REQUIRED BUTTONS:
                      1. Retake
                      2. Remove
                      3. Use This Photo/Video
                  ==================================================== */
                  <div
                    style={{
                      borderRadius: '1rem',
                      background: 'rgba(7, 11, 22, 0.95)',
                      border: '1px solid var(--neon-cyan-border)',
                      boxShadow: 'var(--shadow-glow-cyan)',
                      padding: '1.5rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {/* Header badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="fixit-badge fixit-badge-success" style={{ fontSize: '0.75rem' }}>
                        <CheckCircle2 size={13} />
                        VISUAL TELEMETRY ACQUIRED
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                        {mediaType === 'video' ? 'FORMAT: MP4/VIDEO' : 'FORMAT: IMAGE/CAPTURE'}
                      </span>
                    </div>

                    {/* Media Display */}
                    <div
                      style={{
                        position: 'relative',
                        maxHeight: '320px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: '#040711',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem'
                      }}
                    >
                      {mediaType === 'video' ? (
                        <video
                          src={imagePreview}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: '8px' }}
                        />
                      ) : (
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          style={{
                            maxHeight: '300px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                        />
                      )}

                      {/* HUD diagnostic corners */}
                      <div style={{ position: 'absolute', top: 10, left: 10, width: 12, height: 12, borderTop: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
                      <div style={{ position: 'absolute', top: 10, right: 10, width: 12, height: 12, borderTop: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
                      <div style={{ position: 'absolute', bottom: 10, left: 10, width: 12, height: 12, borderBottom: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
                      <div style={{ position: 'absolute', bottom: 10, right: 10, width: 12, height: 12, borderBottom: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
                    </div>

                    {/* Three Required Action Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        paddingTop: '6px'
                      }}
                    >
                      {/* 1. Retake Button */}
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="fixit-btn fixit-btn-ghost"
                        style={{ minHeight: '44px', padding: '0.65rem 1.25rem' }}
                      >
                        <RotateCcw size={16} />
                        <span>Retake</span>
                      </button>

                      {/* 2. Remove Button */}
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="fixit-btn fixit-btn-ghost"
                        style={{ minHeight: '44px', padding: '0.65rem 1.25rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>

                      {/* 3. Use This Photo/Video Button */}
                      <button
                        type="button"
                        onClick={handleUseThisMedia}
                        className="fixit-btn fixit-btn-cyan"
                        style={{ minHeight: '44px', padding: '0.65rem 1.5rem', fontWeight: 700 }}
                      >
                        <CheckCircle2 size={17} />
                        <span>Use This Photo/Video</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ====================================================
                      VIEW C: 3 WAYS TO PROVIDE VISUAL EVIDENCE
                      1. Use Camera (Prominent & Mobile Touch-Friendly)
                      2. Upload from Device / Browse
                      3. Drag & Drop
                  ==================================================== */
                  <div style={{ marginBottom: '1.5rem' }}>
                    
                    {/* Top Row: Camera & Browse Action Cards */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}
                    >
                      {/* OPTION 1: USE CAMERA (Highly Visible & Touch-Friendly) */}
                      <button
                        type="button"
                        onClick={() => startLiveCamera()}
                        className="fixit-card fixit-card-interactive"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '1.25rem',
                          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.12) 0%, rgba(13, 20, 36, 0.9) 100%)',
                          border: '2px solid var(--neon-cyan)',
                          borderRadius: '1rem',
                          boxShadow: '0 0 20px rgba(0, 242, 254, 0.25)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                          minHeight: '84px',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            background: 'var(--grad-cyan)',
                            color: '#070B16',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 0 15px rgba(0, 242, 254, 0.5)'
                          }}
                        >
                          <Camera size={26} strokeWidth={2.2} />
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                              Use Camera
                            </span>
                            <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                              Direct Snap
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Capture photo or short video directly in your mobile or laptop browser
                          </div>
                        </div>
                      </button>

                      {/* OPTION 2: UPLOAD FROM DEVICE / BROWSE */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="fixit-card fixit-card-interactive"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '1.25rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: '1rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                          minHeight: '84px'
                        }}
                      >
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            background: 'rgba(0, 242, 254, 0.08)',
                            border: '1px solid var(--neon-cyan-border)',
                            color: 'var(--neon-cyan)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <FolderOpen size={24} />
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                              Browse Device
                            </span>
                            <span className="fixit-badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>
                              Files / Gallery
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Select existing photos, clips, or screenshots from your storage
                          </div>
                        </div>
                      </button>

                    </div>

                    {/* OPTION 3: DRAG & DROP ZONE (Desktop/Tablet Supported) */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: isDragging ? '2px dashed var(--neon-cyan)' : '2px dashed var(--border-medium)',
                        borderRadius: '1rem',
                        padding: '1.75rem 1.5rem',
                        textAlign: 'center',
                        background: isDragging ? 'rgba(0, 242, 254, 0.08)' : 'rgba(0, 0, 0, 0.25)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(0, 242, 254, 0.08)',
                          color: 'var(--neon-cyan)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 0.75rem'
                        }}
                      >
                        <UploadCloud size={22} />
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                        Drag & Drop photos or videos here, or tap to choose
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                        Supports JPG, PNG, WEBP, MP4, MOV (up to 25MB)
                      </div>

                      {/* In-Browser Live Webcam alternative link for desktop */}
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startLiveCamera();
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--neon-cyan)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'underline'
                          }}
                        >
                          <Eye size={13} />
                          <span>Or launch In-Browser Live Viewfinder (Desktop/Webcam)</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* Instant Try-Me Preset Scenarios */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Or try a 1-click sample product scenario:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                    {samplePresets.map((pr, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyPreset(pr)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: '#fff',
                          fontSize: '0.78rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontWeight: 600, color: 'var(--neon-cyan)' }}>{pr.name}</div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>{pr.productName.split(' ')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="fixit-btn fixit-btn-cyan"
                  >
                    <span>Next: Describe Problem</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Problem Description & Voice Input */}
            {step === 2 && (
              <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>
                  Step 2: Tell us what happened
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Mention the brand, model, and what went wrong. You can type or use the simulated voice recorder.
                </p>

                {/* Category & Product */}
                <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                  <div>
                    <label className="fixit-label">Product Category</label>
                    <select
                      className="fixit-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {PRODUCT_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="fixit-label">Product Brand & Name</label>
                    <input
                      type="text"
                      className="fixit-input"
                      placeholder="e.g. Orient Electric Ceiling Fan, LG Microwave"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Model Number */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="fixit-label">Model Number (optional, helps check exact schematics)</label>
                  <input
                    type="text"
                    className="fixit-input"
                    placeholder="e.g. APEX-1200, GS-734U, MC2846SL, Classic 350"
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                  />
                </div>

                {/* Problem Description with Voice Button */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="fixit-label" style={{ margin: 0 }}>
                      What is the problem?
                    </label>

                    {/* Simulated Voice Input Button */}
                    <button
                      type="button"
                      onClick={toggleVoiceRecording}
                      style={{
                        background: isRecordingVoice ? 'rgba(255, 42, 133, 0.2)' : 'rgba(0, 242, 254, 0.1)',
                        border: isRecordingVoice ? '1px solid var(--neon-pink)' : '1px solid var(--neon-cyan-border)',
                        color: isRecordingVoice ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      {isRecordingVoice ? (
                        <>
                          <MicOff size={13} className="animate-pulse" />
                          <span>Listening (Click to Stop)...</span>
                        </>
                      ) : (
                        <>
                          <Mic size={13} />
                          <span>Simulate Voice Input</span>
                        </>
                      )}
                    </button>
                  </div>

                  <textarea
                    className="fixit-textarea"
                    rows="3"
                    placeholder="Describe symptoms: e.g. Humming sound, stopped spinning, water leakage, spark noticed, heat buildup..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                  />
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="fixit-btn fixit-btn-ghost"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="fixit-btn fixit-btn-cyan"
                  >
                    <span>Next: Diagnostic Questions</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Diagnostic Details */}
            {step === 3 && (
              <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>
                  Step 3: Quick Diagnostic Details
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  These 6 rapid answers help FixIt assess safety hazards, repair difficulty, and parts required.
                </p>

                <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
                  
                  {/* When did problem start */}
                  <div>
                    <label className="fixit-label">When did the problem start?</label>
                    <select
                      className="fixit-select"
                      value={details.whenStarted}
                      onChange={(e) => setDetails({ ...details, whenStarted: e.target.value })}
                    >
                      <option value="Just today / suddenly">Just today / suddenly</option>
                      <option value="A few days ago">A few days ago</option>
                      <option value="A few weeks ago">A few weeks ago</option>
                      <option value="Gradual over months">Gradual over months</option>
                    </select>
                  </div>

                  {/* Partial working */}
                  <div>
                    <label className="fixit-label">Is the product working partially?</label>
                    <select
                      className="fixit-select"
                      value={details.workingPartially}
                      onChange={(e) => setDetails({ ...details, workingPartially: e.target.value })}
                    >
                      <option value="Turns on but runs poorly">Turns on but runs poorly / slow</option>
                      <option value="Completely dead (No power/response)">Completely dead (No power/response)</option>
                      <option value="Intermittent / Works sometimes">Intermittent / Works sometimes</option>
                      <option value="Mechanical jam / Stuck">Mechanical jam / Stuck</option>
                    </select>
                  </div>

                  {/* Unusual Sound */}
                  <div>
                    <label className="fixit-label">Any unusual sound?</label>
                    <select
                      className="fixit-select"
                      value={details.unusualSound}
                      onChange={(e) => setDetails({ ...details, unusualSound: e.target.value })}
                    >
                      <option value="Humming / Vibrating">Humming / Vibrating</option>
                      <option value="Clicking / Grinding">Clicking / Grinding</option>
                      <option value="High-pitched screaming fan">High-pitched screaming fan</option>
                      <option value="Loud pop / Spark">Loud pop / Spark</option>
                      <option value="No unusual sound">No unusual sound</option>
                    </select>
                  </div>

                  {/* Unusual Smell */}
                  <div>
                    <label className="fixit-label">Any unusual smell?</label>
                    <select
                      className="fixit-select"
                      value={details.unusualSmell}
                      onChange={(e) => setDetails({ ...details, unusualSmell: e.target.value })}
                    >
                      <option value="No smell">No smell</option>
                      <option value="Burning plastic / wire smell">Burning plastic / wire smell</option>
                      <option value="Petrol / exhaust fumes">Petrol / exhaust fumes</option>
                      <option value="Damp / mold smell">Damp / mold smell</option>
                    </select>
                  </div>

                  {/* Dropped / Physical Damage */}
                  <div>
                    <label className="fixit-label">Was it dropped or suffered liquid spill?</label>
                    <select
                      className="fixit-select"
                      value={details.wasDropped}
                      onChange={(e) => setDetails({ ...details, wasDropped: e.target.value })}
                    >
                      <option value="No">No</option>
                      <option value="Dropped / Heavy impact">Dropped / Heavy impact</option>
                      <option value="Water or liquid splash">Water or liquid splash</option>
                      <option value="Voltage surge / Storm">Voltage surge / Storm</option>
                    </select>
                  </div>

                  {/* Visible damage */}
                  <div>
                    <label className="fixit-label">Any visible damage?</label>
                    <select
                      className="fixit-select"
                      value={details.visibleDamage}
                      onChange={(e) => setDetails({ ...details, visibleDamage: e.target.value })}
                    >
                      <option value="None visible externally">None visible externally</option>
                      <option value="Cracked casing / glass">Cracked casing / glass</option>
                      <option value="Cut or frayed wire">Cut or frayed wire</option>
                      <option value="Loose screw or hinge">Loose screw or hinge</option>
                    </select>
                  </div>

                </div>

                {/* Primary CTA: Analyze My Problem */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="fixit-btn fixit-btn-ghost"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartAnalysis}
                    className="fixit-btn fixit-btn-lg fixit-btn-cyan"
                    style={{ padding: '0.95rem 2.2rem' }}
                  >
                    <Sparkles size={18} />
                    <span>Analyze My Problem</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
