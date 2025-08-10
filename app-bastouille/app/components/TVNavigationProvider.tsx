"use client"
import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

interface TVNavigationContextType {
  currentFocusIndex: number;
  setCurrentFocusIndex: (index: number) => void;
  focusableElements: React.RefObject<HTMLElement>[];
  registerElement: (ref: React.RefObject<HTMLElement>) => void;
  unregisterElement: (ref: React.RefObject<HTMLElement>) => void;
}

const TVNavigationContext = createContext<TVNavigationContextType | undefined>(undefined);

export const useTVNavigation = () => {
  const context = useContext(TVNavigationContext);
  if (!context) {
    throw new Error('useTVNavigation must be used within a TVNavigationProvider');
  }
  return context;
};

interface TVNavigationProviderProps {
  children: ReactNode;
}

export const TVNavigationProvider: React.FC<TVNavigationProviderProps> = ({ children }) => {
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
  const [focusableElements, setFocusableElements] = useState<React.RefObject<HTMLElement>[]>([]);
  
  // Référence pour l'historique des focus (pour debug)
  const focusHistoryRef = useRef<HTMLElement[]>([]);
  const lastFocusTime = useRef(Date.now());

  // Fonctions de registration stabilisées avec useCallback
  const registerElement = useCallback((ref: React.RefObject<HTMLElement>) => {
    setFocusableElements(prev => {
      if (!prev.find(r => r === ref)) {
        return [...prev, ref];
      }
      return prev;
    });
  }, []);

  const unregisterElement = useCallback((ref: React.RefObject<HTMLElement>) => {
    setFocusableElements(prev => prev.filter(r => r !== ref));
  }, []);

  // Gestion des événements de focus pour debug
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target || !target.hasAttribute('data-focusable')) return;

      const now = Date.now();
      const timeSinceLastFocus = now - lastFocusTime.current;
      
      // Ajouter à l'historique pour debug
      focusHistoryRef.current.push(target);
      if (focusHistoryRef.current.length > 5) {
        focusHistoryRef.current.shift();
      }

      // Mettre à jour l'index de focus
      const index = focusableElements.findIndex(ref => ref.current === target);
      if (index !== -1) {
        setCurrentFocusIndex(index);
        console.log(`🎯 Focus sur élément ${index}: ${target.getAttribute('data-culture-name') || target.textContent?.slice(0, 20)} (${timeSinceLastFocus}ms)`);
      }

      lastFocusTime.current = now;
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, [focusableElements]);

  const value: TVNavigationContextType = {
    currentFocusIndex,
    setCurrentFocusIndex,
    focusableElements,
    registerElement,
    unregisterElement
  };

  return (
    <TVNavigationContext.Provider value={value}>
      {children}
    </TVNavigationContext.Provider>
  );
};
