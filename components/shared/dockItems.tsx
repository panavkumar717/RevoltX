import React from "react";
import {
  IconHome,
  IconAlertTriangle,
  IconCpu,
  IconDeviceAnalytics,
  IconBuildingFactory2,
  IconRecycle,
  IconPlayerPlay,
  IconQrcode,
} from "@tabler/icons-react";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export const revoltxDockItems: DockItem[] = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full" />,
    href: "/#",
  },
  {
    title: "The Problem",
    icon: <IconAlertTriangle className="h-full w-full" />,
    href: "/#problem",
  },
  {
    title: "Architecture",
    icon: <IconCpu className="h-full w-full" />,
    href: "/#how-it-works",
  },
  {
    title: "Smart Dock",
    icon: <IconDeviceAnalytics className="h-full w-full" />,
    href: "/#hardware",
  },
  {
    title: "Portals",
    icon: <IconBuildingFactory2 className="h-full w-full" />,
    href: "/#portals",
  },
  {
    title: "Circularity",
    icon: <IconRecycle className="h-full w-full" />,
    href: "/#circularity",
  },
  {
    title: "Live Demo",
    icon: <IconPlayerPlay className="h-full w-full text-[#137A58] dark:text-[#34D399]" />,
    href: "/demo",
  },
  {
    title: "Battery Passport",
    icon: <IconQrcode className="h-full w-full" />,
    href: "/battery/RX-2026-892738",
  },
];
