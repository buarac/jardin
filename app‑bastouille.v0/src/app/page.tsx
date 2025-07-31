import { HarvestCardLarge, HarvestCardSmall } from "@/components/HarvestCard";
import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import { prisma } from "@/lib/db";

// Disable static prerendering for this page. The home page queries the
// database; during `next build` there is no PostgreSQL server running in
// the container, which would cause the build to fail. Forcing dynamic
// rendering ensures the page is generated at runtime when the database is
// available.
export const dynamic = "force-dynamic";

/**
 * Home page displaying the most recent harvests. The very latest harvest is
 * shown in a large card with full details while the next three are listed
 * underneath. If there are no harvests yet, a friendly message invites
 * users to add their first harvest.
 */
export default async function Home() {
  // Fetch the four most recent harvests along with their related cultures.
  const harvests = await prisma?.recolte.findMany({
    orderBy: { date: "desc" },
    take: 4,
    include: { culture: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Baštouille" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4">
        {harvests && harvests.length > 0 ? (
          <>
            <HarvestCardLarge harvest={harvests[0]} />
            {harvests.slice(1).map((h) => (
              <HarvestCardSmall key={h.id} harvest={h} />
            ))}
          </>
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Aucune récolte pour le moment. Cliquez sur &quot;Récolte&quot; pour en
            ajouter une.
          </p>
        )}
      </main>
      <FooterNav />
    </div>
  );
}