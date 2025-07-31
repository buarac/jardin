import Image from "next/image";
import Link from "next/link";
import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import { prisma } from "@/lib/db";
import { ModeRecolte } from "@/lib/prisma/client";

// Force dynamic rendering to avoid database access during build
export const dynamic = "force-dynamic";

/**
 * Displays the list of all cultures stored in the database. Each culture
 * shows its illustration, name, category and harvesting mode. Clicking on a
 * culture takes the user to its detail page where it can be edited. A
 * button at the bottom allows adding a new culture.
 */
export default async function CulturesPage() {
  const cultures = await prisma?.culture.findMany({ orderBy: { nom: "asc" } });

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Cultures" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-3">
        {cultures && cultures.length > 0 ? (
          cultures.map((culture) => (
            <Link
              key={culture.id}
              href={`/cultures/${culture.id}`}
              className="flex items-center gap-4 p-3 bg-white rounded-lg border border-border shadow hover:bg-muted transition-colors"
            >
              <Image
                src={`/cultures/${culture.img || "placeholder.png"}`}
                alt={culture.nom}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-kaki-dark">
                  {culture.nom}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {culture.categorie} – {culture.modeRecolte === ModeRecolte.poids ? "Poids" : "Poids + unité"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Aucune culture pour le moment.
          </p>
        )}
        <div className="pt-4">
          <Link
            href="/cultures/new"
            className="block text-center bg-gold text-white font-medium py-2 rounded-md shadow hover:bg-gold-dark transition-colors"
          >
            Ajouter une culture
          </Link>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}