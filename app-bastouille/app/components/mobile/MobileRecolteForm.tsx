"use client";

import React, { useState, useEffect } from "react";
import { MobileCultureSelector } from "./MobileCultureSelector";
import { MobileRecipientSelector } from "./MobileRecipientSelector";
import {
  MobileCultureData,
  MobileRecipientData,
  MobileFormState,
} from "@/types/mobile";

interface MobileRecolteFormProps {
  cultures: MobileCultureData[];
  recipients: MobileRecipientData[];
  selectedCultureId: string;
  selectedRecipientId: string;
  onCultureChange: (cultureId: string) => void;
  onRecipientChange: (recipientId: string) => void;
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
  const [formState, setFormState] = useState<MobileFormState>({
    poids: "",
    quantite: "",
  });

  const selectedCulture = cultures.find((c) => c.id === selectedCultureId);

  // Validation du formulaire
  const isFormValid =
    selectedCultureId &&
    selectedRecipientId &&
    formState.poids.trim() !== "" &&
    !isNaN(parseFloat(formState.poids)) &&
    parseFloat(formState.poids) > 0;

  const handleInputChange = (field: keyof MobileFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation manuelle avant soumission
    if (!isFormValid) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    onSubmit(formData);

    // Reset form after submission
    setFormKey((prev) => prev + 1);
    setFormState({ poids: "", quantite: "" });
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
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <form
        key={formKey}
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit}
      >
        {/* Sélecteur de culture */}
        <div className="w-full max-w-sm">
          <MobileCultureSelector
            selectedCultureId={selectedCultureId}
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
            value={formState.poids}
            onChange={(e) => handleInputChange("poids", e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
            required
          />
          <input
            name="quantite"
            type="number"
            inputMode="numeric"
            placeholder="Unités"
            value={formState.quantite}
            onChange={(e) => handleInputChange("quantite", e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
            disabled={selectedCulture?.mode_recolte !== "poids_unite"}
          />
        </div>

        {/* Sélecteur de récipient */}
        <div className="w-full max-w-sm">
          <MobileRecipientSelector
            selectedRecipientId={selectedRecipientId}
            onChange={onRecipientChange}
          />
        </div>

        {/* Indicateur de validation */}
        {!isFormValid && (
          <div className="text-xs text-amber-600 dark:text-amber-400 text-center">
            {!selectedCultureId && "⚠️ Sélectionnez une culture"}
            {!selectedRecipientId && "⚠️ Sélectionnez un récipient"}
            {formState.poids.trim() === "" && "⚠️ Entrez un poids"}
            {formState.poids.trim() !== "" &&
              parseFloat(formState.poids) <= 0 &&
              "⚠️ Le poids doit être supérieur à 0"}
          </div>
        )}

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
          className={`px-6 py-3 rounded-full font-semibold shadow transition-all duration-200 ${
            isFormValid
              ? "bg-[var(--color-accent)] hover:brightness-90 text-[var(--color-base)]"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "⏳ Ajout en cours..." : "+ Ajouter la récolte"}
        </button>
      </form>
    </div>
  );
};
