

import AppLayout from "@/components/AppLayout";

export default function HistoriquePage() {
  return (
    <AppLayout title="Historique" version="v1.0.0" showBack={true}>
      <h1 className="text-xl font-bold mb-4">Statistiques de récolte</h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Évolution des récoltes (30 derniers jours)</h2>
        <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
          [Courbe des récoltes]
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Répartition par type de culture</h2>
        <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
          [Histogramme des cultures]
        </div>
      </div>
    </AppLayout>
  );
}