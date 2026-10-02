import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PartCard } from '../components/parts/PartCard';
import { CompatibilityChecker } from '../components/parts/CompatibilityChecker';
import { PRODUCT_CATEGORIES } from '../data/mockDiagnoses';

export const SparePartsPage = () => {
  const { parts } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [highlightedPartId, setHighlightedPartId] = useState(null);

  const filteredParts = parts.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (selectedType !== 'all' && p.partType !== selectedType) {
      return false;
    }
    if (p.price > maxPrice) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.compatibility.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleHighlight = (part) => {
    setHighlightedPartId(part.id);
    setSearchQuery(part.name.split(' ')[0]);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="fixit-badge fixit-badge-cyan">FIXIT SPARE PARTS HUB</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              100% Genuine, Compatible & Refurbished Quality-Tested Components
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '0.5rem' }}>
            Verified Spare Parts
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}>
            Don't abandon a machine for a ₹100 component. Get capacitors, pumps, switches, and hydraulic cylinders with guaranteed model compatibility.
          </p>
        </div>

        {/* Smart Model Compatibility Checker */}
        <CompatibilityChecker onPartSelect={handleHighlight} />

        {/* Filter and Search Bar */}
        <div
          className="fixit-card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
            background: 'var(--bg-glass-heavy)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <input
                type="text"
                className="fixit-input"
                placeholder="Search spare parts (e.g. capacitor, screen, piston, spark plug)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={16} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            </div>

            {/* Part Type Filter */}
            <div>
              <select
                className="fixit-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{ minWidth: '160px' }}
              >
                <option value="all">All Part Tiers</option>
                <option value="Genuine OEM">Genuine OEM</option>
                <option value="Compatible">Compatible</option>
                <option value="Refurbished">Eco-Refurbished</option>
              </select>
            </div>

            {/* Price Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                Max ₹{maxPrice}
              </span>
              <input
                type="range"
                min="100"
                max="6000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--neon-cyan)', width: '100%' }}
              />
            </div>

          </div>

          {/* Categories bar */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`fixit-btn fixit-btn-sm ${selectedCategory === 'all' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
              style={{ fontSize: '0.8rem', padding: '5px 12px' }}
            >
              All Categories
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

        {/* Results Count & Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
          <div>
            Showing <strong style={{ color: '#fff' }}>{filteredParts.length}</strong> compatible components
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--neon-teal)' }}>
              <Truck size={14} /> FixIt Rapid Express Delivery
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--status-success)' }}>
              <ShieldCheck size={14} /> Tested Bench Warranty
            </span>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          {filteredParts.map((part) => (
            <div
              key={part.id}
              style={{
                borderRadius: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: highlightedPartId === part.id ? '0 0 25px rgba(0, 242, 254, 0.6)' : 'none'
              }}
            >
              <PartCard part={part} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
