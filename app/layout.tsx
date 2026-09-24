import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BatteryStoreProvider } from "../lib/store/batteryStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REVoltX — Every Battery Has a Second Life",
  description: "ReVoltX is the premier battery lifecycle intelligence platform. Tracking energy storage assets from manufacture to first life, IoT health monitoring, hardware Smart Dock assessment, AI second-life routing, and closed-loop recycling.",
  keywords: ["battery lifecycle", "battery passport", "second-life battery", "circular economy", "clean energy", "climate tech", "LFP", "NMC"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7FAF8] text-[#10201B]">
        <BatteryStoreProvider>
          {children}
        </BatteryStoreProvider>
      </body>
    </html>
  );
}
