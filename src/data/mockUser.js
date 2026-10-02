export const INITIAL_USER_STATE = {
  profile: {
    name: 'Aakash Sharma',
    email: 'aakash.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    location: 'Indiranagar 12th Main, Bengaluru 560038',
    memberSince: 'March 2024',
    savedCarbonKg: 54.8,
    savedMoneyInr: 18400
  },
  activeRepairs: [
    {
      id: 'rep-101',
      productName: 'Orient Electric Apex Ceiling Fan',
      status: 'DIY In Progress (Capacitor Replaced)',
      date: 'Today, 2:30 PM',
      costEstimate: '₹215',
      method: 'DIY Repair',
      category: 'appliances',
      completionPercentage: 80,
      partsOrdered: ['2.5µF Fan Capacitor']
    },
    {
      id: 'rep-102',
      productName: 'LG 28L Convection Microwave',
      status: 'Technician Booked',
      date: 'Tomorrow, 11:00 AM',
      costEstimate: '₹620',
      method: 'Technician (Rajesh Kumar Verma)',
      category: 'appliances',
      completionPercentage: 40,
      technicianId: 'tech-01'
    }
  ],
  savedProducts: [
    {
      id: 'prod-01',
      name: 'Dell XPS 15 (9570)',
      serial: 'DELL-9570-8X',
      purchaseYear: 2021,
      lastServiced: 'Aug 2024',
      healthScore: 82,
      notes: 'Cleaned fan and repasted Arctic MX-4. Idle temps at 42°C.'
    },
    {
      id: 'prod-02',
      name: 'Royal Enfield Classic 350',
      serial: 'ME3U3S5C8K2XXXXXX',
      purchaseYear: 2019,
      lastServiced: 'Oct 2024',
      healthScore: 88,
      notes: 'Carb tuned and new NGK twin spark plugs installed.'
    }
  ],
  partOrders: [
    {
      id: 'ord-8831',
      item: '2.5µF 440V AC Metallized Fan Capacitor',
      date: 'Today',
      status: 'Out for Delivery (FixIt Express)',
      amount: 95,
      deliveryEta: 'Arriving in ~45 mins'
    },
    {
      id: 'ord-8742',
      item: 'Arctic MX-4 High Performance Thermal Paste (4g)',
      date: '28 Sep 2024',
      status: 'Delivered',
      amount: 380,
      deliveryEta: 'Delivered on time'
    }
  ],
  savedTutorials: ['diag-fan-01', 'diag-laptop-05', 'reuse-chair-stand']
};

export const INITIAL_ADMIN_DATA = {
  metrics: {
    totalUsers: 14820,
    activeTechnicians: 462,
    repairsCompleted: 9340,
    technicianBookings: 3210,
    sparePartOrders: 6480,
    marketplaceListings: 890,
    totalEwasteDivertedTons: 18.4,
    userSavingsTotalInr: '₹1.84 Crore'
  },
  pendingVerifications: [
    {
      id: 'verif-01',
      name: 'Vikramaditya Rao',
      specialty: 'Automobile & EV Scooter Mechanics',
      location: 'Whitefield, Bengaluru',
      experience: '9 Years',
      documentsSubmitted: ['Aadhaar Card', 'NSDC Two-Wheeler Certification', 'GST Trade License'],
      submissionDate: 'Today, 10:15 AM',
      status: 'Pending Review'
    },
    {
      id: 'verif-02',
      name: 'Priyanka Sen',
      specialty: 'Precision Micro-Soldering & Laptop Chip Repair',
      location: 'Salt Lake Sector V, Kolkata',
      experience: '7 Years',
      documentsSubmitted: ['Aadhaar Card', 'IPC Soldering Certificate', 'Shop Establishment Act'],
      submissionDate: 'Yesterday, 4:20 PM',
      status: 'Under Review'
    },
    {
      id: 'verif-03',
      name: 'Harpreet Singh',
      specialty: 'Heavy Inverter & Solar UPS Repair',
      location: 'Mohali, Punjab',
      experience: '12 Years',
      documentsSubmitted: ['Aadhaar Card', 'Luminous Authorized Service Ex-Tech Letter'],
      submissionDate: '2 days ago',
      status: 'Pending Review'
    }
  ],
  recentPlatformBookings: [
    {
      id: 'bk-901',
      customer: 'Siddharth Roy',
      technician: 'Rajesh Kumar Verma',
      issue: 'LG Microwave Synchronous Motor',
      status: 'Confirmed',
      amount: '₹620',
      dateTime: 'Tomorrow, 11:00 AM'
    },
    {
      id: 'bk-902',
      customer: 'Meera Chawla',
      technician: 'Sameer Sheikh',
      issue: 'MacBook Air liquid spill drying & IC check',
      status: 'In Progress',
      amount: '₹1,450',
      dateTime: 'Today, 4:00 PM'
    },
    {
      id: 'bk-903',
      customer: 'Aditya Sen',
      technician: 'Balwinder Singh',
      issue: 'FixIt Now: Highway Bike Breakdown',
      status: 'Dispatched (ETA 14 min)',
      amount: '₹450',
      dateTime: 'Just now'
    }
  ]
};
