

import React from "react";
import TopBar from "@/components/TopBar";
import BottomNavBar from "@/components/BottomNavBar";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  version?: string;
  showBack?: boolean;
}

export default function AppLayout({
  children,
  title = "Bastouille",
  version = "v1.0.0",
  showBack = false,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title={title} version={version} showBack={showBack} />
      <main className="flex-grow bg-white p-4">{children}</main>
      <BottomNavBar />
    </div>
  );
}