"use client"
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import { TVPeriodButton } from "@/components/TVPeriodButton";
import { TVCultureCard } from "@/components/TVCultureCard";
import { TVFocusDebugger } from '@/components/TVFocusDebugger';

interface Culture {
  nom: string;
  img: string;
  poids: number;
}

export default function TVJobsPage() {
  const [recoltesCumulees, setRecoltesCumulees] = useState<Culture[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("annee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔄 Récupération des données pour la période: ${selectedPeriode}`);
      
      const response = await fetch(`/api/recoltes/synthese?periode=${selectedPeriode}&limit=12`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Données reçues:', data);
      
      const result = data
        .filter((item: any) => item?.culture?.nom && item?.culture?.img)
        .map((item: any) => ({
          nom: item.culture.nom,
          img: item.culture.img,
          poids: item.poids,
        }));
      
      console.log('🎯 Cultures filtrées:', result);
      setRecoltesCumulees(result);
      
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des données:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriode]);

  useEffect(() => {
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [selectedPeriode]);

  const handlePeriodeChange = (periode: string) => {
    console.log(`🔄 Changement de période: ${periode}`);
    setSelectedPeriode(periode);
  };

  return (
    <>
      <SplashScreen />
      
      {/* Debugger TV */}
      <TVFocusDebugger />

      <div className="min-h-screen p-16">
        {/* Navigation des périodes */}
        <div className="flex justify-center gap-6 mb-12 w-full max-w-screen-xl mx-auto text-[var(--color-accent)]">
          <TVPeriodButton
            value="annee"
            isSelected={selectedPeriode === "annee"}
            onClick={() => handlePeriodeChange("annee")}
          >
            Année
          </TVPeriodButton>
          <TVPeriodButton
            value="mois"
            isSelected={selectedPeriode === "mois"}
            onClick={() => handlePeriodeChange("mois")}
          >
            Mois
          </TVPeriodButton>
          <TVPeriodButton
            value="semaine"
            isSelected={selectedPeriode === "semaine"}
            onClick={() => handlePeriodeChange("semaine")}
          >
            Semaine
          </TVPeriodButton>
          <TVPeriodButton
            value="jour"
            isSelected={selectedPeriode === "jour"}
            onClick={() => handlePeriodeChange("jour")}
          >
            Jour
          </TVPeriodButton>
        </div>

        {/* État de chargement et erreurs */}
        {loading && (
          <div className="text-center text-2xl text-[var(--color-accent)] mb-8">
            🔄 Chargement des données...
          </div>
        )}
        
        {error && (
          <div className="text-center text-2xl text-red-500 mb-8">
            ❌ Erreur: {error}
          </div>
        )}

        {/* Grille des cultures */}
        {recoltesCumulees.length > 0 ? (
          <div className="grid grid-cols-4 gap-8">
            {recoltesCumulees.map((item, index) => (
              <TVCultureCard
                key={`${item.nom}-${index}`}
                culture={item}
                index={index}
              />
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="text-center text-2xl text-[var(--color-text)]">
            📭 Aucune culture trouvée pour cette période
          </div>
        ) : null}
      </div>
    </>
  );
}
