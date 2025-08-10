"use client"
import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { useTVNavigation } from './TVNavigationProvider';

interface Culture {
  nom: string;
  img: string;
  poids: number;
}

interface TVCultureCardProps {
  culture: Culture;
  index: number;
  className?: string;
}

export const TVCultureCard = forwardRef<HTMLDivElement, TVCultureCardProps>(
  ({ culture, index, className = '' }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const { registerElement, unregisterElement } = useTVNavigation();
    const elementRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Stabiliser les callbacks
    const handleFocus = useCallback(() => {
      console.log(`🎯 Focus sur la carte: ${culture.nom}`);
    }, [culture.nom]);

    const handleBlur = useCallback(() => {
      // Retirer l'effet de focus
    }, []);

    const handleClick = useCallback(() => {
      console.log(`🖱️ Clic sur la carte: ${culture.nom}`);
    }, [culture.nom]);

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

    // Vérification des données
    if (!culture || !culture.nom || !culture.img) {
      console.warn('⚠️ Données de culture invalides:', culture);
      return null;
    }

    const poidsKg = (culture.poids / 1000).toFixed(2);
    const imageSrc = `/images/cultures/hd/${culture.img}`;

    return (
      <div
        ref={elementRef}
        className={`tv-culture-card ${className} bg-[var(--color-card)] rounded-2xl p-4 flex items-center space-x-8 shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)] focus:ring-opacity-50 hover:scale-105 focus:scale-105`}
        tabIndex={0}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-focusable="true"
        data-culture-index={index}
        data-culture-name={culture.nom}
        role="button"
        aria-label={`Carte de culture: ${culture.nom}, ${poidsKg} kg`}
      >
        <img
          src={imageSrc}
          alt={culture.nom}
          className="w-40 h-40 object-contain"
          onError={(e) => {
            console.error(`❌ Erreur de chargement de l'image: ${imageSrc}`);
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="text-[var(--color-text)]">
          <h2 className="text-3xl font-semibold">{culture.nom}</h2>
          <p className="text-4xl font-bold mt-2">{poidsKg} kg</p>
        </div>
      </div>
    );
  }
);

TVCultureCard.displayName = 'TVCultureCard';
