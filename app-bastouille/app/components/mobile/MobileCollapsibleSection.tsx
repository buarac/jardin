"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MobileCollapsibleSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const MobileCollapsibleSection: React.FC<MobileCollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      requestAnimationFrame(() => {
        setContentHeight(isOpen ? el.scrollHeight : 0);
      });
    }
  }, [isOpen, children]);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`rounded-xl border bg-[var(--color-fill)] ${className}`}>
      {/* Header cliquable */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-lg font-semibold">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {/* Contenu avec animation */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${contentHeight}px` }}
      >
        <div ref={contentRef} className="p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};
