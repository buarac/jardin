import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cultures = [
    { id: "a1f4294d-40c6-4d6f-a6e4-15d05ecf3973", nom: "Abricot", img: "abricot.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "b2d97f4e-1c7a-4f5e-8e13-7c2e7c3b8d0a", nom: "Ail", img: "ail.png", categorie: "aromatique", mode_recolte: "poids_unite" },
    { id: "b7e0a85b-6d9e-4e8e-8e72-5c8f8b1d2e5f", nom: "Aubergine", img: "aubergine.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "b8c1e2f7-8a6e-4a7e-9e8e-2e7c6b8d0e1f", nom: "Basilic", img: "basilic.png", categorie: "aromatique", mode_recolte: "poids" },
    { id: "c1d9e3f4-7b6e-4c8e-8e13-3c2e8b7d1f5a", nom: "Betterave", img: "betterave.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "c2e1f3a4-5b7e-4d8e-9e14-2d3e9b8c1e6f", nom: "Carotte", img: "carotte.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "c3f2a4b5-6c8e-4e9e-8e15-4e5f9c2d1b7a", nom: "Céleri feuille", img: "celeri_feuille.png", categorie: "legume", mode_recolte: "poids" },
    { id: "c4a3b5c6-7d8e-4f1e-9e16-5e6a1d3b2c8f", nom: "Céleri rave", img: "celeri_rave.png", categorie: "legume", mode_recolte: "poids" },
    { id: "c5b4c6d7-8e9e-4a2e-8e17-6e7b2f4c3a9d", nom: "Cerise", img: "cerise.png", categorie: "fruit", mode_recolte: "poids" },
    { id: "c6c5d7e8-9f1e-4b3e-9e18-7e8c3a5d4b0e", nom: "Concombre", img: "concombre.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "c7d6e8f9-a2ea-4c4e-8e19-8e9d4b6e5c1f", nom: "Courgette", img: "courgette.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "c8e7f9a1-b3e1-4d5e-9e20-9e0e5c7f6d2b", nom: "Fraise", img: "fraise.png", categorie: "fruit", mode_recolte: "poids" },
    { id: "c9f8a1b2-c4ee-4e6e-8e21-0e1f6d8a7e3c", nom: "Framboise", img: "framboise.png", categorie: "fruit", mode_recolte: "poids" },
    { id: "d1a9b2c3-d5ef-4f7e-9e22-1e2a7e9b8f4d", nom: "Haricot vert", img: "haricot_vert.png", categorie: "legume", mode_recolte: "poids" },
    { id: "d2b0c3d4-e6eb-4a8e-8e23-2e3b8f1c9e5a", nom: "Kiwi", img: "kiwi.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "d3c1d4e5-f7e1-4b9e-9e24-3e4c9a2d0e6f", nom: "Melon", img: "melon.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "d4d2e5f6-08e1-4c1e-8e25-4e5d0b3e1f7a", nom: "Mûre", img: "mure.png", categorie: "fruit", mode_recolte: "poids" },
    { id: "d5e3f6a7-19e1-4d2e-9e26-5e6e1c4f2a8b", nom: "Oignon", img: "oignon.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "d6f4a7b8-2ae1-4e3e-8e27-6e7f2d5a3b9c", nom: "Pastèque", img: "pasteque.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "d7a5b8c9-3be1-4f4e-9e28-7e8a3e6b4c0d", nom: "Patate douce", img: "patate_douce.png", categorie: "legume", mode_recolte: "poids" },
    { id: "d8b6c9d0-4ced-4a5e-8e29-8e9b4f7c5d1e", nom: "Pêche", img: "peche.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "d9c7d0e1-5dea-4b6e-9e30-9e0c5a8d6e2f", nom: "Persil", img: "persil.png", categorie: "aromatique", mode_recolte: "poids" },
    { id: "e1d8e1f2-6ee1-4c7e-8e31-0e1d6b9e7f3a", nom: "Petit pois", img: "petit_pois.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "e2e9f2a3-7fe1-4d8e-9e32-1e2e7c0f8a4b", nom: "Poire", img: "poire.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "e3f0a3b4-80e1-4e9e-8e33-2e3f8d1a9b5c", nom: "Poireau", img: "poireau.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "e4a1b4c5-91eb-4f1e-9e34-3e4a9e2b0c6d", nom: "Poivron", img: "poivron.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "e5b2c5d6-a2e1-4a2e-8e35-4e5b0d3f1e7a", nom: "Pomme", img: "pomme.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "e6c3d6e7-b3e1-4b3e-9e36-5e6c1e4a2b8f", nom: "Pomme de terre", img: "pomme_de_terre.png", categorie: "legume", mode_recolte: "poids" },
    { id: "e7d4e7f8-c4e1-4c4e-8e37-6e7d2f5b3c9a", nom: "Radis", img: "radis.png", categorie: "legume", mode_recolte: "poids" },
    { id: "e8e5f8a9-d5e1-4d5e-9e38-7e8e3a6c4d0b", nom: "Raisin", img: "raisin.png", categorie: "fruit", mode_recolte: "poids_unite" },
    { id: "e9f6a9b0-e6e1-4e6e-8e39-8e9f4b7d5e1c", nom: "Salade Laitue", img: "salade_laitue.png", categorie: "legume", mode_recolte: "poids_unite" },
    { id: "f1a7b0c1-f7e1-4f7e-9e40-9e0a5c8e6f2d", nom: "Thym", img: "thym.png", categorie: "aromatique", mode_recolte: "poids" },
    { id: "f2b8c1d2-08e1-4a8e-8e41-0e1b6d9f7a3b", nom: "Tomate", img: "tomate.png", categorie: "legume", mode_recolte: "poids" },
    { id: "f3c9d2e3-19e1-4b9e-9e42-1e2c7e0a8b4c", nom: "Tomate Cerise", img: "tomate_cerise.png", categorie: "legume", mode_recolte: "poids" }
  ];

  for (const culture of cultures) {
    await prisma.culture.upsert({
      where: { id: culture.id },
      update: {},
      create: culture,
    });
  }
  console.log('✅ Données de culture insérées.');

  const recipients = [
    { id: "b1b1c5b5-bdee-4cf0-a4c3-bd26b3a2cc14", nom: "Plastique noir", img: "rec_noir.png", poids: 84 },
    { id: "c2c2d6d6-ceee-4df1-b4d3-cd37b3a2cc15", nom: "Bois", img: "rec_bois.png", poids: 770 }
  ];

  for (const recipient of recipients) {
    await prisma.recipient.upsert({
      where: { id: recipient.id },
      update: {},
      create: recipient,
    });
  }

  console.log('✅ Données de récipients insérées.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });