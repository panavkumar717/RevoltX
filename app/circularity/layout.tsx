'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  RefreshCw, 
  Recycle, 
  ArrowLeftRight, 
  Leaf, 
  QrCode 
} from 'lucide-react';
import { PortalLayout, NavItem } from '../../components/shared/PortalLayout';

const CIRCULARITY_NAV: NavItem[] = [
  { label: 'Overview', href: '/circularity', icon: LayoutDashboard },
  { label: '2nd-Life Opportunities', href: '/circularity/opportunities', icon: Sparkles, badge: 3 },
  { label: 'Recycler Hub', href: '/circularity/recycling', icon: Recycle, badge: 2 },
  { label: 'Custody Transactions', href: '/circularity/transactions', icon: ArrowLeftRight },
  { label: 'Circular Impact', href: '/circularity/impact', icon: Leaf },
  { label: 'Digital Passport', href: '/battery/RX-2026-892738', icon: QrCode }
];

export default function CircularityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout
      portalType="circularity"
      title="Circularity Partner Portal"
      navItems={CIRCULARITY_NAV}
    >
      {children}
    </PortalLayout>
  );
}
