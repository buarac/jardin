import { Metadata } from "next";
import LogJobsPage from "@/desktop/jobs/page";

export const metadata: Metadata = {
  title: "Jobs météo — TV",
  description: "Suivi des jobs météo pour affichage TV.",
};

export default function TVJobsPage() {
  return (
    <div className="text-3xl p-10 bg-black text-black min-h-screen">
      <LogJobsPage />
    </div>
  );
}
