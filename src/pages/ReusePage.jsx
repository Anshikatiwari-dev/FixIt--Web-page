import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, 
  Sparkles, 
  Leaf, 
  ArrowRight, 
  ShoppingBag, 
  Search, 
  Lightbulb, 
  Wrench, 
  Share2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UpcycleCard } from '../components/reuse/UpcycleCard';

export const ReusePage = () => {
  const { reuseIdeas } = useApp();
  const [searchItem, setSearchItem] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  // AI Upcycling Generator Simulator
  const [customItem, setCustomItem] = useState('');
  const [customIdea, setCustomIdea] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateIdea = (e) => {
    e.preventDefault();
    if (!customItem.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setCustomIdea({
        originalItem: customItem,
        secondLifeTitle: `Modular Upcycled Smart Project for "${customItem}"`,
        summary: `Extract the working chassis, hardware fasteners, and structural frame. By applying outdoor sealant and minor bracket reconfiguration, you can transform this item into a functional decorative storage or IoT station.`,
        difficulty: 'Creative DIY (1-2 Hours)',
        upcyclingValue: 'Saves approx ₹1,200 - ₹2,500',
        carbonSavedKg: 18.2,
        steps: [
          'Carefully dismantle non-functional hazardous circuitry (discharge all capacitors first).',
          'Clean and sand external plastic or wood housing.',
          'Repurpose the mounting brackets for wall-hanging hooks or plant anchors.',
          'Integrate soft LED strip or potted succulents into open cavities.'
        ]
      });
      setIsGenerating(false);
    }, 1200);
  };

  const filteredIdeas = reuseIdeas.filter((idea) => {
    if (filterCat !== 'all' && !idea.category.toLowerCase().includes(filterCat.toLowerCase())) {
      return false;
    }
    if (searchItem) {
      const q = searchItem.toLowerCase();
      const match =
        idea.originalItem.toLowerCase().includes(q) ||
        idea.secondLifeTitle.toLowerCase().includes(q) ||
        idea.summary.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixit-page">
      <div className="fixit-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1rem' }}>
            <Recycle size={15} color="var(--status-success)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--status-success)' }}>
              CIRCULAR ECONOMY & ZERO-WASTE MANIFESTO
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '0.75rem' }}>
            Give It A Second Life
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            "Don't throw away a broken thing immediately." Even when an item cannot be repaired economically, it holds rich materials, working motors, and creative second-life potential.
          </p>
        </div>

        {/* AI Upcycle Idea Generator Box */}
        <div
          className="fixit-card"
          style={{
            padding: '2rem',
            marginBottom: '3rem',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(17, 26, 48, 0.8) 100%)',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <Sparkles size={20} color="var(--status-success)" />
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              FixIt AI Upcycle Generator
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Enter any broken item lying around in your attic, garage, or office (e.g., <code style={{ color: 'var(--neon-teal)' }}>cracked acoustic guitar</code>, <code style={{ color: 'var(--neon-teal)' }}>broken blender</code>, <code style={{ color: 'var(--neon-teal)' }}>bent alloy rim</code>, <code style={{ color: 'var(--neon-teal)' }}>old washing machine drum</code>) to generate instant transformation blueprints.
          </p>

          <form onSubmit={handleGenerateIdea} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="fixit-input"
              placeholder="What broken item do you have? (e.g. Broken washing machine drum, Old skateboard)..."
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              style={{ flex: 1, minWidth: '260px' }}
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="fixit-btn fixit-btn-cyan"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #05DFD7 100%)', color: '#070B16' }}
            >
              <Sparkles size={16} />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Upcycle Blueprint'}</span>
            </button>
          </form>

          {/* Generated Result */}
          {customIdea && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'rgba(5, 8, 17, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="fixit-badge fixit-badge-success">{customIdea.difficulty}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--neon-teal)', fontWeight: 600 }}>{customIdea.upcyclingValue}</span>
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>{customIdea.secondLifeTitle}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>{customIdea.summary}</p>
              
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--status-success)', marginBottom: '6px' }}>Blueprint Transformation Steps:</div>
              <ol style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {customIdea.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '4px' }}>
              Curated Transformation Blueprints
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Field-tested projects that divert tons of e-waste from landfills.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/marketplace" className="fixit-btn fixit-btn-pink">
              <ShoppingBag size={15} />
              <span>Salvage Marketplace</span>
            </Link>
          </div>
        </div>

        {/* Grid of Verified Upcycling Projects */}
        <div className="grid-2" style={{ marginBottom: '3.5rem' }}>
          {filteredIdeas.map((idea) => (
            <UpcycleCard key={idea.id} idea={idea} />
          ))}
        </div>

        {/* Second Life Alternatives Banner: Sell for parts */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            border: '1px solid var(--neon-pink-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(255, 42, 133, 0.08) 0%, rgba(17, 26, 48, 0.9) 100%)'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span className="fixit-badge fixit-badge-pink" style={{ marginBottom: '0.5rem' }}>
              CASH FOR BROKEN GADGETS
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
              Don't want to upcycle? Sell it for parts!
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Electronics technicians, roboticists, and hobbyists buy broken laptops, audio receivers, and drones specifically to harvest logic chips, screens, and motors.
            </p>
          </div>

          <Link to="/marketplace" className="fixit-btn fixit-btn-pink">
            <span>List Broken Item for Parts</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};
