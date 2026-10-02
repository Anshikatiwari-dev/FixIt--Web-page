import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Plus, 
  Tag, 
  MapPin, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { SellItemModal } from '../components/reuse/SellItemModal';

export const MarketplacePage = () => {
  const { marketplaceItems } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const handleInquiry = (item) => {
    showToast(`Inquiry sent to seller "${item.sellerName}" for ${item.title}!`, 'success');
  };

  const filteredItems = marketplaceItems.filter((item) => {
    if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.availableParts?.some((p) => p.toLowerCase().includes(q)) ||
        item.sellerLocation?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="fixit-badge fixit-badge-pink">SECOND-LIFE SALVAGE MARKETPLACE</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                Parts Harvesters, Tinkerers & Refurbishers
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '0.4rem' }}>
              Salvage & Parts Exchange
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}>
              Buy and sell broken gadgets for donor components, raw teak wood, motors, logic boards, and DIY project materials.
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="fixit-btn fixit-btn-pink"
              style={{ padding: '0.85rem 1.75rem' }}
            >
              <Plus size={18} />
              <span>Sell a Broken / Salvage Item</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          className="fixit-card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
            background: 'var(--bg-glass-heavy)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <input
                type="text"
                className="fixit-input"
                placeholder="Search salvage items (e.g. MacBook board, Sheesham wood, drone motor)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={16} color="var(--neon-pink)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>

            {/* Condition Filters */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {['all', 'For Parts / Salvage', 'Refurbishable / DIY Upcycle', 'Reusable Components'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`fixit-btn fixit-btn-sm ${selectedCondition === cond ? 'fixit-btn-pink' : 'fixit-btn-ghost'}`}
                  style={{ fontSize: '0.78rem', padding: '6px 12px', whiteSpace: 'nowrap' }}
                >
                  {cond === 'all' ? 'All Conditions' : cond}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid-2" style={{ marginBottom: '3.5rem' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="fixit-card fixit-card-interactive fixit-card-glow-pink"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                
                {/* Photo & Badges */}
                <div style={{ position: 'relative', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <img
                    src={item.photos?.[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=80'}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span className="fixit-badge fixit-badge-pink" style={{ fontSize: '0.72rem' }}>
                      {item.condition}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(5, 8, 17, 0.85)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <MapPin size={12} color="var(--neon-pink)" />
                    <span>{item.sellerLocation}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {item.description}
                </p>

                {/* Available Parts */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neon-teal)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                    Salvageable Parts & Components:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.availableParts?.map((pt, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        ✓ {pt}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Price & Seller Action */}
              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                      ₹{item.price}
                    </span>
                    {item.originalValue && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        Orig: ₹{item.originalValue}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    Posted by <strong style={{ color: '#fff' }}>{item.sellerName}</strong> • {item.postedDate}
                  </div>
                </div>

                <button
                  onClick={() => handleInquiry(item)}
                  className="fixit-btn fixit-btn-sm fixit-btn-outline-pink"
                  style={{ fontSize: '0.82rem', padding: '7px 14px' }}
                >
                  <MessageSquare size={14} />
                  <span>Contact Seller</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Sell Item Modal */}
        <SellItemModal
          isOpen={isSellModalOpen}
          onClose={() => setIsSellModalOpen(false)}
        />

      </div>
    </div>
  );
};
