"use client";

import React, { useState, useEffect } from "react";
import { MobileThemeToggle } from "@/components/mobile/MobileThemeToggle";
import { MobileCollapsibleSection } from "@/components/mobile/MobileCollapsibleSection";
import { MobilePeriodSelector } from "@/components/mobile/MobilePeriodSelector";
import { MobileRecolteTable } from "@/components/mobile/MobileRecolteTable";
import { MobileRecolteForm } from "@/components/mobile/MobileRecolteForm";
import { useMobileRecoltes } from "@/components/hooks/useMobileRecoltes";
import { 
  MobileThemeState, 
  MobilePeriod, 
  MobileCultureData, 
  MobileRecipientData 
} from "@/types/mobile";

export default function MobilePage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // État du thème
  const [themeState, setThemeState] = useState<MobileThemeState>({
    isDarkMode: true,
    theme: "lavande"
  });

  // État de la période
  const [selectedPeriode, setSelectedPeriode] = useState<MobilePeriod>("annee");

  // État des cultures et récipients
  const [cultures, setCultures] = useState<MobileCultureData[]>([]);
  const [selectedCultureId, setSelectedCultureId] = useState("");
  const [recipients, setRecipients] = useState<MobileRecipientData[]>([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);

  // État de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook personnalisé pour les récoltes
  const { recoltes, loading, error, refresh } = useMobileRecoltes(selectedPeriode);

  // Initialisation au montage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gestion du thème
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", themeState.isDarkMode ? "dark" : "light");
  }, [themeState.isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeState.theme);
  }, [themeState.theme]);

  // Chargement des cultures
  useEffect(() => {
    fetch("/api/cultures")
      .then((res) => res.json())
      .then((data) => {
        setCultures(data);
        if (data.length > 0) setSelectedCultureId(data[0].id);
      });
  }, []);

  // Chargement des récipients
  useEffect(() => {
    fetch("/api/recipients")
      .then((res) => res.json())
      .then((data) => setRecipients(data));
  }, []);

  // Gestionnaires d'événements
  const handleThemeChange = (theme: "soleil" | "lavande") => {
    setThemeState(prev => ({ ...prev, theme }));
  };

  const handleDarkModeChange = (isDark: boolean) => {
    setThemeState(prev => ({ ...prev, isDarkMode: isDark }));
  };

  const handlePeriodChange = (period: MobilePeriod) => {
    setSelectedPeriode(period);
  };

  const handleCultureChange = (cultureId: string) => {
    setSelectedCultureId(cultureId);
  };

  const handleRecipientChange = (recipientId: string | null) => {
    setSelectedRecipientId(recipientId);
  };

  const handleRecolteSubmit = async (formData: FormData) => {
    const poids = formData.get("poids")?.toString() ?? "";
    const quantite = formData.get("quantite")?.toString() ?? "";
    const recipient = recipients.find((r) => r.id === selectedRecipientId);
    const poidsBrut = parseFloat(poids);
    const poidsNet = recipient ? Math.max(0, poidsBrut - recipient.poids) : poidsBrut;
    const now = new Date();
    now.setHours(11, 0, 0, 0);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/recoltes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_culture: selectedCultureId,
          date: now.toISOString(),
          poids: poidsNet,
          quantite: 0,
          quantite_fiable: false,
          recipient_id: recipient?.id ?? null,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      alert("✅ Récolte enregistrée avec succès !");
      
      // Rafraîchir les données
      refresh();
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'enregistrement de la récolte.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] p-4 space-y-2 font-sans">
      {/* 🎨 Zone Thèmes + Mode */}
      <MobileThemeToggle
        themeState={themeState}
        onThemeChange={handleThemeChange}
        onDarkModeChange={handleDarkModeChange}
      />

      {/* 🌱 Zone Synthèse des récoltes */}
      <MobileCollapsibleSection
        title="🌱 Synthèse des récoltes"
        icon="🌱"
        defaultOpen={false}
      >
        <MobilePeriodSelector
          selectedPeriod={selectedPeriode}
          onPeriodChange={handlePeriodChange}
        />
        <MobileRecolteTable
          recoltes={recoltes}
          loading={loading}
          error={error}
        />
      </MobileCollapsibleSection>

      {/* ➕ Zone Ajout récolte */}
      <MobileCollapsibleSection
        title="🧺 Nouvelle récolte"
        icon="🧺"
        defaultOpen={true}
      >
        <MobileRecolteForm
          cultures={cultures}
          recipients={recipients}
          selectedCultureId={selectedCultureId}
          selectedRecipientId={selectedRecipientId}
          onCultureChange={handleCultureChange}
          onRecipientChange={handleRecipientChange}
          onSubmit={handleRecolteSubmit}
          isSubmitting={isSubmitting}
        />
      </MobileCollapsibleSection>
    </div>
  );
} 