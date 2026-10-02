export const REUSE_IDEAS = [
  {
    id: 'reuse-chair-stand',
    originalItem: 'Old Broken Wooden Chair',
    secondLifeTitle: 'Tiered Rustic Balcony Plant Stand',
    category: 'Home & Furniture',
    difficulty: 'Easy DIY',
    upcyclingValue: 'Saves ₹1,800 on planter racks',
    carbonSavedKg: 14.5,
    summary: 'Remove broken woven cane seat, sand the sturdy teak legs, drop a terracotta terracotta saucer into the seat aperture, and paint with outdoor weatherproof enamel.',
    steps: [
      'Unscrew or saw off the cracked back slats cleanly.',
      'Sand rough wood surfaces with 120-grit sandpaper.',
      'Apply a vibrant pop coat of teal or terracotta exterior paint.',
      'Rest a 12-inch terracotta plant saucer directly into the seat frame.'
    ],
    tags: ['Furniture', 'Garden', 'Upcycling', 'Woodwork'],
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'reuse-tyre-ottoman',
    originalItem: 'Discarded Motorcycle / Car Tyre',
    secondLifeTitle: 'Eco-Rope Patio Ottoman / Coffee Pouf',
    category: 'Auto / DIY',
    difficulty: 'Medium DIY',
    upcyclingValue: 'Saves ₹2,500 on outdoor furniture',
    carbonSavedKg: 28.0,
    summary: 'Pressure wash the rubber tyre, bolt two circular plywood discs on top and bottom, wrap completely with 10mm natural jute rope using a hot glue gun.',
    steps: [
      'Degrease and scrub tyre with detergent and sun-dry.',
      'Cut two 20-inch circles of 9mm plywood; screw into tyre bead with self-tapping screws.',
      'Spiral wrap natural Manila jute rope starting from top center outwards.',
      'Attach three 4-inch angled wooden legs to the bottom plywood disc for elevation.'
    ],
    tags: ['Tyre', 'Rope', 'Patio', 'Zero Waste'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'reuse-laptop-server',
    originalItem: 'Old Laptop with Broken Screen or Hinge',
    secondLifeTitle: '24/7 Silent Home Cloud & Ad-Blocker Server',
    category: 'Electronics / PC',
    difficulty: 'Tech Enthusiast',
    upcyclingValue: 'Saves ₹12,000 on dedicated NAS hardware',
    carbonSavedKg: 42.0,
    summary: 'Remove cracked lid or connect via HDMI. Install Ubuntu Server or CasaOS with Pi-hole and Plex. Runs on just 8-15 watts with built-in battery UPS backup!',
    steps: [
      'Disconnect damaged screen ribbon cable to avoid internal power draw.',
      'Flash lightweight Linux OS (Ubuntu Server / Alpine / CasaOS) onto bootable USB.',
      'Configure headless SSH and install Pi-hole network-wide ad blocker & Nextcloud.',
      'Place vertically in a ventilated vertical laptop stand beside your Wi-Fi router.'
    ],
    tags: ['Tech', 'Server', 'NAS', 'Pi-hole', 'Zero Waste'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'reuse-cycle-rim',
    originalItem: 'Bent Bicycle Wheel Rim',
    secondLifeTitle: 'Industrial Hanging Pot Rack / Clock',
    category: 'Bike / Home',
    difficulty: 'Easy DIY',
    upcyclingValue: 'Saves ₹1,500',
    carbonSavedKg: 8.2,
    summary: 'Strip worn rubber, polish chrome rim or spray matte black, insert S-hooks through spoke eyelets to hang cast iron pans, cooking utensils, or fairy lights.',
    steps: [
      'Remove tube and tyre; clean rim spoke nipples with wire brush.',
      'Insert heavy-duty ceiling toggle bolts with three linked chains.',
      'Hang metal S-hooks from spoke holes for pans and ladles.',
      'Wrap warm LED micro-fairy lights around the outer hub for kitchen ambiance.'
    ],
    tags: ['Bicycle', 'Kitchen', 'Steampunk', 'Lighting'],
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80'
  }
];

export const MOCK_MARKETPLACE_ITEMS = [
  {
    id: 'item-01',
    title: 'MacBook Pro 15" 2018 (Cracked Display, Working Logic Board & Battery)',
    condition: 'For Parts / Salvage',
    category: 'laptop_pc',
    price: 9500,
    originalValue: 145000,
    sellerName: 'Devansh Roy',
    sellerLocation: 'HSR Layout, Bengaluru',
    sellerVerified: true,
    availableParts: ['Intel i7 6-Core Logic Board', '16GB RAM soldered', '512GB SSD', 'OEM 83.6Wh Battery (88% Health)', 'Touch Bar & Trackpad'],
    description: 'Dropped down staircase and screen shattered. Tested via external USB-C monitor: boots cleanly, CPU, RAM, Wi-Fi and audio work 100%. Ideal for board donors or desktop Mac mini alternative.',
    photos: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80'
    ],
    postedDate: '1 day ago',
    inquiries: 14
  },
  {
    id: 'item-02',
    title: 'Solid Sheesham Wood Dining Table Top (Slightly Wobbling Legs)',
    condition: 'Refurbishable / DIY Upcycle',
    category: 'furniture',
    price: 3800,
    originalValue: 24000,
    sellerName: 'Kavita Menon',
    sellerLocation: 'Andheri West, Mumbai',
    sellerVerified: true,
    availableParts: ['1.5-inch Thick Solid Sheesham Plank (6ft x 3ft)', '4 Heavy Wood Legs with Brass Caps'],
    description: 'Moving to smaller apartment. Beautiful natural wood grain without any termite damage. Needs minor corner bracket re-tightening or can be repurposed into two luxury study desks.',
    photos: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400&auto=format&fit=crop&q=80'
    ],
    postedDate: '2 days ago',
    inquiries: 9
  },
  {
    id: 'item-03',
    title: 'DJI Mini 2 Drone (Broken Arm Motor, Clean 4K Gimbal & Controller)',
    condition: 'For Parts / Salvage',
    category: 'electronics',
    price: 4900,
    originalValue: 42000,
    sellerName: 'Nitin Bharadwaj',
    sellerLocation: 'Saket, New Delhi',
    sellerVerified: true,
    availableParts: ['3-Axis 4K Camera Gimbal Assembly', 'Remote Controller RC-N1', 'Flight Controller Core Board', '2 Intelligent Flight Batteries'],
    description: 'Tree collision snapped rear right carbon arm. The 4K camera gimbal is completely undamaged and works smoothly. Remote controller included.',
    photos: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80'
    ],
    postedDate: '3 days ago',
    inquiries: 22
  },
  {
    id: 'item-04',
    title: 'Shimano Tourney 21-Speed Gear Shifters & Derailleurs (Clean Working)',
    condition: 'Reusable Components',
    category: 'bike',
    price: 850,
    originalValue: 2600,
    sellerName: 'Farhan Ali',
    sellerLocation: 'Banjara Hills, Hyderabad',
    sellerVerified: true,
    availableParts: ['Front Derailleur TZ-50', 'Rear Derailleur TY-300', 'Indexed 3x7 Thumb Shifters', 'Cable Housing'],
    description: 'Salvaged from an upgraded Firefox road bike. Degreased, freshly lubricated with ceramic lube, springs crisp and straight.',
    photos: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&auto=format&fit=crop&q=80'
    ],
    postedDate: '4 days ago',
    inquiries: 6
  }
];
