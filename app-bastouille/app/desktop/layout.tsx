import { ReactNode } from "react";


export default function DesktopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto px-6">
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}