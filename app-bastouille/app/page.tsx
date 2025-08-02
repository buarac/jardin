// SafeAreaDebug: affiche les valeurs des safe-area-inset côté client
import { Thermometer, Droplets, Wind, Sun, CloudRain } from "lucide-react";
import { Header } from "@/components/Header";

interface Recolte {
  id: number;
  id_culture: string;
  date: string;
  poids: number;
  quantite: number | null;
  temperature: number | null;
  humidite: number | null;
  vent: number | null;
  indice_uv: number | null;
  qte_pluie: number | null;
  culture: {
    id: string;
    nom: string;
    img: string | null;
    categorie: string;
    mode_recolte: string;
  };
}

async function getLastRecoltes(): Promise<Recolte[]> {
  // During build time there is no local server running, therefore fetching from
  // relative URL returns an empty array. At runtime Next.js proxies the
  // request to the internal API routes.
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/recoltes?limit=5`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as Recolte[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  const recoltes = await getLastRecoltes();
  const [latest, ...others] = recoltes;
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Accueil" />
      <div className="p-4 space-y-4">
        {latest && (
          <>
            <h2 className="font-semibold">Dernière récolte</h2>
            <div className="p-4 rounded-lg bg-skin-card shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Infos principales encadrées */}
                <div className="flex-1 space-y-2">
                  <div className="bg-skin-muted/10 p-2 rounded-md border border-skin-muted flex items-center gap-4">
                    {latest.culture.img && (
                      <div className="flex-[1_1_33%] flex justify-center items-center">
                        <img
                          src={`/images/cultures/${latest.culture.img}`}
                          alt={latest.culture.nom}
                          className="w-24 h-24 object-contain rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-[1_1_67%] space-y-1">
                      <div className="text-lg text-skin-accent font-medium">
                        {latest.culture.nom}
                      </div>
                      <div className="text-sm text-skin-accent/70 flex items-center gap-2">
                        <span>
                          {new Date(latest.date).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="text-skin-text">
                          {latest.poids / 1000} kg
                          {latest.culture.mode_recolte === "poids_unite" &&
                          latest.quantite !== null
                            ? ` • ${latest.quantite} unités`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-skin-muted/10 p-2 rounded-md border border-skin-muted">
                    <div className="grid grid-cols-5 gap-x-2 text-sm">
                      {latest.temperature !== null && (
                        <span className="flex flex-col items-center">
                          <Thermometer className="w-5 h-5 text-skin-accent" />
                          <span>{latest.temperature}°C</span>
                        </span>
                      )}
                      {latest.humidite !== null && (
                        <span className="flex flex-col items-center">
                          <Droplets className="w-5 h-5 text-skin-accent" />
                          <span>{latest.humidite}%</span>
                        </span>
                      )}
                      {latest.vent !== null && (
                        <span className="flex flex-col items-center">
                          <Wind className="w-5 h-5 text-skin-accent" />
                          <span>{latest.vent} km/h</span>
                        </span>
                      )}
                      {latest.indice_uv !== null && (
                        <span className="flex flex-col items-center">
                          <Sun className="w-5 h-5 text-skin-accent" />
                          <span>{latest.indice_uv}</span>
                        </span>
                      )}
                      {latest.qte_pluie !== null && (
                        <span className="flex flex-col items-center">
                          <CloudRain className="w-5 h-5 text-skin-accent" />
                          <span>{latest.qte_pluie} mm</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {others.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold">Autres récoltes</h2>
            {others.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-lg bg-skin-card flex items-center gap-4 shadow-sm"
              >
                {rec.culture.img && (
                  <img
                    src={`/images/cultures/${rec.culture.img}`}
                    alt={rec.culture.nom}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-sm">{rec.culture.nom}</div>
                  <div className="text-xs text-skin-text/70">
                    {new Date(rec.date).toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <div className="text-sm">
                  {rec.poids / 1000} kg
                  {rec.culture.mode_recolte === "poids_unite" &&
                  rec.quantite !== null
                    ? ` • ${rec.quantite}`
                    : ""}
                </div>
              </div>
            ))}
          </div>
        )}
        {recoltes.length === 0 && (
          <p className="text-sm text-skin-text/70">
            Aucune récolte pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
