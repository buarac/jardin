import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import NewRecolteForm from "@/components/NewRecolteForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";


/**
 * Page to create a new harvest. It loads all cultures from the database to
 * populate the selection dropdown and passes the optional preselected
 * culture ID to the client form via search parameters (e.g. ?cultureId=...).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewRecoltePage(props: any) {
  const { searchParams } = props as { searchParams?: Record<string, string | string[] | undefined> };
  const cultures = await prisma?.culture.findMany({ orderBy: { nom: "asc" } });
  const defaultCultureIdParam = searchParams?.cultureId;
  const defaultCultureId = Array.isArray(defaultCultureIdParam)
    ? defaultCultureIdParam[0]
    : defaultCultureIdParam;
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Nouvelle récolte" backHref="/" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {cultures && cultures.length > 0 ? (
          <NewRecolteForm cultures={cultures} defaultCultureId={defaultCultureId} />
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Aucune culture disponible. Veuillez créer d&apos;abord une culture.
          </p>
        )}
      </main>
      <FooterNav />
    </div>
  );
}