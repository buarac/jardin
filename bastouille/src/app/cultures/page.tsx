import AppLayout from "@/components/AppLayout";

const cultures = [
  {
    id: "0a3e137b-7f20-482d-b4f7-82aa3137f90a",
    nom: "Abricot",
    categorie: "fruit",
    img: "abricot.png",
  },
  {
    id: "822d2dd9-8138-40c4-aef2-9a2b4baf649c",
    nom: "Ail",
    categorie: "legume",
    img: "ail.png",
  },
  {
    id: "5858b26c-ba6c-4263-ac9e-cc1b50cf6844",
    nom: "Aubergine",
    categorie: "legume",
    img: "aubergine.png",
  },
  {
    id: "544cb121-9d23-4e71-9f41-1dbc36c56cc0",
    nom: "Basilic",
    categorie: "aromatique",
    img: "basilic.png",
  },
  {
    id: "100e67c2-d5e3-4b2d-bc3e-ef87045f61df",
    nom: "Betterave",
    categorie: "legume",
    img: "betterave.png",
  },
  {
    id: "ef4569b3-e012-4843-bf71-e70615d989ce",
    nom: "Carotte",
    categorie: "legume",
    img: "carotte.png",
  },
  {
    id: "97a98e2f-cf87-4947-8779-0eaf359ffd43",
    nom: "Celeri feuille",
    categorie: "legume",
    img: "celeri_feuille.png",
  },
  {
    id: "a937945d-0ef2-4b2f-9128-eabe1d58a041",
    nom: "Celeri rave",
    categorie: "legume",
    img: "celeri_rave.png",
  },
  {
    id: "06735f12-56a4-4e8a-916b-772f7da05d8c",
    nom: "Cerise",
    categorie: "fruit",
    img: "cerise.png",
  },
  {
    id: "317762f5-5e66-4297-b08c-fad382b00cfe",
    nom: "Concombre",
    categorie: "legume",
    img: "concombre.png",
  },
  {
    id: "c56e3b6f-584e-4012-8a93-1dd412798760",
    nom: "Courgette",
    categorie: "legume",
    img: "courgette.png",
  },
  {
    id: "50cba853-f190-48df-a58a-296c7b323ff2",
    nom: "Fraise",
    categorie: "fruit",
    img: "fraise.png",
  },
  {
    id: "631738bf-90b6-4d65-bcf3-f762854c4e72",
    nom: "Framboise",
    categorie: "fruit",
    img: "framboise.png",
  },
  {
    id: "c6999e2e-36a8-48d1-adad-1db053b32c79",
    nom: "Haricot vert",
    categorie: "legume",
    img: "haricot_vert.png",
  },
  {
    id: "78fb12e6-f555-470b-9fed-17f3bd2108c6",
    nom: "Kiwi",
    categorie: "fruit",
    img: "kiwi.png",
  },
  {
    id: "d1d6b99f-a370-4fa5-af9a-b11a2f2e60a4",
    nom: "Melon",
    categorie: "fruit",
    img: "melon.png",
  },
  {
    id: "5aa4b713-6866-4aa7-8694-cd625b286036",
    nom: "Mure",
    categorie: "fruit",
    img: "mure.png",
  },
  {
    id: "687ae18b-5ad4-4e22-9600-1aa78a62d3c8",
    nom: "Oignon",
    categorie: "legume",
    img: "oignon.png",
  },
  {
    id: "04097b6b-4ad8-4110-9838-cb42b15a53c6",
    nom: "Pasteque",
    categorie: "fruit",
    img: "pasteque.png",
  },
  {
    id: "23a6d4f7-722b-4c9a-8dbb-8d42faeb2fe6",
    nom: "Patate douce",
    categorie: "legume",
    img: "patate_douce.png",
  },
];

export default function CulturePage() {
  return (
    <AppLayout title="Cultures" version="v1.0.0" showBack={true}>
      <h1 className="text-xl font-bold mb-4">Liste des cultures</h1>
      <div className="flex-grow overflow-y-auto pr-2">
        <ul className="space-y-2">
          {cultures.map((culture) => (
            <li key={culture.id} className="flex items-center gap-4 bg-green-100 p-3 rounded shadow">
              <img
                src={`/cultures/${culture.img.replace(".png", "")}.png`}
                alt={culture.nom}
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="font-semibold">{culture.nom}</p>
                <p className="text-sm text-gray-600">{culture.categorie}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}