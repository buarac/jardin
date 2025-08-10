"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Culture {
  id: string;
  nom: string;
  img: string;
}

interface MobileCultureSelectorProps {
  selectedCultureId: string | null;
  onChange: (cultureId: string) => void;
  className?: string;
}

export const MobileCultureSelector: React.FC<MobileCultureSelectorProps> = ({
  selectedCultureId,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCultures = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/cultures");
        if (!response.ok) {
          throw new Error("Failed to fetch cultures");
        }
        const data = await response.json();
        setCultures(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchCultures();
  }, []);

  const selectedCulture = cultures.find((c) => c.id === selectedCultureId);

  const handleSelect = (cultureId: string) => {
    onChange(cultureId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton de sélection */}
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full p-3 border rounded-lg bg-[var(--color-card)] text-left ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedCulture ? (
              <>
                <img
                  src={`/images/cultures/${selectedCulture.img}`}
                  alt={selectedCulture.nom}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <span className="font-medium">{selectedCulture.nom}</span>
              </>
            ) : (
              <span className="text-[var(--color-text-muted)]">
                Sélectionnez une culture
              </span>
            )}
          </div>
          <span className="text-[var(--color-text-muted)]">▼</span>
        </div>
      </button>

      {/* Dialogue plein écran */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Contenu du dialogue */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-[var(--color-card)]/50 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--color-border)]/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <Dialog.Title className="text-lg font-semibold">
                Sélectionner une culture
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--color-hover)]"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu */}
            <div className="max-h-96 overflow-y-auto bg-[var(--color-card)]/30 rounded-lg m-2">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="text-lg text-[var(--color-accent)]">
                    🔄 Chargement...
                  </div>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <div className="text-lg text-red-500">❌ {error}</div>
                </div>
              ) : (
                <div className="p-2">
                  {cultures.map((culture) => (
                    <button
                      key={culture.id}
                      onClick={() => handleSelect(culture.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedCultureId === culture.id
                          ? "bg-[var(--color-accent)] text-white"
                          : "hover:bg-[var(--color-hover)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`/images/cultures/${culture.img}`}
                          alt={culture.nom}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                        <span className="font-medium">{culture.nom}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
