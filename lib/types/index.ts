export type ChemistryType = 'LFP' | 'NMC' | 'NCA' | 'Sodium-Ion' | 'Solid-State';

export type LifecycleStage = 
  | 'MANUFACTURED'
  | 'REGISTERED'
  | 'FIRST_LIFE'
  | 'HEALTH_MONITORING'
  | 'ASSESSMENT'
  | 'CONTINUE_USE'
  | 'SECOND_LIFE'
  | 'RECYCLING'
  | 'LIFECYCLE_CLOSED';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export type UserRole = 
  | 'manufacturer'
  | 'fleet'
  | 'owner'
  | 'circularity_partner'
  | 'recycler'
  | 'revoltX_admin'
  | 'technician';

export type ServiceStatus = 
  | 'Requested'
  | 'Scheduled'
  | 'Technician Assigned'
  | 'Assessment Complete'
  | 'Replacement Recommended'
  | 'Completed';

export interface TelemetryPoint {
  timestamp: string;
  voltage: number;      // in Volts (e.g. 52.4V)
  current: number;      // in Amperes (e.g. 14.8A)
  temperature: number;  // in Celsius (e.g. 33.5°C)
  soc: number;          // 0 - 100%
  power: number;        // in Watts
}

export interface LifecycleEvent {
  id: string;
  stage: LifecycleStage;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  location?: string;
  certificateHash?: string;
}

export interface ServiceRecord {
  id: string;
  date: string;
  type: string;
  technician: string;
  findings: string;
  recommendation: string;
  actionTaken: string;
}

export interface Battery {
  id: string;
  revoltXId: string;       // e.g. "RX-2026-892738"
  serialNumber: string;    // e.g. "BAT-892738"
  manufacturerId: string;
  manufacturerName: string;// e.g. "XYZ Battery Corp."
  ownerId?: string;
  ownerName?: string;      // e.g. "Sarah Jenkins"
  fleetId?: string;
  fleetName?: string;      // e.g. "EcoTransit Metro Fleet #14"
  vehicleModel?: string;   // e.g. "EcoRider V3 Commercial Courier"
  chemistry: ChemistryType;
  capacity: number;        // Ah (e.g. 60)
  packConfiguration: string;// e.g. "16S2P"
  nominalVoltage: number;  // Volts
  manufactureDate: string;
  
  // Health & AI Metrics
  initialSOH: number;      // percentage, e.g. 100
  currentSOH: number;      // percentage, e.g. 72
  soc: number;             // State of charge, e.g. 84
  rul: number;             // Remaining useful life in cycles, e.g. 384
  cycleCount: number;      // e.g. 1420
  temperature: number;     // e.g. 38.4
  voltage: number;         // e.g. 51.2
  current: number;         // e.g. 18.2
  power: number;           // e.g. 931.8
  rxScore: number;         // 0 - 100, e.g. 78
  risk: RiskLevel;
  
  // Intelligence flags
  anomaly?: string;        // e.g. "Accelerated thermal degradation detected"
  humanAnomalyExplanation?: string; // Plain language: "Your battery has been running warmer than expected."
  recommendation?: string; // e.g. "Potentially suitable for secondary-life assessment."
  decisionPathway?: 'CONTINUE_USE' | 'SECOND_LIFE' | 'RECYCLE';
  secondLifeApplication?: string; // e.g. "Stationary Solar Storage"
  
  lifecycleStage: LifecycleStage;
  status: 'Active' | 'Under Assessment' | 'Decommissioned' | 'Recycled';
  
  // Commercial & Provenance
  marketPrice?: number;
  warrantyPeriod: string;
  lastUpdated: string;
  
  // Relationships
  lifecycleEvents: LifecycleEvent[];
  serviceHistory: ServiceRecord[];
  recentTelemetry: TelemetryPoint[];
}

export interface ServiceRequest {
  id: string;
  batteryId: string;
  customerName: string;
  phone: string;
  address: string;
  issue: string;
  requestedDate: string;
  scheduledDate?: string;
  technicianId?: string;
  technicianName?: string;
  status: ServiceStatus;
  notes?: string;
}

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  activeTasks: number;
  completedAssessments: number;
  status: 'Available' | 'On Field' | 'Off Duty';
  currentLocation: string;
}

export interface RecyclingRecord {
  id: string;
  batteryId: string;
  recyclerName: string;
  receivedDate: string;
  processedDate?: string;
  status: 'Received' | 'Disassembly' | 'Hydrometallurgical Extraction' | 'Materials Recovered';
  lithiumRecoveryKg: number;
  nickelRecoveryKg: number;
  cobaltRecoveryKg: number;
  copperRecoveryKg: number;
  aluminumRecoveryKg: number;
  recoveryEfficiencyPct: number;
  notes: string;
}

export interface SecondLifeOpportunity {
  id: string;
  batteryId: string;
  title: string;
  targetApplication: 'Solar Energy Storage' | 'Telecom Backup' | 'Microgrid' | 'Stationary Storage';
  capacityKWh: number;
  soh: number;
  rulCycles: number;
  rxScore: number;
  compatibilityRating: number; // 0 - 100
  status: 'Available' | 'Allocated' | 'In Testing';
  allocatedPartner?: string;
  estimatedUsefulYears: number;
  economicValueUsd: number;
}
