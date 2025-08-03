"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const navItems = [
  { label: "Tableau de bord", href: "/desktop" },
  { label: "Recoltes", href: "/desktop/recoltes" },
  { label: "Cultures", href: "/desktop/cultures" },
  { label: "Jobs", href: "/desktop/jobs" },
  { label: "Statistiques", href: "/desktop/stats" },
  { label: "Paramètres", href: "/desktop/settings" },
];

export default function DesktopPage() {
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-12 px-4 flex items-center justify-between bg-muted border-b">
        <div className="text-lg font-semibold">Baštouille (Desktop)</div>
        <ThemeSwitcher />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-56 bg-muted border-r p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded hover:bg-accent ${
                pathname.startsWith(item.href) ? "bg-accent font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Main Content Placeholder */}
        <main className="flex-1 p-6 text-muted-foreground">
          <p>Sélectionnez une fonctionnalité dans le menu de gauche.</p>
        </main>
      </div>
    </div>
  );
}