// app/tv/layout.tsx
// import { ReactNode } from "react";

export default function TVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="lavande"
      data-mode="dark"
      className="min-h-screen bg-[var(--color-fill)] text-[var(--color-text)]"
    >
      {children}
    </div>
  );
}