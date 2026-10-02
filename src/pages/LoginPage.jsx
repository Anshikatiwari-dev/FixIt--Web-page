import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight, ShieldCheck, User, Lock, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();
  const { showToast } = useToast();

  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('aakash.sharma@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentRole(role);
    showToast(`Logged in successfully as ${role.toUpperCase()}!`, 'success');

    if (role === 'technician') {
      navigate('/technician-dashboard');
    } else if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixit-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fixit-container" style={{ maxWidth: '460px' }}>
        
        <div
          className="fixit-card animate-scale-in"
          style={{
            padding: '2.5rem 2rem',
            border: '1px solid var(--neon-cyan-border)',
            background: 'var(--bg-glass-heavy)',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}
        >
          {/* Logo */}
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
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Sign in to FixIt</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Problem Dikhao, Solution Pao.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Persona Switcher */}
            <div>
              <label className="fixit-label">Choose Login Persona</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {['user', 'technician', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      if (r === 'technician') setEmail('rajesh.verma@example.com');
                      else if (r === 'admin') setEmail('admin@fixit.ai');
                      else setEmail('aakash.sharma@example.com');
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: role === r ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                      background: role === r ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: role === r ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="fixit-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  className="fixit-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="fixit-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  className="fixit-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              </div>
            </div>

            <button type="submit" className="fixit-btn fixit-btn-cyan" style={{ width: '100%', padding: '0.85rem' }}>
              <span>Sign In as {role.toUpperCase()}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>
              Create Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
