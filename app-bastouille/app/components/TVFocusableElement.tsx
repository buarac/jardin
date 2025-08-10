"use client"
import React, { forwardRef, useRef, useEffect, ReactNode, useCallback } from 'react';
import { useTVNavigation } from './TVNavigationProvider';

interface TVFocusableElementProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  tabIndex?: number;
  'data-focusable'?: boolean;
}

export const TVFocusableElement = forwardRef<HTMLDivElement, TVFocusableElementProps>(
  ({ children, className = '', onClick, onFocus, onBlur, tabIndex = 0, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const { registerElement, unregisterElement } = useTVNavigation();
    const elementRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Stabiliser les callbacks
    const handleFocus = useCallback(() => {
      onFocus?.();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      onBlur?.();
    }, [onBlur]);

    const handleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

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
        className={`tv-focusable-element ${className}`}
        tabIndex={tabIndex}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-focusable="true"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TVFocusableElement.displayName = 'TVFocusableElement';
