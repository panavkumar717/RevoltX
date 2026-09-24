import { Battery, ServiceRequest, Technician, SecondLifeOpportunity, RecyclingRecord } from '../types';

export const INITIAL_BATTERIES: Battery[] = [
  {
    id: 'rx-892738',
    revoltXId: 'RX-2026-892738',
    serialNumber: 'BAT-892738',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-sarah',
    ownerName: 'Sarah Jenkins',
    fleetId: 'flt-ecotransit',
    fleetName: 'EcoTransit Metro Fleet #14',
    vehicleModel: 'EcoRider V3 Commercial Courier',
    chemistry: 'LFP',
    capacity: 60,
    packConfiguration: '16S2P Prismatic',
    nominalVoltage: 51.2,
    manufactureDate: '2023-04-12',
    initialSOH: 100,
    currentSOH: 72,
    soc: 84,
    rul: 384,
    cycleCount: 1420,
    temperature: 38.4,
    voltage: 51.2,
    current: 18.2,
    power: 931.8,
    rxScore: 78,
    risk: 'Moderate',
    anomaly: 'Accelerated thermal degradation detected',
    humanAnomalyExplanation: 'Your battery has been running warmer than expected during rapid charging. ReVoltX is monitoring this trend to ensure peak safety.',
    recommendation: 'Potentially suitable for stationary solar storage assessment.',
    decisionPathway: 'SECOND_LIFE',
    secondLifeApplication: 'Solar Energy Storage',
    lifecycleStage: 'HEALTH_MONITORING',
    status: 'Active',
    marketPrice: 2450,
    warrantyPeriod: '5 Years / 2,000 Cycles',
    lastUpdated: '2026-09-20T17:45:00Z',
    lifecycleEvents: [
      {
        id: 'evt-1',
        stage: 'MANUFACTURED',
        title: 'Cell Fabrication & Pack Assembly',
        description: 'Quality tested and calibrated at XYZ Battery Gigafactory Berlin.',
        timestamp: '2023-04-12T10:00:00Z',
        actor: 'XYZ Battery Corp QA System',
        location: 'Gigafactory Berlin, DE',
        certificateHash: '0x8f4d...391e'
      },
      {
        id: 'evt-2',
        stage: 'REGISTERED',
        title: 'ReVoltX Digital Battery Passport Minted',
        description: 'Immutable Digital Twin generated with secure cryptographic seal.',
        timestamp: '2023-04-15T14:22:00Z',
        actor: 'ReVoltX Registry Engine',
        certificateHash: '0xa37c...e091'
      },
      {
        id: 'evt-3',
        stage: 'FIRST_LIFE',
        title: 'Deployed to Urban Delivery EV',
        description: 'Installed in EcoRider V3 delivery vehicle serving Metro district.',
        timestamp: '2023-05-02T09:15:00Z',
        actor: 'EcoTransit Fleet Logistics',
        location: 'Munich Depot #4'
      },
      {
        id: 'evt-4',
        stage: 'HEALTH_MONITORING',
        title: 'Continuous IoT Fleet Telemetry Active',
        description: '1,420 operating cycles completed. Health trend indicates moderate thermal stress.',
        timestamp: '2026-09-18T16:30:00Z',
        actor: 'ReVoltX Telemetry Core'
      }
    ],
    serviceHistory: [
      {
        id: 'srv-101',
        date: '2024-11-10',
        type: 'Routine Annual Fleet Inspection',
        technician: 'Marcus Vance',
        findings: 'Cell balance nominal. Thermal contact paste inspected and certified.',
        recommendation: 'Continue regular operation.',
        actionTaken: 'BMS firmware updated to v2.4.1'
      },
      {
        id: 'srv-102',
        date: '2026-08-04',
        type: 'Rapid Thermal Dissipation Check',
        technician: 'Alex Rivera',
        findings: 'Minor hotspot on module 2 during 1.5C charging.',
        recommendation: 'Throttle charging curve in summer peak ambient periods.',
        actionTaken: 'Charge profile calibrated to 0.8C max rate.'
      }
    ],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 52.8, current: 12.1, temperature: 34.2, soc: 89, power: 638.8 },
      { timestamp: '14:15', voltage: 52.3, current: 15.4, temperature: 35.8, soc: 87, power: 805.4 },
      { timestamp: '14:30', voltage: 51.9, current: 19.8, temperature: 37.1, soc: 85, power: 1027.6 },
      { timestamp: '14:45', voltage: 51.5, current: 22.0, temperature: 38.6, soc: 83, power: 1133.0 },
      { timestamp: '15:00', voltage: 51.2, current: 18.2, temperature: 38.4, soc: 84, power: 931.8 }
    ]
  },
  {
    id: 'rx-104921',
    revoltXId: 'RX-2026-104921',
    serialNumber: 'BAT-104921',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-david',
    ownerName: 'Apex Logistics Corp',
    fleetId: 'flt-apex',
    fleetName: 'Apex Long-Haul Fleet',
    vehicleModel: 'Apex Hauler Heavy eTruck',
    chemistry: 'NMC',
    capacity: 120,
    packConfiguration: '24S4P Liquid Cooled',
    nominalVoltage: 88.8,
    manufactureDate: '2026-01-10',
    initialSOH: 100,
    currentSOH: 98,
    soc: 92,
    rul: 1850,
    cycleCount: 88,
    temperature: 24.1,
    voltage: 89.2,
    current: 4.5,
    power: 401.4,
    rxScore: 97,
    risk: 'Low',
    recommendation: 'Optimal operational parameters maintained.',
    lifecycleStage: 'FIRST_LIFE',
    status: 'Active',
    marketPrice: 8900,
    warrantyPeriod: '8 Years / 3,000 Cycles',
    lastUpdated: '2026-09-20T18:00:00Z',
    lifecycleEvents: [
      {
        id: 'evt-201',
        stage: 'MANUFACTURED',
        title: 'High-Density Cell Pack Fabricated',
        description: 'Zero micro-defects detected via ultrasound tomographic scan.',
        timestamp: '2026-01-10T08:00:00Z',
        actor: 'XYZ Battery Corp QA'
      },
      {
        id: 'evt-202',
        stage: 'REGISTERED',
        title: 'ReVoltX Digital Passport Created',
        description: 'Registered with full EU Battery Directive metadata.',
        timestamp: '2026-01-12T11:00:00Z',
        actor: 'ReVoltX Registry Engine'
      },
      {
        id: 'evt-203',
        stage: 'FIRST_LIFE',
        title: 'Commercial Hauling Commissioned',
        description: 'Active on interstate freight routes.',
        timestamp: '2026-02-01T09:00:00Z',
        actor: 'Apex Fleet Command'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 89.6, current: 8.2, temperature: 23.4, soc: 94, power: 734.7 },
      { timestamp: '14:30', voltage: 89.4, current: 6.1, temperature: 23.9, soc: 93, power: 545.3 },
      { timestamp: '15:00', voltage: 89.2, current: 4.5, temperature: 24.1, soc: 92, power: 401.4 }
    ]
  },
  {
    id: 'rx-449182',
    revoltXId: 'RX-2025-449182',
    serialNumber: 'BAT-449182',
    manufacturerId: 'mfg-voltmax',
    manufacturerName: 'VoltMax Systems',
    ownerId: 'usr-karl',
    ownerName: 'Karl Lindqvist',
    vehicleModel: 'Nordic Commuter E-Bike',
    chemistry: 'LFP',
    capacity: 25,
    packConfiguration: '13S1P Compact',
    nominalVoltage: 48.0,
    manufactureDate: '2024-06-15',
    initialSOH: 100,
    currentSOH: 91,
    soc: 76,
    rul: 1120,
    cycleCount: 340,
    temperature: 26.5,
    voltage: 48.4,
    current: 3.2,
    power: 154.8,
    rxScore: 92,
    risk: 'Low',
    recommendation: 'Healthy capacity retention. Safe for ongoing daily commuting.',
    lifecycleStage: 'FIRST_LIFE',
    status: 'Active',
    marketPrice: 650,
    warrantyPeriod: '3 Years / 1,000 Cycles',
    lastUpdated: '2026-09-20T15:20:00Z',
    lifecycleEvents: [
      {
        id: 'evt-301',
        stage: 'MANUFACTURED',
        title: 'Pack Assembly Complete',
        description: 'Pack certified for micro-mobility standard ISO 13063.',
        timestamp: '2024-06-15T09:00:00Z',
        actor: 'VoltMax Production'
      },
      {
        id: 'evt-302',
        stage: 'FIRST_LIFE',
        title: 'Purchased by Consumer',
        description: 'Registered via ReVoltX Owner mobile app.',
        timestamp: '2024-07-01T14:00:00Z',
        actor: 'ReVoltX Owner Onboarding'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 48.8, current: 5.1, temperature: 25.8, soc: 79, power: 248.8 },
      { timestamp: '15:00', voltage: 48.4, current: 3.2, temperature: 26.5, soc: 76, power: 154.8 }
    ]
  },
  {
    id: 'rx-772190',
    revoltXId: 'RX-2025-772190',
    serialNumber: 'BAT-772190',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-berlin-fleet',
    ownerName: 'Berlin Urban Delivery Co.',
    fleetId: 'flt-berlin',
    fleetName: 'Berlin Last-Mile Fleet',
    vehicleModel: 'VoltVan Commercial M4',
    chemistry: 'NMC',
    capacity: 75,
    packConfiguration: '20S3P Prismatic',
    nominalVoltage: 72.0,
    manufactureDate: '2022-09-10',
    initialSOH: 100,
    currentSOH: 68,
    soc: 45,
    rul: 210,
    cycleCount: 1820,
    temperature: 39.8,
    voltage: 71.1,
    current: 24.2,
    power: 1720.6,
    rxScore: 66,
    risk: 'High',
    anomaly: 'Internal resistance spike across Cell Group 4',
    humanAnomalyExplanation: 'Internal resistance has increased. Peak EV acceleration may be limited, but cells are structurally sound for stationary energy storage.',
    recommendation: 'EV decommission recommended. Potentially suitable for secondary-life stationary energy storage assessment.',
    decisionPathway: 'SECOND_LIFE',
    secondLifeApplication: 'Stationary Storage',
    lifecycleStage: 'ASSESSMENT',
    status: 'Under Assessment',
    marketPrice: 1800,
    warrantyPeriod: 'Expired',
    lastUpdated: '2026-09-20T16:10:00Z',
    lifecycleEvents: [
      {
        id: 'evt-401',
        stage: 'MANUFACTURED',
        title: 'Cell Manufacturing',
        description: 'Original NMC Chemistry cells certified.',
        timestamp: '2022-09-10T10:00:00Z',
        actor: 'XYZ Battery Corp.'
      },
      {
        id: 'evt-402',
        stage: 'FIRST_LIFE',
        title: 'EV Delivery Service',
        description: '1,820 cycles logged in heavy traffic stop-and-go duty.',
        timestamp: '2022-10-01T08:00:00Z',
        actor: 'Berlin Delivery Fleet'
      },
      {
        id: 'evt-403',
        stage: 'ASSESSMENT',
        title: 'Smart Battery Dock Deep Diagnostic Test',
        description: 'Diagnostic conducted at ReVoltX Field Facility. SOH measured at 68%.',
        timestamp: '2026-09-19T11:00:00Z',
        actor: 'Technician Elena Rostova'
      }
    ],
    serviceHistory: [
      {
        id: 'srv-201',
        date: '2026-09-19',
        type: 'ReVoltX Smart Dock Deep Assessment',
        technician: 'Elena Rostova',
        findings: 'Safe for stationary cycling under 0.5C charge rate. SOH 68%.',
        recommendation: 'Transfer to Circularity Second-Life marketplace.',
        actionTaken: 'Pack de-rated for stationary microgrid duty.'
      }
    ],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 72.0, current: 28.1, temperature: 41.2, soc: 50, power: 2023.2 },
      { timestamp: '15:00', voltage: 71.1, current: 24.2, temperature: 39.8, soc: 45, power: 1720.6 }
    ]
  },
  {
    id: 'rx-382910',
    revoltXId: 'RX-2024-382910',
    serialNumber: 'BAT-382910',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-solarpower',
    ownerName: 'Helios Community Solar Ltd',
    vehicleModel: 'Ground Mount Solar Microgrid #8',
    chemistry: 'LFP',
    capacity: 80,
    packConfiguration: '16S4P Industrial',
    nominalVoltage: 51.2,
    manufactureDate: '2021-02-18',
    initialSOH: 100,
    currentSOH: 64,
    soc: 62,
    rul: 740,
    cycleCount: 2240,
    temperature: 22.4,
    voltage: 51.0,
    current: 8.4,
    power: 428.4,
    rxScore: 74,
    risk: 'Low',
    recommendation: 'Performing steadily in stationary low-C solar buffer application.',
    decisionPathway: 'CONTINUE_USE',
    secondLifeApplication: 'Solar Energy Storage',
    lifecycleStage: 'SECOND_LIFE',
    status: 'Active',
    marketPrice: 1200,
    warrantyPeriod: 'Second-Life 2-Year Limited',
    lastUpdated: '2026-09-20T12:00:00Z',
    lifecycleEvents: [
      {
        id: 'evt-501',
        stage: 'FIRST_LIFE',
        title: 'Original EV First-Life Deployment',
        description: 'Retired at 73% SOH after 4 years of suburban bus duty.',
        timestamp: '2021-03-01T08:00:00Z',
        actor: 'Municipal Transit'
      },
      {
        id: 'evt-502',
        stage: 'ASSESSMENT',
        title: 'ReVoltX Second-Life Qualification',
        description: 'Certified for stationary low-stress diurnal solar storage.',
        timestamp: '2025-04-10T14:00:00Z',
        actor: 'ReVoltX Decision Engine'
      },
      {
        id: 'evt-503',
        stage: 'SECOND_LIFE',
        title: 'Commissioned at Helios Solar Farm',
        description: 'Now buffering 45 kW rooftop photovoltaic array.',
        timestamp: '2025-05-02T10:00:00Z',
        actor: 'Helios Community Solar Ltd'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 51.4, current: 12.0, temperature: 21.8, soc: 65, power: 616.8 },
      { timestamp: '15:00', voltage: 51.0, current: 8.4, temperature: 22.4, soc: 62, power: 428.4 }
    ]
  },
  {
    id: 'rx-119283',
    revoltXId: 'RX-2023-119283',
    serialNumber: 'BAT-119283',
    manufacturerId: 'mfg-catl',
    manufacturerName: 'Global Cell Tech',
    ownerId: 'usr-circ-partner',
    ownerName: 'GreenLithium Recycling AG',
    chemistry: 'NMC',
    capacity: 55,
    packConfiguration: '14S2P Pouch Pack',
    nominalVoltage: 51.8,
    manufactureDate: '2019-11-20',
    initialSOH: 100,
    currentSOH: 41,
    soc: 12,
    rul: 20,
    cycleCount: 3100,
    temperature: 21.0,
    voltage: 44.2,
    current: 0.0,
    power: 0.0,
    rxScore: 32,
    risk: 'Critical',
    anomaly: 'Severe dendrite growth risk and degraded separator integrity',
    recommendation: 'End of functional life. Safe hydrometallurgical recycling initiated.',
    decisionPathway: 'RECYCLE',
    lifecycleStage: 'RECYCLING',
    status: 'Recycled',
    marketPrice: 310,
    warrantyPeriod: 'End of Life',
    lastUpdated: '2026-09-20T09:30:00Z',
    lifecycleEvents: [
      {
        id: 'evt-601',
        stage: 'FIRST_LIFE',
        title: 'Original Electric Moped Service',
        description: 'Operated through 6 harsh winter seasons.',
        timestamp: '2019-12-01T08:00:00Z',
        actor: 'Rider Sharing Inc'
      },
      {
        id: 'evt-602',
        stage: 'ASSESSMENT',
        title: 'Decommissioning Verification',
        description: 'SOH measured at 41%. Low internal safety margin.',
        timestamp: '2026-08-14T10:00:00Z',
        actor: 'ReVoltX Smart Dock'
      },
      {
        id: 'evt-603',
        stage: 'RECYCLING',
        title: 'Dispatched to GreenLithium Hydromet Facility',
        description: 'De-energized and prepared for black mass extraction.',
        timestamp: '2026-09-12T14:00:00Z',
        actor: 'GreenLithium Logistics'
      }
    ],
    serviceHistory: [],
    recentTelemetry: []
  }
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'SR-89201',
    batteryId: 'RX-2026-892738',
    customerName: 'Sarah Jenkins',
    phone: '+1 (555) 392-8819',
    address: '742 Evergreen Terrace, Sector 4, Silicon District',
    issue: 'Rapid charge rate dropped by 28% and dashboard reported temperature warning.',
    requestedDate: '2026-09-19T09:30:00Z',
    scheduledDate: '2026-09-22T10:00:00Z',
    technicianId: 'tech-01',
    technicianName: 'Alex Rivera',
    status: 'Technician Assigned',
    notes: 'Smart Battery Dock v2 test kit assigned. Priority dispatch.'
  },
  {
    id: 'SR-77104',
    batteryId: 'RX-2025-772190',
    customerName: 'Berlin Urban Delivery Co.',
    phone: '+49 30 928371',
    address: 'Depot 14, Alexanderplatz Logistics Hub, Berlin',
    issue: 'Vehicle range decreased to 65% of original baseline. Decommission evaluation requested.',
    requestedDate: '2026-09-18T14:15:00Z',
    scheduledDate: '2026-09-19T11:00:00Z',
    technicianId: 'tech-03',
    technicianName: 'Elena Rostova',
    status: 'Assessment Complete',
    notes: 'Assessment confirmed SOH 68%. Candidate for secondary stationary storage.'
  },
  {
    id: 'SR-90312',
    batteryId: 'RX-2026-104921',
    customerName: 'Apex Logistics Corp',
    phone: '+1 (800) 555-0199',
    address: 'Terminal 3, Gateway Intermodal Center',
    issue: 'Routine 90-day certification check.',
    requestedDate: '2026-09-20T11:00:00Z',
    status: 'Requested',
    notes: 'Routine commercial fleet verification.'
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-01',
    name: 'Alex Rivera',
    specialty: 'EV Pack Diagnostics & Hardware Dock Ops',
    phone: '+1 (555) 839-2011',
    activeTasks: 2,
    completedAssessments: 148,
    status: 'On Field',
    currentLocation: 'Silicon District North'
  },
  {
    id: 'tech-02',
    name: 'Marcus Vance',
    specialty: 'High-Voltage Safety & Stationary Re-purposing',
    phone: '+1 (555) 441-9920',
    activeTasks: 1,
    completedAssessments: 214,
    status: 'Available',
    currentLocation: 'ReVoltX Central Lab'
  },
  {
    id: 'tech-03',
    name: 'Elena Rostova',
    specialty: 'Cell Ultrasound & Electrochemical Impedance (EIS)',
    phone: '+49 171 902812',
    activeTasks: 1,
    completedAssessments: 189,
    status: 'On Field',
    currentLocation: 'Berlin Hub'
  }
];

export const INITIAL_SECOND_LIFE_OPPORTUNITIES: SecondLifeOpportunity[] = [
  {
    id: 'opp-01',
    batteryId: 'RX-2026-892738',
    title: 'Commercial Solar Microgrid Storage Module',
    targetApplication: 'Solar Energy Storage',
    capacityKWh: 3.07,
    soh: 72,
    rulCycles: 384,
    rxScore: 78,
    compatibilityRating: 94,
    status: 'Available',
    estimatedUsefulYears: 3.5,
    economicValueUsd: 1450
  },
  {
    id: 'opp-02',
    batteryId: 'RX-2025-772190',
    title: 'Telecom Tower Auxiliary Backup Bank',
    targetApplication: 'Telecom Backup',
    capacityKWh: 5.4,
    soh: 68,
    rulCycles: 210,
    rxScore: 66,
    compatibilityRating: 88,
    status: 'Available',
    estimatedUsefulYears: 2.8,
    economicValueUsd: 1800
  },
  {
    id: 'opp-03',
    batteryId: 'RX-2024-382910',
    title: 'Rural Microgrid Diurnal Buffer Unit',
    targetApplication: 'Microgrid',
    capacityKWh: 4.1,
    soh: 64,
    rulCycles: 740,
    rxScore: 74,
    compatibilityRating: 91,
    status: 'Allocated',
    allocatedPartner: 'Helios Community Solar Ltd',
    estimatedUsefulYears: 4.2,
    economicValueUsd: 1200
  }
];

export const INITIAL_RECYCLING_RECORDS: RecyclingRecord[] = [
  {
    id: 'rec-01',
    batteryId: 'RX-2023-119283',
    recyclerName: 'GreenLithium Closed-Loop Materials AG',
    receivedDate: '2026-09-12',
    processedDate: '2026-09-18',
    status: 'Materials Recovered',
    lithiumRecoveryKg: 1.84,
    nickelRecoveryKg: 8.62,
    cobaltRecoveryKg: 2.15,
    copperRecoveryKg: 5.40,
    aluminumRecoveryKg: 9.10,
    recoveryEfficiencyPct: 96.4,
    notes: 'Black mass purified via low-acid hydrometallurgical loop. Critical minerals re-certified for cathode precursor manufacturing.'
  }
];
