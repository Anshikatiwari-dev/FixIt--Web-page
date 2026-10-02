import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  ShieldCheck, 
  Recycle, 
  Heart, 
  Zap, 
  PhoneCall, 
  ArrowRight, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--bg-darkest)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '250px',
          background: 'radial-gradient(ellipse at bottom, rgba(0, 242, 254, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="fixit-container">
        
        {/* Core Philosophy Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem 2.5rem',
            marginBottom: '4rem',
            border: '1px solid var(--neon-cyan-border)',
            background: 'linear-gradient(135deg, rgba(16, 25, 46, 0.9) 0%, rgba(7, 11, 22, 0.95) 100%)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="fixit-badge fixit-badge-cyan">FIXIT CORE PHILOSOPHY</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--neon-teal)' }}>Right to Repair & Circular Economy</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
              "Don't throw away a broken thing immediately. First find out whether it can be repaired, reused, or given a second life."
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              FixIt combines diagnostic AI intelligence, verified local technicians, authentic spare parts, and upcycling creativity to end senseless e-waste and save money.
            </p>
          </div>

          <div>
            <Link to="/show-problem" className="fixit-btn fixit-btn-cyan">
              <span>Diagnose a Broken Item</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(0, 242, 254, 0.15)',
                  border: '1px solid var(--neon-cyan-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Wrench size={18} color="var(--neon-cyan)" />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                FIX<span className="text-gradient-cyan">IT</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              India's first AI-powered problem-to-solution repair ecosystem. Showing your problem is all it takes to get actionable diagnostics, parts, or verified master technicians.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-cyan)', fontSize: '0.85rem' }}>
              <Zap size={15} />
              <span>FixIt Now 24/7 Rapid Assistance Ready</span>
            </div>
          </div>

          {/* Core Journey Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Problem to Solution
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <Link to="/show-problem" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={14} color="var(--neon-cyan)" />
                  <span>Show Your Problem (AI)</span>
                </Link>
              </li>
              <li>
                <Link to="/diagnosis" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  AI Diagnostic Dashboard
                </Link>
              </li>
              <li>
                <Link to="/diy" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Interactive DIY Guides
                </Link>
              </li>
              <li>
                <Link to="/technicians" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Verified Technicians
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  OEM Spare Parts Hub
                </Link>
              </li>
              <li>
                <Link to="/repair-vs-replace" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Repair vs Replace Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Circular & Second Life */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Circular Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <Link to="/reuse" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Recycle size={14} color="var(--status-success)" />
                  <span>Give It A Second Life</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Salvage & Parts Marketplace
                </Link>
              </li>
              <li>
                <Link to="/fixit-now" style={{ color: '#EF4444', fontSize: '0.9rem', fontWeight: 600 }}>
                  FixIt Now Emergency Dispatch
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Right to Repair Manifesto
                </Link>
              </li>
              <li>
                <Link to="/technician-dashboard" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Join as Verified Technician
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Trust & Verification
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} color="var(--status-success)" />
                <span>Background Verified Technicians</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--neon-cyan)" />
                <span>Upfront Fair Pricing & No Surprises</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--neon-cyan)" />
                <span>Electrical & Gas Safety Gatekeeping</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="var(--neon-cyan)" />
                <span>100% Genuine / Tested Parts Guarantee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.8rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} FixIt Technologies Inc. Built for sustainability, circular economy & the Right to Repair.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Safety Guidelines</span>
            <span style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Heart size={12} fill="var(--neon-pink)" color="var(--neon-pink)" /> Made for India
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
