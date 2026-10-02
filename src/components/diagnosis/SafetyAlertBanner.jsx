import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyAlertBanner = ({ warnings = [], isHighRisk = false }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div
      style={{
        background: isHighRisk
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(220, 38, 38, 0.22) 100%)'
          : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.18) 100%)',
        border: isHighRisk
          ? '1px solid rgba(239, 68, 68, 0.5)'
          : '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: isHighRisk ? '0 0 20px rgba(239, 68, 68, 0.2)' : '0 0 20px rgba(245, 158, 11, 0.15)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '750px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: isHighRisk ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {isHighRisk ? (
              <ShieldAlert size={22} color="#EF4444" />
            ) : (
              <AlertTriangle size={22} color="#F59E0B" />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`fixit-badge ${isHighRisk ? 'fixit-badge-danger' : 'fixit-badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                {isHighRisk ? 'CRITICAL SAFETY ADVISORY' : 'PRECAUTIONARY NOTICE'}
              </span>
              {isHighRisk && (
                <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>
                  Professional Assistance Recommended
                </span>
              )}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
              {warnings.map((w, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ color: isHighRisk ? '#EF4444' : '#F59E0B', fontWeight: 700 }}>•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isHighRisk && (
          <div style={{ alignSelf: 'center' }}>
            <Link to="/technicians" className="fixit-btn fixit-btn-sm" style={{ background: '#EF4444', color: '#fff', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}>
              <UserCheck size={14} />
              <span>Find a Verified Technician</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
