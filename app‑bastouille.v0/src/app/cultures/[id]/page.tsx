import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import CultureDetail from "@/components/CultureDetail";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";


/**
 * Page that shows the detail and editing form for a specific culture. If
 * the culture ID is not found a 404 page is rendered. The form itself is
 * implemented in a client component (CultureDetail) to allow for stateful
 * edits and submission.
 */
/*
 * The `params` object is injected by Next.js and contains the dynamic
 * segment of the route. We intentionally leave the type unspecific here
 * because Next.js defines its own PageProps constraint which does not
 * accept our stricter type. We destructure `params` and cast the id to
 * string for clarity.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CultureDetailPage({ params }: any) {
  const { id } = params as { id: string };
  const culture = await prisma?.culture.findUnique({ where: { id } });
  if (!culture) {
    notFound();
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Back arrow navigates back to the cultures list */}
      <Header title={culture!.nom} backHref="/cultures" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <CultureDetail culture={culture!} />
      </main>
      <FooterNav />
    </div>
  );
}