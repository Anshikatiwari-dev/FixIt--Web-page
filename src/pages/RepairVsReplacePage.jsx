import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, 
  DollarSign, 
  Clock, 
  Leaf, 
  HelpCircle, 
  ArrowRight, 
  Wrench, 
  Recycle, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

export const RepairVsReplacePage = () => {
  // Inputs
  const [productPrice, setProductPrice] = useState(15000);
  const [repairCost, setRepairCost] = useState(850);
  const [productAge, setProductAge] = useState(2.5);
  const [repairabilityScore, setRepairabilityScore] = useState(85);
  const [productType, setProductType] = useState('Home Appliance');

  // Math Calculations
  const costRatio = Math.round((repairCost / (productPrice || 1)) * 100);
  const moneySaved = Math.max(0, productPrice - repairCost);
  const savingsPercent = Math.round((moneySaved / (productPrice || 1)) * 100);

  // Lifespan calculation heuristic
  let expectedAdditionalYears = 3;
  if (productAge <= 2) expectedAdditionalYears = 3.5;
  else if (productAge <= 5) expectedAdditionalYears = 2.5;
  else expectedAdditionalYears = 1.5;

  const co2AvoidedKg = Math.round((productPrice * 0.0028) + 12);

  // Recommendation logic: Standard 50% Economic Rule
  let verdict = 'Strongly Favor Repair';
  let verdictColor = '#10B981';
  let verdictExplanation = `Repairing costs only ${costRatio}% of replacement. Since it is well under the industry 50% threshold, repairing delivers maximum financial return and keeps functional hardware out of landfills.`;

  if (costRatio > 55 || productAge > 7) {
    verdict = 'Consider Replacement or Salvage';
    verdictColor = '#EF4444';
    verdictExplanation = `The estimated repair cost is ${costRatio}% of the product value, or the product has reached late depreciation stage. Consider harvesting usable parts or upcycling.`;
  } else if (costRatio > 35) {
    verdict = 'Balanced / Moderate Feasibility';
    verdictColor = '#F59E0B';
    verdictExplanation = `Repair cost is moderate (${costRatio}% of new). If you are satisfied with existing features and aesthetic condition, repairing is still the greener and economical option.`;
  }

  return (
    <div className="fixit-page">
      <div className="fixit-container" style={{ maxWidth: '980px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.6rem' }}>
            DECISION INTELLIGENCE TOOL
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#fff', marginBottom: '0.5rem' }}>
            Repair vs. Replace Calculator
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            A neutral, data-driven analysis to help you decide whether fixing your product makes economic and environmental sense.
          </p>
        </div>

        {/* Main Grid: Inputs vs Telemetry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '2rem', marginBottom: '3rem' }} className="calc-grid">
          
          {/* Left Column: Interactive Inputs */}
          <div className="fixit-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} color="var(--neon-cyan)" />
              <span>Input Product Parameters</span>
            </h3>

            {/* Product Type */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="fixit-label">Product Category</label>
              <select
                className="fixit-select"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="Home Appliance">Major / Small Home Appliance</option>
                <option value="Laptop / Computer">Laptop / Desktop PC</option>
                <option value="Smartphone / Tablet">Smartphone / Tablet</option>
                <option value="Ergonomic Furniture">Office / Home Furniture</option>
                <option value="Two Wheeler / Bike">Two-Wheeler / Bike</option>
              </select>
            </div>

            {/* New Product Replacement Price */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="fixit-label" style={{ margin: 0 }}>New Replacement Price</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>₹{productPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="60000"
                step="500"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--neon-cyan)', width: '100%' }}
              />
            </div>

            {/* Estimated Repair Cost */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="fixit-label" style={{ margin: 0 }}>Estimated Total Repair Cost</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-teal)' }}>₹{repairCost}</span>
              </div>
              <input
                type="range"
                min="100"
                max="15000"
                step="50"
                value={repairCost}
                onChange={(e) => setRepairCost(Number(e.target.value))}
                style={{ accentColor: 'var(--neon-teal)', width: '100%' }}
              />
            </div>

            {/* Product Age */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="fixit-label" style={{ margin: 0 }}>Current Product Age</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{productAge} Years</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={productAge}
                onChange={(e) => setProductAge(Number(e.target.value))}
                style={{ accentColor: '#3B82F6', width: '100%' }}
              />
            </div>

            {/* Repairability Score */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="fixit-label" style={{ margin: 0 }}>FixIt Repairability Score</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>{repairabilityScore}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="98"
                step="1"
                value={repairabilityScore}
                onChange={(e) => setRepairabilityScore(Number(e.target.value))}
                style={{ accentColor: 'var(--neon-cyan)', width: '100%' }}
              />
            </div>

          </div>

          {/* Right Column: Comparative Analysis & Verdict */}
          <div
            className="fixit-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid ${verdictColor}`,
              boxShadow: `0 0 25px ${verdictColor}33`
            }}
          >
            <div>
              {/* Verdict Header */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="fixit-badge" style={{ background: `${verdictColor}22`, color: verdictColor, border: `1px solid ${verdictColor}44`, marginBottom: '6px' }}>
                  NEUTRAL ECONOMIC VERDICT
                </span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
                  {verdict}
                </h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {verdictExplanation}
              </p>

              {/* Data Breakdown Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Net Savings</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>
                    ₹{moneySaved} ({savingsPercent}%)
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Repair Cost Ratio</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--neon-teal)' }}>
                    {costRatio}%
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Life After Repair</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    +{expectedAdditionalYears} Years
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Carbon Footprint</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981' }}>
                    -{co2AvoidedKg} kg CO₂
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', gap: '8px' }}>
              <Link to="/diy" className="fixit-btn fixit-btn-cyan" style={{ flex: 1, fontSize: '0.85rem' }}>
                <Wrench size={14} />
                <span>Fix Product</span>
              </Link>
              <Link to="/reuse" className="fixit-btn fixit-btn-ghost" style={{ flex: 1, fontSize: '0.85rem' }}>
                <Recycle size={14} />
                <span>Second Life</span>
              </Link>
            </div>

          </div>

        </div>

        {/* 50% Rule Educational Box */}
        <div className="glass-panel" style={{ padding: '1.75rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <TrendingUp size={18} color="var(--neon-cyan)" />
            <h4 style={{ color: '#fff' }}>What is the 50% Repair Rule?</h4>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Consumer electronics and appliance engineers use the <strong>50% Rule</strong>: If an item is less than halfway through its expected operational lifespan and repair costs are under 50% of the replacement price, repairing is mathematically superior. In FixIt's circular framework, we also compute environmental emissions avoided.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
