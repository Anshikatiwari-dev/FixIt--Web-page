export const PRODUCT_CATEGORIES = [
  { id: 'furniture', name: 'Home & Furniture', icon: 'Armchair', color: '#00F2FE' },
  { id: 'appliances', name: 'Appliances', icon: 'Refrigerator', color: '#4FACFE' },
  { id: 'electronics', name: 'Electronics', icon: 'Tv', color: '#05DFD7' },
  { id: 'laptop_pc', name: 'Laptop / PC', icon: 'Laptop', color: '#3A86FF' },
  { id: 'mobile', name: 'Mobile / Accessories', icon: 'Smartphone', color: '#9D4EDD' },
  { id: 'bike', name: 'Bike & Motorcycle', icon: 'Bike', color: '#FF2A85' },
  { id: 'car', name: 'Car & Auto', icon: 'Car', color: '#FF8A00' },
  { id: 'diy_reuse', name: 'DIY / Reuse', icon: 'Recycle', color: '#10B981' }
];

export const SAMPLE_DIAGNOSES = [
  {
    id: 'diag-fan-01',
    productName: 'Orient Electric Apex Ceiling Fan',
    modelNumber: 'APEX-1200-BR',
    category: 'appliances',
    detectedProblem: 'Weak or degraded starting capacitor & dried rotor bearing lubrication',
    confidenceScore: 94,
    repairabilityScore: 88,
    difficulty: 'Easy',
    estimatedCost: '₹180 - ₹350',
    estimatedTime: '25 - 35 minutes',
    partsAvailability: 'High (Immediate locally & online)',
    diyPossible: true,
    isHighRisk: false,
    summary: 'The fan hums and rotates very slowly even at max regulator setting. This is a classic symptom of an aged capacitor (2.5uF) losing its capacitance over time.',
    whyFixItSuggested: 'A fan motor rarely burns out unless continuously run under smoke or heavy bearing friction. Replacing a ₹80 capacitor and applying bearing grease restores 100% speed and saves buying a new ₹2,500 fan.',
    suggestedPath: 'diy',
    safetyWarnings: [
      'Always switch off the main circuit breaker / MCB before touching ceiling wiring.',
      'Discharge the old capacitor by briefly bridging its two leads with an insulated screwdriver tip before handling.',
      'Ensure the safety wire and cotter pin are firmly fastened to the ceiling hook.'
    ],
    requiredTools: ['Screwdriver set (+ Phillips & Flathead)', 'Wire stripper/cutter', 'Insulation electrical tape', 'Multimeter (optional)'],
    requiredParts: [
      {
        partId: 'part-cap-25',
        name: '2.5µF 440V AC Heavy Duty Fan Capacitor',
        estimatedPrice: 95,
        type: 'Genuine OEM',
        inStock: true
      },
      {
        partId: 'part-grease-01',
        name: 'Lithium Synthetic Ball Bearing Grease (50g)',
        estimatedPrice: 120,
        type: 'Compatible',
        inStock: true
      }
    ],
    diyTutorial: [
      {
        stepNumber: 1,
        title: 'Power Isolation & Safe Access',
        instruction: 'Turn off the dedicated room switch AND the main MCB board power. Use a stable ladder and verify zero voltage using a neon phase tester pencil on the terminal block.',
        tip: 'Never rely solely on the wall regulator switch as neutral leakage can still shock you.'
      },
      {
        stepNumber: 2,
        title: 'Unscrew Canopy & Expose Capacitor',
        instruction: 'Loosen the small retaining screw on the upper canopy cover and slide it down along the downrod to reveal the motor housing clamp and capacitor bracket.',
        tip: 'Take a clear smartphone photo of the 3-wire color terminals before disconnecting anything.'
      },
      {
        stepNumber: 3,
        title: 'Safely Discharge & Remove Old Capacitor',
        instruction: 'Touch an insulated screwdriver shank across the two terminals of the old capacitor to safely short out any residual charge. Loosen the terminal clip and take out the cylinder.',
        tip: 'Notice the rating written on the body: standard Indian ceiling fans use 2.25µF or 2.5µF.'
      },
      {
        stepNumber: 4,
        title: 'Install New 2.5µF Capacitor',
        instruction: 'Slide the new capacitor into the plastic bracket. Connect one lead to the capacitor terminal and the other to the auxiliary starting winding terminal as captured in your photo.',
        tip: 'Firmly tighten screws; loose wires cause sparking and early regulator failure.'
      },
      {
        stepNumber: 5,
        title: 'Test Spin & Reassemble Canopy',
        instruction: 'Rotate the blades by hand to ensure free movement. Turn the MCB on and test at speed 1. Once smooth rotation is verified, slide up the canopy and secure the clamp screw.',
        tip: 'If the fan runs in reverse, simply swap the two capacitor leads.'
      }
    ],
    reuseAlternative: {
      title: 'Ceiling Fan Motor Upcycle',
      description: 'If the motor windings are burnt and beyond repair, the heavy steel housing makes a rustic industrial pendant lamp base or a high-torque pottery wheel drive.'
    }
  },
  {
    id: 'diag-chair-02',
    productName: 'Green Soul Monster Ergonomic Chair',
    modelNumber: 'GS-734U-BLK',
    category: 'furniture',
    detectedProblem: 'Hydraulic gas lift cylinder seal leak (Sinking seat syndrome)',
    confidenceScore: 92,
    repairabilityScore: 82,
    difficulty: 'Medium',
    estimatedCost: '₹650 - ₹950',
    estimatedTime: '40 - 50 minutes',
    partsAvailability: 'High',
    diyPossible: true,
    isHighRisk: false,
    summary: 'The chair slowly sinks to the lowest height setting whenever you sit down. The internal nitrogen gas seal in the Class 4 piston has degraded with use.',
    whyFixItSuggested: 'A replacement Class-4 heavy duty cylinder costs ~₹799. The mesh frame, armrests, and 5-star base are in mint condition. Replacing the cylinder saves spending ₹14,000 on a new chair.',
    suggestedPath: 'diy',
    safetyWarnings: [
      'Do NOT attempt to puncture or heat the pressurized gas cylinder.',
      'Wear safety glasses when tapping the metal base with a rubber mallet.',
      'Ensure the chair mechanism lever is not pressed while installing.'
    ],
    requiredTools: ['Rubber mallet or hammer with wooden block', 'Pipe wrench or vice grip', 'WD-40 or penetrating lubricant', 'Work gloves'],
    requiredParts: [
      {
        partId: 'part-gas-lift',
        name: 'Universal Class 4 Heavy Duty Gas Lift Cylinder (120mm travel)',
        estimatedPrice: 799,
        type: 'Universal Compatible',
        inStock: true
      }
    ],
    diyTutorial: [
      {
        stepNumber: 1,
        title: 'Spray Penetrating Lubricant',
        instruction: 'Turn the chair upside down on a soft rug or cardboard. Spray WD-40 liberally around the joint where the cylinder meets the wheel base and under the seat mechanism.',
        tip: 'Wait 10-15 minutes for the oil to penetrate the tapered friction fit.'
      },
      {
        stepNumber: 2,
        title: 'Separate 5-Star Wheel Base',
        instruction: 'Hold the wheel base up slightly and tap firmly on the bottom tip of the cylinder using a rubber mallet or hammer buffered with a block of wood.',
        tip: 'A few sharp, decisive strikes will break the cone lock.'
      },
      {
        stepNumber: 3,
        title: 'Remove Cylinder from Mechanism',
        instruction: 'Clamp a pipe wrench onto the thick upper shaft of the old cylinder as close to the seat plate as possible. Twist with firm leverage until it rotates and releases.',
        tip: 'You can discard the old cylinder responsibly at your local scrap recycler.'
      },
      {
        stepNumber: 4,
        title: 'Insert Replacement Cylinder',
        instruction: 'Remove the red/orange plastic protective shipping cap from the tip of the new cylinder. Slide the bottom into the wheel base and push the top into the seat plate.',
        tip: 'CRITICAL: If you do not remove the plastic shipping cap, the height adjustment lever will not work!'
      },
      {
        stepNumber: 5,
        title: 'Lock In by Sitting',
        instruction: 'Turn the chair right side up, sit down firmly on the seat. Your body weight will instantly lock the tapered friction fittings together.',
        tip: 'Test the lift handle up and down 3 times to cycle the valve.'
      }
    ],
    reuseAlternative: {
      title: 'Repurpose Sunk Base',
      description: 'Use the 5-star castor base to create a rolling workshop tool caddy or mobile plant stand that can glide across tiles.'
    }
  },
  {
    id: 'diag-microwave-03',
    productName: 'LG 28L Convection Microwave Oven',
    modelNumber: 'MC2846SL',
    category: 'appliances',
    detectedProblem: 'Turntable synchronous motor gear wear or drive coupler fracture',
    confidenceScore: 89,
    repairabilityScore: 78,
    difficulty: 'Medium',
    estimatedCost: '₹350 - ₹600',
    estimatedTime: '30 minutes',
    partsAvailability: 'High',
    diyPossible: true,
    isHighRisk: true,
    summary: 'The microwave heats food properly, but the glass plate jerks or does not rotate, causing uneven cooking.',
    whyFixItSuggested: 'The turntable motor is located at the bottom external base outside the high-voltage cavity. It is a simple 21V/220V AC synchronous motor that can be changed from the bottom hatch.',
    suggestedPath: 'technician',
    safetyWarnings: [
      'HIGH VOLTAGE DANGER: Microwaves contain a massive High-Voltage Capacitor (2000V+) that retains deadly lethal charge even when unplugged for days.',
      'NEVER remove the main outer cabinet housing unless you are a certified appliance technician.',
      'Only access the separate bottom undercarriage access hatch with the power cord unplugged.'
    ],
    requiredTools: ['Phillips screwdriver', 'Needle nose pliers', 'Insulated work gloves'],
    requiredParts: [
      {
        partId: 'part-micro-motor',
        name: 'Universal 220V Microwave Turntable Motor (4/5 RPM D-Shaft)',
        estimatedPrice: 320,
        type: 'OEM Replacement',
        inStock: true
      },
      {
        partId: 'part-micro-coupler',
        name: 'Trigonal Glass Roller Guide Coupler',
        estimatedPrice: 110,
        type: 'Compatible',
        inStock: true
      }
    ],
    diyTutorial: [
      {
        stepNumber: 1,
        title: 'Safety Isolation',
        instruction: 'Unplug the microwave power cord. Empty the inside: remove the glass turntable platter and the rolling roller ring.',
        tip: 'Never attempt internal work while plugged in.'
      },
      {
        stepNumber: 2,
        title: 'Inspect the Plastic Drive Coupler',
        instruction: 'Check the center plastic clover shaft inside the chamber. If the teeth are stripped or cracked, replacing this ₹100 piece fixes it without opening anything!',
        tip: 'Pull straight up to pop it off.'
      },
      {
        stepNumber: 3,
        title: 'Access the Underside Motor Hatch',
        instruction: 'Carefully rest the microwave on its side or back on a thick towel. Locate the perforated metal access plate on the bottom center and remove the single retaining screw.',
        tip: 'Notice that you do NOT need to open the main high-voltage shell.'
      },
      {
        stepNumber: 4,
        title: 'Swap Synchronous Motor',
        instruction: 'Disconnect the two spade wire terminals from the motor. Unscrew the two mounting screws, slide the new motor in, re-attach wires (polarity does not matter on AC motors).',
        tip: 'Ensure the D-shaped metal shaft aligns with the interior chamber hole.'
      },
      {
        stepNumber: 5,
        title: 'Re-seal Bottom Plate & Test',
        instruction: 'Fasten the bottom metal hatch back securely. Place a bowl of water on the glass tray, plug in and run for 20 seconds to confirm smooth rotation.',
        tip: 'Never run microwave empty without water or food inside.'
      }
    ],
    reuseAlternative: {
      title: 'Upcycle as Retro Kitchen Breadbox',
      description: 'Remove internal guts and transform vintage microwave casing into a quirky dustproof breadbox with ambient magnetic LED strip inside.'
    }
  },
  {
    id: 'diag-bike-04',
    productName: 'Royal Enfield Classic 350',
    modelNumber: 'RE-350-BS4',
    category: 'bike',
    detectedProblem: 'Carburettor float pin sticking & spark plug carbon fouled',
    confidenceScore: 91,
    repairabilityScore: 84,
    difficulty: 'Medium',
    estimatedCost: '₹350 - ₹750',
    estimatedTime: '45 minutes',
    partsAvailability: 'High',
    diyPossible: true,
    isHighRisk: true,
    summary: 'Engine misfiring on cold starts, petrol overflow dripping from carb vent pipe, and black sooty exhaust.',
    whyFixItSuggested: 'Common issue on UCE engines after monsoon or standing idle. Cleaning the float bowl needle valve and replacing the twin spark plugs resolves 95% of idling hiccups without costly garage labor.',
    suggestedPath: 'diy',
    safetyWarnings: [
      'FLAMMABLE PETROL: Work in an open outdoor ventilated space far away from any open flame, sparks, or incense.',
      'Ensure the petrol petcock / fuel tap is turned OFF before loosening fuel pipes.',
      'Disconnect negative battery terminal before removing spark plugs.'
    ],
    requiredTools: ['16mm Spark plug socket spanner', 'Screwdriver set', 'Wire brush / brass brush', 'Carb cleaner spray or clean petrol'],
    requiredParts: [
      {
        partId: 'part-re-spark',
        name: 'Bosch / NGK Spark Plug Pair (WR7DC4 / UR5)',
        estimatedPrice: 280,
        type: 'Genuine OEM',
        inStock: true
      },
      {
        partId: 'part-carb-kit',
        name: 'Carburettor Float Bowl Rubber Gasket & Needle Kit',
        estimatedPrice: 190,
        type: 'OEM Replacement',
        inStock: true
      }
    ],
    diyTutorial: [
      {
        stepNumber: 1,
        title: 'Fuel Tap Off & Drain Bowl',
        instruction: 'Turn the fuel petcock switch to OFF position. Place a small container under the carb and loosen the bottom drain screw to empty old stagnant fuel.',
        tip: 'Catching dirty fuel helps inspect for rust particles or water droplets.'
      },
      {
        stepNumber: 2,
        title: 'Remove and Inspect Spark Plugs',
        instruction: 'Pull the spark plug caps off. Use the RE 16mm socket spanner to turn anti-clockwise and extract both plugs. Inspect color.',
        tip: 'Dry black soot indicates rich mixture; wet black oil indicates valve guide wear.'
      },
      {
        stepNumber: 3,
        title: 'Clean or Replace Plugs & Set Gap',
        instruction: 'Scrub electrode using a brass wire brush. Check gap is 0.7 - 0.8 mm using a feeler gauge or nail edge. Screw in by hand first to avoid cross-threading.',
        tip: 'Tighten firmly with spanner 1/4 turn past finger-tight.'
      },
      {
        stepNumber: 4,
        title: 'Spray Carb Cleaner Through Air Intake',
        instruction: 'Loosen the intake rubber bellows. Spray carburetor cleaner into the venturi while kicking over the engine with ignition off to clear gum from the pilot jet.',
        tip: 'If overflow continues, the float needle requires a light tap on the float bowl with screwdriver handle.'
      },
      {
        stepNumber: 5,
        title: 'Start & Tune Idle Thumb Screw',
        instruction: 'Turn fuel tap back ON. Pull choke knob halfway, turn key on and thumb starter. Let it warm up for 2 minutes before easing choke back in.',
        tip: 'Adjust the brass idle thumb screw clockwise to stabilize 1050 RPM idle.'
      }
    ],
    reuseAlternative: {
      title: 'Bike Spark Plug Art',
      description: 'Turn fouled spark plugs into industrial keychains, desk paperweights, or steampunk miniature airplane sculptures.'
    }
  },
  {
    id: 'diag-laptop-05',
    productName: 'Dell Inspiron 15 / XPS 15',
    modelNumber: 'DELL-7590-4K',
    category: 'laptop_pc',
    detectedProblem: 'Severe thermal throttling due to desiccated thermal paste & clogged blower fins',
    confidenceScore: 96,
    repairabilityScore: 90,
    difficulty: 'Easy',
    estimatedCost: '₹350 - ₹550',
    estimatedTime: '35 minutes',
    partsAvailability: 'High',
    diyPossible: true,
    isHighRisk: false,
    summary: 'Laptop fan screams continuously at high pitch while CPU throttles down to 0.79 GHz. Temps reach 98°C even when idle.',
    whyFixItSuggested: 'Factory thermal paste hardens into chalk after 2-3 years. Repasting with high thermal conductivity paste (e.g. Arctic MX-4) drops temperatures by 20°C and restores full gaming/editing performance.',
    suggestedPath: 'diy',
    safetyWarnings: [
      'Unplug AC adapter and disconnect the internal battery cable immediately after opening backplate.',
      'Touch an unpainted metal surface to discharge static electricity before touching the motherboard.',
      'Do not use excessive force on small ribbon cables.'
    ],
    requiredTools: ['Torx T5 / Phillips #00 precision screwdriver', 'Plastic pry spudger', '99% Isopropyl alcohol (IPA)', 'Lint-free microfiber wipes'],
    requiredParts: [
      {
        partId: 'part-thermal-paste',
        name: 'Arctic MX-4 High Performance Thermal Compound (4g)',
        estimatedPrice: 380,
        type: 'Genuine OEM',
        inStock: true
      },
      {
        partId: 'part-dust-blower',
        name: 'Precision Compressed Air Can / Blower (300ml)',
        estimatedPrice: 240,
        type: 'Compatible',
        inStock: true
      }
    ],
    diyTutorial: [
      {
        stepNumber: 1,
        title: 'Remove Bottom Cover',
        instruction: 'Power off laptop completely. Remove the 10 perimeter screws on the bottom plate and gently release the edge clips using a plastic guitar pick or spudger.',
        tip: 'Group screws in the layout of the chassis as center screws may have different lengths.'
      },
      {
        stepNumber: 2,
        title: 'Disconnect Internal Battery',
        instruction: 'Locate the wide battery plug connected to the motherboard and slide it backwards gently. Press power button for 10 seconds to drain remaining capacitors.',
        tip: 'Crucial step to prevent accidental short circuits during repasting.'
      },
      {
        stepNumber: 3,
        title: 'Unscrew Heatsink & Fans',
        instruction: 'Loosen the numbered captive screws on the copper CPU/GPU heat pipe in reverse numerical order (4 -> 3 -> 2 -> 1). Gently lift the heatsink assembly.',
        tip: 'Do not bend the copper vapor pipes.'
      },
      {
        stepNumber: 4,
        title: 'Clean Old Crust & Dust Carpets',
        instruction: 'Moisten microfiber wipe with 99% IPA and dissolve the dried paste from CPU/GPU dies and heatsink copper plates until mirror shine. Blow dust out of the exhaust radiator fins.',
        tip: 'Hold the fan blades still with a finger while blowing air to prevent bearing overspin.'
      },
      {
        stepNumber: 5,
        title: 'Apply Fresh Compound & Reassemble',
        instruction: 'Apply a pea-sized dot of Arctic MX-4 onto the CPU die and a thin line on the GPU die. Reseat heatsink and tighten screws in 1 -> 2 -> 3 -> 4 sequence.',
        tip: 'Reconnect battery cable, snap backplate on, and enjoy whisper-quiet cooling!'
      }
    ],
    reuseAlternative: {
      title: 'Repurpose Old Laptop into Silent Home Server',
      description: 'Transform an aging laptop with broken screen into a low-power 24/7 Home Assistant or Plex Media Server tucked away on a shelf.'
    }
  }
];
