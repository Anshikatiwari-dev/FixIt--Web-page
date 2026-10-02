import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Wrench, 
  Package, 
  Clock, 
  Bookmark, 
  Settings, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Leaf, 
  DollarSign 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const UserDashboardPage = () => {
  const { userState, setUserState, setCurrentRole } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');

  const { profile, activeRepairs, savedProducts, partOrders } = userState;

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Top User Greeting Bar */}
        <div
          className="fixit-card"
          style={{
            padding: '1.75rem 2rem',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(17, 26, 48, 0.9) 0%, rgba(7, 11, 22, 0.95) 100%)',
            border: '1px solid var(--neon-cyan-border)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--neon-cyan)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>
                  Welcome back, {profile.name}!
                </h1>
                <span className="fixit-badge fixit-badge-cyan">PRO FIXER</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {profile.location} • Member since {profile.memberSince}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '8px 14px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Total Money Saved</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>₹{profile.savedMoneyInr.toLocaleString()}</div>
            </div>
            <div style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid var(--neon-cyan-border)', padding: '8px 14px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>CO₂ Diverted</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>{profile.savedCarbonKg} kg</div>
            </div>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar + Main Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }} className="dash-grid">
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'overview', label: 'Overview', icon: Sparkles },
              { id: 'repairs', label: 'My Repairs', icon: Wrench, count: activeRepairs.length },
              { id: 'products', label: 'My Products', icon: ShieldCheck, count: savedProducts.length },
              { id: 'orders', label: 'Spare Part Orders', icon: Package, count: partOrders.length },
              { id: 'profile', label: 'Profile & Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: isActive ? '1px solid var(--neon-cyan-border)' : '1px solid transparent',
                    background: isActive ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    color: isActive ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={17} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      style={{
                        background: isActive ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.08)',
                        color: isActive ? '#050811' : 'var(--text-tertiary)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '10px'
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div style={{ marginTop: '2rem', padding: '12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                Need Immediate Help?
              </div>
              <Link to="/fixit-now" className="fixit-btn fixit-btn-sm fixit-btn-emergency" style={{ width: '100%', fontSize: '0.78rem' }}>
                FixIt Now Emergency
              </Link>
            </div>
          </div>

          {/* Main Content Panels */}
          <div>
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Active Repairs Section */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
                      Active Repair Pipelines
                    </h3>
                    <Link to="/show-problem" className="fixit-btn fixit-btn-sm fixit-btn-cyan">
                      <Plus size={14} /> <span>Diagnose New Problem</span>
                    </Link>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activeRepairs.map((rep) => (
                      <div
                        key={rep.id}
                        className="fixit-card"
                        style={{ padding: '1.25rem 1.5rem', border: '1px solid var(--border-subtle)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                              {rep.productName}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--neon-teal)', marginTop: '2px' }}>
                              Method: {rep.method} • {rep.date}
                            </div>
                          </div>
                          <span className="fixit-badge fixit-badge-cyan">
                            {rep.status}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                            <span>Progress</span>
                            <span>{rep.completionPercentage}%</span>
                          </div>
                          <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${rep.completionPercentage}%`, background: 'var(--grad-cyan)', borderRadius: '3px' }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '0.82rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Cost Estimate: <strong style={{ color: '#fff' }}>{rep.costEstimate}</strong></span>
                          <Link to="/diy" style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            View Tutorial / Status <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Spare Part Orders */}
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>
                    Recent Spare Part Deliveries
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {partOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="fixit-card"
                        style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Truck size={18} color="var(--neon-cyan)" />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{ord.item}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Order #{ord.id} • {ord.deliveryEta}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10B981' }}>₹{ord.amount}</div>
                          <span className="fixit-badge fixit-badge-success" style={{ fontSize: '0.68rem' }}>{ord.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* MY REPAIRS TAB */}
            {activeTab === 'repairs' && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>My Diagnostic & Repair History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {activeRepairs.map((rep) => (
                    <div key={rep.id} className="fixit-card" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ color: '#fff' }}>{rep.productName}</h4>
                        <span className="fixit-badge fixit-badge-cyan">{rep.status}</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Method: {rep.method} • Booked for {rep.date} • Estimated Total: {rep.costEstimate}
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/diagnosis" className="fixit-btn fixit-btn-sm fixit-btn-cyan">
                          View AI Diagnosis
                        </Link>
                        <Link to="/diy" className="fixit-btn fixit-btn-sm fixit-btn-ghost">
                          Open DIY Checklist
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>My Registered Household Products</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Track maintenance, manuals, and health scores to maximize longevity.</p>
                  </div>
                  <button
                    onClick={() => showToast('Registering new product modal', 'cyan')}
                    className="fixit-btn fixit-btn-sm fixit-btn-cyan"
                  >
                    <Plus size={14} /> Add Product
                  </button>
                </div>

                <div className="grid-2">
                  {savedProducts.map((prod) => (
                    <div key={prod.id} className="fixit-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>{prod.name}</h4>
                        <span className="fixit-badge fixit-badge-success">{prod.healthScore}% Health</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                        Purchased {prod.purchaseYear} • Serial: {prod.serial}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {prod.notes}
                      </p>
                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', fontSize: '0.78rem', color: 'var(--neon-teal)' }}>
                        Last serviced: {prod.lastServiced}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>Order History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {partOrders.map((ord) => (
                    <div key={ord.id} className="fixit-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{ord.item}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>ID: #{ord.id} • Placed {ord.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>₹{ord.amount}</div>
                        <span className="fixit-badge fixit-badge-cyan">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Profile & Preferences</h3>
                <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label className="fixit-label">Full Name</label>
                    <input type="text" className="fixit-input" defaultValue={profile.name} />
                  </div>
                  <div>
                    <label className="fixit-label">Email Address</label>
                    <input type="email" className="fixit-input" defaultValue={profile.email} />
                  </div>
                  <div>
                    <label className="fixit-label">Phone Number</label>
                    <input type="text" className="fixit-input" defaultValue={profile.phone} />
                  </div>
                  <div>
                    <label className="fixit-label">Saved Address</label>
                    <input type="text" className="fixit-input" defaultValue={profile.location} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Profile preferences updated successfully!', 'success')}
                  className="fixit-btn fixit-btn-cyan"
                >
                  Save Changes
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .dash-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
