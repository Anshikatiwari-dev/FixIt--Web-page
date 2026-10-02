import React, { useState } from 'react';
import { 
  Wrench, 
  DollarSign, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Star, 
  Zap, 
  User, 
  Phone, 
  FileText, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const TechnicianDashboardPage = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('requests');
  const [isOnline, setIsOnline] = useState(true);

  // Technician Mock State
  const [jobRequests, setJobRequests] = useState([
    {
      id: 'req-501',
      customer: 'Priya Sundaram',
      phone: '+91 98450 11234',
      product: 'LG 28L Convection Microwave',
      problem: 'Glass turntable plate stuck, sparks heard',
      location: 'Indiranagar 100ft Road, Bengaluru',
      requestedDate: 'Today, 4:00 PM',
      estimatedPrice: 650,
      urgent: false
    },
    {
      id: 'req-502',
      customer: 'Kunal Singhania',
      phone: '+91 97110 99887',
      product: 'Royal Enfield Classic 350',
      problem: 'Monsoon starting trouble, petrol dripping from carb',
      location: 'Koramangala 4th Block, Bengaluru',
      requestedDate: 'Immediate (FixIt Now)',
      estimatedPrice: 750,
      urgent: true
    }
  ]);

  const [activeJobs, setActiveJobs] = useState([
    {
      id: 'job-301',
      customer: 'Siddharth Roy',
      product: 'Orient Electric Apex Ceiling Fan',
      status: 'On The Way (ETA 12 mins)',
      location: 'HSR Layout Sector 2',
      price: 350,
      startedAt: '2:15 PM'
    }
  ]);

  const earnings = {
    total: 54800,
    month: 18450,
    jobsDone: 48,
    platformFee: '10%',
    recentPayouts: [
      { id: 'pay-901', date: 'Yesterday', amount: 4850, status: 'Credited' },
      { id: 'pay-900', date: '24 Sep 2024', amount: 6200, status: 'Credited' }
    ]
  };

  const handleAcceptJob = (req) => {
    setJobRequests((prev) => prev.filter((r) => r.id !== req.id));
    setActiveJobs((prev) => [
      {
        id: `job-${Date.now().toString().slice(-3)}`,
        customer: req.customer,
        product: req.product,
        status: 'Scheduled & Confirmed',
        location: req.location,
        price: req.estimatedPrice,
        startedAt: req.requestedDate
      },
      ...prev
    ]);
    showToast(`Accepted job request from ${req.customer}!`, 'success');
  };

  const handleDeclineJob = (id) => {
    setJobRequests((prev) => prev.filter((r) => r.id !== id));
    showToast('Job request declined', 'info');
  };

  const handleUpdateStatus = (jobId, newStatus) => {
    setActiveJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    showToast(`Job status updated to: ${newStatus}`, 'cyan');
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header Bar with Online/Offline Dispatch Switch */}
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
            border: '1px solid var(--neon-cyan-border)',
            background: 'linear-gradient(135deg, rgba(17, 26, 48, 0.9) 0%, rgba(7, 11, 22, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
                alt="Rajesh Kumar Verma"
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--neon-cyan)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: isOnline ? 'var(--status-success)' : '#64748B',
                  border: '2px solid #050811'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>
                  Rajesh Kumar Verma
                </h1>
                <span className="fixit-badge fixit-badge-success">VERIFIED MASTER</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                NSDC Certified Electrical & Appliance Specialist • Rating 4.9 ★
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                setIsOnline(!isOnline);
                showToast(`Dispatch status: ${!isOnline ? 'ONLINE' : 'OFFLINE'}`, !isOnline ? 'success' : 'warning');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: isOnline ? '1px solid var(--status-success)' : '1px solid var(--border-subtle)',
                color: isOnline ? 'var(--status-success)' : 'var(--text-tertiary)',
                borderRadius: '30px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <Zap size={15} />
              <span>{isOnline ? 'Online for FixIt Now' : 'Offline / On Break'}</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Pending Requests</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-cyan)', marginTop: '4px' }}>
              {jobRequests.length}
            </div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Active Jobs In-Flight</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {activeJobs.length}
            </div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>This Month's Earnings</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              ₹{earnings.month.toLocaleString()}
            </div>
          </div>

          <div className="fixit-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Jobs Completed</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-teal)', marginTop: '4px' }}>
              {earnings.jobsDone}+
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'requests', label: `New Requests (${jobRequests.length})` },
            { id: 'active', label: `Active Jobs (${activeJobs.length})` },
            { id: 'earnings', label: 'Earnings & Payouts' },
            { id: 'profile', label: 'Skills & Coverage' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`fixit-btn fixit-btn-sm ${activeTab === tab.id ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: NEW JOB REQUESTS */}
        {activeTab === 'requests' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {jobRequests.length === 0 ? (
              <div className="fixit-card" style={{ textAlign: 'center', padding: '3rem' }}>
                <CheckCircle2 size={32} color="var(--status-success)" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ color: '#fff' }}>All Caught Up!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No pending requests. Keep FixIt Now toggle active to receive instant nearby calls.</p>
              </div>
            ) : (
              jobRequests.map((req) => (
                <div
                  key={req.id}
                  className="fixit-card"
                  style={{
                    padding: '1.5rem',
                    border: req.urgent ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
                    background: req.urgent ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
                          {req.product}
                        </h3>
                        {req.urgent && (
                          <span className="fixit-badge fixit-badge-danger">URGENT DISPATCH</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Customer: <strong style={{ color: '#fff' }}>{req.customer}</strong> • {req.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--neon-teal)', marginTop: '4px' }}>
                        <MapPin size={13} /> {req.location}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>
                        ₹{req.estimatedPrice}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Slot: {req.requestedDate}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <strong>Reported Issue:</strong> {req.problem}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                      onClick={() => handleDeclineJob(req.id)}
                      className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAcceptJob(req)}
                      className="fixit-btn fixit-btn-sm fixit-btn-cyan"
                    >
                      <CheckCircle2 size={15} />
                      <span>Accept Job & Contact Customer</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE JOBS */}
        {activeTab === 'active' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeJobs.map((job) => (
              <div key={job.id} className="fixit-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{job.product}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Customer: {job.customer} • {job.location}
                    </div>
                  </div>
                  <span className="fixit-badge fixit-badge-cyan">{job.status}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <button
                    onClick={() => handleUpdateStatus(job.id, 'Arrived on Site')}
                    className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                  >
                    Mark Arrived
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(job.id, 'Diagnosis & Testing Complete')}
                    className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                  >
                    Testing Done
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(job.id, 'Repair Finished (Ready for Payment)')}
                    className="fixit-btn fixit-btn-sm fixit-btn-cyan"
                  >
                    Complete Repair
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.5rem' }}>Earnings & Direct Bank Payouts</h3>
            <div className="grid-3" style={{ marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>All-Time Gross Earnings</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>₹{earnings.total.toLocaleString()}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Platform Maintenance Fee</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neon-teal)', marginTop: '4px' }}>{earnings.platformFee}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Next Settlement</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>Every Tuesday</div>
              </div>
            </div>

            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Recent Bank Transfers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {earnings.recentPayouts.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>NEFT Transfer to HDFC Bank (**** 4812)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{p.id} • {p.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>+₹{p.amount}</div>
                    <span className="fixit-badge fixit-badge-success" style={{ fontSize: '0.65rem' }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & COVERAGE */}
        {activeTab === 'profile' && (
          <div className="fixit-card animate-fade-in" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>Coverage Area & Skills</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Keep your travel radius updated to receive jobs within your preferred neighborhood.
            </p>
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="fixit-label">Service Neighborhoods</label>
                <input type="text" className="fixit-input" defaultValue="Indiranagar, Koramangala, HSR Layout, Whitefield" />
              </div>
              <div>
                <label className="fixit-label">Maximum Travel Distance (km)</label>
                <input type="number" className="fixit-input" defaultValue={12} />
              </div>
            </div>
            <button
              onClick={() => showToast('Coverage updated successfully!', 'success')}
              className="fixit-btn fixit-btn-cyan"
            >
              Update Coverage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
