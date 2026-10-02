import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight, User, Mail, Lock, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { setUserState, setCurrentRole } = useApp();
  const { showToast } = useToast();

  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setUserState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        email
      }
    }));
    setCurrentRole(role);
    showToast(`Account created successfully as ${role.toUpperCase()}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="fixit-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fixit-container" style={{ maxWidth: '480px' }}>
        
        <div
          className="fixit-card animate-scale-in"
          style={{
            padding: '2.5rem 2rem',
            border: '1px solid var(--neon-cyan-border)',
            background: 'var(--bg-glass-heavy)',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid var(--neon-cyan-border)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}
            >
              <Wrench size={24} color="var(--neon-cyan)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Join the FixIt Movement</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Repair, reuse, and give broken possessions a second life.
            </p>
          </div>

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Account Type */}
            <div>
              <label className="fixit-label">I want to join as:</label>
              <div className="grid-2" style={{ gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: role === 'user' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                    background: role === 'user' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: role === 'user' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Customer / Fixer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('technician')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: role === 'technician' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                    background: role === 'technician' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: role === 'technician' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Repair Technician
                </button>
              </div>
            </div>

            <div>
              <label className="fixit-label">Full Name</label>
              <input
                type="text"
                required
                className="fixit-input"
                placeholder="e.g. Rahul Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="fixit-label">Email Address</label>
              <input
                type="email"
                required
                className="fixit-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="fixit-label">Password</label>
              <input
                type="password"
                required
                className="fixit-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="fixit-btn fixit-btn-cyan" style={{ width: '100%', padding: '0.85rem' }}>
              <span>Create Account</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
