import React, { useEffect, useState } from 'react';
import { Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';

export const ScannerAnimation = ({ currentStep = 0, isComplete = false }) => {
  const steps = [
    'Scanning Product Structure & Visual Damage...',
    'Analyzing Symptom Acoustics & Diagnostics...',
    'Calculating Repairability & Difficulty Index...',
    'Querying Verified Spare Parts Repositories...',
    'Synthesizing Optimal Solution & Safety Advisory...'
  ];

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 550);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0A1124 0%, #060A14 100%)',
        border: '1px solid var(--border-glow-cyan)',
        boxShadow: 'var(--shadow-glow-cyan-lg)',
        padding: '2rem 1.5rem'
      }}
    >
      {/* Background futuristic tech grid */}
      <div
        className="futuristic-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          pointerEvents: 'none'
        }}
      />

      {/* Laser Scanning Beam */}
      <div className="scanner-line" />

      {/* Corner crosshairs */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', width: '16px', height: '16px', borderTop: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
      <div style={{ position: 'absolute', top: '12px', right: '12px', width: '16px', height: '16px', borderTop: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '16px', height: '16px', borderBottom: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
      <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '16px', height: '16px', borderBottom: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />

      {/* Center AI Core */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 5, padding: '1.5rem 0' }}>
        <div
          className="animate-pulse-glow"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.25) 0%, rgba(7, 11, 22, 0.9) 70%)',
            border: '2px solid var(--neon-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            position: 'relative'
          }}
        >
          <Cpu size={38} color="var(--neon-cyan)" />
          {/* Orbiting ring */}
          <div
            className="animate-radar"
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '1px dashed var(--neon-pink)',
              opacity: 0.7
            }}
          />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.75rem' }}>
            <Activity size={12} className="animate-spin" />
            AI DIAGNOSTIC NEURAL RUNTIME
          </span>
        </div>

        <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
          Analyzing Problem Telemetry...
        </h3>

        <div style={{ minHeight: '30px', fontSize: '0.9rem', color: 'var(--neon-teal)', fontFamily: 'var(--font-mono)' }}>
          {steps[activeStepIndex]}
        </div>

        {/* Diagnostic Process Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1.75rem', textAlign: 'left', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '12px 16px', border: '1px solid var(--border-subtle)' }}>
          {steps.map((st, idx) => {
            const isDone = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.8rem',
                  color: isDone ? 'var(--status-success)' : isCurrent ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={14} color="var(--status-success)" />
                ) : isCurrent ? (
                  <Zap size={14} color="var(--neon-cyan)" className="animate-pulse" />
                ) : (
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid var(--text-muted)' }} />
                )}
                <span>{st}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
