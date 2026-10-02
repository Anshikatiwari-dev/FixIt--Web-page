import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export const ErrorState = ({
  title = 'Something Went Wrong',
  message = 'We encountered an unexpected error while processing your request.',
  onRetry
}) => {
  return (
    <div
      className="fixit-card"
      style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        maxWidth: '480px',
        margin: '2rem auto',
        borderColor: 'rgba(239, 68, 68, 0.4)'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}
      >
        <AlertTriangle size={26} color="var(--status-danger)" />
      </div>
      <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="fixit-btn fixit-btn-ghost">
          <RotateCcw size={15} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
