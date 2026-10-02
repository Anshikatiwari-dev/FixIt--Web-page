import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export const AiChatAssistant = ({ diagnosis }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I've analyzed your ${diagnosis?.productName || 'product'}. Feel free to ask me anything about the diagnosis, required tools, safety precautions, or parts replacement.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Can I fix this myself?',
    'What tools do I need?',
    'How much will it cost?',
    'Is it safe for DIY?',
    'What part do I need?',
    'Where can I get the spare parts?'
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI reasoning and reply
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('myself') || lower.includes('can i fix')) {
        reply = diagnosis?.diyPossible
          ? `Yes, this is well within DIY reach! The repairability score is ${diagnosis.repairabilityScore}%. It only requires basic hand tools and takes about ${diagnosis.estimatedTime}. You can follow our 5-step tutorial in the DIY tab.`
          : `We recommend professional assistance for this repair because high voltage, combustible fuel, or delicate SMD electronics are involved. Please check our verified technicians list.`;
      } else if (lower.includes('tools')) {
        const toolsList = diagnosis?.requiredTools?.join(', ') || 'Standard screwdriver and pliers';
        reply = `For this repair, you will need: ${toolsList}. Most of these are basic household tools.`;
      } else if (lower.includes('cost') || lower.includes('price')) {
        reply = `The estimated total repair cost is ${diagnosis?.estimatedCost || '₹300 - ₹500'}, which includes genuine replacement components. That is over 80% cheaper than buying a brand new replacement.`;
      } else if (lower.includes('safe') || lower.includes('hazard')) {
        reply = diagnosis?.isHighRisk
          ? `⚠️ Caution: This repair involves electrical or thermal hazards. Make sure the unit is completely isolated from power, and consider hiring a verified technician if you do not have insulated gear.`
          : `This repair is considered safe if you follow standard precautions: disconnect mains power, work in good lighting, and never force plastic clips.`;
      } else if (lower.includes('part') || lower.includes('where')) {
        const partsCount = diagnosis?.requiredParts?.length || 0;
        reply = `You need ${partsCount} item(s): ${diagnosis?.requiredParts?.map(p => `${p.name} (approx ₹${p.estimatedPrice})`).join(', ') || 'standard replacement part'}. You can order them directly from our Spare Parts Hub with 1-click compatibility guarantee.`;
      } else {
        reply = `Regarding "${query}": Based on FixIt's diagnostic schematics for ${diagnosis?.productName || 'this device'}, replacing the consumable component is the optimal route. It extends lifecycle by 2-3 years and prevents e-waste.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      className="fixit-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '420px',
        border: '1px solid var(--border-glow-cyan)',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(0, 242, 254, 0.06)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--grad-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Bot size={16} color="#050811" />
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
            Ask FixIt AI Assistant
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--neon-teal)' }}>
            Real-time repair advice & diagnostic clarification
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '10px',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            {m.sender === 'ai' && (
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(0, 242, 254, 0.15)',
                  border: '1px solid var(--neon-cyan-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Sparkles size={13} color="var(--neon-cyan)" />
              </div>
            )}

            <div
              style={{
                background: m.sender === 'user' ? 'var(--grad-cyan)' : 'rgba(255, 255, 255, 0.05)',
                color: m.sender === 'user' ? '#070B16' : 'var(--text-primary)',
                fontWeight: m.sender === 'user' ? 600 : 400,
                fontSize: '0.85rem',
                lineHeight: 1.45,
                padding: '10px 14px',
                borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                border: m.sender === 'user' ? 'none' : '1px solid var(--border-subtle)'
              }}
            >
              {m.text}
            </div>

            {m.sender === 'user' && (
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <User size={13} color="#fff" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
            <Sparkles size={12} className="animate-spin" color="var(--neon-cyan)" />
            <span>FixIt AI is analyzing...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Question Chips */}
      <div
        style={{
          padding: '6px 12px',
          background: 'rgba(0, 0, 0, 0.25)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            style={{
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid var(--neon-cyan-border)',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '10px 12px',
          background: 'var(--bg-glass-heavy)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px'
        }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about this diagnosis..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSend()}
          className="fixit-btn fixit-btn-cyan"
          style={{ padding: '8px 14px', borderRadius: '8px' }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
