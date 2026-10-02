import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Recycle, 
  Wrench, 
  Cpu, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="fixit-page">
      <div className="fixit-container" style={{ maxWidth: '880px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.75rem' }}>
            ABOUT FIXIT
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>
            Problem Dikhao, Solution Pao.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            FixIt is India's first AI-powered problem-to-solution repair, reuse, and maintenance ecosystem.
          </p>
        </div>

        {/* Core Philosophy Banner */}
        <div
          className="fixit-card"
          style={{
            padding: '2.5rem',
            marginBottom: '3rem',
            border: '1px solid var(--neon-cyan-border)',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(17, 26, 48, 0.95) 100%)',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--neon-teal)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Our Foundational Principle
          </div>
          <h2 style={{ fontSize: '1.65rem', color: '#fff', lineHeight: 1.4, marginBottom: '1rem', fontWeight: 800 }}>
            "Don't throw away a broken thing immediately. First find out whether it can be repaired, reused, or given a second life."
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Every year, millions of electronic devices, home appliances, bicycles, and furniture pieces are dumped into overflowing landfills simply because a ₹50 capacitor failed or a plastic hinge cracked. FixIt bridges the gap between everyday consumers, diagnostic AI intelligence, authentic spare parts, and neighborhood master repairers.
          </p>
        </div>

        {/* 3 Pillars of FixIt */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div className="fixit-card">
            <Cpu size={28} color="var(--neon-cyan)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
              1. AI Diagnostic Clarity
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              We transform vague sounds and blurry photos into actionable engineering root causes with repairability scores.
            </p>
          </div>

          <div className="fixit-card">
            <Wrench size={28} color="var(--neon-teal)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
              2. Right to Repair & Parts
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Direct access to genuine and compatible spare parts so anyone can fix their own possessions safely.
            </p>
          </div>

          <div className="fixit-card">
            <Recycle size={28} color="var(--status-success)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
              3. Circular Upcycling
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              If a product cannot be fixed economically, we help upcycle it into creative home decor or harvest donor parts.
            </p>
          </div>
        </div>

        {/* Trust, Safety and AI Uncertainty Transparency */}
        <div className="fixit-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <ShieldCheck size={24} color="var(--status-success)" />
            <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
              Trust, Safety & AI Transparency Manifesto
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            <p>
              <strong style={{ color: '#fff' }}>Simulated AI & Confidence Scoring:</strong> FixIt AI estimates are heuristic guidelines based on common failure modes. We clearly distinguish probabilistic estimates from physical physical inspection. We never claim 100% real-world certainty until components are bench-tested.
            </p>
            <p>
              <strong style={{ color: '#fff' }}>Strict Hazard Gatekeeping:</strong> Any repair involving high voltage (microwave capacitors, mains breaker wiring), volatile fuels (petrol tank/carburettor lines), or pressurized systems will automatically display safety warnings and recommend certified professionals.
            </p>
            <p>
              <strong style={{ color: '#fff' }}>Technician Verification Standard:</strong> Every technician on FixIt submits Govt Aadhaar verification, skill certifications (NSDC/ITI), and trade background checks before accepting customer bookings.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
          <Link to="/show-problem" className="fixit-btn fixit-btn-lg fixit-btn-cyan">
            <Sparkles size={18} />
            <span>Show Your Broken Product</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
};
