import { Header } from "@/components/Header";
import { RecolteEditForm } from "@/components/RecolteEditForm";

interface Culture {
  id: string;
  nom: string;
  img: string | null;
  mode_recolte: string;
}

interface RecolteResponse {
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
  culture: Culture;
}

interface PageProps {
  params: { id: string };
}

async function getRecolte(id: string): Promise<RecolteResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/recoltes/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch recolte");
  return (await res.json()) as RecolteResponse;
}

async function getCultures(): Promise<Culture[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/cultures`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch cultures");
  return (await res.json()) as any;
}

export default async function RecolteEditPage({ params }: PageProps) {
  const recolte = await getRecolte(params.id);
  const cultures = await getCultures();
  // Simplify cultures for the form
  const simplified = cultures.map((c: any) => ({
    id: c.id,
    nom: c.nom,
    img: c.img,
    mode_recolte: c.mode_recolte,
  }));
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Modifier la récolte" backHref="/recoltes" />
      <RecolteEditForm initialData={recolte} cultures={simplified} />
    </div>
  );
}
