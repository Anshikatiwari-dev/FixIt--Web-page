export const MOCK_TECHNICIANS = [
  {
    id: 'tech-01',
    name: 'Rajesh Kumar Verma',
    title: 'Master Appliance & HVAC Specialist',
    verified: true,
    rating: 4.9,
    reviewCount: 382,
    jobsCompleted: 640,
    experienceYears: 11,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    categories: ['appliances', 'electronics', 'furniture'],
    skills: ['Microwave Repair', 'Refrigerator Inverter Compressors', 'Washing Machines', 'Ceiling Fan Rewinding', 'PCB Diagnostics'],
    serviceArea: 'Indiranagar, Koramangala, HSR Layout, Whitefield (Bengaluru)',
    startingPrice: 299,
    hourlyRate: 350,
    availableNow: true,
    emergencyReady: true,
    distanceKm: 2.4,
    badgeText: 'Top Rated Fixer',
    bio: 'Certified National Skill Development Corporation (NSDC) master technician. Specializes in board-level appliance repair rather than costly full replacements.',
    certifications: ['Govt Certified Electrical Technician Level 4', 'Samsung & LG Authorized Service Alum'],
    recentReviews: [
      {
        author: 'Arjun Swaminathan',
        rating: 5,
        date: '2 days ago',
        comment: 'Diagnosed my convection microwave in 15 mins. Saved me ₹3000 by fixing the synchronous motor rather than replacing the board.'
      },
      {
        author: 'Pooja Nair',
        rating: 5,
        date: '1 week ago',
        comment: 'Punctual, carried genuine parts with manufacturer bill, very polite and explained everything clearly.'
      }
    ]
  },
  {
    id: 'tech-02',
    name: 'Sameer Sheikh',
    title: 'Senior Electronics & Chip-Level Engineer',
    verified: true,
    rating: 4.85,
    reviewCount: 294,
    jobsCompleted: 512,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    categories: ['laptop_pc', 'mobile', 'electronics'],
    skills: ['Laptop Motherboard SMD Repair', 'Thermal Repasting', 'iPhone Display & IC', 'Data Recovery', 'BGA Reballing'],
    serviceArea: 'Bandra, Khar, Santacruz, Andheri West (Mumbai)',
    startingPrice: 399,
    hourlyRate: 450,
    availableNow: true,
    emergencyReady: false,
    distanceKm: 3.8,
    badgeText: 'Chip-Level Expert',
    bio: 'Micro-soldering specialist with dedicated anti-static workstation. He diagnoses shorted MOSFETs, liquid damage, and corrupted BIOS chips.',
    certifications: ['IPC-A-610 Certified Soldering', 'Apple Certified Mac Technician (ACMT)'],
    recentReviews: [
      {
        author: 'Rohan Mehra',
        rating: 5,
        date: '3 days ago',
        comment: 'Dell service center told me to change motherboard for ₹28,000. Sameer repaired the power IC for ₹2,400. Absolute legend.'
      }
    ]
  },
  {
    id: 'tech-03',
    name: 'Balwinder Singh & Sons',
    title: 'Two-Wheeler & Royal Enfield Guru',
    verified: true,
    rating: 4.95,
    reviewCount: 480,
    jobsCompleted: 980,
    experienceYears: 18,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    categories: ['bike', 'car', 'diy_reuse'],
    skills: ['Carburettor Tuning', 'Clutch Plate Overhaul', 'On-Spot Breakdown', 'Wiring Harness Fix', 'Brake Bleeding'],
    serviceArea: 'Connaught Place, Karol Bagh, Lajpat Nagar, Noida (Delhi NCR)',
    startingPrice: 349,
    hourlyRate: 400,
    availableNow: true,
    emergencyReady: true,
    distanceKm: 1.8,
    badgeText: 'Rapid Emergency Dispatch',
    bio: 'Legendary mechanic with mobile roadside repair van equipped with OBD scanners, battery jump packs, and emergency fuel & puncture kits.',
    certifications: ['Bosch Automotive Certified Specialist', 'Royal Enfield Specialist Club Member'],
    recentReviews: [
      {
        author: 'Karanvir Vohra',
        rating: 5,
        date: 'Yesterday',
        comment: 'FixIt Now emergency call! My Classic 350 died in monsoon rain on Outer Ring Road. Balwinder arrived in 22 minutes with spark plug and dry coil.'
      }
    ]
  },
  {
    id: 'tech-04',
    name: 'Muthuvel Karunanithi',
    title: 'Precision Carpenter & Furniture Surgeon',
    verified: true,
    rating: 4.8,
    reviewCount: 215,
    jobsCompleted: 390,
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    categories: ['furniture', 'diy_reuse'],
    skills: ['Hydraulic Bed/Chair Repair', 'Modular Kitchen Hinges', 'Wood Termite Treatment', 'Antique Restoration', 'Custom Shelving'],
    serviceArea: 'Adyar, T. Nagar, Velachery, OMR (Chennai)',
    startingPrice: 249,
    hourlyRate: 300,
    availableNow: false,
    emergencyReady: false,
    distanceKm: 5.2,
    badgeText: 'Woodcraft Specialist',
    bio: 'Specialist in rehabilitating wobbling dining tables, broken hydraulic office chairs, and sagging modular wardrobe soft-close channels.',
    certifications: ['Master Craftsman Guild Certification'],
    recentReviews: [
      {
        author: 'Deepa Natarajan',
        rating: 5,
        date: '4 days ago',
        comment: 'Replaced the sunk gas-lift cylinder of my ergonomic chair in 20 minutes without a single scratch on hardwood floor.'
      }
    ]
  },
  {
    id: 'tech-05',
    name: 'Ananya Deshmukh',
    title: 'Smart Home, Drone & Micro-Electronics Specialist',
    verified: true,
    rating: 4.92,
    reviewCount: 160,
    jobsCompleted: 310,
    experienceYears: 6,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    categories: ['electronics', 'laptop_pc', 'diy_reuse'],
    skills: ['Smart Home Hubs', 'Drone Motor Repair', 'Audio Amplifier Fix', 'Li-ion Battery Re-cell', 'Soldering'],
    serviceArea: 'Kothrud, Viman Nagar, Hinjewadi (Pune)',
    startingPrice: 350,
    hourlyRate: 450,
    availableNow: true,
    emergencyReady: true,
    distanceKm: 3.1,
    badgeText: 'NextGen Tech',
    bio: 'Robotics engineer turned repair advocate. Passionate about Right to Repair, upcycling electronic waste, and reviving premium audio gadgets.',
    certifications: ['Certified IoT Device Hardware Engineer'],
    recentReviews: [
      {
        author: 'Vikram Joshi',
        rating: 5,
        date: '5 days ago',
        comment: 'Upcycled my old iPad with dead battery into a wall-mounted smart home controller. Brilliant ideas and execution.'
      }
    ]
  }
];
