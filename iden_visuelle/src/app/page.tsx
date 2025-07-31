export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 space-y-6 font-sans">
      {/* Titre */}
      <h1 className="text-3xl font-bold tracking-tight">Mes récoltes 🍅</h1>

      {/* Image principale */}
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img
          src="https://source.unsplash.com/800x300/?garden,vegetables"
          alt="Potager"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Liste de box */}
      <div className="space-y-4">
        <div className="bg-card p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold">Tomates</div>
            <div className="text-sm text-muted-foreground">2.4 kg récoltés</div>
          </div>
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            Légume
          </span>
        </div>

        <div className="bg-card p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold">Fraises</div>
            <div className="text-sm text-muted-foreground">1.2 kg récoltés</div>
          </div>
          <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
            Fruit
          </span>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex space-x-4">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition">
          Ajouter une récolte
        </button>
        <button className="border border-border text-sm px-4 py-2 rounded-lg hover:bg-muted transition">
          Voir tout
        </button>
      </div>
    </main>
  );
}