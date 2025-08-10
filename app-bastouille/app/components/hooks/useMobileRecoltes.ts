import { useState, useEffect, useCallback } from "react";
import { MobileRecolteData, MobilePeriod } from "@/types/mobile";

interface UseMobileRecoltesReturn {
  recoltes: MobileRecolteData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useMobileRecoltes(
  periode: MobilePeriod
): UseMobileRecoltesReturn {
  const [recoltes, setRecoltes] = useState<MobileRecolteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecoltes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/recoltes/synthese?limit=5&periode=${periode}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      const cumuls = data
        .filter((item: any) => item?.culture?.nom && item?.culture?.img)
        .map((item: any) => ({
          nom: item.culture.nom,
          img: item.culture.img,
          poids: item.poids,
        }));

      setRecoltes(cumuls);
    } catch (err) {
      console.error("Erreur lors de la récupération des récoltes:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [periode]);

  useEffect(() => {
    fetchRecoltes();
  }, [fetchRecoltes]);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(fetchRecoltes, 30000);
    return () => clearInterval(interval);
  }, [fetchRecoltes]);

  return {
    recoltes,
    loading,
    error,
    refresh: fetchRecoltes,
  };
}
