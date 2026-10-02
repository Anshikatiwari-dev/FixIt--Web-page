import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Wrench, 
  BookOpen, 
  Users, 
  Recycle, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Camera, 
  Mic, 
  FileText, 
  Sliders, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/mockDiagnoses';
import { MOCK_TECHNICIANS } from '../data/mockTechnicians';
import { MOCK_PARTS } from '../data/mockParts';
import { REUSE_IDEAS } from '../data/mockMarketplace';
import { RepairabilityGauge } from '../components/diagnosis/RepairabilityGauge';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('fan');

  // Interactive Live Demo preview data switcher
  const demoScenarios = {
    fan: {
      title: 'Ceiling Fan Humming & Slow Speed',
      detected: 'Degraded 2.5µF Motor Start Capacitor',
      score: 88,
      difficulty: 'Easy DIY',
      cost: '₹180 - ₹300',
      time: '30 mins',
      diy: 'Yes (Safe with MCB off)',
      parts: 'High Availability',
      solution: 'Swap capacitor and grease bearing; saves ₹2,200 vs buying new fan.'
    },
    chair: {
      title: 'Ergonomic Office Chair Sinking',
      detected: 'Class-4 Hydraulic Gas Lift Seal Failure',
      score: 82,
      difficulty: 'Medium DIY',
      cost: '₹750 - ₹950',
      time: '45 mins',
      diy: 'Yes (Requires pipe wrench/mallet)',
      parts: 'High Availability',
      solution: 'Replace cylinder; saves ₹14,000 office chair from landfill.'
    },
    microwave: {
      title: 'Convection Microwave Tray Not Rotating',
      detected: 'Underside Turntable Synchronous Motor Stripped',
      score: 78,
      difficulty: 'Technician Recommended',
      cost: '₹350 - ₹600',
      time: '25 mins',
      diy: 'High-voltage risk caution',
      parts: 'In Stock',
      solution: 'Book certified technician for bottom access hatch motor swap.'
    }
  };

  const currentDemo = demoScenarios[activeTab];

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* ==================================================
          SECTION 1: HERO
      ================================================== */}
      <section
        style={{
          position: 'relative',
          paddingTop: '7.5rem',
          paddingBottom: '5.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Radial Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.12) 0%, rgba(255, 42, 133, 0.04) 50%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="fixit-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div>
              <div
                className="animate-fade-in"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid var(--neon-cyan-border)', marginBottom: '1.25rem' }}
              >
                <Cpu size={15} color="var(--neon-cyan)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                  AI-Powered Problem to Solution Ecosystem
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem'
                }}
              >
                Problem Dikhao, <br />
                <span className="text-gradient-cyan">Solution Pao.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.12rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: '560px',
                  marginBottom: '2rem'
                }}
              >
                Show any broken, damaged, old, or non-working product through photo, video, voice, or text. FixIt's repair intelligence analyzes the issue instantly to help you repair, replace, reuse, or connect with a verified master technician.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                <Link to="/show-problem" className="fixit-btn fixit-btn-lg fixit-btn-cyan">
                  <Sparkles size={18} />
                  <span>Show Your Problem</span>
                  <ArrowRight size={18} />
                </Link>

                <a href="#how-it-works" className="fixit-btn fixit-btn-lg fixit-btn-ghost">
                  <span>How FixIt Works</span>
                </a>
              </div>

              {/* Multi-modal inputs preview icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                <span>Multi-modal Diagnostics:</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--neon-teal)' }}>
                    <Camera size={15} /> Photo
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--neon-cyan)' }}>
                    <Activity size={15} /> Video
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--neon-pink)' }}>
                    <Mic size={15} /> Voice
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#fff' }}>
                    <FileText size={15} /> Text
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Futuristic AI Diagnostic Scanner Visualization */}
            <div className="animate-scale-in" style={{ position: 'relative' }}>
              
              {/* Outer Glowing Glass Frame */}
              <div
                style={{
                  background: 'linear-gradient(145deg, rgba(17, 26, 48, 0.85) 0%, rgba(7, 11, 22, 0.95) 100%)',
                  border: '1px solid var(--neon-cyan-border)',
                  borderRadius: '1.5rem',
                  boxShadow: '0 0 35px rgba(0, 242, 254, 0.18)',
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Holographic Diagnostic Grid & Scanning Line */}
                <div className="futuristic-grid" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
                <div className="scanner-line" />

                {/* HUD Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-success)', boxShadow: '0 0 8px #10B981' }} />
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
                      AI LIVE TELEMETRY SCANNER [ACTIVE]
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    CONFIDENCE: 94.6%
                  </span>
                </div>

                {/* Interactive Diagnostic Target Visual */}
                <div
                  style={{
                    position: 'relative',
                    height: '240px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#0B101E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    marginBottom: '1rem'
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
                    alt="AI Scanning Target Machine Component"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, filter: 'contrast(115%) saturate(120%)' }}
                  />

                  {/* Diagnostic Crosshairs & Bounding Boxes */}
                  <div
                    className="animate-pulse-glow"
                    style={{
                      position: 'absolute',
                      top: '25%',
                      left: '25%',
                      width: '50%',
                      height: '50%',
                      border: '2px dashed var(--neon-cyan)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 242, 254, 0.08)'
                    }}
                  >
                    <div style={{ background: 'rgba(5, 8, 17, 0.9)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--neon-cyan)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                      FAULT LOCUS: CAPACITOR C-22
                    </div>
                  </div>

                  {/* Corner Markers */}
                  <div style={{ position: 'absolute', top: 10, left: 10, width: 12, height: 12, borderTop: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, width: 12, height: 12, borderTop: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 10, width: 12, height: 12, borderBottom: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)' }} />
                  <div style={{ position: 'absolute', bottom: 10, right: 10, width: 12, height: 12, borderBottom: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)' }} />
                </div>

                {/* Instant Metric Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>Repairability</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>88%</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>Estimated Cost</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>₹250</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>Resolution</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>DIY Easy</div>
                  </div>
                </div>

                {/* Bottom live analysis ticker */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--neon-teal)', fontFamily: 'var(--font-mono)' }}>
                  <span>&gt; AI detecting → understanding → solving</span>
                  <Link to="/diagnosis" style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '3px', textDecoration: 'underline' }}>
                    View Live Sample <ArrowUpRight size={12} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: HOW FIXIT WORKS
      ================================================== */}
      <section id="how-it-works" style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="fixit-container">
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.75rem' }}>
              HOW FIXIT WORKS
            </span>
            <h2 style={{ marginBottom: '0.75rem' }}>From Broken to Fixed in 4 Seamless Steps</h2>
            <p>
              FixIt replaces chaotic repair shops and wasteful dumping with an intelligent diagnostic pipeline.
            </p>
          </div>

          <div className="grid-4">
            
            {/* Step 1 */}
            <div className="fixit-card" style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(0, 242, 254, 0.15)', position: 'absolute', top: '12px', right: '16px', fontFamily: 'var(--font-mono)' }}>
                01
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.12)', border: '1px solid var(--neon-cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Camera size={22} color="var(--neon-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Show Problem</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Upload a quick photo, clip, sound recording, or type product symptoms. No technical jargon required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="fixit-card" style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(0, 242, 254, 0.15)', position: 'absolute', top: '12px', right: '16px', fontFamily: 'var(--font-mono)' }}>
                02
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(255, 42, 133, 0.12)', border: '1px solid var(--neon-pink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Cpu size={22} color="var(--neon-pink)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>AI Diagnosis</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Our diagnostic engine identifies the root cause, repairability score (0-100%), cost range, and safety hazards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="fixit-card" style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(0, 242, 254, 0.15)', position: 'absolute', top: '12px', right: '16px', fontFamily: 'var(--font-mono)' }}>
                03
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(5, 223, 215, 0.12)', border: '1px solid rgba(5, 223, 215, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Layers size={22} color="var(--neon-teal)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Get Solution</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Choose the best path: safe step-by-step DIY guide, 1-click compatible spare parts, or certified technician booking.
              </p>
            </div>

            {/* Step 4 */}
            <div className="fixit-card" style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(0, 242, 254, 0.15)', position: 'absolute', top: '12px', right: '16px', fontFamily: 'var(--font-mono)' }}>
                04
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={22} color="var(--status-success)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>Fix or Give 2nd Life</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Item repaired for a fraction of new cost! If uneconomical, upcycle it or sell components on our salvage marketplace.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 3: WHAT CAN YOU FIX? (PRODUCT CATEGORIES)
      ================================================== */}
      <section style={{ padding: '5rem 0' }}>
        <div className="fixit-container">
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.6rem' }}>
                EXPANDABLE REPAIR ECOSYSTEM
              </span>
              <h2>What Can You Fix With FixIt?</h2>
              <p style={{ maxWidth: '580px' }}>
                From small handheld electronics to large home appliances, automobiles, and furniture.
              </p>
            </div>

            <Link to="/show-problem" className="fixit-btn fixit-btn-outline-cyan">
              <span>Diagnose Anything</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/show-problem?category=${cat.id}`}
                className="fixit-card fixit-card-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '1.25rem',
                  textDecoration: 'none'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: `rgba(0, 242, 254, 0.08)`,
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cat.color
                  }}
                >
                  <Wrench size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Diagnostics & Parts Ready →
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 4: AI DIAGNOSIS PREVIEW (REALISTIC DEMO)
      ================================================== */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="fixit-container">
          
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.75rem' }}>
              REALISTIC AI DIAGNOSIS PREVIEW
            </span>
            <h2>Experience FixIt Repair Intelligence</h2>
            <p>
              Switch between real diagnosis scenarios below to see how FixIt breaks down repairability, costs, and solutions.
            </p>

            {/* Scenario switcher buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('fan')}
                className={`fixit-btn fixit-btn-sm ${activeTab === 'fan' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
              >
                Ceiling Fan (Slow Speed)
              </button>
              <button
                onClick={() => setActiveTab('chair')}
                className={`fixit-btn fixit-btn-sm ${activeTab === 'chair' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
              >
                Office Chair (Sinking Seat)
              </button>
              <button
                onClick={() => setActiveTab('microwave')}
                className={`fixit-btn fixit-btn-sm ${activeTab === 'microwave' ? 'fixit-btn-cyan' : 'fixit-btn-ghost'}`}
              >
                Microwave (Plate Not Rotating)
              </button>
            </div>
          </div>

          {/* Interactive Diagnosis Card */}
          <div
            className="fixit-card"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '2.5rem',
              border: '1px solid var(--neon-cyan-border)',
              boxShadow: 'var(--shadow-glow-cyan)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="preview-grid">
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="fixit-badge fixit-badge-cyan">AI Telemetry Output</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--neon-teal)', fontFamily: 'var(--font-mono)' }}>ID: #FX-DEMO-99</span>
                </div>

                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {currentDemo.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--neon-cyan)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  Root Cause: {currentDemo.detected}
                </p>

                {/* Metrics Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Estimated Cost</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>{currentDemo.cost}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Repair Time</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{currentDemo.time}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>DIY Feasibility</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--neon-teal)' }}>{currentDemo.diy}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Parts Availability</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{currentDemo.parts}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 242, 254, 0.06)', padding: '12px', borderRadius: '10px', border: '1px solid var(--neon-cyan-border)', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <strong>FixIt Recommendation:</strong> {currentDemo.solution}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link to="/diagnosis" className="fixit-btn fixit-btn-cyan">
                    <span>Explore Full Diagnosis Dashboard</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Gauge and Visual */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(7, 11, 22, 0.7)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border-subtle)' }}>
                <RepairabilityGauge score={currentDemo.score} size={160} />
                <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '1rem' }}>
                  Score computed via component modularity, part availability & tool accessibility.
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 5: REPAIR VS REPLACE TEASER
      ================================================== */}
      <section style={{ padding: '5rem 0' }}>
        <div className="fixit-container">
          <div
            className="glass-panel"
            style={{
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '2.5rem',
              alignItems: 'center',
              border: '1px solid var(--border-medium)'
            }}
            className="teaser-grid"
          >
            <div>
              <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.8rem' }}>
                SMART FINANCIAL & SUSTAINABILITY LOGIC
              </span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Repair vs. Replace Calculator
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                Never make a blind purchase decision again. Plug in product price, estimated repair cost, age, and repairability score to get neutral, mathematically sound guidance on whether fixing or replacing gives you maximum lifespan ROI.
              </p>
              <Link to="/repair-vs-replace" className="fixit-btn fixit-btn-cyan">
                <Sliders size={16} />
                <span>Launch Interactive Calculator</span>
              </Link>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.75)', border: '1px solid var(--border-glow-cyan)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--neon-teal)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                // COMPARISON METRICS
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>New Appliance Cost</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>₹16,500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>FixIt Repair Cost</span>
                <span style={{ fontWeight: 700, color: 'var(--neon-cyan)' }}>₹850</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Net Cost Savings</span>
                <span style={{ fontWeight: 800, color: '#10B981' }}>₹15,650 (94.8%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Extended Lifespan</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>+3.5 Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: VERIFIED TECHNICIAN NETWORK PREVIEW
      ================================================== */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="fixit-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.6rem' }}>
                VERIFIED LOCAL MASTERS
              </span>
              <h2>When DIY Isn't Safe, Call a Master Fixer</h2>
              <p style={{ maxWidth: '580px' }}>
                Pre-screened, background-verified technicians who specialize in board-level repair rather than selling you overpriced new machines.
              </p>
            </div>
            <Link to="/technicians" className="fixit-btn fixit-btn-outline-cyan">
              <span>View All Technicians</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {MOCK_TECHNICIANS.slice(0, 3).map((tech) => (
              <div key={tech.id} className="fixit-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1rem' }}>
                  <img src={tech.avatar} alt={tech.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--neon-cyan-border)' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#fff' }}>{tech.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--neon-teal)' }}>{tech.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{tech.serviceArea.split(',')[0]}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Starts ₹{tech.startingPrice}</span>
                  <Link to={`/technician/${tech.id}`} className="fixit-btn fixit-btn-sm fixit-btn-cyan" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    View & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: SPARE PARTS & SECOND LIFE TEASER
      ================================================== */}
      <section style={{ padding: '5rem 0' }}>
        <div className="fixit-container">
          <div className="grid-2">
            
            {/* Spare Parts Card */}
            <div className="fixit-card fixit-card-interactive" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.12)', border: '1px solid var(--neon-cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Wrench size={22} color="var(--neon-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
                Genuine & Verified Spare Parts
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Order hard-to-find micro switches, capacitors, hydraulic pistons, and gaskets directly linked to your diagnosis. 100% fitment guarantee.
              </p>
              <Link to="/spare-parts" className="fixit-btn fixit-btn-cyan">
                <span>Browse Spare Parts Catalog</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Second Life Upcycling Card */}
            <div className="fixit-card fixit-card-interactive fixit-card-glow-pink" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(255, 42, 133, 0.12)', border: '1px solid var(--neon-pink-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Recycle size={22} color="var(--neon-pink)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
                Give It A Second Life
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Beyond repair? Don't bin it. Discover AI upcycling blueprints or list broken gadgets on our salvage marketplace for tinkerers and parts harvesters.
              </p>
              <Link to="/reuse" className="fixit-btn fixit-btn-pink">
                <span>Explore Upcycling & Salvage</span>
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: TRUST, SAFETY & PHILOSOPHY
      ================================================== */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="fixit-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '0.75rem' }}>
              TRUST & SAFETY LAYER
            </span>
            <h2>Why Millions Trust FixIt</h2>
            <p>
              We believe in honest diagnostics, transparent pricing, and rigorous electrical safety protocols.
            </p>
          </div>

          <div className="grid-3">
            <div className="fixit-card">
              <ShieldCheck size={28} color="var(--status-success)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.4rem' }}>Rigorous Safety Gatekeeping</h4>
              <p style={{ fontSize: '0.85rem' }}>
                FixIt AI detects lethal hazards (microwave HV capacitors, open petrol lines, mains short circuits) and blocks unsafe DIY tutorials automatically.
              </p>
            </div>

            <div className="fixit-card">
              <CheckCircle2 size={28} color="var(--neon-cyan)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.4rem' }}>Transparent No-Surprise Costs</h4>
              <p style={{ fontSize: '0.85rem' }}>
                Every diagnosis provides upfront component and labor estimates before you spend a single rupee. No inflated dealer markups.
              </p>
            </div>

            <div className="fixit-card">
              <Zap size={28} color="var(--neon-pink)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.4rem' }}>FixIt Now Emergency Response</h4>
              <p style={{ fontSize: '0.85rem' }}>
                Breakdown on the road or sudden power trip? FixIt Now dispatches the nearest mobile mechanic within 15-25 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: FINAL CTA
      ================================================== */}
      <section style={{ padding: '6rem 0', textAlign: 'center', position: 'relative' }}>
        <div className="fixit-container" style={{ position: 'relative', zIndex: 5 }}>
          <div
            className="glass-panel"
            style={{
              padding: '4rem 2rem',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid var(--neon-cyan-border)',
              boxShadow: 'var(--shadow-glow-cyan-lg)',
              background: 'linear-gradient(180deg, rgba(16, 25, 46, 0.95) 0%, rgba(7, 11, 22, 0.98) 100%)'
            }}
          >
            <span className="fixit-badge fixit-badge-cyan" style={{ marginBottom: '1rem' }}>
              GET STARTED IN UNDER 60 SECONDS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: '#fff' }}>
              Have a Broken Product Sitting Around?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2rem' }}>
              Show it to FixIt now. Find out whether it costs ₹200 to revive or whether it can start a new chapter.
            </p>
            <Link to="/show-problem" className="fixit-btn fixit-btn-lg fixit-btn-cyan">
              <Sparkles size={18} />
              <span>Show Your Problem Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive layout tweak */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid, .preview-grid, .teaser-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
