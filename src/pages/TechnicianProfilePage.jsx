import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Wrench, 
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingModal } from '../components/technicians/BookingModal';

export const TechnicianProfilePage = () => {
  const { id } = useParams();
  const { technicians } = useApp();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const technician = technicians.find((t) => t.id === id) || technicians[0];

  return (
    <div className="fixit-page">
      <div className="fixit-container" style={{ maxWidth: '960px' }}>
        
        {/* Back Link */}
        <Link
          to="/technicians"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Technicians</span>
        </Link>

        {/* Profile Header Card */}
        <div
          className="fixit-card"
          style={{
            padding: '2.5rem',
            marginBottom: '2rem',
            border: '1px solid var(--neon-cyan-border)',
            background: 'linear-gradient(135deg, rgba(17, 26, 48, 0.9) 0%, rgba(7, 11, 22, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={technician.avatar}
                  alt={technician.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    border: '3px solid var(--neon-cyan-border)'
                  }}
                />
                {technician.verified && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      background: 'var(--status-success)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)'
                    }}
                  >
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800 }}>
                    {technician.name}
                  </h1>
                  <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {technician.badgeText || 'Master Fixer'}
                  </span>
                </div>

                <div style={{ fontSize: '1rem', color: 'var(--neon-teal)', marginBottom: '8px' }}>
                  {technician.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                    <Star size={16} fill="#F59E0B" />
                    <strong style={{ color: '#fff' }}>{technician.rating}</strong>
                    <span style={{ color: 'var(--text-tertiary)' }}>({technician.reviewCount} reviews)</span>
                  </div>

                  <div style={{ color: 'var(--text-secondary)' }}>
                    • <strong style={{ color: '#fff' }}>{technician.jobsCompleted}+</strong> Repairs Done
                  </div>

                  <div style={{ color: 'var(--text-secondary)' }}>
                    • <strong style={{ color: '#fff' }}>{technician.experienceYears}</strong> Years Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Box */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                minWidth: '220px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Doorstep Visit Fee</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                ₹{technician.startingPrice}
              </div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="fixit-btn fixit-btn-cyan"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <span>Book Appointment</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>

        {/* Content Tabs / Two-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '3.5rem' }} className="profile-grid">
          
          {/* Left Column: Bio, Skills & Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* About */}
            <div className="fixit-card">
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem' }}>
                About {technician.name.split(' ')[0]}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                {technician.bio}
              </p>
            </div>

            {/* Specialties & Skills */}
            <div className="fixit-card">
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem' }}>
                Verified Repair Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {technician.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid var(--neon-cyan-border)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--neon-cyan)" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {technician.certifications && (
              <div className="fixit-card">
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--status-warning)" />
                  <span>Accreditations & Certificates</span>
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {technician.certifications.map((c, idx) => (
                    <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--status-success)" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customer Reviews */}
            <div className="fixit-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                  Customer Reviews ({technician.recentReviews?.length || 0})
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                  <Star size={15} fill="#F59E0B" />
                  <span style={{ fontWeight: 700 }}>{technician.rating} out of 5</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {technician.recentReviews?.map((rev, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>
                        {rev.author}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        {rev.date}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Service Area, Hours & Trust Assurance */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Service Location */}
            <div className="fixit-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <MapPin size={18} color="var(--neon-cyan)" />
                <h4 style={{ color: '#fff' }}>Service Coverage Area</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {technician.serviceArea}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--neon-teal)' }}>
                Average doorstep arrival time: <strong>45-60 mins</strong>
              </div>
            </div>

            {/* Pricing Transparency */}
            <div className="fixit-card">
              <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Pricing Structure</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Diagnostic & Visit</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>₹{technician.startingPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Hourly Labor Rate</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>₹{technician.hourlyRate}/hr</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Safety Warranty Cover</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>₹39</span>
                </div>
                <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--status-success)' }}>
                  ✓ Transparent estimate given before work starts. No hidden costs.
                </div>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="fixit-card" style={{ background: 'rgba(16, 185, 129, 0.04)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="var(--status-success)" />
                <h4 style={{ color: '#fff' }}>FixIt Protection</h4>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li>✓ Govt ID & Criminal Background Verified</li>
                <li>✓ 30-Day Free Rework Repair Warranty</li>
                <li>✓ Escrow Payment (Released only after fix)</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          technician={technician}
        />

      </div>

      <style>{`
        @media (max-width: 820px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
