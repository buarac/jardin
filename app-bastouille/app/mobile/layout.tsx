// app/mobile/layout.tsx

import { ReactNode } from "react";
import { MobileNavBar } from "@/components/MobileNavBar";
import { Header } from "@/components/Header";

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 px-4 pb-20 pt-4">{children}</main>
      <MobileNavBar />
    </div>
  );
}