import React, { useState } from 'react';
import { CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react';
import { MOCK_PARTS } from '../../data/mockParts';

export const CompatibilityChecker = ({ onPartSelect }) => {
  const [modelQuery, setModelQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!modelQuery.trim()) return;

    const q = modelQuery.toLowerCase();
    const matchedPart = MOCK_PARTS.find((p) =>
      p.compatibleModels?.some((m) => m.toLowerCase().includes(q)) ||
      p.compatibility?.toLowerCase().includes(q)
    );

    if (matchedPart) {
      setResult({
        status: 'compatible',
        message: `Verified match! Compatible part found: "${matchedPart.name}"`,
        part: matchedPart
      });
    } else {
      setResult({
        status: 'partial',
        message: `No exact model match for "${modelQuery}". Our master technicians can source custom OEM parts on request.`,
        part: null
      });
    }
  };

  return (
    <div
      className="fixit-card"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.05) 0%, rgba(17, 26, 48, 0.8) 100%)',
        border: '1px solid var(--neon-cyan-border)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <ShieldCheck size={18} color="var(--neon-cyan)" />
        <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
          FixIt Smart Model Compatibility Checker
        </h4>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Enter your appliance, vehicle or gadget model number (e.g., <code style={{ color: 'var(--neon-teal)' }}>APEX-1200</code>, <code style={{ color: 'var(--neon-teal)' }}>GS-734U</code>, <code style={{ color: 'var(--neon-teal)' }}>MC2846SL</code>, <code style={{ color: 'var(--neon-teal)' }}>Classic 350</code>) to verify guaranteed fitment.
      </p>

      <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="fixit-input"
          placeholder="Enter Model Number or Product Name..."
          value={modelQuery}
          onChange={(e) => setModelQuery(e.target.value)}
          style={{ flex: 1, minWidth: '240px' }}
        />
        <button type="submit" className="fixit-btn fixit-btn-cyan">
          <Search size={16} />
          <span>Verify Fitment</span>
        </button>
      </form>

      {result && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: '1rem',
            padding: '12px 14px',
            borderRadius: '10px',
            background: result.status === 'compatible' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: result.status === 'compatible' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {result.status === 'compatible' ? (
              <CheckCircle2 size={18} color="var(--status-success)" />
            ) : (
              <XCircle size={18} color="var(--status-warning)" />
            )}
            <span style={{ fontSize: '0.85rem', color: '#fff' }}>{result.message}</span>
          </div>

          {result.part && onPartSelect && (
            <button
              onClick={() => onPartSelect(result.part)}
              className="fixit-btn fixit-btn-sm fixit-btn-outline-cyan"
            >
              Highlight Part
            </button>
          )}
        </div>
      )}
    </div>
  );
};
