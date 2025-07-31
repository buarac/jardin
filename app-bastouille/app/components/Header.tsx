"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface HeaderProps {
  /**
   * Optional title displayed in the centre of the top bar. Defaults to the
   * application name when omitted.
   */
  title?: string;
  /**
   * Optional URL that will be used for a back button on the left side of
   * the header. When not provided no back button is shown.
   */
  backHref?: string;
}

/**
 * Header renders a simple top bar with an optional back button and a link
 * to the settings page. The current route can be used to alter the
 * displayed title from within a page.
 */
export const Header: React.FC<HeaderProps> = ({ title, backHref }) => {
  const pathname = usePathname();
  const label = title ?? "Baštouille";
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-skin-muted bg-skin-card">
      <div className="flex items-center gap-2 min-w-0">
        {backHref ? (
          <Link href={backHref} className="flex items-center p-2 rounded hover:bg-skin-fill transition-colors">
            {/* Simple left arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
        ) : (
          <span className="w-5 h-5"></span>
        )}
      </div>
      <div className="flex-1 text-center font-semibold truncate px-2">
        {label}
      </div>
      <div className="flex items-center gap-2 min-w-0 justify-end">
        {pathname !== "/settings" && (
          <Link href="/settings" className="flex items-center p-2 rounded hover:bg-skin-fill transition-colors">
            {/* Gear icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.109-.94l-.15-.894a1.125 1.125 0 00-.78-.929c-.398-.165-.854-.143-1.204.107l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.449l.527-.738c.25-.35.273-.806.108-1.203-.165-.398-.505-.71-.93-.781l-.894-.149A1.125 1.125 0 013.75 13.5v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.764-.384.93-.781.165-.397.143-.853-.107-1.203l-.528-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.273 1.204.108.397-.165.71-.505.781-.93l.149-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};