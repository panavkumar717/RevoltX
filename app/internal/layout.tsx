'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  BatteryMedium, 
  Wrench, 
  Users, 
  Sparkles, 
  Recycle, 
  Activity, 
  FileText,
  Building,
  Truck
} from 'lucide-react';
import { PortalLayout, NavItem } from '../../components/shared/PortalLayout';

const INTERNAL_NAV: NavItem[] = [
  { label: 'Ops Command', href: '/internal', icon: ShieldAlert },
  { label: 'Smart Dock Testing', href: '/internal/testing', icon: Cpu, badge: 'Hardware' },
  { label: 'Service Requests', href: '/internal/service-requests', icon: Wrench, badge: 3 },
  { label: 'Technician Roster', href: '/internal/technicians', icon: Users },
  { label: 'Global Batteries', href: '/internal/batteries', icon: BatteryMedium, badge: 6 },
  { label: 'AI Intelligence', href: '/internal/intelligence', icon: Activity },
  { label: 'Second-Life Queue', href: '/internal/second-life', icon: Sparkles },
  { label: 'Recycling Batches', href: '/internal/recycling', icon: Recycle },
  { label: 'Partners & Ecosystem', href: '/internal/partners', icon: Building }
];

export default function InternalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="internal"
      title="ReVoltX Operations Console (ROS)"
      navItems={INTERNAL_NAV}
    >
      {children}
    </PortalLayout>
  );
}
