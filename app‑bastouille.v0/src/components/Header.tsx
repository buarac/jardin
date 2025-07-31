import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export interface HeaderProps {
  /**
   * Title to display in the centre of the header. This can be a string or any
   * React node (for example a composed element). It will be truncated if
   * too long.
   */
  title: ReactNode;
  /**
   * When provided, a back arrow linking to this route will be rendered on
   * the left side of the header. If omitted, no back arrow is shown and the
   * left space remains empty to keep the title centred.
   */
  backHref?: string;
}

/**
 * The Header component renders the top navigation bar used throughout the
 * application. It displays an optional back button on the left and the
 * current page title centred. Colours come from the custom Tailwind theme
 * defined in tailwind.config.ts (kaki for the background and gold for
 * accents). The height and padding mimic the look of a native iOS app bar.
 */
export default function Header({ title, backHref }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-kaki px-4 py-3 text-gold border-b border-kaki-dark">
      {/* Left area: back arrow or empty placeholder to keep title centred */}
      <div className="w-8">
        {backHref ? (
          <Link href={backHref} aria-label="Revenir en arrière">
            <ChevronLeftIcon className="h-6 w-6" />
          </Link>
        ) : null}
      </div>
      {/* Title */}
      <div className="flex-1 text-center font-semibold text-base truncate">
        {title}
      </div>
      {/* Right placeholder to balance layout */}
      <div className="w-8" />
    </header>
  );
}