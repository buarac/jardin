import AppLayout from "@/components/AppLayout";

const mockCultures = Array.from({ length: 40 }, (_, i) => ({
  name: ["Tomates", "Fraisiers", "Concombres", "Carottes", "Radis"][i % 5],
  quantity: `${(Math.random() * 2 + 0.5).toFixed(1)} kg`,
}));

export default function CulturePage() {
  return (
    <AppLayout title="Cultures" version="v1.0.0" showBack={true}>
      <h1 className="text-xl font-bold mb-4">Liste des cultures</h1>
      <div className="h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <ul className="space-y-2">
          {mockCultures.map((culture, index) => (
            <li key={index} className="bg-green-100 p-3 rounded shadow">
              <p className="font-semibold">{culture.name}</p>
              <p className="text-sm text-gray-600">
                Quantité en stock : {culture.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}