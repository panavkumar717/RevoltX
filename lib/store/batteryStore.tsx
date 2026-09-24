'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Battery, 
  ServiceRequest, 
  Technician, 
  SecondLifeOpportunity, 
  RecyclingRecord, 
  UserRole,
  LifecycleStage,
  RiskLevel
} from '../types';
import { 
  INITIAL_BATTERIES, 
  INITIAL_SERVICE_REQUESTS, 
  INITIAL_TECHNICIANS, 
  INITIAL_SECOND_LIFE_OPPORTUNITIES, 
  INITIAL_RECYCLING_RECORDS 
} from '../data/initialData';

export interface UserSession {
  name: string;
  email: string;
  role: UserRole;
  orgName: string;
  portalAccess: 'manufacturer' | 'owner' | 'circularity' | 'internal';
}

interface BatteryContextType {
  batteries: Battery[];
  serviceRequests: ServiceRequest[];
  technicians: Technician[];
  opportunities: SecondLifeOpportunity[];
  recyclingRecords: RecyclingRecord[];
  currentUser: UserSession | null;
  setCurrentUser: (user: UserSession | null) => void;
  getBattery: (idOrRevoltXId: string) => Battery | undefined;
  registerBattery: (data: Partial<Battery>) => Battery;
  updateBattery: (id: string, updates: Partial<Battery>, logEventTitle?: string, logEventDesc?: string) => void;
  createServiceRequest: (data: Omit<ServiceRequest, 'id' | 'status' | 'requestedDate'>) => ServiceRequest;
  updateServiceRequestStatus: (id: string, status: ServiceRequest['status'], technicianId?: string, notes?: string) => void;
  allocateSecondLifeOpportunity: (oppId: string, partnerName: string) => void;
  recordRecyclingMaterial: (record: Omit<RecyclingRecord, 'id' | 'receivedDate'>) => RecyclingRecord;
  resetToDemoData: () => void;
}

const STORAGE_KEY = 'revoltx_platform_state_v1';

const BatteryContext = createContext<BatteryContextType | undefined>(undefined);

export const BatteryStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [batteries, setBatteries] = useState<Battery[]>(INITIAL_BATTERIES);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [opportunities, setOpportunities] = useState<SecondLifeOpportunity[]>(INITIAL_SECOND_LIFE_OPPORTUNITIES);
  const [recyclingRecords, setRecyclingRecords] = useState<RecyclingRecord[]>(INITIAL_RECYCLING_RECORDS);
  const [currentUser, setCurrentUser] = useState<UserSession | null>({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@ecotransit.io',
    role: 'owner',
    orgName: 'EcoTransit Metro',
    portalAccess: 'owner'
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.batteries) setBatteries(parsed.batteries);
        if (parsed.serviceRequests) setServiceRequests(parsed.serviceRequests);
        if (parsed.technicians) setTechnicians(parsed.technicians);
        if (parsed.opportunities) setOpportunities(parsed.opportunities);
        if (parsed.recyclingRecords) setRecyclingRecords(parsed.recyclingRecords);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      }
    } catch {
      // Fallback to initial
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        batteries,
        serviceRequests,
        technicians,
        opportunities,
        recyclingRecords,
        currentUser
      }));
    } catch {
      // Storage error
    }
  }, [batteries, serviceRequests, technicians, opportunities, recyclingRecords, currentUser, isLoaded]);

  const getBattery = (idOrRevoltXId: string): Battery | undefined => {
    const cleanId = idOrRevoltXId.trim().toLowerCase();
    return batteries.find(b => 
      b.id.toLowerCase() === cleanId || 
      b.revoltXId.toLowerCase() === cleanId || 
      b.serialNumber.toLowerCase() === cleanId
    );
  };

  const registerBattery = (data: Partial<Battery>): Battery => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newRevoltXId = `RX-2026-${randomSuffix}`;
    const newId = `rx-${randomSuffix}`;

    const newBattery: Battery = {
      id: newId,
      revoltXId: newRevoltXId,
      serialNumber: data.serialNumber || `BAT-${randomSuffix}`,
      manufacturerId: data.manufacturerId || 'mfg-xyz',
      manufacturerName: data.manufacturerName || 'XYZ Battery Corp.',
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      fleetId: data.fleetId,
      fleetName: data.fleetName,
      vehicleModel: data.vehicleModel || 'Standard Pack Asset',
      chemistry: data.chemistry || 'LFP',
      capacity: data.capacity || 60,
      packConfiguration: data.packConfiguration || '16S2P Prismatic',
      nominalVoltage: data.nominalVoltage || 51.2,
      manufactureDate: data.manufactureDate || new Date().toISOString().split('T')[0],
      initialSOH: 100,
      currentSOH: data.currentSOH || 100,
      soc: data.soc || 95,
      rul: data.rul || 2000,
      cycleCount: data.cycleCount || 0,
      temperature: data.temperature || 24.5,
      voltage: data.voltage || 51.8,
      current: data.current || 0.0,
      power: data.power || 0.0,
      rxScore: data.rxScore || 98,
      risk: (data.risk as RiskLevel) || 'Low',
      lifecycleStage: 'REGISTERED',
      status: 'Active',
      marketPrice: data.marketPrice || 2800,
      warrantyPeriod: data.warrantyPeriod || '5 Years / 2,000 Cycles',
      lastUpdated: new Date().toISOString(),
      lifecycleEvents: [
        {
          id: `evt-${Date.now()}-1`,
          stage: 'MANUFACTURED',
          title: 'Cell Fabrication Certified',
          description: `Pack assembled by ${data.manufacturerName || 'XYZ Battery Corp.'}. Chemistry: ${data.chemistry || 'LFP'}.`,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          actor: data.manufacturerName || 'XYZ Battery Corp. QA'
        },
        {
          id: `evt-${Date.now()}-2`,
          stage: 'REGISTERED',
          title: 'ReVoltX Digital Battery Passport Created',
          description: `Minted into ReVoltX Universal Database as ${newRevoltXId}.`,
          timestamp: new Date().toISOString(),
          actor: 'ReVoltX Registration Engine'
        }
      ],
      serviceHistory: [],
      recentTelemetry: [
        { timestamp: '10:00', voltage: 51.9, current: 0.0, temperature: 24.2, soc: 96, power: 0 },
        { timestamp: '11:00', voltage: 51.8, current: 0.0, temperature: 24.5, soc: 95, power: 0 }
      ]
    };

    setBatteries(prev => [newBattery, ...prev]);
    return newBattery;
  };

  const updateBattery = (
    id: string, 
    updates: Partial<Battery>, 
    logEventTitle?: string, 
    logEventDesc?: string
  ) => {
    setBatteries(prev => prev.map(battery => {
      if (battery.id !== id && battery.revoltXId !== id) return battery;

      const updatedEvents = [...battery.lifecycleEvents];
      if (logEventTitle) {
        updatedEvents.push({
          id: `evt-${Date.now()}`,
          stage: updates.lifecycleStage || battery.lifecycleStage,
          title: logEventTitle,
          description: logEventDesc || 'Status updated in ReVoltX Database.',
          timestamp: new Date().toISOString(),
          actor: currentUser?.name || 'ReVoltX System'
        });
      }

      return {
        ...battery,
        ...updates,
        lifecycleEvents: updatedEvents,
        lastUpdated: new Date().toISOString()
      };
    }));
  };

  const createServiceRequest = (
    data: Omit<ServiceRequest, 'id' | 'status' | 'requestedDate'>
  ): ServiceRequest => {
    const newId = `SR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq: ServiceRequest = {
      id: newId,
      ...data,
      status: 'Requested',
      requestedDate: new Date().toISOString()
    };

    setServiceRequests(prev => [newReq, ...prev]);

    // Update battery with pending request marker
    updateBattery(
      data.batteryId, 
      {}, 
      'Service Inspection Requested', 
      `Customer initiated service request ${newId}: "${data.issue}"`
    );

    return newReq;
  };

  const updateServiceRequestStatus = (
    id: string, 
    status: ServiceRequest['status'], 
    technicianId?: string, 
    notes?: string
  ) => {
    let techName: string | undefined;
    if (technicianId) {
      const tech = technicians.find(t => t.id === technicianId);
      techName = tech?.name;
    }

    setServiceRequests(prev => prev.map(req => {
      if (req.id !== id) return req;
      return {
        ...req,
        status,
        technicianId: technicianId || req.technicianId,
        technicianName: techName || req.technicianName,
        notes: notes || req.notes
      };
    }));
  };

  const allocateSecondLifeOpportunity = (oppId: string, partnerName: string) => {
    let targetBatteryId = '';
    let targetApp = '';

    setOpportunities(prev => prev.map(opp => {
      if (opp.id !== oppId) return opp;
      targetBatteryId = opp.batteryId;
      targetApp = opp.targetApplication;
      return {
        ...opp,
        status: 'Allocated',
        allocatedPartner: partnerName
      };
    }));

    if (targetBatteryId) {
      updateBattery(
        targetBatteryId,
        {
          lifecycleStage: 'SECOND_LIFE',
          secondLifeApplication: targetApp,
          ownerName: partnerName,
          status: 'Active'
        },
        'Allocated for Second-Life Deployment',
        `ReVoltX allocated battery to ${partnerName} for ${targetApp}. Continuous digital passport remains active.`
      );
    }
  };

  const recordRecyclingMaterial = (
    record: Omit<RecyclingRecord, 'id' | 'receivedDate'>
  ): RecyclingRecord => {
    const newId = `rec-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRec: RecyclingRecord = {
      id: newId,
      receivedDate: new Date().toISOString().split('T')[0],
      ...record
    };

    setRecyclingRecords(prev => [newRec, ...prev]);

    updateBattery(
      record.batteryId,
      {
        lifecycleStage: 'LIFECYCLE_CLOSED',
        status: 'Recycled'
      },
      'Circular Loop Closed: Critical Minerals Recovered',
      `Recovered: ${record.lithiumRecoveryKg}kg Li, ${record.nickelRecoveryKg}kg Ni, ${record.cobaltRecoveryKg}kg Co. Recycled by ${record.recyclerName}.`
    );

    return newRec;
  };

  const resetToDemoData = () => {
    setBatteries(INITIAL_BATTERIES);
    setServiceRequests(INITIAL_SERVICE_REQUESTS);
    setTechnicians(INITIAL_TECHNICIANS);
    setOpportunities(INITIAL_SECOND_LIFE_OPPORTUNITIES);
    setRecyclingRecords(INITIAL_RECYCLING_RECORDS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <BatteryContext.Provider
      value={{
        batteries,
        serviceRequests,
        technicians,
        opportunities,
        recyclingRecords,
        currentUser,
        setCurrentUser,
        getBattery,
        registerBattery,
        updateBattery,
        createServiceRequest,
        updateServiceRequestStatus,
        allocateSecondLifeOpportunity,
        recordRecyclingMaterial,
        resetToDemoData
      }}
    >
      {children}
    </BatteryContext.Provider>
  );
};

export const useReVoltX = () => {
  const context = useContext(BatteryContext);
  if (!context) {
    throw new Error('useReVoltX must be used within a BatteryStoreProvider');
  }
  return context;
};
