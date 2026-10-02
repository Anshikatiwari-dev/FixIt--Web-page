import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Wrench, 
  Clock, 
  AlertTriangle, 
  Package, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  RotateCcw, 
  ShieldAlert 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { SafetyAlertBanner } from '../components/diagnosis/SafetyAlertBanner';

export const DiyPage = () => {
  const { currentDiagnosis, setUserState } = useApp();
  const { showToast } = useToast();

  const diag = currentDiagnosis;

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = diag?.diyTutorial || [];
  const totalSteps = steps.length;
  const progressPct = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  const toggleStep = (stepNumber) => {
    setCompletedSteps((prev) => {
      let updated;
      if (prev.includes(stepNumber)) {
        updated = prev.filter((s) => s !== stepNumber);
      } else {
        updated = [...prev, stepNumber];
        showToast(`Step ${stepNumber} completed!`, 'cyan');

        // Check if finished all steps!
        if (updated.length === totalSteps && totalSteps > 0) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
          showToast('🎉 Congratulations! You repaired your product and prevented e-waste!', 'success', 6000);

          // Update user state saved stats
          setUserState((u) => ({
            ...u,
            profile: {
              ...u.profile,
              savedCarbonKg: (u.profile.savedCarbonKg || 50) + 12.4,
              savedMoneyInr: (u.profile.savedMoneyInr || 15000) + 2100
            }
          }));
        }
      }
      return updated;
    });
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    showToast('Progress reset', 'info');
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="fixit-badge fixit-badge-cyan">INTERACTIVE DIY REPAIR GUIDE</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                DIFFICULTY: <strong style={{ color: 'var(--neon-teal)' }}>{diag.difficulty}</strong>
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '0.4rem' }}>
              Step-by-Step DIY Repair
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Repairing: <strong style={{ color: '#fff' }}>{diag.productName}</strong> • {diag.detectedProblem}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/spare-parts" className="fixit-btn fixit-btn-outline-cyan">
              <Package size={15} />
              <span>Get Required Parts</span>
            </Link>
            <Link to="/technicians" className="fixit-btn fixit-btn-ghost">
              <Users size={15} />
              <span>Need Help? Book Pro</span>
            </Link>
          </div>
        </div>

        {/* Safety Warning */}
        <SafetyAlertBanner warnings={diag.safetyWarnings} isHighRisk={diag.isHighRisk} />

        {/* Overview Bar: Progress, Tools & Parts */}
        <div
          className="fixit-card"
          style={{
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid var(--neon-cyan-border)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
                {progressPct}%
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                  Repair Completion Status
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {completedSteps.length} of {totalSteps} steps completed
                </div>
              </div>
            </div>

            {completedSteps.length > 0 && (
              <button
                onClick={resetProgress}
                className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                style={{ fontSize: '0.75rem' }}
              >
                <RotateCcw size={13} /> Reset Checklist
              </button>
            )}
          </div>

          {/* Progress track */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                background: 'var(--grad-cyan)',
                borderRadius: '4px',
                transition: 'width 0.4s ease',
                boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)'
              }}
            />
          </div>

          {/* Tools & Parts Pill Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="tools-grid">
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wrench size={13} color="var(--neon-cyan)" />
                <span>Required Tools Checklist</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {diag.requiredTools?.map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    ✓ {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Package size={13} color="var(--neon-teal)" />
                <span>Required Replacement Components</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {diag.requiredParts?.map((part, idx) => (
                  <Link
                    key={idx}
                    to="/spare-parts"
                    style={{
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid var(--neon-cyan-border)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.8rem',
                      color: 'var(--neon-cyan)',
                      textDecoration: 'none'
                    }}
                  >
                    {part.name} (₹{part.estimatedPrice}) →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Accordion / List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          {steps.map((st, idx) => {
            const isCompleted = completedSteps.includes(st.stepNumber);
            return (
              <div
                key={st.stepNumber}
                className="fixit-card"
                style={{
                  border: isCompleted
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : '1px solid var(--border-subtle)',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-card)',
                  padding: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  
                  {/* Step Completion Checkbox Button */}
                  <button
                    onClick={() => toggleStep(st.stepNumber)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: isCompleted ? 'var(--status-success)' : 'var(--text-muted)'
                    }}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as done'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={26} color="var(--status-success)" />
                    ) : (
                      <Circle size={26} />
                    )}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.72rem' }}>
                        STEP {st.stepNumber} OF {totalSteps}
                      </span>
                      {isCompleted && (
                        <span className="fixit-badge fixit-badge-success" style={{ fontSize: '0.7rem' }}>
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: isCompleted ? 'var(--text-secondary)' : '#fff', marginBottom: '0.6rem' }}>
                      {st.title}
                    </h3>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {st.instruction}
                    </p>

                    {/* Pro Tip Box */}
                    {st.tip && (
                      <div
                        style={{
                          background: 'rgba(245, 158, 11, 0.08)',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.85rem',
                          color: '#fff'
                        }}
                      >
                        <Lightbulb size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <strong style={{ color: '#F59E0B' }}>FixIt Tip: </strong>
                          <span style={{ color: 'var(--text-secondary)' }}>{st.tip}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Support Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            border: '1px solid var(--border-medium)'
          }}
        >
          <div>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Got Stuck or Missing a Specialized Tool?</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Don't force tight screws or damaged wires. A verified FixIt technician can pick up where you left off.
            </p>
          </div>
          <Link to="/technicians" className="fixit-btn fixit-btn-cyan">
            <span>Find a Technician</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .tools-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
