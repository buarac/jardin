import React, { useRef, useLayoutEffect, useState } from "react";
import clsx from "clsx";

interface CollapsibleProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Collapsible({ isOpen, children }: CollapsibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const el = ref.current;
      requestAnimationFrame(() => {
        setHeight(isOpen ? el.scrollHeight : 0);
      });
    }
  }, [isOpen]);

  return (
    <div
      className={clsx("transition-all duration-500 ease-in-out overflow-hidden")}
      style={{ maxHeight: `${height}px` }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}