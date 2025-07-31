import FooterNav from "@/components/FooterNav";
import Header from "@/components/Header";
import NewCultureForm from "@/components/NewCultureForm";

export const dynamic = "force-dynamic";

/**
 * Page for creating a new culture. Presents the creation form and navigates
 * back to the cultures list after submission.
 */
export default function NewCulturePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Nouvelle culture" backHref="/cultures" />
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <NewCultureForm />
      </main>
      <FooterNav />
    </div>
  );
}