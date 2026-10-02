import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((toast) => {
          let icon = <Info size={18} color="var(--neon-cyan)" />;
          let borderCol = 'var(--neon-cyan-border)';
          let bgCol = 'rgba(11, 20, 38, 0.95)';

          if (toast.type === 'success') {
            icon = <CheckCircle2 size={18} color="var(--status-success)" />;
            borderCol = 'rgba(16, 185, 129, 0.4)';
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle size={18} color="var(--status-warning)" />;
            borderCol = 'rgba(245, 158, 11, 0.4)';
          } else if (toast.type === 'danger' || toast.type === 'error') {
            icon = <AlertCircle size={18} color="var(--status-danger)" />;
            borderCol = 'rgba(239, 68, 68, 0.4)';
          } else if (toast.type === 'pink') {
            icon = <AlertCircle size={18} color="var(--neon-pink)" />;
            borderCol = 'var(--neon-pink-border)';
          }

          return (
            <div
              key={toast.id}
              className="animate-fade-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: bgCol,
                border: `1px solid ${borderCol}`,
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                pointerEvents: 'auto',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ flexShrink: 0 }}>{icon}</div>
              <div style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                  borderRadius: '4px'
                }}
                aria-label="Dismiss toast"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
