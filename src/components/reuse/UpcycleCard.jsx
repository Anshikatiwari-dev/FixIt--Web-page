import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Leaf } from 'lucide-react';

export const UpcycleCard = ({ idea }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixit-card fixit-card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        border: '1px solid rgba(16, 185, 129, 0.25)'
      }}
    >
      <div>
        {/* Image */}
        <div style={{ position: 'relative', height: '180px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
          <img
            src={idea.image}
            alt={idea.secondLifeTitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'rgba(5, 8, 17, 0.85)',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}
          >
            Original: <strong style={{ color: '#fff' }}>{idea.originalItem}</strong>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: 'rgba(16, 185, 129, 0.9)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Leaf size={11} />
            <span>-{idea.carbonSavedKg} kg CO₂</span>
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
          {idea.secondLifeTitle}
        </h4>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem' }}>
          <span className="fixit-badge fixit-badge-success" style={{ fontSize: '0.7rem' }}>
            {idea.difficulty}
          </span>
          <span className="fixit-badge" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--neon-cyan)', fontSize: '0.7rem' }}>
            {idea.upcyclingValue}
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          {idea.summary}
        </p>

        {/* Expanded Steps */}
        {expanded && (
          <div className="animate-fade-in" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px 12px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--neon-teal)', marginBottom: '6px' }}>
              Transformation Blueprint:
            </div>
            <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {idea.steps.map((st, idx) => (
                <li key={idx}>{st}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="fixit-btn fixit-btn-sm fixit-btn-ghost"
        style={{ width: '100%', justifyContent: 'space-between', padding: '8px 12px' }}
      >
        <span>{expanded ? 'Hide Blueprint' : 'View Blueprint Steps'}</span>
        {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
    </div>
  );
};
