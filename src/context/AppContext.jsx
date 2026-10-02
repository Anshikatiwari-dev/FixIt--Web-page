import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_DIAGNOSES } from '../data/mockDiagnoses';
import { MOCK_TECHNICIANS } from '../data/mockTechnicians';
import { MOCK_PARTS } from '../data/mockParts';
import { MOCK_MARKETPLACE_ITEMS, REUSE_IDEAS } from '../data/mockMarketplace';
import { INITIAL_USER_STATE, INITIAL_ADMIN_DATA } from '../data/mockUser';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active diagnosis (defaults to first sample diagnosis so /diagnosis and /diy pages work immediately)
  const [currentDiagnosis, setCurrentDiagnosis] = useState(() => {
    const saved = localStorage.getItem('fixit_current_diagnosis');
    return saved ? JSON.parse(saved) : SAMPLE_DIAGNOSES[0];
  });

  // User State
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('fixit_user_state');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  // Technicians List
  const [technicians, setTechnicians] = useState(() => {
    const saved = localStorage.getItem('fixit_technicians');
    return saved ? JSON.parse(saved) : MOCK_TECHNICIANS;
  });

  // Spare Parts Catalog
  const [parts, setParts] = useState(() => {
    const saved = localStorage.getItem('fixit_parts');
    return saved ? JSON.parse(saved) : MOCK_PARTS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fixit_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Second-Life Marketplace Items
  const [marketplaceItems, setMarketplaceItems] = useState(() => {
    const saved = localStorage.getItem('fixit_marketplace');
    return saved ? JSON.parse(saved) : MOCK_MARKETPLACE_ITEMS;
  });

  // Admin Data & Verifications
  const [adminData, setAdminData] = useState(() => {
    const saved = localStorage.getItem('fixit_admin_data');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_DATA;
  });

  // Active Emergency FixIt Now Dispatches
  const [activeEmergency, setActiveEmergency] = useState(() => {
    const saved = localStorage.getItem('fixit_emergency');
    return saved ? JSON.parse(saved) : null;
  });

  // Role switcher for testing / presentation: 'user' | 'technician' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('fixit_role') || 'user';
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('fixit_current_diagnosis', JSON.stringify(currentDiagnosis));
  }, [currentDiagnosis]);

  useEffect(() => {
    localStorage.setItem('fixit_user_state', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('fixit_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fixit_marketplace', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  useEffect(() => {
    localStorage.setItem('fixit_admin_data', JSON.stringify(adminData));
  }, [adminData]);

  useEffect(() => {
    localStorage.setItem('fixit_role', currentRole);
  }, [currentRole]);

  // Cart Functions
  const addToCart = (part) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.id === part.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...part, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (partId) => {
    setCart((prev) => prev.filter((item) => item.id !== partId));
  };

  const updateCartQuantity = (partId, qty) => {
    if (qty <= 0) {
      removeFromCart(partId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === partId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Booking a Technician
  const bookTechnician = (bookingDetails) => {
    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      ...bookingDetails,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setUserState((prev) => ({
      ...prev,
      activeRepairs: [
        {
          id: `rep-${Date.now().toString().slice(-4)}`,
          productName: bookingDetails.productName || 'Custom Service',
          status: 'Technician Booked',
          date: `${bookingDetails.date} at ${bookingDetails.timeSlot}`,
          costEstimate: `₹${bookingDetails.estimatedTotal}`,
          method: `Technician (${bookingDetails.technicianName})`,
          category: bookingDetails.category || 'appliances',
          completionPercentage: 35,
          technicianId: bookingDetails.technicianId
        },
        ...prev.activeRepairs
      ]
    }));

    setAdminData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        technicianBookings: prev.metrics.technicianBookings + 1
      },
      recentPlatformBookings: [
        {
          id: newBooking.id,
          customer: userState.profile.name,
          technician: bookingDetails.technicianName,
          issue: bookingDetails.problemSummary || 'Repair service',
          status: 'Confirmed',
          amount: `₹${bookingDetails.estimatedTotal}`,
          dateTime: `${bookingDetails.date}, ${bookingDetails.timeSlot}`
        },
        ...prev.recentPlatformBookings
      ]
    }));

    return newBooking;
  };

  // Adding a Marketplace Listing ("Sell an Item")
  const addMarketplaceItem = (newItem) => {
    const item = {
      id: `item-${Date.now()}`,
      postedDate: 'Just now',
      inquiries: 0,
      sellerName: userState.profile.name,
      sellerLocation: userState.profile.location,
      sellerVerified: true,
      ...newItem
    };
    setMarketplaceItems((prev) => [item, ...prev]);
    return item;
  };

  // Admin Actions: Approve or Reject Technician Verification
  const updateVerificationStatus = (id, newStatus) => {
    setAdminData((prev) => ({
      ...prev,
      pendingVerifications: prev.pendingVerifications.map((v) =>
        v.id === id ? { ...v, status: newStatus } : v
      )
    }));
  };

  // Emergency FixIt Now Dispatch
  const dispatchEmergency = (emergencyDetails) => {
    const dispatchObj = {
      id: `emg-${Date.now().toString().slice(-4)}`,
      status: 'Technician Dispatched',
      technicianName: 'Balwinder Singh & Sons',
      technicianPhone: '+91 98112 34567',
      estimatedArrivalMinutes: 18,
      location: emergencyDetails.location || 'Current GPS Location',
      problemType: emergencyDetails.problemType || 'Two-Wheeler Roadside Stoppage',
      category: emergencyDetails.category || 'bike',
      fee: 450,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveEmergency(dispatchObj);
    return dispatchObj;
  };

  const cancelEmergency = () => {
    setActiveEmergency(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentDiagnosis,
        setCurrentDiagnosis,
        userState,
        setUserState,
        technicians,
        parts,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        marketplaceItems,
        addMarketplaceItem,
        adminData,
        updateVerificationStatus,
        bookTechnician,
        activeEmergency,
        dispatchEmergency,
        cancelEmergency,
        currentRole,
        setCurrentRole,
        reuseIdeas: REUSE_IDEAS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
