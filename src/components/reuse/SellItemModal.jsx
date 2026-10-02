import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const SellItemModal = ({ isOpen, onClose }) => {
  const { addMarketplaceItem, userState } = useApp();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState('For Parts / Salvage');
  const [category, setCategory] = useState('laptop_pc');
  const [price, setPrice] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [availableParts, setAvailableParts] = useState('');
  const [location, setLocation] = useState(userState?.profile?.location || 'Bengaluru');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=80');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      showToast('Please fill out the product title and asking price.', 'warning');
      return;
    }

    const partsList = availableParts.split(',').map((p) => p.trim()).filter(Boolean);

    addMarketplaceItem({
      title,
      condition,
      category,
      price: Number(price),
      originalValue: Number(originalValue) || Number(price) * 3,
      description: problemDescription,
      availableParts: partsList.length > 0 ? partsList : ['Working internal chassis & components'],
      sellerLocation: location,
      photos: [photoUrl]
    });

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    showToast(`Item "${title}" successfully listed on the Second-Life Marketplace!`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="List a Broken / Salvage Item for Second Life"
      subtitle="Turn your broken gadgets, parts, or upcyclables into cash for hobbyists & repairers."
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Title */}
        <div>
          <label className="fixit-label">Product Name & Core Variant</label>
          <input
            type="text"
            required
            className="fixit-input"
            placeholder="e.g. Dell XPS 15 (Motherboard dead, 4K screen intact)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Condition & Category */}
        <div className="grid-2">
          <div>
            <label className="fixit-label">Listing Condition</label>
            <select
              className="fixit-select"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="For Parts / Salvage">For Parts / Salvage</option>
              <option value="Refurbishable / DIY Upcycle">Refurbishable / DIY Upcycle</option>
              <option value="Reusable Components">Reusable Components</option>
              <option value="Cosmetically Damaged (Working)">Cosmetically Damaged (Working)</option>
            </select>
          </div>

          <div>
            <label className="fixit-label">Category</label>
            <select
              className="fixit-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="laptop_pc">Laptop / PC</option>
              <option value="mobile">Mobile / Tablet</option>
              <option value="appliances">Appliances</option>
              <option value="furniture">Furniture / Wood</option>
              <option value="bike">Bike & Automobile</option>
              <option value="electronics">General Electronics</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid-2">
          <div>
            <label className="fixit-label">Your Asking Price (₹)</label>
            <input
              type="number"
              required
              className="fixit-input"
              placeholder="e.g. 2500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="fixit-label">Original Retail Value (Approx ₹)</label>
            <input
              type="number"
              className="fixit-input"
              placeholder="e.g. 18000"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
            />
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <label className="fixit-label">What is Broken / Damaged?</label>
          <textarea
            className="fixit-textarea"
            rows="2"
            placeholder="Explain what works and what stopped working so buyers know exact salvage value."
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
          />
        </div>

        {/* Salvageable Parts list */}
        <div>
          <label className="fixit-label">Working Parts / Salvageable Components (comma separated)</label>
          <input
            type="text"
            className="fixit-input"
            placeholder="e.g. RAM, SSD, Display, Battery, Aluminum casing"
            value={availableParts}
            onChange={(e) => setAvailableParts(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className="fixit-label">Pickup City / Area</label>
          <input
            type="text"
            className="fixit-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Neighborhood"
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
          <button type="button" onClick={onClose} className="fixit-btn fixit-btn-ghost">
            Cancel
          </button>
          <button type="submit" className="fixit-btn fixit-btn-cyan">
            <span>Publish Marketplace Listing</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </form>
    </Modal>
  );
};
