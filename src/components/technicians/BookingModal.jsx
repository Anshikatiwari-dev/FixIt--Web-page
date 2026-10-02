import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const BookingModal = ({ isOpen, onClose, technician }) => {
  const { bookTechnician, userState } = useApp();
  const { showToast } = useToast();

  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [serviceCategory, setServiceCategory] = useState('Diagnostic & On-Site Repair');
  const [address, setAddress] = useState(userState?.profile?.location || 'Indiranagar 12th Main, Bengaluru');
  const [problemSummary, setProblemSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!technician) return null;

  const visitFee = technician.startingPrice || 299;
  const safetyCoverFee = 39;
  const estimatedTotal = visitFee + safetyCoverFee;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      bookTechnician({
        technicianId: technician.id,
        technicianName: technician.name,
        date,
        timeSlot,
        address,
        problemSummary: problemSummary || `${serviceCategory} for ${technician.skills[0]}`,
        estimatedTotal,
        category: technician.categories[0] || 'appliances'
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });

      showToast(`Appointment confirmed with ${technician.name} for ${date} at ${timeSlot}!`, 'success');
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book ${technician.name}`}
      subtitle={`${technician.title} • Verified FixIt Partner`}
      maxWidth="580px"
    >
      <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Service Type */}
        <div>
          <label className="fixit-label">Service Requirement</label>
          <select
            className="fixit-select"
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
          >
            <option value="Diagnostic & On-Site Repair">Full Diagnostic Inspection & On-Site Repair</option>
            <option value="Parts Replacement Installation">Spare Parts Installation & Testing</option>
            <option value="Preventative Deep Maintenance">Deep Cleaning, Lubrication & Preventive Servicing</option>
            <option value="Emergency Roadside / Breakdown">Urgent Roadside / Breakdown Repair</option>
          </select>
        </div>

        {/* Problem Brief */}
        <div>
          <label className="fixit-label">Brief Problem Description</label>
          <input
            type="text"
            className="fixit-input"
            placeholder="e.g. Sinking chair piston / Microwave not rotating"
            value={problemSummary}
            onChange={(e) => setProblemSummary(e.target.value)}
          />
        </div>

        {/* Date and Time Slot */}
        <div className="grid-2">
          <div>
            <label className="fixit-label">Preferred Date</label>
            <select className="fixit-select" value={date} onChange={(e) => setDate(e.target.value)}>
              <option value="Today (Rapid Slot)">Today (Within 2-4 Hours)</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Day After Tomorrow">Day After Tomorrow</option>
              <option value="This Weekend (Saturday)">This Weekend (Saturday)</option>
            </select>
          </div>

          <div>
            <label className="fixit-label">Time Window</label>
            <select className="fixit-select" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Morning)</option>
              <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Mid-day)</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
              <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM (Evening)</option>
            </select>
          </div>
        </div>

        {/* Service Address */}
        <div>
          <label className="fixit-label">Service Location / Address</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              required
              className="fixit-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Apartment, Street, Landmark, City"
            />
            <MapPin size={16} color="var(--neon-cyan)" style={{ position: 'absolute', right: '12px', top: '13px' }} />
          </div>
        </div>

        {/* Estimated Pricing Summary */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '1rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Technician Base Inspection Fee</span>
            <span>₹{visitFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            <span>FixIt Safety & Quality Warranty Guarantee</span>
            <span>₹{safetyCoverFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, color: '#fff', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
            <span>Estimated Total (Pay after service)</span>
            <span className="text-gradient-cyan">₹{estimatedTotal}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--status-success)', marginTop: '8px' }}>
            <ShieldCheck size={13} />
            <span>30-Day FixIt Repair Warranty & No-Fix No-Fee Policy</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
          <button type="button" onClick={onClose} className="fixit-btn fixit-btn-ghost">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="fixit-btn fixit-btn-cyan"
          >
            <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </form>
    </Modal>
  );
};
