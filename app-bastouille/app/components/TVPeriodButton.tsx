"use client"
import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { useTVNavigation } from './TVNavigationProvider';

interface TVPeriodButtonProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const TVPeriodButton = forwardRef<HTMLDivElement, TVPeriodButtonProps>(
  ({ value, isSelected, onClick, children, className = '' }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const { registerElement, unregisterElement } = useTVNavigation();
    const elementRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Stabiliser les callbacks
    const handleFocus = useCallback(() => {
      console.log(`🎯 Focus sur le bouton: ${value}`);
    }, [value]);

    const handleBlur = useCallback(() => {
      // Retirer les effets visuels de focus si nécessaire
    }, []);

    const handleClick = useCallback(() => {
      console.log(`🖱️ Clic sur le bouton: ${value}`);
      onClick();
    }, [onClick, value]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    }, [handleClick]);

    useEffect(() => {
      if (elementRef.current) {
        registerElement(elementRef);
        return () => unregisterElement(elementRef);
      }
    }, [elementRef, registerElement, unregisterElement]);

    return (
      <div
        ref={elementRef}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`tv-period-button ${className} ${
          isSelected
            ? 'bg-[var(--color-accent)] text-[var(--color-fill)]'
            : 'text-[var(--color-accent)]'
        } text-5xl py-2 px-2 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)] focus:ring-opacity-50 hover:scale-105`}
        tabIndex={0}
        data-focusable="true"
        data-period={value}
        data-testid={`period-${value}`}
        role="button"
        aria-pressed={isSelected}
      >
        {children}
      </div>
    );
  }
);

TVPeriodButton.displayName = 'TVPeriodButton';
