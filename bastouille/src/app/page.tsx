import AppLayout from "@/components/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <AppLayout title="Bastouille" version="v1.0.0" showBack={false}>
      <div className="flex bg-neutral-100">
        <div className="bg-neutral-300">
          <img src="https://placehold.co/64x64.png?text=🍆" />
        </div>
        <div className="flex-col  bg-neutral-300 w-64 px-4 py-4">
          <div className="">Titre</div>
          <div className="">Sous-titre</div>
        </div>
        <div className="bg-neutral-300 flex-auto">Droit</div>
      </div>
    </AppLayout>
  );
}
