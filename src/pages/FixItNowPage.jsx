import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation, 
  ArrowRight, 
  RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { MOCK_TECHNICIANS } from '../data/mockTechnicians';

export const FixItNowPage = () => {
  const { activeEmergency, dispatchEmergency, cancelEmergency } = useApp();
  const { showToast } = useToast();

  const [problemType, setProblemType] = useState('Bike / Two-Wheeler Roadside Stoppage');
  const [userLocation, setUserLocation] = useState('100ft Road, Indiranagar, Bengaluru');
  const [selectedTech, setSelectedTech] = useState(MOCK_TECHNICIANS[2]); // Balwinder Singh (Emergency Ready)
  const [isDispatching, setIsDispatching] = useState(false);

  const emergencyCategories = [
    { id: 'bike', label: 'Bike / Scooter Breakdown', icon: '🏍️', typicalEta: '15-20 min' },
    { id: 'car', label: 'Car Battery / Puncture / Overheat', icon: '🚗', typicalEta: '20-25 min' },
    { id: 'fridge', label: 'Refrigerator Total Cooling Stop', icon: '❄️', typicalEta: '30-40 min' },
    { id: 'electrical', label: 'Main Breaker Trip / Sparking', icon: '⚡', typicalEta: '25-30 min' }
  ];

  const handleDispatch = (e) => {
    e.preventDefault();
    setIsDispatching(true);

    setTimeout(() => {
      dispatchEmergency({
        problemType,
        location: userLocation,
        technicianName: selectedTech.name,
        category: 'bike'
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast(`🚨 FixIt Now Dispatched! ${selectedTech.name} is on the way (ETA 18 min)`, 'danger', 6000);
      setIsDispatching(false);
    }, 1000);
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container" style={{ maxWidth: '920px' }}>
        
        {/* Top Emergency Beacon Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.25) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '1.25rem',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 0 35px rgba(239, 68, 68, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="fixit-badge fixit-badge-danger" style={{ animation: 'pulsePink 2s infinite' }}>
              <Zap size={13} /> RAPID RESPONSE HOTLINE
            </span>
            <span style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 700 }}>
              Average Dispatch ETA: 18 Minutes
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', fontWeight: 800, marginBottom: '0.5rem' }}>
            FixIt Now — Urgent Emergency Service
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', fontSize: '1rem', lineHeight: 1.6 }}>
            Stuck with a dead battery on the road, flooded geyser, or sparking appliance? FixIt Now dispatches the closest mobile technician immediately.
          </p>
        </div>

        {/* If Active Emergency: Show Live Tracker Card */}
        {activeEmergency ? (
          <div
            className="fixit-card animate-scale-in"
            style={{
              padding: '2.5rem',
              marginBottom: '3rem',
              border: '2px solid #EF4444',
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(17, 26, 48, 0.95) 100%)',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.35)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="fixit-badge fixit-badge-danger" style={{ marginBottom: '8px' }}>
                  DISPATCH ACTIVE & EN ROUTE
                </span>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800 }}>
                  Technician is Arriving
                </h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Emergency ID: <strong style={{ color: '#fff' }}>{activeEmergency.id}</strong> • Started at {activeEmergency.startedAt}
                </div>
              </div>

              {/* Countdown ETA Badge */}
              <div
                style={{
                  background: 'rgba(5, 8, 17, 0.9)',
                  border: '1px solid #EF4444',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Estimated Arrival</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                  14 MINS
                </div>
              </div>
            </div>

            {/* Radar Sweep Simulator */}
            <div
              style={{
                position: 'relative',
                height: '140px',
                borderRadius: '12px',
                background: '#070D1C',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}
            >
              <div className="futuristic-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
              {/* Radar beam line */}
              <div
                className="animate-radar"
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  background: 'conic-gradient(from 0deg, rgba(239, 68, 68, 0.3) 0deg, transparent 60deg)'
                }}
              />
              <div style={{ zIndex: 5, textAlign: 'center' }}>
                <Navigation size={28} color="#EF4444" className="animate-pulse" />
                <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600, marginTop: '4px' }}>
                  GPS Tracking: Mobile Van 2.1 km away
                </div>
              </div>
            </div>

            {/* Assigned Technician Bio */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                  alt="Balwinder Singh"
                  style={{ width: '54px', height: '54px', borderRadius: '12px', border: '2px solid #EF4444' }}
                />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                    {activeEmergency.technicianName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Mobile Tool Van • 4.95 ★ (980 jobs)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`tel:${activeEmergency.technicianPhone}`}
                  className="fixit-btn fixit-btn-sm"
                  style={{ background: 'var(--status-success)', color: '#fff' }}
                >
                  <Phone size={14} /> Call Technician
                </a>
                <button
                  onClick={cancelEmergency}
                  className="fixit-btn fixit-btn-sm fixit-btn-ghost"
                >
                  Cancel Request
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--status-success)" />
              <span>Standard emergency dispatch fee: <strong>₹{activeEmergency.fee}</strong> (Includes first 30 mins diagnosis & roadside triage).</span>
            </div>

          </div>
        ) : (
          /* Dispatch Request Form */
          <div className="fixit-card animate-fade-in" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.5rem' }}>
              Select Emergency Requirement
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Nearest mobile technician van will be pinged instantly.
            </p>

            {/* Quick Category Buttons */}
            <div className="grid-2" style={{ gap: '10px', marginBottom: '1.75rem' }}>
              {emergencyCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setProblemType(cat.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: problemType === cat.label ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: problemType === cat.label ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
                    color: problemType === cat.label ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cat.label}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                    {cat.typicalEta}
                  </span>
                </button>
              ))}
            </div>

            <form onSubmit={handleDispatch}>
              {/* Location Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="fixit-label">Your Current Breakdown Location / Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    className="fixit-input"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="Street, Landmark, City (e.g., Near Metro Station, Highway Km 14)"
                  />
                  <MapPin size={18} color="#EF4444" style={{ position: 'absolute', right: '14px', top: '13px' }} />
                </div>
              </div>

              {/* Selected Master Technician Preview */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '1rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={selectedTech.avatar}
                    alt={selectedTech.name}
                    style={{ width: '48px', height: '48px', borderRadius: '10px', border: '1px solid #EF4444' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                      {selectedTech.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--neon-teal)' }}>
                      {selectedTech.title} • {selectedTech.distanceKm} km away
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}>₹450</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Emergency Visit + 30m Diagnostics</div>
                </div>
              </div>

              {/* Dispatch Button */}
              <button
                type="submit"
                disabled={isDispatching}
                className="fixit-btn fixit-btn-lg fixit-btn-emergency"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              >
                <Zap size={20} />
                <span>{isDispatching ? 'Contacting Mobile Technician...' : 'Dispatch Nearest Technician Now'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
