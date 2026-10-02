import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  ShieldCheck, 
  Zap, 
  SlidersHorizontal, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TechnicianCard } from '../components/technicians/TechnicianCard';
import { BookingModal } from '../components/technicians/BookingModal';
import { PRODUCT_CATEGORIES } from '../data/mockDiagnoses';

export const TechniciansPage = () => {
  const { technicians } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [onlyEmergencyReady, setOnlyEmergencyReady] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Booking Modal State
  const [bookingTechnician, setBookingTechnician] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = (tech) => {
    setBookingTechnician(tech);
    setIsBookingOpen(true);
  };

  const filteredTechnicians = technicians.filter((tech) => {
    if (selectedCategory !== 'all' && !tech.categories.includes(selectedCategory)) {
      return false;
    }
    if (searchLocation && !tech.serviceArea.toLowerCase().includes(searchLocation.toLowerCase()) && !tech.name.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    if (onlyAvailableNow && !tech.availableNow) {
      return false;
    }
    if (onlyEmergencyReady && !tech.emergencyReady) {
      return false;
    }
    if (minRating > 0 && tech.rating < minRating) {
      return false;
    }
    return true;
  });

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="fixit-badge fixit-badge-cyan">FIXIT MASTER NETWORK</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              100% Background & Skill Verified
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '0.5rem' }}>
            Find a Verified Technician
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px' }}>
            Connect with certified master craftsmen and electronics engineers near you. Transparent inspection fees, guaranteed genuine parts, and 30-day repair warranty.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="fixit-card"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            background: 'var(--bg-glass-heavy)',
            border: '1px solid var(--border-glow-cyan)'
          }}
        >
          {/* Top Row: Search and Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
              <input
                type="text"
                className="fixit-input"
                placeholder="Search by neighborhood, city, or technician name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={16} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>

            {/* Quick Toggle Checkboxes */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={onlyAvailableNow}
                  onChange={(e) => setOnlyAvailableNow(e.target.checked)}
                  style={{ accentColor: 'var(--neon-cyan)', width: '16px', height: '16px' }}
                />
                <span>Available Today</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#EF4444', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={onlyEmergencyReady}
                  onChange={(e) => setOnlyEmergencyReady(e.target.checked)}
                  style={{ accentColor: '#EF4444', width: '16px', height: '16px' }}
                />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <Zap size={13} /> FixIt Now Emergency Ready
                </span>
              </label>
            </div>

          </div>

          {/* Bottom Row: Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`fixit-btn fixit-btn-sm ${selectedCategory === 'all' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              All Specialties
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`fixit-btn fixit-btn-sm ${selectedCategory === cat.id ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
                style={{ fontSize: '0.8rem', padding: '5px 12px', whiteSpace: 'nowrap' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Guarantee Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
          <div>
            Showing <strong style={{ color: '#fff' }}>{filteredTechnicians.length}</strong> verified specialists
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
            <ShieldCheck size={16} />
            <span>₹0 Advance Deposit • Pay Only After Satisfactory Fix</span>
          </div>
        </div>

        {/* Technician Cards Grid */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          {filteredTechnicians.map((tech) => (
            <TechnicianCard
              key={tech.id}
              technician={tech}
              onBookClick={handleOpenBooking}
            />
          ))}
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          technician={bookingTechnician}
        />

      </div>
    </div>
  );
};
