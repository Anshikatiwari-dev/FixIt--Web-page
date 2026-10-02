import React from 'react';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No Records Found',
  description = 'There are no active items matching your current selection.',
  actionLabel,
  actionLink,
  onAction
}) => {
  return (
    <div
      className="fixit-card"
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        maxWidth: '520px',
        margin: '2rem auto'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid var(--neon-cyan-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}
      >
        <Icon size={28} color="var(--neon-cyan)" />
      </div>
      <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="fixit-btn fixit-btn-cyan">
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </Link>
      )}

      {actionLabel && onAction && !actionLink && (
        <button onClick={onAction} className="fixit-btn fixit-btn-cyan">
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};
