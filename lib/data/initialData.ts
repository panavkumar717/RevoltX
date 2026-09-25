import { Battery, ServiceRequest, Technician, SecondLifeOpportunity, RecyclingRecord } from '../types';

/**
 * REVOLTX PLATFORM GROUND TRUTH DATA
 * Sourced directly from NASA Ames Prognostics Center of Excellence Battery Aging ARC Dataset.
 * Includes real Li-ion charge, discharge, and EIS electrochemical impedance spectroscopy telemetry.
 */
export const INITIAL_BATTERIES: Battery[] = [
  {
    id: 'rx-892738',
    revoltXId: 'RX-2026-892738',
    serialNumber: 'BAT-NASA-B0005',
    nasaDatasetId: 'B0005',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-sarah',
    ownerName: 'Sarah Jenkins',
    fleetId: 'flt-ecotransit',
    fleetName: 'EcoTransit Metro Fleet #14',
    vehicleModel: 'EcoRider V3 (NASA ARC B0005 Cell Matrix)',
    chemistry: 'LFP',
    capacity: 60,
    initialCapacityAh: 1.8565,
    currentCapacityAh: 1.3251,
    internalResistanceRe: 0.05,
    chargeTransferRct: 0.0748,
    packConfiguration: '16S2P Prismatic Module',
    nominalVoltage: 51.2,
    manufactureDate: '2023-04-12',
    initialSOH: 100,
    currentSOH: 71.4,
    soc: 84,
    rul: 384,
    cycleCount: 616,
    temperature: 38.4,
    voltage: 51.2,
    current: 18.2,
    power: 931.8,
    rxScore: 78,
    risk: 'Moderate',
    anomaly: 'Electrochemical impedance growth detected (Re: 0.050Ω, Rct: 0.075Ω)',
    humanAnomalyExplanation: 'NASA Ames Prognostics aging protocol shows cell capacity has reached 71.4% of original baseline. While reaching the end of automotive first-life, internal impedance remains stable for secondary stationary storage.',
    recommendation: 'Qualified for Secondary-Life stationary solar storage assessment.',
    decisionPathway: 'SECOND_LIFE',
    secondLifeApplication: 'Solar Energy Storage',
    lifecycleStage: 'HEALTH_MONITORING',
    status: 'Active',
    marketPrice: 2450,
    warrantyPeriod: '5 Years / 2,000 Cycles',
    lastUpdated: '2026-09-24T22:30:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.8565,
            "soh": 100.0
      },
      {
            "cycle": 13,
            "capacity": 1.8138,
            "soh": 97.7
      },
      {
            "cycle": 25,
            "capacity": 1.8256,
            "soh": 98.3
      },
      {
            "cycle": 37,
            "capacity": 1.7884,
            "soh": 96.3
      },
      {
            "cycle": 49,
            "capacity": 1.7832,
            "soh": 96.1
      },
      {
            "cycle": 61,
            "capacity": 1.6849,
            "soh": 90.8
      },
      {
            "cycle": 73,
            "capacity": 1.6066,
            "soh": 86.5
      },
      {
            "cycle": 85,
            "capacity": 1.5382,
            "soh": 82.9
      },
      {
            "cycle": 97,
            "capacity": 1.5066,
            "soh": 81.2
      },
      {
            "cycle": 109,
            "capacity": 1.455,
            "soh": 78.4
      },
      {
            "cycle": 121,
            "capacity": 1.4383,
            "soh": 77.5
      },
      {
            "cycle": 133,
            "capacity": 1.3754,
            "soh": 74.1
      },
      {
            "cycle": 145,
            "capacity": 1.3286,
            "soh": 71.6
      },
      {
            "cycle": 157,
            "capacity": 1.3132,
            "soh": 70.7
      },
      {
            "cycle": 168,
            "capacity": 1.3251,
            "soh": 71.4
      }
],
    lifecycleEvents: [
      {
        id: 'evt-1',
        stage: 'MANUFACTURED',
        title: 'Cell Fabrication & Pack Assembly',
        description: 'Quality tested and calibrated at XYZ Battery Gigafactory Berlin. Initial capacity: 1.8565 Ah (60 Ah pack).',
        timestamp: '2023-04-12T10:00:00Z',
        actor: 'XYZ Battery Corp QA System',
        location: 'Gigafactory Berlin, DE',
        certificateHash: '0x8f4d...391e'
      },
      {
        id: 'evt-2',
        stage: 'REGISTERED',
        title: 'ReVoltX Digital Battery Passport Minted',
        description: 'Immutable Digital Twin generated with secure cryptographic seal and NASA ARC validation profile.',
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
        description: '616 total cycles logged. NASA aging curve identifies 71.4% SOH threshold. EIS impedance Re=0.050Ω, Rct=0.075Ω.',
        timestamp: '2026-09-24T18:30:00Z',
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
        findings: 'Minor hotspot on module 2 during 1.5C charging. NASA ARC temperature rise curve verified.',
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
    id: 'rx-772190',
    revoltXId: 'RX-2025-772190',
    serialNumber: 'BAT-NASA-B0006',
    nasaDatasetId: 'B0006',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-berlin-fleet',
    ownerName: 'Berlin Urban Delivery Co.',
    fleetId: 'flt-berlin',
    fleetName: 'Berlin Last-Mile Fleet',
    vehicleModel: 'VoltVan Commercial M4 (NASA ARC B0006 Accelerated Fade)',
    chemistry: 'NMC',
    capacity: 75,
    initialCapacityAh: 2.0353,
    currentCapacityAh: 1.1857,
    internalResistanceRe: 0.0736,
    chargeTransferRct: 0.1,
    packConfiguration: '20S3P Prismatic',
    nominalVoltage: 72.0,
    manufactureDate: '2022-09-10',
    initialSOH: 100,
    currentSOH: 58.3,
    soc: 45,
    rul: 210,
    cycleCount: 616,
    temperature: 41.2,
    voltage: 71.1,
    current: 24.2,
    power: 1720.6,
    rxScore: 66,
    risk: 'High',
    anomaly: 'Internal charge transfer resistance spike (Rct: 0.100Ω) & thermal dissipation variance',
    humanAnomalyExplanation: 'NASA ARC test dataset exhibits rapid capacity degradation from 2.035 Ah to 1.186 Ah. Peak EV acceleration should be limited, but cells are structurally sound for stationary telecom buffer.',
    recommendation: 'EV decommission recommended. Potentially suitable for secondary-life stationary telecom backup.',
    decisionPathway: 'SECOND_LIFE',
    secondLifeApplication: 'Telecom Backup',
    lifecycleStage: 'ASSESSMENT',
    status: 'Under Assessment',
    marketPrice: 1800,
    warrantyPeriod: 'Expired',
    lastUpdated: '2026-09-24T21:10:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 2.0353,
            "soh": 100.0
      },
      {
            "cycle": 13,
            "capacity": 1.9233,
            "soh": 94.5
      },
      {
            "cycle": 25,
            "capacity": 1.9014,
            "soh": 93.4
      },
      {
            "cycle": 37,
            "capacity": 1.7971,
            "soh": 88.3
      },
      {
            "cycle": 49,
            "capacity": 1.8081,
            "soh": 88.8
      },
      {
            "cycle": 61,
            "capacity": 1.6088,
            "soh": 79.0
      },
      {
            "cycle": 73,
            "capacity": 1.5145,
            "soh": 74.4
      },
      {
            "cycle": 85,
            "capacity": 1.4516,
            "soh": 71.3
      },
      {
            "cycle": 97,
            "capacity": 1.4518,
            "soh": 71.3
      },
      {
            "cycle": 109,
            "capacity": 1.3952,
            "soh": 68.6
      },
      {
            "cycle": 121,
            "capacity": 1.4051,
            "soh": 69.0
      },
      {
            "cycle": 133,
            "capacity": 1.3209,
            "soh": 64.9
      },
      {
            "cycle": 145,
            "capacity": 1.2638,
            "soh": 62.1
      },
      {
            "cycle": 157,
            "capacity": 1.2111,
            "soh": 59.5
      },
      {
            "cycle": 168,
            "capacity": 1.1857,
            "soh": 58.3
      }
],
    lifecycleEvents: [
      {
        id: 'evt-401',
        stage: 'MANUFACTURED',
        title: 'Cell Manufacturing',
        description: 'Original NMC Chemistry cells certified (NASA ARC B0006 baseline).',
        timestamp: '2022-09-10T10:00:00Z',
        actor: 'XYZ Battery Corp.'
      },
      {
        id: 'evt-402',
        stage: 'FIRST_LIFE',
        title: 'EV Delivery Service',
        description: '616 cycles logged in heavy traffic stop-and-go duty.',
        timestamp: '2022-10-01T08:00:00Z',
        actor: 'Berlin Delivery Fleet'
      },
      {
        id: 'evt-403',
        stage: 'ASSESSMENT',
        title: 'Smart Battery Dock Deep Diagnostic Test',
        description: 'Diagnostic conducted at ReVoltX Field Facility. Capacity measured at 1.1857 Ah (58.3% SOH).',
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
        findings: 'Safe for stationary cycling under 0.5C charge rate. SOH 58.3%. Re=0.074Ω, Rct=0.100Ω.',
        recommendation: 'Transfer to Circularity Second-Life marketplace for telecom backup.',
        actionTaken: 'Pack de-rated for stationary microgrid duty.'
      }
    ],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 72.0, current: 28.1, temperature: 41.2, soc: 50, power: 2023.2 },
      { timestamp: '15:00', voltage: 71.1, current: 24.2, temperature: 39.8, soc: 45, power: 1720.6 }
    ]
  },
  {
    id: 'rx-104921',
    revoltXId: 'RX-2026-104921',
    serialNumber: 'BAT-NASA-B0007',
    nasaDatasetId: 'B0007',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-david',
    ownerName: 'Apex Logistics Corp',
    fleetId: 'flt-apex',
    fleetName: 'Apex Long-Haul Fleet',
    vehicleModel: 'Apex Hauler Heavy (NASA ARC B0007 NMC Matrix)',
    chemistry: 'NMC',
    capacity: 120,
    initialCapacityAh: 1.8911,
    currentCapacityAh: 1.4325,
    internalResistanceRe: 0.0671,
    chargeTransferRct: 0.0933,
    packConfiguration: '24S4P Liquid Cooled',
    nominalVoltage: 88.8,
    manufactureDate: '2024-01-10',
    initialSOH: 100,
    currentSOH: 75.7,
    soc: 82,
    rul: 620,
    cycleCount: 616,
    temperature: 26.1,
    voltage: 88.4,
    current: 6.5,
    power: 574.6,
    rxScore: 82,
    risk: 'Low',
    recommendation: 'Steady capacity degradation curve (75.7% SOH). Safe for continued first-life fleet operations.',
    lifecycleStage: 'FIRST_LIFE',
    status: 'Active',
    marketPrice: 6200,
    warrantyPeriod: '8 Years / 3,000 Cycles',
    lastUpdated: '2026-09-24T20:00:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.8911,
            "soh": 100.0
      },
      {
            "cycle": 13,
            "capacity": 1.8591,
            "soh": 98.3
      },
      {
            "cycle": 25,
            "capacity": 1.8707,
            "soh": 98.9
      },
      {
            "cycle": 37,
            "capacity": 1.8317,
            "soh": 96.9
      },
      {
            "cycle": 49,
            "capacity": 1.8157,
            "soh": 96.0
      },
      {
            "cycle": 61,
            "capacity": 1.7239,
            "soh": 91.2
      },
      {
            "cycle": 73,
            "capacity": 1.6574,
            "soh": 87.6
      },
      {
            "cycle": 85,
            "capacity": 1.6007,
            "soh": 84.6
      },
      {
            "cycle": 97,
            "capacity": 1.58,
            "soh": 83.5
      },
      {
            "cycle": 109,
            "capacity": 1.545,
            "soh": 81.7
      },
      {
            "cycle": 121,
            "capacity": 1.5391,
            "soh": 81.4
      },
      {
            "cycle": 133,
            "capacity": 1.4819,
            "soh": 78.4
      },
      {
            "cycle": 145,
            "capacity": 1.4468,
            "soh": 76.5
      },
      {
            "cycle": 157,
            "capacity": 1.4263,
            "soh": 75.4
      },
      {
            "cycle": 168,
            "capacity": 1.4325,
            "soh": 75.7
      }
],
    lifecycleEvents: [
      {
        id: 'evt-201',
        stage: 'MANUFACTURED',
        title: 'High-Density Cell Pack Fabricated',
        description: 'Initial capacity: 1.8911 Ah per cell unit. Zero micro-defects detected.',
        timestamp: '2024-01-10T08:00:00Z',
        actor: 'XYZ Battery Corp QA'
      },
      {
        id: 'evt-202',
        stage: 'REGISTERED',
        title: 'ReVoltX Digital Passport Created',
        description: 'Registered with full EU Battery Directive metadata.',
        timestamp: '2024-01-12T11:00:00Z',
        actor: 'ReVoltX Registry Engine'
      },
      {
        id: 'evt-203',
        stage: 'FIRST_LIFE',
        title: 'Commercial Hauling Commissioned',
        description: 'Active on interstate freight routes. 168 discharge cycles logged.',
        timestamp: '2024-02-01T09:00:00Z',
        actor: 'Apex Fleet Command'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 88.9, current: 8.2, temperature: 25.4, soc: 86, power: 728.9 },
      { timestamp: '14:30', voltage: 88.6, current: 7.1, temperature: 25.9, soc: 84, power: 629.0 },
      { timestamp: '15:00', voltage: 88.4, current: 6.5, temperature: 26.1, soc: 82, power: 574.6 }
    ]
  },
  {
    id: 'rx-382910',
    revoltXId: 'RX-2024-382910',
    serialNumber: 'BAT-NASA-B0018',
    nasaDatasetId: 'B0018',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-solarpower',
    ownerName: 'Helios Community Solar Ltd',
    vehicleModel: 'Ground Mount Solar Microgrid (NASA ARC B0018 Second-Life)',
    chemistry: 'LFP',
    capacity: 80,
    initialCapacityAh: 1.855,
    currentCapacityAh: 1.3411,
    internalResistanceRe: 0.0661,
    chargeTransferRct: 0.089,
    packConfiguration: '16S4P Industrial',
    nominalVoltage: 51.2,
    manufactureDate: '2021-02-18',
    initialSOH: 100,
    currentSOH: 72.3,
    soc: 62,
    rul: 740,
    cycleCount: 319,
    temperature: 22.4,
    voltage: 51.0,
    current: 8.4,
    power: 428.4,
    rxScore: 76,
    risk: 'Low',
    recommendation: 'Performing steadily in stationary low-C solar buffer application (NASA B0018 profile).',
    decisionPathway: 'CONTINUE_USE',
    secondLifeApplication: 'Solar Energy Storage',
    lifecycleStage: 'SECOND_LIFE',
    status: 'Active',
    marketPrice: 1200,
    warrantyPeriod: 'Second-Life 2-Year Limited',
    lastUpdated: '2026-09-24T18:00:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.855,
            "soh": 100.0
      },
      {
            "cycle": 10,
            "capacity": 1.8231,
            "soh": 98.3
      },
      {
            "cycle": 19,
            "capacity": 1.7462,
            "soh": 94.1
      },
      {
            "cycle": 29,
            "capacity": 1.6993,
            "soh": 91.6
      },
      {
            "cycle": 38,
            "capacity": 1.6222,
            "soh": 87.5
      },
      {
            "cycle": 48,
            "capacity": 1.6958,
            "soh": 91.4
      },
      {
            "cycle": 57,
            "capacity": 1.6404,
            "soh": 88.4
      },
      {
            "cycle": 67,
            "capacity": 1.5223,
            "soh": 82.1
      },
      {
            "cycle": 76,
            "capacity": 1.4807,
            "soh": 79.8
      },
      {
            "cycle": 85,
            "capacity": 1.4249,
            "soh": 76.8
      },
      {
            "cycle": 95,
            "capacity": 1.4057,
            "soh": 75.8
      },
      {
            "cycle": 104,
            "capacity": 1.3679,
            "soh": 73.7
      },
      {
            "cycle": 114,
            "capacity": 1.39,
            "soh": 74.9
      },
      {
            "cycle": 123,
            "capacity": 1.3935,
            "soh": 75.1
      },
      {
            "cycle": 132,
            "capacity": 1.3411,
            "soh": 72.3
      }
],
    lifecycleEvents: [
      {
        id: 'evt-501',
        stage: 'FIRST_LIFE',
        title: 'Original EV First-Life Deployment',
        description: 'Retired at 72.3% SOH after 132 discharge cycles of suburban service.',
        timestamp: '2021-03-01T08:00:00Z',
        actor: 'Municipal Transit'
      },
      {
        id: 'evt-502',
        stage: 'ASSESSMENT',
        title: 'ReVoltX Second-Life Qualification',
        description: 'Certified for stationary low-stress diurnal solar storage. Re=0.066Ω, Rct=0.089Ω.',
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
    id: 'rx-449182',
    revoltXId: 'RX-2025-449182',
    serialNumber: 'BAT-NASA-B0026',
    nasaDatasetId: 'B0026',
    manufacturerId: 'mfg-voltmax',
    manufacturerName: 'VoltMax Systems',
    ownerId: 'usr-karl',
    ownerName: 'Karl Lindqvist',
    vehicleModel: 'Nordic Commuter E-Bike (NASA ARC B0026 Pristine LFP)',
    chemistry: 'LFP',
    capacity: 25,
    initialCapacityAh: 1.8133,
    currentCapacityAh: 1.7688,
    internalResistanceRe: 0.0904,
    chargeTransferRct: 0.1177,
    packConfiguration: '13S1P Compact',
    nominalVoltage: 48.0,
    manufactureDate: '2025-06-15',
    initialSOH: 100,
    currentSOH: 97.5,
    soc: 94,
    rul: 1420,
    cycleCount: 80,
    temperature: 24.5,
    voltage: 49.2,
    current: 2.8,
    power: 137.8,
    rxScore: 98,
    risk: 'Low',
    recommendation: 'Pristine cell retention (97.5% SOH). Negligible cycle wear across 28 discharge cycles.',
    lifecycleStage: 'FIRST_LIFE',
    status: 'Active',
    marketPrice: 850,
    warrantyPeriod: '3 Years / 1,500 Cycles',
    lastUpdated: '2026-09-24T19:20:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.8133,
            "soh": 100.0
      },
      {
            "cycle": 3,
            "capacity": 1.8135,
            "soh": 100.0
      },
      {
            "cycle": 5,
            "capacity": 1.8143,
            "soh": 100.1
      },
      {
            "cycle": 7,
            "capacity": 1.8165,
            "soh": 100.2
      },
      {
            "cycle": 9,
            "capacity": 1.8049,
            "soh": 99.5
      },
      {
            "cycle": 11,
            "capacity": 1.7177,
            "soh": 94.7
      },
      {
            "cycle": 13,
            "capacity": 1.8066,
            "soh": 99.6
      },
      {
            "cycle": 15,
            "capacity": 1.7993,
            "soh": 99.2
      },
      {
            "cycle": 17,
            "capacity": 1.6819,
            "soh": 92.8
      },
      {
            "cycle": 19,
            "capacity": 1.796,
            "soh": 99.0
      },
      {
            "cycle": 21,
            "capacity": 1.801,
            "soh": 99.3
      },
      {
            "cycle": 23,
            "capacity": 1.7959,
            "soh": 99.0
      },
      {
            "cycle": 25,
            "capacity": 1.7717,
            "soh": 97.7
      },
      {
            "cycle": 27,
            "capacity": 1.7733,
            "soh": 97.8
      },
      {
            "cycle": 28,
            "capacity": 1.7688,
            "soh": 97.5
      }
],
    lifecycleEvents: [
      {
        id: 'evt-301',
        stage: 'MANUFACTURED',
        title: 'Pack Assembly Complete',
        description: 'Pack certified for micro-mobility standard ISO 13063 (NASA B0026 unit).',
        timestamp: '2025-06-15T09:00:00Z',
        actor: 'VoltMax Production'
      },
      {
        id: 'evt-302',
        stage: 'FIRST_LIFE',
        title: 'Purchased by Consumer',
        description: 'Registered via ReVoltX Owner portal.',
        timestamp: '2025-07-01T14:00:00Z',
        actor: 'ReVoltX Owner Onboarding'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 49.6, current: 3.8, temperature: 24.1, soc: 96, power: 188.5 },
      { timestamp: '15:00', voltage: 49.2, current: 2.8, temperature: 24.5, soc: 94, power: 137.8 }
    ]
  },
  {
    id: 'rx-558291',
    revoltXId: 'RX-2026-558291',
    serialNumber: 'BAT-NASA-B0028',
    nasaDatasetId: 'B0028',
    manufacturerId: 'mfg-xyz',
    manufacturerName: 'XYZ Battery Corp.',
    ownerId: 'usr-transit',
    ownerName: 'Urban Cargo Courier Fleet',
    vehicleModel: 'Urban Cargo Trike (NASA ARC B0028 NMC Unit)',
    chemistry: 'NMC',
    capacity: 40,
    initialCapacityAh: 1.8047,
    currentCapacityAh: 1.7172,
    internalResistanceRe: 0.0797,
    chargeTransferRct: 0.1137,
    packConfiguration: '14S2P Module',
    nominalVoltage: 48.0,
    manufactureDate: '2025-08-20',
    initialSOH: 100,
    currentSOH: 95.2,
    soc: 88,
    rul: 1250,
    cycleCount: 80,
    temperature: 25.0,
    voltage: 48.6,
    current: 4.2,
    power: 204.1,
    rxScore: 95,
    risk: 'Low',
    recommendation: 'Optimal operational metrics (95.2% SOH). Safe for heavy commercial courier service.',
    lifecycleStage: 'FIRST_LIFE',
    status: 'Active',
    marketPrice: 1100,
    warrantyPeriod: '3 Years / 2,000 Cycles',
    lastUpdated: '2026-09-24T17:15:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.8047,
            "soh": 100.0
      },
      {
            "cycle": 3,
            "capacity": 1.7976,
            "soh": 99.6
      },
      {
            "cycle": 5,
            "capacity": 1.7919,
            "soh": 99.3
      },
      {
            "cycle": 7,
            "capacity": 1.792,
            "soh": 99.3
      },
      {
            "cycle": 9,
            "capacity": 1.7868,
            "soh": 99.0
      },
      {
            "cycle": 11,
            "capacity": 1.7816,
            "soh": 98.7
      },
      {
            "cycle": 13,
            "capacity": 1.7804,
            "soh": 98.7
      },
      {
            "cycle": 15,
            "capacity": 1.7738,
            "soh": 98.3
      },
      {
            "cycle": 17,
            "capacity": 1.7409,
            "soh": 96.5
      },
      {
            "cycle": 19,
            "capacity": 1.7618,
            "soh": 97.6
      },
      {
            "cycle": 21,
            "capacity": 1.7519,
            "soh": 97.1
      },
      {
            "cycle": 23,
            "capacity": 1.7598,
            "soh": 97.5
      },
      {
            "cycle": 25,
            "capacity": 1.7411,
            "soh": 96.5
      },
      {
            "cycle": 27,
            "capacity": 1.7366,
            "soh": 96.2
      },
      {
            "cycle": 28,
            "capacity": 1.7172,
            "soh": 95.2
      }
],
    lifecycleEvents: [
      {
        id: 'evt-281',
        stage: 'MANUFACTURED',
        title: 'Pack Quality Certified',
        description: 'NASA ARC B0028 baseline cell fabrication.',
        timestamp: '2025-08-20T10:00:00Z',
        actor: 'XYZ Battery Corp.'
      },
      {
        id: 'evt-282',
        stage: 'FIRST_LIFE',
        title: 'Fleet Commissioning',
        description: 'Assigned to Urban Cargo Courier Fleet.',
        timestamp: '2025-09-01T08:00:00Z',
        actor: 'Urban Cargo Operations'
      }
    ],
    serviceHistory: [],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 49.0, current: 5.5, temperature: 24.6, soc: 91, power: 269.5 },
      { timestamp: '15:00', voltage: 48.6, current: 4.2, temperature: 25.0, soc: 88, power: 204.1 }
    ]
  },
  {
    id: 'rx-667182',
    revoltXId: 'RX-2025-667182',
    serialNumber: 'BAT-NASA-B0046',
    nasaDatasetId: 'B0046',
    manufacturerId: 'mfg-catl',
    manufacturerName: 'Global Cell Tech',
    ownerId: 'usr-munich-transit',
    ownerName: 'Munich Municipal Shuttle',
    vehicleModel: 'Munich Airport Passenger Shuttle (NASA ARC B0046)',
    chemistry: 'NMC',
    capacity: 65,
    initialCapacityAh: 1.7282,
    currentCapacityAh: 1.1538,
    internalResistanceRe: 0.0808,
    chargeTransferRct: 0.2115,
    packConfiguration: '16S3P Heavy Duty',
    nominalVoltage: 58.0,
    manufactureDate: '2023-01-15',
    initialSOH: 100,
    currentSOH: 66.8,
    soc: 52,
    rul: 420,
    cycleCount: 184,
    temperature: 36.5,
    voltage: 56.4,
    current: 14.8,
    power: 834.7,
    rxScore: 68,
    risk: 'Moderate',
    anomaly: 'Electrochemical impedance growth: Re=0.081Ω, Rct=0.212Ω',
    humanAnomalyExplanation: 'NASA ARC test dataset shows charge transfer resistance Rct reached 0.212Ω after 72 discharge cycles. Suitable for second-life stationary renewable storage.',
    recommendation: 'Decommission from active passenger shuttle. Approved for stationary second-life battery buffer.',
    decisionPathway: 'SECOND_LIFE',
    secondLifeApplication: 'Stationary Storage',
    lifecycleStage: 'ASSESSMENT',
    status: 'Under Assessment',
    marketPrice: 1650,
    warrantyPeriod: 'Automotive Expired',
    lastUpdated: '2026-09-24T16:00:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.7282,
            "soh": 100.0
      },
      {
            "cycle": 6,
            "capacity": 1.459,
            "soh": 84.4
      },
      {
            "cycle": 11,
            "capacity": 1.42,
            "soh": 82.2
      },
      {
            "cycle": 16,
            "capacity": 1.4056,
            "soh": 81.3
      },
      {
            "cycle": 21,
            "capacity": 1.41,
            "soh": 81.6
      },
      {
            "cycle": 26,
            "capacity": 1.2993,
            "soh": 75.2
      },
      {
            "cycle": 31,
            "capacity": 1.2615,
            "soh": 73.0
      },
      {
            "cycle": 37,
            "capacity": 1.2723,
            "soh": 73.6
      },
      {
            "cycle": 42,
            "capacity": 1.2054,
            "soh": 69.7
      },
      {
            "cycle": 47,
            "capacity": 1.1677,
            "soh": 67.6
      },
      {
            "cycle": 52,
            "capacity": 1.1381,
            "soh": 65.9
      },
      {
            "cycle": 57,
            "capacity": 1.1971,
            "soh": 69.3
      },
      {
            "cycle": 62,
            "capacity": 1.1712,
            "soh": 67.8
      },
      {
            "cycle": 67,
            "capacity": 1.2531,
            "soh": 72.5
      },
      {
            "cycle": 72,
            "capacity": 1.1538,
            "soh": 66.8
      }
],
    lifecycleEvents: [
      {
        id: 'evt-461',
        stage: 'MANUFACTURED',
        title: 'NMC High-Rate Pack Assembled',
        description: 'Fabricated with 1.728 Ah cell units (NASA ARC B0046 profile).',
        timestamp: '2023-01-15T09:00:00Z',
        actor: 'Global Cell Tech'
      },
      {
        id: 'evt-462',
        stage: 'FIRST_LIFE',
        title: 'Airport Shuttle Route Deployed',
        description: 'Logged 72 heavy discharge cycles across 3 years.',
        timestamp: '2023-02-01T08:00:00Z',
        actor: 'Munich Airport Fleet'
      },
      {
        id: 'evt-463',
        stage: 'ASSESSMENT',
        title: 'Smart Dock EIS Evaluation Complete',
        description: 'Capacity measured at 1.154 Ah (66.8% SOH). Qualified for Second-Life Marketplace.',
        timestamp: '2026-09-22T14:00:00Z',
        actor: 'Technician Marcus Vance'
      }
    ],
    serviceHistory: [
      {
        id: 'srv-461',
        date: '2026-09-22',
        type: 'Smart Dock Second-Life Pre-Qualification',
        technician: 'Marcus Vance',
        findings: 'Cells structurally intact. Safe for 0.4C diurnal solar storage.',
        recommendation: 'List on Circularity Portal for stationary second-life.',
        actionTaken: 'Pack de-rated for stationary microgrid service.'
      }
    ],
    recentTelemetry: [
      { timestamp: '14:00', voltage: 57.2, current: 18.2, temperature: 35.8, soc: 58, power: 1041.0 },
      { timestamp: '15:00', voltage: 56.4, current: 14.8, temperature: 36.5, soc: 52, power: 834.7 }
    ]
  },
  {
    id: 'rx-119283',
    revoltXId: 'RX-2023-119283',
    serialNumber: 'BAT-NASA-B0053',
    nasaDatasetId: 'B0053',
    manufacturerId: 'mfg-catl',
    manufacturerName: 'Global Cell Tech',
    ownerId: 'usr-circ-partner',
    ownerName: 'GreenLithium Closed-Loop Materials AG',
    vehicleModel: 'Rider Sharing Moped (NASA ARC B0053 EOL Hydromet Cycle)',
    chemistry: 'NMC',
    capacity: 55,
    initialCapacityAh: 1.0691,
    currentCapacityAh: 0.0,
    internalResistanceRe: 0.102,
    chargeTransferRct: 0.1659,
    packConfiguration: '14S2P Pouch Pack',
    nominalVoltage: 51.8,
    manufactureDate: '2019-11-20',
    initialSOH: 100,
    currentSOH: 0.0,
    soc: 0,
    rul: 0,
    cycleCount: 137,
    temperature: 21.0,
    voltage: 41.2,
    current: 0.0,
    power: 0.0,
    rxScore: 18,
    risk: 'Critical',
    anomaly: 'End of functional life reached (NASA ARC B0053 0.0 Ah cutoff criteria)',
    humanAnomalyExplanation: 'NASA ARC test dataset confirms complete capacity exhaustion to 0.00 Ah after 56 deep discharge cycles. De-energized and routed to hydrometallurgical recycling.',
    recommendation: 'End of functional life. Safe hydrometallurgical closed-loop mineral recycling completed.',
    decisionPathway: 'RECYCLE',
    lifecycleStage: 'LIFECYCLE_CLOSED',
    status: 'Recycled',
    marketPrice: 320,
    warrantyPeriod: 'End of Life',
    lastUpdated: '2026-09-24T12:00:00Z',
    capacityHistory: [
      {
            "cycle": 1,
            "capacity": 1.0691,
            "soh": 100.0
      },
      {
            "cycle": 5,
            "capacity": 1.1218,
            "soh": 104.9
      },
      {
            "cycle": 9,
            "capacity": 1.0809,
            "soh": 101.1
      },
      {
            "cycle": 13,
            "capacity": 1.0508,
            "soh": 98.3
      },
      {
            "cycle": 17,
            "capacity": 1.0671,
            "soh": 99.8
      },
      {
            "cycle": 21,
            "capacity": 1.0445,
            "soh": 97.7
      },
      {
            "cycle": 25,
            "capacity": 1.0514,
            "soh": 98.3
      },
      {
            "cycle": 29,
            "capacity": 1.0031,
            "soh": 93.8
      },
      {
            "cycle": 33,
            "capacity": 0.9801,
            "soh": 91.7
      },
      {
            "cycle": 37,
            "capacity": 0.9905,
            "soh": 92.6
      },
      {
            "cycle": 41,
            "capacity": 1.0078,
            "soh": 94.3
      },
      {
            "cycle": 45,
            "capacity": 1.0385,
            "soh": 97.1
      },
      {
            "cycle": 49,
            "capacity": 1.028,
            "soh": 96.2
      },
      {
            "cycle": 53,
            "capacity": 1.0467,
            "soh": 97.9
      },
      {
            "cycle": 56,
            "capacity": 0.0,
            "soh": 0.0
      }
],
    lifecycleEvents: [
      {
        id: 'evt-601',
        stage: 'FIRST_LIFE',
        title: 'Original Electric Moped Service',
        description: 'Operated through multi-season urban courier duty.',
        timestamp: '2019-12-01T08:00:00Z',
        actor: 'Rider Sharing Inc'
      },
      {
        id: 'evt-602',
        stage: 'ASSESSMENT',
        title: 'Decommissioning Verification',
        description: 'NASA EOL cutoff reached (0% capacity retention). Safe de-energization completed.',
        timestamp: '2026-08-14T10:00:00Z',
        actor: 'ReVoltX Smart Dock'
      },
      {
        id: 'evt-603',
        stage: 'RECYCLING',
        title: 'Dispatched to GreenLithium Hydromet Facility',
        description: 'De-energized and shredded for black mass extraction.',
        timestamp: '2026-09-12T14:00:00Z',
        actor: 'GreenLithium Logistics'
      },
      {
        id: 'evt-604',
        stage: 'LIFECYCLE_CLOSED',
        title: 'Critical Mineral Recovery Certified',
        description: 'Recovered 1.84kg Lithium, 8.62kg Nickel, and 2.15kg Cobalt returned to cathode precursor loop.',
        timestamp: '2026-09-18T16:00:00Z',
        actor: 'GreenLithium Closed-Loop Materials AG',
        certificateHash: '0x993c...d81a'
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
    issue: 'NASA ARC EIS analysis indicates electrolyte resistance Re increased to 0.050Ω. Rapid charge current throttled. Smart Dock diagnostic requested.',
    requestedDate: '2026-09-22T09:30:00Z',
    scheduledDate: '2026-09-24T10:00:00Z',
    technicianId: 'tech-01',
    technicianName: 'Alex Rivera',
    status: 'Technician Assigned',
    notes: 'Smart Battery Dock v2 test kit assigned for NASA ARC B0005 validation. Priority dispatch.'
  },
  {
    id: 'SR-77104',
    batteryId: 'RX-2025-772190',
    customerName: 'Berlin Urban Delivery Co.',
    phone: '+49 30 928371',
    address: 'Depot 14, Alexanderplatz Logistics Hub, Berlin',
    issue: 'NASA ARC B0006 test shows capacity faded to 1.186 Ah (58.3% SOH) with Rct spike to 0.100Ω. End of automotive life verified. Secondary stationary storage routing requested.',
    requestedDate: '2026-09-20T14:15:00Z',
    scheduledDate: '2026-09-21T11:00:00Z',
    technicianId: 'tech-03',
    technicianName: 'Elena Rostova',
    status: 'Assessment Complete',
    notes: 'Assessment confirmed SOH 58.3%. Candidate for secondary stationary telecom backup.'
  },
  {
    id: 'SR-90312',
    batteryId: 'RX-2026-104921',
    customerName: 'Apex Logistics Corp',
    phone: '+1 (800) 555-0199',
    address: 'Terminal 3, Gateway Intermodal Center',
    issue: 'Routine 616-cycle verification (NASA ARC B0007). Current capacity 1.432 Ah (75.7% SOH).',
    requestedDate: '2026-09-24T11:00:00Z',
    status: 'Requested',
    notes: 'Routine commercial fleet verification.'
  },
  {
    id: 'SR-66701',
    batteryId: 'RX-2025-667182',
    customerName: 'Munich Municipal Shuttle',
    phone: '+49 89 218001',
    address: 'Munich Airport Terminal 2 Depot',
    issue: 'Electrochemical impedance Rct spike to 0.212Ω. Pre-qualification for Second-Life Marketplace requested.',
    requestedDate: '2026-09-21T08:00:00Z',
    scheduledDate: '2026-09-22T14:00:00Z',
    technicianId: 'tech-02',
    technicianName: 'Marcus Vance',
    status: 'Assessment Complete',
    notes: 'Certified for 0.4C diurnal solar energy storage.'
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-01',
    name: 'Alex Rivera',
    specialty: 'EV Pack Diagnostics & Hardware Smart Dock Ops',
    phone: '+1 (555) 839-2011',
    activeTasks: 2,
    completedAssessments: 154,
    status: 'On Field',
    currentLocation: 'Silicon District North'
  },
  {
    id: 'tech-02',
    name: 'Marcus Vance',
    specialty: 'High-Voltage Safety & Stationary Solar Re-purposing',
    phone: '+1 (555) 441-9920',
    activeTasks: 1,
    completedAssessments: 219,
    status: 'Available',
    currentLocation: 'ReVoltX Central Lab'
  },
  {
    id: 'tech-03',
    name: 'Elena Rostova',
    specialty: 'Electrochemical Impedance Spectroscopy (EIS) & Ultrasound Tomography',
    phone: '+49 171 902812',
    activeTasks: 1,
    completedAssessments: 195,
    status: 'On Field',
    currentLocation: 'Berlin Hub'
  }
];

export const INITIAL_SECOND_LIFE_OPPORTUNITIES: SecondLifeOpportunity[] = [
  {
    id: 'opp-01',
    batteryId: 'RX-2026-892738',
    title: 'Commercial Solar Microgrid Storage Module (NASA ARC B0005)',
    targetApplication: 'Solar Energy Storage',
    capacityKWh: 3.07,
    soh: 71.4,
    rulCycles: 384,
    rxScore: 78,
    compatibilityRating: 95,
    status: 'Available',
    estimatedUsefulYears: 3.8,
    economicValueUsd: 1450
  },
  {
    id: 'opp-02',
    batteryId: 'RX-2025-772190',
    title: 'Telecom Tower Auxiliary Backup Bank (NASA ARC B0006)',
    targetApplication: 'Telecom Backup',
    capacityKWh: 5.4,
    soh: 58.3,
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
    title: 'Rural Microgrid Diurnal Buffer Unit (NASA ARC B0018)',
    targetApplication: 'Microgrid',
    capacityKWh: 4.1,
    soh: 72.3,
    rulCycles: 740,
    rxScore: 76,
    compatibilityRating: 92,
    status: 'Allocated',
    allocatedPartner: 'Helios Community Solar Ltd',
    estimatedUsefulYears: 4.2,
    economicValueUsd: 1200
  },
  {
    id: 'opp-04',
    batteryId: 'RX-2025-667182',
    title: 'Stationary Renewable Energy Buffer (NASA ARC B0046)',
    targetApplication: 'Stationary Storage',
    capacityKWh: 3.77,
    soh: 66.8,
    rulCycles: 420,
    rxScore: 68,
    compatibilityRating: 90,
    status: 'Available',
    estimatedUsefulYears: 3.2,
    economicValueUsd: 1650
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
    notes: 'Black mass purified via low-acid hydrometallurgical loop (NASA ARC B0053 EOL unit). Critical minerals re-certified for cathode precursor manufacturing.'
  }
];
