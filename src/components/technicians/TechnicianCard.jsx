import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TechnicianCard = ({ technician, onBookClick }) => {
  return (
    <div
      className="fixit-card fixit-card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        border: technician.emergencyReady ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)'
      }}
    >
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={technician.avatar}
              alt={technician.name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '14px',
                objectFit: 'cover',
                border: '2px solid var(--neon-cyan-border)'
              }}
            />
            {technician.verified && (
              <div
                title="FixIt Verified & Background Checked"
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: 'var(--status-success)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)'
                }}
              >
                <ShieldCheck size={13} />
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700 }}>
                {technician.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59E0B' }}>
                  {technician.rating}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                  ({technician.reviewCount})
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--neon-teal)', marginTop: '2px' }}>
              {technician.title}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <MapPin size={12} color="var(--neon-cyan)" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                {technician.serviceArea}
              </span>
            </div>
          </div>
        </div>

        {/* Badges & Metrics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
          <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.7rem' }}>
            {technician.experienceYears} Years Exp.
          </span>
          <span className="fixit-badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
            {technician.jobsCompleted}+ Fixes
          </span>
          {technician.emergencyReady && (
            <span className="fixit-badge fixit-badge-danger" style={{ fontSize: '0.7rem' }}>
              <Zap size={10} /> FixIt Now Ready
            </span>
          )}
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Core Specialties
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {technician.skills.slice(0, 3).map((sk, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(0, 242, 254, 0.05)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  color: 'var(--text-secondary)'
                }}
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions & Price */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Starting visit fee</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
            ₹{technician.startingPrice}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            to={`/technician/${technician.id}`}
            className="fixit-btn fixit-btn-sm fixit-btn-ghost"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            Profile
          </Link>
          <button
            onClick={() => onBookClick(technician)}
            className="fixit-btn fixit-btn-sm fixit-btn-cyan"
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          >
            <span>Book</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
