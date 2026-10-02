import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ label = 'Loading diagnostic telemetry...', size = 32 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}
    >
      <Loader2 size={size} color="var(--neon-cyan)" className="animate-spin" />
      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
};
