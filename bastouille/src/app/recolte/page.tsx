

import AppLayout from "@/components/AppLayout";

export default function RecoltePage() {
  return (
    <AppLayout title="Récolte" version="v1.0.0" showBack={true}>
      <h1 className="text-xl font-bold mb-4">Bienvenue sur la page Récolte</h1>

      <button className="px-4 py-2 bg-green-500 text-white rounded mb-4">
        Ajouter une récolte
      </button>

      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold">Dernière récolte</h2>
        <p>Tomates - 1,5 kg - 28 juillet 2025</p>
      </div>

      <ul className="list-disc pl-5">
        <li>Fraisiers - 500g</li>
        <li>Concombres - 2kg</li>
        <li>Carottes - 3kg</li>
      </ul>
    </AppLayout>
  );
}