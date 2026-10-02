import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, clearCart, setUserState } = useApp();
  const { showToast } = useToast();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      item: cart.map(i => `${i.name} (x${i.quantity || 1})`).join(', '),
      date: 'Just now',
      status: 'Order Placed (FixIt Express)',
      amount: grandTotal,
      deliveryEta: 'Dispatched from nearby verified hub'
    };

    setUserState((prev) => ({
      ...prev,
      partOrders: [newOrder, ...prev.partOrders]
    }));

    showToast(`Order #${newOrder.id} placed successfully! Arriving soon.`, 'success');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(5, 8, 17, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--bg-card-solid)',
          borderLeft: '1px solid var(--border-glow-cyan)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2001
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--neon-cyan)" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>
              Spare Parts Cart ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-tertiary)' }}>
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem' }}>
                Add compatible replacement parts from our catalog or straight from your AI Diagnosis.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '4px', lineHeight: 1.3 }}>
                      {item.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <span className="fixit-badge fixit-badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                        {item.partType}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--neon-teal)', fontWeight: 600 }}>
                        ₹{item.price}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '2px 6px' }}>
                        <button
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(7, 11, 22, 0.95)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <span>Estimated Delivery</span>
              <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--status-success)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
              <span>Total Amount</span>
              <span className="text-gradient-cyan">₹{grandTotal}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
              <ShieldCheck size={14} color="var(--status-success)" />
              <span>FixIt Authenticity Check & Return Guarantee included</span>
            </div>

            <button
              onClick={handleCheckout}
              className="fixit-btn fixit-btn-cyan"
              style={{ width: '100%', padding: '0.9rem' }}
            >
              <span>Confirm & Order Parts</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
