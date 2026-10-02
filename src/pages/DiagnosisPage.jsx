import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Cpu, 
  Wrench, 
  Users, 
  Recycle, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  Package, 
  HelpCircle, 
  CheckCircle2, 
  Sliders, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RepairabilityGauge } from '../components/diagnosis/RepairabilityGauge';
import { AiChatAssistant } from '../components/diagnosis/AiChatAssistant';
import { SafetyAlertBanner } from '../components/diagnosis/SafetyAlertBanner';

export const DiagnosisPage = () => {
  const { currentDiagnosis } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const diag = currentDiagnosis;

  if (!diag) {
    return (
      <div className="fixit-page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>No Active Diagnosis Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Please show your problem first so FixIt AI can scan and analyze it.
        </p>
        <Link to="/show-problem" className="fixit-btn fixit-btn-cyan">
          <span>Show Your Problem</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Page Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="fixit-badge fixit-badge-cyan">AI DIAGNOSTIC REPORT</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                CONFIDENCE: {diag.confidenceScore}% • ANALYZED AT {diag.analyzedAt || 'JUST NOW'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '0.4rem' }}>
              Here's What FixIt Found
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Diagnostic breakdown for <strong style={{ color: '#fff' }}>{diag.productName}</strong> ({diag.modelNumber || 'Standard Revision'})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/show-problem" className="fixit-btn fixit-btn-ghost">
              <span>Scan Another Item</span>
            </Link>
          </div>
        </div>

        {/* Safety Warning Banner (if high risk) */}
        <SafetyAlertBanner warnings={diag.safetyWarnings} isHighRisk={diag.isHighRisk} />

        {/* Top Summary Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.75rem', marginBottom: '2.5rem' }} className="diagnosis-top-grid">
          
          {/* Left: Core Diagnosis Card */}
          <div className="fixit-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0, 242, 254, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={18} color="var(--neon-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
                Primary Root Cause Detected
              </h3>
            </div>

            {/* User Captured Visual Evidence Telemetry */}
            {diag.userSubmittedImage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'rgba(0, 242, 254, 0.04)',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '1.25rem'
                }}
              >
                <img
                  src={diag.userSubmittedImage}
                  alt="Captured product evidence"
                  style={{
                    width: '68px',
                    height: '68px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid var(--neon-cyan-border)',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <CheckCircle2 size={15} color="var(--neon-cyan)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                      Captured Visual Evidence Linked
                    </span>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    Telemetry frame processed via FixIt diagnostic engine (Simulated Neural Heuristics • Ready for Vision API).
                  </p>
                </div>
              </div>
            )}

            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--neon-cyan)',
                background: 'rgba(0, 242, 254, 0.05)',
                border: '1px solid var(--neon-cyan-border)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '1.25rem'
              }}
            >
              {diag.detectedProblem}
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {diag.summary}
            </p>

            {/* Quick Metrics Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Estimated Cost</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10B981' }}>{diag.estimatedCost}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Repair Time</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{diag.estimatedTime}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Difficulty</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--neon-teal)' }}>{diag.difficulty}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>DIY Feasibility</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: diag.diyPossible ? '#10B981' : '#EF4444' }}>
                  {diag.diyPossible ? 'Yes (Safe)' : 'Pro Advised'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Repairability Gauge Card */}
          <div className="fixit-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <RepairabilityGauge score={diag.repairabilityScore} size={180} />
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                High Circular Recovery Potential
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                Spare parts are readily available and motor/chassis integrity remains 100% intact.
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            THREE MAIN PATHS FOR ACTION
        ================================================== */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.45rem', color: '#fff', marginBottom: '1.25rem' }}>
            Choose Your Solution Path
          </h2>

          <div className="grid-3">
            
            {/* PATH 1: FIX IT YOURSELF */}
            <div
              className="fixit-card fixit-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                border: diag.diyPossible ? '1px solid var(--neon-cyan-border)' : '1px solid var(--border-subtle)',
                background: diag.diyPossible ? 'linear-gradient(180deg, rgba(0, 242, 254, 0.05) 0%, rgba(17, 26, 48, 0.8) 100%)' : 'var(--bg-card)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wrench size={20} color="var(--neon-cyan)" />
                  </div>
                  {diag.diyPossible && (
                    <span className="fixit-badge fixit-badge-cyan">Recommended</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                  Fix It Yourself (DIY)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Follow our step-by-step interactive tutorial with tool checklists and completion markers.
                </p>

                <div style={{ fontSize: '0.82rem', color: 'var(--neon-teal)', marginBottom: '1.5rem' }}>
                  Estimated Effort: {diag.estimatedTime} • Cost: {diag.estimatedCost}
                </div>
              </div>

              <Link to="/diy" className="fixit-btn fixit-btn-cyan" style={{ width: '100%' }}>
                <span>Start Step-by-Step DIY</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* PATH 2: BOOK A TECHNICIAN */}
            <div
              className="fixit-card fixit-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                border: !diag.diyPossible || diag.isHighRisk ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--border-subtle)',
                background: !diag.diyPossible || diag.isHighRisk ? 'linear-gradient(180deg, rgba(239, 68, 68, 0.06) 0%, rgba(17, 26, 48, 0.8) 100%)' : 'var(--bg-card)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} color="#3B82F6" />
                  </div>
                  {(!diag.diyPossible || diag.isHighRisk) && (
                    <span className="fixit-badge fixit-badge-danger">Safety Recommended</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                  Book a Master Technician
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Have a verified local specialist visit your doorstep with genuine parts and warranty.
                </p>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Doorstep Inspection starts at ₹249 - ₹349
                </div>
              </div>

              <Link to="/technicians" className="fixit-btn fixit-btn-outline-cyan" style={{ width: '100%' }}>
                <span>Find Nearby Technicians</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* PATH 3: REUSE / REPLACE */}
            <div
              className="fixit-card fixit-card-interactive fixit-card-glow-pink"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 42, 133, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Recycle size={20} color="var(--neon-pink)" />
                  </div>
                  <span className="fixit-badge fixit-badge-pink">Circular Life</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                  Reuse / Replace / Salvage
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Calculate repair ROI vs buying new, or upcycle the casing into a creative secondary project.
                </p>

                <div style={{ fontSize: '0.82rem', color: 'var(--neon-pink)', marginBottom: '1.5rem' }}>
                  Alternative: {diag.reuseAlternative?.title || 'Upcycle & Salvage Parts'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/repair-vs-replace" className="fixit-btn fixit-btn-sm fixit-btn-ghost" style={{ flex: 1 }}>
                  Compare ROI
                </Link>
                <Link to="/reuse" className="fixit-btn fixit-btn-sm fixit-btn-pink" style={{ flex: 1 }}>
                  Second Life
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================
            EXPLANATION & INTERACTIVE CHAT ASSISTANT
        ================================================== */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '3rem' }} className="diagnosis-bottom-grid">
          
          {/* Why did FixIt suggest this? */}
          <div className="fixit-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <HelpCircle size={20} color="var(--neon-cyan)" />
              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
                Why did FixIt suggest this?
              </h3>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {diag.whyFixItSuggested}
            </p>

            {/* Required Parts Link Section */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Package size={16} color="var(--neon-cyan)" />
                <span>Compatible Replacement Parts Identified ({diag.requiredParts?.length || 0}):</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
                {diag.requiredParts?.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{p.type}</div>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-teal)' }}>
                      ₹{p.estimatedPrice}
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/spare-parts" className="fixit-btn fixit-btn-sm fixit-btn-outline-cyan">
                <span>View in Spare Parts Store</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Ask FixIt AI Interactive Assistant */}
          <div>
            <AiChatAssistant diagnosis={diag} />
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .diagnosis-top-grid, .diagnosis-bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
