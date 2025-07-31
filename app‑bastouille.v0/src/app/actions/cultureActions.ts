"use server";

import { prisma } from "@/lib/db";
// Import the enumerations from the generated Prisma client instead of
// @prisma/client. Because the Prisma client is generated into
// `src/lib/prisma/client` the enums live there.
import { Categorie, ModeRecolte } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Creates a new culture with the given fields. The image parameter should be
 * the filename (without path) of a PNG stored in the `public/cultures`
 * directory. After creation the cultures listing is revalidated so that
 * the new entry appears immediately.
 */
export async function createCulture(params: {
  nom: string;
  categorie: Categorie;
  modeRecolte: ModeRecolte;
  img: string;
}) {
  await prisma?.culture.create({
    data: {
      nom: params.nom,
      categorie: params.categorie,
      modeRecolte: params.modeRecolte,
      img: params.img,
    },
  });
  // Revalidate the cultures list and home page (which might show harvest
  // information after adding a new culture).
  revalidatePath("/cultures");
}

/**
 * Updates an existing culture. Only changed fields should be passed; this
 * function overwrites the specified fields with the supplied values. After
 * updating the culture the detail and listing pages are revalidated.
 */
export async function updateCulture(
  id: string,
  data: {
    nom?: string;
    categorie?: Categorie;
    modeRecolte?: ModeRecolte;
    img?: string;
  }
) {
  await prisma?.culture.update({
    where: { id },
    data,
  });
  revalidatePath("/cultures");
  revalidatePath(`/cultures/${id}`);
  revalidatePath("/");
}