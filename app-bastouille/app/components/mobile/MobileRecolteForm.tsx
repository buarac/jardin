"use client";

import React, { useState, useEffect } from "react";
import CultureSelector from "@/components/CultureSelector";
import RecipientSelector from "@/components/RecipientSelector";
import { MobileCultureData, MobileRecipientData } from "@/types/mobile";

interface MobileRecolteFormProps {
  cultures: MobileCultureData[];
  recipients: MobileRecipientData[];
  selectedCultureId: string;
  selectedRecipientId: string | null;
  onCultureChange: (cultureId: string) => void;
  onRecipientChange: (recipientId: string | null) => void;
  onSubmit: (formData: FormData) => void;
  isSubmitting?: boolean;
  className?: string;
}

export const MobileRecolteForm: React.FC<MobileRecolteFormProps> = ({
  cultures,
  recipients,
  selectedCultureId,
  selectedRecipientId,
  onCultureChange,
  onRecipientChange,
  onSubmit,
  isSubmitting = false,
  className = "",
}) => {
  const [formKey, setFormKey] = useState(0);
  const selectedCulture = cultures.find((c) => c.id === selectedCultureId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
    
    // Reset form after submission
    setFormKey(prev => prev + 1);
  };

  const handlePhotoClick = () => {
    alert("Prise de photo pas encore implémentée");
  };

  // Auto-select first culture if none selected
  useEffect(() => {
    if (cultures.length > 0 && !selectedCultureId) {
      onCultureChange(cultures[0].id);
    }
  }, [cultures, selectedCultureId, onCultureChange]);

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <form
        key={formKey}
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit}
      >
        {/* Sélecteur de culture */}
        <div className="flex pd-2 w-full max-w-sm rounded bg-[var(--color-card)] text-[var(--color-text)]">
          <CultureSelector
            value={selectedCultureId}
            onChange={onCultureChange}
          />
        </div>

        {/* Champs poids et quantité */}
        <div className="flex gap-2 w-full">
          <input
            name="poids"
            type="number"
            step="1"
            inputMode="numeric"
            placeholder="Poids (g)"
            className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
            required
          />
          <input
            name="quantite"
            type="number"
            inputMode="numeric"
            placeholder="Unités"
            className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
            disabled={selectedCulture?.mode_recolte !== "poids_unite"}
          />
        </div>

        {/* Sélecteur de récipient */}
        <div className="flex pd-2 w-full max-w-sm rounded bg-[var(--color-card)] text-[var(--color-text)]">
          <RecipientSelector
            value={selectedRecipientId}
            onChange={onRecipientChange}
          />
        </div>

        {/* Bouton photo */}
        <button
          type="button"
          className="px-6 py-2 rounded-full border border-dashed border-[var(--color-text)] text-sm hover:bg-[var(--color-muted)] transition-colors duration-200"
          onClick={handlePhotoClick}
        >
          📸 Prendre une photo
        </button>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-[var(--color-accent)] hover:brightness-90 text-[var(--color-base)] font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "⏳ Ajout en cours..." : "+ Ajouter la récolte"}
        </button>
      </form>
    </div>
  );
};
