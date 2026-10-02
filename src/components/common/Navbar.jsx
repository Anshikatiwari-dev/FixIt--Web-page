import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wrench, 
  Sparkles, 
  BookOpen, 
  Users, 
  Cpu, 
  Recycle, 
  ShoppingBag, 
  Zap, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const location = useLocation();
  const { cart, setIsCartOpen, currentRole, setCurrentRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navLinks = [
    { to: '/show-problem', label: 'Show Problem', icon: Sparkles, highlight: true },
    { to: '/diagnosis', label: 'Diagnosis', icon: Cpu },
    { to: '/diy', label: 'DIY Repair', icon: BookOpen },
    { to: '/technicians', label: 'Technicians', icon: Users },
    { to: '/spare-parts', label: 'Spare Parts', icon: Wrench },
    { to: '/repair-vs-replace', label: 'Repair vs Replace', icon: Sliders },
    { to: '/reuse', label: 'Second Life', icon: Recycle },
    { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { to: '/fixit-now', label: 'FixIt Now', icon: Zap, emergency: true }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(7, 11, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="fixit-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px' }}>
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.25) 100%)',
              border: '1px solid var(--neon-cyan-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 242, 254, 0.25)'
            }}
          >
            <Wrench size={22} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                FIX<span className="text-gradient-cyan">IT</span>
              </span>
              <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                AI REPAIR
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Problem Dikhao, Solution Pao
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}
          className="desktop-nav"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            if (item.emergency) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="fixit-btn fixit-btn-sm fixit-btn-emergency"
                  style={{ 
                    padding: '6px 12px', 
                    fontSize: '0.8rem',
                    borderRadius: '20px',
                    marginLeft: '4px'
                  }}
                >
                  <Zap size={13} />
                  <span>FixIt Now</span>
                </Link>
              );
            }

            if (item.highlight) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#070B16',
                    background: 'var(--grad-cyan)',
                    boxShadow: '0 2px 10px rgba(0, 242, 254, 0.3)',
                    transition: 'all 0.2s ease',
                    marginRight: '4px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Show Problem</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: active ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                  background: active ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  border: active ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} opacity={active ? 1 : 0.75} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Action Icons: Cart & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            aria-label="Open Cart"
          >
            <ShoppingCart size={19} color="var(--neon-cyan)" />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--neon-pink)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 0 8px rgba(255, 42, 133, 0.6)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Role / Dashboard Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '6px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <User size={15} color="var(--neon-cyan)" />
              <span style={{ textTransform: 'capitalize' }}>{currentRole}</span>
            </button>

            {roleDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '210px',
                  background: 'var(--bg-glass-heavy)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 1100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ padding: '6px 8px', fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Switch View & Dashboards
                </div>
                
                <Link
                  to="/dashboard"
                  onClick={() => { setCurrentRole('user'); setRoleDropdownOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: currentRole === 'user' ? 'var(--neon-cyan)' : 'var(--text-primary)',
                    background: currentRole === 'user' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                    textDecoration: 'none'
                  }}
                >
                  <User size={15} />
                  <span>User Dashboard</span>
                </Link>

                <Link
                  to="/technician-dashboard"
                  onClick={() => { setCurrentRole('technician'); setRoleDropdownOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: currentRole === 'technician' ? 'var(--neon-cyan)' : 'var(--text-primary)',
                    background: currentRole === 'technician' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                    textDecoration: 'none'
                  }}
                >
                  <Wrench size={15} />
                  <span>Technician Portal</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => { setCurrentRole('admin'); setRoleDropdownOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: currentRole === 'admin' ? 'var(--neon-cyan)' : 'var(--text-primary)',
                    background: currentRole === 'admin' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                    textDecoration: 'none'
                  }}
                >
                  <ShieldCheck size={15} />
                  <span>Admin Panel</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '6px',
              cursor: 'pointer',
              display: 'none'
            }}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer animate-fade-in"
          style={{
            background: 'var(--bg-glass-heavy)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: item.emergency ? '#EF4444' : active ? 'var(--neon-cyan)' : 'var(--text-primary)',
                  background: active ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                  border: active ? '1px solid var(--neon-cyan-border)' : '1px solid transparent'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Responsive CSS for Desktop/Mobile Navbar */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
