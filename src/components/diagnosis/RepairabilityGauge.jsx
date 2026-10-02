import React from 'react';

export const RepairabilityGauge = ({ score = 85, size = 150 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = 'var(--neon-cyan)';
  let ratingLabel = 'High Repairability';
  let badgeClass = 'fixit-badge-cyan';

  if (score >= 80) {
    strokeColor = '#00F2FE';
    ratingLabel = 'Highly Repairable';
    badgeClass = 'fixit-badge-cyan';
  } else if (score >= 60) {
    strokeColor = '#F59E0B';
    ratingLabel = 'Moderate DIY Repair';
    badgeClass = 'fixit-badge-warning';
  } else {
    strokeColor = '#EF4444';
    ratingLabel = 'Low / Needs Specialist';
    badgeClass = 'fixit-badge-danger';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: `drop-shadow(0 0 10px ${strokeColor})`
          }}
        />
      </svg>

      {/* Center Score */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#fff', lineHeight: 1 }}>
          {score}%
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
          Repairability
        </span>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <span className={`fixit-badge ${badgeClass}`} style={{ fontSize: '0.75rem' }}>
          {ratingLabel}
        </span>
      </div>
    </div>
  );
};
