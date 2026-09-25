'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  BatteryMedium, 
  Truck, 
  PlusCircle, 
  HeartPulse, 
  Wrench, 
  FileText, 
  QrCode 
} from 'lucide-react';
import { PortalLayout, NavItem } from '../../components/shared/PortalLayout';

const MANUFACTURER_NAV: NavItem[] = [
  { label: 'Overview', href: '/manufacturer', icon: LayoutDashboard },
  { label: 'Batteries', href: '/manufacturer/batteries', icon: BatteryMedium, badge: 6 },
  { label: 'Fleet Assets', href: '/manufacturer/fleet', icon: Truck },
  { label: 'Register Battery', href: '/manufacturer/batteries/register', icon: PlusCircle },
  { label: 'Issues Reported', href: '/manufacturer/service-requests', icon: Wrench, badge: 3 },
  { label: 'Reports & ESG', href: '/manufacturer/reports', icon: FileText },
  { label: 'Digital Passport', href: '/battery/RX-2026-892738', icon: QrCode }
];

export default function ManufacturerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="manufacturer"
      title="Manufacturer & Fleet Portal"
      navItems={MANUFACTURER_NAV}
    >
      {children}
    </PortalLayout>
  );
}
