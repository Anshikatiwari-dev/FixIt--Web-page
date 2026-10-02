import { SAMPLE_DIAGNOSES } from '../data/mockDiagnoses';

// Simulated AI Diagnostic Engine
export const diagnosisService = {
  // Analyze problem with 2.5s realistic simulation delay
  analyzeProblem: async (problemData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { productName = '', category = '', problemDescription = '', details = {} } = problemData;
        const query = `${productName} ${category} ${problemDescription}`.toLowerCase();

        // Match against known templates or synthesize dynamic intelligent diagnosis
        let matched = SAMPLE_DIAGNOSES.find((d) => {
          if (query.includes('fan') || query.includes('ceiling')) return d.id === 'diag-fan-01';
          if (query.includes('chair') || query.includes('hydraulic') || query.includes('sink')) return d.id === 'diag-chair-02';
          if (query.includes('microwave') || query.includes('oven') || query.includes('plate')) return d.id === 'diag-microwave-03';
          if (query.includes('bike') || query.includes('enfield') || query.includes('bullet') || query.includes('spark')) return d.id === 'diag-bike-04';
          if (query.includes('laptop') || query.includes('computer') || query.includes('heat') || query.includes('fan screaming')) return d.id === 'diag-laptop-05';
          return false;
        });

        if (matched) {
          // Clone and enhance with user specifics
          const result = {
            ...matched,
            id: `diag-${Date.now()}`,
            userSubmittedImage: problemData.imagePreview || null,
            userVoiceNote: problemData.voiceTranscript || null,
            reportedDetails: details,
            analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          resolve(result);
          return;
        }

        // If generic product was entered, create an intelligent customized diagnosis
        const isHazardous = details.hasSmell || details.unusualSound === 'loud-sparks' || category === 'car' || category === 'appliances';
        const repairScore = isHazardous ? 68 : 84;
        const estCost = isHazardous ? '₹750 - ₹1,400' : '₹250 - ₹500';
        const difficulty = isHazardous ? 'Hard (Professional Recommended)' : 'Easy - Medium';

        const synthesized = {
          id: `diag-${Date.now()}`,
          productName: productName || 'Generic Electronic / Household Item',
          modelNumber: problemData.modelNumber || 'Standard Revision',
          category: category || 'electronics',
          detectedProblem: details.hasSmell
            ? 'Blown protection fuse or burnt capacitor on power input board'
            : 'Mechanical resistance or contact oxidation in primary switch mechanism',
          confidenceScore: 89,
          repairabilityScore: repairScore,
          difficulty: difficulty,
          estimatedCost: estCost,
          estimatedTime: '30 - 45 minutes',
          partsAvailability: 'High (Standard multi-brand components)',
          diyPossible: !isHazardous,
          isHighRisk: isHazardous,
          userSubmittedImage: problemData.imagePreview || null,
          userVoiceNote: problemData.voiceTranscript || null,
          summary: `FixIt AI scanned your description "${problemDescription.substring(0, 90)}...". The symptoms indicate an isolated failure of a modular subsystem rather than total unit destruction.`,
          whyFixItSuggested: 'Over 78% of reported failures in this product class are caused by a single worn consumable component (switch, fuse, or belt) rather than the main motor or chassis.',
          suggestedPath: isHazardous ? 'technician' : 'diy',
          safetyWarnings: isHazardous
            ? [
                'Electrical shock or thermal risk detected due to reported smell or sparking.',
                'Do not connect to mains electricity.',
                'Professional inspection by a verified technician strongly advised.'
              ]
            : [
                'Ensure power source is disconnected before opening casing.',
                'Keep small screws organized during disassembly.'
              ],
          requiredTools: ['Multi-bit precision screwdriver', 'Digital multimeter', 'Contact cleaner spray'],
          requiredParts: [
            {
              partId: 'part-generic-01',
              name: 'Modular Replacement Switch / Internal Fuse Kit',
              estimatedPrice: 220,
              type: 'Universal Compatible',
              inStock: true
            }
          ],
          diyTutorial: [
            {
              stepNumber: 1,
              title: 'Visual Inspection & Disassembly',
              instruction: 'Remove outer screws and open chassis carefully. Look for bulging capacitors, discoloration, or loose solder pins.',
              tip: 'Take photos at every disassembly stage.'
            },
            {
              stepNumber: 2,
              title: 'Component Continuity Testing',
              instruction: 'Use a digital multimeter in continuity mode to verify if the primary thermal fuse or power switch closes circuit.',
              tip: 'Zero ohms indicates healthy connection; open circuit indicates blown component.'
            },
            {
              stepNumber: 3,
              title: 'Component Replacement & Re-seating',
              instruction: 'Swap out the failed modular element with the verified compatible part and tighten fasteners to spec.',
              tip: 'Do not overtighten screws into plastic housings.'
            }
          ],
          reuseAlternative: {
            title: 'Repurpose Casing & Motor',
            description: 'If you choose not to repair, this unit can be dismantled for rare earth magnets, copper winding wire, or used as raw material for a school STEM project.'
          },
          analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        resolve(synthesized);
      }, 2600);
    });
  },

  getDiagnosisById: (id) => {
    return SAMPLE_DIAGNOSES.find((d) => d.id === id) || SAMPLE_DIAGNOSES[0];
  }
};
