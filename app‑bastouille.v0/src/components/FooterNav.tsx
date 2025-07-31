"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  RectangleStackIcon,
  PlusCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

/**
 * Defines a single navigation item used in the bottom navigation bar. Each
 * item contains a label, a destination href and an icon component. When the
 * current pathname matches the item's href the active colours are applied.
 */
import type { ComponentProps, ComponentType } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<ComponentProps<"svg">>;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Accueil",
    icon: HomeIcon,
  },
  {
    href: "/cultures",
    label: "Cultures",
    icon: RectangleStackIcon,
  },
  {
    href: "/recoltes",
    label: "Récolte",
    icon: PlusCircleIcon,
  },
  {
    href: "/statistiques",
    label: "Statistiques",
    icon: ChartBarIcon,
  },
];

/**
 * The FooterNav component renders a fixed bottom navigation bar containing
 * four primary routes through the application. It uses the current path to
 * determine which item is active, highlighting it with the gold colour.
 */
export default function FooterNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 bg-kaki text-gold border-t border-kaki-dark z-50">
      {navItems.map((item) => {
        const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1"
          >
            <Icon
              className={`h-6 w-6 transition-colors ${active ? "text-gold-dark" : "text-gold-light"}`}
            />
            <span
              className={`text-xs mt-1 ${active ? "text-gold-dark font-semibold" : "text-gold-light"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}