import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import StatsPageClient from "@/components/StatsPageClient";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Statistics page. It retrieves all harvest years from the database and
 * delegates the interactive display to the client component. If there are
 * no harvests yet a message is displayed instead of the selector.
 */
export default async function StatistiquesPage() {
  // Fetch all dates and extract unique years
  const dates = await prisma?.recolte.findMany({ select: { date: true } });
  const yearsSet = new Set<number>();
  dates?.forEach((d) => {
    const year = new Date(d.date).getFullYear();
    yearsSet.add(year);
  });
  const years = Array.from(yearsSet).sort((a, b) => b - a);
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Statistiques" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {years.length === 0 ? (
          <p className="text-center text-muted-foreground mt-8">
            Aucune récolte enregistrée. Les statistiques apparaîtront une fois
            vos premières récoltes ajoutées.
          </p>
        ) : (
          <StatsPageClient years={years} />
        )}
      </main>
      <FooterNav />
    </div>
  );
}