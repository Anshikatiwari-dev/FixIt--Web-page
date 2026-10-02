import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Wrench, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Check, 
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const AdminPage = () => {
  const { adminData, updateVerificationStatus } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('verifications');

  const { metrics, pendingVerifications, recentPlatformBookings } = adminData;

  const handleApprove = (id, name) => {
    updateVerificationStatus(id, 'Verified');
    showToast(`Technician "${name}" approved & verified!`, 'success');
  };

  const handleReject = (id, name) => {
    updateVerificationStatus(id, 'Rejected');
    showToast(`Technician "${name}" verification rejected`, 'warning');
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="fixit-badge fixit-badge-cyan">FIXIT MASTER ADMIN CONSOLE</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>System Telemetry & Quality Oversight</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#fff', fontWeight: 800 }}>
              FixIt Platform Governance
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-success)', boxShadow: '0 0 10px #10B981' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>All 14 Microservices Healthy</span>
          </div>
        </div>

        {/* Global Metric KPI Cards */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Registered Fixers & Users</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {metrics.totalUsers.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', marginTop: '4px' }}>+14% this month</div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Active Technicians</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neon-cyan)', marginTop: '4px' }}>
              {metrics.activeTechnicians}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Across 12 major metro hubs</div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>E-Waste Diverted</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              {metrics.totalEwasteDivertedTons} Tons
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Saved from landfills</div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total User Money Saved</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neon-teal)', marginTop: '4px' }}>
              {metrics.userSavingsTotalInr}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Vs buying new replacements</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`fixit-btn fixit-btn-sm ${activeTab === 'verifications' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
          >
            Technician Verification Queue ({pendingVerifications.filter(v => v.status !== 'Verified').length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`fixit-btn fixit-btn-sm ${activeTab === 'bookings' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
          >
            Platform Bookings ({recentPlatformBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`fixit-btn fixit-btn-sm ${activeTab === 'safety' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
          >
            Safety & Hazard Audit Logs
          </button>
        </div>

        {/* TAB 1: TECHNICIAN VERIFICATION QUEUE */}
        {activeTab === 'verifications' && (
          <div className="fixit-card animate-fade-in" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Pending Technician Verifications</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Review Aadhaar, NSDC skill certifications, and trade licenses before enabling live booking.</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px' }}>Applicant</th>
                  <th style={{ padding: '10px' }}>Specialty</th>
                  <th style={{ padding: '10px' }}>Location</th>
                  <th style={{ padding: '10px' }}>Documents Submitted</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerifications.map((v) => (
                  <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 600 }}>
                      {v.name}
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>ID: {v.id}</div>
                    </td>
                    <td style={{ padding: '12px 10px', color: 'var(--neon-teal)' }}>
                      {v.specialty}
                    </td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>
                      {v.location}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {v.documentsSubmitted.map((doc, idx) => (
                          <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span
                        className="fixit-badge"
                        style={{
                          background: v.status === 'Verified' ? 'rgba(16, 185, 129, 0.15)' : v.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: v.status === 'Verified' ? 'var(--status-success)' : v.status === 'Rejected' ? 'var(--status-danger)' : 'var(--status-warning)',
                          fontSize: '0.7rem'
                        }}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      {v.status !== 'Verified' && (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => handleApprove(v.id, v.name)}
                            className="fixit-btn fixit-btn-sm"
                            style={{ background: 'var(--status-success)', color: '#fff', padding: '4px 10px', fontSize: '0.75rem' }}
                            title="Approve & Verify"
                          >
                            <Check size={13} /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(v.id, v.name)}
                            className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                            style={{ color: '#EF4444', padding: '4px 10px', fontSize: '0.75rem' }}
                            title="Reject"
                          >
                            <X size={13} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: PLATFORM BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="fixit-card animate-fade-in" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Active Service Bookings</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px' }}>Booking ID</th>
                  <th style={{ padding: '10px' }}>Customer</th>
                  <th style={{ padding: '10px' }}>Technician</th>
                  <th style={{ padding: '10px' }}>Issue Description</th>
                  <th style={{ padding: '10px' }}>Scheduled</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPlatformBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>{b.id}</td>
                    <td style={{ padding: '12px 10px', color: '#fff' }}>{b.customer}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{b.technician}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{b.issue}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-tertiary)' }}>{b.dateTime}</td>
                    <td style={{ padding: '12px 10px', color: '#10B981', fontWeight: 700 }}>{b.amount}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.7rem' }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: SAFETY & HAZARD AUDIT LOGS */}
        {activeTab === 'safety' && (
          <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>AI Safety Engine Telemetry</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              FixIt AI continuously monitors diagnosed issues for lethal voltages, flammable gases, and pressurized systems to suppress dangerous DIY tutorials.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>Microwave Convection HV Capacitor Alert</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Rule: BLK-HV-2000V • Triggered 14 times today • Forced technician referral</div>
                </div>
                <span className="fixit-badge fixit-badge-danger">CRITICAL HAZARD BLOCKED</span>
              </div>

              <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>Lithium Battery Thermal Swelling Rule</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Rule: WARN-LIPO-SWELL • Triggered 28 times this week • DIY puncture advisory prohibited</div>
                </div>
                <span className="fixit-badge fixit-badge-warning">SAFETY ADVISORY ACTIVE</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
