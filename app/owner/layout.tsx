'use client';

import React from 'react';
import { 
  BatteryMedium, 
  ShoppingBag, 
  HeartPulse, 
  GitCommit, 
  Wrench, 
  Bell, 
  QrCode 
} from 'lucide-react';
import { PortalLayout, NavItem } from '../../components/shared/PortalLayout';

const OWNER_NAV: NavItem[] = [
  { label: 'My Battery', href: '/owner', icon: BatteryMedium },
  { label: 'Certified Marketplace', href: '/owner/marketplace', icon: ShoppingBag, badge: 'New' },
  { label: 'Health Diagnostics', href: '/owner/health', icon: HeartPulse },
  { label: 'Battery Lifecycle', href: '/owner/lifecycle', icon: GitCommit },
  { label: 'Book Health Check', href: '/owner/service', icon: Wrench },
  { label: 'Alerts & Tips', href: '/owner/alerts', icon: Bell, badge: 1 },
  { label: 'Digital Passport', href: '/battery/RX-2026-892738', icon: QrCode }
];

export default function OwnerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="owner"
      title="Customer / Owner Portal"
      navItems={OWNER_NAV}
    >
      {children}
    </PortalLayout>
  );
}
