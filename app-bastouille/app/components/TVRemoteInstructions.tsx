"use client"
import React, { useState, useEffect } from 'react';

export const TVRemoteInstructions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTVEnvironment, setIsTVEnvironment] = useState(false);

  useEffect(() => {
    // Détecter l'environnement TV
    const checkTVEnvironment = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isTV = userAgent.includes('smart-tv') || 
                   userAgent.includes('tizen') || 
                   userAgent.includes('webos') ||
                   window.innerWidth >= 1920 && window.innerHeight >= 1080;
      setIsTVEnvironment(isTV);
    };

    checkTVEnvironment();
    window.addEventListener('resize', checkTVEnvironment);
    
    // Afficher les instructions après 3 secondes sur TV
    if (isTVEnvironment) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('resize', checkTVEnvironment);
  }, [isTVEnvironment]);

  if (!isTVEnvironment || !isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-[var(--color-card)] bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-[var(--color-accent)] z-50 max-w-md">
      <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-4">
        🎮 Navigation Télécommande
      </h3>
      <div className="space-y-3 text-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-[var(--color-accent)] text-[var(--color-fill)] px-3 py-1 rounded-lg font-mono text-sm">
            ↑↓←→
          </span>
          <span>Naviguer entre les éléments</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[var(--color-accent)] text-[var(--color-fill)] px-3 py-1 rounded-lg font-mono text-sm">
            OK
          </span>
          <span>Sélectionner / Valider</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[var(--color-accent)] text-[var(--color-fill)] px-3 py-1 rounded-lg font-mono text-sm">
            Return
          </span>
          <span>Retour</span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
      >
        ✕ Fermer
      </button>
    </div>
  );
};
