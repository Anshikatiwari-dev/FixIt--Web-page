import React from 'react';
import { ShoppingCart, Check, Truck, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const PartCard = ({ part }) => {
  const { addToCart, cart } = useApp();
  const { showToast } = useToast();

  const isInCart = cart.some((i) => i.id === part.id);

  const handleAddToCart = () => {
    addToCart(part);
    showToast(`Added "${part.name}" to cart!`, 'cyan');
  };

  let typeBadgeClass = 'fixit-badge-cyan';
  if (part.partType === 'Refurbished') typeBadgeClass = 'fixit-badge-warning';
  if (part.partType === 'Compatible') typeBadgeClass = 'fixit-badge-pink';

  return (
    <div
      className="fixit-card fixit-card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        height: '100%'
      }}
    >
      <div>
        {/* Product Image & Badges */}
        <div style={{ position: 'relative', height: '170px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', background: '#0B101E' }}>
          <img
            src={part.image}
            alt={part.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '5px' }}>
            <span className={`fixit-badge ${typeBadgeClass}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              {part.partType}
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: 'rgba(5, 8, 17, 0.85)',
              borderRadius: '6px',
              padding: '2px 6px',
              fontSize: '0.72rem',
              color: 'var(--neon-teal)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Truck size={12} />
            <span>{part.deliveryTime}</span>
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', lineHeight: 1.35, minHeight: '40px' }}>
          {part.name}
        </h4>

        {/* Compatibility Snippet */}
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '6px',
            padding: '6px 8px',
            marginBottom: '0.75rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <strong style={{ color: 'var(--neon-cyan)' }}>Fits:</strong> {part.compatibility}
        </div>

        {/* Seller Info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>
          <span>{part.seller}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
            <Star size={11} fill="#F59E0B" /> {part.sellerRating}
          </span>
        </div>
      </div>

      {/* Price & Add to Cart */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
              ₹{part.price}
            </span>
            {part.originalPrice && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{part.originalPrice}
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--status-success)' }}>
            In Stock ({part.stockCount} units)
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`fixit-btn fixit-btn-sm ${isInCart ? 'fixit-btn-outline-cyan' : 'fixit-btn-cyan'}`}
          style={{ fontSize: '0.8rem', padding: '7px 12px' }}
        >
          {isInCart ? (
            <>
              <Check size={14} />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
