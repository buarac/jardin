


import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";
import { fr } from "date-fns/locale";

const prisma = new PrismaClient();

const recoltesDataRaw = `
1-mai-25	Fraise	420
3-mai-25	Fraise	504
5-mai-25	Fraise	326
7-mai-25	Fraise	218
11-mai-25	Fraise	691
12-mai-25	Fraise	695
14-mai-25	Fraise	740
18-mai-25	Fraise	896
21-mai-25	Fraise	576
7-juin-25	Framboise	100
7-juin-25	Fraise	200
8-juin-25	Framboise	100
10-juin-25	Fraise	100
11-juin-25	Framboise	285
16-juin-25	Framboise	1242
16-juin-25	Fraise	208
16-juin-25	Framboise	1600
18-juin-25	Framboise	702,5
21-juin-25	Framboise	1030
22-juin-25	Framboise	661
23-juin-25	Framboise	385
24-juin-25	Framboise	716
24-juin-25	Fraise	150
26-juin-25	Framboise	683
27-juin-25	Framboise	529
27-juin-25	Pomme de terre	440
28-juin-25	Framboise	593
30-juin-25	Framboise	572
30-juin-25	Fraise	416
2-juil.-25	Framboise	327
2-juil.-25	Fraise	435
3-juil.-25	Tomate	63,5
4-juil.-25	Pomme de terre	1076
4-juil.-25	Framboise	369
6-juil.-25	Fraise	500
8-juil.-25	Haricot Vert	186
9-juil.-25	Framboise	191
9-juil.-25	Haricot Vert	45
9-juil.-25	Pomme de terre	1172
9-juil.-25	Betterave	225
11-juil.-25	Fraise	563
13-juil.-25	Tomate	231
13-juil.-25	Tomate Cerise	50
13-juil.-25	Concombre	450
13-juil.-25	Haricot Vert	323
13-juil.-25	Fraise	172
15-juil.-25	Betterave	196
15-juil.-25	Carotte	145
14-juil.-25	Tomate Cerise	30
19-juil.-25	Fraise	254
19-juil.-25	Mûre	44
16-juil.-25	Fraise	254
21-juil.-25	Pomme de terre	1700
22-juil.-25	Haricot Vert	466
22-juil.-25	Tomate	845
22-juil.-25	Concombre	283
22-juil.-25	Courgette	829
25-juil.-25	Fraise	247
25-juil.-25	Tomate	821
27-juil.-25	Tomate	1241
27-juil.-25	Concombre	408
28-juil.-25	Tomate	240
30-juil.-25	Tomate	3774
30-juil.-25	Courgette	456
30-juil.-25	Concombre	1111
30-juil.-25	Haricot Vert	520
1-août-25	Tomate	448
2-août-25	Mûre	120
3-août-25	Fraise	276
4-août-25	Tomate Cerise	170
4-août-25	Tomate	95
4-août-25	Concombre	953
4-août-25	Oignon	30
24-mai-24	Fraise	610
26-mai-24	Fraise	1214
28-mai-24	Fraise	959
31-mai-24	Fraise	1150
2-juin-24	Fraise	1160
4-juin-24	Fraise	596
9-juin-24	Fraise	390
18-juin-24	Framboise	49
18-juin-24	Cerise	228
20-juin-24	Framboise	130
21-juin-24	Framboise	220
23-juin-24	Framboise	296
24-juin-24	Framboise	255
28-juin-24	Framboise	214
29-juin-24	Framboise	130
1-juil.-24	Framboise	417
5-juil.-24	Fraise	475
5-juil.-24	Framboise	506
8-juil.-24	Framboise	246
8-juil.-24	Fraise	306
11-juil.-24	Framboise	467
14-juil.-24	Framboise	268
14-juil.-24	Fraise	457
17-juil.-24	Tomate	406
17-juil.-24	Framboise	341
18-juil.-24	Fraise	253
20-juil.-24	Tomate	1440
22-juil.-24	Tomate	534
22-juil.-24	Mûre	101
22-juil.-24	Framboise	195
23-juil.-24	Tomate	566
24-juil.-24	Tomate	1423
24-juil.-24	Fraise	114
25-juil.-24	Tomate	2264
28-juil.-24	Fraise	126
28-juil.-24	Mûre	75
30-juil.-24	Tomate	943
31-juil.-24	Tomate	265
2-août-24	Tomate	300
3-août-24	Tomate	165
3-août-24	Fraise	300
5-août-24	Tomate	345
8-août-24	Fraise	400
10-août-24	Tomate	1000
12-août-24	Tomate	1906
12-août-24	Fraise	307
15-août-24	Tomate	1507
16-août-24	Tomate	7500
21-août-24	Tomate	550
23-août-24	Tomate	400
26-août-24	Tomate	425
26-août-24	Tomate Cerise	525
30-août-24	Tomate	250
30-août-24	Tomate Cerise	450
1-sept.-24	Tomate Cerise	415
1-sept.-24	Tomate	100
6-sept.-24	Tomate Cerise	725
13-sept.-24	Tomate	1481
13-sept.-24	Tomate Cerise	1350
18-sept.-24	Tomate Cerise	2000
18-sept.-24	Tomate	240
18-sept.-24	Fraise	124
28-sept.-24	Pomme	1762
29-sept.-24	Tomate Cerise	1900
4-oct.-24	Pomme	1904
5-oct.-24	Tomate	520
5-oct.-24	Tomate Cerise	3600
5-oct.-24	Poivron	365
24-oct.-24	Tomate	1700
`;

type RecolteRow = {
  date: string;
  nom: string;
  poids: number;
};

async function main() {
  const lignes = recoltesDataRaw.trim().split("\n");
  const rows: RecolteRow[] = lignes.map((line) => {
    const [dateStr, nom, poidsStr] = line.split("\t");
    return {
      date: dateStr,
      nom: nom.trim(),
      poids: parseFloat(poidsStr.replace(",", ".")),
    };
  });

  const groupeParDateNom = new Map<string, number>();

  for (const row of rows) {
    const dateCle = `${row.date}-${row.nom}`;
    const occurrences = groupeParDateNom.get(dateCle) ?? 0;
    groupeParDateNom.set(dateCle, occurrences + 1);

    const heure = 11 + occurrences;
    // gestion du mois français court ou long
    let fullDate: Date;
    try {
      fullDate = parse(row.date, "d-MMM-yy", new Date(), { locale: fr });
      if (isNaN(fullDate.getTime())) {
        // Essai avec mois long
        fullDate = parse(row.date, "d-MMMM-yy", new Date(), { locale: fr });
      }
      if (isNaN(fullDate.getTime())) {
        throw new Error(`Date non reconnue: ${row.date}`);
      }
    } catch (err) {
      console.warn(`⚠️ Date non comprise : ${row.date}`);
      continue;
    }
    fullDate.setHours(heure, 0, 0, 0);

    const culture = await prisma.culture.findFirst({
      where: { nom: { equals: row.nom, mode: "insensitive" } },
    });

    if (!culture) {
      console.warn(`⚠️ Culture non trouvée : ${row.nom}`);
      continue;
    }

    await prisma.recolte.create({
      data: {
        id_culture: culture.id,
        date: fullDate,
        poids: Math.round(row.poids),
        quantite: 0,
        quantite_fiable: false,
      },
    });

    console.log(`✅ Récolte insérée pour ${row.nom} (${fullDate.toISOString()})`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });