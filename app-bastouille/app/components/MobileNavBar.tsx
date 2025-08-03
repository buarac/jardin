"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * FooterNav renders a bottom tab bar. On small screens it displays a reduced
 * set of actions in line with the specification (e.g. only add recoltes
 * rather than full listing). On medium and larger screens all actions
 * become available.
 */
export const MobileNavBar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const baseClasses =
    "flex flex-col items-center justify-center flex-1 py-2 gap-1";
  const activeClasses = "text-skin-accent font-medium";
  const inactiveClasses = "text-skin-text/70";

  return (
    <nav className="fixed bottom-0 inset-x-0 z-10 border-t border-skin-muted bg-skin-card flex md:justify-around h-20">
      {/* Home always visible */}
      <Link
        href="/"
        className={`${baseClasses} ${
          isActive("/") ? activeClasses : inactiveClasses
        }`}
      >
        {/* Home icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 3.172l-7 7V21h5v-6h4v6h5V10.172l-7-7z" />
        </svg>
        <span className="text-xs">Accueil</span>
      </Link>
      {/* Cultures hidden on small screens */}
      <Link
        href="/cultures"
        className={`${baseClasses} hidden md:flex ${
          isActive("/cultures") ? activeClasses : inactiveClasses
        }`}
      >
        {/* Plant icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 2a7 7 0 017 7v1h-2V9a5 5 0 00-10 0v1H5V9a7 7 0 017-7z" />
          <path d="M5 12h14v2H5zM4 15h16v2H4z" />
        </svg>
        <span className="text-xs">Cultures</span>
      </Link>
      {/* Recoltes: add mode on mobile, full list on desktop */}
      {/* Mobile: link to new recolte */}
      <Link
        href="/recoltes/new"
        className={`${baseClasses} md:hidden ${
          isActive("/recoltes/new") ? activeClasses : inactiveClasses
        }`}
      >
        {/* Plus circle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="text-xs">Récolte</span>
      </Link>
      {/* Desktop: link to full recoltes management */}
      <Link
        href="/recoltes"
        className={`${baseClasses} hidden md:flex ${
          isActive("/recoltes") ? activeClasses : inactiveClasses
        }`}
      >
        {/* Basket icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3 9h18l-1.5 9h-15L3 9z" />
          <path d="M3 9l1-5h16l1 5" />
        </svg>
        <span className="text-xs">Récoltes</span>
      </Link>
      {/* Stats always visible but label difference not needed */}
      <Link
        href="/stats"
        className={`${baseClasses} ${
          isActive("/stats") ? activeClasses : inactiveClasses
        }`}
      >
        {/* Chart icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M5 3h2v18H5zM10 12h2v9h-2zM15 7h2v14h-2zM20 15h2v6h-2z" />
        </svg>
        <span className="text-xs">Statistique</span>
      </Link>
    </nav>
  );
};
