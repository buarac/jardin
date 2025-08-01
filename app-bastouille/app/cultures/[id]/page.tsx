import { Header } from "@/components/Header";
import { CultureDetails } from "@/components/CultureDetails";

interface CultureResponse {
  id: string;
  nom: string;
  img: string | null;
  categorie: string;
  mode_recolte: string;
}

interface PageProps {
  params: { id: string };
}

/**
 * Fetch a single culture by id. When running in a server context
 * the NEXT_PUBLIC_BASE_URL may be undefined. In that case the relative
 * route will be resolved by Next.js at runtime.
 */
async function getCulture(id: string): Promise<CultureResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/cultures/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch culture');
  }
  return (await res.json()) as CultureResponse;
}

export default async function CulturePage({ params }: PageProps) {
  const culture = await getCulture(params.id);
  return (
    <div className="flex flex-col min-h-full">
      <Header title={culture.nom} backHref="/cultures" />
      <CultureDetails initialData={culture} />
    </div>
  );
}