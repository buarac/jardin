import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const cultures = await prisma.culture.findMany();

  for (const culture of cultures) {
    const isPoidsUnite = culture.mode_recolte === 'poids_unite';

    const nbRecoltes = faker.number.int({ min: 5, max: 10 });

    for (let i = 0; i < nbRecoltes; i++) {
      const date = faker.date.recent({ days: 60 });
      const poids = faker.number.int({ min: 100, max: 1500 });

      let quantite: number = 0;
      let quantite_fiable: boolean = false;

      if (isPoidsUnite) {
        const withQuantite = Math.random() < 0.8; // 80% des cas avec quantité fiable
        if (withQuantite) {
          quantite = faker.number.int({ min: 1, max: 10 });
          quantite_fiable = true;
        } else {
          quantite = 0;
          quantite_fiable = false;
        }
      }

      await prisma.recolte.create({
        data: {
          id_culture: culture.id,
          date,
          poids,
          quantite,
          quantite_fiable,
        },
      });
    }

    console.log(`✅ Récoltes générées pour ${culture.nom}`);
  }

  console.log('✅ Insertion des récoltes terminée.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
