

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
    <div className="relative h-[100dvh] overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10">
        <TopBar title={title} version={version} showBack={showBack} />
      </div>
      <main className="absolute top-[64px] bottom-[64px] left-0 right-0 overflow-y-auto bg-white p-4">
        {children}
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <BottomNavBar />
      </div>
    </div>
  );
}