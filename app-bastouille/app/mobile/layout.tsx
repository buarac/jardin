// app/mobile/layout.tsx

import { ReactNode } from "react";

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 px-4 pb-20 pt-4">{children}</main>
    </div>
  );
}